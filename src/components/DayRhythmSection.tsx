import React from 'react';
import { Check } from 'lucide-react';
import { Photo } from './Photo.tsx';

// How light and blinds follow the day, in plain words and only with what we install
const SCENES = [
  {
    id: 'day',
    time: 'W ciągu dnia',
    title: 'Jasno, ale bez przegrzewania',
    description: 'W upalne popołudnie rolety od strony słońca opuszczają się same do połowy. Pokój zostaje jasny, a słońce mniej go nagrzewa.',
    image: 'photo-1600210492486-724fe5c67fb0',
    alt: 'Jasny salon z dużymi oknami w ciągu dnia',
    features: ['Rolety według pory dnia', 'Neutralne światło do pracy i czytania', 'Chłodniejsze pokoje latem'],
  },
  {
    id: 'dusk',
    time: 'O zmierzchu',
    title: 'Spokojne przejście w wieczór',
    description: 'Gdy słońce zachodzi, rolety same się zamykają, a światło robi się cieplejsze i łagodniejsze. Lampy przy wejściu zapalają się same.',
    image: 'photo-1600585154340-be6161a56a0c',
    alt: 'Dom o zmierzchu ze światłem w oknach i przy wejściu',
    features: ['Rolety zamykają się o zmierzchu', 'Ciepła barwa światła, która mniej męczy wzrok', 'Światło przy wejściu i w korytarzu'],
  },
  {
    id: 'night',
    time: 'W nocy',
    title: 'Droga do łazienki bez oślepiania',
    description: 'Wstajesz w nocy? Czujnik ruchu włącza tylko słabe światło przy podłodze, które po chwili samo gaśnie.',
    image: 'photo-1617104678098-de229db51175',
    alt: 'Sypialnia z zapalonymi lampkami przy łóżku',
    features: ['Słabe światło przy podłodze', 'Gaśnie samo po chwili', 'Działa tylko w godzinach, które ustawisz'],
  },
];

export const DayRhythmSection: React.FC = () => (
  <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-gray-100 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Światło, które dopasowuje się do pory dnia</h2>
        <p className="mt-3 text-base leading-relaxed text-gray-600">Bez klikania w telefon: dom sam wie, która jest godzina.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SCENES.map((scene) => (
          <article key={scene.id} className="rounded-[2px] border border-gray-200 bg-white overflow-hidden flex flex-col">
            <div className="h-44 bg-gray-200">
              <Photo id={scene.image} alt={scene.alt} widths={[400, 700]} sizes="(min-width: 768px) 33vw, 100vw" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm text-amber-800 font-semibold">{scene.time}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-gray-900 leading-snug">{scene.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">{scene.description}</p>
              <ul className="mt-4 space-y-2">
                {scene.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-base text-gray-700">
                    <Check className="w-4 h-4 text-petrol-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
