import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, CheckCircle2, Lock, Cpu, Phone } from 'lucide-react';
import { ProcessSection } from '../components/ProcessSection.tsx';
import { ProofSection } from '../components/ProofSection.tsx';
import { EverydaySection } from '../components/EverydaySection.tsx';
import { FAQ_ITEMS } from '../data/content.ts';
import { INTEREST_OPTIONS } from '../data/interests.ts';
import { OfflineDemo } from '../components/OfflineDemo.tsx';
import { BrandArcs } from '../components/BrandArcs.tsx';
import { Reveal } from '../components/Reveal.tsx';
import { Photo } from '../components/Photo.tsx';
import { TrustList } from '../components/TrustList.tsx';
import { SITE, CTA, RESPONSE_LINE, telHref } from '../config/site.ts';

const PILLARS = [
  {
    icon: Lock,
    title: 'Prywatność i działanie bez internetu',
    text: 'Nagrania z kamer zapisują się na dysku w Twoim domu, a światło i rolety działają także bez internetu. Nie płacisz miesięcznego abonamentu.',
  },
  {
    icon: Cpu,
    title: 'Porządek w rozdzielnicy',
    text: 'Moduły montujemy starannie, a każdy obwód ma czytelny opis. Po latach każdy elektryk od razu wie, co jest czym.',
  },
  {
    icon: Wrench,
    title: 'Czysty montaż, także w umeblowanym domu',
    text: 'Wiercimy z odsysaniem pyłu, zabezpieczamy podłogi i sprzątamy po sobie.',
  },
];

const FOR_WHOM = [
  'Budujesz dom, remontujesz albo masz już gotowe mieszkanie w Warszawie i okolicach.',
  'Chcesz, żeby światło, ogrzewanie albo kamery i furtka działały same, także bez internetu.',
  'Planujesz montaż w najbliższych miesiącach.',
  'Wolisz, żeby wszystkim zajęła się jedna firma, a nie kilku wykonawców.',
];

const YOU_GET = [
  ['Bezpłatna rozmowa i sprawdzenie domu', 'Przyjeżdżamy, oglądamy instalację i słuchamy, czego potrzebujesz.'],
  ['Plan i cena na piśmie', 'Wiesz, co i za ile montujemy, zanim zaczniemy.'],
  ['Jeden kontakt od początku do końca', `${SITE.engineer.name}, ${SITE.engineer.role.toLowerCase()}, jest Twoim kontaktem od pierwszej rozmowy do nauki obsługi.`],
  ['Nauka obsługi i bezpłatna konfiguracja', 'Bez dopłat ustawiamy sceny, harmonogramy i aplikacje pod Twój dom. Uczymy każdego domownika, jak zapalić światło, otworzyć furtkę i podejrzeć obraz z kamer.'],
];

