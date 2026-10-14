/** Lightweight event tracking: pushes to window.dataLayer so any analytics tag can pick it up. */
export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...data });
}
