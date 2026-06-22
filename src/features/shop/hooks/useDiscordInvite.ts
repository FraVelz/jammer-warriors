"use client";

import { useEffect, useState } from "react";

export function useDiscordInvite() {
  const [discordInvite, setDiscordInvite] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadInvite() {
      try {
        const response = await fetch("/api/site/discord-invite");
        if (!response.ok) return;

        const data = (await response.json()) as {
          discordInvite?: string | null;
        };
        if (!cancelled) {
          setDiscordInvite(data.discordInvite ?? null);
        }
      } catch {
        // Storefront keeps working without Discord link.
      }
    }

    void loadInvite();

    return () => {
      cancelled = true;
    };
  }, []);

  return discordInvite;
}
