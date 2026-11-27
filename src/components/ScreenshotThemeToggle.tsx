import { Moon, Sun } from 'lucide-react';

export type ScreenshotThemeToggleProps = {
  dark: boolean;
  onToggle: () => void;
  controls: string;
};

export function ScreenshotThemeToggle({ dark, onToggle, controls }: ScreenshotThemeToggleProps) {
  const Icon = dark ? Sun : Moon;
  return (
    <button
      type="button"
      className="screenshot-theme-toggle"
      aria-controls={controls}
      aria-label={dark ? 'Show light screenshots' : 'Show dark screenshots'}
      onClick={onToggle}
    >
      <Icon size={16} aria-hidden />
      <span>{dark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}
