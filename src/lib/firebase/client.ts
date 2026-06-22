import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirebaseClientConfig,
  isFirebaseClientConfigured,
} from "@/lib/env/public-env";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseReady(): boolean {
  return isFirebaseClientConfigured();
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseClientConfigured()) {
    throw new Error("Firebase client is not configured");
  }

  if (!app) {
    app = getApps().length
      ? getApp()
      : initializeApp(getFirebaseClientConfig());
  }

  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}
