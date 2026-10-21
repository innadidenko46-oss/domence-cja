import { lazy, type ComponentType, type ReactElement } from 'react';

// Every page of the site. Each path also needs an entry in src/data/pages.json (title and
// description): the build prerenders exactly those paths and fails when the two lists differ.
const page = (load: () => Promise<Record<string, unknown>>, name: string) =>
  lazy(() => load().then((m) => ({ default: m[name] as ComponentType })));

const HomePage = page(() => import('./pages/HomePage.tsx'), 'HomePage');
const SystemsPage = page(() => import('./pages/SystemsPage.tsx'), 'SystemsPage');
const TeletechnicsPage = page(() => import('./pages/TeletechnicsPage.tsx'), 'TeletechnicsPage');
const ScenariosPage = page(() => import('./pages/ScenariosPage.tsx'), 'ScenariosPage');
const StartPage = page(() => import('./pages/StartPage.tsx'), 'StartPage');
const FaqPage = page(() => import('./pages/FaqPage.tsx'), 'FaqPage');
const EnquiryPage = page(() => import('./pages/EnquiryPage.tsx'), 'EnquiryPage');
const ContactPage = page(() => import('./pages/ContactPage.tsx'), 'ContactPage');
const PrivacyPage = page(() => import('./pages/PrivacyPage.tsx'), 'PrivacyPage');
const LandingPage = lazy(() => import('./pages/LandingPage.tsx').then((m) => ({ default: m.LandingPage })));
export const NotFoundPage = page(() => import('./pages/NotFoundPage.tsx'), 'NotFoundPage');

const landing = (slug: string) => ({ path: `/${slug}`, element: <LandingPage slug={slug} />, file: 'src/pages/LandingPage.tsx' });

// `file` is the page's source: the build preloads its code in that page's HTML, so the
// page works sooner on slow phones (scripts/prerender.mjs).
export const ROUTES: { path: string; element: ReactElement; file: string }[] = [
  { path: '/', element: <HomePage />, file: 'src/pages/HomePage.tsx' },
  { path: '/systemy', element: <SystemsPage />, file: 'src/pages/SystemsPage.tsx' },
  { path: '/teletechnika', element: <TeletechnicsPage />, file: 'src/pages/TeletechnicsPage.tsx' },
  { path: '/scenariusze', element: <ScenariosPage />, file: 'src/pages/ScenariosPage.tsx' },
  { path: '/jak-zaczac', element: <StartPage />, file: 'src/pages/StartPage.tsx' },
  { path: '/faq', element: <FaqPage />, file: 'src/pages/FaqPage.tsx' },
  landing('inteligentny-dom-warszawa'),
  landing('wideodomofon-i-kamery-warszawa'),
  landing('ochrona-przed-zalaniem'),
  landing('automatyka-bez-kucia'),
  { path: '/zapytanie', element: <EnquiryPage />, file: 'src/pages/EnquiryPage.tsx' },
  { path: '/kontakt', element: <ContactPage />, file: 'src/pages/ContactPage.tsx' },
  { path: '/polityka-prywatnosci', element: <PrivacyPage />, file: 'src/pages/PrivacyPage.tsx' },
];

// Old addresses that still get shared. vercel.json answers them with a 308 redirect;
// the build checks that both lists match.
export const REDIRECTS: Record<string, string> = {
  '/pakiety': '/jak-zaczac',
  '/multimedia': '/scenariusze',
  '/kalkulator': '/zapytanie',
};
