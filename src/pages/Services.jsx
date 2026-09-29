import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Services() {
  return (
    <>
      {/* ============================= PAGE HEADER ============================= */}
      <Reveal as="section" className="page-header container">
        <p className="eyebrow">Production Standards</p>
        <h1>Technical specifications, proofing, and dependable delivery.</h1>
      </Reveal>

      {/* =============================== STEP LIST =============================== */}
      <section className="section section--tight container">
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
              <h3>Final High-Quality delivery</h3>
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