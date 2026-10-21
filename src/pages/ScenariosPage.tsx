import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';
import { ScenariosSection } from '../components/ScenariosSection.tsx';
import { ArrowRight } from 'lucide-react';
import { CTA } from '../config/site.ts';

const IF_SOMETHING_STOPS = [
  ['Włączniki działają zawsze', 'Światło i rolety obsłużysz zwykłym włącznikiem, także gdy telefon się rozładuje albo zniknie internet.'],
  ['Bez internetu dom robi swoje', 'Harmonogramy, sceny i czujniki działają w domu. Internet jest potrzebny tylko do sterowania z daleka.'],
  ['Po przerwie w prądzie', 'Gdy prąd wraca, wszystko samo się uruchamia, a światła nie zapalają się w środku nocy.'],
];

export const ScenariosPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-900">
    <PageHeader
      badge="Scenariusze"
      title="Dom, który robi część rzeczy za Ciebie"
      description="Światło, rolety i ogrzewanie działają same. Sterujesz zwykłym włącznikiem albo telefonem. Gdy pęknie wężyk, zawór sam zakręca wodę."
      image="photo-1600585154526-990dced4db0d"
    />

    <ScenariosSection />

    {/* What happens when something stops working */}
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 border-t bg-gray-100 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <h2 className="lg:col-span-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Co, jeśli coś przestanie działać?</h2>
        <dl className="lg:col-span-8 grid sm:grid-cols-3 gap-x-8 gap-y-8">
          {IF_SOMETHING_STOPS.map(([title, text]) => (
            <div key={title} className="border-t-2 border-petrol-700 pt-4">
              <dt className="font-display text-lg font-bold text-gray-900">{title}</dt>
              <dd className="mt-2 text-base leading-relaxed text-gray-600">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <section className="py-14 lg:py-16 bg-petrol-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Które z tych rzeczy chcesz u siebie?</h2>
          <p className="mt-2 text-base text-gray-200 max-w-xl">
            Napisz w zapytaniu albo zobacz najpierw, od czego zwykle zaczynamy w nowym domu i w gotowym mieszkaniu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/zapytanie"
            className="btn-accent focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-petrol-900"
          >
            {CTA.label}
          </Link>
          <Link
            to="/jak-zaczac"
            className="btn-on-dark focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>Jak zacząć</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);
