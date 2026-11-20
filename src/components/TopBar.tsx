import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSiteTheme } from '../context/SiteTheme';
import { SafeImage } from './SafeImage';

const sections = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Legal', to: '/legal' },
];

function activeSection(path: string) {
  if (path.includes('delete-account') || path === '/data-deletion') return '/legal';
  if (path === '/pogo' || path === '/rhumbnav') return '/products';
  if (path === '/support') return '/contact';
  if (path.startsWith('/legal/') || path.startsWith('/static-legal/')
    || path === '/privacy' || path === '/terms' || path.includes('/privacy') || path.includes('/terms')) return '/legal';
  return path;
}

export default function TopBar() {
  const location = useLocation();
  const active = activeSection(location.pathname.toLowerCase().replace(/\/$/, '') || '/');
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useSiteTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => setMenuOpen(false), [location.key]);

  function onEscape(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
  }

  return (
    <header className="site-header" onKeyDown={onEscape}>
      <a className="site-skip" href="#contenido">Skip to content</a>
      <Link className="site-brand" to="/" aria-label="Rhumb Labs">
        <span className="site-brand-mark"><SafeImage src="/images/rhumb-labs-card-icon.png" alt="" /></span>
        <span>Rhumb<span className="site-brand-light">Labs</span></span>
      </Link>
      <div className="site-header-actions">
        <button className="ui-square ui-label" type="button" onClick={toggleLanguage}
          aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'} data-i18n-ignore>
          {language.toUpperCase()}
        </button>
        <button className="ui-square" type="button" onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
        </button>
        <Link className={`ui-action site-contact-link${active === '/contact' ? ' ui-primary' : ''}`}
          aria-current={active === '/contact' ? 'page' : undefined} to="/contact">
          Contact <ArrowUpRight size={16} aria-hidden />
        </Link>
        <button className="ui-square site-menu" type="button" ref={menuButton}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
          aria-controls="main-navigation" onClick={() => {
            setMenuOpen(!menuOpen);
            if (!menuOpen) requestAnimationFrame(() => nav.current?.querySelector('a')?.focus());
          }}>
          {menuOpen ? <X size={21} aria-hidden /> : <Menu size={21} aria-hidden />}
        </button>
      </div>
      <nav className={`site-navigation ui-label${menuOpen ? ' is-open' : ''}`} id="main-navigation" ref={nav} aria-label="Primary navigation">
        {sections.map(({ label, to }) => (
          <Link key={to} to={to} aria-current={active === to ? 'page' : undefined}>{label}</Link>
        ))}
        <Link className="site-mobile-contact" to="/contact" aria-current={active === '/contact' ? 'page' : undefined}>Contact</Link>
      </nav>
    </header>
  );
}
