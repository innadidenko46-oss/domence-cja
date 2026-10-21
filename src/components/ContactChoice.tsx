import React from 'react';
import { Phone, Mail } from 'lucide-react';
import type { ContactBy } from '../lib/enquiryDraft.ts';

// Lets the visitor ask for e-mail only: some people would rather not talk on the phone.
export const contactByLine = (by: ContactBy) => (by === 'email' ? 'TYLKO E-MAIL (proszę nie dzwonić)' : 'telefon');

const OPTIONS: { value: ContactBy; label: string; icon: typeof Phone }[] = [
  { value: 'phone', label: 'Zadzwońcie', icon: Phone },
  { value: 'email', label: 'Tylko e-mail', icon: Mail },
];

export const ContactChoice: React.FC<{
  value: ContactBy;
  onChange: (v: ContactBy) => void;
  idPrefix: string;
}> = ({ value, onChange, idPrefix }) => (
  <fieldset>
    <legend className="block text-sm font-semibold mb-2 text-gray-800">Wolisz telefon czy e-mail?</legend>
    <div className="grid grid-cols-2 gap-2">
      {OPTIONS.map(({ value: v, label, icon: Icon }) => {
        const checked = value === v;
        return (
          <label
            key={v}
            className={`flex items-center gap-2.5 min-h-11 px-3 py-2 rounded-[2px] border cursor-pointer text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-petrol-600 has-[:focus-visible]:ring-offset-2 ${
              checked ? 'border-petrol-700 bg-petrol-50 text-gray-900 font-semibold' : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              id={`${idPrefix}-contact-${v}`}
              name={`${idPrefix}-contact-by`}
              value={v}
              checked={checked}
              onChange={() => onChange(v)}
              className="accent-petrol-700 w-4 h-4 shrink-0"
            />
            <Icon className="w-4 h-4 text-petrol-700 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
    {/* Always in the page, so screen readers announce the text when it appears */}
    <p className="mt-2 text-sm text-gray-600 empty:mt-0" aria-live="polite">
      {value === 'email' ? 'Nie zadzwonimy. Pytania i\u00A0propozycję wyślemy na e-mail.' : ''}
    </p>
  </fieldset>
);
