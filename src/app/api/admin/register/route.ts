import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase/admin";
import { ADMIN_DOC_PATH } from "@/lib/firebase/constants";
import {
  enforceRateLimit,
  firestoreServerTimestamp,
  rateLimitHeaders,
} from "@/lib/rate-limit";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export const runtime = "nodejs";

type RegisterBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Firebase no configurado" },
        { status: 503 },
      );
    }

    const rateLimit = await enforceRateLimit(request, "register");
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Demasiados intentos. Espera unos minutos." },
        { status: 429, headers: rateLimitHeaders(rateLimit) },
      );
    }

    let body: RegisterBody;
    try {
      body = (await request.json()) as RegisterBody;
    } catch {
      return NextResponse.json(
        { error: "Solicitud inválida" },
        { status: 400 },
      );
    }

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 },
      );
    }

    const db = await getAdminFirestore();
    const adminRef = db.doc(ADMIN_DOC_PATH);
    const existing = await adminRef.get();
    if (existing.exists) {
      return NextResponse.json(
        { error: "Ya existe una cuenta admin. Solo se permite una." },
        { status: 409 },
      );
    }

    const auth = await getAdminAuth();
    let uid: string;

    try {
      const user = await auth.createUser({ email, password });
      uid = user.uid;
    } catch (error) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "unknown";

      if (code === "auth/email-already-exists") {
        return NextResponse.json(
          { error: "Este email ya está registrado" },
          { status: 409 },
        );
      }

      const detail =
        error instanceof Error ? error.message : "create_user_failed";
      return NextResponse.json(
        { error: "No se pudo crear la cuenta", detail },
        { status: 500 },
      );
    }

    try {
      await adminRef.create({
        uid,
        email,
        provider: "password",
        createdAt: await firestoreServerTimestamp(),
      });
    } catch {
      await auth.deleteUser(uid).catch(() => undefined);
      return NextResponse.json(
        { error: "Ya existe una cuenta admin. Solo se permite una." },
        { status: 409 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "register_unhandled_error";
    return NextResponse.json(
      { error: "Error interno al registrar admin", detail },
      { status: 500 },
    );
  }
}
