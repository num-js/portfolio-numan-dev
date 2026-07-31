# Product

## Register

brand

## Platform

web

## Users

Two audiences, weighted equally: recruiters and hiring managers deciding whether to interview or hire, and potential freelance/consulting clients evaluating whether to work with Numan directly. Both arrive with the same question — "is this person's craft good enough to trust with real work?" — and judge the site itself as the first proof point.

## Product Purpose

A personal developer portfolio that doubles as a demonstration of the exact craft it's advertising: cinematic motion, premium visual polish, and technical depth, built with Next.js, Three.js, GSAP, and Tailwind. Success looks like a visitor leaving convinced this person treats frontend craft as a discipline, not an afterthought — and taking the next step (getting in touch, or pulling the resume).

## Positioning

An engineer who treats visual and motion craft as part of the product, not decoration — every section should reinforce that the same care applied to the hero's cinematic video treatment extends through the rest of the experience.

## Conversion & proof

- Primary CTA: download resume/CV (not yet built anywhere on the site — a known gap for a future pass).
- Secondary fallback: none yet.
- The line a visitor remembers after 10 seconds: this developer sweats the same details a motion designer would.
- Belief ladder: (1) the hero already looks unlike a template → (2) the craft holds up as they keep scrolling (experience, skills) → (3) the depth of experience/skills backs up the visual polish → (4) worth reaching out or downloading the resume.
- Proof on hand: none yet (experience and skills content is currently placeholder, pending the real history).

## Brand Personality

Cinematic, premium, emotional — warm orange practical lighting against a near-black stage, soft blue monitor glow, glassmorphism controls, slow/luxury motion timing (`ease-cinematic`). Voice is confident but understated; the visuals carry the emotion, copy stays plain and direct.

## Anti-references

Generic templated developer portfolios: stock icon packs, cookie-cutter card grids, default-Bootstrap spacing/feel, uniform "reveal on scroll" applied identically to every section with no variation. Also avoid anything that reads as overly corporate or stiff.

## Design Principles

- Motion is part of the product, not a garnish — every new section should carry its own deliberate entrance and idle behavior, not a copy-pasted fade-in.
- Depth over flatness — glass, blur, glow, and layered gradients over flat single-tone panels.
- Real logos and real content over generic iconography or filler copy, even when the underlying data is still placeholder.
- Respect the reduced-motion contract already established in the hero: every ambient/looping animation needs a static, still-legible fallback.
- Alternate the visual rhythm across sections (the hero's windowed video, the experience timeline's alternating rail, etc.) rather than repeating one section template down the page.

## Accessibility & Inclusion

Standard `prefers-reduced-motion` support, matching the pattern already used in `CinematicLayer.tsx` and `VideoIntro.tsx` — ambient/looping motion is skipped outright for reduced-motion users, while direct-response interaction feedback (hover/focus states) remains.
