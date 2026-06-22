import { NextResponse } from "next/server";
import { adminExists } from "@/lib/firebase/auth-server";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export async function GET() {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { canRegister: false, configured: false },
      { status: 503 },
    );
  }

  try {
    const exists = await adminExists();
    return NextResponse.json({
      canRegister: !exists,
      configured: true,
    });
  } catch {
    return NextResponse.json(
      { canRegister: false, configured: false },
      { status: 503 },
    );
  }
}
