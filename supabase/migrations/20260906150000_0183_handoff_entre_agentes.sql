-- 0183_handoff_entre_agentes
--
-- Entrega 6 do plano `docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md`:
-- handoff explícito IA → IA. `conversations.active_ai_agent_id`/`active_intent`/
-- `active_agent_set_at` já existem (migration 0085/0116) e continuam sendo a
-- fonte de posse da conversa — este bloco só acrescenta o REGISTRO da
-- transferência e o campo de PERMISSÃO de destino.

-- ─── 1. Destinos permitidos por versão publicada ───────────────────────────
--
-- Aditivo, default vazio: nenhuma versão existente ganha uma capacidade nova
-- em silêncio (a doutrina de "sem UI ainda" — plano §10 — significa que só
-- quem chamar a API de versões explicitamente habilita transferência).
alter table public.ai_agent_versions
  add column if not exists handoff_targets uuid[] not null default '{}'::uuid[];

comment on column public.ai_agent_versions.handoff_targets is
  'ai_agents.id (mesmo tenant) para os quais request_agent_handoff pode transferir '
  'a partir desta versão. Vazio = nenhuma transferência explícita habilitada.';

-- ─── 2. Registro da transferência (`ai_agent_handoffs`) ────────────────────
--
-- Plano §9: "origem/destino e versões, motivo, continuidade, status, cadeia
-- e deduplicação". `dedupe_key` único por conversa: o job_id do turno que
-- pediu a transferência — um retry do MESMO turno não duplica handoff nem
-- reenfileira a continuação (mesmo padrão de idempotência do resto do plano).
create table if not exists public.ai_agent_handoffs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  from_agent_id uuid references public.ai_agents(id) on delete set null,
  from_version_id uuid references public.ai_agent_versions(id) on delete set null,
  to_agent_id uuid not null references public.ai_agents(id) on delete cascade,
  to_version_id uuid not null references public.ai_agent_versions(id) on delete cascade,
  reason text not null,
  summary text not null,
  chain_position integer not null default 1,
  status text not null default 'requested'
    check (status in ('requested', 'completed', 'failed')),
  dedupe_key text not null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  unique (conversation_id, dedupe_key)
);

create index if not exists ai_agent_handoffs_conversation_idx
  on public.ai_agent_handoffs (conversation_id, created_at desc);

comment on table public.ai_agent_handoffs is
  'Registro de transferência de posse da conversa entre agentes de IA (plano de '
  'concierge de compras §8). A posse em si é conversations.active_ai_agent_id — '
  'esta tabela é o histórico auditável e a base do limite de cadeia/detecção de ping-pong.';
comment on column public.ai_agent_handoffs.chain_position is
  'Posição na cadeia de transferências desta conversa (1 = primeira) — usado '
  'para recusar cadeias longas demais sem progresso (plano §8.3).';

alter table public.ai_agent_handoffs enable row level security;

drop policy if exists "ai_agent_handoffs_select" on public.ai_agent_handoffs;
create policy "ai_agent_handoffs_select" on public.ai_agent_handoffs
  for select using (
    (organization_id in (select public.fn_user_org_ids()))
    or public.fn_is_platform_admin()
  );

-- Sem policy de escrita: o harness grava com service role e filtra
-- organization_id/conversation_id manualmente — mesmo padrão de
-- commerce_operations/commerce_carts.
