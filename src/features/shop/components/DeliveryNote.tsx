import Link from "next/link";
import { Icon } from "@/components/icons";
import { getSiteConfig } from "@/features/shop/data/site-config";

export function DeliveryNote() {
  return (
    <div
      id="delivery"
      className="border-js-accent bg-js-delivery-bg my-8 border-l-4 px-5 py-4 text-[15px]"
    >
      <p className="text-js-accent flex items-center gap-2 font-bold">
        <Icon name="package" size={18} />
        delivery – €{getSiteConfig().deliveryFee} flat rate
      </p>
      <p className="mt-1">
        All pre-built jammers are shipped within 24 hours.
        <br />
        Tracking number provided. Worldwide shipping available.
        <br />
        <span className="text-js-text-dim text-sm">
          (some countries restricted – ask before ordering — see{" "}
          <Link href="/terms#shipping-restrictions" className="text-js-accent">
            terms
          </Link>
          )
        </span>
      </p>
    </div>
  );
}
