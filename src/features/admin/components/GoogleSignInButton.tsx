"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { cn } from "@/lib/cn";
import { getFirebaseAuth } from "@/lib/firebase/client";

type GoogleSignInButtonProps = {
  label: string;
  disabled?: boolean;
  className?: string;
  onSuccess: (idToken: string) => Promise<void>;
  onError: (message: string) => void;
};

function prefersGoogleRedirect(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
}

function mapGoogleAuthError(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";

  if (code === "auth/unauthorized-domain") {
    return "Este dominio no está autorizado en Firebase. Añade jammer-warriors.vercel.app en Authentication → Settings → Authorized domains.";
  }

  if (
    code === "auth/popup-blocked" ||
    code === "auth/cancelled-popup-request"
  ) {
    return "El navegador bloqueó la ventana de Google. Prueba de nuevo o usa email/contraseña.";
  }

  if (code === "auth/popup-closed-by-user") {
    return "Se cerró la ventana de Google antes de completar el inicio de sesión.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "No se pudo autenticar con Google";
}

export function GoogleSignInButton({
  label,
  disabled = false,
  className,
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function completeRedirectSignIn() {
      try {
        const result = await getRedirectResult(getFirebaseAuth());
        if (!result?.user || cancelled) return;

        setLoading(true);
        const idToken = await result.user.getIdToken();
        await onSuccess(idToken);
      } catch (error) {
        if (!cancelled) {
          onError(mapGoogleAuthError(error));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void completeRedirectSignIn();

    return () => {
      cancelled = true;
    };
  }, [onError, onSuccess]);

  async function handleClick() {
    setLoading(true);
    onError("");

    try {
      const provider = new GoogleAuthProvider();

      if (prefersGoogleRedirect()) {
        await signInWithRedirect(getFirebaseAuth(), provider);
        return;
      }

      const credential = await signInWithPopup(getFirebaseAuth(), provider);
      const idToken = await credential.user.getIdToken();
      await onSuccess(idToken);
    } catch (error) {
      onError(mapGoogleAuthError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={() => void handleClick()}
      className={cn(
        "js-btn-secondary w-full justify-center disabled:opacity-60",
        className,
      )}
    >
      {loading ? "Conectando…" : label}
    </button>
  );
}
