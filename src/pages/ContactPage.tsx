import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';
import { SITE, CTA, RESPONSE_LINE, telHref } from '../config/site.ts';
import { Phone, Mail, MapPin, CheckCircle2, ClipboardList, ArrowRight, Building2 } from 'lucide-react';

const HOW_WE_WORK = [
  'Za darmo sprawdzamy dom przed wyceną',
  'Zakres, cenę i termin potwierdzamy na piśmie przed rozpoczęciem prac',
  'Po montażu uczymy domowników obsługi i bezpłatnie konfigurujemy system',
];

const cardClass = 'flex items-start gap-4 p-5 rounded-[2px] border bg-white border-gray-200';
const iconClass = 'w-10 h-10 rounded-[2px] bg-petrol-50 text-petrol-700 flex items-center justify-center shrink-0';

export const ContactPage: React.FC = () => {
  const { legal } = SITE;
  const legalLines = [legal.companyName, legal.address, legal.nip && `NIP ${legal.nip}`, legal.regon && `REGON ${legal.regon}`, legal.krs && `KRS ${legal.krs}`].filter(Boolean);

  return (
    <div className="bg-gray-50 text-gray-900">
      <PageHeader
        badge="Kontakt"
        title="Porozmawiaj z inżynierem o swoim domu"
        description={`Budujesz dom, remontujesz albo masz już gotowe mieszkanie w Warszawie i okolicach? Odpowiadamy ${RESPONSE_LINE}.`}
        image="photo-1600566753190-17f0baa2a6c3"
      />

      <section className="pt-14 pb-20 lg:pt-20 lg:pb-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* The fastest way: the enquiry */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-[2px] border shadow-xl bg-white border-gray-200">
              <ClipboardList className="w-8 h-8 text-petrol-700" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-gray-900">Najszybciej: krótkie zapytanie</h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Trzy kroki, około 2 minut: co Cię interesuje, jaki to dom i jak się z Tobą skontaktować. Możesz wybrać tylko e-mail, wtedy nie zadzwonimy.
              </p>
              <Link
                to="/zapytanie"
                className="btn-engineering-primary mt-7 w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
              >
                <span>{CTA.label}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>

              <h3 className="mt-10 text-base font-bold text-gray-900">Jak działamy</h3>
              <ul className="mt-3 space-y-2.5">
                {HOW_WE_WORK.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-base text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct contact */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Kontakt bezpośredni</h2>
            {SITE.phone && (
              <a href={telHref(SITE.phone)} className={`${cardClass} hover:border-petrol-700 focus-visible:ring-2 focus-visible:ring-petrol-600`}>
                <span className={iconClass}>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-gray-600">Telefon</span>
                  <span className="block text-base font-bold text-gray-900">{SITE.phone}</span>
                  <span className="block text-base text-gray-600 mt-0.5">{SITE.hours}</span>
                </span>
              </a>
            )}

            <a href={`mailto:${SITE.email}`} className={`${cardClass} hover:border-petrol-700 focus-visible:ring-2 focus-visible:ring-petrol-600`}>
              <span className={iconClass}>
                <Mail className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-gray-600">E-mail</span>
                <span className="block text-base font-bold text-gray-900 break-all">{SITE.email}</span>
                <span className="block text-base text-gray-600 mt-0.5">Odpowiadamy {RESPONSE_LINE}</span>
              </span>
            </a>

            <div className={cardClass}>
              <span className={iconClass}>
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-gray-600">Gdzie działamy</span>
                <span className="block text-base font-bold text-gray-900">{SITE.region}</span>
                <span className="block text-base text-gray-600 mt-0.5">Przyjeżdżamy na miejsce i bezpłatnie sprawdzamy dom.</span>
              </span>
            </div>

            {SITE.engineer.name && (
              <div className={cardClass}>
                <span className={iconClass}>
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-gray-600">{SITE.engineer.role}</span>
                  <span className="block text-base font-bold text-gray-900">{SITE.engineer.name}</span>
                  <span className="block text-base text-gray-600 mt-0.5">Twój kontakt od pierwszej rozmowy do nauki obsługi.</span>
                </span>
              </div>
            )}

            {legalLines.length > 0 && (
              <div className={cardClass}>
                <span className={iconClass}>
                  <Building2 className="w-5 h-5" aria-hidden="true" />
                </span>
                <address className="not-italic text-sm text-gray-700 leading-relaxed">
                  {legalLines.map((line) => (
                    <span key={line as string} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
