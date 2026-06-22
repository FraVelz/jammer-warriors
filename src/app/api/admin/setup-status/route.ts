import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export const runtime = "nodejs";

export async function GET() {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      {
        canRegister: false,
        configured: false,
        reason: "missing_env",
      },
      { status: 503 },
    );
  }

  try {
    const { adminExists } = await import("@/lib/firebase/auth-server");
    const exists = await adminExists();
    return NextResponse.json({
      canRegister: !exists,
      configured: true,
    });
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "firebase_admin_init_failed";
    return NextResponse.json(
      {
        canRegister: false,
        configured: false,
        reason,
      },
      { status: 503 },
    );
  }
}
