-- 0181_catalogo_magento
--
-- Entrega 3 do plano de concierge de compras Magento
-- (`docs/superpowers/plans/2026-09-06-magento-concierge-carrinho-handoff.md`):
-- cache de catálogo independente de provedor (plano seção 6.2).
--
-- `catalogProductList` não pagina (confirmado: WSDL não documenta page/limit —
-- plano seção 6.2 já avisava para não inventar). Contra a loja real de
-- referência (`ia.genialiaviamentos.com.br`) o catálogo tem 6.478 produtos —
-- grande, mas cabe num único fetch periódico; lojas maiores vão precisar do
-- export do módulo (seção 4.3.5), não desta tabela.
--
-- DIRC: Magento é a autoridade de preço/estoque/vendabilidade EFETIVOS
-- (revalidados antes de qualquer venda — plano seção 6.1). Esta tabela é
-- CACHE de busca, nunca a fonte usada para confirmar preço/disponibilidade no
-- momento da compra.

create table if not exists public.commerce_products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  integration_id uuid not null references public.tenant_integrations(id) on delete cascade,
  store_view text not null,
  external_id text not null,
  sku text not null,
  type text not null,
  name text not null default '',
  price_cents integer,
  currency text,
  status text,
  visibility text,
  url_path text,
  description text,
  short_description text,
  category_ids jsonb not null default '[]'::jsonb,
  -- Embalagem/quantidade de compra (plano §6.2): "campo desconhecido fica
  -- desconhecido" — nenhum default que finja saber a unidade de venda.
  sale_unit text,
  package_size numeric,
  package_unit text,
  min_qty numeric,
  qty_increment numeric,
  allow_decimal_qty boolean,
  attributes jsonb not null default '{}'::jsonb,
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, integration_id, store_view, external_id)
);

create index if not exists commerce_products_org_idx
  on public.commerce_products (organization_id, integration_id);
-- Busca lexical (nome + SKU) via pg_trgm — "sem embeddings disponíveis,
-- oferecer busca lexical funcional" (plano §6.2).
create index if not exists commerce_products_name_trgm_idx
  on public.commerce_products using gin (name public.gin_trgm_ops);
create index if not exists commerce_products_sku_trgm_idx
  on public.commerce_products using gin (sku public.gin_trgm_ops);

drop trigger if exists trg_commerce_products_updated_at on public.commerce_products;
create trigger trg_commerce_products_updated_at
  before update on public.commerce_products
  for each row execute function public.fn_set_updated_at();

comment on table public.commerce_products is
  'Cache de catálogo por integração — busca e apresentação. Preço/estoque '
  'EFETIVOS são revalidados no provedor antes de confirmar seleção/carrinho '
  '(plano de concierge de compras §6.1); esta tabela nunca decide venda sozinha.';
comment on column public.commerce_products.attributes is
  'Atributos extras não modelados em coluna própria — schema flexível, mas '
  'com colunas dedicadas para o que a jornada de compra usa direto (preço, '
  'unidade de venda), não um jsonb-lock-in genérico.';

alter table public.commerce_products enable row level security;

drop policy if exists "commerce_products_select" on public.commerce_products;
create policy "commerce_products_select" on public.commerce_products
  for select using (
    (organization_id in (select public.fn_user_org_ids()))
    or public.fn_is_platform_admin()
  );

-- Sem policy de escrita: o worker de sync grava com service role (bypassa
-- RLS) e filtra organization_id/integration_id manualmente — mesmo padrão de
-- commerce_operations/api_audit_log.
