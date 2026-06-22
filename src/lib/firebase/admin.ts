import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import {
  getServerEnv,
  isFirebaseAdminConfigured,
  requireFirebaseAdminEnv,
} from "@/lib/env/server-env";

let app: App | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

export function getFirebaseAdminApp(): App {
  if (app) return app;

  if (isFirebaseAdminConfigured()) {
    const { projectId, clientEmail, privateKey } = requireFirebaseAdminEnv();
    app =
      getApps().find((candidate) => candidate.name === "[DEFAULT]") ??
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    return app;
  }

  const projectId =
    getServerEnv("FIREBASE_ADMIN_PROJECT_ID") ?? "jammer-warriors";

  app =
    getApps().find((candidate) => candidate.name === "[DEFAULT]") ??
    initializeApp({
      credential: applicationDefault(),
      projectId,
    });

  return app;
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
