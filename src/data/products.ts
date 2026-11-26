import { AudioLines, FileText, Lock, Mic, Award, BookOpen, Calculator, ChartNoAxesCombined, ClipboardList, IdCard, Map, type LucideIcon } from 'lucide-react';

export type Screenshot = { light: string; dark?: string; alt: string };
export type ScreenshotGallery = [Screenshot, Screenshot, ...Screenshot[]];
type Feature = { icon: LucideIcon; title: string; description: string };

export type Product = {
  name: string;
  route: '/rhumbnav' | '/pogo' | '/aris';
  device?: 'window';
  terms?: boolean;
  category: string;
  icon: string;
  summary: string;
  tagline: string;
  overview: string;
  highlights: string[];
  action: string;
  headline: string;
  description: string;
  preview: [Screenshot, ...Screenshot[]];
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
  preview: [rhumbNavScreenshots[0], rhumbNavScreenshots[6], rhumbNavScreenshots[8]],
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
  { light: '/images/pogo/screenshots/01-summary-news-v4-light.webp', dark: '/images/pogo/screenshots/01-summary-news-v4-dark.webp', alt: 'Summary' },
  { light: '/images/pogo/screenshots/02-history-v4-light.webp', dark: '/images/pogo/screenshots/02-history-v4-dark.webp', alt: 'Session history' },
  { light: '/images/pogo/screenshots/11-active-session-v3-light.webp', dark: '/images/pogo/screenshots/11-active-session-v3-dark.webp', alt: 'Active session' },
  { light: '/images/pogo/screenshots/04-activity-month-v4-light.webp', dark: '/images/pogo/screenshots/04-activity-month-v4-dark.webp', alt: 'Monthly activity' },
  { light: '/images/pogo/screenshots/05-gyms-v4-light.webp', dark: '/images/pogo/screenshots/05-gyms-v4-dark.webp', alt: 'Gyms' },
  { light: '/images/pogo/screenshots/06-gym-detail-v3-light.webp', dark: '/images/pogo/screenshots/06-gym-detail-v3-dark.webp', alt: 'Gym details' },
  { light: '/images/pogo/screenshots/07-session-detail-v3-light.webp', dark: '/images/pogo/screenshots/07-session-detail-v3-dark.webp', alt: 'Session details' },
  { light: '/images/pogo/screenshots/08-profile-v4-light.webp', dark: '/images/pogo/screenshots/08-profile-v4-dark.webp', alt: 'Profile' },
  { light: '/images/pogo/screenshots/09-profile-progress-v4-light.webp', dark: '/images/pogo/screenshots/09-profile-progress-v4-dark.webp', alt: 'Profile progress' },
  { light: '/images/pogo/screenshots/10-achievements-v3-light.webp', dark: '/images/pogo/screenshots/10-achievements-v3-dark.webp', alt: 'Achievements' },
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
  preview: [pogoScreenshots[0], pogoScreenshots[6], pogoScreenshots[2]],
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

const arisScreenshots: ScreenshotGallery = [
  { light: '/images/aris/screenshots/01-home-light.webp', dark: '/images/aris/screenshots/01-home-dark.webp', alt: 'Ready to record' },
  { light: '/images/aris/screenshots/02-recording-light.webp', dark: '/images/aris/screenshots/02-recording-dark.webp', alt: 'Recording with a live transcript' },
  { light: '/images/aris/screenshots/03-minutes-light.webp', dark: '/images/aris/screenshots/03-minutes-dark.webp', alt: 'Meeting minutes and next steps' },
  { light: '/images/aris/screenshots/04-transcript-light.webp', dark: '/images/aris/screenshots/04-transcript-dark.webp', alt: 'Transcript with separate speakers' },
  { light: '/images/aris/screenshots/05-settings-light.webp', dark: '/images/aris/screenshots/05-settings-dark.webp', alt: 'AI features and appearance controls' },
  { light: '/images/aris/screenshots/06-menu-bar-light.webp', dark: '/images/aris/screenshots/06-menu-bar-dark.webp', alt: 'Menu bar recording controls' },
  { light: '/images/aris/screenshots/07-meeting-alert-light.webp', dark: '/images/aris/screenshots/07-meeting-alert-dark.webp', alt: 'Meeting detected alert' },
];

const arisTagline = 'You talk. I take notes.';

export const aris: Product = {
  name: 'Aris',
  route: '/aris',
  device: 'window',
  terms: true,
  category: 'Meetings',
  icon: '/images/aris-app-icon.png',
  summary: 'Record, transcribe, and write meeting minutes on your Mac.',
  tagline: arisTagline,
  overview: 'Aris turns conversations into transcripts and meeting minutes. Audio and notes stay on your Mac.',
  highlights: ['One-click recording', 'Live transcription', 'Meeting minutes in Word', 'On-device processing'],
  action: 'Explore Aris',
  headline: arisTagline,
  description: 'Aris lives in your Mac’s menu bar. It records your microphone and system audio from any meeting app, including Zoom, Google Meet, Teams, Discord, and browser calls. It only records when you start it and never joins the call.',
  preview: [arisScreenshots[2]],
  gallery: arisScreenshots,
  features: [
    {
      icon: Mic,
      title: 'Record from the menu bar',
      description: 'Start, pause, or resume in one click. Use ⌃⌥⌘A to open the panel. On supported macOS versions, Aris can ask if you want to record when a meeting starts. Let everyone know before you record.',
    },
    {
      icon: AudioLines,
      title: 'Follow the live transcript',
      description: 'Read along as people speak. The final transcript separates voices, lets you name the speakers, and filters out filler words and echo.',
    },
    {
      icon: FileText,
      title: 'Get meeting minutes',
      description: 'Read a summary, see what was agreed or still needs discussion, and find out who owns each next step. Export the minutes to Word. Find audio in ~/Aris/Audios and minutes in ~/Aris/Actas.',
    },
    {
      icon: Lock,
      title: 'Keep meetings on your Mac',
      description: 'Whisper.cpp transcribes and llama.cpp with Qwen2.5 7B writes the minutes on your Mac. Download the models once (about 5 GB, verified by Aris). Aris works offline after setup, with no account or AI subscription. Delete meetings from the app when you’re done. Aris follows your Mac’s appearance by default, and you can switch between light and dark.',
    },
  ],
};

export const products = [rhumbNav, pogo, aris];
