import type { FirebaseOptions } from "firebase/app";

const PUBLIC_DEFAULTS = {
  NEXT_PUBLIC_PAYPAL_EMAIL: "cotsalva3@gmail.com",
  NEXT_PUBLIC_DISCORD_INVITE: "https://discord.gg/r3GnxdWF",
  NEXT_PUBLIC_DELIVERY_FEE: "5",
} as const;

type PublicEnvKey = keyof typeof PUBLIC_DEFAULTS;

function isProductionBuild(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getPublicEnv(key: PublicEnvKey): string {
  return process.env[key] ?? PUBLIC_DEFAULTS[key];
}

export function getPublicEnvNumber(key: "NEXT_PUBLIC_DELIVERY_FEE"): number {
  const raw = getPublicEnv(key);
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    throw new Error(`${key} must be a valid number`);
  }
  return parsed;
}

function readFirebasePublicEnv() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  };
}

export function isFirebaseClientConfigured(): boolean {
  const { apiKey, authDomain, projectId, appId } = readFirebasePublicEnv();
  return Boolean(apiKey && authDomain && projectId && appId);
}

export function getFirebaseClientConfig(): FirebaseOptions {
  const {
    apiKey,
    authDomain,
    projectId,
    appId,
    storageBucket,
    messagingSenderId,
  } = readFirebasePublicEnv();

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY is not configured");
  }
  if (!authDomain) {
    throw new Error("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is not configured");
  }
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured");
  }
  if (!appId) {
    throw new Error("NEXT_PUBLIC_FIREBASE_APP_ID is not configured");
  }

  return {
    apiKey,
    authDomain,
    projectId,
    appId,
    storageBucket: storageBucket || undefined,
    messagingSenderId: messagingSenderId || undefined,
  };
}

function assertProductionSiteUrl(url: string): void {
  if (!isProductionBuild()) return;

  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${url}`);
  }

  if (hostname === "localhost" || hostname === "example.com") {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL for production: ${url}`);
  }
}

export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) {
    assertProductionSiteUrl(explicit);
    return explicit;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (isProductionBuild()) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL or VERCEL_URL is required in production builds",
    );
  }

  return "http://localhost:3000";
}
