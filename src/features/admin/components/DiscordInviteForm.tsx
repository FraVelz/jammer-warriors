"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase/client";
import type { DiscordInviteSource } from "@/lib/site-settings/get-discord-invite";

type DiscordInviteFormProps = {
  initialInvite: string;
  source: DiscordInviteSource;
};

export function DiscordInviteForm({
  initialInvite,
  source,
}: DiscordInviteFormProps) {
  const router = useRouter();
  const [discordInvite, setDiscordInvite] = useState(initialInvite);
  const [savedInvite, setSavedInvite] = useState(initialInvite);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/discord-invite", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordInvite }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
        discordInvite?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "No se pudo guardar la URL");
      }

      const nextInvite = data?.discordInvite ?? discordInvite;
      setDiscordInvite(nextInvite);
      setSavedInvite(nextInvite);
      setSuccess("URL de Discord guardada correctamente.");
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "No se pudo guardar la URL";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    setError(null);

    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      await getFirebaseAuth()
        .signOut()
        .catch(() => undefined);
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("No se pudo cerrar sesión");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="border-js-border bg-js-bg-card rounded-sm border p-5">
        <h2 className="text-js-accent mb-2 text-lg font-bold">
          URL de invitación de Discord
        </h2>
        <p className="text-js-text-muted mb-4 text-sm">
          URL actual mostrada en la tienda. Fuente:{" "}
          {source === "firestore" ? "Firestore" : "sin configurar"}.
        </p>

        <p className="border-js-border bg-js-bg mb-4 rounded-sm border px-3 py-2 text-sm break-all">
          {savedInvite || "—"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="discord-invite"
              className="text-js-text-muted mb-1 block text-sm"
            >
              Nueva URL
            </label>
            <input
              id="discord-invite"
              type="url"
              required
              value={discordInvite}
              onChange={(event) => setDiscordInvite(event.target.value)}
              placeholder="https://discord.gg/..."
              className="border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-sm text-green-400" role="status">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="js-btn-primary disabled:opacity-60"
          >
            {loading ? "Guardando…" : "Guardar URL"}
          </button>
        </form>
      </section>

      <button
        type="button"
        onClick={() => void handleLogout()}
        disabled={loggingOut}
        className="js-btn-cancel disabled:opacity-60"
      >
        {loggingOut ? "Cerrando sesión…" : "Cerrar sesión"}
      </button>
    </div>
  );
}
