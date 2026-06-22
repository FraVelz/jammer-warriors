import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/env/server-env";

const RATE_LIMIT_COLLECTION = "rateLimits";

type RateLimitResult = {
  allowed: boolean;
  retryAfterMs: number;
};

function sanitizeRateLimitKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (!isFirebaseAdminConfigured()) {
    return { allowed: true, retryAfterMs: 0 };
  }

  const db = await getAdminFirestore();
  const docRef = db.doc(
    `${RATE_LIMIT_COLLECTION}/${sanitizeRateLimitKey(key)}`,
  );
  const now = Date.now();

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) {
      tx.set(docRef, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterMs: 0 };
    }

    const data = snap.data() as { count: number; resetAt: number };
    if (data.resetAt <= now) {
      tx.set(docRef, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterMs: 0 };
    }

    if (data.count >= limit) {
      return { allowed: false, retryAfterMs: data.resetAt - now };
    }

    tx.update(docRef, { count: data.count + 1 });
    return { allowed: true, retryAfterMs: 0 };
  });
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function enforceRateLimit(
  request: Request,
  action: string,
  limit = 5,
  windowMs = 15 * 60 * 1000,
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  return checkRateLimit(`${action}:${ip}`, limit, windowMs);
}

export function rateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  if (result.allowed) return {};
  const retryAfterSec = Math.ceil(result.retryAfterMs / 1000);
  return { "Retry-After": String(retryAfterSec) };
}

export { FieldValue };
