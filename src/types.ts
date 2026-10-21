/** House stage, asked on step 2 of the enquiry: in construction or renovation, or finished */
export type PropertyState = 'deweloperski' | 'retro';

/** What the visitor wants: the first question of the enquiry */
export type Interest = 'dom' | 'kamery' | 'oba';

export type AreaRange = 'do_60' | '61_110' | '111_180' | 'ponad_180';

export interface LifeScenario {
  id: string;
  number: string;
  title: string;
  tag: string;
  trigger?: string;
  description: string;
  humanNote: string;
  detailPoints: string[];
  actionSteps?: {
    icon: string;
    label: string;
    detail: string;
  }[];
  /** Unsplash photo id */
  image: string;
  icon: string;
}

export interface Capability {
  id: string;
  title: string;
  badge: string;
  description: string;
  /** In the switchboard, for a new house */
  inSwitchboard: string;
  /** Behind the switches, for a finished flat */
  behindSwitches: string;
  example: string;
  features: string[];
}

export interface CameraProduct {
  id: string;
  name: string;
  category: 'cctv_color' | 'cctv_deter' | 'cctv_wide' | 'intercom_panel' | 'intercom_face' | 'intercom_screen';
  tagline: string;
  bestUse: string;
  highlights: string[];
}

export interface TeletechnicService {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  humanExplanation: string;
  equipment: string[];
}

export interface FaqItem {
  question: string;
  simpleAnswer: string;
  technicalDetails: string;
  category: 'dzialanie' | 'koszty' | 'bezpieczenstwo' | 'remont';
  /** Also shown in the short list on the home page */
  onHome?: boolean;
}
