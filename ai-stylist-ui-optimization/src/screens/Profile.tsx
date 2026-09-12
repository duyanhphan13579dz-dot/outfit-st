import { useState } from "react";
import { bodyProfile, styleDNA, bestColors } from "../data/style";
import { cn } from "../utils/cn";
import { Eyebrow, ScoreBar, Section } from "../components/ui";
import { ChevronRightIcon, RulerIcon } from "../components/icons";

function MetricRow({ label, value, note }: { label: string; value: string; note: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="press flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="flex items-center gap-3">
          <span className="font-display text-lg text-ink">{value}</span>
          <ChevronRightIcon
            className={cn("h-4 w-4 text-faint transition-transform duration-300", open && "rotate-90")}
          />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-[13.5px] leading-relaxed text-ink-soft">{note}</p>
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-8">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 pt-7">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink font-display text-2xl text-offwhite">
          {bodyProfile.name.charAt(0)}
        </span>
        <div>
          <Eyebrow>Profile</Eyebrow>
          <h1 className="font-display text-[26px] leading-tight text-ink">{bodyProfile.name}</h1>
        </div>
      </header>

      {/* Body Profile */}
      <Section className="mt-7">
        <Eyebrow>Your body profile</Eyebrow>

        <div className="mt-3 flex items-stretch gap-3">
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-line bg-paper py-5">
            <RulerIcon className="h-5 w-5 text-clay" />
            <span className="mt-2 font-display text-3xl text-ink">{bodyProfile.height}</span>
            <span className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-muted">Height</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-line bg-paper py-5">
            <RulerIcon className="h-5 w-5 text-clay" />
            <span className="mt-2 font-display text-3xl text-ink">{bodyProfile.weight}</span>
            <span className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-muted">Weight</span>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-line bg-paper px-5">
          {bodyProfile.metrics.map((m) => (
            <MetricRow key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </div>
      </Section>

      <div className="hairline mx-6 my-9" />

      {/* Style DNA */}
      <Section>
        <Eyebrow>Your style DNA</Eyebrow>
        <div className="mt-3 space-y-3.5">
          {styleDNA.map((s) => (
            <ScoreBar key={s.name} label={s.name} value={s.value} />
          ))}
        </div>
      </Section>

      <div className="hairline mx-6 my-9" />

      {/* Best Colors */}
      <Section>
        <Eyebrow>Your best colors</Eyebrow>
        <div className="mt-4 flex flex-wrap gap-4">
          {bestColors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-line shadow-[0_6px_18px_-10px_rgba(23,20,14,0.5)]"
                style={{ background: c.hex }}
              />
              <span className="text-[12px] font-medium text-ink-soft">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
