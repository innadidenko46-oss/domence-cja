import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ClipboardList } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { CTA } from '../config/site.ts';

// All sections on one level: no dropdowns or hidden submenus
export const NAV_LINKS = [
  { label: 'Inteligentny dom', path: '/systemy' },
  { label: 'Kamery i wideodomofon', path: '/teletechnika' },
  { label: 'Scenariusze', path: '/scenariusze' },
  { label: 'Jak zacząć', path: '/jak-zaczac' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Kontakt', path: '/kontakt' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Focus goes back to the toggle only when the visitor closed the menu; after picking a
  // page it moves to the new content instead (see AppShell)
  const restoreFocus = useRef(false);

  const closeMenu = () => {
    restoreFocus.current = true;
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // While the drawer is open: page doesn't scroll, focus stays inside (the toggle, which
  // closes it, included), Esc closes it, and focus goes back to the toggle on close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    restoreFocus.current = false;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const items = [toggleRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
        (el): el is HTMLElement => !!el,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // Widening the window past the menu's breakpoint hides it: don't leave the page locked
    const wide = window.matchMedia('(min-width: 1280px)');
    const onWide = (e: MediaQueryListEvent) => e.matches && setMobileMenuOpen(false);
    wide.addEventListener('change', onWide);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
      if (restoreFocus.current) toggle?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen]);

  // Close the mobile menu on every navigation, also a link to the page already open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.key]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[68px] flex items-center border-b border-gray-200 transition-shadow duration-200 ${
          isScrolled ? 'bg-gray-50/95 backdrop-blur-md shadow-sm' : 'bg-gray-50/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-3 w-full">
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
            aria-label="DOMENCE, strona główna"
          >
            {/* brand.md: the tagline only on large formats; in the header it is too small to read */}
            <Logo size="sm" variant="dark" showSubtitle={false} />
          </Link>

          <nav aria-label="Główne menu" className="hidden xl:flex items-center gap-1 text-sm font-medium text-gray-700">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-[2px] whitespace-nowrap transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-petrol-600 ${
                    isActive ? 'text-amber-800 bg-amber-500/10 font-semibold' : 'hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/zapytanie"
              aria-current={location.pathname === '/zapytanie' ? 'page' : undefined}
              className="hidden sm:inline-flex min-h-11 px-4 py-2 rounded-[2px] bg-petrol-700 hover:bg-petrol-800 text-white font-semibold text-sm items-center gap-1.5 whitespace-nowrap shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
            >
              <ClipboardList className="w-4 h-4" aria-hidden="true" />
              <span>{CTA.short}</span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true))}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-[2px] border bg-white border-gray-300 text-gray-900 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-menu' : undefined}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            onClick={closeMenu}
            aria-hidden="true"
            className="fixed inset-0 top-[68px] z-[45] bg-petrol-950/40 xl:hidden animate-fade-in"
          />
          <div
            ref={drawerRef}
            id="mobile-menu"
            className="fixed inset-x-0 top-[68px] z-50 border-b p-5 xl:hidden shadow-lg max-h-[calc(100dvh-68px)] overflow-y-auto bg-gray-50 border-gray-200 text-gray-900 animate-fade-up"
          >
            <nav aria-label="Menu mobilne" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium min-h-11 py-3 px-3 rounded-[2px] flex items-center justify-between transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600 ${
                      isActive ? 'bg-amber-500/15 text-petrol-700 font-semibold' : 'text-gray-800 hover:bg-gray-100'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>
            <div className="pt-4 mt-3 border-t border-gray-200">
              <Link
                to="/zapytanie"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-engineering-primary w-full focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
              >
                {CTA.label}
              </Link>
              <p className="mt-2 text-center text-sm text-gray-600">{CTA.note}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
