import type { SVGProps } from "react";

export function BatteryFullIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M10 10v4m4-4v4m8 0v-4M6 10v4" />
      <rect width="16" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}
