import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ShieldCheck,
  LogOut,
  Droplets,
  Video,
  Moon,
  Sparkles,
  Sun,
  SunMedium,
  SlidersHorizontal,
  Power,
  Flame,
  Tv,
  Hand,
  KeyRound,
  Phone,
  Lightbulb,
  LightbulbOff,
  Thermometer,
  HardDrive,
  Plane,
  ArrowRight,
} from 'lucide-react';
import { SCENARIOS } from '../data/content.ts';
import { Photo } from './Photo.tsx';
import { CTA } from '../config/site.ts';

const ICONS: Record<string, typeof Sun> = {
  LogOut,
  Droplets,
  Video,
  Moon,
  Sun,
  SunMedium,
  SlidersHorizontal,
  Power,
  Flame,
  Tv,
  Sparkles,
  KeyRound,
  Phone,
  ShieldCheck,
  Lightbulb,
  LightbulbOff,
  Thermometer,
  HardDrive,
  Plane,
};
const icon = (name: string, className = 'w-4 h-4') => {
  const Icon = ICONS[name] ?? Check;
  return <Icon className={className} aria-hidden="true" />;
};

export const ScenariosSection: React.FC = () => {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Arrows move between tabs, Home and End jump to the first and the last one
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? SCENARIOS.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + SCENARIOS.length) % SCENARIOS.length;
    setActiveId(SCENARIOS[next].id);
    document.getElementById(`sc-tab-${SCENARIOS[next].id}`)?.focus();
  };

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950">Osiem sytuacji z życia</h2>
          <p className="mt-3 text-base max-w-prose leading-relaxed text-gray-600">
            Wybierz sytuację i zobacz, co dom robi sam. Każdą scenę ustawiamy pod Twój dom przy montażu.
          </p>
        </div>

        <div role="tablist" aria-label="Scenariusze" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {SCENARIOS.map((sc, i) => {
            const selected = sc.id === activeId;
            return (
              <button
                key={sc.id}
                id={`sc-tab-${sc.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`sc-panel-${sc.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(sc.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`p-3.5 rounded-[2px] text-left border flex flex-col gap-2 min-h-[96px] cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2 ${
                  selected ? 'bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className="flex items-center justify-between w-full">
                  <span className={`text-sm font-semibold ${selected ? 'text-petrol-700' : 'text-gray-600'}`}>{sc.tag}</span>
                  <span className={`w-7 h-7 rounded-[2px] flex items-center justify-center ${selected ? 'bg-petrol-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {icon(sc.icon)}
                  </span>
                </span>
                <span className="text-sm font-bold leading-snug text-gray-900">{sc.title}</span>
              </button>
            );
          })}
        </div>

        {SCENARIOS.map((active) => (
        <div
          key={active.id}
          id={`sc-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`sc-tab-${active.id}`}
          hidden={active.id !== activeId}
          className="animate-fade-up rounded-[2px] border overflow-hidden bg-white border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-5 relative h-56 sm:h-72 lg:h-auto lg:min-h-[480px] bg-gray-900">
            <Photo id={active.image} alt="" widths={[600, 900]} sizes="(min-width: 1024px) 40vw, 100vw" className="absolute inset-0 w-full h-full object-cover brightness-90" />
            {active.trigger && (
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-[2px] bg-petrol-950/90 border border-white/10 text-sm text-gray-100 flex items-start gap-2.5">
                <Hand className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <span className="font-semibold text-amber-300">Jak włączasz: </span>
                  {active.trigger}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">{active.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700">{active.description}</p>

              {active.actionSteps && (
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5" aria-label="Co robi dom">
                  {active.actionSteps.map((step) => (
                    <li key={step.label} className="p-3 rounded-[2px] border flex items-start gap-2.5 text-sm bg-gray-50 border-gray-200 text-gray-700">
                      <span className="w-7 h-7 rounded-[2px] bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">{icon(step.icon)}</span>
                      <span>
                        <span className="block font-bold text-gray-900">{step.label}</span>
                        <span className="block text-gray-600 mt-0.5 leading-snug">{step.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-6 pl-4 border-l-4 border-amber-500 text-base leading-relaxed text-gray-800">{active.humanNote}</p>

              <ul className="mt-6 space-y-2">
                {active.detailPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-base text-gray-700">
                    <Check className="w-4 h-4 text-petrol-700 shrink-0 mt-1" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-gray-200">
              <span className="text-sm text-gray-600">Działa w domu, także bez internetu</span>
              <Link
                to="/zapytanie"
                className="inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                <span>{CTA.short}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};
