import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

/**
 * Closing call-to-action band, shared by Home, Portfolio and Services so the
 * layout is defined once. The outer <section> draws the hairline; the inner
 * container lays the heading and button out side by side (see `.cta-band*`
 * in index.css).
 */
export default function CtaBand() {
  return (
    <section className="cta-band">
      <Reveal className="container cta-band__inner">
        <h2 className="cta-band__title">Need an overflow partner for your next design pitch?</h2>
        <Link to="/brief" className="btn btn--primary">Request an Estimate</Link>
      </Reveal>
    </section>
  );
}