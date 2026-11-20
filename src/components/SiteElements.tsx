import type { ReactNode } from 'react';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { Link, type LinkProps } from 'react-router-dom';

type PageLinkProps = LinkProps & {
  primary?: boolean;
  inline?: boolean;
  icon?: LucideIcon;
};

export function PageLink({ children, primary, inline, icon: Icon = ArrowUpRight, className = '', ...props }: PageLinkProps) {
  return (
    <Link className={`${inline ? 'ui-inline' : 'ui-action'}${primary ? ' ui-primary' : ''} ${className}`} {...props}>
      <span>{children}</span>
      <Icon size={16} aria-hidden />
    </Link>
  );
}

export function PageIntro({ title, description }: { title: string; description?: string }) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}

export function Callout({ title, description, children, id }: {
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="page-callout" id={id}>
      <div><h2>{title}</h2><p>{description}</p></div>
      <div className="ui-actions">{children}</div>
    </section>
  );
}

export function ProjectCallout({ id }: { id?: string }) {
  return (
    <Callout title="Have a project in mind?" description="Tell us what you want to build." id={id}>
      <PageLink to="/contact" primary>Let’s talk</PageLink>
    </Callout>
  );
}
