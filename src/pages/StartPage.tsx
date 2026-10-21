import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader.tsx';
import { ProcessSection } from '../components/ProcessSection.tsx';
import { Reveal } from '../components/Reveal.tsx';
import { Interest } from '../types.ts';
import { INTEREST_OPTIONS } from '../data/interests.ts';
import { CTA } from '../config/site.ts';

// What the visitor wants, the same three answers as the first step of the enquiry.
// Each one opens the enquiry with that answer already chosen. No quantities, dates or prices.
const DETAILS: Record<Interest, { usually: string[]; tip: string }> = {
  dom: {
    usually: ['Światło i rolety z włączników i telefonu', 'Osobna temperatura w każdym pokoju', 'Czujniki zalania i zawór, który sam zakręca wodę'],
    tip: 'W budowie prowadzimy kable, w gotowym domu montujemy bez kucia.',
  },
  kamery: {
    usually: ['Wideodomofon: rozmowa z furtki w telefonie', 'Kamery z kolorowym obrazem w nocy', 'Nagrania na dysku w domu, bez abonamentu'],
    tip: 'Później dołożysz światło czy rolety, bez wymiany tego, co już masz.',
  },
  oba: {
    usually: [
      'Dzwonek po zmroku zapala światło przed furtką',
      'Podczas wyjazdu światła zapalają się wieczorem, a obraz z kamer masz w telefonie',
      'Jedna szafka na sprzęt dla kamer i automatyki',
    ],
    tip: 'Planujemy wszystko razem, więc później nic nie trzeba przerabiać.',
  },
};

const PRICE_FACTORS = [
  ['Wielkość domu', 'Liczba pomieszczeń i pięter, w których czymś sterujemy.'],
  ['Iloma rzeczami sterujemy', 'Lampy, rolety, grzejniki, kamery: każdy punkt to osobny moduł albo urządzenie.'],
  ['Nowy dom czy gotowe wnętrze', 'W budowie prowadzimy kable, w gotowym mieszkaniu montujemy moduły bez kucia.'],
  ['Co już masz', 'Rolety z silnikami czy działające lampy często wykorzystujemy bez wymiany.'],
];

export const StartPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    <PageHeader
      badge="Jak zacząć"
      title="Od czego zacząć w Twoim domu"
      description="Inteligentny dom, kamery z wideodomofonem albo jedno i drugie. Wybierz, co Cię interesuje, a zapytanie otworzy się z tą odpowiedzią."
      image="photo-1600607687939-ce8a6c25118c"
    />

    {/* Three interests as ruled rows: what it is, what we usually do, the next step */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 max-w-3xl">Co Cię interesuje?</h2>

        <ol className="mt-10 border-t border-gray-300">
          {INTEREST_OPTIONS.map(({ value, icon: Icon, title, sub, path, more }) => (
            <li key={value} className="border-b border-gray-300">
              <Reveal className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 lg:py-10">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-2xl font-bold text-gray-900">{title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-gray-600 max-w-[34ch]">{sub}</p>
                  <Link to={path} className="mt-3 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600">
                    <span>{more}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm font-semibold text-gray-900">Co zwykle wchodzi w zakres:</p>
                  <ul className="mt-3 space-y-2.5">
                    {DETAILS[value].usually.map((u) => (
                      <li key={u} className="flex items-start gap-2.5 text-base leading-relaxed text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3 flex flex-col justify-between gap-5">
                  <p className="text-base leading-relaxed text-gray-600 border-l-2 border-amber-500 pl-3">{DETAILS[value].tip}</p>
                  <Link
                    to={`/zapytanie?chce=${value}`}
                    className="btn-engineering-primary self-start focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                  >
                    <span>{CTA.short}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Honest answer to "how much": what the price depends on, without numbers */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Od czego zależy cena</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 max-w-prose">
            Cenę dostajesz na piśmie po bezpłatnej rozmowie i sprawdzeniu domu. Wiesz, co i za ile montujemy, zanim zaczniemy.
          </p>
        </div>
        <Reveal className="lg:col-span-8">
          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {PRICE_FACTORS.map(([term, desc], i) => (
              <div key={term} className="border-t-2 border-petrol-700 pt-4">
                <dt className="flex items-baseline gap-3 font-display text-lg font-bold text-gray-900">
                  <span className="text-sm tabular-nums text-amber-700">0{i + 1}</span>
                  {term}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-gray-600">{desc}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>

    <ProcessSection />

    <section className="py-14 lg:py-16 bg-petrol-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Nie wiesz, co wybrać?</h2>
          <p className="mt-2 text-base text-gray-200 max-w-xl">W zapytaniu zaznaczymy „Jedno i drugie”, a inżynier podpowie, od czego zacząć w Twoim domu.</p>
        </div>
        <Link
          to="/zapytanie?chce=oba"
          className="btn-accent self-start md:self-auto focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
        >
          {CTA.label}
        </Link>
      </div>
    </section>
  </div>
);
