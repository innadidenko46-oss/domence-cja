import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, SlidersHorizontal, Flame, Activity, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { CAPABILITIES } from '../data/content.ts';

const ICONS: Record<string, typeof Sun> = {
  'cap-lighting': Sun,
  'cap-blinds': SlidersHorizontal,
  'cap-climate': Flame,
  'cap-sensors': Activity,
  'cap-interface': Smartphone,
};

// Light, blinds, heating, sensors and control, one at a time (tabs)
export const CapabilitiesShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Arrows move between tabs, Home and End jump to the first and the last one
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? CAPABILITIES.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + CAPABILITIES.length) % CAPABILITIES.length;
    setActiveId(CAPABILITIES[next].id);
    document.getElementById(`cap-tab-${CAPABILITIES[next].id}`)?.focus();
  };

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Co potrafi Twój dom</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Światło, rolety i ogrzewanie sterowane z telefonu i zwykłych włączników. Do nowego domu moduły trafiają do rozdzielnicy, do gotowego mieszkania za włączniki.
          </p>
        </div>

        <div role="tablist" aria-label="Co potrafi Twój dom" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = ICONS[cap.id] ?? Sun;
            const selected = cap.id === activeId;
            return (
              <button
                key={cap.id}
                id={`cap-tab-${cap.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`cap-panel-${cap.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(cap.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`p-3.5 min-h-11 rounded-[2px] text-left border flex items-center gap-2.5 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2 ${
                  selected ? 'bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className={`w-8 h-8 rounded-[2px] flex items-center justify-center shrink-0 ${selected ? 'bg-petrol-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-gray-900">{cap.badge}</span>
              </button>
            );
          })}
        </div>

        {CAPABILITIES.map((active) => (
        <div
          key={active.id}
          id={`cap-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`cap-tab-${active.id}`}
          hidden={active.id !== activeId}
          className="animate-fade-up rounded-[2px] border p-6 sm:p-8 lg:p-10 bg-white border-gray-200"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">{active.title}</h3>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <p className="text-base leading-relaxed text-gray-700">{active.description}</p>
              <ul className="mt-5 space-y-2.5">
                {active.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-base text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-petrol-700 shrink-0 mt-1" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 border-l-2 border-amber-500 pl-5">
              <p className="text-sm font-semibold text-amber-800">Tak to wygląda u Ciebie</p>
              <p className="mt-2 text-base leading-relaxed text-gray-900">{active.example}</p>
              <Link
                to="/scenariusze"
                className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                <span>Wszystkie scenariusze</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <dl className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm font-bold text-gray-900">W nowym domu: moduły w rozdzielnicy</dt>
              <dd className="mt-1.5 text-base leading-relaxed text-gray-600">{active.inSwitchboard}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-gray-900">W gotowym mieszkaniu: za włącznikami, bez kucia</dt>
              <dd className="mt-1.5 text-base leading-relaxed text-gray-600">{active.behindSwitches}</dd>
            </div>
          </dl>
        </div>
        ))}
      </div>
    </section>
  );
};
