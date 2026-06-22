import type { FirebaseOptions } from "firebase/app";

const PUBLIC_DEFAULTS = {
  NEXT_PUBLIC_PAYPAL_EMAIL: "cotsalva3@gmail.com",
  NEXT_PUBLIC_DISCORD_INVITE: "https://discord.gg/r3GnxdWF",
  NEXT_PUBLIC_DELIVERY_FEE: "5",
} as const;

type PublicEnvKey = keyof typeof PUBLIC_DEFAULTS;

const FIREBASE_PUBLIC_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

type FirebasePublicKey = (typeof FIREBASE_PUBLIC_KEYS)[number];

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

export function getOptionalPublicEnv(key: string): string | undefined {
  const value = process.env[key];
  return value && value.length > 0 ? value : undefined;
}

export function isFirebaseClientConfigured(): boolean {
  return FIREBASE_PUBLIC_KEYS.every((key) => Boolean(process.env[key]));
}

export function getFirebaseClientConfig(): FirebaseOptions {
  const config = Object.fromEntries(
    FIREBASE_PUBLIC_KEYS.map((key) => [key, process.env[key]]),
  ) as Record<FirebasePublicKey, string | undefined>;

  for (const key of FIREBASE_PUBLIC_KEYS) {
    if (!config[key]) {
      throw new Error(`${key} is not configured`);
    }
  }

  return {
    apiKey: config.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: config.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: config.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: config.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: getOptionalPublicEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getOptionalPublicEnv(
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    ),
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
