# Personal Website Architecture

**Version:** v0.11, connected narratives and guided reading paths (2026-11-17).

## Public identity
- Tanner Phillips
- Security Educator, Engineer & Researcher
- Personal professional identity

## Seven navigation categories
Home · About · Projects · Knowledge · Publications · Education · Contact

## Approved About pages
- `/about/interests/`: First-person Personal Interests
- `/about/philosophy/`: First-person Personal Philosophy
- `/about/journey/`: Progressive timeline for selected 2014, 2015, 2020, and 2025 milestones
- `/about/experience/`: Navy, Elastic, Corelight, and approved Education/Creation operational functions
- `/about/capabilities/`: Five evidence-oriented capability domains
- `/about/credentials/`: Previously held certifications and willingness to obtain or renew
- `/about/`: Approved first-person introduction and navigation to the six pages

## Education (published)
- `/education/`: First-person teaching philosophy, approved learning outcomes, development purposes, methods, assessment roots, and expandable Education/Creation modes
- Content source: `src/data/education.ts` (outcomes, purposes, methods, assessments) and `src/data/about.ts` (shared mode functions)
- The two assessment roots are Knowledge Checks and Practical Assessments. Their scope is separate from the three learning-development purposes.
- No confidential employer training materials, unpublished curriculum, or unapproved public courses are posted.

## Publication rules
- About, Knowledge, Education, and Contact have public content. Projects and Publications have intentionally empty, curated catalogues. Home includes the approved progressive YAML introduction, optional geometry motion, and category navigation.
- Geographic information, private relationships, and other people's personal information are excluded.
- No personal photographs, confidential operational details, proficiency percentages, or unverified project releases.
- All certifications are described as previously held, not active.
- The knowledge repository is separate and unchanged.

## Visual design
- Obsidian Prism is implemented across all pages with approved palette: canvas #0B0F18, surface #192131, cyan #69E4DC, violet #B4A0FF, amber #FFBD7A, and text #EDF2F9.
- Modern Technical × Editorial typography uses Space Grotesk, Inter, and JetBrains Mono with system fallbacks.
- The TSP monogram has two horizontal bars crossing the letterforms.
- The homepage exposes the valid, canonical `src/data/TSP.yaml`, progressive native HTML disclosure, full-source copy/download/raw-file actions, and optional motion.
- The site respects reduced-motion preferences and retains keyboard navigation, focus indicators, responsive layouts, and semantic structure.
- See `docs/DESIGN.md` for design tokens and interaction contract.

## Sources
Website: TannerPhillips-SecurityEducation/Security-Operations-Portfolio
Knowledge: TannerPhillips-SecurityEducation/Security-Education

## Knowledge integration (v0.6)

- `/knowledge/`: Foundations plus seven specialized domains, using the upstream repo's approved function-first taxonomy.
- `/knowledge/browse/`: All Markdown documents browsable and searchable by title, path, and summary, with domain filtering.
- `/knowledge/read/[...slug]/`: Native Astro content rendering of the upstream Markdown, including source status and revision links.
- `/knowledge/graph/`: Interactive *document-link explorer* for explicit Markdown hyperlinks. This is not a formal semantic graph or an ontology.
- Source repository: `TannerPhillips-SecurityEducation/Security-Education` (public).
- Build-time synchronizer: `scripts/sync-knowledge.mjs`. The website clones the source at build time and imports generated Markdown.
- The source's original Markdown is never changed. Its relative links are rewritten only in the generated website copies.
- Source revision is displayed with every reference. GitHub Actions rebuilds on pushes to the portfolio, manually, and on a daily schedule.
- Knowledge Checks and Practical Assessments do not belong in the upstream technical knowledge repository.
- Documents include working architectural material and unreviewed subjects; no independent acceptance or final publication status is implied.
- **Semantic graph metadata/predicates remain unapproved in the source repository.** No such categories are invented in the website.
- The global design, monogram, and interactive `TSP.yaml` were subsequently implemented in v0.9.

## Projects & Publications curation (v0.7)

- `/projects/`: Manually selected, completed or demonstrable project gallery. No automatic repository import.
- `/projects/[slug]/`: Progressive case studies, with proof links and expandable technical sections.
- `/publications/`: Deliberately published works only. Current published edition displayed first.
- `/publications/[slug]/`: Release metadata, optional downloads, citations, and published edition history.
- `/publications/read/[...edition]/`: Native Markdown edition reading, only when explicitly approved and registered.
- `src/data/showcase.json`: Explicit curation manifest, currently empty by design.
- `scripts/validate-showcase.mjs`: Refuses malformed, unapproved, evidence-free, or unpublished entries before building.
- `docs/CURATION.md`: Editorial publication policy and release instructions.
- No unfinished projects, personal drafts, private artifacts, or automatically imported repositories are presented as releases.
- This curation milestone did not change visuals; the global design followed in v0.9.

## Contact (v0.8)

