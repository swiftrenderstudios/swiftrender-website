/**
 * ============================================================================
 *  WORK ITEMS  —  the Work page grid is generated from this list
 * ============================================================================
 *
 *  To add a new project, copy one of the blocks below (including the curly
 *  braces and the comma after it) and paste it into the array, then edit its
 *  four values. The Work page will automatically show a new card — no other
 *  file needs to change, and there's no limit on how many you add (they wrap
 *  into new rows three-per-row automatically).
 *
 *  image → same rule as src/config/images.js: use the *raw* GitHub link
 *    ✅ https://raw.githubusercontent.com/YOUR-USER/YOUR-REPO/main/images/photo.jpg
 *    ❌ https://github.com/YOUR-USER/YOUR-REPO/blob/main/images/photo.jpg
 *  tag   → the small gold label at the top of the card (e.g. "Interior")
 *  title → the card's headline
 *  alt   → a short, plain description of the photo, for screen readers/SEO
 *          (not shown visually)
 * ============================================================================
 */
export const WORK_ITEMS = [
  {
    tag: 'Interior',
    title: 'Modern Residential Living Area',
    alt: 'Modern residential living area render',
    image: 'https://framerusercontent.com/images/weqvgB0zIYt2XuDtlrn7tmbe48.jpg', // ← PASTE LINK HERE
  },
  {
    tag: 'Exterior',
    title: 'Coastal Exterior Facade',
    alt: 'Coastal exterior facade render',
    image: 'https://framerusercontent.com/images/mhRoAJHNG9uZbEM8DkrAjwGp8.jpg', // ← PASTE LINK HERE
  },
  {
    tag: 'Floor Plans',
    title: 'Commercial Hospitality Interior',
    alt: 'Commercial hospitality interior render',
    image: 'https://framerusercontent.com/images/iCiJuxan6KtGOe0ELMvuJ03yOk.jpg', // ← PASTE LINK HERE
  },

  // ── Add your next project below this line ──────────────────────────────
  // {
  //   tag: 'Interior',
  //   title: 'Your Project Title',
  //   alt: 'Short plain-language description of the photo',
  //   image: 'https://raw.githubusercontent.com/your-user/your-repo/main/images/your-photo.jpg',
  // },
];