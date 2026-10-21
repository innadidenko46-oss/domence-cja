// Where the visitor came from, added to the enquiry so the team can see which page or
// campaign brings it: the first page of the visit, its campaign tags (utm_*), the site
// that linked to us, and the last page before the enquiry. No personal data, and like the
// enquiry answers it lives in memory only: nothing is written to the browser.

let entry = '';
let lastPage = '';

/** Call once when the site starts, after old hash links are rewritten. */
export function rememberEntry() {
  const { pathname, search, host } = window.location;
  const params = new URLSearchParams(search);
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((key) => params.get(key)?.trim().slice(0, 60))
    .filter(Boolean)
    .join(' / ');
  let from = '';
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== host) from = ref.host;
  } catch {
    /* unreadable referrer: leave it out */
  }
  entry = [pathname, campaign && `kampania: ${campaign}`, from && `z ${from}`].filter(Boolean).join(', ');
}

/** Call on every page change. The enquiry page itself is not counted as "last page". */
export function rememberPage(pathname: string) {
  if (pathname !== '/zapytanie') lastPage = pathname;
}

/** "wejście: /ochrona-przed-zalaniem, kampania: google / cpc; ostatnia strona: /faq" */
export function visitSummary() {
  return [entry && `wejście: ${entry}`, lastPage && `ostatnia strona: ${lastPage}`].filter(Boolean).join('; ');
}
