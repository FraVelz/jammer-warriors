import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import {
  isFirebaseAdminConfigured,
  requireFirebaseAdminEnv,
} from "@/lib/env/server-env";

let app: App | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

function normalizePrivateKey(privateKey: string): string {
  const unquoted = privateKey.replace(/^["']|["']$/g, "");
  return unquoted.includes("\\n") ? unquoted.replace(/\\n/g, "\n") : unquoted;
}

export function getFirebaseAdminApp(): App {
  if (app) return app;

  try {
    if (isFirebaseAdminConfigured()) {
      const { projectId, clientEmail, privateKey } = requireFirebaseAdminEnv();
      app =
        getApps().find((candidate) => candidate.name === "[DEFAULT]") ??
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey: normalizePrivateKey(privateKey),
          }),
        });
      return app;
    }

    throw new Error(
      "Firebase Admin is not configured (FIREBASE_ADMIN_* env vars missing)",
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Firebase Admin error";
    throw new Error(`Firebase Admin failed to initialize: ${message}`);
  }
}

export function getAdminAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseAdminApp());
  }
  return auth;
}

export function getAdminFirestore(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseAdminApp());
  }
  return firestore;
}

export function tryGetAdminFirestore(): Firestore | null {
  try {
    return getAdminFirestore();
  } catch {
    return null;
  }
}
