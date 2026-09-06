-- 0180_conector_magento
--
-- Entrega 2 do plano `docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md`:
-- conector Magento/OpenMage. Este bloco só abre o espaço no schema — a lógica
-- de conexão vive em `lib/magento/*` e `app/api/v1/integrations/magento/route.ts`.
--
-- ─── 1. `provider`/`external_provider` ganham 'magento' ────────────────────
--
-- Aditivo: só ALARGA o conjunto aceito de `tenant_integrations.provider` e
-- `orders.external_provider` (hoje 'nuvemshop'|'vtex'|'shopify'). Nenhuma linha
-- existente passa a violar — a regra de deduplicar dados antes da constraint
-- (item 8 da doutrina de migrations) não se aplica aqui. Um bloco por
-- constraint, para não repetir o quebra-update do #159/0175.

alter table public.tenant_integrations
  drop constraint if exists tenant_integrations_provider_check;

alter table public.tenant_integrations
  add constraint tenant_integrations_provider_check check (provider in (
    'nuvemshop', 'vtex', 'shopify', 'magento'
  ));

alter table public.orders
  drop constraint if exists orders_external_provider_check;

alter table public.orders
  add constraint orders_external_provider_check check (external_provider in (
    'nuvemshop', 'vtex', 'shopify', 'magento'
  ));

-- ─── 2. Ledger de operações comerciais (`commerce_operations`) ─────────────
--
-- Plano seção 9: "ledger: operação, hash de input, status, tentativa,
-- resultado sanitizado e correlação remota; índice único por
-- integração/operação". A Entrega 2 só grava aqui a tentativa de conexão
-- (`connection_test`); Entregas futuras (carrinho) reusam esta MESMA tabela —
-- não é criada tabela nova por operação.
--
-- `input_hash` (não o input em si): a operação de conexão recebe endpoint +
-- usuário + api key. Gravar a chave em texto num ledger de auditoria seria uma
-- SEGUNDA cópia do segredo fora da coluna cifrada — o hash basta para detectar
-- retry com o mesmo payload.
--
-- Único por `(integration_id, operation, operation_id)`: é o que torna
-- `commerce_create_cart`/mutações futuras idempotentes (mesma `operation_id`
-- com o mesmo resultado é replay seguro; com payload diferente, hash diverge e
-- vira conflito tratado pela aplicação, não pelo banco).

create table if not exists public.commerce_operations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  integration_id uuid not null references public.tenant_integrations(id) on delete cascade,
  operation text not null,
  operation_id text not null,
  input_hash text not null,
  status text not null default 'pending'
    check (status in ('pending', 'succeeded', 'failed')),
  attempt integer not null default 1,
  result jsonb not null default '{}'::jsonb,
  remote_correlation_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (integration_id, operation, operation_id)
);

create index if not exists commerce_operations_org_created_idx
  on public.commerce_operations (organization_id, created_at desc);

drop trigger if exists trg_commerce_operations_updated_at on public.commerce_operations;
create trigger trg_commerce_operations_updated_at
  before update on public.commerce_operations
  for each row execute function public.fn_set_updated_at();

comment on table public.commerce_operations is
  'Ledger de operações comerciais idempotentes (conexão, e depois carrinho). '
  'Fonte de verdade do carrinho/pedido continua no provedor (Magento); esta '
  'tabela só registra a TENTATIVA e o resultado sanitizado.';
comment on column public.commerce_operations.input_hash is
  'sha256 do input da operação — nunca o input em si (pode conter segredo).';
comment on column public.commerce_operations.operation_id is
  'Chave de idempotência do CHAMADOR (ex.: Idempotency-Key), não gerada aqui.';

alter table public.commerce_operations enable row level security;

drop policy if exists "commerce_operations_select" on public.commerce_operations;
create policy "commerce_operations_select" on public.commerce_operations
  for select using (
    (organization_id in (select public.fn_user_org_ids()))
    or public.fn_is_platform_admin()
  );

-- Sem policy de escrita: a aplicação sempre grava com o client de service role
-- (que bypassa RLS) e filtra `organization_id` manualmente — mesmo padrão de
-- `api_audit_log`. Um `manager`/`admin` do tenant só LÊ este ledger.
