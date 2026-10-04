import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import Faq from '../components/Faq.jsx';
import { SITE } from '../config/site.js';

// Options for the project-type dropdown (first one is the default selection)
const PROJECT_TYPES = ['Interior Visualization', 'Exterior Architecture', '3D Floor Plan'];

// Options for the industry dropdown — kept in the same order as the
// "Who We Serve" cards on the Home page. Add/edit both places together if
// this list changes; "Other" is a catch-all not on the Home page.
const INDUSTRIES = [
  'Architect',
  'Real Estate Developer',
  'Interior Designer',
  'Construction / Home Building Firm',
  'Real Estate Agent',
  'Product Manufacturer',
  'Marketing / Advertising Agency',
  'Other',
];

// Earliest selectable deadline = today (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

/**
 * Project brief page.
 *
 * Submits via fetch() to our own backend at SITE.formEndpoint
 * (worker/index.js, our Cloudflare Worker), so the visitor
 * stays on this page and sees an inline confirmation instead of navigating
 * away. That function emails both the studio and an auto-reply to the
 * client via Resend — see worker/index.js for the required runtime secret.
 *
 * This replaced FormSubmit after it started returning 500 errors — first on
 * a reCAPTCHA-enabled path, then again on the plain AJAX path that had
 * previously been reliable. That's a real, independently-reported pattern
 * with FormSubmit's uptime, not something fixable from this side. Running
 * our own tiny backend on infrastructure you already control (Cloudflare)
 * removes that dependency entirely, and both Cloudflare Pages Functions and
 * Resend's free tiers are free with no time limit at this site's scale.
 *
 * _honey is a hidden spam trap — real visitors never fill it in, bots do;
 * the backend silently no-ops if it's filled rather than erroring.
 *
 * Every visible field is `required`, so the browser blocks submission until
 * all of them are filled in — and the backend validates the same fields
 * again server-side, since client-side `required` can be bypassed.
 */
export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [dateFocused, setDateFocused] = useState(false);
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

      // Only treat the submission as sent if our backend explicitly says so.
      // (If the request ever lands on something that isn't the Worker — e.g.
      // the static site returning HTML — there's no JSON `success: true`, so
      // we show an error instead of a false "Thanks!".)
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Submission failed');
      }

      setStatus({
        state: 'success',
        message: "Thank you! We've received your brief and will follow up as soon as we can. You should receive a confirmation email shortly. If you don't receive it, please check your spam folder.",
      });
      form.reset();
      setDeadline('');
    } catch (error) {
      console.error('Brief submission error:', error);
      // Show the specific reason from worker/index.js when we have
      // one (e.g. "Missing field: email", "RESEND_API_KEY is not
      // configured") instead of only a generic message — this is what was
      // making the real cause invisible without digging through Cloudflare's
      // function logs.
      const detail = error instanceof Error && error.message && error.message !== 'Submission failed' ? ` (${error.message})` : '';
      setStatus({
        state: 'error',
        message: `Something went wrong sending your brief${detail}. Please try again or email ${SITE.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Show the "mm/dd/yyyy" hint text as our own label only while the field is
  // both empty AND not focused — see the CSS comment on .field--date for why.
  const showDateHint = !deadline && !dateFocused;

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
        <Reveal
          as="form"
          className="brief-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Spam trap our own backend checks for — see worker/index.js */}
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          {/* Row 1 */}
          <input type="text" name="name" placeholder="Full Name" aria-label="Full Name" autoComplete="name" required />
          <input type="text" name="studio" placeholder="Studio / Firm Name" aria-label="Studio / Firm Name" autoComplete="organization" required />

          {/* Row 2 */}
          <input type="email" name="email" placeholder="Email Address" aria-label="Email Address" autoComplete="email" required />
          <div className="field--date">
            <input
              type="date"
              name="deadline"
              aria-label="Target completion date"
              min={today}
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              className={showDateHint ? 'is-empty' : ''}
              required
            />
            {showDateHint && <span className="field--date__hint">Target Completion Date</span>}
          </div>

          {/* Row 3 */}
          <select name="project_type" aria-label="Project type" defaultValue={PROJECT_TYPES[0]} required>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select name="industry" aria-label="Industry" defaultValue={INDUSTRIES[0]} required>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          {/* Row 4 — full width */}
          <input type="text" inputMode="url" name="file_link" className="brief-form__full" placeholder="File Link (Drive / WeTransfer)" aria-label="File Link (Drive / WeTransfer)" required />

          {/* Row 5 — full width */}
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

      {/* ================================ FAQ =========================== */}
      <Faq />
    </>
  );
}