/**
 * Site-wide settings in one place.
 * Change a value here and it updates everywhere it's used
 * (footer icons, contact form, form endpoint).
 */
const EMAIL = 'info@swiftrenderstudios.com';

export const SITE = {
  name: 'SwiftRender Studios',
  email: EMAIL,

  social: {
    instagram: 'https://www.instagram.com/swiftrenderstudios/',
    linkedin: 'https://www.linkedin.com/company/swiftrender-studios/',
  },

  // FormSubmit.co endpoint — submissions are emailed to EMAIL.
  // The very first submission triggers an activation email to that address;
  // click the link inside it once and every later submission is delivered.
  //
  // NOTE: this deliberately points at FormSubmit's classic (non-AJAX) URL.
  // Per FormSubmit's own docs, the customer-confirmation "_autoresponse"
  // feature does not work on AJAX submissions or on forms with reCAPTCHA
  // disabled — see the comment above the form in pages/Contact.jsx.
  formActionUrl: `https://formsubmit.co/${EMAIL}`,
};