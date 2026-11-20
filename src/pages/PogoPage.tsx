import { ProductDetail } from '../components/ProductShowcase';
import { PageLink } from '../components/SiteElements';
import { pogo } from '../data/products';

const appStoreUrl = 'https://apps.apple.com/mx/app/pogo-your-climbing-logbook/id6801417725';
const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.rhumblabs.pogo';
const instagramUrl = 'https://www.instagram.com/app.pogoclimb/';

export default function PogoPage() {
  return (
    <ProductDetail product={pogo} additionalLinks={<PageLink to={instagramUrl} target="_blank" rel="noopener noreferrer" inline>Instagram</PageLink>}>
      <PageLink to={googlePlayUrl} target="_blank" rel="noopener noreferrer" primary>Google Play</PageLink>
      <PageLink to={appStoreUrl} target="_blank" rel="noopener noreferrer">App Store</PageLink>
    </ProductDetail>
  );
}
