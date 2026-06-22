import { cn } from "@/lib/cn";

type DiscordInviteLinkProps = {
  invite: string | null;
  children: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
};

export function DiscordInviteLink({
  invite,
  children,
  className,
  fallbackClassName,
}: DiscordInviteLinkProps) {
  if (!invite) {
    return (
      <span className={cn("text-js-text-dim", fallbackClassName)}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={invite}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
