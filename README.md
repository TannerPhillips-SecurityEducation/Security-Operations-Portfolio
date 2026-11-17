# Tanner Phillips | Personal Website

A personal website built with Astro, using the seven approved navigation categories.

## Categories

- Home
- About
- Projects
- Knowledge
- Publications
- Education
- Contact

## Approved About content

- [Personal Interests](src/pages/about/interests.md)
- [Personal Philosophy](src/pages/about/philosophy.md)

The About page links to these two first-person articles. Other category pages remain empty until their public content is approved. The visual theme and interactive TSP.yaml experience are planned, not yet implemented.

## Development

Requires a supported Node.js version.

```sh
npm install
npm run dev
npm run build
```

## Publishing

The GitHub Actions workflow builds the static website for GitHub Pages. Configure **Settings → Pages → GitHub Actions**.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
