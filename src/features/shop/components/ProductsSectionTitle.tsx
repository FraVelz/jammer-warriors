import Link from "next/link";
import { Icon } from "@/components/icons";

export function ProductsSectionTitle() {
  return (
    <div className="mb-5">
      <h2 className="text-js-accent flex items-center gap-2">
        <Icon name="plug" size={24} />
        pre-built jammers (ready to use)
      </h2>
      <p className="text-js-text-dim mt-2 text-sm">
        Educational and testing use only.{" "}
        <Link href="/terms" className="js-text-link">
          Read terms
        </Link>
        .
      </p>
    </div>
  );
}
