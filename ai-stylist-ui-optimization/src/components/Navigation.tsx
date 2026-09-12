import type { ComponentType, SVGProps } from "react";
import { cn } from "../utils/cn";
import { CompassIcon, HomeIcon, ShirtIcon, SparkleIcon, UserIcon } from "./icons";

export type Tab = "home" | "discover" | "wardrobe" | "stylist" | "profile";

const items: { key: Tab; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "discover", label: "Discover", Icon: CompassIcon },
  { key: "wardrobe", label: "Wardrobe", Icon: ShirtIcon },
  { key: "stylist", label: "Stylist", Icon: SparkleIcon },
  { key: "profile", label: "Profile", Icon: UserIcon },
];

export function Navigation({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="relative z-20 shrink-0 border-t border-line bg-offwhite/85 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[420px] items-stretch justify-between">
        {items.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "press group relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-colors",
                isActive ? "text-ink" : "text-faint hover:text-muted"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative">
                <Icon className={cn("h-[22px] w-[22px] transition-transform duration-300", isActive && "scale-105")} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" />
                )}
              </span>
              <span className={cn("text-[10.5px] font-semibold tracking-tight", isActive ? "text-ink" : "text-faint")}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
