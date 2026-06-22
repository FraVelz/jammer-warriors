import { getAdminFirestore } from "@/lib/firebase/admin";
import { SITE_DOC_PATH, type SiteRecord } from "@/lib/firebase/constants";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export type DiscordInviteSource = "firestore" | "unset";

async function readDiscordInviteFromFirestore(): Promise<string | null> {
  if (!isFirebaseAdminConfigured()) return null;

  try {
    const snap = await getAdminFirestore().doc(SITE_DOC_PATH).get();
    if (!snap.exists) return null;
    const data = snap.data() as SiteRecord;
    return data.discordInvite ?? null;
  } catch {
    return null;
  }
}

export async function getDiscordInvite(): Promise<string | null> {
  try {
    return await readDiscordInviteFromFirestore();
  } catch {
    return null;
  }
}

export async function getDiscordInviteForAdmin(): Promise<{
  discordInvite: string | null;
  source: DiscordInviteSource;
}> {
  try {
    const fromFirestore = await readDiscordInviteFromFirestore();
    if (fromFirestore) {
      return { discordInvite: fromFirestore, source: "firestore" };
    }
  } catch {
    // Fall through to unset — admin panel can still save a new URL.
  }

  return { discordInvite: null, source: "unset" };
}
