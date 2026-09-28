import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router keeps the previous scroll position when navigating between
 * pages, so clicking "Request an Estimate" at the bottom of a page would drop
 * you halfway down the brief form. This renders nothing; it just jumps to the
 * top whenever the route changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'instant' overrides the site-wide `scroll-behavior: smooth` for page changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}