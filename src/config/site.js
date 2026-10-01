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

  // Our own Cloudflare Pages Function — see functions/api/brief.js and
  // EMAIL_SETUP.md. This replaced FormSubmit after repeated 500 errors
  // there; a relative path means it's always same-origin (this site calling
  // its own backend), so there's nothing external to go down independently.
  formEndpoint: '/api/brief',
};