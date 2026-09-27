import React from 'react';

export default function Portfolio() {
  return (
    <div className="page-container">
      <h1>Recent Projects</h1>
      <p style={{ color: 'var(--gray)', marginTop: '0.5rem', marginBottom: '2rem' }}>A showcase of interior and exterior visual models.</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {/* Placeholder images - replace src with your actual render files later */}
        <div style={{ background: '#e2e8f0', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Project Image 1</div>
        <div style={{ background: '#e2e8f0', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Project Image 2</div>
        <div style={{ background: '#e2e8f0', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Project Image 3</div>
        <div style={{ background: '#e2e8f0', height: '300px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Project Image 4</div>
      </div>
    </div>
  );
}