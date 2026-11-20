import { Award, BookOpen, Calculator, ChartNoAxesCombined, ClipboardList, IdCard, Map, type LucideIcon } from 'lucide-react';

type Screenshot = { light: string; dark?: string; alt: string; landscape?: boolean };
type Feature = { icon: LucideIcon; title: string; description: string; screen?: Screenshot };

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
  features: Feature[];
};

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
  preview: [
    { light: '/images/rhumbnav-nav-active.jpeg', alt: 'RhumbNav Active Navigation' },
    { light: '/images/rhumbnav-fpl.jpeg', alt: 'RhumbNav Flight Plan' },
  ],
  features: [
    {
      icon: Map,
      title: 'Built for confident flying',
      description: 'Purpose-built VFR navigation for pilots who value clarity in the cockpit. Plan smarter, stay oriented, and fly with greater confidence. All your credentials and documents seamlessly integrated.',
      screen: { light: '/images/rhumbnav-nav.jpeg', alt: 'Confident Flying Interface', landscape: true },
    },
    {
      icon: BookOpen,
      title: 'A better logbook',
      description: 'A smarter way to track your flying life. Keep flight time, landings, approaches, and records organized in a logbook built for modern aviation.',
      screen: { light: '/images/rhumbnav-all-flights.jpeg', alt: 'Logbook Phone' },
    },
    {
      icon: Calculator,
      title: 'Precision calculation',
      description: 'Flight calculations made faster, cleaner, and easier. From wind correction to fuel planning, RhumbNav gives you the numbers that matter—without the clutter.',
      screen: { light: '/images/rhumbnav-computer.jpeg', alt: 'Precision Calculation' },
    },
    {
      icon: IdCard,
      title: 'Licenses and certificates, simplified',
      description: 'Carry your pilot licenses, medical certificates, and official documents directly on your device. Easily track expiration dates and always stay compliant, wherever you fly.',
      screen: { light: '/images/rhumbnav-license.jpeg', alt: 'Licenses Interface' },
    },
  ],
};

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
  preview: [
    { light: '/images/pogo-summary-light.jpg', dark: '/images/pogo-summary-dark.jpg', alt: 'Pogo progress summary' },
    { light: '/images/pogo-session-detail-light.jpg', dark: '/images/pogo-session-detail-dark.jpg', alt: 'Pogo session details' },
  ],
  features: [
    {
      icon: ClipboardList,
      title: 'Log every session',
      description: 'Log your bouldering sessions, attempts, completed problems, grades, climbing time, and personal notes. Pogo keeps your history organized to make your progression tangible.',
      screen: { light: '/images/pogo-active-session-light.jpg', dark: '/images/pogo-active-session-dark.jpg', alt: 'Pogo active climbing session' },
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
      screen: { light: '/images/pogo-history-light.jpg', dark: '/images/pogo-history-dark.jpg', alt: 'Pogo session history' },
    },
    {
      icon: Award,
      title: 'Unlock Achievements',
      description: 'Push your limits and unlock achievements. Log boulder, route, or mixed sessions with a scale adapted to where you climb and earn milestone badges.',
      screen: { light: '/images/pogo-achievements-light.jpg', dark: '/images/pogo-achievements-dark.jpg', alt: 'Pogo achievements' },
    },
  ],
};

export const products = [rhumbNav, pogo];
