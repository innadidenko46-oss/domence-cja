import React, { useState } from 'react';
import { Network, Video, KeyRound, ChevronDown, CheckCircle2 } from 'lucide-react';
import { TELETECHNIC_SERVICES } from '../data/content.ts';
import { Photo } from './Photo.tsx';

const ICONS: Record<string, typeof Video> = { Camera: Video, KeyRound, Network };

// Illustrative photos of what each card is about (public/images/foto, not our installations)
const PHOTOS: Record<string, [src: string, alt: string]> = {
  cctv: ['/images/foto/kamera-elewacja', 'Kamera na elewacji domu wieczorem, obok lampa nad podjazdem'],
  access: ['/images/foto/czytnik-przy-drzwiach', 'Czytnik twarzy, karty i kodu przy drzwiach wejściowych'],
  network: ['/images/foto/szafka-rejestrator', 'Szafka na ścianie z rejestratorem nagrań i uporządkowanymi kablami'],
};

// Three things we install for the entrance and cameras, each with "what exactly"
export const TeletechnicsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(TELETECHNIC_SERVICES[0].id);

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-white border-gray-200 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.2] text-gray-900">
            Kamery, wideodomofon i kable do nich. Wszystko działa u Ciebie w domu.
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-prose text-gray-600">
            Zaczynamy od podstaw: dobre kable, metalowa szafka na sprzęt i wideodomofon. Nagrania zostają u Ciebie, bez abonamentu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {TELETECHNIC_SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? KeyRound;
            const open = openId === service.id;
            return (
              <article key={service.id} className={`rounded-[2px] p-6 border ${open ? 'bg-white border-petrol-700 ring-1 ring-petrol-700' : 'bg-gray-50 border-gray-200'}`}>
                {PHOTOS[service.id] && (
                  <div className="-mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden bg-gray-200">
                    <Photo
                      id={PHOTOS[service.id][0]}
                      alt={PHOTOS[service.id][1]}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-[2px] flex items-center justify-center shrink-0 border bg-petrol-50 border-petrol-100">
                    <Icon className="w-5 h-5 text-petrol-700" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-gray-900">{service.title}</h3>
                    <p className="text-sm mt-1 text-amber-800">{service.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-700">{service.humanExplanation}</p>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? '' : service.id)}
                  aria-expanded={open}
                  aria-controls={`tele-${service.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
                >
                  <span>{open ? 'Mniej szczegółów' : 'Co dokładnie montujemy'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <div id={`tele-${service.id}`} hidden={!open} className="animate-fade-in mt-3 pt-4 border-t border-gray-200">
                    <p className="text-base leading-relaxed text-gray-600">{service.description}</p>
                    <ul className="mt-4 space-y-2">
                      {service.equipment.map((item) => (
                        <li key={item} className="text-base flex items-start gap-2.5 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-petrol-700 mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
