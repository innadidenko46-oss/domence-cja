import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, X } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content.ts';

const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'dzialanie', label: 'Jak to działa' },
  { id: 'koszty', label: 'Koszty' },
  { id: 'bezpieczenstwo', label: 'Bezpieczeństwo' },
  { id: 'remont', label: 'Montaż i remont' },
];

export const FaqSection: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  // Buttons that clear the search disappear when clicked: focus goes back to the search box
  const searchRef = useRef<HTMLInputElement>(null);
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].question]);

  // Copy uses non-breaking spaces after one-letter words; the visitor types plain ones
  const needle = query.trim().toLowerCase().replace(/\s+/g, ' ');
  const items = FAQ_ITEMS.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (!needle || `${item.question} ${item.simpleAnswer} ${item.technicalDetails}`.replace(/\u00a0/g, ' ').toLowerCase().includes(needle)),
  );

  const toggle = (id: string) => setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  return (
    <section className="pt-12 pb-20 lg:pt-16 lg:pb-24 bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Search and filters stay in view while reading */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <label htmlFor="faq-search" className="block mb-2 text-sm font-semibold text-gray-800">
            Szukaj w pytaniach
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="faq-search"
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="np. internet, abonament, kucie"
              className="w-full min-h-11 pl-10 pr-12 rounded-[2px] text-base border bg-white border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-petrol-700 focus:outline-2 focus:outline-offset-0 focus:outline-petrol-600"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  searchRef.current?.focus();
                }}
                aria-label="Wyczyść wyszukiwanie"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-[2px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Kategorie pytań">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={`min-h-11 px-4 rounded-[2px] text-sm font-semibold transition-colors cursor-pointer border focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2 ${
                  category === cat.id ? 'bg-petrol-700 text-white border-petrol-700' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="text-sm text-gray-600 mb-3 tabular-nums" aria-live="polite">
            {items.length === 1 ? '1 pytanie' : `Pytań: ${items.length}`}
          </p>

          {items.length === 0 ? (
            <div className="border-y border-gray-300 py-12">
              <h2 className="font-display text-lg font-bold text-gray-900">Nie mamy jeszcze takiego pytania</h2>
              <p className="mt-2 text-base leading-relaxed text-gray-600 max-w-prose">
                Spróbuj innego słowa albo zadaj je w{'\u00a0'}
                <Link to="/zapytanie" className="font-semibold text-petrol-700 underline underline-offset-2">
                  zapytaniu
                </Link>
                : odpowie inżynier.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                  searchRef.current?.focus();
                }}
                className="mt-5 min-h-11 text-sm font-semibold text-petrol-700 hover:text-amber-800 underline underline-offset-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600"
              >
                Pokaż wszystkie pytania
              </button>
            </div>
          ) : (
            <ul className="border-y border-gray-300 divide-y divide-gray-300">
              {items.map((item, index) => {
                const open = openIds.includes(item.question);
                return (
                  <li key={item.question}>
                    <h2>
                      <button
                        type="button"
                        onClick={() => toggle(item.question)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${index}`}
                        className="group w-full text-left py-5 flex items-start justify-between gap-6 cursor-pointer focus-visible:ring-2 focus-visible:ring-petrol-600 focus-visible:ring-offset-2"
                      >
                        <span className={`font-display text-base sm:text-lg font-bold ${open ? 'text-amber-800' : 'text-gray-900 group-hover:text-amber-800'}`}>
                          {item.question}
                        </span>
                        <ChevronDown className={`w-5 h-5 mt-0.5 shrink-0 text-gray-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                    </h2>
                    <div id={`faq-panel-${index}`} hidden={!open} className="animate-fade-in pb-7 grid gap-4 max-w-[38rem]">
                      <p className="text-base leading-relaxed text-gray-800">{item.simpleAnswer}</p>
                      <div className="pl-4 border-l-2 border-amber-500/60">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Więcej szczegółów</p>
                        <p className="text-sm leading-relaxed text-gray-600">{item.technicalDetails}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
