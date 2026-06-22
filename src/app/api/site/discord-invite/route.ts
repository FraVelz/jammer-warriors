import { NextResponse } from "next/server";
import { getDiscordInvite } from "@/lib/site-settings/get-discord-invite";

export const runtime = "nodejs";

export async function GET() {
  try {
    const discordInvite = await getDiscordInvite();
    return NextResponse.json({ discordInvite });
  } catch {
    return NextResponse.json({ discordInvite: null });
  }
}
