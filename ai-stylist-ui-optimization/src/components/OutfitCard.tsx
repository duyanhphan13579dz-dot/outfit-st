import { Outfit } from "../data/style";
import { cn } from "../utils/cn";
import { CheckIcon, ChevronRightIcon } from "./icons";

export function OutfitCard({
  outfit,
  onOpen,
  className,
}: {
  outfit: Outfit;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-3xl border border-line bg-paper animate-rise-soft",
        className
      )}
    >
      <button
        onClick={() => onOpen(outfit.id)}
        className="press block w-full text-left"
        aria-label={`View ${outfit.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden img-frame">
          <img
            src={outfit.image}
            alt={outfit.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-offwhite backdrop-blur">
            {outfit.style}
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-offwhite/90 px-2.5 py-1 backdrop-blur">
            <span className="font-display text-sm leading-none text-ink">{outfit.score}</span>
            <span className="text-[10px] text-muted">/100</span>
          </div>
        </div>
      </button>

      <div className="px-5 pb-5 pt-4">
        <h3 className="font-display text-xl leading-tight text-ink">{outfit.name}</h3>

        <ul className="mt-3 space-y-1.5">
          {outfit.reasons.slice(0, 3).map((r) => (
            <li key={r} className="flex items-center gap-2 text-[13px] text-ink-soft">
              <CheckIcon className="h-3.5 w-3.5 shrink-0 text-clay" />
              {r}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onOpen(outfit.id)}
          className="press mt-4 inline-flex w-full items-center justify-between rounded-full border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
        >
          View outfit
          <ChevronRightIcon className="h-4 w-4 text-muted" />
        </button>
      </div>
    </article>
  );
}

export function OutfitCardSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn("overflow-hidden rounded-3xl border border-line bg-paper", className)}>
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="space-y-3 px-5 pb-5 pt-4">
        <div className="skeleton h-5 w-32 rounded-md" />
        <div className="skeleton h-3 w-40 rounded-md" />
        <div className="skeleton h-3 w-36 rounded-md" />
        <div className="skeleton mt-4 h-11 w-full rounded-full" />
      </div>
    </article>
  );
}
