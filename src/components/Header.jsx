import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Site header shared by every page. Handles three pieces of self-contained
 * UI state:
 *   - `scrolled`  → adds a solid backdrop once the page scrolls past 40px
 *   - `menuOpen`  → toggles the mobile full-screen nav overlay, locks
 *                   background scroll while open, and closes on Escape or
 *                   on resize back to desktop width
 * Active-page highlighting is handled by <NavLink>'s built-in `isActive`,
 * no manual path comparison needed.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Solid header background after a small scroll threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close the mobile menu on Escape
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Reset menu state if the viewport grows back to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinkClass = ({ isActive }) => (isActive ? 'is-active' : undefined);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        {/* Text-only wordmark: "SwiftRender" in white, "Studios" in gold */}
        <Link to="/" className="brand" onClick={closeMenu} aria-label="SwiftRender Studios — home">
          SwiftRender <span className="brand__accent">Studios</span>
        </Link>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`nav-primary${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary"
        >
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/work" className={navLinkClass} onClick={closeMenu}>Work</NavLink>
          <NavLink to="/process" className={navLinkClass} onClick={closeMenu}>Process</NavLink>
          <NavLink to="/brief" className="btn btn--primary" onClick={closeMenu}>Submit Brief</NavLink>
        </nav>
      </div>
    </header>
  );
}