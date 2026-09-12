import { useMemo, useState } from "react";
import { outfits } from "../data/style";
import { OutfitCard, OutfitCardSkeleton } from "../components/OutfitCard";
import { Eyebrow, Chip } from "../components/ui";
import { useLoad } from "../hooks/useLoad";

const styles = ["All", "Smart Casual", "Minimal", "Streetwear", "Classic"];

export function Discover({ onOpenOutfit }: { onOpenOutfit: (id: string) => void }) {
  const [filter, setFilter] = useState("All");
  const loading = useLoad(700);

  const list = useMemo(
    () => (filter === "All" ? outfits : outfits.filter((o) => o.style === filter)),
    [filter]
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-8">
      <header className="px-6 pt-7">
        <Eyebrow>Discover</Eyebrow>
        <h1 className="mt-1.5 font-display text-[28px] leading-tight text-ink">Outfits for you</h1>
      </header>

      {/* Filters */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-6 pb-1">
        {styles.map((s) => (
          <Chip key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s}
          </Chip>
        ))}
      </div>

      {/* Feed */}
      <section className="mt-5 px-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <OutfitCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {list.map((o, i) => (
              <div key={o.id} className={i >= 2 ? "delay-1" : undefined}>
                <OutfitCard outfit={o} onOpen={onOpenOutfit} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
