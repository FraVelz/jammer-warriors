type ServerEnvKey =
  | "STRIPE_SECRET_KEY"
  | "FIREBASE_ADMIN_PROJECT_ID"
  | "FIREBASE_ADMIN_CLIENT_EMAIL"
  | "FIREBASE_ADMIN_PRIVATE_KEY";

type FirebaseAdminEnv = {
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

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(
    getServerEnv("FIREBASE_ADMIN_PROJECT_ID") &&
    getServerEnv("FIREBASE_ADMIN_CLIENT_EMAIL") &&
    getServerEnv("FIREBASE_ADMIN_PRIVATE_KEY"),
  );
}

export function requireFirebaseAdminEnv(): FirebaseAdminEnv {
  return {
    projectId: requireServerEnv("FIREBASE_ADMIN_PROJECT_ID"),
    clientEmail: requireServerEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
    privateKey: requireServerEnv("FIREBASE_ADMIN_PRIVATE_KEY"),
  };
}
