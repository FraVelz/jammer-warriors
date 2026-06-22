import { unstable_cache } from "next/cache";
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

const getCachedFirestoreInvite = unstable_cache(
  readDiscordInviteFromFirestore,
  ["discord-invite-firestore"],
  { revalidate: 60, tags: ["discord-invite-firestore"] },
);

export async function getDiscordInvite(): Promise<string | null> {
  return getCachedFirestoreInvite();
}

export async function getDiscordInviteForAdmin(): Promise<{
  discordInvite: string | null;
  source: DiscordInviteSource;
}> {
  const fromFirestore = await readDiscordInviteFromFirestore();
  if (fromFirestore) {
    return { discordInvite: fromFirestore, source: "firestore" };
  }
  return { discordInvite: null, source: "unset" };
}
