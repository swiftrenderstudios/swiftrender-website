import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';

/**
 * This is a static front end with no backend attached, so the form is
 * progressively enhanced to show an inline confirmation instead of
 * performing a real network submission. Replace the body of
 * `handleSubmit`'s setTimeout with a real request — e.g.:
 *
 *   const response = await fetch('/your-endpoint', {
 *     method: 'POST',
 *     body: new FormData(form),
 *   });
 *
 * — when you have a form endpoint, CRM, or serverless function ready.
 * The validation and status-message UI around it can stay as-is.
 */
export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ state: undefined, message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      setStatus({
        state: 'success',
        message: "Thanks — we've received your brief and will follow up within 12 hours.",
      });
      setSubmitting(false);
      form.reset();
    }, 600);
  };

  return (
    <section className="section section--light">
      <div className="container brief-layout">
        <Reveal>
          <p className="eyebrow">Start a Project</p>
          <h2>Submit a project brief</h2>
          <p className="lead">Share the essentials and we'll return a scope, schedule, and next step within 12 hours.</p>
        </Reveal>

        <Reveal as="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input type="text" id="name" name="name" autoComplete="name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" autoComplete="email" required />
          </div>

          <div className="field">
            <label htmlFor="company">Studio / company (optional)</label>
            <input type="text" id="company" name="company" autoComplete="organization" />
          </div>

          <div className="field">
            <label id="project-type-label">Project type</label>
            <div className="type-choice" role="group" aria-labelledby="project-type-label">
              <input type="radio" id="type-interior" name="project_type" value="Interior Visualization" required />
              <label htmlFor="type-interior">Interior Visualization</label>

              <input type="radio" id="type-exterior" name="project_type" value="Exterior Architecture" />
              <label htmlFor="type-exterior">Exterior Architecture</label>

              <input type="radio" id="type-floorplan" name="project_type" value="3D Floor Plan" />
              <label htmlFor="type-floorplan">3D Floor Plan</label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="details">Project details</label>
            <textarea
              id="details"
              name="details"
              placeholder="Tell us about the space, file formats you have (CAD, Revit, SketchUp), timeline, and any reference imagery."
              required
            />
          </div>

          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? 'Sending…' : 'Request Estimate'}
          </button>

          <p className="form-status" role="status" aria-live="polite" data-state={status.state}>
            {status.message}
          </p>

          <p className="form-note">
            Questions? Contact <a href="mailto:contact@swiftrenderstudios.com">contact@swiftrenderstudios.com</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}