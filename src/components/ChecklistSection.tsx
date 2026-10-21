import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { CTA } from '../config/site.ts';

// Questions worth asking any installer, with how we answer them.
// Facts about our own work only: no claims about other companies.
const QUESTIONS: [question: string, answer: string][] = [
  ['Czy światło i rolety zadziałają, gdy zniknie internet?', 'Tak. Sterowanie działa w domowej sieci, a zwykłe włączniki działają zawsze.'],
  ['Czy za podgląd i nagrania trzeba płacić co miesiąc?', 'Nie. Nagrania zostają na dysku w domu, a aplikacje są bezpłatne.'],
  ['Czy dostanę cenę na piśmie przed rozpoczęciem prac?', 'Tak. Najpierw bezpłatne sprawdzenie domu, potem plan, cena i termin na piśmie.'],
  ['Czy w gotowym mieszkaniu trzeba będzie kuć?', 'Zwykle nie. Moduły chowamy za włącznikami, a wiercimy z odsysaniem pyłu.'],
  ['Kto nauczy domowników obsługi?', 'My. Po montażu uczymy domowników i bezpłatnie konfigurujemy system.'],
  ['Z kim będę rozmawiać?', 'Z inżynierem prowadzącym, od pierwszej rozmowy do nauki obsługi.'],
];

export const ChecklistSection: React.FC = () => (
  <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-4">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">O co zapytać, zanim wybierzesz wykonawcę</h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">Sześć pytań, które warto zadać każdej firmie. Obok nasze odpowiedzi.</p>
        <Link
          to="/zapytanie?chce=dom"
          className="btn-engineering-primary mt-8 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
        >
          <span>{CTA.label}</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
      <dl className="lg:col-span-8 border-y border-gray-300 divide-y divide-gray-300">
        {QUESTIONS.map(([q, a]) => (
          <div key={q} className="py-5 grid sm:grid-cols-2 gap-x-8 gap-y-2">
            <dt className="font-display text-base font-bold text-gray-900">{q}</dt>
            <dd className="flex items-start gap-2.5 text-base leading-relaxed text-gray-700">
              <Check className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{a}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
