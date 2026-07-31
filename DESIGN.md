# Design

## Theme

Dark cinematic stage. Near-black backgrounds (`--color-void` for the page, `--color-ink` for stacked panels) with warm orange practical-light accents and a soft blue monitor-glow secondary, glassmorphism surfaces, and soft, layered gradients/vignettes for depth. Motion is slow and premium (`--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1)`), never bouncy.

## Color

Defined as Tailwind v4 `@theme` tokens in [globals.css](src/app/globals.css):

| Token | Value | Usage |
|---|---|---|
| `--color-void` | `#05060a` | Page background |
| `--color-ink` | `#0b0d13` | Stacked section backgrounds (panels sitting "in front of" the void) |
| `--color-mist` | `#d7dae1` | Base foreground text color |
| `--color-accent-orange` | `#ff7a3c` | Primary accent — glows, gradients, CTAs |
| `--color-accent-orange-soft` | `#ffb37a` | Taglines, secondary accent text, softer glows |
| `--color-accent-blue` | `#4fb8ff` | Secondary "monitor glow" accent, used sparingly |
| `--color-glass` | `rgba(255,255,255,0.07)` | Glass panel fill |
| `--color-glass-border` | `rgba(255,255,255,0.14)` | Glass panel border |

Text/heading colors use one recurring off-white, `#f5f2ec`, rather than pure white, for warmth. Body copy sits at reduced opacity against its background (`text-white/70`, `text-white/50`) rather than a separate gray token.

## Typography

Geist Sans (via `next/font/google`, exposed as `--font-geist-sans`) for all UI text. No serif or display-only webfont — hierarchy comes from size/weight/spacing, not a second family. Taglines are small, uppercase, wide-tracked (`text-[0.75rem] tracking-[0.28em] uppercase text-accent-orange-soft`). Headings are bold/extrabold with tight tracking; the hero name uses a slow animated gradient sheen (`animate-sheen`) as its one typographic flourish — used once, not on every heading.

## Motion

GSAP is the motion engine everywhere (no Framer Motion / `motion` in this project). Patterns established so far:

- **Entrance:** `gsap.timeline` on mount for above-the-fold content (hero), `ScrollTrigger` with `start: "top 85%"` / `toggleActions: "play none none reverse"` for content further down the page (experience timeline items).
- **Ambient/looping:** small custom `@keyframes` + Tailwind `--animate-*` theme tokens for simple CSS-drivable loops (`sheen`, `pulse-dot`, `float-hint`, `travel-line`); GSAP-driven `requestAnimationFrame`-style tweens for anything needing per-frame JS logic (the Three.js particle field's sine-wave drift, the timeline rail's scroll-scrubbed draw-in).
- **Parallax:** damped lerp toward a mouse-driven target (see `CinematicLayer.tsx`'s camera parallax) rather than directly binding to raw pointer position — keeps motion slow and "premium," never twitchy.
- **Reduced motion:** every ambient/looping effect checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and either skips entirely or renders a static equivalent. Direct-response transitions (hover/focus feedback) are kept regardless — only *ambient/automatic* motion is gated.

## Components

- **Glass panel:** `rounded-2xl border border-glass-border bg-glass backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]` — used for the experience timeline cards and the hero's control buttons (smaller radius there).
- **Monogram avatar:** a small circle, `bg-[linear-gradient(135deg,var(--color-accent-orange),var(--color-accent-orange-soft))] text-ink font-bold`, used where a real logo/photo isn't available (company avatars in the experience timeline).
- **Pill badge:** `rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] text-white/65` — tech/skill tags.
- **Section header:** small uppercase orange tagline + bold heading + one supporting sentence, centered, `mb-16 lg:mb-20` above the section body. Used identically by the Experience section; reuse rather than reinvent per-section.
- **Section stacking:** each content section below the hero is an `id`-anchored `<section>` with `bg-ink`, `rounded-t-[clamp(20px,3vw,40px)]`, and a large negative-offset box-shadow (`shadow-[0_-60px_120px_-40px_rgba(0,0,0,0.7)]`) so it visually "rises" over the sticky hero as the user scrolls.
- **Floating overlap card (Projects gallery):** a full-width screenshot with a smaller `accent-orange-soft`-bordered glass card overlapping one of its bottom corners (alternating left/right per project). On mobile the card stacks below the image in normal flow (`relative`, `-mt-8` overlap); from `sm:` up it switches to `absolute` corner positioning (`sm:w-[300px] lg:w-[320px]`). Keep those breakpoint-specific layout modes — collapsing them into a single strategy was the root cause of a previous layout bug.
- **Academics timeline (left rail):** a single left-aligned vertical rail (`data-academics-rail`) with orange-gradient milestone badges (graduation cap SVG or level number) and glass cards for each degree. BCA semester marks render in a slightly tilted dark glass table (`sm:-rotate-2`); mobile uses horizontal scroll without tilt. Certificate/marksheet previews open in a native `<dialog>` lightbox (`CertificateDialog.tsx`), not a new tab.
- **Academics illustration (right column):** `numan-learning.png` with a glass speech bubble linking to `#skills`, ambient float loop on the illustration (GSAP `sine.inOut`, gated by reduced motion). Two-column grid at `lg:` (`lg:grid-cols-[1fr_min(420px,38%)]`); stacks below the timeline on smaller viewports.

## Layout

Tailwind CSS v4 utility classes only — no CSS Modules, no separate stylesheets per component. Arbitrary values (`clamp()`, custom gradients, precise shadows) are used liberally rather than fighting the default scale when a design needs a specific number. Responsive breakpoints lean on Tailwind's `lg:` (1024px) for the main desktop/mobile split seen in the experience timeline (alternating rail vs. stacked single column).

## Icons

Hand-rolled inline SVG for playback controls and the academics graduation-cap badge. `react-icons/si` is used for recognizable brand/tech logos in the Skills section and GitHub links in Projects; keep using that subpath for future tech-logo needs rather than mixing in a second icon set.
