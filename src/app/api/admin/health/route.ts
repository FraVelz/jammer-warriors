import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    firebaseAdminEnvPresent: isFirebaseAdminConfigured(),
  });
}
