"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Magento não tem fluxo OAuth (ao contrário da Nuvemshop) — o operador cola
 * endpoint SOAP + usuário e chave de uma API dedicada. A rota valida contra a
 * loja ANTES de gravar; esta tela só mostra o resultado.
 */
export function MagentoConnectForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [endpoint, setEndpoint] = useState("");
  const [apiUser, setApiUser] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [moduleSecret, setModuleSecret] = useState("");

  function submit() {
    startTransition(async () => {
      const res = await fetch("/api/v1/integrations/magento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint,
          api_user: apiUser,
          api_key: apiKey,
          ...(moduleSecret ? { module_secret: moduleSecret } : {}),
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(body?.error?.message ?? "Falha ao conectar");
        return;
      }
      toast.success(`Conectado — Magento ${body?.data?.magentoVersion ?? "?"}`);
      setApiKey("");
      setModuleSecret("");
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-1">
        <Label htmlFor="magento-endpoint">Endpoint SOAP v2</Label>
        <Input
          id="magento-endpoint"
          placeholder="https://sualoja.com/index.php/api/v2_soap/"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="magento-user">Usuário da API</Label>
        <Input
          id="magento-user"
          value={apiUser}
          onChange={(e) => setApiUser(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="magento-key">Chave da API</Label>
        <Input
          id="magento-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="magento-module-secret">Secret do módulo de carrinho (opcional)</Label>
        <Input
          id="magento-module-secret"
          type="password"
          placeholder="Só se o módulo de recuperação de carrinho estiver instalado na loja"
          value={moduleSecret}
          onChange={(e) => setModuleSecret(e.target.value)}
        />
      </div>
      <Button onClick={submit} disabled={pending || !endpoint || !apiUser || !apiKey}>
        {pending ? "Conectando…" : "Conectar Magento"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Use um usuário de API SOAP dedicado (Sistema → Web Services → Usuários SOAP/XML-RPC),
        nunca o login administrativo. O secret do módulo só é necessário para gerar link de
        recuperação de carrinho no navegador do cliente — sem ele, busca e apresentação de
        produto continuam funcionando normalmente.
      </p>
    </div>
  );
}
