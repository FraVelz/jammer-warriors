import { cn } from "@/lib/cn";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  as?: "main" | "div";
  /** shop/wide: 1152px · legal: 768px */
  width?: "shop" | "legal" | "wide";
  id?: string;
};

const WIDTH_CLASS = {
  shop: "max-w-6xl",
  legal: "max-w-3xl",
  wide: "max-w-6xl",
} as const;

export function PageShell({
  children,
  className,
  as: Tag = "main",
  width = "shop",
  id = Tag === "main" ? "main-content" : undefined,
}: PageShellProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full px-4 py-6 sm:px-6 sm:py-8",
        WIDTH_CLASS[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
