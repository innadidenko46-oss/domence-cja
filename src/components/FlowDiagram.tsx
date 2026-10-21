import React from 'react';
import { DeviceArt, DeviceKind } from './DeviceArt.tsx';

export interface FlowStep {
  kind: DeviceKind;
  title: string;
  text: string;
}

// "How it works" on a dark petrol band: the devices in order, joined by a line with the
// amber light travelling along it (CSS only, still under reduced motion). The steps are a
// real ordered list, so the diagram reads the same without the drawings.
export const FlowDiagram: React.FC<{ title: string; intro?: string; steps: FlowStep[]; note?: string }> = ({ title, intro, steps, note }) => (
  <section className="pt-16 pb-20 lg:pt-24 lg:pb-24 bg-petrol-900 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
        {intro && <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-200">{intro}</p>}
      </div>

      <div className="relative mt-12">
        {/* The connecting line, behind the drawings: across on wide screens, down on phones */}
        <span aria-hidden="true" className="flow-line absolute border-dashed border-white/30 left-[3.25rem] top-6 bottom-6 border-l-2 md:left-[12%] md:right-[12%] md:top-[4.5rem] md:bottom-auto md:border-l-0 md:border-t-2" />
        <ol
          role="list"
          className={`relative grid grid-cols-1 gap-10 ${steps.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} md:gap-6`}
        >
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-4 md:text-center">
              <span className="relative z-10 shrink-0 w-[6.5rem] h-[6.5rem] md:w-36 md:h-36 rounded-[2px] bg-petrol-950 border border-white/15 flex items-center justify-center">
                <DeviceArt kind={step.kind} tone="dark" className="w-20 h-20 md:w-28 md:h-28" />
                <span className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-[2px] bg-amber-400 text-petrol-950 font-display text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </span>
              <div className="md:max-w-[16rem]">
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-gray-200">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {note && <p className="mt-10 pt-6 border-t border-white/15 text-base text-gray-200 max-w-3xl">{note}</p>}
    </div>
  </section>
);
