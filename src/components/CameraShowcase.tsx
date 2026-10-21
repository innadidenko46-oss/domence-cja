import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Lightbulb, Video, BellRing, ScanFace, Tablet, CheckCircle2, ArrowRight } from 'lucide-react';
import { CAMERA_PRODUCTS } from '../data/content.ts';
import { CameraProduct } from '../types.ts';
import { CTA } from '../config/site.ts';
import { DeviceArt, DeviceKind } from './DeviceArt.tsx';

const ICONS: Record<CameraProduct['category'], typeof Eye> = {
  cctv_color: Eye,
  cctv_deter: Lightbulb,
  cctv_wide: Video,
  intercom_panel: BellRing,
  intercom_face: ScanFace,
  intercom_screen: Tablet,
};

const ART: Record<CameraProduct['category'], DeviceKind> = {
  cctv_color: 'camera',
  cctv_deter: 'camera-light',
  cctv_wide: 'camera-wide',
  intercom_panel: 'gate-panel',
  intercom_face: 'face-reader',
  intercom_screen: 'screen',
};

// Cameras, gate panel, face access and the screen at home, one at a time (tabs)
export const CameraShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState(CAMERA_PRODUCTS[0].id);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Arrows move between tabs, Home and End jump to the first and the last one
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? CAMERA_PRODUCTS.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + CAMERA_PRODUCTS.length) % CAMERA_PRODUCTS.length;
    setActiveId(CAMERA_PRODUCTS[next].id);
    document.getElementById(`cam-tab-${CAMERA_PRODUCTS[next].id}`)?.focus();
  };

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-gray-100 border-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950">Co montujemy przy wejściu i wokół domu</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Podgląd domu w telefonie i nagrania u siebie. Kamery dają kolorowy obraz w nocy i odróżniają ludzi oraz auta od zwierząt, więc telefon nie dzwoni bez powodu.
          </p>
        </div>

        <div role="tablist" aria-label="Kamery i wideodomofon" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {CAMERA_PRODUCTS.map((prod, i) => {
            const Icon = ICONS[prod.category];
            const selected = prod.id === activeId;
            return (
              <button
                key={prod.id}
                id={`cam-tab-${prod.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`cam-panel-${prod.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(prod.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`p-3.5 min-h-[88px] rounded-[2px] text-left border flex flex-col justify-between gap-2 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2 ${
                  selected ? 'bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className={`w-8 h-8 rounded-[2px] flex items-center justify-center ${selected ? 'bg-petrol-700 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-snug text-gray-900">{prod.name}</span>
              </button>
            );
          })}
        </div>

        {CAMERA_PRODUCTS.map((active) => (
        <div
          key={active.id}
          id={`cam-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`cam-tab-${active.id}`}
          hidden={active.id !== activeId}
          className="animate-fade-up rounded-[2px] border p-6 sm:p-8 lg:p-10 bg-white border-gray-200 grid lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5">
            <div className="mb-6 h-40 sm:h-48 rounded-[2px] bg-petrol-50 border border-petrol-100 flex items-center justify-center">
              <DeviceArt kind={ART[active.category]} className="h-32 sm:h-40 w-auto" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">{active.name}</h3>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">{active.tagline}</p>
            <p className="mt-5 text-base text-gray-600">
              <span className="font-semibold text-gray-900">Gdzie się sprawdza: </span>
              {active.bestUse}
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <ul className="space-y-3">
              {active.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-gray-600">Nagrania na dysku w domu, bez abonamentu</p>
              <Link
                to="/zapytanie?chce=kamery"
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
