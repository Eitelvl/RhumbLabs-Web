import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import spanish from '../i18n/es.json';

export type Language = 'es' | 'en';

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = 'site-language-v2';
const translations: Record<string, string> = spanish;
const translatableAttributes = ['alt', 'aria-label', 'placeholder', 'title'];
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translate(value: string): string {
  const trimmed = value.trim();
  const normalized = trimmed.replace(/\s+/g, ' ');
  const translated = translations[normalized];
  return translated ? value.replace(trimmed, translated) : value;
}

function localizeText(node: Text, language: Language) {
  const current = node.data;
  let original = originalText.get(node);
  if (original === undefined || (current !== original && current !== translate(original))) {
    original = current;
    originalText.set(node, original);
  }
  const next = language === 'es' ? translate(original) : original;
  if (current !== next) node.data = next;
}

function localizeAttributes(element: Element, language: Language) {
  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = new Map();
    originalAttributes.set(element, originals);
  }
  for (const attribute of translatableAttributes) {
    const current = element.getAttribute(attribute);
    if (current === null) continue;
    let original = originals.get(attribute);
    if (original === undefined || (current !== original && current !== translate(original))) {
      original = current;
      originals.set(attribute, original);
    }
    const next = language === 'es' ? translate(original) : original;
    if (current !== next) element.setAttribute(attribute, next);
  }
}

function localizeTree(root: HTMLElement, language: Language) {
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node: Node | null = root;
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.parentElement?.closest('[data-i18n-ignore], script, style, svg')) {
        localizeText(node as Text, language);
      }
    } else if (node instanceof Element && !node.closest('[data-i18n-ignore], script, style, svg')) {
      localizeAttributes(node, language);
    }
    node = walk.nextNode();
  }
}

function TranslationLayer({ language }: { language: Language }) {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    const root = document.getElementById('root');
    if (!root) return;
    let frame = 0;
    const apply = () => localizeTree(root, language);
    apply();
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    });
    observer.observe(root, {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true,
      attributeFilter: translatableAttributes,
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [language, location.pathname]);

  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'es' ? 'es' : 'en';
    } catch {
      return 'en';
    }
  });
  const toggleLanguage = useCallback(() => {
    setLanguage(previous => {
      const next = previous === 'es' ? 'en' : 'es';
      try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch { /* Storage may be disabled. */ }
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
      <TranslationLayer language={language} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
