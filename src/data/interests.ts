import { Home, Video, Layers } from 'lucide-react';
import { Interest } from '../types.ts';

// First question everywhere: what the visitor wants. The house stage comes next, on step 2.
export const INTEREST_OPTIONS: {
  value: Interest;
  title: string;
  sub: string;
  icon: typeof Home;
  /** Page that explains it */
  path: string;
  /** Link text to that page: says where it goes, not just "więcej" */
  more: string;
  /** Photo for the home page card: Unsplash id or '/images/foto/<name>' */
  image: string;
  imageAlt: string;
}[] = [
  {
    value: 'dom',
    title: 'Inteligentny dom',
    sub: 'Światło, rolety, ogrzewanie i ochrona przed zalaniem.',
    icon: Home,
    path: '/systemy',
    more: 'Więcej o inteligentnym domu',
    image: 'photo-1584622781564-1d987f7333c1',
    imageAlt: 'Salon z roletami na oknach i kominkiem',
  },
  {
    value: 'kamery',
    title: 'Kamery i wideodomofon',
    sub: 'Obraz z kamer w telefonie, rozmowa z furtki i wejście bez kluczy.',
    icon: Video,
    path: '/teletechnika',
    more: 'Więcej o kamerach i wideodomofonie',
    image: '/images/foto/kamera-elewacja',
    imageAlt: 'Kamera na elewacji domu wieczorem, obok lampa nad podjazdem',
  },
  {
    value: 'oba',
    title: 'Jedno i drugie',
    sub: 'Wszystko w jednym planie, od jednej firmy.',
    icon: Layers,
    path: '/scenariusze',
    more: 'Zobacz przykłady z życia',
    image: '/images/foto/wideodomofon-furtka',
    imageAlt: 'Wideodomofon przy furtce, a za nią dom z zapalonym światłem w oknach',
  },
];
