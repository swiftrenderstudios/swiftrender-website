import React from 'react';

export default function Contact() {
  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Get a Quote</h1>
      <p style={{ color: 'var(--gray)', marginTop: '0.5rem', marginBottom: '2rem' }}>Submit your project details below to receive a proposal.</p>
      
      <div className="card">
        {/* REPLACE YOUR_EMAIL@EXAMPLE.COM below */}
        <form action="https://formsubmit.co/YOUR_EMAIL@EXAMPLE.COM" method="POST">
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Website Inquiry - SwiftRender" />

          <div className="form-group">
            <label htmlFor="name">Name / Firm Name</label>
            <input type="text" id="name" name="name" required placeholder="John Doe Architects" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="hello@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="projectType">Service Required</label>
            <select id="projectType" name="project_type">
              <option value="Interior Rendering">Interior Rendering</option>
              <option value="Exterior Rendering">Exterior Rendering</option>
              <option value="3D Floor Plan">3D Floor Plan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Scope & Details</label>
            <textarea id="message" name="message" rows="6" required placeholder="Tell us about your timeline, deliverables, and any file links (Dropbox/Drive)..."></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Request</button>
        </form>
      </div>
    </div>
  );
}