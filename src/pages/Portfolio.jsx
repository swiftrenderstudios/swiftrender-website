import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { WORK_ITEMS } from '../config/work.js';

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
      {/* Cards are generated from src/config/work.js — add a new project there,
          not here, and it shows up automatically (wraps to a new row every 3). */}
      <section className="section section--tight container">
        <Reveal group className="grid grid--3">
          {WORK_ITEMS.map((item) => (
            <article className="work-card" key={item.title}>
              <div className="work-card__image">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
              <div className="work-card__body">
                <span className="work-card__tag">{item.tag}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      {/* ================================ CTA BAND ============================= */}
      <CtaBand />
    </>
  );
}