"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import type { DiyTutorial } from "@/features/shop/data/diy-tutorials";
import { FeatureList } from "./FeatureList";

type DiyCardProps = {
  tutorial: DiyTutorial;
  onBuy: (tutorial: DiyTutorial) => void;
};

function DiyCard({ tutorial, onBuy }: DiyCardProps) {
  return (
    <article className="border-js-border bg-js-bg-card rounded border p-5">
      <h3 className="text-[17px] text-white">{tutorial.name}</h3>
      <p className="text-js-accent text-lg font-bold">€{tutorial.price}</p>
      <FeatureList items={tutorial.features} className="my-2" />
      <button
        type="button"
        onClick={() => onBuy(tutorial)}
        className="text-js-text mt-2 inline-block cursor-pointer rounded-sm border border-[#444] bg-[#333] px-4 py-1.5 text-sm hover:border-[#555] hover:bg-[#444] hover:text-white"
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
    <section id="diy" className="border-js-border mt-5 border-t-2 pt-10">
      <h2 className="text-js-accent mb-5 flex items-center gap-2 text-2xl">
        <Icon name="wrench" size={24} />
        DIY tutorials – build your own
      </h2>
      <p className="text-js-text-dim mb-5">
        Step-by-step guides, schematics, parts lists. No experience needed.{" "}
        <Link href="/terms" className="text-js-accent hover:underline">
          Educational use only — see terms
        </Link>
        .
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {tutorials.map((tutorial) => (
          <DiyCard key={tutorial.id} tutorial={tutorial} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
}
