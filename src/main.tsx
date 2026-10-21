import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/outfit/wght.css';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './index.css';
import { AppShell } from './App.tsx';
import { initAnalytics } from './lib/analytics.ts';
import { rememberEntry } from './lib/visitSource.ts';

// Old links used hash routes (/#/systemy). Turn them into normal paths
// before the router starts, so shared links keep working. Campaign tags in front of the
// hash (/?utm_source=x#/systemy) are kept.
let rewritten = false;
if (window.location.hash.startsWith('#/')) {
  const target = new URL(window.location.hash.slice(1), window.location.origin);
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  rewritten = target.pathname !== window.location.pathname;
  window.history.replaceState(null, '', target.pathname + target.search + target.hash);
}

// After a new deploy, an open tab still asks for the old page files, which no longer
// exist. Load the page again (it brings the new files) instead of showing an error.
// Only for a tab open for a while, so a broken build can't reload in a loop.
window.addEventListener('vite:preloadError', (event) => {
  if (performance.now() < 15000) return;
  event.preventDefault();
  window.location.reload();
});

rememberEntry();

// Tidy up what older versions of the site kept in the browser: it now stores nothing.
try {
  localStorage.removeItem('domence_cookie_consent');
  localStorage.removeItem('domence_calc_v1');
} catch {
  /* storage blocked: nothing to remove */
}

initAnalytics();

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>
);

// Pages built by scripts/prerender.mjs already contain their HTML: React takes it over.
// In development, or after a hash rewrite changed the page, it renders from scratch.
const root = document.getElementById('root')!;
if (root.hasChildNodes() && !rewritten) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}

// The enquiry is where most visits end: fetch its code while the browser is idle
const whenIdle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
whenIdle(() => {
  import('./pages/EnquiryPage.tsx').catch(() => {
    /* it loads on demand instead */
  });
});
