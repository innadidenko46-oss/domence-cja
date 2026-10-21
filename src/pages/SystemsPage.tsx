import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';
import { CapabilitiesShowcase } from '../components/CapabilitiesShowcase.tsx';
import { DayRhythmSection } from '../components/DayRhythmSection.tsx';
import { ChecklistSection } from '../components/ChecklistSection.tsx';
import { CheckCircle2, ArrowRight, WifiOff } from 'lucide-react';
import { CTA } from '../config/site.ts';
import { DeviceArt } from '../components/DeviceArt.tsx';

const OPTIONS = [
  {
    label: 'Dom w budowie albo nowa rozdzielnica',
    title: 'Moduły w rozdzielnicy',
    text: 'Gdy budujesz dom od zera, moduły montujemy w rozdzielnicy. Łączą się kablem i mierzą zużycie prądu.',
    points: ['Pewne połączenie po kablu', 'Moduły same się wyłączają przy przegrzaniu i przeciążeniu'],
    query: 'chce=dom&etap=budowa',
    art: 'switchboard' as const,
    more: null,
  },
  {
    label: 'Gotowe mieszkanie, bez kucia',
    title: 'Małe moduły za włącznikami',
    text: 'Masz już pomalowane ściany. Małe moduły chowamy w puszkach za włącznikami, a czujniki działają na baterie.',
    points: ['Montaż bez kucia, z odsysaniem pyłu', 'Zwykłe włączniki działają jak dawniej'],
    query: 'chce=dom&etap=gotowy',
    art: 'switch' as const,
    more: { to: '/automatyka-bez-kucia', label: 'Mieszkanie bez kucia: co da się zrobić' },
  },
];

export const SystemsPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    <PageHeader
      badge="Inteligentny dom"
      title="Światło, rolety i ogrzewanie z włączników i telefonu"
      description="Automatyka domowa bez żargonu: co pasuje do nowego domu, a co do gotowego mieszkania. Bez kucia, jeśli nie trzeba."
      image="photo-1600607687939-ce8a6c25118c"
    />

    {/* The first decision: modules in the switchboard or behind switches */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 max-w-3xl">Nowy dom czy gotowe mieszkanie?</h2>
        <p className="mt-2 text-base leading-relaxed max-w-prose text-gray-600">Od tego zależy, jak montujemy. W obu przypadkach działa tak samo dobrze.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {OPTIONS.map((opt) => (
            <div key={opt.title} className="p-6 rounded-[2px] border flex flex-col justify-between bg-white border-gray-200">
              <div>
                <div className="-mx-6 -mt-6 mb-6 h-40 bg-petrol-50 border-b border-petrol-100 flex items-center justify-center">
                  <DeviceArt kind={opt.art} className="h-32 w-auto" />
                </div>
                <p className="text-sm font-semibold text-amber-800">{opt.label}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-gray-900">{opt.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">{opt.text}</p>
                <ul className="mt-4 space-y-2">
                  {opt.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-base text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-petrol-700 shrink-0 mt-1" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {opt.more && (
                  <Link
                    to={opt.more.to}
                    className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 underline underline-offset-4 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600"
                  >
                    {opt.more.label}
                  </Link>
                )}
              </div>
              <Link
                to={`/zapytanie?${opt.query}`}
                className="mt-6 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                <span>{CTA.short}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-5xl p-6 rounded-[2px] border-l-4 border-l-petrol-700 border border-gray-200 bg-white flex items-start gap-4">
          <WifiOff className="w-6 h-6 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-display text-base font-bold text-gray-900">Dlaczego dom działa też bez internetu?</h3>
            <p className="text-base mt-1 leading-relaxed text-gray-700">
              Wiele gadżetów potrzebuje stałego łącza z serwerami producenta: gdy padnie internet, nie zapalą światła. U nas sterowanie działa w domowej sieci, więc światło i ogrzewanie słuchają Cię dalej.
            </p>
          </div>
        </div>
      </div>
    </section>

    <CapabilitiesShowcase />
    <DayRhythmSection />
    <ChecklistSection />

    {/* The page ends on the enquiry; cameras are the second, quieter way on */}
    <section className="py-14 lg:py-16 bg-petrol-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Opowiedz o swoim domu</h2>
          <p className="mt-2 text-base text-gray-200 max-w-xl leading-relaxed">
            W nowym domu i w gotowym mieszkaniu inżynier podpowie, od czego zacząć. Kamery i wideodomofon dodasz w tym samym zapytaniu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/zapytanie?chce=dom"
            className="btn-accent focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
          >
            {CTA.label}
          </Link>
          <Link to="/teletechnika" className="btn-on-dark focus-visible:ring-2 focus-visible:ring-amber-400">
            <span>Kamery i wideodomofon</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);
