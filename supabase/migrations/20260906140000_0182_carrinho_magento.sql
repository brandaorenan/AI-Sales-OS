-- 0182_carrinho_magento
--
-- Entrega 5 do plano `docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md`:
-- executor comercial (carrinho completo). Magento continua sendo a fonte de
-- verdade do quote; `commerce_carts` é o cache de leitura por conversa (plano
-- §9: "Ponte para quote, estado, revisão, valores em centavos/moeda e data de
-- leitura; itens são cache, se persistidos, nunca segundo carrinho autônomo").
--
-- Sem coluna `revision` dedicada: `updated_at` já serve como o marcador de
-- frescor que o plano pede ("cache identificado por revisão/DATA") — a cada
-- refresh o executor sobrescreve o snapshot inteiro, e otimista-concorrência
-- fina (fencing por revisão) fica fora desta entrega (ponytail — §5.3 é o
-- nível de detalhe de um produto maduro; aqui o Magento é sempre a fonte lida
-- na hora antes de qualquer mutação, o que já impede a maioria dos conflitos).

create table if not exists public.commerce_carts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  integration_id uuid not null references public.tenant_integrations(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  store_view text not null,
  external_quote_id text not null,
  status text not null default 'open'
    check (status in ('open', 'converted', 'expired')),
  items jsonb not null default '[]'::jsonb,
  subtotal_cents integer,
  grand_total_cents integer,
  currency text,
  last_synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Só UM carrinho aberto por conversa/integração — reabrir não cria um segundo
-- concorrente (plano §5.2: "mostrar opção entre continuar o atual e abrir a
-- seleção assistida" pressupõe existir só um "atual" por conversa).
create unique index if not exists commerce_carts_open_per_conversation_idx
  on public.commerce_carts (organization_id, integration_id, conversation_id)
  where status = 'open';

create index if not exists commerce_carts_conversation_idx
  on public.commerce_carts (organization_id, conversation_id);

drop trigger if exists trg_commerce_carts_updated_at on public.commerce_carts;
create trigger trg_commerce_carts_updated_at
  before update on public.commerce_carts
  for each row execute function public.fn_set_updated_at();

comment on table public.commerce_carts is
  'Cache de leitura do quote Magento por conversa. Fonte de verdade dos itens '
  'e do total é sempre o Magento (plano de concierge de compras §5.3); esta '
  'tabela é reescrita inteira a cada mutação/leitura, nunca a origem da soma.';

alter table public.commerce_carts enable row level security;

drop policy if exists "commerce_carts_select" on public.commerce_carts;
create policy "commerce_carts_select" on public.commerce_carts
  for select using (
    (organization_id in (select public.fn_user_org_ids()))
    or public.fn_is_platform_admin()
  );

-- Sem policy de escrita: o executor comercial grava com o client de service
-- role e filtra organization_id/integration_id/conversation_id manualmente —
-- mesmo padrão de commerce_operations/commerce_products.

-- ─── Secret opcional do módulo Magento (link de recuperação, plano §5.2) ────
--
-- Reusa `tenant_integrations.oauth_refresh_token_encrypted` (DIRC: Integrar,
-- não duplicar coluna) — nenhum outro provedor grava refresh token nesse
-- formato hoje (Nuvemshop usa OAuth de verdade e tem o próprio refresh; para
-- Magento essa coluna nunca foi usada). O comentário documenta o reuso para
-- quem ler o schema não presumir OAuth genérico.
comment on column public.tenant_integrations.oauth_refresh_token_encrypted is
  'OAuth refresh token (Nuvemshop/Shopify/VTEX). Para provider=magento, reusada '
  '(DIRC: Integrar) para o secret OPCIONAL do módulo Deskcomm_Concierge — '
  'só necessário se o operador instalou o módulo de recuperação de carrinho '
  '(plano de concierge de compras §5.2); ausente = commerce_create_checkout_link recusa.';
