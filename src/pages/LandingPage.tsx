import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader.tsx';
import { ProcessSection } from '../components/ProcessSection.tsx';
import { Reveal } from '../components/Reveal.tsx';
import { LANDINGS, PAGE_LABELS } from '../data/landings.ts';
import { TrustList } from '../components/TrustList.tsx';
import { FlowDiagram } from '../components/FlowDiagram.tsx';
import { CTA } from '../config/site.ts';

// One template for the search landing pages in src/data/landings.ts
export const LandingPage: React.FC<{ slug: string }> = ({ slug }) => {
  const page = LANDINGS[slug];
  const enquiry = `/zapytanie?${page.query}`;

  return (
    <div className="bg-gray-50 text-gray-900">
      <PageHeader badge={page.badge} title={page.title} description={page.description} image={page.image}>
        <Link
          to={enquiry}
          className="btn-engineering-primary mt-7 focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
        >
          <span>{CTA.label}</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </Link>
        {/* Search visitors see the first screen only: what's free, and that we work in their area */}
        <p className="mt-3 text-base text-gray-600">{CTA.note}. Odezwiemy się telefonicznie albo tylko e-mailem.</p>
        <TrustList className="mt-6 pt-5 border-t border-gray-200 max-w-xl" />
      </PageHeader>

      {/* What it does for you, in plain words */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">{page.benefitsTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 max-w-prose">{page.intro}</p>
          </div>
          <Reveal className="lg:col-span-8">
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {page.benefits.map(([term, desc]) => (
                <div key={term} className="border-t-2 border-petrol-700 pt-4">
                  <dt className="font-display text-lg font-bold text-gray-900">{term}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-gray-600">{desc}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FlowDiagram title={page.flow.title} steps={page.flow.steps} />

      <ProcessSection />

      {/* Short answers to what people ask before they write */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Krótkie odpowiedzi</h2>
            <Link
              to="/faq"
              className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600"
            >
              <span>Wszystkie pytania i odpowiedzi</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <dl className="lg:col-span-8 divide-y divide-gray-300 border-y border-gray-300">
            {page.faq.map(([q, a]) => (
              <div key={q} className="py-6">
                <dt className="font-display text-lg font-bold text-gray-900">{q}</dt>
                <dd className="mt-2 text-base leading-relaxed text-gray-600 max-w-prose">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      <section className="py-14 lg:py-16 bg-petrol-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Opowiedz o swoim domu</h2>
            <p className="mt-2 text-base text-gray-200 max-w-xl">
              Kilka pytań i kontakt. Odezwiemy się telefonicznie albo tylko e-mailem, jak wolisz.
            </p>
          </div>
          <Link
            to={enquiry}
            className="btn-accent self-start md:self-auto focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
          >
            {CTA.label}
          </Link>
        </div>
      </section>

      {/* Related pages */}
      <nav aria-label="Zobacz też" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <h2 className="font-display text-base font-bold text-gray-900 shrink-0">Zobacz też</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {page.related.map((to) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600"
                >
                  <span>{PAGE_LABELS[to]}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
