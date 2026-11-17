import fs from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN, SITE_BASE } from '../site.config.mjs';

const dist = path.resolve('dist');
if (!fs.existsSync(dist)) throw new Error('Site output not found: run the Astro build first.');

function htmlFiles(dir, prefix = '') {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...htmlFiles(absolute, relative));
    else if (entry.isFile() && relative.endsWith('.html')) result.push(relative);
  }
  return result;
}
function canonicalPath(file) {
  if (file === 'index.html') return '';
  if (file.endsWith('/index.html')) return file.slice(0, -'index.html'.length);
  return file;
}
const xmlEscape = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');

const pagePaths = htmlFiles(dist).filter(name => name !== '404.html').sort();
const canonical = pagePaths.map(file => SITE_ORIGIN + SITE_BASE + canonicalPath(file));
if (new Set(canonical).size !== canonical.length) throw new Error('Duplicate canonical URLs in sitemap.');
if (!canonical.length) throw new Error('Refusing to write an empty sitemap.');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...canonical.map(loc => '  <url><loc>' + xmlEscape(loc) + '</loc></url>'),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(dist, 'robots.txt'), [
  'User-agent: *',
  'Allow: ' + SITE_BASE,
  'Sitemap: ' + SITE_ORIGIN + SITE_BASE + 'sitemap.xml',
  '',
].join('\n'), 'utf8');
console.log('Generated sitemap.xml for ' + pagePaths.length + ' public HTML pages and a project-level robots.txt.');
