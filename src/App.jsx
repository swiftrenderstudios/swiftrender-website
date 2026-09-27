import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <h1 className="logo">SwiftRender Studios</h1>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact" className="btn-primary">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h2>Professional 3D Architectural Visualization & Renderings</h2>
        <p>Transforming 2D floor plans into photorealistic interior and exterior visual models.</p>
        <a href="#contact" className="cta-button">Get a Quote</a>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <h3>Our Services</h3>
        <div className="grid">
          <div className="card">
            <h4>Interior Renderings</h4>
            <p>Detailed lighting, textures, and spatial layouts for interior design revisions.</p>
          </div>
          <div className="card">
            <h4>Exterior Visualizations</h4>
            <p>High-resolution exterior modeling for residential and commercial structures.</p>
          </div>
          <div className="card">
            <h4>Interactive Whiteboard Collaboration</h4>
            <p>Seamless design revisions using real-time collaborative markup tools.</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <h3>Contact SwiftRender Studios</h3>
        <p>Submit your project details below to receive a proposal and invoice setup.</p>
        
        <form 
          action="https://api.web3forms.com/submit" 
          method="POST" 
          className="contact-form"
        >
          {/* Replace ACCESS_KEY with your free key from Web3Forms */}
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
          <input type="hidden" name="subject" value="New Client Inquiry - SwiftRender Studios" />

          <div className="form-group">
            <label htmlFor="name">Name / Firm Name</label>
            <input type="text" id="name" name="name" required placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required placeholder="client@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Scope & Details</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your rendering project..."></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Project Request</button>
        </form>
      </section>
    </div>
  );
}