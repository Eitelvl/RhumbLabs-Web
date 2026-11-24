import { ArrowUpRight, BriefcaseBusiness, LifeBuoy, Mail, MapPin, Shield } from 'lucide-react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { ActionLink } from '../components/MarketingElements';

const email = 'support@rhumblabs.com';
const inquiries = [
  { icon: LifeBuoy, label: 'App Support', description: 'Help with Rhumb Labs products.', subject: 'App Support' },
  { icon: BriefcaseBusiness, label: 'Business', description: 'Tell us what you want to build.', subject: 'Business Inquiry' },
  { icon: Shield, label: 'Privacy', description: 'Questions about your personal information.', subject: 'Privacy Request' },
];

export default function ContactPage() {
  return (
    <div>
      <TopBar />
      <main className="marketing-page marketing-band contact-layout">
        <header className="contact-intro">
          <h1>Get in touch.</h1>
          <p>For questions, ideas, feedback, support, or business inquiries, feel free to reach out to the Rhumb Labs team.</p>
          <p className="contact-location"><MapPin size={17} aria-hidden /><span>Santiago de Chile</span></p>
        </header>
        <section className="linear-card contact-panel">
          <div className="contact-email">
            <span className="contact-email-icon"><Mail size={20} aria-hidden /></span>
            <div>
              <h2>Contact Rhumb Labs</h2>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <ActionLink to={`mailto:${email}`} variant="primary">Send Email</ActionLink>
          </div>
          <h2 className="marketing-label contact-inquiries-title">Quick Inquiries</h2>
          <ul className="contact-inquiries">
            {inquiries.map(({ icon: Icon, label, description, subject }) => (
              <li key={subject}>
                <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
                  <Icon size={20} aria-hidden />
                  <div><h3>{label}</h3><p>{description}</p></div>
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
