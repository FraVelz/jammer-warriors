import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase/admin";
import {
  ADMIN_DOC_PATH,
  ADMIN_SESSION_COOKIE,
  type AdminRecord,
} from "@/lib/firebase/constants";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

export type VerifiedAdminSession = {
  uid: string;
  email: string;
};

async function getAdminRecord(): Promise<AdminRecord | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const snap = await getAdminFirestore().doc(ADMIN_DOC_PATH).get();
  if (!snap.exists) return null;
  return snap.data() as AdminRecord;
}

export async function adminExists(): Promise<boolean> {
  const record = await getAdminRecord();
  return record !== null;
}

export async function verifySessionCookie(
  sessionCookie: string,
): Promise<VerifiedAdminSession | null> {
  if (!isFirebaseAdminConfigured()) return null;
  try {
    const decoded = await getAdminAuth().verifySessionCookie(
      sessionCookie,
      true,
    );
    const admin = await getAdminRecord();
    if (!admin || admin.uid !== decoded.uid) {
      return null;
    }

    return {
      uid: decoded.uid,
      email: decoded.email ?? admin.email,
    };
  } catch {
    return null;
  }
}

export async function verifyIdTokenForAdmin(
  idToken: string,
): Promise<VerifiedAdminSession | null> {
  if (!isFirebaseAdminConfigured()) return null;
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    const admin = await getAdminRecord();
    if (!admin || admin.uid !== decoded.uid) {
      return null;
    }

    return {
      uid: decoded.uid,
      email: decoded.email ?? admin.email,
    };
  } catch {
    return null;
  }
}

export async function getVerifiedAdminFromCookies(): Promise<VerifiedAdminSession | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return null;
  return verifySessionCookie(session);
}

export async function getVerifiedAdminFromRequest(
  request: NextRequest,
): Promise<VerifiedAdminSession | null> {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return null;
  return verifySessionCookie(session);
}

export async function createAdminSessionCookie(
  idToken: string,
): Promise<string> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase admin is not configured");
  }
  const { SESSION_MAX_AGE_MS } = await import("@/lib/firebase/constants");
  return getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });
}
