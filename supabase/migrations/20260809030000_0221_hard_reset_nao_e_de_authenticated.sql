-- 0221_hard_reset_nao_e_de_authenticated
--
-- `fn_hard_reset_contact_context` (migration 0219) é SECURITY DEFINER e ESCREVE:
-- apaga checkpoints, lead_state, lead_notes e conversas do contato, e recebe a
-- organização por ARGUMENTO — ela não olha membership, porque quem a chama já
-- resolveu isso. O único call site é `lib/contacts/hard-reset-context.ts`, que
-- usa o client de SERVICE ROLE, atrás de uma rota com `requireRole`.
--
-- Só que o bootstrap de todo projeto Supabase grava um
-- `ALTER DEFAULT PRIVILEGES ... GRANT ALL ON FUNCTIONS TO anon, authenticated`
-- ANTES de qualquer SQL nosso rodar. Consequência: a função nasceu executável
-- por QUALQUER usuário logado, de QUALQUER tenant — uma chamada RPC do
-- PostgREST com a sessão do browser bastaria para apagar o contexto de um
-- contato de outra organização. O `revoke ... from public` que a 0219 já fazia
-- não remove esse grant: são duas origens distintas de EXECUTE, e cada uma
-- pede o seu revoke (mesma lição das migrations 0108 e 0116 do upstream).
--
-- Vigiado por `tests/invariants/hardening-definer-varredura.test.ts`, que
-- reprova qualquer DEFINER volátil de `public` alcançável por `authenticated`
-- sem razão declarada.
--
-- Idempotente: `revoke` de privilégio ausente é no-op.

revoke execute on function
  public.fn_hard_reset_contact_context(uuid, uuid, boolean) from anon;
revoke execute on function
  public.fn_hard_reset_contact_context(uuid, uuid, boolean) from authenticated;

-- Re-afirma o único caminho legítimo. Explícito porque o revoke acima pode
-- rodar num banco onde o grant a service_role veio do default privilege que
-- estamos justamente derrubando para os outros dois papéis.
grant execute on function
  public.fn_hard_reset_contact_context(uuid, uuid, boolean) to service_role;
