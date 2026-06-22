"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

type GoogleSignInButtonProps = {
  label: string;
  disabled?: boolean;
  onSuccess: (idToken: string) => Promise<void>;
  onError: (message: string) => void;
};

export function GoogleSignInButton({
  label,
  disabled = false,
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    onError("");

    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(getFirebaseAuth(), provider);
      const idToken = await credential.user.getIdToken();
      await onSuccess(idToken);
    } catch {
      onError("No se pudo autenticar con Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={() => void handleClick()}
      className="js-btn-secondary w-full justify-center disabled:opacity-60"
    >
      {loading ? "Conectando…" : label}
    </button>
  );
}
