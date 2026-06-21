import type { ComponentType, SVGProps } from "react";
import type { IconName } from "@/types/icons";
import { AntennaIcon } from "./svg/AntennaIcon";
import { ArrowLeftIcon } from "./svg/ArrowLeftIcon";
import { BatteryFullIcon } from "./svg/BatteryFullIcon";
import { ChevronRightIcon } from "./svg/ChevronRightIcon";
import { MailIcon } from "./svg/MailIcon";
import { MessageCircleIcon } from "./svg/MessageCircleIcon";
import { PackageIcon } from "./svg/PackageIcon";
import { PinIcon } from "./svg/PinIcon";
import { PlugIcon } from "./svg/PlugIcon";
import { ShieldIcon } from "./svg/ShieldIcon";
import { TriangleAlertIcon } from "./svg/TriangleAlertIcon";
import { WrenchIcon } from "./svg/WrenchIcon";
import { ZapIcon } from "./svg/ZapIcon";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const ICON_MAP: Record<IconName, IconComponent> = {
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
};
