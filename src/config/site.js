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

  // FormSubmit.co AJAX endpoint — submissions are emailed to EMAIL.
  // The very first submission triggers an activation email to that address;
  // click the link inside it once and every later submission is delivered.
  formEndpoint: `https://formsubmit.co/ajax/${EMAIL}`,
};