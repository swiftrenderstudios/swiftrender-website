import { IMAGES } from './images.js';

/**
 * ============================================================================
 *  RENDER VIDEO  —  paste your video link here
 * ============================================================================
 *
 *  Shown on the Home page, right under "Wireframe to High-Quality finish."
 *
 *  src    → same rule as the photos in images.js / work.js: use a *direct*
 *           file link, not a page link.
 *             ✅ https://raw.githubusercontent.com/YOUR-USER/YOUR-REPO/main/videos/showreel.mp4
 *             ❌ https://github.com/YOUR-USER/YOUR-REPO/blob/main/videos/showreel.mp4
 *           .mp4 (H.264) is the safest format for browser support.
 *
 *  poster → the thumbnail shown before the video is played. Defaults to the
 *           same "final atmosphere" photo already used on the Home page, so
 *           there's nothing blank while VIDEO_URL is still a placeholder —
 *           swap it once you have a real preview frame, or leave it.
 *
 *  NOTE: video files are much larger than photos. GitHub raw links work fine
 *  to get this running, but for the live site, a dedicated video host (e.g.
 *  Cloudflare Stream, Mux, Vimeo) or your eventual hosting provider will
 *  load faster and more reliably than hot-linking GitHub for a big file.
 * ============================================================================
 */
export const RENDER_VIDEO = {
  src: 'REPLACE_WITH_YOUR_VIDEO_URL.mp4', // ← PASTE VIDEO LINK HERE
  poster: IMAGES.handoffFinal,
};