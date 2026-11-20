import { ProductPage } from '../components/ProductPresentation';
import { ActionLink, SiteCallout } from '../components/MarketingElements';
import { pogo } from '../data/products';

const appStore = 'https://apps.apple.com/mx/app/pogo-your-climbing-logbook/id6801417725';
const googlePlay = 'https://play.google.com/store/apps/details?id=com.rhumblabs.pogo';
const instagram = 'https://www.instagram.com/app.pogoclimb/';

function StoreLinks() {
  return (
    <>
      <ActionLink to={googlePlay} variant="primary" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" className="android-store-mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0216 3.503C15.5902 8.244 13.8533 7.85 12 7.85c-1.8533 0-3.5902.394-5.1375 1.1002L4.841 5.447a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.44z"/>
                </svg>
        Google Play
      </ActionLink>
      <ActionLink to={appStore} target="_blank" rel="noopener noreferrer">App Store</ActionLink>
    </>
  );
}

export default function PogoPage() {
  return (
    <ProductPage product={pogo} heroActions={<StoreLinks />}>
      <SiteCallout title="Join the Community Now!" description="From quick session logging to long-term statistics, Pogo offers climbers a personal space to record, analyze, and grow. Download the app today and connect with our community on Instagram.">
        <ActionLink to={instagram} variant="inline" target="_blank" rel="noopener noreferrer">Follow on Instagram</ActionLink>
        <StoreLinks />
      </SiteCallout>
      <p className="marketing-band app-attribution">
        Android is a trademark of Google LLC. The Android robot is reproduced or modified from work created and shared by Google and used according to terms described in the{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">Creative Commons 3.0 Attribution License</a>.
        {' '}App Store is a trademark of Apple Inc.
      </p>
    </ProductPage>
  );
}
