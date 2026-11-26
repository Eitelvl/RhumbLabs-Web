import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { Link, type LinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';

export function ActionLink({
  icon: Icon = ArrowUpRight, variant = 'secondary', className = '', children, ...props
}: LinkProps & { icon?: LucideIcon | null; variant?: 'primary' | 'secondary' | 'inline' }) {
  return (
    <Link className={`marketing-action marketing-action-${variant} ${className}`} {...props}>
      <span>{children}</span>{Icon && <Icon size={16} aria-hidden />}
    </Link>
  );
}

export function PageIntro({ title, description }: { title: string; description?: string }) {
  return (
    <header className="marketing-band page-intro">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}

export function SiteCallout({ title, description, children, id }: {
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="marketing-band marketing-callout" id={id}>
      <div><h2>{title}</h2><p>{description}</p></div>
      <div className="marketing-actions">{children}</div>
    </section>
  );
}
