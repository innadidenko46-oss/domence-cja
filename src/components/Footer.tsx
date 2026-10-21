import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { SITE, CTA, RESPONSE_LINE, telHref } from '../config/site.ts';

const linkClass =
  'inline-flex items-center min-h-11 hover:text-amber-300 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400';

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Co montujemy',
    links: [
      ['/systemy', 'Inteligentny dom'],
      ['/teletechnika', 'Kamery i wideodomofon'],
      ['/scenariusze', 'Scenariusze'],
    ],
  },
  {
    title: 'W Warszawie',
    links: [
      ['/inteligentny-dom-warszawa', 'Inteligentny dom'],
      ['/wideodomofon-i-kamery-warszawa', 'Wideodomofon i kamery'],
      ['/ochrona-przed-zalaniem', 'Ochrona przed zalaniem'],
      ['/automatyka-bez-kucia', 'Mieszkanie bez kucia'],
    ],
  },
  {
    title: 'Informacje',
    links: [
      ['/jak-zaczac', 'Jak zacząć'],
      ['/faq', 'Pytania i odpowiedzi'],
      ['/kontakt', 'Kontakt'],
    ],
  },
];

export const Footer: React.FC = () => {
  const { legal } = SITE;
  const legalLines = [
    legal.companyName,
    legal.address,
    legal.nip && `NIP ${legal.nip}`,
    legal.regon && `REGON ${legal.regon}`,
    legal.krs && `KRS ${legal.krs}`,
  ].filter(Boolean);
  // The prerendered page shows the build year; the browser then shows the current one
  const [year, setYear] = useState(__BUILD_YEAR__);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="bg-petrol-950 border-t border-white/10 pt-16 pb-24 sm:pb-16 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link to="/" aria-label="DOMENCE, strona główna" className="inline-block focus-visible:ring-2 focus-visible:ring-amber-400">
              <Logo size="md" variant="light" showSubtitle={true} />
            </Link>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-gray-300">
              Inteligentny dom, kamery i{' '}wideodomofon w{' '}Warszawie i{' '}okolicach. Wszystko działa w{' '}domu, bez abonamentu, a{' '}po montażu uczymy domowników obsługi.
            </p>
            <Link
              to="/zapytanie"
              className="btn-accent mt-6 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-950"
            >
              {CTA.label}
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold text-white mb-3">{col.title}</h2>
              <ul role="list">
                {col.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3 space-y-3">
            <h2 className="font-display text-sm font-semibold text-white mb-3">Kontakt</h2>
            {SITE.phone && (
              <a href={telHref(SITE.phone)} className={`${linkClass} gap-2.5 text-white`}>
                <Phone className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>{SITE.phone}</span>
              </a>
            )}
            <a href={`mailto:${SITE.email}`} className={`${linkClass} gap-2.5 text-white`}>
              <Mail className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>{SITE.email}</span>
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{SITE.region}</span>
            </div>
            <p className="text-gray-400">Odpowiadamy {RESPONSE_LINE}.</p>
            {legalLines.length > 0 && (
              <address className="not-italic pt-2 text-gray-400 leading-relaxed">
                {legalLines.map((line) => (
                  <span key={line as string} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <div>
            © {year} {legal.companyName || SITE.name}
          </div>
          <Link to="/polityka-prywatnosci" className={`${linkClass} underline underline-offset-4`}>
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
};
