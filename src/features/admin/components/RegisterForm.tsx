"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { GoogleSignInButton } from "@/features/admin/components/GoogleSignInButton";

type SetupStatus = {
  canRegister: boolean;
  configured: boolean;
  reason?: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SetupStatus | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/admin/setup-status");
        const data = (await response.json()) as SetupStatus;
        if (!cancelled) setStatus(data);
      } catch {
        if (!cancelled) {
          setStatus({ canRegister: false, configured: false });
        }
      }
    }

    void loadStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const canRegister = status?.canRegister ?? false;
  const adminAlreadyExists =
    status?.configured === true && status.canRegister === false;
  const setupUnavailable = status !== null && status.configured === false;
  const showBlockedBanner = adminAlreadyExists || setupUnavailable;
  const isDisabled = loading || !canRegister || status === null;
  const blockedControlClass = showBlockedBanner
    ? "disabled:cursor-not-allowed"
    : undefined;

  async function completeRegistration(idToken: string) {
    const sessionResponse = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!sessionResponse.ok) {
      await getFirebaseAuth().signOut();
      const data = (await sessionResponse.json().catch(() => null)) as {
        error?: string;
      } | null;
      throw new Error(data?.error ?? "No se pudo iniciar sesión");
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (adminAlreadyExists) {
      setError("Ya existe una cuenta admin. Solo se permite una.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const registerResponse = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const registerData = (await registerResponse
        .json()
        .catch(() => null)) as {
        error?: string;
      } | null;

      if (!registerResponse.ok) {
        throw new Error(
          registerData?.error ?? "No se pudo crear la cuenta admin",
        );
      }

      const credential = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password,
      );
      const idToken = await credential.user.getIdToken();
      await completeRegistration(idToken);
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : "No se pudo crear la cuenta";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!adminAlreadyExists && setupUnavailable ? (
        <p className="rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          No se pudo conectar con Firebase Admin en el servidor. Revisa en
          Vercel{" "}
          <code className="text-js-text">FIREBASE_ADMIN_SERVICE_ACCOUNT</code>{" "}
          (JSON completo) o las variables{" "}
          <code className="text-js-text">FIREBASE_ADMIN_*</code>, sobre todo la
          private key con <code className="text-js-text">\n</code> literales.
          {status?.reason ? (
            <>
              <br />
              <span className="text-js-text-dim mt-1 block text-xs">
                Detalle: {status.reason}
              </span>
            </>
          ) : null}
        </p>
      ) : null}

      {adminAlreadyExists ? (
        <p className="rounded-sm border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          Ya existe una cuenta admin. Solo se permite una.
        </p>
      ) : null}

      <div>
        <label
          htmlFor="register-email"
          className="text-js-text-muted mb-1 block text-sm"
        >
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          disabled={isDisabled}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(
            "border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm disabled:opacity-60",
            blockedControlClass,
          )}
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="text-js-text-muted mb-1 block text-sm"
        >
          Contraseña
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isDisabled}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={cn(
            "border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm disabled:opacity-60",
            blockedControlClass,
          )}
        />
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="text-js-text-muted mb-1 block text-sm"
        >
          Confirmar contraseña
        </label>
        <input
          id="register-confirm-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isDisabled}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className={cn(
            "border-js-border bg-js-bg text-js-text w-full rounded-sm border px-3 py-2 text-sm disabled:opacity-60",
            blockedControlClass,
          )}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          "js-btn-primary w-full justify-center disabled:opacity-60",
          blockedControlClass,
        )}
      >
        {loading ? "Creando…" : "Crear cuenta admin"}
      </button>

      <GoogleSignInButton
        label="Registrar con Google"
        disabled={isDisabled}
        className={blockedControlClass}
        onError={setError}
        onSuccess={async (idToken) => {
          if (adminAlreadyExists) {
            setError("Ya existe una cuenta admin. Solo se permite una.");
            return;
          }

          if (setupUnavailable) {
            setError(
              "Firebase Admin no está disponible en el servidor. Revisa la configuración en Vercel.",
            );
            return;
          }

          setLoading(true);
          setError(null);

          try {
            const response = await fetch("/api/admin/register-google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            });

            const data = (await response.json().catch(() => null)) as {
              error?: string;
            } | null;

            if (!response.ok) {
              await getFirebaseAuth().signOut();
              throw new Error(data?.error ?? "No se pudo registrar con Google");
            }

            await completeRegistration(idToken);
          } catch (registerError) {
            const message =
              registerError instanceof Error
                ? registerError.message
                : "No se pudo registrar con Google";
            setError(message);
          } finally {
            setLoading(false);
          }
        }}
      />
    </form>
  );
}
