import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Source files are fetched from the user's public Security-Education repository
// by scripts/sync-knowledge.mjs before dev/build. Content stays authored there.
const knowledge = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/knowledge',
    generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
  }),
});

export const collections = { knowledge };
