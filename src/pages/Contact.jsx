import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
 * IMPORTANT — why this form is a plain HTML POST instead of fetch():
 * FormSubmit's customer-confirmation email ("_autoresponse") is explicitly
 * documented to NOT work on AJAX submissions, and NOT work when reCAPTCHA is
 * disabled. Both were true in the previous version, which is why the
 * confirmation email never arrived — not a bug, just an unsupported
 * combination on FormSubmit's end. So this version:
 *   - submits as a normal <form action="..." method="POST"> (no fetch)
 *   - leaves reCAPTCHA ON (no "_captcha": "false" field)
 *   - uses "_next" to send the visitor back to /brief?sent=true afterward,
 *     which this component detects and swaps in a thank-you view
 *
 * The trade-off: the visitor now leaves the site for a moment. FormSubmit
 * shows its own brief interstitial (and, the first time a browser looks
 * suspicious, a reCAPTCHA check) before redirecting back. There's no way to
 * keep the fully inline, no-reload experience AND get the automatic
 * customer email — that's a limitation of FormSubmit's free tier, not
 * something fixable in this code. If you'd rather have the smooth inline
 * submission back and skip the auto-email, say so and I'll revert this part.
 *
 * FormSubmit special fields (the hidden inputs below):
 *   _subject      → subject line of the email you receive
 *   _template     → "table" formats the email as a tidy table
 *   _next         → URL FormSubmit redirects to after a successful submission
 *   _autoresponse → sent back to whatever address was typed into the field
 *                   named "email" below — the client's confirmation email
 *   _honey        → hidden spam trap; real visitors never fill it in, bots do
 *
 * Every visible field is `required`, so the browser blocks submission until
 * all of them are filled in.
 */
export default function Contact() {
  const [searchParams] = useSearchParams();
  const justSubmitted = searchParams.get('sent') === 'true';

  const [deadline, setDeadline] = useState('');
  const [dateFocused, setDateFocused] = useState(false);

  // Client-side validation only; if the form is valid we let the browser
  // submit it normally (no preventDefault) so FormSubmit's redirect flow works.
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
    }
  };

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/brief?sent=true` : '/brief?sent=true';

  // Show the "mm/dd/yyyy" hint text as our own label only while the field is
  // both empty AND not focused — see the CSS comment on .field--date for why.
  const showDateHint = !deadline && !dateFocused;

  return (
    <>
      {/* ============================= PAGE HEADER ============================= */}
      <Reveal as="section" className="page-header container">
        <p className="eyebrow">Start a Project</p>
        {justSubmitted ? (
          <>
            <h1>Thanks — your brief is in.</h1>
            <p className="lead">
              We&apos;ve sent a confirmation to the email you provided and will follow up with a scope,
              schedule, and next step within 12 hours. In the meantime, feel free to browse our{' '}
              <Link to="/work">recent work</Link>.
            </p>
          </>
        ) : (
          <>
            <h1>Submit a project brief</h1>
            <p className="lead">
              Share the essentials and we&apos;ll return a scope, schedule, and next step within 12 hours.
            </p>
          </>
        )}
      </Reveal>

      {/* ================================ BRIEF FORM =========================== */}
      {!justSubmitted && (
      <section className="section section--tight container">
        <Reveal
          as="form"
          className="brief-form"
          action={SITE.formActionUrl}
          method="POST"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* FormSubmit configuration (invisible to visitors) */}
          <input type="hidden" name="_subject" value="New project brief — SwiftRender Studios" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={nextUrl} />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thanks for reaching out to SwiftRender Studios! We've received your project brief and will get back to you as soon as we can."
          />
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

          <button type="submit" className="btn btn--primary brief-form__full">Request Estimate</button>

          <p className="form-note brief-form__full">
            Prefer email? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>
      </section>
      )}

      {/* ================================ FAQ =========================== */}
      <Faq />
    </>
  );
}