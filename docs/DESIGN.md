# TSP / Obsidian Prism Design System

**Implementation:** v0.9 · 2026-11-17

## Design intent

The site is a personal home, not a technical résumé. It combines a Modern Technical × Editorial visual language with **Conceptual Geometry** and **Generative Exploration**, while leaving all long-form content readable and discoverable.

The first impression is deliberately balanced between the person, the professional, and the creator. The homepage's identity is `TSP.yaml`, with the TSP monogram rendered in the site chrome.

## Foundation tokens

| Role | Hex |
| --- | --- |
| Canvas | `#0B0F18` |
| Surface | `#192131` |
| Primary cyan | `#69E4DC` |
| Accent violet | `#B4A0FF` |
| Accent amber | `#FFBD7A` |
| Primary text | `#EDF2F9` |

Muted text and border colors are chosen to maintain readability against the dark surfaces.

## Typography

- **Space Grotesk:** headings, personal name, monogram.
- **Inter:** body, navigation, supporting text.
- **JetBrains Mono:** filenames, YAML, metadata, editorial labels.
- System fallbacks preserve functionality if remote font resources are unavailable.

## Monogram

The `TSP` initials receive a horizontal rule through their upper letterforms and another through their lower letterforms. The reusable mark is in `src/components/TSPMark.astro` and the favicon is in `public/favicon.svg`.

## Homepage

1. **Person:** identity, headline, original first-person introduction, Thinker/Learner/Explorer/Creator traits.
2. **Conceptual geometry:** abstract connections and boundaries, with motion disabled by default.
3. **Progressive YAML:** native disclosure controls reveal individual top-level sections. No interactive wrapper modifies the canonical document; copying, downloading, and opening the raw endpoint all yield real valid YAML.
4. **Site exploration:** pathways transition from YAML to conventional pages.
5. **Closing personal philosophy:** a short reflective statement and About link.

The YAML source lives in `src/data/TSP.yaml`. This file is the authority for homepage identity data. `src/pages/TSP.yaml.ts` serves exactly the same content to visitors.

## Interaction & accessibility

- Native `<details>` elements allow keyboard-operable expand/collapse with no JavaScript dependency.
- Optional geometric SVG animation is explicitly enabled via a button, never automatically started.
- Motion is disabled if `prefers-reduced-motion: reduce` is active; animated styles also check `no-preference`.
- Text contrast, large tap targets, visible focus outlines, semantic headings, and responsive small-screen navigation are required.
- The information architecture and article pages remain accessible without the optional interactive script.
- All content is first-person and privacy-scoped: no personal photos, household details, location, email, phone, or private contacts.

## Boundaries

Project and publication curation policies remain in effect. Knowledge is still pulled from the authoritative Security-Education repository. The interactive SVG does not claim to be a formal knowledge graph; it is a conceptual visual. No vendor-specific product branding is used for the personal identity.

## Mobile interaction and delivery refinements (v0.12)

At narrower viewports, desktop navigation gives way to a two-column native disclosure menu. It remains keyboard operable, visibly labels the current section, and does not require client-side scripting. Existing reduced-motion rules remain in effect.

The graph explorer uses a smaller generated link dataset to avoid shipping editorial excerpts, review statuses, and GitHub source URLs to the browser when they are not needed for visualization. The canonical source and its review status remain available on individual reading pages.

The redesigned 404 page shares the global visual language without introducing novel interactions. Search metadata, Open Graph tags, structured identity data, and the sitemap are generated from approved public information only.
