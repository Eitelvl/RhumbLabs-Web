import { ProductGrid } from '../components/ProductShowcase';
import { PageIntro, ProjectCallout } from '../components/SiteElements';

export default function ProductsPage() {
  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <PageIntro title="Our Products" description="Tools from Rhumb Labs to plan flights, log climbing sessions, and track your activity." />
      <section className="page-band" aria-label="Product catalog"><ProductGrid expanded /></section>
      <ProjectCallout />
    </main>
  );
}
