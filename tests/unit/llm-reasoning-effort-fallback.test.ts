/**
 * FALLBACK: reasoning_effort recusado pelo modelo não pode derrubar o turno.
 *
 * `esforcoSuportadoPeloModelo` (reasoning-effort.ts) é um mapa por REGEX de
 * nome de modelo — e a doc oficial da OpenAI diz que o valor suportado é
 * "model-dependent" e já inverteu regra entre famílias (gpt-5.4-mini rejeita
 * `minimal`, GPT-6 Astra rejeita `none`). Um mapa por regex nunca vai estar
 * atualizado com o lançamento de amanhã.
 *
 * Este arquivo prova a rede de segurança: quando o provider devolve 400
 * citando o VALOR de reasoning_effort como não suportado, `runModelCall`
 * tenta de novo UMA vez sem mandar o parâmetro — em vez de derrubar o turno
 * inteiro (o bug original: nenhuma resposta saía pro cliente).
 *
 * Usa `gpt-5-mini` (sem sub-versão pontuada) de propósito: é um dos dois
 * modelos do catálogo que o regex de `reasoning-effort.ts` NÃO cobre — prova
 * que o fallback funciona mesmo para o caso que o mapa por nome deixa passar.
 */
import { describe, expect, it, vi } from "vitest";

import { runModelCall } from "@/lib/agent-engine/edge/llm/run-model-call";

const ORG = "33333333-3333-4333-8333-333333333333";

function poolQueGrava(provider: string, defaultModel: string) {
  const inserts: Array<{ sql: string; params: unknown[] }> = [];
  const query = vi.fn(async (sql: string, params: unknown[] = []) => {
    if (sql.includes("settings->'llm'")) {
      return {
        rows: [
          {
            llm: {
              provider,
              default_model: defaultModel,
              params: {},
              enabled_models: [],
              monthly_budget_cents: null,
            },
          },
        ],
      };
    }
    if (sql.includes("from ai_purpose_bindings")) return { rows: [] };
    if (sql.includes("from ai_provider_credentials")) return { rows: [] };
    if (sql.includes("insert into llm_calls")) {
      inserts.push({ sql, params });
      return { rows: [{ id: "call-1" }] };
    }
    return { rows: [] };
  });
  return { pool: { query } as never, inserts };
}

const RESPOSTA_OK = {
  content: [{ type: "text", text: "ok" }],
  finishReason: { unified: "stop", raw: undefined },
  usage: {
    inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
    outputTokens: { total: 1, text: 1, reasoning: 0 },
  },
  warnings: [],
};

const ERRO_REASONING_EFFORT_400 = Object.assign(
  new Error(
    "Unsupported value: 'minimal' is not supported with the 'gpt-5-mini' model. " +
      "Supported values are: 'none', 'low', 'medium', 'high', and 'xhigh'.",
  ),
  { statusCode: 400 },
);

/** Registry cujo model falha com o erro dado na 1ª chamada e sucede na 2ª. */
function registryQueFalhaUmaVez(erro: unknown, sucesso: unknown) {
  let chamadas = 0;
  const fabrica = () =>
    ({
      specificationVersion: "v3",
      provider: "openai",
      modelId: "gpt-5-mini",
      doGenerate: async () => {
        chamadas += 1;
        if (chamadas === 1) throw erro;
        return sucesso;
      },
    }) as never;
  return { anthropic: fabrica, openai: fabrica, google: fabrica, openrouter: fabrica };
}

const cfg = { openaiApiKey: "sk-CHAVE-TESTE-9f3a2b", cacheTtl: "1h" as const };

