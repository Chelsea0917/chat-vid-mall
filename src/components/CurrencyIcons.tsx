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
        <linearGradient id="yuanbaoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--coin-gold-light))" />
          <stop offset="50%" stopColor="hsl(var(--coin-gold))" />
          <stop offset="100%" stopColor="hsl(var(--coin-gold))" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="yuanbaoShine" cx="50%" cy="30%">
          <stop offset="0%" stopColor="hsl(var(--coin-gold-light))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--coin-gold-light))" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Main yuanbao body - traditional curved ingot shape */}
      <path
        d="M 10 32 Q 10 24 14 20 Q 18 16 24 14 L 40 14 Q 46 16 50 20 Q 54 24 54 32 Q 54 38 50 42 L 48 48 Q 46 52 40 54 L 24 54 Q 18 52 16 48 L 14 42 Q 10 38 10 32 Z"
        fill="url(#yuanbaoGradient)"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1"
      />
      
      {/* Top curved edges - upturned sides */}
      <path
        d="M 14 20 Q 18 14 24 14"
        fill="none"
        stroke="hsl(var(--coin-gold-light))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 40 14 Q 46 14 50 20"
        fill="none"
        stroke="hsl(var(--coin-gold-light))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Shine effect on top */}
      <ellipse
        cx="32"
        cy="24"
        rx="14"
        ry="6"
        fill="url(#yuanbaoShine)"
      />
      
      {/* Center decorative pattern */}
      <rect
        x="28"
        y="30"
        width="8"
        height="12"
        rx="1"
        fill="hsl(var(--coin-gold))"
        opacity="0.5"
      />
      <circle
        cx="32"
        cy="36"
        r="3"
        fill="hsl(var(--coin-gold-light))"
        opacity="0.7"
      />
      
      {/* Side curves for 3D effect */}
      <path
        d="M 12 28 Q 10 32 12 36"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 52 28 Q 54 32 52 36"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      
      {/* Bottom shadow */}
      <ellipse
        cx="32"
        cy="50"
        rx="16"
        ry="3"
        fill="hsl(var(--coin-gold))"
        opacity="0.3"
      />
    </svg>
  );
};
