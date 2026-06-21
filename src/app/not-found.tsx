import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="border-js-border bg-js-bg-card mb-6 flex h-24 w-24 items-center justify-center rounded-full border">
        <Icon name="radio" size={48} className="text-js-accent animate-pulse" />
      </div>
      <p className="text-js-accent mb-2 text-sm tracking-[0.3em] uppercase">
        signal lost
      </p>
      <h1 className="mb-3 text-5xl font-bold text-white sm:text-6xl">404</h1>
      <p className="text-js-text-muted mb-8 max-w-md text-sm sm:text-base">
        This frequency does not exist. The page you are looking for was jammed,
        moved, or never broadcast.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="js-btn-primary gap-2 no-underline">
          <Icon name="arrow-left" size={16} />
          back to shop
        </Link>
        <Link href="/terms" className="js-btn-secondary no-underline">
          legal pages
        </Link>
      </div>
    </PageShell>
  );
}
