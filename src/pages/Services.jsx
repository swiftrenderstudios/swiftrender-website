import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="page-container">
      <h1>Our Expertise</h1>
      <p style={{ color: 'var(--gray)', marginTop: '0.5rem' }}>Specialized rendering support for interior designers, architects, and builders.</p>
      
      <div className="grid">
        <div className="card">
          <h3>Interior Renderings</h3>
          <p>Photorealistic lighting, textures, and spatial layouts perfect for showcasing interior design concepts before construction begins.</p>
        </div>
        <div className="card">
          <h3>Exterior Visualizations</h3>
          <p>High-fidelity exterior modeling for residential and commercial structures, integrating landscape and natural lighting.</p>
        </div>
        <div className="card">
          <h3>3D Floor Plans</h3>
          <p>Upgrading standard 2D blueprints into fully furnished, immersive 3D isometric cutaways.</p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Ready to collaborate?</h2>
        <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Request a Proposal</Link>
      </div>
    </div>
  );
}