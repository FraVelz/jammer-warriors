const DISCORD_INVITE_PATTERN =
  /^https:\/\/(discord\.gg\/[A-Za-z0-9-]+|discord\.com\/invite\/[A-Za-z0-9-]+)$/;

export function isValidDiscordInviteUrl(url: string): boolean {
  return DISCORD_INVITE_PATTERN.test(url.trim());
}

export function normalizeDiscordInviteUrl(url: string): string {
  return url.trim();
}
