import { Smartphone } from 'lucide-react';
import { ProductDetail } from '../components/ProductShowcase';
import { rhumbNav } from '../data/products';

export default function RhumbNavPage() {
  return (
    <ProductDetail product={rhumbNav}>
      <span className="ui-status ui-label"><Smartphone size={16} aria-hidden /> Coming Soon for Android</span>
    </ProductDetail>
  );
}
