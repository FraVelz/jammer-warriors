import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { getSiteConfig } from "@/features/shop/data/site-config";

export function DeliveryNote() {
  return (
    <div id="delivery" className="js-delivery-note">
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
          <Link href="/terms#shipping-restrictions" className="js-text-link">
            terms
          </Link>
          )
        </span>
      </p>
    </div>
  );
}
