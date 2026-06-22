"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { GoogleSignInButton } from "@/features/admin/components/GoogleSignInButton";

async function establishSession(idToken: string): Promise<string | null> {
  const response = await fetch("/api/admin/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    return data?.error ?? "No se pudo iniciar sesión";
  }

  return null;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password,
      );
      const idToken = await credential.user.getIdToken();
      const sessionError = await establishSession(idToken);

      if (sessionError) {
        await getFirebaseAuth().signOut();
        setError(sessionError);
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="login-email"
          className="text-js-text-muted mb-1 block text-sm"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="text-js-text-muted mb-1 block text-sm"
        >
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="js-btn-primary w-full justify-center disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Iniciar sesión"}
      </button>

      <GoogleSignInButton
        label="Continuar con Google"
        disabled={loading}
        onError={setError}
        onSuccess={async (idToken) => {
          const sessionError = await establishSession(idToken);
          if (sessionError) {
            await getFirebaseAuth().signOut();
            setError(sessionError);
            return;
          }
          router.replace("/admin/dashboard");
          router.refresh();
        }}
      />
    </form>
  );
}
