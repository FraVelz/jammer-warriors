import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getVerifiedAdminFromRequest } from "@/lib/firebase/auth-server";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { SITE_DOC_PATH } from "@/lib/firebase/constants";
import {
  isValidDiscordInviteUrl,
  normalizeDiscordInviteUrl,
} from "@/lib/firebase/discord-invite";
import {
  enforceRateLimit,
  firestoreServerTimestamp,
  rateLimitHeaders,
} from "@/lib/rate-limit";
import { getDiscordInviteForAdmin } from "@/lib/site-settings/get-discord-invite";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export const runtime = "nodejs";

type DiscordInviteBody = {
  discordInvite?: string;
};

export async function GET(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase no configurado" },
      { status: 503 },
    );
  }

  const admin = await getVerifiedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { discordInvite, source } = await getDiscordInviteForAdmin();
  return NextResponse.json({ discordInvite, source });
}

export async function PATCH(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase no configurado" },
      { status: 503 },
    );
  }

  const rateLimit = await enforceRateLimit(request, "discord-invite");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos." },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    );
  }

  const admin = await getVerifiedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: DiscordInviteBody;
  try {
    body = (await request.json()) as DiscordInviteBody;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const discordInvite = normalizeDiscordInviteUrl(body.discordInvite ?? "");
  if (!isValidDiscordInviteUrl(discordInvite)) {
    return NextResponse.json(
      {
        error:
          "URL inválida. Usa https://discord.gg/... o https://discord.com/invite/...",
      },
      { status: 400 },
    );
  }

  await (await getAdminFirestore()).doc(SITE_DOC_PATH).set(
    {
      discordInvite,
      updatedAt: await firestoreServerTimestamp(),
      updatedBy: admin.uid,
    },
    { merge: true },
  );

  revalidateTag("discord-invite-firestore", "max");

  return NextResponse.json({ ok: true, discordInvite });
}
