import { BookOpen, Calculator, ChartNoAxesCombined, ClipboardList, Map, Users, type LucideIcon } from 'lucide-react';

type Screenshot = { alt: string; light: string; dark?: string };

type Product = {
  route: '/rhumbnav' | '/pogo';
  name: string;
  action: string;
  category: string;
  icon: string;
  summary: string;
  title: string;
  description: string;
  screenshots: [Screenshot, Screenshot];
  gallery: Screenshot[];
  features: { icon: LucideIcon; title: string; description: string }[];
};

export const rhumbNav: Product = {
  route: '/rhumbnav',
  name: 'RhumbNav',
  action: 'View RhumbNav',
  category: 'Aviation',
  icon: '/images/rhumbnav-app-icon.png',
  summary: 'Flight planning, VFR navigation, and a digital logbook.',
  title: 'Plan and navigate with clarity.',
  description: 'A light EFB shaped by real flight experience, with planning, navigation, and pilot tools in one app.',
  screenshots: [
    { alt: 'RhumbNav in-flight navigation map', light: '/images/rhumbnav-nav-active.jpeg' },
    { alt: 'RhumbNav flight plan', light: '/images/rhumbnav-fpl.jpeg' },
  ],
  gallery: [
    { alt: 'RhumbNav navigation in landscape', light: '/images/rhumbnav-nav.jpeg' },
    { alt: 'RhumbNav E6B flight computer', light: '/images/rhumbnav-computer.jpeg' },
    { alt: 'RhumbNav flight log', light: '/images/rhumbnav-all-flights.jpeg' },
    { alt: 'RhumbNav pilot credentials', light: '/images/rhumbnav-license.jpeg' },
  ],
  features: [
    { icon: Map, title: 'VFR navigation', description: 'See your route and in-flight information on an interactive map.' },
    { icon: BookOpen, title: 'Digital logbook', description: 'Log your flights and keep your pilot credentials together.' },
    { icon: Calculator, title: 'E6B flight computer', description: 'Calculate wind correction, fuel, and other flight data.' },
  ],
};

export const pogo: Product = {
  route: '/pogo',
  name: 'Pogo',
  action: 'View Pogo',
  category: 'Climbing',
  icon: '/images/pogo-app-icon.png',
  summary: 'Log your bouldering sessions and track your progress.',
  title: 'Every session counts.',
  description: 'A climbing logbook to record attempts, see how you progress, and share your sessions with the community.',
  screenshots: [
    { alt: 'Pogo progress summary', light: '/images/pogo-summary-light.jpg', dark: '/images/pogo-summary-dark.jpg' },
    { alt: 'Pogo session details', light: '/images/pogo-session-detail-light.jpg', dark: '/images/pogo-session-detail-dark.jpg' },
  ],
  gallery: [
    { alt: 'Pogo active climbing session', light: '/images/pogo-active-session-light.jpg', dark: '/images/pogo-active-session-dark.jpg' },
    { alt: 'Pogo session history', light: '/images/pogo-history-light.jpg', dark: '/images/pogo-history-dark.jpg' },
    { alt: 'Pogo achievements', light: '/images/pogo-achievements-light.jpg', dark: '/images/pogo-achievements-dark.jpg' },
  ],
  features: [
    { icon: ClipboardList, title: 'Session logging', description: 'Save your attempts, grades, and results from each session.' },
    { icon: ChartNoAxesCombined, title: 'Statistics', description: 'Review your progress, volume, and best grades over time.' },
    { icon: Users, title: 'Community', description: 'See what others are climbing and share your activity.' },
  ],
};

export const products = [rhumbNav, pogo];
