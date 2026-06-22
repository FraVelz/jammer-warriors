export const ADMIN_SESSION_COOKIE = "__admin_session";
export const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000;
export const ADMIN_DOC_PATH = "config/admin";
export const SITE_DOC_PATH = "config/site";

export type AdminRecord = {
  uid: string;
  email: string;
  provider: "password" | "google.com";
  createdAt: string;
};

export type SiteRecord = {
  discordInvite: string;
  updatedAt?: string;
  updatedBy?: string;
};
