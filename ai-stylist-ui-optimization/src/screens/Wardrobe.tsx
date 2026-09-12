import { useMemo, useState } from "react";
import { wardrobe, WardrobeCategory } from "../data/style";
import { Eyebrow, Chip, Skeleton, EmptyState } from "../components/ui";
import { ShirtIcon } from "../components/icons";
import { useLoad } from "../hooks/useLoad";

const filters: WardrobeCategory[] = ["All", "Tops", "Bottoms", "Shoes", "Accessories"];

export function Wardrobe() {
  const [filter, setFilter] = useState<WardrobeCategory>("All");
  const loading = useLoad(700);

  const list = useMemo(
    () => (filter === "All" ? wardrobe : wardrobe.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-8">
      <header className="px-6 pt-7">
        <Eyebrow>Wardrobe</Eyebrow>
        <h1 className="mt-1.5 font-display text-[28px] leading-tight text-ink">Your closet</h1>
        <p className="mt-1 text-[13px] text-muted">{wardrobe.length} pieces · synced with your stylist</p>
      </header>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-6 pb-1">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <section className="mt-5 px-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-line bg-paper">
                <Skeleton className="aspect-square rounded-none" />
                <div className="space-y-2 p-3.5">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <EmptyState
            icon={<ShirtIcon className="h-6 w-6" />}
            title="Nothing here yet"
            description="Add pieces to this category and your stylist will factor them in."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {list.map((item, i) => (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-2xl border border-line bg-paper animate-rise-soft ${i >= 4 ? "delay-1" : ""}`}
              >
                <div className="relative aspect-square overflow-hidden img-frame">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute right-2.5 top-2.5 h-4 w-4 rounded-full border-2 border-white/80 shadow"
                    style={{ background: item.color }}
                  />
                </div>
                <div className="px-3.5 py-3">
                  <p className="text-[13.5px] font-semibold leading-tight text-ink">{item.name}</p>
                  <p className="text-[12px] text-muted">{item.detail}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-faint">Worn {item.worn}×</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
