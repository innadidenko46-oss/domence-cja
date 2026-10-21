// Visit statistics without cookies (Plausible). Off until VITE_PLAUSIBLE_DOMAIN is set,
// e.g. "domence.pl". Plausible stores nothing in the browser and collects no personal
// data, so it needs no consent banner.
//
// Events (add them as goals in Plausible to see the funnel):
//   'Zapytanie: krok'     the visitor reached step 2 or 3 of the enquiry (prop: krok)
//   'Zapytanie'           an enquiry reached us through the form service (the main goal)
//   'Zapytanie e-mailem'  without a form service: the visitor opened the prepared e-mail
//   'Zapytanie: błąd'     the form service did not accept an enquiry (prop: powod =
//                         timeout, siec or the HTTP status); worth an alert in Plausible

const DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined)?.trim() || '';

export const analyticsEnabled = DOMAIN !== '';

type PlausibleFn = ((event: string, options?: { props?: Record<string, string> }) => void) & { q?: unknown[] };

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function initAnalytics() {
  if (!analyticsEnabled || document.querySelector('script[data-domain]')) return;
  // Queue events fired before the script loads
  window.plausible =
    window.plausible ||
    (function (...args: unknown[]) {
      (window.plausible!.q = window.plausible!.q || []).push(args);
    } as PlausibleFn);
  const s = document.createElement('script');
  s.defer = true;
  s.dataset.domain = DOMAIN;
  // The standard script also counts page changes made by the router
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}

/** Records an event. Does nothing while statistics are off. */
export function track(event: string, props?: Record<string, string>) {
  if (!analyticsEnabled) return;
  window.plausible?.(event, props ? { props } : undefined);
}
