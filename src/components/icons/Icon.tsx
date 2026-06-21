"use client";

import { ICON_MAP } from "@/components/icons/icon-map";
import { cn } from "@/lib/cn";
import type { IconName } from "@/types/icons";

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  label?: string;
};

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 2,
  label,
}: IconProps) {
  const Cmp = ICON_MAP[name];
  const decorative = !label;

  return (
    <Cmp
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={cn("inline-block shrink-0", className)}
      aria-hidden={decorative}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
