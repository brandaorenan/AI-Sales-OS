import { redirect } from "next/navigation";

import { requireAuth, resolveActiveOrg } from "@/lib/auth/server";
import { ROLE_RANK } from "@/lib/auth/types";
import { traduzir } from "@/lib/i18n/dicionario";
import { InboundDebounceCard } from "./_components/InboundDebounceCard";

export const metadata = { title: "Comportamento do agente" };
export const dynamic = "force-dynamic";

/**
 * Settings de comportamento do agente ao nível da organização (Onda 5).
 * Debounce de rajada é org-level — o drain resolve antes do agente publicado.
 */
export default async function AgentSettingsPage() {
  const user = await requireAuth();
  const activeOrg = await resolveActiveOrg(user);
  if (!activeOrg || (!user.is_platform_admin && ROLE_RANK[activeOrg.role] < ROLE_RANK.admin)) {
    redirect("/403");
  }
  const idioma = user.idioma;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{traduzir("Comportamento do agente", idioma)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {traduzir("Como o agente agrupa e responde mensagens nesta organização.", idioma)}
        </p>
      </div>
      <InboundDebounceCard />
    </div>
  );
}
