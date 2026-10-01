import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { IMAGES } from '../config/images.js';
import { RENDER_VIDEO } from '../config/video.js';
import { WORK_ITEMS } from '../config/work.js';

// How long each slide stays up before crossfading to the next, in ms.
const SLIDE_DURATION = 5000;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance the hero slideshow. Skips entirely (stays on the first
  // image, no motion) if the visitor's OS has reduced-motion on, or if
  // there's only one work item to show.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || WORK_ITEMS.length <= 1) return undefined;

    const id = setInterval(() => {
      setActiveSlide((current) => (current + 1) % WORK_ITEMS.length);
    }, SLIDE_DURATION);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ================================ HERO ================================ */}
      {/* Full-bleed slideshow of every project in config/work.js, crossfading
          behind the headline. Swap which project leads by reordering work.js
          — whatever's first (index 0) is the first slide shown. */}
      <section className="hero-slideshow">
        <div className="hero-slideshow__slides" aria-hidden="true">
          {WORK_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`hero-slideshow__slide${index === activeSlide ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
        <div className="hero-slideshow__scrim" />

        <Reveal as="div" className="container hero-slideshow__content">
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

        {/* Dot indicators — also clickable, so a visitor can jump to (and
            linger on) a specific project instead of waiting for it to cycle. */}
        <div className="hero-slideshow__dots" role="tablist" aria-label="Featured projects">
          {WORK_ITEMS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Show ${item.title}`}
              className={`hero-slideshow__dot${index === activeSlide ? ' is-active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <hr className="hairline" />

      {/* ============================ THE HANDOFF ============================= */}
      <Reveal as="section" className="section container">
        <p className="eyebrow">The Handoff</p>
        <h2>Wireframe to High-Quality finish.</h2>
        <p className="lead">
          From a CAD model to a fully resolved presentation render, every material, light source,
          and camera angle is considered.
        </p>

        <div className="handoff__images">
          <figure className="handoff__figure">
            {/* 📷 Replace this photo in src/config/images.js → handoffSource */}
            <img
              src={IMAGES.handoffSource}
              alt="Outdoor kitchen render in daylight"
              loading="lazy"
            />
            <figcaption>01 / Daylight</figcaption>
          </figure>
          <figure className="handoff__figure">
            {/* 📷 Replace this photo in src/config/images.js → handoffFinal */}
            <img
              src={IMAGES.handoffFinal}
              alt="Outdoor kitchen render at night"
              loading="lazy"
            />
            <figcaption>02 / Nightfall</figcaption>
          </figure>
        </div>

        {/* Video file lives in src/config/video.js → RENDER_VIDEO.src.
            autoPlay + loop + muted plays it on its own, on repeat, silently —
            autoPlay only works in browsers when muted is also set. No
            "controls" prop, so the visitor can't pause/seek/unmute it. */}
        <div className="handoff__video">
          <p className="eyebrow">In Motion</p>
          <video
            className="handoff__video-player"
            src={RENDER_VIDEO.src}
            poster={RENDER_VIDEO.poster}
            aria-label="Looping animation of the rendered scene"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
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

        {/* ========================== WHO WE SERVE =========================== */}
        <div className="audience-block">
          <Reveal><p className="eyebrow">Who We Serve</p></Reveal>
          <Reveal><h3>Trusted by teams across the industry.</h3></Reveal>

          <Reveal group className="grid grid--2" style={{ marginTop: 'var(--space-4)' }}>
            <article className="offer-card">
              <h3>Architects</h3>
              <p>To test design concepts, pitch ideas, and win municipal or client approvals before building begins.</p>
            </article>
            <article className="offer-card">
              <h3>Real Estate Developers</h3>
              <p>To pre-sell properties, attract investors, and market unbuilt residential or commercial spaces.</p>
            </article>
            <article className="offer-card">
              <h3>Interior Designers</h3>
              <p>To visualize layouts, test color schemes, and show clients realistic previews of finished rooms.</p>
            </article>
            <article className="offer-card">
              <h3>Construction &amp; Home Building Firms</h3>
              <p>To align construction teams on project goals and present realistic blueprints to buyers.</p>
            </article>
            <article className="offer-card">
              <h3>Real Estate Agents</h3>
              <p>To market listings, stage properties virtually, and help buyers visualize potential renovations.</p>
            </article>
            <article className="offer-card">
              <h3>Product Manufacturers</h3>
              <p>To launch new consumer goods and create marketing images or 3D animations without needing physical prototypes.</p>
            </article>
            <article className="offer-card">
              <h3>Marketing &amp; Advertising Agencies</h3>
              <p>To build high-impact visual campaigns for clients in hospitality, retail, and luxury real estate.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <hr className="hairline" />

      {/* ============================= THE PIPELINE ============================ */}
      <section className="section container">
        <Reveal><p className="eyebrow">The Pipeline</p></Reveal>
        <Reveal><h2>A precise five-step handoff.</h2></Reveal>

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
              <h3>Revision cycles included</h3>
              <p>Up to 2 rounds of minor material and lighting adjustments prior to final delivery.</p>
            </div>
          </div>
          <div className="step">
            <span className="step__index">05</span>
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