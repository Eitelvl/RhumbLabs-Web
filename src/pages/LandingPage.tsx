import { ArrowDown, ArrowRight } from 'lucide-react';
import { ProductGrid } from '../components/ProductShowcase';
import { PageLink, ProjectCallout } from '../components/SiteElements';

export default function LandingPage() {
  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <section className="home-hero" id="home">
        <h1><span>Designed for</span><span>what’s next.</span></h1>
        <div className="home-aside">
          <p>We create our own products and build custom software.</p>
          <div className="ui-actions">
            <PageLink to="/#products" icon={ArrowDown} primary>View products</PageLink>
            <PageLink to="/about" inline>About Us</PageLink>
          </div>
        </div>
      </section>
      <section className="page-band home-products" id="products">
        <header className="section-heading">
          <h2>Our Products</h2>
          <PageLink to="/products" icon={ArrowRight} inline>View catalog</PageLink>
        </header>
        <ProductGrid />
      </section>
      <ProjectCallout id="about" />
    </main>
  );
}
