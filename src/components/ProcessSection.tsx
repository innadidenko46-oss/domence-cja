import React from 'react';
import { WORKFLOW_STEPS } from '../data/content.ts';

export const ProcessSection: React.FC = () => (
  <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200 text-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.2] text-gray-900">
          Od pierwszej rozmowy do gotowego domu
        </h2>
        <p className="mt-3 text-base leading-relaxed max-w-prose text-gray-600">
          Wiesz, co dzieje się na każdym etapie. Masz jedną osobę do kontaktu i termin na piśmie.
        </p>
      </div>

      {/* The line fills as the steps scroll past (CSS, where supported), showing they happen in order */}
      <div className="relative h-0.5 bg-gray-200 mb-8" aria-hidden="true">
        <div className="scroll-fill absolute inset-0 bg-amber-500" />
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
        {WORKFLOW_STEPS.map((step, idx) => (
          <li key={step.number}>
            <span className="font-display text-3xl font-extrabold tabular-nums text-petrol-700" aria-hidden="true">
              {step.number}
            </span>
            <h3 className="mt-2 text-base font-bold leading-snug text-gray-900">
              <span className="sr-only">Krok {idx + 1}: </span>
              {step.title}
            </h3>
            <p className="text-base mt-2 leading-relaxed text-gray-600">{step.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
