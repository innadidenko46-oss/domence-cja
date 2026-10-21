import React from 'react';

// The O from the DOMENCE logo, drawn as a quarter ring from the corner of the hero photo,
// with the amber status light set into it.
// Decorative only: hidden from assistive tech, drawn in by CSS (.arc-draw), static under reduced motion.
const R = 84;
const STROKE = 9;
const LIGHT_R = 5; // about 1.1× the stroke, as in the logo
const GAP_DEG = 8; // half of the gap cut around the light

const point = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(R * Math.cos(a)).toFixed(2)} ${(R * Math.sin(a)).toFixed(2)}`;
};

const SEGMENTS = [
  `M ${point(0)} A ${R} ${R} 0 0 1 ${point(45 - GAP_DEG)}`,
  `M ${point(45 + GAP_DEG)} A ${R} ${R} 0 0 1 ${point(90)}`,
];

export const BrandArcs: React.FC<{ className?: string }> = ({ className }) => {
  const light = (R * Math.SQRT1_2).toFixed(2);
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" fill="none">
      {SEGMENTS.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className="arc-draw"
          style={{ animationDelay: `${400 + i * 300}ms` }}
          stroke="var(--color-petrol-900)"
          strokeWidth={STROKE}
        />
      ))}
      <circle cx={light} cy={light} r={LIGHT_R} fill="var(--color-amber-500)" />
    </svg>
  );
};
