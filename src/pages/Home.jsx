import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Bring Your Blueprints to <span>Life</span></h1>
        <p>Combining traditional fine arts training with cutting-edge 3D visualization to create stunning architectural renderings.</p>
        <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>Start Your Project</Link>
      </section>

      <div className="page-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Workflow</h2>
        <div className="grid">
          <div className="card">
            <h3>1. Submit Materials</h3>
            <p>Send us your 2D CAD files, sketches, and material boards.</p>
          </div>
          <div className="card">
            <h3>2. Collaborative Review</h3>
            <p>We use interactive whiteboards to manage revisions seamlessly with your team.</p>
          </div>
          <div className="card">
            <h3>3. Final Delivery</h3>
            <p>Receive 4K high-resolution presentation imagery ready for your clients.</p>
          </div>
        </div>
      </div>
    </>
  );
}