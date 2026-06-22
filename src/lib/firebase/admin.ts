import {
  getFirebaseAdminEnv,
  isFirebaseAdminConfigured,
} from "@/lib/env/server-env";

type FirebaseApp = import("firebase-admin/app").App;
type FirebaseAuth = import("firebase-admin/auth").Auth;
type Firestore = import("firebase-admin/firestore").Firestore;

let app: FirebaseApp | null = null;
let auth: FirebaseAuth | null = null;
let firestore: Firestore | null = null;
let initPromise: Promise<FirebaseApp> | null = null;

export function normalizePrivateKey(privateKey: string): string {
  let key = privateKey.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  if (key.includes("\\n")) {
    key = key.replace(/\\n/g, "\n");
  }

  return key;
}

async function ensureFirebaseAdminApp(): Promise<FirebaseApp> {
  if (app) return app;

  if (!initPromise) {
    initPromise = (async () => {
      if (!isFirebaseAdminConfigured()) {
        throw new Error(
          "Firebase Admin is not configured (FIREBASE_ADMIN_* env vars missing)",
        );
      }

      const { cert, getApps, initializeApp } =
        await import("firebase-admin/app");
      const { projectId, clientEmail, privateKey } = getFirebaseAdminEnv()!;

      const nextApp =
        getApps().find((candidate) => candidate.name === "[DEFAULT]") ??
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey: normalizePrivateKey(privateKey),
          }),
        });

      app = nextApp;
      return nextApp;
    })().catch((error) => {
      initPromise = null;
      throw error;
    });
  }

  return initPromise;
}

export async function getFirebaseAdminApp(): Promise<FirebaseApp> {
  try {
    return await ensureFirebaseAdminApp();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Firebase Admin error";
    throw new Error(`Firebase Admin failed to initialize: ${message}`);
  }
}

export async function getAdminAuth(): Promise<FirebaseAuth> {
  if (!auth) {
    const { getAuth } = await import("firebase-admin/auth");
    auth = getAuth(await getFirebaseAdminApp());
  }
  return auth;
}

export async function getAdminFirestore(): Promise<Firestore> {
  if (!firestore) {
    const { getFirestore } = await import("firebase-admin/firestore");
    firestore = getFirestore(await getFirebaseAdminApp());
  }
  return firestore;
}

export async function tryGetAdminFirestore(): Promise<Firestore | null> {
  try {
    return await getAdminFirestore();
  } catch {
    return null;
  }
}
