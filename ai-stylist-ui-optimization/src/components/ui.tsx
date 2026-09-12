import type { ReactNode, CSSProperties } from "react";
import { cn } from "../utils/cn";

/* ----------------------------------------------------------------
   Eyebrow — small uppercase section label
----------------------------------------------------------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   Section — consistent vertical rhythm
----------------------------------------------------------------- */
export function Section({
  children,
  className,
  spaced = true,
}: {
  children: ReactNode;
  className?: string;
  spaced?: boolean;
}) {
  return <section className={cn(spaced && "px-6", className)}>{children}</section>;
}

/* ----------------------------------------------------------------
   Button — one primary CTA per screen
----------------------------------------------------------------- */
type Variant = "primary" | "outline" | "ghost" | "icon";
type Size = "md" | "lg" | "sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-offwhite hover:bg-charcoal active:scale-[0.98] shadow-[0_8px_24px_-12px_rgba(23,20,14,0.6)]",
  outline:
    "border border-line bg-transparent text-ink hover:border-ink/40 active:scale-[0.98]",
  ghost: "bg-transparent text-ink-soft hover:bg-ink/5 active:scale-[0.98]",
  icon: "bg-ink/5 text-ink hover:bg-ink/10 active:scale-[0.95]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full",
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-14 px-7 text-[15px] rounded-full",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  full,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "press inline-flex select-none items-center justify-center gap-2 font-semibold tracking-tight transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        full && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------
   ScoreRing — circular overall score
----------------------------------------------------------------- */
export function ScoreRing({
  value,
  size = 64,
  stroke = 5,
  label,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-line)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-ink)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.9s var(--ease-soft)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl leading-none text-ink">{value}</span>
        {label && <span className="mt-0.5 text-[9px] uppercase tracking-widest text-muted">{label}</span>}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   ScoreBar — label + thin progress bar
----------------------------------------------------------------- */
export function ScoreBar({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-20 shrink-0 text-[13px] text-ink-soft">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${value}%`, transition: "width 0.9s var(--ease-soft)" }}
        />
      </div>
      <span className="w-8 shrink-0 text-right font-display text-sm text-ink">{value}</span>
    </div>
  );
}

/* ----------------------------------------------------------------
   Chip — filter / tag
----------------------------------------------------------------- */
export function Chip({
  children,
  active,
  className,
  ...props
}: {
  children: ReactNode;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "press rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200",
        active
          ? "border-ink bg-ink text-offwhite"
          : "border-line bg-paper text-ink-soft hover:border-ink/40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------
   Skeleton
----------------------------------------------------------------- */
export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn("skeleton rounded-xl", className)} style={style} />;
}

/* ----------------------------------------------------------------
   EmptyState
----------------------------------------------------------------- */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-14 text-center animate-fade">
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-ink/70">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ----------------------------------------------------------------
   ErrorState — friendly, never technical
----------------------------------------------------------------- */
export function ErrorState({
  title = "Something went wrong.",
  description = "We couldn't load this right now. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-14 text-center animate-fade">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-ink/70">
        <RefreshIcon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-muted">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="press mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] font-semibold text-ink hover:border-ink/40"
        >
          <RefreshIcon className="h-4 w-4" /> Try again
        </button>
      )}
    </div>
  );
}

import { RefreshIcon } from "./icons";
