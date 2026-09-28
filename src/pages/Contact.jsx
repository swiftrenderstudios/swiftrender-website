import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { SITE } from '../config/site.js';

// Options for the project-type dropdown (first one is the default selection)
const PROJECT_TYPES = ['Interior Visualization', 'Exterior Architecture', '3D Floor Plan'];

// Earliest selectable deadline = today (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

/**
 * Project brief page.
 *
 * Submissions are sent to FormSubmit.co (endpoint + email set in
 * src/config/site.js) using fetch, so the visitor stays on the page and sees
 * an inline confirmation instead of being redirected.
 *
 * FormSubmit special fields (the hidden inputs below):
 *   _subject  → subject line of the email you receive
 *   _template → "table" formats the email as a tidy table
 *   _captcha  → "false" turns off FormSubmit's captcha page (AJAX has no page to show it on)
 *   _honey    → hidden spam trap; real visitors never fill it in, bots do
 */
export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState({ state: undefined, message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    setStatus({ state: undefined, message: '' });

    try {
      const response = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      const result = await response.json().catch(() => ({}));
      const rejected = result.success === false || result.success === 'false';

      if (!response.ok || rejected) {
        throw new Error(result.message || 'Submission failed');
      }

      setStatus({
        state: 'success',
        message: "Thanks — we've received your brief and will follow up within 12 hours.",
      });
      form.reset();
      setDeadline('');
    } catch (error) {
      console.error('Brief submission error:', error);
      setStatus({
        state: 'error',
        message: `Something went wrong sending your brief. Please try again or email ${SITE.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ============================= PAGE HEADER ============================= */}
      <Reveal as="section" className="page-header container">
        <p className="eyebrow">Start a Project</p>
        <h1>Submit a project brief</h1>
        <p className="lead">
          Share the essentials and we&apos;ll return a scope, schedule, and next step within 12 hours.
        </p>
      </Reveal>

      {/* ================================ BRIEF FORM =========================== */}
      <section className="section section--tight container">
        <Reveal as="form" className="brief-form" onSubmit={handleSubmit} noValidate>
          {/* FormSubmit configuration (invisible to visitors) */}
          <input type="hidden" name="_subject" value="New project brief — SwiftRender Studios" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          {/* Row 1 */}
          <input type="text" name="name" placeholder="Name" aria-label="Name" autoComplete="name" required />
          <input type="text" name="studio" placeholder="Studio / Firm Name" aria-label="Studio / Firm Name" autoComplete="organization" />

          {/* Row 2 */}
          <input type="email" name="email" placeholder="Email Address" aria-label="Email Address" autoComplete="email" required />
          <input
            type="date"
            name="deadline"
            aria-label="Target deadline"
            min={today}
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className={deadline ? '' : 'is-empty'}
          />

          {/* Row 3 */}
          <select name="project_type" aria-label="Project type" defaultValue={PROJECT_TYPES[0]}>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input type="text" inputMode="url" name="file_link" placeholder="File Link (Drive / WeTransfer)" aria-label="File Link (Drive / WeTransfer)" />

          {/* Row 4 — full width */}
          <textarea
            className="brief-form__full"
            name="description"
            placeholder="Project Description"
            aria-label="Project Description"
            required
          />

          <button type="submit" className="btn btn--primary brief-form__full" disabled={submitting}>
            {submitting ? 'Sending…' : 'Request Estimate'}
          </button>

          <p className="form-status brief-form__full" role="status" aria-live="polite" data-state={status.state}>
            {status.message}
          </p>

          <p className="form-note brief-form__full">
            Prefer email? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>
      </section>
    </>
  );
}