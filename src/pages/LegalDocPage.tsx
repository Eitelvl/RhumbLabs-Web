import { useEffect } from 'react';
import { ArrowDownRight, ArrowLeft, Building2, List } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { ActionLink } from '../components/MarketingElements';
import { useLanguage } from '../context/LanguageContext';

// Load all markdown files from /src/data/legal
const docs = import.meta.glob<string>('/src/data/legal/*.md', { query: '?raw', import: 'default', eager: true });

export default function LegalDocPage() {
  const { language } = useLanguage();
  const { pathname, hash } = useLocation();
  const pathParts = pathname.split('/').filter(Boolean);
  
  // Format the title and strip any .html suffix
  let rawTitle = pathParts[pathParts.length - 1] || 'Document';
  rawTitle = rawTitle.replace(/\.html$/i, '');
  
  // Handle common shorthand aliases
  if (rawTitle === 'privacy') rawTitle = 'privacy-policy';
  if (rawTitle === 'terms') rawTitle = 'terms-of-use';
  if (rawTitle === 'refund') rawTitle = 'subscription-refund-policy';
  if (rawTitle === 'aviation') rawTitle = 'aviation-disclaimer';

  // Determine product context
  const isRhumbNav = pathParts.some(p => p.toLowerCase().includes('rhumbnav'));
  const isPogo = pathParts.some(p => p.toLowerCase().includes('pogo'));
  const isCompany = pathParts.some(p => p.toLowerCase().includes('company'));

  let subtitle = 'Rhumb Labs';
  let filenamePrefix = '';
  if (isRhumbNav) {
    subtitle = 'RhumbNav';
    filenamePrefix = 'rhumbnav-';
  } else if (isPogo) {
    subtitle = 'Pogo';
    filenamePrefix = 'pogo-';
  } else if (isCompany) {
    subtitle = 'Rhumb Labs';
    filenamePrefix = 'company-';
  }

  // Format title for display
  const displayTitle = rawTitle === 'company-legal' ? 'Legal information' : rawTitle
    .replace(/^(pogo-|rhumbnav-|company-)/i, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(' Of ', ' of ')
    .replace(' And ', ' & ');

  // Search through all loaded markdown docs
  // Candidate 1: /src/data/legal/${filenamePrefix}${cleanTitle}.md
  // Candidate 2: /src/data/legal/${cleanTitle}.md
  // Candidate 3: Fuzzy matching across doc keys
  const cleanTitle = rawTitle.replace(/^(pogo-|rhumbnav-|company-)/i, '');
  
  let content: string | null = null;
  const pathCandidates = [
    ...(isPogo && (cleanTitle === 'privacy-policy' || cleanTitle === 'terms-of-use')
      ? [`/src/data/legal/pogo-${cleanTitle}-${language}.md`]
      : []),
    `/src/data/legal/${filenamePrefix}${cleanTitle}.md`,
    `/src/data/legal/${rawTitle}.md`,
    `/src/data/legal/${cleanTitle}.md`,
  ];

  for (const candidate of pathCandidates) {
    if (docs[candidate]) {
      content = docs[candidate];
      break;
    }
  }

  if (!content) {
    // Try fuzzy match
    const entries = Object.entries(docs);
    for (const [key, value] of entries) {
      const lowerKey = key.toLowerCase();
      const lowerClean = cleanTitle.toLowerCase();
      if (
        (isPogo && lowerKey.includes('pogo') && lowerKey.includes(lowerClean)) ||
        (isRhumbNav && lowerKey.includes('rhumbnav') && lowerKey.includes(lowerClean)) ||
        (lowerKey.includes(lowerClean))
      ) {
        content = value;
        break;
      }
    }
  }

  const sections = (content ?? '').split('\n').flatMap((line, index) => {
    const heading = line.match(/^## +(.+?)\s*$/);
    return heading ? [{ title: heading[1], line: index + 1 }] : [];
  }).map((section, index) => ({ ...section, id: `document-section-${index + 1}` }));
  const sectionIds = new Map(sections.map(({ line, id }) => [line, id]));

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [content, hash]);

  return (
    <div>
      <TopBar />
      <main className="marketing-page">
        <header className="marketing-band page-intro legal-document-header">
          <ActionLink to="/legal" icon={ArrowLeft} variant="inline" className="marketing-back">Back to Legal Center</ActionLink>
          <h1>{displayTitle}</h1>
          <p className="legal-document-brand"><Building2 size={16} aria-hidden /><span>{subtitle}</span></p>
        </header>
        {content ? (
          <div className="marketing-band legal-document-layout">
            {sections.length > 0 && (
              <nav className="linear-card legal-document-index" aria-label="On this page">
                <h2 className="marketing-label"><List size={17} aria-hidden />On this page</h2>
                <ul data-i18n-ignore={isPogo ? true : undefined} lang={isPogo ? language : undefined}>
                  {sections.map(({ title, id }) => (
                    <li key={id}><a href={`#${id}`}><span>{title}</span><ArrowDownRight size={15} aria-hidden /></a></li>
                  ))}
                </ul>
              </nav>
            )}
            <article lang={isPogo ? language : undefined} data-i18n-ignore={isPogo ? true : undefined}
              className="markdown-body prose dark:prose-invert prose-slate legal-document-copy max-w-none
                         prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary
                         prose-strong:text-text-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: ({ node: _node, ...props }) => <h2 className="legal-document-title" {...props} />,
                h2: ({ node, ...props }) => <h3 id={sectionIds.get(node?.position?.start.line ?? 0)} {...props} />,
                h3: ({ node: _node, ...props }) => <h4 {...props} />,
              }}>{content}</ReactMarkdown>
            </article>
          </div>
        ) : (
          <div className="marketing-band">
            <p>This document will be available soon. Please check back later or contact support if you have immediate questions.</p>
          </div>
        )}
        <div className="marketing-band legal-document-return"><ActionLink to="/legal" icon={ArrowLeft} className="marketing-back">Return to Legal Center</ActionLink></div>
      </main>
      <Footer />
    </div>
  );
}
