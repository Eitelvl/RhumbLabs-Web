import { useEffect } from 'react';
import { Apple, Clock, Download, Mail } from 'lucide-react';
import { ActionLink, SiteCallout } from '../components/MarketingElements';
import { ProductPage } from '../components/ProductPresentation';
import { useLanguage } from '../context/LanguageContext';
import { aris } from '../data/products';
import { arisMetadata } from '../data/arisMetadata';

const downloadUrl = (() => {
  try {
    const url = new URL(import.meta.env.VITE_ARIS_DOWNLOAD_URL ?? '');
    if (url.protocol === 'https:' && url.pathname.toLowerCase().endsWith('.dmg')) return url.href;
  } catch {
    // Keep the pending state until a release URL is configured.
  }
  return null;
})();

function AppleDownload({ primary }: { primary: boolean }) {
  const variant = primary ? 'primary' : 'secondary';
  return downloadUrl ? (
    <ActionLink to={downloadUrl} variant={variant} icon={Download}>Download for Mac</ActionLink>
  ) : (
    <span className={`marketing-action marketing-action-${variant} aris-download-pending`}>
      <span>Mac download coming soon</span><Apple size={16} aria-hidden />
    </span>
  );
}

function PlatformActions() {
  const { language } = useLanguage();
  const platform = (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData?.platform
    || navigator.platform;
  // iPadOS can advertise the Mac platform when requesting desktop sites.
  const isMac = /mac/i.test(platform) && navigator.maxTouchPoints <= 1;
  const mac = <AppleDownload primary={isMac} />;
  const message = language === 'es'
    ? 'Hola, me gustaría que me avisaran cuando Aris esté disponible para Windows.'
    : 'Hi, please let me know when Aris is available for Windows.';
  const windows = (
    <ActionLink
      to={`mailto:support@rhumblabs.com?subject=Aris%20for%20Windows&body=${encodeURIComponent(message)}`}
      variant={isMac ? 'secondary' : 'primary'}
      icon={Mail}
    >
      Windows — coming soon · Notify me
    </ActionLink>
  );

  return isMac ? <>{mac}{windows}</> : <>{windows}{mac}</>;
}

export default function ArisPage() {
  const { language } = useLanguage();

  useEffect(() => {
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const isStaticEntry = description?.dataset.product === 'aris';
    const previousTitle = isStaticEntry ? 'RhumbLabs' : document.title;
    const meta = description ?? document.createElement('meta');
    const previousDescription = meta.content;
    const { title, summary } = arisMetadata[language];
    document.title = title;
    meta.name = 'description';
    meta.content = summary;
    if (!description) document.head.append(meta);

    return () => {
      document.title = previousTitle;
      if (description && !isStaticEntry) meta.content = previousDescription;
      else meta.remove();
    };
  }, [language]);

  return (
    <ProductPage product={aris} heroActions={<PlatformActions />}>
      <SiteCallout id="download" title="Get Aris for Mac"
        description="Version 0.1.0 · Mac with Apple silicon (M1 or later) · macOS 13 or later. macOS 14.2 or later is recommended to capture system audio without the screen-sharing indicator. Allow about 6 GB of free space for models. Minimum RAM: to be confirmed.">
        {downloadUrl ? <AppleDownload primary /> : (
          <ActionLink to="mailto:support@rhumblabs.com?subject=Aris%20for%20Mac" variant="primary" icon={Clock}>
            Ask about the Mac release
          </ActionLink>
        )}
      </SiteCallout>
      <p className="marketing-band app-attribution">Mac and macOS are trademarks of Apple Inc.</p>
    </ProductPage>
  );
}
