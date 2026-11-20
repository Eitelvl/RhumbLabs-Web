import { Link } from 'react-router-dom';
import { ActionLink } from '../components/MarketingElements';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { SafeImage } from '../components/SafeImage';
import { ArrowRight, Cpu, Layers, Microscope, Sparkles, Terminal, Zap } from 'lucide-react';
import { pogo, rhumbNav } from '../data/products';

const studioProducts = [
  { product: rhumbNav, status: 'IN DEVELOPMENT', description: rhumbNav.summary },
  { product: pogo, status: 'AVAILABLE', description: 'Track your climbing sessions, grades, and progress.' },
];

export default function AboutPage() {
  const customCapabilities = [
    'Web applications',
    'Mobile applications',
    'Internal tools',
    'APIs and backend systems',
    'Automation',
    'Data-driven platforms',
    'Custom digital products'
  ];

  const labFocusAreas = [
    { title: 'New Technologies', desc: 'Evaluating emerging runtimes, frameworks, and edge computing models.', icon: Cpu },
    { title: 'Applied AI', desc: 'Integrating pragmatic, local, and multimodal intelligence directly into workflows.', icon: Sparkles },
    { title: 'Automation Engines', desc: 'Removing manual friction through declarative scripts and resilient pipelines.', icon: Zap },
    { title: 'Interface Systems', desc: 'Crafting responsive, tactile, and zero-latency user interactions.', icon: Layers },
    { title: 'Developer Tooling', desc: 'Building internal CLI tools, mock generators, and diagnostics.', icon: Terminal },
    { title: 'Rapid Prototypes', desc: 'Validating product hypotheses in days rather than quarters.', icon: Microscope }
  ];

  const workSteps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'We start by understanding the problem, not by choosing the technology. We dig into constraints, user friction, and fundamental requirements before writing a single line of code.'
    },
    {
      num: '02',
      title: 'Shape',
      desc: 'We turn ideas and requirements into a clear product and technical direction. Architecture, data models, interfaces, and roadmaps are forged with deliberate precision.'
    },
    {
      num: '03',
      title: 'Build',
      desc: 'We design, engineer, test, and iterate until the thing actually works. Clean code, robust type systems, and performant backends built to withstand real-world use.'
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'We ship it, learn from it, and keep improving it. Observability, continuous feedback loops, and thoughtful iterations ensure the software stays alive and thriving.'
    }
  ];

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen selection:bg-card-border selection:text-text-primary">
      <TopBar />

      <main className="marketing-page about-layout">
        
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section className="marketing-band about-intro">
          <h1>About Us</h1>
          <div>
            <h2>We build things <span>that should exist.</span></h2>
            <p>Rhumb Labs is a technology company building products, software, and custom digital experiences — from our own ideas to solutions built around yours.</p>
            <div className="marketing-actions">
              <ActionLink to="/products" icon={ArrowRight}>Our Products</ActionLink>
              <ActionLink to="/contact" variant="primary">Start a Project</ActionLink>
            </div>
          </div>
        </section>

        <section className="marketing-band about-work border-t border-border-subtle">
          <h2 className="marketing-section-title">What we do.</h2>
          <div className="about-work-grid">
            <article className="linear-card about-work-card">
              <h3>We build our own.</h3>
              <p>We design and develop our own apps for pilots and climbers.</p>
              <ul className="about-product-list">
                {studioProducts.map(({ product, description }) => (
                  <li key={product.name}>
                    <Link to={product.route} className="about-product-link">
                      <SafeImage src={product.icon} alt="" width={42} height={42} />
                      <div>
                        <strong>{product.name}</strong>
                        <p>{description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ActionLink to="/products" variant="inline">Explore products</ActionLink>
            </article>

            <article className="linear-card about-work-card">
              <h3>We build yours.</h3>
              <p>We design and build custom software around the way your team works.</p>
              <ul className="about-capability-list">
                {customCapabilities.map(item => (
                  <li className="marketing-label about-tag" key={item}>{item}</li>
                ))}
              </ul>
              <ActionLink to="/contact" variant="inline">Start a project</ActionLink>
            </article>

            <article className="linear-card about-work-card">
              <h3>We explore what’s next.</h3>
              <p>We build small prototypes to find out which ideas are worth developing.</p>
              <ul className="about-experiment-list">
                <li>Developer Tooling</li>
                <li>Automation</li>
                <li>Applied AI</li>
              </ul>
              <a href="#the-lab" className="marketing-action marketing-action-inline">
                Explore the lab <ArrowRight size={15} aria-hidden />
              </a>
            </article>
          </div>
        </section>

        {/* =========================================================================
            HOW WE WORK (4-Step Sequential Process)
            ========================================================================= */}
        <section className="marketing-band about-process border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">

            <div className="mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                How we work.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workSteps.map((step) => (
                <article key={step.num} className="linear-card about-step">
                  <span className="about-step-number">{step.num}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            WHAT IS RHUMB LABS? (Editorial Statement)
            ========================================================================= */}
        <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-border-subtle">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-10 items-start">

              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary leading-snug">
                  A small lab <br className="hidden md:block"/> for big ideas.
                </h2>
              </div>

              <div className="flex flex-col gap-6 text-text-secondary text-lg md:text-xl font-light leading-relaxed">
                <p>
                  Rhumb Labs is where ideas become software. We design and build our own products, explore new technologies, and work on custom projects that demand something beyond the ordinary.
                </p>
                <p className="text-text-primary font-normal">
                  Some things we build for ourselves. Some we build with others. The common thread is simple: start with a problem, understand it deeply, and build the right thing.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* =========================================================================
            OUR PRODUCTS (Built Here)
            ========================================================================= */}
        <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
                  Built here.
                </h2>
              </div>
              <p className="text-text-secondary text-sm md:text-base max-w-md font-light">
                Products crafted with end-to-end focus on user simplicity, precision, and reliable real-time performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {studioProducts.map(({ product, status, description }) => (
                <Link to={product.route} key={product.name} className="linear-card about-built-card">
                  <div className="about-built-header">
                    <span className="marketing-label about-tag">{status}</span>
                    <ArrowRight size={16} aria-hidden />
                  </div>
                  <div className="about-built-product">
                    <SafeImage src={product.icon} alt="" width={48} height={48} />
                    <h3>{product.name}</h3>
                  </div>
                  <p>{description}</p>
                </Link>
              ))}
              <article className="linear-card about-built-card">
                <div className="about-built-header">
                  <span className="marketing-label about-tag">INCUBATING</span>
                </div>
                <h3>More experiments</h3>
                <p>Rhumb Labs will continue prototyping and releasing new standalone software and developer utilities.</p>
              </article>
            </div>

          </div>
        </section>


        {/* =========================================================================
            CUSTOM DEVELOPMENT (Conversion-Oriented & Direct)
            ========================================================================= */}
        <section className="py-20 md:py-32 px-6 lg:px-12 border-t border-border-subtle">
          <div className="max-w-5xl mx-auto">
            <div className="linear-card backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
              
              <div className="max-w-3xl relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 leading-tight">
                  Have something in mind?
                </h2>
                
                <p className="text-xl md:text-2xl font-medium text-text-primary mb-6">
                  Tell us what you're trying to build.
                </p>
                
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-10 max-w-2xl">
                  From an early idea to a production-ready platform, we can help design the product, architect the technology, and build the software behind it.
                </p>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full brand-btn-primary text-sm font-semibold transition-all duration-300"
                >
                  Talk to Rhumb Labs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>





        {/* =========================================================================
            PHILOSOPHY (Large Typographic Statement)
            ========================================================================= */}
        <section className="py-32 md:py-48 px-6 lg:px-12 border-t border-border-subtle text-center flex flex-col items-center justify-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-text-primary mb-12 leading-[1.1]">
              Good software is invisible. <br />
              <span className="about-philosophy-emphasis">
                Good products aren't.
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
              We care about the details people notice and the engineering they don't. The interface should feel simple. The technology behind it should be anything but accidental.
            </p>
          </div>
        </section>


        {/* =========================================================================
            THE LAB (Experimental Focus & Domains)
            ========================================================================= */}
        <section id="the-lab" className="py-20 md:py-32 px-6 lg:px-12 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                  The lab is <br className="hidden lg:block"/> always open.
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light">
                  Beyond production products, Rhumb Labs maintains continuous R&D exploring emerging computing paradigms, AI interfaces, and automation tools.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {labFocusAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div 
                      key={area.title}
                      className="linear-card rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center border border-card-border mb-4 text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-text-primary mb-1.5">
                        {area.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">
                        {area.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            FINAL CTA (Clean, Confident & Direct)
            ========================================================================= */}
        <section className="py-28 md:py-40 px-6 lg:px-12 border-t border-border-subtle text-center flex flex-col items-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-6">
              Let's build something.
            </h2>
            
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-light mb-10 max-w-xl mx-auto">
              Have a product idea, a problem worth solving, or something that doesn't exist yet?
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full brand-btn-primary text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 rounded-full bg-card-element hover:bg-bg-secondary border border-card-border text-text-primary text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              >
                Explore our products
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
