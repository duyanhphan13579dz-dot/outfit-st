import { useEffect, useRef, useState } from "react";
import { quickActions, initialChat, ChatMessage } from "../data/style";
import { cn } from "../utils/cn";
import { Eyebrow } from "../components/ui";
import { SparkleIcon, SendIcon } from "../components/icons";

function getReply(text: string): ChatMessage {
  const t = text.toLowerCase();
  if (t.includes("today") || t.includes("wear")) {
    return {
      id: crypto.randomUUID(),
      role: "stylist",
      text: "For today I'd go with your Smart Casual look — a structured blazer over a tonal base. It respects your rectangle frame and works with the 22° weather. Want me to open it?",
      insight: ["Smart Casual · 92/100", "Balanced proportions"],
    };
  }
  if (t.includes("tall")) {
    return {
      id: crypto.randomUUID(),
      role: "stylist",
      text: "To read taller: keep one color from shoulder to shoe, raise your waistline, and skip busy horizontal lines. A monochrome base with a long overcoat does most of the work.",
      insight: ["Monochrome base", "High-rise cuts"],
    };
  }
  if (t.includes("pant") || t.includes("goes") || t.includes("pair")) {
    return {
      id: crypto.randomUUID(),
      role: "stylist",
      text: "Those trousers are neutral, so pair them with a cream knit or a charcoal blazer. Add tan loafers to stay inside your best palette.",
      insight: ["Cream / Charcoal tops", "Tan leather"],
    };
  }
  if (t.includes("rate")) {
    return {
      id: crypto.randomUUID(),
      role: "stylist",
      text: "Happy to rate it — just describe the pieces or share a photo and I'll score the look against your body profile and style DNA.",
    };
  }
  return {
    id: crypto.randomUUID(),
    role: "stylist",
    text: "Great question. Tell me the occasion, the weather, or what you're working with from your closet and I'll build a look around it.",
  };
}

export function Stylist() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: value };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, getReply(value)]);
    }, 850);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 pt-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-offwhite">
          <SparkleIcon className="h-5 w-5" />
        </span>
        <div>
          <Eyebrow>AI Stylist</Eyebrow>
          <h1 className="font-display text-xl leading-tight text-ink">Your stylist</h1>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-6 py-5">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex animate-rise-soft", m.role === "user" ? "justify-end" : "gap-3")}>
            {m.role === "stylist" && (
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
                <SparkleIcon className="h-4 w-4" />
              </span>
            )}
            <div className={cn("max-w-[82%]", m.role === "user" ? "text-right" : "")}>
              <div
                className={cn(
                  "rounded-3xl px-4 py-3 text-[14px] leading-relaxed",
                  m.role === "user"
                    ? "rounded-tr-md bg-ink text-offwhite"
                    : "rounded-tl-md bg-cream text-ink-soft"
                )}
              >
                {m.text}
              </div>
              {m.insight && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.insight.map((ins) => (
                    <span
                      key={ins}
                      className="rounded-full bg-clay/10 px-2.5 py-1 text-[11px] font-semibold text-clay"
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex animate-fade gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
              <SparkleIcon className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-1 rounded-3xl rounded-tl-md bg-cream px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-6 pb-2">
        {quickActions.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="press shrink-0 rounded-full border border-line bg-paper px-4 py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink/40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t border-line bg-offwhite/90 px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-full border border-line bg-paper pl-5 pr-2 py-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your stylist…"
            className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
          />
          <button
            type="submit"
            aria-label="Send"
            className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-offwhite transition-transform active:scale-95"
          >
            <SendIcon className="h-[18px] w-[18px]" />
          </button>
        </form>
      </div>
    </div>
  );
}
