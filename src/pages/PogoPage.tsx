import { ProductPage } from '../components/ProductPresentation';
import { ActionLink, SiteCallout } from '../components/MarketingElements';
import { pogo } from '../data/products';

const appStore = 'https://apps.apple.com/mx/app/pogo-your-climbing-logbook/id6801417725';
const googlePlay = 'https://play.google.com/store/apps/details?id=com.rhumblabs.pogo';
const instagram = 'https://www.instagram.com/app.pogoclimb/';

function StoreLinks() {
  return (
    <>
      <ActionLink to={googlePlay} variant="primary" target="_blank" rel="noopener noreferrer">Google Play</ActionLink>
      <ActionLink to={appStore} target="_blank" rel="noopener noreferrer">App Store</ActionLink>
    </>
  );
}

export default function PogoPage() {
  return (
    <ProductPage product={pogo} heroActions={<StoreLinks />}>
      <SiteCallout title="Join the Community Now!" description="From quick session logging to long-term statistics, Pogo offers climbers a personal space to record, analyze, and grow. Download the app today and connect with our community on Instagram.">
        <ActionLink to={instagram} target="_blank" rel="noopener noreferrer">Follow on Instagram</ActionLink>
        <StoreLinks />
      </SiteCallout>
      <p className="marketing-band app-attribution">App Store is a trademark of Apple Inc.</p>
    </ProductPage>
  );
}
