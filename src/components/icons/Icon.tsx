"use client";

import type { ComponentType, SVGProps } from "react";
import { AntennaIcon } from "@/components/icons/svg/AntennaIcon";
import { ArrowLeftIcon } from "@/components/icons/svg/ArrowLeftIcon";
import { BatteryFullIcon } from "@/components/icons/svg/BatteryFullIcon";
import { ChevronRightIcon } from "@/components/icons/svg/ChevronRightIcon";
import { MailIcon } from "@/components/icons/svg/MailIcon";
import { MenuIcon } from "@/components/icons/svg/MenuIcon";
import { MessageCircleIcon } from "@/components/icons/svg/MessageCircleIcon";
import { PackageIcon } from "@/components/icons/svg/PackageIcon";
import { PinIcon } from "@/components/icons/svg/PinIcon";
import { PlugIcon } from "@/components/icons/svg/PlugIcon";
import { RadioIcon } from "@/components/icons/svg/RadioIcon";
import { ShieldIcon } from "@/components/icons/svg/ShieldIcon";
import { TriangleAlertIcon } from "@/components/icons/svg/TriangleAlertIcon";
import { WrenchIcon } from "@/components/icons/svg/WrenchIcon";
import { XIcon } from "@/components/icons/svg/XIcon";
import { ZapIcon } from "@/components/icons/svg/ZapIcon";
import { cn } from "@/lib/cn";
import type { IconName } from "@/types/icons";

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  label?: string;
};

const ICONS: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  antenna: AntennaIcon,
  zap: ZapIcon,
  shield: ShieldIcon,
  "battery-full": BatteryFullIcon,
  plug: PlugIcon,
  wrench: WrenchIcon,
  "message-circle": MessageCircleIcon,
  pin: PinIcon,
  mail: MailIcon,
  package: PackageIcon,
  "triangle-alert": TriangleAlertIcon,
  "chevron-right": ChevronRightIcon,
  "arrow-left": ArrowLeftIcon,
  menu: MenuIcon,
  x: XIcon,
  radio: RadioIcon,
};

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 2,
  label,
}: IconProps) {
  const Cmp = ICONS[name];
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
