import { useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft, Building2, List } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageLink } from '../components/SiteElements';
import { useLanguage } from '../context/LanguageContext';

// Load all markdown files from /src/data/legal
const docs = import.meta.glob<string>('/src/data/legal/*.md', { query: '?raw', import: 'default', eager: true });

export default function LegalDocPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
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
  const displayTitle = rawTitle === 'company-legal' || rawTitle === 'legal' ? 'Legal information' : rawTitle
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

  const headings = (content ?? '').split('\n').flatMap((line, index) => {
    const match = line.match(/^## +(.+?)\s*$/);
    return match ? [{ title: match[1], line: index + 1 }] : [];
  }).map((heading, index) => ({ ...heading, id: `document-section-${index + 1}` }));
  const sectionIds = new Map(headings.map(({ line, id }) => [line, id]));

  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <header className="page-intro document-intro">
        <PageLink to="/legal" icon={ArrowLeft} inline className="ui-back">Back to Legal Center</PageLink>
        <h1>{displayTitle}</h1>
        <p className="document-meta"><Building2 size={16} aria-hidden /><span>{subtitle}</span></p>
      </header>
      {content ? (
        <div className="page-band document-grid">
          {headings.length > 0 && (
            <nav className="ui-panel document-index" aria-label="On this page">
              <h2 className="ui-label"><List size={17} aria-hidden /><span>On this page</span></h2>
              <ul data-i18n-ignore={isPogo ? true : undefined} lang={isPogo ? language : undefined}>
                {headings.map(({ id, title }) => (
                  <li key={id}><a href={`#${id}`}><span>{title}</span><ArrowDownRight size={14} aria-hidden /></a></li>
                ))}
              </ul>
            </nav>
          )}
          <article className="legal-copy prose dark:prose-invert max-w-none" data-i18n-ignore={isPogo ? true : undefined} lang={isPogo ? language : undefined}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              h1: ({ node: _node, ...props }) => <h2 {...props} className="legal-copy-title" />,
              h2: ({ node, ...props }) => <h3 {...props} id={sectionIds.get(node?.position?.start.line ?? 0)} />,
              h3: ({ node: _node, ...props }) => <h4 {...props} />,
            }}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      ) : (
        <section className="page-band">
          <p>This document will be available soon. Please check back later or contact support if you have immediate questions.</p>
        </section>
      )}
    </main>
  );
}
