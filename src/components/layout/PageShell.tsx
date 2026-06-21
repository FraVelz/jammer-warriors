import { cn } from "@/lib/cn";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  as?: "main" | "div";
};

export function PageShell({
  children,
  className,
  as: Tag = "main",
}: PageShellProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
