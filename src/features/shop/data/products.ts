import type { IconName } from "@/types/icons";

export type Product = {
  id: string;
  icon: IconName;
  name: string;
  price: number;
  features: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "s1",
    icon: "antenna",
    name: "Jammer S1 – Short Range",
    price: 20,
    features: [
      "Range: 5–10 meters",
      "Battery: 2 hours",
      "Frequency: 2.4 GHz",
      "Stealth casing",
      "Plug & play",
    ],
  },
  {
    id: "s2",
    icon: "zap",
    name: "Jammer S2 – Medium Range",
    price: 35,
    features: [
      "Range: 10–20 meters",
      "Battery: 4 hours",
      "Frequency: 2.4 / 5 GHz",
      "Rechargeable",
      "LED indicator",
    ],
  },
  {
    id: "s3",
    icon: "shield",
    name: "Jammer S3 – Long Range",
    price: 55,
    features: [
      "Range: 20–40 meters",
      "Battery: 6 hours",
      "Multi-frequency",
      "Portable design",
      "Includes charger",
    ],
  },
  {
    id: "s4",
    icon: "battery-full",
    name: "Jammer S4 – Heavy Duty",
    price: 85,
    features: [
      "Range: 50+ meters",
      "Battery: 10 hours",
      "Full spectrum",
      "Rugged casing",
      "Professional grade",
    ],
  },
];
