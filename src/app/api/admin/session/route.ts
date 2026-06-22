import { NextResponse, type NextRequest } from "next/server";
import {
  createAdminSessionCookie,
  getVerifiedAdminFromCookies,
  getVerifiedAdminFromRequest,
  verifyIdTokenForAdmin,
} from "@/lib/firebase/auth-server";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
} from "@/lib/firebase/constants";
import { enforceRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

type SessionBody = {
  idToken?: string;
};

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE_MS / 1000,
    path: "/",
  };
}

export async function GET(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ authenticated: false }, { status: 503 });
  }

  const admin = await getVerifiedAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, email: admin.email });
}

export async function POST(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase no configurado" },
      { status: 503 },
    );
  }

  const rateLimit = await enforceRateLimit(request, "session");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos." },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    );
  }

  let body: SessionBody;
  try {
    body = (await request.json()) as SessionBody;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (!body.idToken) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }

  const admin = await verifyIdTokenForAdmin(body.idToken);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const sessionCookie = await createAdminSessionCookie(body.idToken);
  const response = NextResponse.json({ ok: true, email: admin.email });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    sessionCookie,
    sessionCookieOptions(),
  );
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...sessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}

export async function HEAD() {
  if (!isFirebaseAdminConfigured()) {
    return new NextResponse(null, { status: 503 });
  }

  const admin = await getVerifiedAdminFromCookies();
  return new NextResponse(null, { status: admin ? 200 : 401 });
}
