"use client";

import { AuthForm } from "@/features/admin/components/AuthForm";
import { isFirebaseReady } from "@/lib/firebase/client";

export function AdminAuthGate() {
  if (!isFirebaseReady()) {
    return (
      <p className="border-js-border bg-js-bg-card mx-auto w-full max-w-md rounded-sm border px-4 py-3 text-sm text-amber-200">
        Firebase no está configurado. Añade las variables{" "}
        <code className="text-js-text">NEXT_PUBLIC_FIREBASE_*</code> y las
        credenciales de admin en el servidor.
      </p>
    );
  }

  return <AuthForm />;
}
