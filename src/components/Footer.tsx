import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Rhumb Labs</span>
      <nav aria-label="Footer navigation">
        <Link to="/legal">Legal Center</Link>
        <Link to="/delete-account">Data Deletion</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  );
}
