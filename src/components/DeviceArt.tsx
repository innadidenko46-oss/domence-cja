import React from 'react';

// Line drawings of the devices we install, in the logo's language: petrol lines and the
// amber "on" light. Decorative (aria-hidden): the text next to them says what they are.
// `tone="dark"` draws them in white for petrol bands.

export type DeviceKind =
  | 'camera'
  | 'camera-light'
  | 'camera-wide'
  | 'gate-panel'
  | 'face-reader'
  | 'screen'
  | 'cabinet'
  | 'phone'
  | 'leak-sensor'
  | 'valve'
  | 'switch'
  | 'switchboard';

const AMBER = 'var(--color-amber-500)';

const DRAWINGS: Record<DeviceKind, (fill: string) => React.ReactNode> = {
  camera: (fill) => (
    <>
      <path d="M17 52 L4 96 M17 52 L44 98" strokeDasharray="3 5" opacity="0.45" />
      <rect x="92" y="28" width="12" height="32" rx="2" fill={fill} />
      <path d="M92 44 H80" />
      <rect x="16" y="30" width="66" height="28" rx="5" fill={fill} />
      <path d="M22 30 V24 H86 V30" />
      <circle cx="27" cy="44" r="9" fill={fill} />
      <circle cx="27" cy="44" r="3.5" />
      <circle cx="72" cy="38" r="2.6" fill={AMBER} stroke="none" />
    </>
  ),
  'camera-light': (fill) => (
    <>
      <rect x="92" y="22" width="12" height="28" rx="2" fill={fill} />
      <path d="M92 36 H80" />
      <rect x="16" y="24" width="66" height="26" rx="5" fill={fill} />
      <circle cx="27" cy="37" r="8" fill={fill} />
      <circle cx="27" cy="37" r="3" />
      <rect x="40" y="64" width="40" height="12" rx="2" fill={fill} />
      <path d="M44 76 H76" stroke={AMBER} strokeWidth="4" />
      <path d="M38 88 L30 102 M60 90 V106 M82 88 L90 102" stroke={AMBER} strokeWidth="3" />
      <path d="M66 58 H72 M66 54 H76" opacity="0.5" />
    </>
  ),
  'camera-wide': (fill) => (
    <>
      <path d="M14 70 A46 46 0 0 0 106 70" strokeDasharray="3 5" opacity="0.45" />
      <rect x="22" y="30" width="76" height="10" rx="2" fill={fill} />
      <path d="M32 40 A28 28 0 0 0 88 40 Z" fill={fill} />
      <circle cx="60" cy="52" r="8" fill={fill} />
      <circle cx="60" cy="52" r="3" />
      <circle cx="84" cy="35" r="2.4" fill={AMBER} stroke="none" />
    </>
  ),
  'gate-panel': (fill) => (
    <>
      <rect x="38" y="12" width="44" height="96" rx="4" fill={fill} />
      <circle cx="60" cy="30" r="7" fill={fill} />
      <circle cx="60" cy="30" r="2.5" />
      <path d="M48 50 H72 M48 56 H72 M48 62 H72" opacity="0.6" />
      <circle cx="60" cy="86" r="9" fill={fill} />
      <circle cx="60" cy="86" r="9" stroke={AMBER} strokeWidth="3" fill="none" />
    </>
  ),
  'face-reader': (fill) => (
    <>
      <rect x="34" y="10" width="52" height="100" rx="4" fill={fill} />
      <circle cx="60" cy="22" r="3.5" />
      <rect x="42" y="32" width="36" height="46" rx="2" fill={fill} />
      <circle cx="60" cy="50" r="8" />
      <path d="M47 76 C49 66 71 66 73 76" />
      <path d="M44 40 V34 H50 M70 34 H76 V40 M76 70 V76 H70 M50 76 H44 V70" stroke={AMBER} strokeWidth="3" />
      <path d="M50 94 H70" stroke={AMBER} strokeWidth="4" />
    </>
  ),
  screen: (fill) => (
    <>
      <rect x="8" y="24" width="104" height="66" rx="4" fill={fill} />
      <rect x="16" y="30" width="88" height="44" rx="2" fill={fill} />
      <path d="M30 74 V46 M50 74 V46 M30 52 H50 M30 60 H50 M70 74 V46 M90 74 V46 M70 52 H90 M70 60 H90" opacity="0.7" />
      <circle cx="96" cy="38" r="3" fill={AMBER} stroke="none" />
      <path d="M44 82 H48 M58 82 H62 M72 82 H76" />
    </>
  ),
  cabinet: (fill) => (
    <>
      <rect x="20" y="12" width="80" height="96" rx="2" fill={fill} />
      <rect x="28" y="20" width="64" height="80" rx="1" opacity="0.5" />
      <rect x="32" y="30" width="56" height="14" rx="1" fill={fill} />
      <path d="M38 37 H40 M44 37 H46 M50 37 H52 M56 37 H58 M62 37 H64 M68 37 H70" strokeWidth="2.5" />
      <rect x="32" y="54" width="56" height="16" rx="1" fill={fill} />
      <circle cx="80" cy="62" r="2.6" fill={AMBER} stroke="none" />
      <path d="M38 62 H62" opacity="0.6" />
      <rect x="40" y="80" width="40" height="12" rx="1" fill={fill} />
      <circle cx="74" cy="86" r="2" />
    </>
  ),
  phone: (fill) => (
    <>
      <rect x="38" y="8" width="44" height="104" rx="7" fill={fill} />
      <rect x="44" y="20" width="32" height="56" rx="2" fill={fill} />
      <path d="M48 66 L60 54 L72 66 M52 62 V72 H68 V62" />
      <circle cx="72" cy="28" r="3.5" fill={AMBER} stroke="none" />
      <path d="M48 86 H72 M48 94 H64" opacity="0.6" />
    </>
  ),
  'leak-sensor': (fill) => (
    <>
      <path d="M14 92 H106" opacity="0.5" />
      <ellipse cx="60" cy="80" rx="30" ry="10" fill={fill} />
      <path d="M30 80 V72 A30 10 0 0 1 90 72 V80" fill={fill} />
      <circle cx="78" cy="74" r="2.6" fill={AMBER} stroke="none" />
      <path d="M58 22 C50 34 46 40 46 46 A12 12 0 0 0 70 46 C70 40 66 34 58 22 Z" fill={fill} />
      <path d="M22 98 C26 94 30 94 34 98 M86 98 C90 94 94 94 98 98" opacity="0.6" />
    </>
  ),
  valve: (fill) => (
    <>
      <rect x="6" y="70" width="108" height="16" rx="2" fill={fill} />
      <rect x="48" y="62" width="24" height="32" rx="2" fill={fill} />
      <rect x="40" y="22" width="40" height="34" rx="3" fill={fill} />
      <path d="M60 56 V62" />
      <circle cx="70" cy="32" r="3" fill={AMBER} stroke="none" />
      <path d="M50 44 A12 12 0 1 1 64 50" />
      <path d="M64 50 L60 46 M64 50 L59 53" />
    </>
  ),
  switch: (fill) => (
    <>
      <rect x="22" y="20" width="76" height="80" rx="3" fill={fill} />
      <rect x="32" y="30" width="24" height="60" rx="2" fill={fill} />
      <rect x="64" y="30" width="24" height="60" rx="2" fill={fill} />
      <path d="M38 44 H50 M70 44 H82" opacity="0.6" />
      <circle cx="44" cy="80" r="2.6" fill={AMBER} stroke="none" />
      <circle cx="76" cy="80" r="2.2" />
    </>
  ),
  switchboard: (fill) => (
    <>
      <rect x="12" y="14" width="96" height="92" rx="2" fill={fill} />
      <path d="M20 40 H100 M20 76 H100" opacity="0.5" />
      {[24, 36, 48, 60, 72, 84].map((x, i) => (
        <g key={x}>
          <rect x={x} y="30" width="10" height="22" rx="1" fill={fill} />
          {i % 2 === 0 && <circle cx={x + 5} cy="35" r="1.8" fill={AMBER} stroke="none" />}
          <rect x={x} y="66" width="10" height="22" rx="1" fill={fill} />
        </g>
      ))}
    </>
  ),
};

export const DeviceArt: React.FC<{ kind: DeviceKind; tone?: 'light' | 'dark'; className?: string }> = ({
  kind,
  tone = 'light',
  className,
}) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    aria-hidden="true"
    fill="none"
    stroke={tone === 'dark' ? '#FFFFFF' : 'var(--color-petrol-800)'}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {DRAWINGS[kind](tone === 'dark' ? 'rgb(255 255 255 / 0.08)' : 'var(--color-petrol-50)')}
  </svg>
);
