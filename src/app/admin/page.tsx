import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getVerifiedAdminFromCookies } from "@/lib/firebase/auth-server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminIndexPage() {
  const admin = await getVerifiedAdminFromCookies();
  redirect(admin ? "/admin/dashboard" : "/admin/login");
}
