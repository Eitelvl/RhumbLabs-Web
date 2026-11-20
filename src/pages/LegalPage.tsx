import { ArrowRight, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { ActionLink, PageIntro, SiteCallout } from '../components/MarketingElements';
import { SafeImage } from '../components/SafeImage';

const groups = [
  {
    name: 'Rhumb Labs', icon: '/images/rhumb-labs-card-icon.png',
    documents: [
      ['Company Legal', '/legal/company-legal'],
      ['Company Privacy', '/legal/company-privacy'],
    ],
  },
  {
    name: 'RhumbNav', icon: '/images/rhumbnav-app-icon.png',
    documents: [
      ['Privacy Policy', '/legal/rhumbnav/privacy-policy'],
      ['Terms of Use', '/legal/rhumbnav/terms-of-use'],
      ['Subscription & Refund Policy', '/legal/rhumbnav/subscription-refund-policy'],
      ['Aviation Disclaimer', '/legal/rhumbnav/aviation-disclaimer'],
      ['Third Party Notices', '/legal/rhumbnav/third-party-notices'],
    ],
  },
  {
    name: 'Pogo', icon: '/images/pogo-app-icon.png',
    documents: [
      ['Privacy Policy', '/legal/pogo/privacy-policy'],
      ['Terms of Use', '/legal/pogo/terms-of-use'],
    ],
  },
];

export default function LegalPage() {
  return (
    <div>
      <TopBar />
      <main className="marketing-page">
        <PageIntro
          title="Legal Center"
          description="Find legal documents, privacy policies, terms, disclaimers, and notices for Rhumb Labs and its products."
        />
        <div className="marketing-band legal-groups">
          {groups.map(({ name, icon, documents }) => (
            <section className="linear-card legal-group" key={name}>
              <header>
                <SafeImage src={icon} alt="" width={41} height={41} />
                <h2>{name}</h2>
              </header>
              <ul>
                {documents.map(([title, to]) => (
                  <li key={to}>
                    <Link to={to}><FileText size={17} aria-hidden /><span>{title}</span><ChevronRight size={17} aria-hidden /></Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <SiteCallout title="Account and data deletion" description="Find the instructions for RhumbNav and Pogo.">
          <ActionLink to="/delete-account" icon={ArrowRight}>View instructions</ActionLink>
        </SiteCallout>
      </main>
      <Footer />
    </div>
  );
}
