import Link from "next/link";
import { DiscordInviteForm } from "@/features/admin/components/DiscordInviteForm";

type AdminDashboardPageProps = {
  email: string;
  discordInvite: string;
  source: "firestore" | "env";
};

export function AdminDashboardPage({
  email,
  discordInvite,
  source,
}: AdminDashboardPageProps) {
  return (
    <div className="w-full space-y-6">
      <header>
        <p className="text-js-accent mb-2 text-sm font-bold tracking-wide uppercase">
          Admin
        </p>
        <h1 className="text-2xl font-bold">Configuración de Discord</h1>
        <p className="text-js-text-muted mt-2 text-sm">
          Sesión: <span className="text-js-text">{email}</span>
        </p>
      </header>

      <DiscordInviteForm initialInvite={discordInvite} source={source} />

      <p className="text-js-text-dim text-sm">
        <Link href="/" className="js-text-link">
          Volver a la tienda
        </Link>
      </p>
    </div>
  );
}
