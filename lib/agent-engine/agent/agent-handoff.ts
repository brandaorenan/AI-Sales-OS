/**
 * Handoff explícito IA → IA (Entrega 6 do plano de concierge de compras
 * Magento, §8). A tool `request_agent_handoff` (nativa, `inbound-turn.ts`)
 * chama `applyRequestAgentHandoff` com o contexto CONFIÁVEL do job (tenant,
 * conversa, agente de origem) — o modelo só escolhe `to_agent_id`/`reason`/
 * `summary`.
 *
 * Continuidade DURÁVEL sem worker/evento novo: reusa o job kind `followup_turn`
 * já existente (`lib/agent-engine/agent/followup-turn.ts`) para "ativar o turno
 * do destino" — ele já passa `job.kind !== 'inbound_turn'`, e o resolvedor de
 * agente (`resolve-turn-agent.ts`, regra 6) NUNCA reclassifica nesse caso: usa
 * o agente STICKY (que acabamos de gravar em `active_ai_agent_id`) direto, sem
 * risco de o roteador desfazer a transferência no mesmo turno (exigência do
 * plano §8.3: "o classificador sticky não deve desfazê-lo imediatamente").
 *
 * ponytail — simplificação deliberada: o cabeçalho de abertura do
 * `followup_turn` fala em "follow-up agendado" (é o texto pensado para
 * retomar depois de dias), não em "transferência recebida agora". É cosmético
 * — o `reason`/`context_snapshot` (motivo e resumo da transferência) chegam
 * corretos ao destino — mas um job kind próprio com abertura dedicada é o
 * upgrade natural se a UX medir confusão do agente destino. Criar esse job
 * kind agora duplicaria toda a orquestração já testada de `followup_turn`
 * (janela anti-ban, silêncio por handoff humano, budget de IA) para ganhar só
 * uma frase de abertura.
 */
import { z } from 'zod';
import type pg from 'pg';

import { loadPublishedAgentConfigById, type PublishedAgentConfig } from './agent-config';
import { enqueueJob } from '../queue/queue';
import type { Logger } from '../obs/logger';

export const requestAgentHandoffInputSchema = z.strictObject({
  to_agent_id: z.string().uuid(),
  reason: z.string().min(1).max(500),
  summary: z.string().min(1).max(2000),
});

const PAYLOAD_TEACHING =
  'Campos aceitos: to_agent_id (um dos destinos permitidos desta versão), reason (motivo curto ' +
  'da transferência) e summary (resumo do que já foi entendido/decidido, para o destino não repetir ' +
  'perguntas) — nada além.';

/** Limite de cadeia por conversa (plano §8.3) — números baixos de propósito: uma cadeia legítima
 * raramente passa de 2-3 saltos; além disso é sinal de loop, não de jornada real. */
const MAX_CHAIN = 5;

export type RequestAgentHandoffResult =
  | { ok: true; status: 'transferido'; destino: string; message: string }
  | {
      ok: false;
      error: {
        code:
          | 'invalid_payload'
          | 'destino_invalido'
          | 'destino_nao_permitido'
          | 'destino_nao_publicado'
          | 'cadeia_esgotada'
          | 'transferencia_circular';
        message: string;
      };
    };

function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === '23505';
}

export interface AgentHandoffIds {
  tenantId: string;
  conversationId: string;
  /** contact_id — id de enfileiramento (job_queue.contact_id), nunca da conversa. */
  leadId: string;
  /** job.id do turno que pediu a transferência — chave de dedup (retry do mesmo turno não duplica). */
  jobId: string;
}

/**
 * Valida, registra e efetiva a transferência. Idempotente por `(conversation_id,
 * dedupe_key=jobId)`: uma segunda chamada do MESMO job (retry) devolve o
 * mesmo resultado sem duplicar linha nem reenfileirar a continuação.
 */
