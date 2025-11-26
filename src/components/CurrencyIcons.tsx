import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CoinIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("inline-block", className)}
      {...props}
    >
      <defs>
        <radialGradient id="coinGradient" cx="50%" cy="25%" r="75%">
          <stop offset="0%" stopColor="hsl(var(--coin-gold-light))" />
          <stop offset="45%" stopColor="hsl(var(--coin-gold))" />
          <stop offset="100%" stopColor="hsl(var(--coin-gold))" />
        </radialGradient>
      </defs>
      {/* Outer coin */}
      <circle cx="32" cy="32" r="28" fill="url(#coinGradient)" />
      {/* Inner ring */}
      <circle
        cx="32"
        cy="32"
        r="21"
        fill="none"
        stroke="hsl(var(--coin-gold-light))"
        strokeWidth="2"
      />
      {/* Center */}
      <circle
        cx="32"
        cy="32"
        r="14"
        fill="hsl(var(--coin-gold-light))"
        fillOpacity={0.5}
      />
      {/* Simple currency mark */}
      <path
        d="M30 22h4c3.5 0 6 2.1 6 5.5S37.5 33 34 33h-4v9h-4V22h4Zm0 7h3.5c1.4 0 2.5-.8 2.5-1.9S34.9 25 33.5 25H30v4Z"
        fill="hsl(var(--coin-gold))"
      />
    </svg>
  );
};

export const DiamondIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("inline-block", className)}
      {...props}
    >
      <defs>
        <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--diamond-white))" />
          <stop offset="40%" stopColor="hsl(var(--diamond-blue))" />
          <stop offset="100%" stopColor="hsl(var(--diamond-blue))" />
        </linearGradient>
      </defs>
      {/* Main diamond shape */}
      <polygon
        points="8,24 20,8 44,8 56,24 32,56"
        fill="url(#diamondGradient)"
      />
      {/* Top facets */}
      <polygon points="20,8 32,24 44,8" fill="hsl(var(--diamond-white))" fillOpacity={0.8} />
      <polygon points="8,24 24,24 20,8" fill="hsl(var(--diamond-blue))" fillOpacity={0.7} />
      <polygon points="56,24 44,8 40,24" fill="hsl(var(--diamond-blue))" fillOpacity={0.7} />
      {/* Bottom facets */}
      <polygon points="24,24 32,56 8,24" fill="hsl(var(--diamond-blue))" fillOpacity={0.9} />
      <polygon points="40,24 56,24 32,56" fill="hsl(var(--diamond-blue))" fillOpacity={0.9} />
    </svg>
  );
};
