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
        <radialGradient id="yuanbaoGradient" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="hsl(var(--coin-gold-light))" />
          <stop offset="50%" stopColor="hsl(var(--coin-gold))" />
          <stop offset="100%" stopColor="hsl(var(--coin-gold))" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      {/* Main yuanbao body - curved trapezoid shape */}
      <path
        d="M 16 28 Q 16 22 20 20 L 44 20 Q 48 22 48 28 L 52 42 Q 52 48 48 50 L 16 50 Q 12 48 12 42 Z"
        fill="url(#yuanbaoGradient)"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1.5"
      />
      {/* Top ridge highlight */}
      <path
        d="M 20 20 Q 24 18 32 18 Q 40 18 44 20"
        fill="none"
        stroke="hsl(var(--coin-gold-light))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Center decorative lines */}
      <ellipse
        cx="32"
        cy="35"
        rx="12"
        ry="8"
        fill="none"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Bottom curve shadow */}
      <path
        d="M 16 48 Q 32 52 48 48"
        fill="none"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="2"
        opacity="0.4"
      />
      {/* Side highlights */}
      <path
        d="M 14 30 Q 14 35 14 40"
        stroke="hsl(var(--coin-gold-light))"
        strokeWidth="1.5"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M 50 30 Q 50 35 50 40"
        stroke="hsl(var(--coin-gold))"
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
