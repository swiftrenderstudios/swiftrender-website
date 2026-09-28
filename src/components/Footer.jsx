import { SITE } from '../config/site.js';

/* --- Inline SVG icons (no icon library needed). They inherit colour via `currentColor`. --- */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" strokeWidth="2.4" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5v6" />
      <path d="M8 7.5h.01" strokeWidth="2.4" />
      <path d="M12 16.5v-6" />
      <path d="M12 13c0-1.5 1-2.5 2.5-2.5S17 11.5 17 13v3.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

/**
 * Site footer shared by every page: copyright on the left, social/contact
 * icons on the right (stacked and centred on mobile).
 * Links and the email address come from src/config/site.js.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>&copy; 2026 SwiftRender Studios. All rights reserved.</p>

        <ul className="social-links" aria-label="Social media and contact">
          <li>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} aria-label={`Email ${SITE.email}`} title={SITE.email}>
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}