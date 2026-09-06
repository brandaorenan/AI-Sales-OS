"use client";

import { useEffect, useState } from "react";

import { useT } from "@/hooks/i18n/useT";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useInboundDebounce,
  useUpdateInboundDebounce,
} from "@/hooks/settings/useInboundDebounce";

/**
 * Toggle + segundos da coalescência de rajada inbound (Onda 5).
 * Mensagens do mesmo contato dentro da janela viram uma resposta só.
 */
export function InboundDebounceCard() {
  const t = useT();
  const { data, isLoading, isError } = useInboundDebounce();
  const update = useUpdateInboundDebounce();
  const [enabled, setEnabled] = useState(true);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!data) return;
    setEnabled(data.enabled);
    setSeconds(Math.round(data.window_ms / 1000));
  }, [data]);

  if (isLoading) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">{t("Carregando…")}</Card>
    );
  }
  if (isError || !data) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        {t("Não foi possível carregar a configuração de rajada.")}
      </Card>
    );
  }

  const dirty =
    enabled !== data.enabled || Math.round(data.window_ms / 1000) !== seconds;

  return (
    <Card className="max-w-xl space-y-5 p-6">
      <div>
        <h2 className="text-base font-medium">{t("Agrupar mensagens em rajada")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Mensagens do mesmo contato dentro desta janela viram uma única resposta do agente — evita responder no meio de uma sequência no WhatsApp.",
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="inbound-debounce-enabled" className="cursor-pointer">
          {t("Ativar agrupamento")}
        </Label>
        <Switch
          id="inbound-debounce-enabled"
          checked={enabled}
          onCheckedChange={setEnabled}
          disabled={update.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inbound-debounce-seconds">{t("Segundos de espera")}</Label>
        <Input
          id="inbound-debounce-seconds"
          type="number"
          min={0}
          max={30}
          step={1}
          value={seconds}
          disabled={!enabled || update.isPending}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isFinite(n)) return;
            setSeconds(Math.min(30, Math.max(0, Math.trunc(n))));
          }}
        />
        <p className="text-xs text-muted-foreground">
          {t("Entre 0 e 30 segundos. Desligado = responde na hora.")}
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          disabled={!dirty || update.isPending}
          onClick={() =>
            update.mutate({
              enabled,
              window_ms: enabled ? seconds * 1000 : data.window_ms,
            })
          }
        >
          {update.isPending ? t("Salvando…") : t("Salvar")}
        </Button>
      </div>
    </Card>
  );
}
