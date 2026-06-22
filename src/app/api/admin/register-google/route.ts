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

type RegisterGoogleBody = {
  idToken?: string;
};

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase no configurado" },
      { status: 503 },
    );
  }

  const rateLimit = await enforceRateLimit(request, "register-google");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos." },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    );
  }

  let body: RegisterGoogleBody;
  try {
    body = (await request.json()) as RegisterGoogleBody;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (!body.idToken) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }

  const auth = await getAdminAuth();
  let decoded;

  try {
    decoded = await auth.verifyIdToken(body.idToken);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const db = await getAdminFirestore();
  const adminRef = db.doc(ADMIN_DOC_PATH);
  const existing = await adminRef.get();

  if (existing.exists) {
    await auth.deleteUser(decoded.uid).catch(() => undefined);
    return NextResponse.json(
      { error: "Ya existe una cuenta admin. Solo se permite una." },
      { status: 409 },
    );
  }

  const email = decoded.email;
  if (!email) {
    await auth.deleteUser(decoded.uid).catch(() => undefined);
    return NextResponse.json(
      { error: "La cuenta de Google debe tener email" },
      { status: 400 },
    );
  }

  try {
    await adminRef.create({
      uid: decoded.uid,
      email,
      provider: "google.com",
      createdAt: await firestoreServerTimestamp(),
    });
  } catch {
    await auth.deleteUser(decoded.uid).catch(() => undefined);
    return NextResponse.json(
      { error: "Ya existe una cuenta admin. Solo se permite una." },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
