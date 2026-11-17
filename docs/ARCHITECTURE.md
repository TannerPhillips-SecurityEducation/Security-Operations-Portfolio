# Personal Website Architecture

**Version:** v0.5, Education section and approved About content (2026-11-17).

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
- Other top-level categories, except About and Education, remain empty.
- Geographic information, private relationships, and other people's personal information are excluded.
- No personal photographs, confidential operational details, proficiency percentages, or unverified project releases.
- All certifications are described as previously held, not active.
- The knowledge repository is separate and unchanged.

## Visual design
- Current neutral template is temporary.
- Obsidian Prism palette, TSP monogram, and interactive authentic `TSP.yaml` are approved design directions, **not implemented**.
- Visual implementation remains deferred until the design is fully defined.

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
- Final visual theme, TSP monogram, and interactive `TSP.yaml` homepage are still deliberately deferred.

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
- No Obsidian Prism or interactive TSP.yaml design changes.
