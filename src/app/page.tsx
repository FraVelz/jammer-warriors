import { connection } from "next/server";
import { generateShopMetadata } from "@/lib/seo/metadata";
import { ShopJsonLd } from "@/lib/seo/shop-json-ld";
import { ShopPage } from "@/features/shop/pages/ShopPage";
import { isStripeConfigured } from "@/lib/env/server-env";
import { getDiscordInvite } from "@/lib/site-settings/get-discord-invite";

export const generateMetadata = generateShopMetadata;

export default async function HomePage() {
  await connection();
  const stripeEnabled = isStripeConfigured();
  let discordInvite: string | null = null;
  try {
    discordInvite = await getDiscordInvite();
  } catch {
    discordInvite = null;
  }

  return (
    <>
      <ShopJsonLd />
      <ShopPage stripeEnabled={stripeEnabled} discordInvite={discordInvite} />
    </>
  );
}
