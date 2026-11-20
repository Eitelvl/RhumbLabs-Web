import { useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ScreenshotGallery } from '../data/products';
import { DeviceMockup } from './DeviceMockup';
import { ScreenshotThemeToggle } from './ScreenshotThemeToggle';

function slideDistance(track: HTMLUListElement) {
  const [first, second] = track.children;
  return (second as HTMLElement).offsetLeft - (first as HTMLElement).offsetLeft;
}

export function ScreenshotCarousel({ screenshots }: { screenshots: ScreenshotGallery }) {
  const track = useRef<HTMLUListElement>(null);
  const buttonScroll = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(false);
  const last = screenshots.length - 1;

  function moveTo(index: number) {
    const viewport = track.current;
    if (!viewport) return;
    const target = Math.min(last, Math.max(0, index));
    viewport.scrollTo({ left: target * slideDistance(viewport), behavior: 'instant' });
    buttonScroll.current = viewport.scrollLeft;
    // Multiple selections can share the last scroll position when several cards are visible.
    setActive(target);
  }

  function onScroll() {
    const viewport = track.current;
    if (!viewport) return;
    const left = viewport.scrollLeft;
    if (buttonScroll.current !== null && Math.abs(left - buttonScroll.current) < 1) return;
    buttonScroll.current = null;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const index = left >= maxScroll - 1 ? last : Math.round(left / slideDistance(viewport));
    setActive(Math.max(0, Math.min(last, index)));
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: last };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    moveTo(destinations[event.key as keyof typeof destinations]);
  }

  return (
    <>
      <div className="screenshot-carousel-header">
        <h2 className="marketing-section-title">App Screenshots</h2>
        <ScreenshotThemeToggle dark={dark} onToggle={() => setDark(value => !value)} controls="pogo-screenshot-track" />
        <div className="screenshot-carousel-arrows">
          <button type="button" aria-label="Previous screenshot" aria-controls="pogo-screenshot-track"
            disabled={active === 0} onClick={() => moveTo(active - 1)}>
            <ChevronLeft size={20} aria-hidden />
          </button>
          <span role="status" aria-live="polite">{active + 1} / {screenshots.length}</span>
          <button type="button" aria-label="Next screenshot" aria-controls="pogo-screenshot-track"
            disabled={active === last} onClick={() => moveTo(active + 1)}>
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>
      </div>
      <ul className="screenshot-carousel-track" id="pogo-screenshot-track" ref={track} tabIndex={0}
        aria-label="Pogo app screenshots" onScroll={onScroll} onKeyDown={onKeyDown}>
        {screenshots.map(({ light, dark: darkImage, alt }, index) => (
          <li key={light} className="screenshot-carousel-slide" aria-current={active === index ? 'true' : undefined}>
            <figure>
              <DeviceMockup type="phone" imageSrc={dark && darkImage ? darkImage : light} alt={alt} loading="lazy" />
              <figcaption>{alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
