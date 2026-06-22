import Link from "next/link";
import { AdminAuthGate } from "@/features/admin/components/AdminAuthGate";

export function AdminLoginPage() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <header className="w-full text-center">
        <p className="text-js-accent mb-2 text-sm font-bold tracking-wide uppercase">
          Jammer Warriors
        </p>
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <p className="text-js-text-muted mt-2 text-sm">
          Inicia sesión o crea la única cuenta admin para gestionar la URL de
          Discord.
        </p>
      </header>

      <AdminAuthGate />

      <p className="text-js-text-dim text-center text-sm">
        <Link href="/" className="js-text-link">
          Volver a la tienda
        </Link>
      </p>
    </div>
  );
}
