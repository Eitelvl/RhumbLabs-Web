import { ArrowUpRight, BriefcaseBusiness, LifeBuoy, Mail, MapPin, Shield } from 'lucide-react';
import { PageLink } from '../components/SiteElements';

const email = 'support@rhumblabs.com';
const topics = [
  { icon: LifeBuoy, title: 'App Support', description: 'Help with RhumbNav or Pogo.', subject: 'App Support' },
  { icon: BriefcaseBusiness, title: 'Projects and business', description: 'Tell us what you want to build.', subject: 'Business Inquiry' },
  { icon: Shield, title: 'Privacy and data', description: 'Questions about your personal information.', subject: 'Privacy Request' },
];

export default function ContactPage() {
  return (
    <main id="contenido" tabIndex={-1} className="ui-page page-band contact-page">
      <header className="contact-intro">
        <h1>Get in touch.</h1>
        <p>Write to us if you have an idea, need help with an app, or want to work with us.</p>
        <p className="contact-location"><MapPin size={17} aria-hidden /><span>Santiago de Chile</span></p>
      </header>
      <section className="ui-panel contact-panel">
        <div className="contact-email">
          <span className="ui-square"><Mail size={20} aria-hidden /></span>
          <div><h2>Write to us</h2><a href={`mailto:${email}`}>{email}</a></div>
          <PageLink to={`mailto:${email}`} primary>Send Email</PageLink>
        </div>
        <h2 className="ui-label contact-topics-label">Choose a topic</h2>
        <ul className="contact-topics">
          {topics.map(({ icon: Icon, title, description, subject }) => (
            <li key={title}>
              <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
                <Icon size={20} aria-hidden />
                <div><h3>{title}</h3><p>{description}</p></div>
                <ArrowUpRight size={17} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
