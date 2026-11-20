import { useState, type ReactNode } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { products, type Product, type Screenshot } from '../data/products';
import { DeviceMockup } from './DeviceMockup';
import { ScreenshotCarousel } from './ScreenshotCarousel';
import { ScreenshotThemeToggle } from './ScreenshotThemeToggle';
import { ActionLink, SiteCallout } from './MarketingElements';
import { SafeImage } from './SafeImage';
import TopBar from './TopBar';
import Footer from './Footer';

function ProductName({ product, heading: Heading }: { product: Product; heading: 'h2' | 'h3' | 'p' }) {
  return (
    <div className="product-name">
      <SafeImage src={product.icon} alt="" width={48} height={48} />
      <div>
        <span className="marketing-label">{product.category}</span>
        <Heading>{product.name}</Heading>
      </div>
    </div>
  );
}

function PreviewPhones({ screenshots, dark, id }: { screenshots: Screenshot[]; dark: boolean; id?: string }) {
  return (
    <div className="product-preview-phones" id={id}>
      {screenshots.map(({ light, dark: darkImage, alt }) => (
        <DeviceMockup key={light} type="phone" imageSrc={dark ? darkImage ?? light : light} alt={alt} />
      ))}
    </div>
  );
}

function HeroProductPreview({ screenshots }: { screenshots: Screenshot[] }) {
  const hasDarkCaptures = screenshots.every(({ dark }) => Boolean(dark));
  const [dark, setDark] = useState(false);
  return (
    <div className="product-preview">
      {hasDarkCaptures && (
        <ScreenshotThemeToggle dark={dark} onToggle={() => setDark(value => !value)} controls="app-hero-phones" />
      )}
      <PreviewPhones id="app-hero-phones" screenshots={screenshots} dark={dark} />
    </div>
  );
}

function Highlights({ product }: { product: Product }) {
  return (
    <ul className="product-highlights">
      {product.highlights.map(text => (
        <li key={text}><Check size={16} aria-hidden /><span>{text}</span></li>
      ))}
    </ul>
  );
}

export function ProductGrid({ catalog = false }: { catalog?: boolean }) {
  return (
    <div className={`product-grid${catalog ? ' product-grid-catalog' : ''}`}>
      {products.map(product => (
        <article className="linear-card product-card" key={product.name}>
          <div className="product-card-copy">
            <ProductName product={product} heading={catalog ? 'h2' : 'h3'} />
            <p>{catalog ? product.tagline : product.summary}</p>
            {catalog && <Highlights product={product} />}
            <ActionLink to={product.route}>{product.action}</ActionLink>
          </div>
          <div className="product-preview">
            <PreviewPhones screenshots={product.preview} dark />
          </div>
          {!catalog && (
            <details className="product-card-details">
              <summary>Product highlights</summary>
              <p>{product.tagline}</p>
              <p>{product.overview}</p>
              <Highlights product={product} />
            </details>
          )}
        </article>
      ))}
    </div>
  );
}

export function ProductPage({ product, heroActions, children }: {
  product: Product;
  heroActions: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <TopBar />
      <main className="marketing-page">
        <section className="marketing-band app-hero">
          <div className="app-hero-copy">
            <ActionLink to="/products" variant="inline" icon={ArrowLeft} className="marketing-back">Back to products</ActionLink>
            <ProductName product={product} heading="p" />
            <h1>{product.headline}</h1>
            <p>{product.description}</p>
            <div className="marketing-actions">{heroActions}</div>
          </div>
          <HeroProductPreview screenshots={product.preview} />
        </section>
        <section className="marketing-band app-features">
          <h2 className="marketing-section-title">What you can do</h2>
          <div className="app-feature-grid">
            {product.features.map(({ icon: Icon, title, description }) => (
              <article className="linear-card app-feature" key={title}>
                <Icon size={20} aria-hidden />
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>
        <section className="marketing-band app-gallery">
          <ScreenshotCarousel productName={product.name} screenshots={product.gallery} />
        </section>
        {children}
        <SiteCallout title="Support and privacy" description="Find help and read the app’s privacy policy.">
          <ActionLink to={`/legal${product.route}/privacy-policy`}>Privacy</ActionLink>
          <ActionLink to="/contact" variant="primary">Get help</ActionLink>
        </SiteCallout>
      </main>
      <Footer />
    </div>
  );
}
