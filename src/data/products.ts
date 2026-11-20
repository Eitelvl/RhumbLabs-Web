import { Award, BookOpen, Calculator, ChartNoAxesCombined, ClipboardList, IdCard, Map, type LucideIcon } from 'lucide-react';

export type Screenshot = { light: string; dark?: string; alt: string };
export type ScreenshotGallery = [Screenshot, Screenshot, ...Screenshot[]];
type Feature = { icon: LucideIcon; title: string; description: string };

export type Product = {
  name: string;
  route: '/rhumbnav' | '/pogo';
  category: string;
  icon: string;
  summary: string;
  tagline: string;
  overview: string;
  highlights: string[];
  action: string;
  headline: string;
  description: string;
  preview: [Screenshot, Screenshot];
  heroPreview?: [Screenshot, Screenshot, Screenshot];
  features: Feature[];
  gallery: ScreenshotGallery;
};

const rhumbNavScreenshots: ScreenshotGallery = [
  { light: '/images/rhumbnav/screenshots/01-santiago-aeronautical-map.webp', alt: 'Santiago aeronautical map' },
  { light: '/images/rhumbnav/screenshots/02-scel-weather.webp', alt: 'SCEL airport weather' },
  { light: '/images/rhumbnav/screenshots/03-scel-airport-info.webp', alt: 'SCEL airport information' },
  { light: '/images/rhumbnav/screenshots/04-aircraft-checklists.webp', alt: 'Aircraft checklists' },
  { light: '/images/rhumbnav/screenshots/05-sctb-navigation-log.webp', alt: 'SCTB navigation log' },
  { light: '/images/rhumbnav/screenshots/06-valparaiso-santiago-route.webp', alt: 'Valparaíso–Santiago route map' },
  { light: '/images/rhumbnav/screenshots/07-e6b-flight-computer.webp', alt: 'E6B flight computer' },
  { light: '/images/rhumbnav/screenshots/08-holding-pattern.webp', alt: 'Holding pattern' },
  { light: '/images/rhumbnav/screenshots/09-licenses-and-ratings.webp', alt: 'Licenses and ratings' },
  { light: '/images/rhumbnav/screenshots/10-flight-logbook.webp', alt: 'Flight logbook' },
  { light: '/images/rhumbnav/screenshots/11-flight-list.webp', alt: 'Flight list' },
  { light: '/images/rhumbnav/screenshots/12-weight-and-balance-load.webp', alt: 'Weight and balance load details' },
  { light: '/images/rhumbnav/screenshots/13-weight-and-balance-cg-envelope.webp', alt: 'Weight and balance CG envelope' },
];

export const rhumbNav: Product = {
  name: 'RhumbNav',
  route: '/rhumbnav',
  category: 'Aviation',
  icon: '/images/rhumbnav-app-icon.png',
  summary: 'Flight planning, VFR navigation, and a digital logbook.',
  tagline: 'Aviation precision in your pocket.',
  overview: 'The all-in-one flight planning, navigation, and logbook platform designed exclusively for modern pilots. Beautifully complex, incredibly simple to use.',
  highlights: ['Complete VFR Navigation', 'Digital Logbook & Pilot Credentials', 'Real-time Weather & Airport Info', 'Advanced E6B Flight Computer'],
  action: 'Discover RhumbNav',
  headline: 'Plan and navigate with clarity.',
  description: 'RhumbNav is a new light EFB shaped by real flight experience, bringing flight planning, navigation, and in-flight awareness into one seamless experience.',
  preview: [rhumbNavScreenshots[0], rhumbNavScreenshots[5]],
  heroPreview: [rhumbNavScreenshots[0], rhumbNavScreenshots[5], rhumbNavScreenshots[9]],
  gallery: rhumbNavScreenshots,
  features: [
    {
      icon: Map,
      title: 'Built for confident flying',
      description: 'Purpose-built VFR navigation for pilots who value clarity in the cockpit. Plan smarter, stay oriented, and fly with greater confidence. All your credentials and documents seamlessly integrated.',
    },
    {
      icon: BookOpen,
      title: 'A better logbook',
      description: 'A smarter way to track your flying life. Keep flight time, landings, approaches, and records organized in a logbook built for modern aviation.',
    },
    {
      icon: Calculator,
      title: 'Precision calculation',
      description: 'Flight calculations made faster, cleaner, and easier. From wind correction to fuel planning, RhumbNav gives you the numbers that matter—without the clutter.',
    },
    {
      icon: IdCard,
      title: 'Licenses and certificates, simplified',
      description: 'Carry your pilot licenses, medical certificates, and official documents directly on your device. Easily track expiration dates and always stay compliant, wherever you fly.',
    },
  ],
};

