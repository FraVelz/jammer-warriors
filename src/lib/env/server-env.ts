type ServerEnvKey = "STRIPE_SECRET_KEY";

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
