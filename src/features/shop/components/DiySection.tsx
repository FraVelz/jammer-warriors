"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import { cn } from "@/lib/cn";
import { FeatureList } from "./FeatureList";

type DiyCardProps = {
  tutorial: DiyTutorial;
  onBuy: (tutorial: DiyTutorial) => void;
};

function DiyCard({ tutorial, onBuy }: DiyCardProps) {
  return (
    <article
      id={`diy-${tutorial.id}`}
      className={cn("js-card js-card-stack", "p-5")}
    >
      <h3 className="text-[17px] text-white">{tutorial.name}</h3>
      <p className="text-js-accent text-lg font-bold">€{tutorial.price}</p>
      <FeatureList items={tutorial.features} className="my-2 flex-1" />
      <button
        type="button"
        onClick={() => onBuy(tutorial)}
        className="js-btn-diy"
        aria-label={`Buy ${tutorial.name} tutorial for €${tutorial.price}`}
      >
        {tutorial.cta}
      </button>
    </article>
  );
}

type DiySectionProps = {
  tutorials: DiyTutorial[];
  onBuy: (tutorial: DiyTutorial) => void;
};

export function DiySection({ tutorials, onBuy }: DiySectionProps) {
  return (
    <section
      id="diy"
      aria-labelledby="diy-heading"
      className="border-js-border mt-5 border-t-2 pt-10"
    >
      <h2
        id="diy-heading"
        className="text-js-accent mb-5 flex items-center gap-2 text-2xl"
      >
        <Icon name="wrench" size={24} />
        DIY tutorials – build your own
      </h2>
      <p className="text-js-text-dim mb-5">
        Step-by-step guides, schematics, parts lists. No experience needed.{" "}
        <Link href="/terms" className="js-text-link">
          Educational use only — see terms
        </Link>
        .
      </p>
      <div className="js-shop-grid">
        {tutorials.map((tutorial) => (
          <DiyCard key={tutorial.id} tutorial={tutorial} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
}
