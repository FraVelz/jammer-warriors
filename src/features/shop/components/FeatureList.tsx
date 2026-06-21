import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type FeatureListProps = {
  items: string[];
  className?: string;
};

export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={cn("list-none", className)}>
      {items.map((item) => (
        <li key={item} className="js-feature-list-item">
          <Icon
            name="chevron-right"
            size={14}
            className="text-js-accent mt-0.5 shrink-0"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
