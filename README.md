# Tanner Phillips | Personal Website

An Astro website with seven navigation categories: Home, About, Projects, Knowledge, Publications, Education, and Contact.

## About
- [My Journey](src/pages/about/journey.astro)
- [Professional Experience](src/pages/about/experience.astro)
- [Personal Interests](src/pages/about/interests.md)
- [Philosophy](src/pages/about/philosophy.md)
- [Technical Capabilities](src/pages/about/capabilities.astro)
- [Professional Credentials](src/pages/about/credentials.md)

The editable reference data for milestone dates, operational functions, and capability domains lives in [src/data/about.ts](src/data/about.ts).

The Education page presents the approved teaching philosophy, learning outcomes, instructional methods, and two modes of operation. Other sections are presented through the Obsidian Prism design. The interactive `TSP.yaml` homepage is implemented using a real YAML source file.

## Education
- [Education page](src/pages/education/index.astro)
- [Educational framework data](src/data/education.ts)
- Education and Creation mode functions reuse [About data](src/data/about.ts)

## Local development

```sh
npm install
npm run dev
npm run build
```

## Publishing
GitHub Actions builds and deploys to GitHub Pages. See `docs/ARCHITECTURE.md` for the content and design boundaries.

## Knowledge integration

The [Knowledge section](src/pages/knowledge/index.astro) is a native reading library built from the public `Security-Education` repository. The original repository remains the only editing source. The build pipeline:

1. Clones the public source repository at the beginning of each website build.
2. Copies Markdown into a generated, gitignored content collection.
3. Rewrites existing relative Markdown links to native website reader links.
4. Generates a source-revision catalog and a document-link graph from explicit hyperlinks.
5. Builds static pages on GitHub Pages.

Run `npm run sync:knowledge` to refresh the generated copy locally. `npm run dev` and `npm run build` also perform a refresh automatically. Local development requires access to the public GitHub repository.

The website workflow also performs a scheduled rebuild each day, although GitHub's scheduling service may delay a run. No knowledge source content is edited, and document links are not interpreted as formally approved semantic relation types.

**Publication status:** Many knowledge documents are working drafts, inventories, or architectural registers, not completed peer-reviewed references.

## Curated Projects & Publications

The Projects and Publications sections have approval-gated data-driven listing and detail templates.

- [Projects page](src/pages/projects/index.astro)
- [Publications page](src/pages/publications/index.astro)
- [Curation manifest](src/data/showcase.json)
- [Editorial rules](docs/CURATION.md)

Initially both collections are intentionally empty. No project is featured until it is explicitly selected, completed or demonstrable, and supported by public evidence. Only intentionally published editions are listed in Publications.

To validate editorial entries run `npm run validate:showcase`. Published Markdown editions are read natively from `src/content/releases/` when referenced by an approved edition record.

## Contact

The [Contact page](src/pages/contact/index.astro) links only to the user-approved [LinkedIn profile](https://www.linkedin.com/in/securityeducator/) and [GitHub profile](https://github.com/TannerPhillips-SecurityEducation). Both public URLs are stored centrally in [src/data/site.ts](src/data/site.ts). No email address, phone number, contact form, or location is published.

## Visual Identity & TSP.yaml (v0.9)

The site uses the approved **Obsidian Prism** visual system with Space Grotesk (display), Inter (body), and JetBrains Mono (technical text), plus a custom two-line **TSP** monogram and geometric exploration artwork.

- [Homepage](src/pages/index.astro): first-person hero, progressive YAML identity explorer, optional geometric motion, and conventional section navigation
- [TSP.yaml source](src/data/TSP.yaml): single canonical, valid, copyable, machine-readable public introduction
- [Raw YAML endpoint](src/pages/TSP.yaml.ts): serves the unmodified YAML as `/TSP.yaml`
- [TSP Mark](src/components/TSPMark.astro): branded SVG monogram used in the site header and footer
- [Global Styles](src/styles/global.css): responsive dark-first palette and shared article/knowledge/education styling
- [YAML Validator](scripts/validate-tsp.mjs): validates the YAML schema, contact channels, and privacy constraints before builds
- [Design System Documentation](docs/DESIGN.md): tokens, typography, interaction, accessibility

The YAML source must be the only canonical data for the interactive identity panel. It uses native HTML `<details>` to progressively disclose YAML snippets; **Copy YAML** and **Raw file** always expose the complete valid document. Motion is off by default and never overrides a reduced-motion preference.

`npm run validate:tsp` validates the identity source. The predev and prebuild steps run it automatically.
