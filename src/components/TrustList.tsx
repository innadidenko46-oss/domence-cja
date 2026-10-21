import React from 'react';
import { CheckCircle2, FileText, Home, MapPin } from 'lucide-react';

// The four facts that lower the risk of writing to a new company. Shown under the main
// button on the home page and on the search landing pages.
const TRUST = [
  { icon: Home, text: 'Bezpłatne sprawdzenie domu' },
  { icon: FileText, text: 'Plan i cena na piśmie' },
  { icon: CheckCircle2, text: 'Bez abonamentu' },
  { icon: MapPin, text: 'Warszawa i okolice' },
];

export const TrustList: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul role="list" className={`grid grid-cols-2 gap-x-4 gap-y-3 text-base text-gray-700 ${className}`}>
    {TRUST.map(({ icon: Icon, text }) => (
      <li key={text} className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-petrol-700 shrink-0" aria-hidden="true" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);