describe("reasoning_effort recusado: retenta sem o parâmetro em vez de falhar o turno", () => {
  it("sucesso na 2ª tentativa vira resposta OK, sem propagar o 400 original", async () => {
    const { pool, inserts } = poolQueGrava("openai", "gpt-5-mini");
    const log = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    const resultado = await runModelCall(
      pool,
      cfg,
      { tenantId: ORG, purpose: "jailbreak_detect", messages: [{ role: "user", content: "oi" }] },
      { registry: registryQueFalhaUmaVez(ERRO_REASONING_EFFORT_400, RESPOSTA_OK), log },
    );

    expect(resultado.result.text).toBe("ok");
    expect(inserts.filter((i) => i.sql.includes("'erro'"))).toHaveLength(0);
    expect(inserts.filter((i) => i.sql.includes("'ok'"))).toHaveLength(1);
  });

  it("avisa no log que o retry aconteceu (observabilidade do fallback)", async () => {
    const { pool } = poolQueGrava("openai", "gpt-5-mini");
    const log = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    await runModelCall(
      pool,
      cfg,
      { tenantId: ORG, purpose: "jailbreak_detect", messages: [{ role: "user", content: "oi" }] },
      { registry: registryQueFalhaUmaVez(ERRO_REASONING_EFFORT_400, RESPOSTA_OK), log },
    );

    expect(log.warn).toHaveBeenCalledWith(
      "llm: reasoning_effort recusado pelo modelo, retentando sem o parâmetro",
      expect.objectContaining({ model: "gpt-5-mini", esforco_recusado: "minimal" }),
    );
    expect(log.error).not.toHaveBeenCalled();
  });

  it("se a 2ª tentativa TAMBÉM falhar, grava erro e relança (não mascara falha real)", async () => {
    const { pool, inserts } = poolQueGrava("openai", "gpt-5-mini");
    const erroDePersistencia = Object.assign(new Error("insufficient credits"), { statusCode: 429 });
    let lancou: unknown = null;
    let chamadas = 0;
    const fabrica = () =>
      ({
        specificationVersion: "v3",
        provider: "openai",
        modelId: "gpt-5-mini",
        doGenerate: async () => {
          chamadas += 1;
          throw chamadas === 1 ? ERRO_REASONING_EFFORT_400 : erroDePersistencia;
        },
      }) as never;

    try {
      await runModelCall(
        pool,
        cfg,
        { tenantId: ORG, purpose: "jailbreak_detect", messages: [{ role: "user", content: "oi" }] },
        { registry: { anthropic: fabrica, openai: fabrica, google: fabrica, openrouter: fabrica } },
      );
    } catch (e) {
      lancou = e;
    }

    expect(lancou).toBe(erroDePersistencia);
    const linhaDeErro = inserts.find((i) => i.sql.includes("'erro'"));
    expect(linhaDeErro, "a falha da 2ª tentativa também precisa virar linha em llm_calls").toBeDefined();
    // código 8 é o índice do error_code no insert (ver registrarFalha).
    expect(linhaDeErro!.params[8]).toBe("limite_ou_saldo");
  });

  it("400 que NÃO cita valor/modelo de reasoning_effort continua falhando direto (sem retry silencioso)", async () => {
    const { pool, inserts } = poolQueGrava("openai", "gpt-5-mini");
    const erroNaoRelacionado = Object.assign(new Error("Invalid request: messages array is empty"), {
      statusCode: 400,
    });
    let lancou: unknown = null;
    let chamadas = 0;
    const fabrica = () =>
      ({
        specificationVersion: "v3",
        provider: "openai",
        modelId: "gpt-5-mini",
        doGenerate: async () => {
          chamadas += 1;
          throw erroNaoRelacionado;
        },
      }) as never;

    try {
      await runModelCall(
        pool,
        cfg,
        { tenantId: ORG, purpose: "jailbreak_detect", messages: [{ role: "user", content: "oi" }] },
        { registry: { anthropic: fabrica, openai: fabrica, google: fabrica, openrouter: fabrica } },
      );
    } catch (e) {
      lancou = e;
    }

    expect(lancou).toBe(erroNaoRelacionado);
    expect(chamadas, "não deve retentar um 400 que não é sobre reasoning_effort").toBe(1);
    expect(inserts.filter((i) => i.sql.includes("'erro'"))).toHaveLength(1);
  });
});
