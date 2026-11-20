import { ArrowRight, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { Callout, PageIntro, PageLink } from '../components/SiteElements';

const groups = [
  {
    name: 'Rhumb Labs',
    icon: '/images/rhumb-labs-card-icon.png',
    documents: [
      ['Legal information', '/legal/company-legal'],
      ['Company Privacy', '/legal/company-privacy'],
    ],
  },
  {
    name: 'RhumbNav',
    icon: '/images/rhumbnav-app-icon.png',
    documents: [
      ['Privacy Policy', '/legal/rhumbnav/privacy-policy'],
      ['Terms of Use', '/legal/rhumbnav/terms-of-use'],
      ['Subscription & Refund Policy', '/legal/rhumbnav/subscription-refund-policy'],
      ['Aviation Disclaimer', '/legal/rhumbnav/aviation-disclaimer'],
      ['Third Party Notices', '/legal/rhumbnav/third-party-notices'],
    ],
  },
  {
    name: 'Pogo',
    icon: '/images/pogo-app-icon.png',
    documents: [
      ['Privacy Policy', '/legal/pogo/privacy-policy'],
      ['Terms of Use', '/legal/pogo/terms-of-use'],
    ],
  },
];

export default function LegalPage() {
  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <PageIntro title="Legal Center" description="Privacy policies, terms of use, and documents for Rhumb Labs and its apps." />
      <div className="page-band ui-thirds legal-groups">
        {groups.map(({ name, icon, documents }) => (
          <section className="ui-panel legal-group" key={name}>
            <header className="app-heading">
              <SafeImage className="app-icon" src={icon} alt="" width={40} height={40} />
              <h2>{name}</h2>
            </header>
            <ul>
              {documents.map(([title, to]) => (
                <li key={to}>
                  <Link to={to}>
                    <FileText size={17} aria-hidden /><span>{title}</span><ChevronRight size={17} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <Callout title="Account and data deletion" description="Find the instructions for RhumbNav and Pogo.">
        <PageLink to="/delete-account" icon={ArrowRight}>View instructions</PageLink>
      </Callout>
    </main>
  );
}