export const HomePage: React.FC = () => (
  <div className="bg-white text-gray-800">
    {/* Hero */}
    <section className="relative pt-10 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 hero-stagger">
          <h1 className="font-display text-4xl sm:text-5xl 2xl:text-6xl font-extrabold tracking-[-0.015em] leading-[1.05] text-gray-950">
            Inteligentny dom, kamery i wideodomofon. <span className="text-amber-600">Działają też bez internetu.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl">
            Światło, rolety, ogrzewanie i furtka: z włączników na ścianie i z telefonu. Montujemy w Warszawie i okolicach, w nowych domach i w gotowych mieszkaniach{' '}
            <Link to="/automatyka-bez-kucia" className="underline underline-offset-4 decoration-gray-400 hover:text-petrol-700 hover:decoration-petrol-700">
              bez kucia ścian
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              to="/zapytanie"
              className="btn-engineering-primary shadow-sm focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
            >
              <span>{CTA.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
            <a href="#co-montujemy" className="btn-secondary shadow-sm focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2">
              Zobacz, co montujemy
            </a>
          </div>
          <p className="mt-3 text-base text-gray-600">{CTA.note}. Odezwiemy się telefonicznie albo tylko e-mailem.</p>

          <TrustList className="mt-8 pt-6 border-t border-gray-200" />
        </div>

        <div className="lg:col-span-5 hero-media relative">
          <BrandArcs className="hidden min-[1440px]:block absolute right-0 bottom-0 translate-x-[calc(100%-1rem)] translate-y-[calc(100%-1rem)] w-36 h-36 pointer-events-none" />
          <div className="rounded-[2px] overflow-hidden border border-gray-200 shadow-xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
            <img
              src="/images/hero-wideodomofon.jpg"
              alt="Dłoń z telefonem pokazującym obraz z kamery przy furtce, obok drzwi wejściowych panel sterowania domem"
              width={1136}
              height={1408}
              fetchPriority="high"
              className="w-full h-full object-cover object-[35%_55%] lg:object-center"
            />
          </div>
        </div>
      </div>
    </section>

    {/* What we install = the first question of the enquiry */}
    <section id="co-montujemy" className="scroll-mt-20 pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-gray-100 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Od czego zaczynasz?</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Wybierz, co Cię interesuje. Zapytanie otworzy się z tą odpowiedzią, a urządzenia dobierzemy po sprawdzeniu domu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INTEREST_OPTIONS.map(({ value, title, sub, icon: Icon, path, more, image, imageAlt }) => (
            <article key={value} className="flex flex-col rounded-[2px] border border-gray-200 bg-white overflow-hidden">
              <div className="h-32 sm:h-44 lg:h-52 bg-gray-200">
                <Photo id={image} alt={imageAlt} widths={[480, 800]} sizes="(min-width: 768px) 33vw, 100vw" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-gray-900">
                  <Icon className="w-5 h-5 text-petrol-700 shrink-0" aria-hidden="true" />
                  {title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-600 flex-1">{sub}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    to={`/zapytanie?chce=${value}`}
                    className="btn-engineering-primary focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                  >
                    {CTA.short}
                  </Link>
                  <Link
                    to={path}
                    className="inline-flex items-center justify-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600"
                  >
                    <span>{more}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* The main promise, shown instead of told: switch the internet off */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <OfflineDemo />
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Czym to się różni od zestawów ze sklepu?</h2>
          <ol role="list" className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="py-6 grid grid-cols-[auto_1fr] gap-x-5">
                <span className="font-display text-sm font-semibold tabular-nums text-amber-700 pt-1">0{i + 1}</span>
                <div>
                  <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-gray-900">
                    <Icon className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                    {title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-600 max-w-prose">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    <EverydaySection />

    <ProcessSection />

    {/* Finished homes and client words: hidden until real ones are added in site.ts */}
    <ProofSection />

    {/* Who we work with and what you get: sets expectations so decided buyers self-select */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-gray-100 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Najlepiej pomożemy, gdy wiesz już, czego chcesz w swoim domu</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Jesteśmy nową firmą, więc nie pokażemy jeszcze zdjęć z domów klientów. Dlatego wszystko ustalamy na piśmie, zanim cokolwiek zamówisz.
          </p>
        </div>

        <Reveal className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="font-display text-lg font-bold text-gray-900">Będziemy dobrym wyborem, jeśli:</h3>
            <ul className="mt-5 space-y-4">
              {FOR_WHOM.map((t) => (
                <li key={t} className="flex items-start gap-3 text-base leading-relaxed text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base leading-relaxed text-gray-600">
              Dopiero zbierasz informacje? Zajrzyj na stronę{' '}
              <Link to="/jak-zaczac" className="font-semibold text-petrol-700 underline underline-offset-2 hover:text-amber-800">
                Jak zacząć
              </Link>{' '}
              albo do{' '}
              <Link to="/faq" className="font-semibold text-petrol-700 underline underline-offset-2 hover:text-amber-800">
                pytań i odpowiedzi
              </Link>
              .
            </p>
          </div>

          <div className="lg:border-l lg:border-gray-300 lg:pl-16">
            <h3 className="font-display text-lg font-bold text-gray-900">Co dostajesz:</h3>
            <ol role="list" className="mt-5 space-y-5">
              {YOU_GET.map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[auto_1fr] gap-x-4">
                  <span className="font-display text-sm font-semibold tabular-nums text-amber-700 pt-0.5">0{i + 1}</span>
                  <div>
                    <div className="text-base font-bold text-gray-900">{title}</div>
                    <p className="mt-1 text-base leading-relaxed text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>

    {/* FAQ teaser: the questions people ask first (onHome in content.ts) */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Zanim napiszesz</h2>
          <Link
            to="/faq"
            className="mt-5 inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600"
          >
            <span>Wszystkie pytania i odpowiedzi</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <dl className="lg:col-span-8 border-y border-gray-300 divide-y divide-gray-300">
          {FAQ_ITEMS.filter((item) => item.onHome).map((item) => (
            <div key={item.question} className="py-6">
              <dt className="font-display text-lg font-bold text-gray-900">{item.question}</dt>
              <dd className="mt-2 text-base leading-relaxed text-gray-700 max-w-[38rem]">{item.simpleAnswer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    {/* Last call to action */}
    <section className="pt-16 pb-20 lg:pt-20 lg:pb-24 bg-petrol-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          {SITE.engineer.name && SITE.engineer.photo && (
            <img
              src={`/${SITE.engineer.photo}`}
              alt={SITE.engineer.name}
              className="w-20 h-20 rounded-[2px] object-cover shrink-0 border border-white/20"
              loading="lazy"
            />
          )}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Chcesz inteligentny dom albo kamery u siebie?</h2>
            <p className="text-base text-gray-200 mt-2 max-w-xl leading-relaxed">
              Napisz, co chcesz mieć w domu. Odezwiemy się telefonicznie albo tylko e-mailem, {RESPONSE_LINE}.
            </p>
            {SITE.engineer.name && (
              <p className="mt-3 text-sm text-gray-300">
                Twój kontakt: <span className="font-semibold text-white">{SITE.engineer.name}</span>, {SITE.engineer.role.toLowerCase()}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-3 shrink-0">
          <Link
            to="/zapytanie"
            className="btn-accent focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
          >
            {CTA.label}
          </Link>
          {/* Only a real phone number competes with the enquiry here: an e-mail would skip its questions */}
          {SITE.phone && (
            <a href={telHref(SITE.phone)} className="btn-on-dark focus-visible:ring-2 focus-visible:ring-amber-400">
              <Phone className="w-4 h-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  </div>
);
