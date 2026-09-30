import { IMAGES } from './images.js';

/**
 * ============================================================================
 *  RENDER VIDEO
 * ============================================================================
 *
 *  Shown on the Home page, right under the day/night photo pair.
 *
 *  Unlike the photos, this points at a LOCAL file in /public, not a GitHub
 *  link — see the note below for why.
 *
 *  You already pushed the video to your repo at:
 *    public/outdoor-kitchen-exterior-video.mp4
 *  Vite serves everything in /public at the site's root automatically (this
 *  is the same reason logo.png below works as just "/logo.png"), so that
 *  file is already reachable at "/outdoor-kitchen-exterior-video.mp4" —
 *  nothing else to configure. If you rename or move the file, update src
 *  below to match.
 *
 *  WHY LOCAL INSTEAD OF A GITHUB LINK:
 *  A GitHub "blob" page URL (github.com/.../blob/...) is an HTML page, not
 *  the actual video file, so a <video> tag can't play it directly — that's
 *  why it looked broken. GitHub does have a true raw-file URL for any file,
 *  video included: swap "github.com" for "raw.githubusercontent.com" and
 *  drop "/blob/", e.g.
 *    https://raw.githubusercontent.com/USER/REPO/main/public/file.mp4
 *  (Right-clicking GitHub's "Download" button → "Copy link address" gives
 *  you this same URL without downloading the file.) That would have worked
 *  — but since you're deploying via Cloudflare Pages from this same repo,
 *  the file is already part of your deployed site, so pointing at your own
 *  domain is simpler and faster than fetching it from GitHub on every page
 *  load (GitHub's raw-content servers aren't meant to be used as a CDN, and
 *  serve video with weaker range-request support, which can mean choppier
 *  seeking/looping).
 *
 *  A NOTE ON FILE SIZE: Cloudflare Pages rejects any single deployed file
 *  over 25 MiB (their limit, not ours). A short, muted, looping clip like
 *  this one should sit well under that after running
 *  scripts/watermark_videos.py — but if a video ever fails to deploy, that
 *  limit is almost certainly why. For anything larger, or if you build out
 *  a real video library later, Cloudflare Stream (a separate product) is
 *  the right tool — ask if you want help wiring that up when you get there.
 * ============================================================================
 */
export const RENDER_VIDEO = {
  src: '/outdoor-kitchen-exterior-video.mp4',
  poster: IMAGES.handoffFinal,
};