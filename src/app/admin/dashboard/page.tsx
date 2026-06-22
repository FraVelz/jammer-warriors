import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboardPage } from "@/features/admin/pages/AdminDashboardPage";
import { getVerifiedAdminFromCookies } from "@/lib/firebase/auth-server";
import { getDiscordInviteForAdmin } from "@/lib/site-settings/get-discord-invite";

export const metadata: Metadata = {
  title: "Admin — Panel",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardRoute() {
  const admin = await getVerifiedAdminFromCookies();
  if (!admin) {
    redirect("/admin/login");
  }

  const { discordInvite, source } = await getDiscordInviteForAdmin();

  return (
    <AdminDashboardPage
      email={admin.email}
      discordInvite={discordInvite}
      source={source}
    />
  );
}
