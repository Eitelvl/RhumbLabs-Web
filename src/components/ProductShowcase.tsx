import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSiteTheme } from '../context/SiteTheme';
import { products } from '../data/products';
import { DeviceMockup } from './DeviceMockup';
import { SafeImage } from './SafeImage';
import { Callout, PageLink } from './SiteElements';

type Product = (typeof products)[number];

function AppHeading({ product, as: Heading = 'h2' }: { product: Product; as?: 'h2' | 'h3' }) {
  return (
    <div className="app-heading">
      <SafeImage className="app-icon" src={product.icon} alt="" width={48} height={48} />
      <div><span className="ui-label app-category">{product.category}</span><Heading>{product.name}</Heading></div>
    </div>
  );
}

function PhonePreviews({ product }: { product: Product }) {
  const { theme } = useSiteTheme();
  return (
    <div className="phone-previews">
      {product.screenshots.map(({ alt, light, dark }) => (
        <DeviceMockup key={light} imageSrc={theme === 'dark' && dark ? dark : light} alt={alt} />
      ))}
    </div>
  );
}

export function ProductGrid({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={`product-grid${expanded ? ' product-grid-expanded' : ''}`}>
      {products.map(product => (
        <article className="product-card ui-panel" key={product.name}>
          <div className="product-copy">
            <AppHeading product={product} as={expanded ? 'h2' : 'h3'} />
            <p>{product.summary}</p>
            {expanded && (
              <ul className="product-features">
                {product.features.map(({ icon: Icon, title }) => (
                  <li key={title}><Icon size={16} aria-hidden /><span>{title}</span></li>
                ))}
              </ul>
            )}
            <PageLink to={product.route}>{product.action}</PageLink>
          </div>
          <PhonePreviews product={product} />
        </article>
      ))}
    </div>
  );
}

export function ProductDetail({ product, children, additionalLinks }: {
  product: Product;
  children: ReactNode;
  additionalLinks?: ReactNode;
}) {
  const { theme } = useSiteTheme();

  return (
    <main id="contenido" tabIndex={-1} className="ui-page">
      <section className="page-band app-hero">
        <div className="app-copy">
          <PageLink to="/products" icon={ArrowLeft} inline className="ui-back">Back to products</PageLink>
          <AppHeading product={product} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="ui-actions">{children}</div>
        </div>
        <PhonePreviews product={product} />
      </section>
      <section className="page-band app-benefits">
        <h2 className="section-title">What you can do</h2>
        <div className="ui-thirds">
          {product.features.map(({ icon: Icon, title, description }) => (
            <article className="ui-panel ui-benefit" key={title}>
              <Icon size={20} aria-hidden />
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
        <details className="app-gallery">
          <summary>More screenshots</summary>
          <div className="app-gallery-grid">
            {product.gallery.map(({ alt, light, dark }) => (
              <SafeImage key={light} src={theme === 'dark' && dark ? dark : light} alt={alt} loading="lazy" />
            ))}
          </div>
        </details>
      </section>
      <Callout title="Support and privacy" description="Find help and read the app’s privacy policy.">
        {additionalLinks}
        <PageLink to={`/legal${product.route}/privacy-policy`}>Privacy</PageLink>
        <PageLink to="/contact" primary>Get help</PageLink>
      </Callout>
    </main>
  );
}
