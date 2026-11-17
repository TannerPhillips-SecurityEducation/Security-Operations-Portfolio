import { defineConfig } from 'astro/config';
import { SITE_ORIGIN, SITE_BASE } from './site.config.mjs';

export default defineConfig({
  site: SITE_ORIGIN,
  base: SITE_BASE,
  trailingSlash: 'always',
});
