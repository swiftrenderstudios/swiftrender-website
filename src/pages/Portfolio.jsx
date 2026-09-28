import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGES } from '../config/images.js';

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
              {/* 📷 Replace this photo in src/config/images.js → workInterior */}
              <img
                src={IMAGES.workInterior}
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
              {/* 📷 Replace this photo in src/config/images.js → workExterior */}
              <img
                src={IMAGES.workExterior}
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
              {/* 📷 Replace this photo in src/config/images.js → workFloorPlan */}
              <img
                src={IMAGES.workFloorPlan}
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
      </section>

      {/* ================================ CTA BAND ============================= */}
      <CtaBand />
    </>
  );
}