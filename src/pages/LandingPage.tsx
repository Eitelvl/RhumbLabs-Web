import { ArrowDown, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { ActionLink, SiteCallout } from '../components/MarketingElements';
import { ProductGrid } from '../components/ProductPresentation';

export default function LandingPage() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash, key]);

  return (
    <div>
      <TopBar />
      <main className="marketing-page">
        <section id="home" className="marketing-band home-intro">
          <h1><span>Designed for</span>{' '}<span>what’s next.</span></h1>
          <div className="home-intro-aside">
            <p>We create our own products and build custom software.</p>
            <div className="marketing-actions">
              <ActionLink to="/#products" variant="primary" icon={ArrowDown}>View products</ActionLink>
              <ActionLink to="/about" variant="inline">About Us</ActionLink>
            </div>
          </div>
        </section>
        <section id="products" className="marketing-band home-products">
          <header className="marketing-section-heading">
            <h2 className="marketing-section-title">Our Products</h2>
            <ActionLink to="/products" variant="inline" icon={ArrowRight}>View catalog</ActionLink>
          </header>
          <ProductGrid />
        </section>
        <SiteCallout id="about" title="Have a project in mind?" description="Tell us what you want to build.">
          <ActionLink to="/contact" variant="primary">Let’s talk</ActionLink>
        </SiteCallout>
        <section className="marketing-band home-manifesto">
          <h2>Crafting Software <span>with intention.</span></h2>
          <div>
            <p>We care deeply about clarity, functionality, and creating tools that feel intuitive from the very first tap. By bringing together design and robust engineering, we shape digital products that are simple, reliable, and built with purpose.</p>
            <ActionLink to="/about" variant="inline">About Rhumb Labs</ActionLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
