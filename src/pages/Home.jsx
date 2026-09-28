import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGES } from '../config/images.js';

export default function Home() {
  return (
    <>
      {/* ================================ HERO ================================ */}
      {/* Two columns: copy on the left, logo emblem on the right (stacks on mobile) */}
      <section className="hero container">
        <div className="hero__layout">
          <Reveal className="hero__copy">
            <p className="eyebrow">SwiftRender Studios · Washington</p>
            <h1>Architectural &amp; Interior Renderings Delivered in 48–72 Hours.</h1>
            <p className="lead">
              We act as an overflow production partner for interior designers, architects, and builders.
              Turning CAD, Revit, and SketchUp files into presentation-ready visuals.
            </p>
            <div className="hero__actions">
              <Link to="/brief" className="btn btn--primary">Submit Project Brief</Link>
              <Link to="/work" className="btn btn--ghost">Explore Portfolio</Link>
            </div>
          </Reveal>

          <Reveal className="hero__emblem" style={{ transitionDelay: '150ms' }}>
            <figure className="emblem">
              <div className="emblem__frame">
                {/* Logo file: public/logo.png (path set in src/config/images.js) */}
                <img src={IMAGES.logo} alt="SwiftRender Studios logo" />
              </div>
              <figcaption className="emblem__caption">Remote 3D Visualization Partner</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <hr className="hairline" />

      {/* ============================ THE HANDOFF ============================= */}
      <Reveal as="section" className="section container">
        <p className="eyebrow">The Handoff</p>
        <h2>Wireframe to 4K finish.</h2>
        <p className="lead">
          From a CAD model to a fully resolved presentation render, every material, light source,
          and camera angle is considered.
        </p>

        <div className="handoff__images">
          <figure className="handoff__figure">
            {/* 📷 Replace this photo in src/config/images.js → handoffSource */}
            <img
              src={IMAGES.handoffSource}
              alt="Untextured wireframe of a source 3D model"
              loading="lazy"
            />
            <figcaption>01 / Source model</figcaption>
          </figure>
          <figure className="handoff__figure">
            {/* 📷 Replace this photo in src/config/images.js → handoffFinal */}
            <img
              src={IMAGES.handoffFinal}
              alt="Final photorealistic render with full lighting and materials"
              loading="lazy"
            />
            <figcaption>02 / Final atmosphere</figcaption>
          </figure>
        </div>
      </Reveal>

      <hr className="hairline" />

      {/* ========================== PORTFOLIO PREVIEW ========================= */}
      <section className="section container">
        <Reveal><p className="eyebrow">Portfolio Preview</p></Reveal>
        <Reveal><h2>Three ways we help you present.</h2></Reveal>

        <Reveal group className="grid grid--3" style={{ marginTop: 'var(--space-4)' }}>
          <article className="offer-card">
            <span className="offer-card__index">01</span>
            <h3>Interior Visualizations</h3>
            <p>Residential living areas, high-end kitchens, bathrooms, and commercial hospitality interiors.</p>
          </article>
          <article className="offer-card">
            <span className="offer-card__index">02</span>
            <h3>Exterior Architecture</h3>
            <p>Residential facades, landscape integration, day-to-dusk lighting passes, and thoughtful site context.</p>
          </article>
          <article className="offer-card">
            <span className="offer-card__index">03</span>
            <h3>3D Floor Plans</h3>
            <p>Fully furnished overhead perspective views tailored for pitch decks and approvals.</p>
          </article>
        </Reveal>
      </section>

      <hr className="hairline" />

      {/* ============================= THE PIPELINE ============================ */}
      <section className="section container">
        <Reveal><p className="eyebrow">The Pipeline</p></Reveal>
        <Reveal><h2>A precise four-step handoff.</h2></Reveal>

        <Reveal group className="step-list">
          <div className="step">
            <span className="step__index">01</span>
            <div>
              <h3>Model &amp; specs submission</h3>
              <p>Upload your working 3D file, project description, and intended visualization.</p>
            </div>
          </div>
          <div className="step">
            <span className="step__index">02</span>
            <div>
              <h3>Draft proofing</h3>
              <p>Review initial draft renders within 48 hours to confirm camera angles and material choice.</p>
            </div>
          </div>
          <div className="step">
            <span className="step__index">03</span>
            <div>
              <h3>Material application</h3>
              <p>We apply exact material specs, realistic lighting physics, and decor styling.</p>
            </div>
          </div>
          <div className="step">
            <span className="step__index">04</span>
            <div>
              <h3>Final High-Resolution delivery</h3>
              <p>Receive publication-ready presentation visuals ready for client approvals.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================ CTA BAND ============================= */}
      <CtaBand />
    </>
  );
}