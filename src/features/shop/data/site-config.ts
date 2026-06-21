export function getSiteConfig() {
  const paypalEmail =
    process.env.NEXT_PUBLIC_PAYPAL_EMAIL ?? "cotsalva3@gmail.com";
  const discordInvite =
    process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/r3GnxdWF";
  const deliveryFee = Number(process.env.NEXT_PUBLIC_DELIVERY_FEE ?? "5");

  return {
    paypalEmail,
    discordInvite,
    deliveryFee,
  };
}
