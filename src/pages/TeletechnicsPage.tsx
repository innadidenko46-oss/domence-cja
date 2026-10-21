import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';
import { TeletechnicsSection } from '../components/TeletechnicsSection.tsx';
import { CameraShowcase } from '../components/CameraShowcase.tsx';
import { FlowDiagram, FlowStep } from '../components/FlowDiagram.tsx';
import { Photo } from '../components/Photo.tsx';
import { ShieldCheck, ArrowRight, HardDrive, Cloud } from 'lucide-react';
import { CTA } from '../config/site.ts';

const AT_HOME = [
  ['Bez abonamentu', 'nie płacisz co miesiąc za przechowywanie nagrań.'],
  ['Prywatność', 'nagrania zapisują się na dysku w Twojej szafce na sprzęt, nie w chmurze.'],
  ['Jeden kabel do kamery', 'prąd i obraz idą jednym kablem, więc obraz się nie zacina.'],
  ['Dyski do pracy ciągłej', 'zapisują całą dobę. Ile dni wstecz zobaczysz, zależy od liczby kamer.'],
];

// How the parts work together, in the order the picture travels
const FLOW: FlowStep[] = [
  { kind: 'camera', title: 'Kamery i panel przy furtce', text: 'Widzą posesję w dzień i w nocy, a panel łączy gościa z domem.' },
  { kind: 'cabinet', title: 'Jeden kabel do szafki', text: 'Każde urządzenie dostaje prąd i obraz jednym kablem. Rejestrator w szafce zapisuje nagrania na dysku.' },
  { kind: 'screen', title: 'Ekran w domu', text: 'Dzwonek odbierasz na ekranie przy drzwiach i otwierasz furtkę jednym przyciskiem.' },
  { kind: 'phone', title: 'Telefon poza domem', text: 'Podgląd i rozmowa z gościem w aplikacji, także gdy jesteś w pracy.' },
];

const IN_CLOUD = [
  'Historia nagrań często wymaga płatnego abonamentu.',
  'Kamera na Wi-Fi potrafi tracić zasięg, zwłaszcza za grubymi ścianami.',
  'Bez internetu nie zapisuje nagrań w chmurze.',
];

export const TeletechnicsPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    <PageHeader
      badge="Kamery i wideodomofon"
      title="Kamery i wideodomofon z nagraniami w domu"
      description="Kamery z kolorowym obrazem w nocy i wideodomofon, dzięki któremu porozmawiasz z kurierem przez telefon. Nagrania zapisuje rejestrator w szafce na sprzęt, u Ciebie w domu, bez abonamentu."
      image="/images/foto/wideodomofon-furtka"
      imageAlt="Wideodomofon na słupku przy furtce wieczorem, w tle oświetlony dom"
      imageOnPhones
    />

    <TeletechnicsSection />
    <FlowDiagram
      title="Jak to działa razem"
      intro="Od kamery przy furtce do telefonu w Twojej kieszeni. Nagrania zostają w domu, a podgląd masz tam, gdzie jesteś."
      steps={FLOW}
    />
    <CameraShowcase />

    {/* Recordings at home vs. in a cloud */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Nagrania u Ciebie w domu, nie w obcej chmurze</h2>
            <p className="mt-3 text-base leading-relaxed max-w-prose text-gray-600">
              Wiele kamer na Wi-Fi wysyła obraz na serwery producenta. Montujemy kamery na kablu z rejestratorem w domu, a obraz z furtki widzisz na ekranie przy drzwiach.
            </p>
          </div>
          <div className="lg:col-span-6 rounded-[2px] overflow-hidden border border-gray-200 shadow-lg aspect-[16/10]">
            <Photo
              id="/images/foto/ekran-w-domu"
              alt="Ekran wideodomofonu na ścianie w przedpokoju, na nim obraz z kamery przy furtce"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-[2px] border-2 border-amber-500 bg-gray-50">
            <h3 className="flex items-center gap-3 text-lg font-bold text-gray-900">
              <HardDrive className="w-5 h-5 text-petrol-700" aria-hidden="true" />
              Rejestrator nagrań w domu
            </h3>
            <ul className="mt-5 space-y-3 text-base text-gray-700">
              {AT_HOME.map(([title, text]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-gray-900">{title}:</strong> {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 rounded-[2px] border bg-gray-50 border-gray-200">
            <h3 className="flex items-center gap-3 text-lg font-bold text-gray-900">
              <Cloud className="w-5 h-5 text-gray-600" aria-hidden="true" />
              Kamery na Wi-Fi z nagraniami w chmurze
            </h3>
            <ul className="mt-5 space-y-3 text-base text-gray-700">
              {IN_CLOUD.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="py-14 lg:py-16 bg-petrol-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Zacznij od wejścia i kamer</h2>
          <p className="mt-2 text-base text-gray-200">Światło czy rolety dołożysz później, bez wymiany tego, co już masz.</p>
          <Link
            to="/wideodomofon-i-kamery-warszawa"
            className="mt-3 inline-flex items-center min-h-11 text-sm font-semibold text-amber-200 underline underline-offset-4 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Montaż wideodomofonu i kamer w Warszawie i okolicach
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/zapytanie?chce=kamery"
            className="btn-accent focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
          >
            {CTA.label}
          </Link>
          <Link to="/scenariusze" className="btn-on-dark focus-visible:ring-2 focus-visible:ring-amber-400">
            <span>Scenariusze</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);
