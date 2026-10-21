import { Suspense, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { RouteMeta } from './components/RouteMeta.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { rememberPage } from './lib/visitSource.ts';
import { ROUTES, REDIRECTS, NotFoundPage } from './routes.tsx';

// Shown for a split second while a page's code loads: the shape of a page header
function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 min-h-[60vh]" role="status" aria-busy="true">
      <span className="sr-only">Ładowanie strony…</span>
      <div className="animate-pulse motion-reduce:animate-none space-y-5 max-w-3xl">
        <div className="h-3 w-40 rounded-[2px] bg-gray-200" />
        <div className="h-10 w-4/5 rounded-[2px] bg-gray-200" />
        <div className="h-10 w-3/5 rounded-[2px] bg-gray-200" />
        <div className="h-4 w-full rounded-[2px] bg-gray-100" />
        <div className="h-4 w-2/3 rounded-[2px] bg-gray-100" />
      </div>
    </div>
  );
}

// Keeps ?chce=… and other answers when an old address forwards to the new one
function Redirect({ to }: { to: string }) {
  const { search } = useLocation();
  return <Navigate to={`${to}${search}`} replace />;
}

// The whole site without the router, so the browser (BrowserRouter) and the build
// (StaticRouter, see entry-server.tsx) render the same tree.
export function AppShell() {
  const { pathname } = useLocation();

  // After a page change without a reload, start keyboard and screen-reader users at the
  // new content instead of the link they clicked (the first load keeps the browser's focus)
  const firstPage = useRef(true);
  useEffect(() => {
    rememberPage(pathname);
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-amber-200 selection:text-petrol-950 flex flex-col bg-gray-50 text-gray-900">
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          // Move focus instead of changing the URL
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Przejdź do treści
      </a>

      <ScrollToTop />
      <RouteMeta />
      <Navbar />

      {/* The error screen stays inside main, so the skip link and the landmarks still work */}
      <main id="main" tabIndex={-1} className="flex-1 pt-[68px] focus:outline-none">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* caseSensitive: /FAQ is a 404 on the server, so it must be one here too */}
              {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} caseSensitive element={element} />
              ))}
              {Object.entries(REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} caseSensitive element={<Redirect to={to} />} />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
