import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { ActionLink, PageIntro, SiteCallout } from '../components/MarketingElements';
import { ProductGrid } from '../components/ProductPresentation';

export default function ProductsPage() {
  return (
    <div>
      <TopBar />
      <main className="marketing-page">
        <PageIntro title="Our Products" description="Tools from Rhumb Labs to plan flights, log climbing sessions, and track your activity." />
        <div className="marketing-band product-catalog"><ProductGrid catalog /></div>
        <SiteCallout title="Have a project in mind?" description="Tell us what you want to build.">
          <ActionLink to="/contact" variant="primary">Let’s talk</ActionLink>
        </SiteCallout>
      </main>
      <Footer />
    </div>
  );
}
