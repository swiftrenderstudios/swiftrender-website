import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

export default function Portfolio() {
  return (
    <>
      {/* ============================= PAGE HEADER ============================= */}
      <Reveal as="section" className="page-header container">
        <p className="eyebrow">Selected Work</p>
        <h1>Visuals made to move design decisions forward.</h1>
        <p className="lead">
          A focused selection of architectural visualizations across interiors, exterior architecture,
          and floor plans.
        </p>
      </Reveal>

      {/* =============================== WORK GRID ============================== */}
      <section className="section section--tight container">
        <Reveal group className="grid grid--3">
          <article className="work-card">
            <div className="work-card__image">
              <img
                src="https://framerusercontent.com/images/weqvgB0zIYt2XuDtlrn7tmbe48.jpg"
                alt="Modern residential living area render"
                loading="lazy"
              />
            </div>
            <div className="work-card__body">
              <span className="work-card__tag">Interior</span>
              <h3>Modern Residential Living Area</h3>
            </div>
          </article>

          <article className="work-card">
            <div className="work-card__image">
              <img
                src="https://framerusercontent.com/images/mhRoAJHNG9uZbEM8DkrAjwGp8.jpg"
                alt="Coastal exterior facade render"
                loading="lazy"
              />
            </div>
            <div className="work-card__body">
              <span className="work-card__tag">Exterior</span>
              <h3>Coastal Exterior Facade</h3>
            </div>
          </article>

          <article className="work-card">
            <div className="work-card__image">
              <img
                src="https://framerusercontent.com/images/iCiJuxan6KtGOe0ELMvuJ03yOk.jpg"
                alt="Commercial hospitality interior render"
                loading="lazy"
              />
            </div>
            <div className="work-card__body">
              <span className="work-card__tag">Floor Plans</span>
              <h3>Commercial Hospitality Interior</h3>
            </div>
          </article>
        </Reveal>

        {/* Project detail list, paired 1:1 with the cards above */}
        <Reveal group className="work-detail-list">
          <div className="work-detail">
            <span className="work-detail__index">01</span>
            <p><strong>Modern Residential Living Area</strong> — 48-hour draft turn with first-pass finish approval.</p>
          </div>
          <div className="work-detail">
            <span className="work-detail__index">02</span>
            <p><strong>Coastal Exterior Facade</strong> — Lighting and material pass for client presentation.</p>
          </div>
          <div className="work-detail">
            <span className="work-detail__index">03</span>
            <p><strong>Commercial Hospitality Interior</strong> — Exact FF&amp;E specification mapping.</p>
          </div>
        </Reveal>
      </section>

      {/* ================================ CTA BAND ============================= */}
      <Reveal as="section" className="cta-band container">
        <h2>Need an overflow partner for your next design pitch?</h2>
        <Link to="/brief" className="btn btn--primary">Request an Estimate</Link>
      </Reveal>
    </>
  );
}