/**
 * Site footer shared by every page.
 * Pass `light` on pages that sit on a white section (currently just the
 * brief/contact page) so the hairline and text colors adapt correctly.
 */
export default function Footer({ light = false }) {
  return (
    <footer className={`site-footer${light ? ' section--light' : ''}`}>
      <div className="container">
        <p>&copy; 2026 SwiftRender Studios. Remote 3D Visualization Partner.</p>
      </div>
    </footer>
  );
}