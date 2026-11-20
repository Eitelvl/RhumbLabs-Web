import { ArrowRight, Boxes, CodeXml, FlaskConical } from 'lucide-react';
import { PageLink, ProjectCallout } from '../components/SiteElements';

const work = [
  { icon: Boxes, title: 'Our own products', description: 'We design and maintain RhumbNav and Pogo.', link: { to: '/products', label: 'View products' } },
  { icon: CodeXml, title: 'Custom software', description: 'We design and build software for projects with specific needs.', link: { to: '/contact', label: 'Let’s talk' } },
  { icon: FlaskConical, title: 'Prototypes and experiments', description: 'We test new technologies and ideas before turning them into products.' },
];

const steps = [
  ['Understand', 'We define the problem and its context.'],
  ['Shape', 'We agree what to build and how to validate it.'],
  ['Build', 'We design, develop, and test.'],
  ['Launch', 'We release and refine the product based on real use.'],
];

export default function AboutPage() {
  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <header className="about-intro">
        <h1>About Us</h1>
        <p>Rhumb Labs is a software studio. We build our own products and work with teams to bring ideas into production.</p>
      </header>
      <section className="page-band about-work">
        <h2 className="section-title">What we do</h2>
        <div className="ui-thirds">
          {work.map(({ icon: Icon, title, description, link }) => (
            <article className="ui-panel about-pillar" key={title}>
              <span className="ui-square"><Icon size={20} aria-hidden /></span>
              <h3>{title}</h3><p>{description}</p>
              {link && <PageLink to={link.to} icon={ArrowRight} inline>{link.label}</PageLink>}
            </article>
          ))}
        </div>
      </section>
      <section className="page-band about-process">
        <h2 className="section-title">How we work</h2>
        <ol className="about-steps">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span aria-hidden>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <ProjectCallout />
    </main>
  );
}
