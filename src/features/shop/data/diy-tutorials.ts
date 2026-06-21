export type DiyTutorial = {
  id: string;
  name: string;
  price: number;
  features: string[];
  cta: string;
};

export const DIY_TUTORIALS: DiyTutorial[] = [
  {
    id: "beginner",
    name: "Beginner Jammer",
    price: 5,
    features: ["parts list", "wiring diagram", "soldering guide"],
    cta: "get tutorial",
  },
  {
    id: "advanced",
    name: "Advanced Frequency Tuner",
    price: 10,
    features: ["full schematics", "PCB layout", "tuning guide"],
    cta: "get tutorial",
  },
  {
    id: "stealth",
    name: "Stealth Jammer Build",
    price: 12,
    features: ["compact design", "battery mods", "stealth casing"],
    cta: "get tutorial",
  },
  {
    id: "bundle",
    name: "Full DIY Bundle",
    price: 20,
    features: ["all 3 tutorials", "bonus: test guide", "lifetime updates"],
    cta: "get bundle",
  },
];
