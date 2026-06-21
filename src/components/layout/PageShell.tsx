import { cn } from "@/lib/cn";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  as?: "main" | "div";
  /** shop: 896px · legal: 768px · wide: 1024px */
  width?: "shop" | "legal" | "wide";
};

const WIDTH_CLASS = {
  shop: "max-w-4xl",
  legal: "max-w-3xl",
  wide: "max-w-5xl",
} as const;

export function PageShell({
  children,
  className,
  as: Tag = "main",
  width = "shop",
}: PageShellProps) {
  return (
    <Tag
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
