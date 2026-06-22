import type { Metadata } from "next";
import { AdminLoginPage } from "@/features/admin/pages/AdminLoginPage";

export const metadata: Metadata = {
  title: "Admin — Iniciar sesión",
  robots: { index: false, follow: false },
};

export default function AdminLoginRoute() {
  return <AdminLoginPage />;
}
