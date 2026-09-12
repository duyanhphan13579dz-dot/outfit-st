import { todayOutfit, outfits, bodyProfile } from "../data/style";
import { OutfitCard } from "../components/OutfitCard";
import { Eyebrow, Button } from "../components/ui";
import { CheckIcon, SunIcon, SparkleIcon, ChevronRightIcon } from "../components/icons";

const dateLabel = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "short",
});

export function Home({ onOpenOutfit, onOpenStylist }: { onOpenOutfit: (id: string) => void; onOpenStylist: () => void }) {
  const outfit = todayOutfit;
  const others = outfits.filter((o) => o.id !== outfit.id).slice(0, 2);

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-8">
      {/* Header */}
      <header className="flex items-start justify-between px-6 pt-7">
        <div>
          <Eyebrow>{dateLabel}</Eyebrow>
          <h1 className="mt-1.5 font-display text-[28px] leading-tight text-ink">
            Good morning, {bodyProfile.name}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-2 text-[13px] font-medium text-ink-soft">
          <SunIcon className="h-4 w-4 text-clay" />
          22°
        </div>
      </header>

      {/* Hero — Today's Look */}
      <section className="mt-5 px-4">
        <article className="overflow-hidden rounded-[28px] border border-line bg-paper animate-rise">
          <div className="relative aspect-[4/5] overflow-hidden img-frame">
            <img
              src={outfit.image}
              alt={outfit.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-offwhite">
              <Eyebrow className="text-offwhite/70">Today&rsquo;s Look</Eyebrow>
              <h2 className="mt-1.5 font-display text-[34px] leading-none text-offwhite">
                {outfit.name}
              </h2>
            </div>
          </div>

          <div className="px-5 pb-5 pt-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl leading-none text-ink">{outfit.score}</span>
                  <span className="text-sm text-muted">/100</span>
                </div>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted">Overall fit</p>
              </div>
              <div className="hairline h-12 w-px rotate-0" />
              <ul className="flex-1 space-y-1">
                {outfit.reasons.slice(0, 2).map((r) => (
                  <li key={r} className="flex items-center gap-2 text-[13px] text-ink-soft">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-clay" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Button full size="lg" className="mt-5" onClick={() => onOpenOutfit(outfit.id)}>
              Wear this
            </Button>
          </div>
        </article>
      </section>

      {/* Supporting — a couple more picks */}
      <section className="mt-9 px-6">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <Eyebrow>From your stylist</Eyebrow>
            <h3 className="mt-1 font-display text-xl text-ink">More picks</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {others.map((o) => (
            <OutfitCard key={o.id} outfit={o} onOpen={onOpenOutfit} />
          ))}
        </div>
      </section>

      {/* Stylist prompt */}
      <section className="mt-9 px-6">
        <button
          onClick={onOpenStylist}
          className="press flex w-full items-center gap-4 rounded-3xl border border-line bg-cream px-5 py-4 text-left transition-colors hover:border-ink/30"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-offwhite">
            <SparkleIcon className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg text-ink">Ask your stylist</span>
            <span className="block text-[13px] text-muted">Get a look for any occasion</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 text-muted" />
        </button>
      </section>
    </div>
  );
}
