"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { LoginForm } from "@/features/admin/components/LoginForm";
import { RegisterForm } from "@/features/admin/components/RegisterForm";

type AuthMode = "login" | "register";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="border-js-border bg-js-bg-card mx-auto w-full max-w-md rounded-sm border p-6">
      <div
        className="border-js-border mb-6 grid grid-cols-2 gap-1 rounded-sm border p-1"
        role="tablist"
        aria-label="Modo de autenticación"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          className={cn(
            "cursor-pointer rounded-sm px-3 py-2 text-sm font-medium",
            mode === "login"
              ? "bg-js-accent text-js-bg"
              : "text-js-text-muted hover:text-white",
          )}
          onClick={() => setMode("login")}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "register"}
          className={cn(
            "cursor-pointer rounded-sm px-3 py-2 text-sm font-medium",
            mode === "register"
              ? "bg-js-accent text-js-bg"
              : "text-js-text-muted hover:text-white",
          )}
          onClick={() => setMode("register")}
        >
          Crear cuenta
        </button>
      </div>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
