type ServerEnvKey =
  | "STRIPE_SECRET_KEY"
  | "FIREBASE_ADMIN_PROJECT_ID"
  | "FIREBASE_ADMIN_CLIENT_EMAIL"
  | "FIREBASE_ADMIN_PRIVATE_KEY"
  | "FIREBASE_ADMIN_SERVICE_ACCOUNT";

export type FirebaseAdminEnv = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export function getServerEnv(key: ServerEnvKey): string | undefined {
  return process.env[key];
}

export function requireServerEnv(key: ServerEnvKey): string {
  const value = getServerEnv(key);
  if (!value) {
    throw new Error(`${key} is not configured`);
  }
  return value;
}

export function isStripeConfigured(): boolean {
  return Boolean(getServerEnv("STRIPE_SECRET_KEY"));
}

function parseServiceAccountJson(raw: string): FirebaseAdminEnv | null {
  try {
    const parsed = JSON.parse(raw) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };

    if (parsed.project_id && parsed.client_email && parsed.private_key) {
      return {
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function getFirebaseAdminEnv(): FirebaseAdminEnv | null {
  const serviceAccount = getServerEnv("FIREBASE_ADMIN_SERVICE_ACCOUNT");
  if (serviceAccount) {
    const fromJson = parseServiceAccountJson(serviceAccount.trim());
    if (fromJson) return fromJson;
  }

  const projectId = getServerEnv("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = getServerEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKey = getServerEnv("FIREBASE_ADMIN_PRIVATE_KEY");

  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }

  return null;
}

export function isFirebaseAdminConfigured(): boolean {
  return getFirebaseAdminEnv() !== null;
}

export function requireFirebaseAdminEnv(): FirebaseAdminEnv {
  const env = getFirebaseAdminEnv();
  if (!env) {
    throw new Error("Firebase Admin is not configured");
  }
  return env;
}