- `/contact/`: Public professional contact channels, LinkedIn and GitHub only.
- Approved LinkedIn: `https://www.linkedin.com/in/securityeducator/`.
- Approved GitHub: `https://github.com/TannerPhillips-SecurityEducation`.
- Central data: `src/data/site.ts` exports `contactChannels`.
- No contact form, email, phone, personal location, private relationships, or unapproved social links.
- Links open official profiles in new tabs, without sharing any visitor form information.
- No global redesign, Obsidian Prism changes, or TSP.yaml implementation performed during this milestone.

## TSP.yaml and global design (v0.9)

- `src/data/TSP.yaml`: canonical, human-readable, valid YAML source for approved personal identity, approaches, interests, philosophy, journey, site paths, and authorized profile links.
- `src/pages/index.astro`: the visual interface imports and parses this source at build time using the YAML parser; generated code snippets preserve exact values and support progressive disclosure via native `details` elements.
- `src/pages/TSP.yaml.ts`: read-only, statically built, `application/yaml` endpoint serving the same unmodified source.
- `scripts/validate-tsp.mjs`: build-time YAML validity, schema, URL allowlist, approved label ordering, and privacy checks.
- `src/components/TSPMark.astro`: consistent custom monogram across header and footer; favicon provided as standalone SVG.
- `src/styles/global.css`: shared Obsidian Prism color, editorial typography, component and layout system; optimized for reader legibility.
- SVG conceptual geometry integrates loci, connections, and boundaries without embedding photos.
- Motion is user-controlled, disabled by default, and disabled when the operating system requests reduced motion. Content and navigation do not depend on animation or JavaScript.
- The Knowledge, Projects, Publications, Education, About, and Contact sections retain the existing structure and editorial content.
- No private personal information or unsupported project/publication releases were introduced.

## Narrative editorial pass (v0.10)

**Purpose:** The website should communicate a person, their ideas, experiences, and work, not read as a resume checklist or taxonomy inventory.

- About landing: first-person contextual introduction preceding the navigational cards.
- My Journey: chronological milestones remain approved; summaries are visible and deeper reflection is optional.
- Professional Experience: Navy, Elastic, and Corelight presented as first-person career chapters; historical five-day learning sequence and seven functions per mode remain available in disclosures.
- Technical Capabilities: practice-oriented domain narratives with explicit connection to professional evidence and careful distinction between private practice, personal experiments, and public deliverables.
- Credentials: previously held status unchanged; greater explanation of the role of credentials in professional learning.
- Interests and Philosophy: approved statements retained and expanded with examples connecting systems, reasoning, education, and creative exploration.
- Education: explanation precedes classification; learning outcomes, learning purposes, methods, and assessment roots remain distinct.
- Knowledge: human-readable rationale, domain descriptions, canonical/source boundaries, and publication status. **Upstream Security-Education content was not modified.**
- Projects and Publications: more purposeful first-person context, preserving the explicit approval gates and initially empty galleries.
- Contact: narrative introduction plus the same two approved public channels.
- Home: `TSP.yaml` remains a valid, canonical source. A new `perspective` section adds first-person context without weakening the machine-readable contract. The homepage transitions from YAML to narrative and then navigation.

**Editorial contract:** Keep text concrete, evidence-conscious, first-person, and humane. Do not make unsupported technical/professional claims. Do not present personal experiments as public production releases. Preserve privacy restrictions, reduce uninformative repetition, and prefer visible explanatory prose to collapsed lists. See `docs/EDITORIAL.md`.

The Obsidian Prism visual identity, monogram, responsive layout, and reduced-motion controls are preserved.


## Connected thinking and guided reading (v0.11)

- /about/how-i-think/: First-person interpretive essay tying together systems, Locus/Relation/Boundary, Observe/Derive/Infer/Act, Content/Context/Intent, Syntax/Semantics/Pragmatics, and Intuition/Thinking/Reasoning/Reflection. The models remain distinct, and are not asserted to be equivalent or universal ratified laws.
- /knowledge/start-here/: Three optional narrative routes through 12 real Fundamentals articles, referenced by exact canonical paths from the generated Knowledge catalog. Missing source paths cause the build to fail.
- These reading paths are a website editorial/navigation layer, NOT a modification to Security-Education and NOT a course or learning assessment.
- Source status claims match the source: model-assisted technical review is not independent human final acceptance; draft articles remain drafts.
- The homepage, About, Education, Knowledge index, native document reader, and source-link explorer link into these narratives.
- No confidential operational details, sensitive personal data, unapproved publication items, or automatic project promotion were introduced.

## Build-time link integrity (v0.11.1)

- `scripts/sync-knowledge.mjs` resolves unambiguous stale Markdown section fragments to their unique current heading IDs in website-generated copies; this is a compatibility layer, not an upstream source mutation.
- `scripts/audit-site-links.mjs` checks generated internal href/src destinations and HTML heading anchors.
- GitHub Actions runs the audit after the static build and before publishing, failing deployment on unresolved internal links.
- Source manuscripts, editorial review statuses, and the original Security-Education repository remain unmodified.
