import { Smartphone } from 'lucide-react';
import { ProductPage } from '../components/ProductPresentation';
import { rhumbNav } from '../data/products';

export default function RhumbNavPage() {
  return (
    <ProductPage product={rhumbNav} heroActions={
      <span className="product-status marketing-label"><Smartphone size={16} aria-hidden />Coming Soon for Android</span>
    }>
      <section className="marketing-band app-note">
        <h2>Aviation in your pocket.</h2>
        <p>Experience modern flying without the clutter. Start navigating, planning, and logging with unprecedented clarity.</p>
      </section>
    </ProductPage>
  );
}
