import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PAGES from '../data/pages.json';
import { SITE } from '../config/site.ts';

type PageMeta = { title: string; description: string };
const META: Record<string, PageMeta> = PAGES;

export const NOT_FOUND_META: PageMeta = {
  title: 'Nie znaleziono strony',
  description: 'Ta strona nie istnieje. Wróć na stronę główną DOMENCE.',
};

/** "Kontakt" → "Kontakt | DOMENCE"; titles that already name the brand stay as they are */
export const fullTitle = (title: string) => (title.includes(SITE.name) ? title : `${title} | ${SITE.name}`);

export const canonicalUrl = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`;

// The build writes each page's title, description and canonical address into its HTML
// (scripts/prerender.mjs, from src/data/pages.json). This keeps them right when the
// visitor moves between pages without reloading, and tells screen readers which page
// opened (a page change without a reload is silent otherwise).
export const RouteMeta = () => {
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const first = useRef(true);

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const meta = META[path];
    const { title, description } = meta ?? NOT_FOUND_META;
    const head = document.head;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    document.title = fullTitle(title);
    if (first.current) first.current = false;
    else setAnnouncement(fullTitle(title));
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle(title));
    setMeta('property', 'og:description', description);

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let robots = head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (meta) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        head.appendChild(canonical);
      }
      canonical.href = canonicalUrl(path);
      setMeta('property', 'og:url', canonicalUrl(path));
      robots?.remove();
    } else {
      canonical?.remove();
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        head.appendChild(robots);
      }
      robots.content = 'noindex';
    }
  }, [pathname]);

  return (
    <p role="status" className="sr-only">
      {announcement}
    </p>
  );
};
