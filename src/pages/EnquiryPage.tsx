import React, { useSyncExternalStore } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';
import { EnquiryForm } from '../components/EnquiryForm.tsx';
import { PropertyState, Interest } from '../types.ts';
import { RESPONSE_LINE, SITE } from '../config/site.ts';

const noopSubscribe = () => () => {};

const NEXT_STEPS = [
  ['Rozmowa', 'Odezwiemy się telefonicznie albo e-mailem, jak wolisz. Dopytamy o szczegóły, podpowiemy, co ma sens w Twoim domu, i zaproponujemy termin bezpłatnego sprawdzenia.'],
  ['Bezpłatne sprawdzenie domu', 'Inżynier ogląda instalację na miejscu, w Warszawie i okolicach.'],
  ['Plan i cena na piśmie', 'Wiesz, co i za ile montujemy, zanim zaczniemy. Decyzja należy do Ciebie.'],
];

export const EnquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // The form reads the address (?chce=…), which the build doesn't know: it appears after
  // hydration. False while prerendering and hydrating, true at once on a client-side visit.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // ?chce=dom|kamery|oba opens the enquiry at step 2; ?etap=budowa|gotowy presets the stage.
  // Old links with ?state=… still work: "security" meant cameras, the rest was the stage.
  const legacy = searchParams.get('state');
  const chce = searchParams.get('chce');
  const etap = searchParams.get('etap');
  const initialInterest: Interest | undefined =
    chce === 'dom' || chce === 'kamery' || chce === 'oba' ? chce : legacy === 'security' ? 'kamery' : undefined;
  const initialStage: PropertyState | undefined =
    etap === 'budowa' || legacy === 'deweloperski' ? 'deweloperski' : etap === 'gotowy' || legacy === 'retro' ? 'retro' : undefined;

  return (
    <div className="bg-gray-50 text-gray-900">
      <PageHeader
        compact
        badge="Zapytanie"
        title="Opowiedz nam o swoim domu"
        description={`Trzy krótkie kroki, około 2 minut. Odezwiemy się telefonicznie albo tylko e-mailem, ${RESPONSE_LINE}.`}
      />

      {mounted ? (
        <EnquiryForm initialInterest={initialInterest} initialStage={initialStage} />
      ) : (
        <section aria-busy="true" className="pt-6 pb-16 sm:pt-10 border-t bg-gray-100 border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-[2px] border p-5 sm:p-10 lg:p-12 shadow-xl bg-white border-gray-200 min-h-[420px]">
              <p className="text-sm text-gray-600">Ładowanie formularza…</p>
              <noscript>
                <p className="mt-2 text-sm text-gray-700">
                  Formularz wymaga włączonego JavaScriptu. Napisz do nas:{' '}
                  <a href={`mailto:${SITE.email}`} className="font-semibold underline underline-offset-2 text-petrol-700">
                    {SITE.email}
                  </a>
                  .
                </p>
              </noscript>
            </div>
          </div>
        </section>
      )}

      <section className="py-14 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">Co dzieje się po wysłaniu</h2>
          <ol className="mt-6 grid sm:grid-cols-3 gap-6">
            {NEXT_STEPS.map(([title, text], i) => (
              <li key={title} className="border-t-2 border-petrol-700 pt-4">
                <span className="font-display text-sm font-semibold tabular-nums text-amber-700">0{i + 1}</span>
                <h3 className="mt-1 text-base font-bold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
