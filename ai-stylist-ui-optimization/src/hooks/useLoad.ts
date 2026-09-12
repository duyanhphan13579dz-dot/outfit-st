import { useEffect, useState } from "react";

/**
 * Simulates an async engine/data fetch so the UI can show its
 * redesigned loading (skeleton) state. Replace with a real
 * query when wiring the engine — the UI contract stays identical.
 */
export function useLoad(ms = 650): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
