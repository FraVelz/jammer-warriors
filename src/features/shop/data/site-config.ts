import { getPublicEnv, getPublicEnvNumber } from "@/lib/env/public-env";

export function getSiteConfig() {
  return {
    paypalEmail: getPublicEnv("NEXT_PUBLIC_PAYPAL_EMAIL"),
    deliveryFee: getPublicEnvNumber("NEXT_PUBLIC_DELIVERY_FEE"),
  };
}
