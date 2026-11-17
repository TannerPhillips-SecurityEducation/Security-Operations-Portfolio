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

Other categories retain their structural placeholders. The final Obsidian Prism identity and interactive `TSP.yaml` have not been implemented.

## Local development

```sh
npm install
npm run dev
npm run build
```

## Publishing
GitHub Actions builds and deploys to GitHub Pages. See `docs/ARCHITECTURE.md` for the content and design boundaries.