const pogoScreenshots: ScreenshotGallery = [
  { light: '/images/pogo/screenshots/01-summary-light.webp', dark: '/images/pogo/screenshots/01-summary-dark.webp', alt: 'Summary' },
  { light: '/images/pogo/screenshots/02-history-light.webp', dark: '/images/pogo/screenshots/02-history-dark.webp', alt: 'Session history' },
  { light: '/images/pogo/screenshots/03-activity-week-light.webp', dark: '/images/pogo/screenshots/03-activity-week-dark.webp', alt: 'Weekly activity' },
  { light: '/images/pogo/screenshots/04-activity-month-light.webp', dark: '/images/pogo/screenshots/04-activity-month-dark.webp', alt: 'Monthly activity' },
  { light: '/images/pogo/screenshots/05-gyms-light.webp', dark: '/images/pogo/screenshots/05-gyms-dark.webp', alt: 'Gyms' },
  { light: '/images/pogo/screenshots/06-gym-detail-light.webp', dark: '/images/pogo/screenshots/06-gym-detail-dark.webp', alt: 'Gym details' },
  { light: '/images/pogo/screenshots/07-session-detail-light.webp', dark: '/images/pogo/screenshots/07-session-detail-dark.webp', alt: 'Session details' },
  { light: '/images/pogo/screenshots/08-profile-light.webp', dark: '/images/pogo/screenshots/08-profile-dark.webp', alt: 'Profile' },
  { light: '/images/pogo/screenshots/09-profile-progress-light.webp', dark: '/images/pogo/screenshots/09-profile-progress-dark.webp', alt: 'Profile progress' },
  { light: '/images/pogo/screenshots/10-achievements-light.webp', dark: '/images/pogo/screenshots/10-achievements-dark.webp', alt: 'Achievements' },
];

export const pogo: Product = {
  name: 'Pogo',
  route: '/pogo',
  category: 'Climbing',
  icon: '/images/pogo-app-icon.png',
  summary: 'Log your bouldering sessions and track your progress.',
  tagline: 'Climb higher, track smarter.',
  overview: 'Log your bouldering sessions, visualize your progress over time, and stay motivated. Built specifically for the climbing community.',
  highlights: ['Track Grades', 'Performance Analytics', 'Unlock Achievements', 'Session Logging'],
  action: 'Explore Pogo',
  headline: 'Every session counts.',
  description: 'Designed exclusively for the climbing community. Log your sessions, analyze your progress, and stay motivated with a digital companion built for the wall.',
  preview: [pogoScreenshots[0], pogoScreenshots[6]],
  heroPreview: [pogoScreenshots[0], pogoScreenshots[6], pogoScreenshots[1]],
  gallery: pogoScreenshots,
  features: [
    {
      icon: ClipboardList,
      title: 'Log every session',
      description: 'Log your bouldering sessions, attempts, completed problems, grades, climbing time, and personal notes. Pogo keeps your history organized to make your progression tangible.',
    },
    {
      icon: ChartNoAxesCombined,
      title: 'Clear Progression',
      description: 'Turn your data into powerful, visual graphs. Track your activity and improve over time.',
    },
    {
      icon: BookOpen,
      title: 'Complete History',
      description: 'Navigate and review your climbing records. Explore previous logs and see how you have excelled over sessions.',
    },
    {
      icon: Award,
      title: 'Unlock Achievements',
      description: 'Push your limits and unlock achievements. Log boulder, route, or mixed sessions with a scale adapted to where you climb and earn milestone badges.',
    },
  ],
};

export const products = [rhumbNav, pogo];
