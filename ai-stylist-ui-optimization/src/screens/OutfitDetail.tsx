import { useState } from "react";
import { Outfit } from "../data/style";
import { cn } from "../utils/cn";
import { Eyebrow, ScoreBar, ScoreRing, Button } from "../components/ui";
import {
  CloseIcon,
  BookmarkIcon,
  HeartIcon,
  ThumbsDownIcon,
  WandIcon,
  CheckIcon,
} from "../components/icons";

export function OutfitDetail({ outfit, onClose }: { outfit: Outfit; onClose: () => void }) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const scores = [
    { label: "Body", value: outfit.scores.body },
    { label: "Proportion", value: outfit.scores.proportion },
    { label: "Style", value: outfit.scores.style },
    { label: "Color", value: outfit.scores.color },
    { label: "Occasion", value: outfit.scores.occasion },
  ];

  const items = [
    { ...outfit.items.top, role: "Top" },
    { ...outfit.items.bottom, role: "Bottom" },
    { ...outfit.items.shoes, role: "Shoes" },
    { ...outfit.items.accessories, role: "Accessories" },
  ];

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-offwhite animate-rise">
      {/* Hero image */}
      <div className="relative h-[46%] shrink-0 overflow-hidden img-frame">
        <img src={outfit.image} alt={outfit.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="press absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-offwhite/90 text-ink backdrop-blur"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <div className="absolute left-5 bottom-5 text-offwhite">
          <Eyebrow className="text-offwhite/70">{outfit.style}</Eyebrow>
          <h2 className="mt-1.5 font-display text-[32px] leading-none text-offwhite">{outfit.name}</h2>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-36 pt-6">
        {/* Score */}
        <section>
          <Eyebrow>Score</Eyebrow>
          <div className="mt-3 flex items-center gap-5">
            <ScoreRing value={outfit.score} size={92} stroke={6} label="Overall" />
            <div className="flex-1 space-y-2.5">
              {scores.map((s) => (
                <ScoreBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>
        </section>

        <div className="hairline my-7" />

        {/* Why it works */}
        <section>
          <Eyebrow>Why it works</Eyebrow>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft text-balance">{outfit.why}</p>
        </section>

        <div className="hairline my-7" />

        {/* Items */}
        <section>
          <Eyebrow>Items</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {items.map((it) => (
              <div key={it.role} className="overflow-hidden rounded-2xl border border-line bg-paper">
                <div className="aspect-square overflow-hidden img-frame">
                  <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                </div>
                <div className="px-3.5 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{it.role}</p>
                  <p className="mt-0.5 text-[13.5px] font-semibold leading-tight text-ink">{it.name}</p>
                  <p className="text-[12px] text-muted">{it.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky action bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-line bg-offwhite/90 px-5 py-4 backdrop-blur-xl">
        <button
          onClick={() => {
            setSaved((v) => !v);
            setLiked(false);
            setDisliked(false);
          }}
          aria-label="Save"
          aria-pressed={saved}
          className={cn(
            "press flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors",
            saved ? "border-ink bg-ink text-offwhite" : "border-line text-ink hover:border-ink/40"
          )}
        >
          <BookmarkIcon className="h-5 w-5" filled={saved} />
        </button>
        <button
          onClick={() => {
            setLiked((v) => !v);
            setDisliked(false);
          }}
          aria-label="Like"
          aria-pressed={liked}
          className={cn(
            "press flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors",
            liked ? "border-clay bg-clay text-offwhite" : "border-line text-ink hover:border-ink/40"
          )}
        >
          <HeartIcon className="h-5 w-5" filled={liked} />
        </button>
        <button
          onClick={() => {
            setDisliked((v) => !v);
            setLiked(false);
            setSaved(false);
          }}
          aria-label="Dislike"
          aria-pressed={disliked}
          className={cn(
            "press flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors",
            disliked ? "border-ink bg-ink text-offwhite" : "border-line text-ink hover:border-ink/40"
          )}
        >
          <ThumbsDownIcon className="h-5 w-5" />
        </button>
        <Button full size="lg" className="ml-1">
          <WandIcon className="h-5 w-5" />
          Try on
        </Button>
      </div>

      {/* subtle saved toast */}
      {saved && (
        <div className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 animate-pop rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-offwhite">
          <CheckIcon className="mr-1 inline h-3.5 w-3.5" /> Saved to wardrobe
        </div>
      )}
    </div>
  );
}