export async function applyRequestAgentHandoff(
  pool: pg.Pool,
  ids: AgentHandoffIds,
  from: { agentConfig: PublishedAgentConfig },
  opts: { log: Logger },
  rawInput: unknown,
): Promise<RequestAgentHandoffResult> {
  const parsed = requestAgentHandoffInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false, error: { code: 'invalid_payload', message: PAYLOAD_TEACHING } };
  }
  const { to_agent_id, reason, summary } = parsed.data;

  if (to_agent_id === from.agentConfig.agentId) {
    return {
      ok: false,
      error: { code: 'destino_invalido', message: 'não é possível transferir a conversa para o mesmo agente.' },
    };
  }
  if (!from.agentConfig.handoffTargets.includes(to_agent_id)) {
    return {
      ok: false,
      error: {
        code: 'destino_nao_permitido',
        message: 'este destino não está entre os agentes permitidos pela versão publicada — não transfira para ele.',
      },
    };
  }

  const destino = await loadPublishedAgentConfigById(pool, ids.tenantId, to_agent_id);
  if (!destino) {
    return {
      ok: false,
      error: { code: 'destino_nao_publicado', message: 'o agente de destino não está publicado nesta organização.' },
    };
  }

  const { rows: lastRows } = await pool.query<{ chain_position: number; from_agent_id: string | null }>(
    `select chain_position, from_agent_id from ai_agent_handoffs
     where organization_id = $1 and conversation_id = $2
     order by chain_position desc limit 1`,
    [ids.tenantId, ids.conversationId],
  );
  const last = lastRows[0];
  const chainPosition = (last?.chain_position ?? 0) + 1;
  if (chainPosition > MAX_CHAIN) {
    return {
      ok: false,
      error: {
        code: 'cadeia_esgotada',
        message: `limite de ${MAX_CHAIN} transferências nesta troca já foi atingido — resolva aqui ou peça atendimento humano, não transfira de novo.`,
      },
    };
  }
  if (last !== undefined && last.from_agent_id === to_agent_id) {
    return {
      ok: false,
      error: {
        code: 'transferencia_circular',
        message: 'isto devolveria a conversa para quem acabou de transferi-la, sem progresso — resolva aqui ou peça atendimento humano.',
      },
    };
  }

  let handoffId: string;
  try {
    const { rows } = await pool.query<{ id: string }>(
      `insert into ai_agent_handoffs
         (organization_id, conversation_id, from_agent_id, from_version_id, to_agent_id, to_version_id,
          reason, summary, chain_position, status, dedupe_key)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'requested', $10)
       returning id`,
      [
        ids.tenantId,
        ids.conversationId,
        from.agentConfig.agentId,
        from.agentConfig.versionId,
        to_agent_id,
        destino.versionId,
        reason,
        summary,
        chainPosition,
        ids.jobId,
      ],
    );
    handoffId = rows[0]!.id;
  } catch (err) {
    if (isUniqueViolation(err)) {
      opts.log.info('handoff: replay do mesmo turno — já efetivado, não duplica', { to_agent_id });
      return {
        ok: true,
        status: 'transferido',
        destino: destino.agentName,
        message: `conversa já transferida para ${destino.agentName} neste turno — não fale mais, encerre agora.`,
      };
    }
    throw err;
  }

  // Posse muda AGORA — próximo turno (nova mensagem OU esta continuação) lê o
  // agente novo. `active_intent = null`: a intenção sticky era da conversa
  // ANTERIOR à transferência; herdar o intent antigo faria o router reclassificar
  // sobre um sinal que não é mais o do agente novo.
  await pool.query(
    `update conversations
        set active_ai_agent_id = $3, active_intent = null, active_agent_set_at = now()
      where organization_id = $1 and id = $2`,
    [ids.tenantId, ids.conversationId, to_agent_id],
  );

  // Continuação: enfileira followup_turn (job.kind !== 'inbound_turn' ⇒ o
  // resolvedor usa STICKY sem reclassificar — ver doc do módulo). sourceEventId
  // = handoffId garante que mesmo uma segunda chamada que escapasse do 23505
  // acima (corrida) não enfileira duas continuações.
  await enqueueJob(pool, ids.tenantId, {
    leadId: ids.leadId,
    kind: 'followup_turn',
    sourceEventId: handoffId,
    payload: {
      reason: `Transferência de ${from.agentConfig.agentName}: ${reason}`,
      context_snapshot: summary,
      mode: 'agent',
    },
  });

  await pool.query(`update ai_agent_handoffs set status = 'completed', resolved_at = now() where id = $1`, [
    handoffId,
  ]);

  opts.log.info('handoff IA→IA efetivado', {
    to_agent_id,
    chain_position: chainPosition,
    handoff_id: handoffId,
  });

  return {
    ok: true,
    status: 'transferido',
    destino: destino.agentName,
    message: `conversa transferida para ${destino.agentName}. Você não fala mais nesta conversa — encerre o turno agora.`,
  };
}
