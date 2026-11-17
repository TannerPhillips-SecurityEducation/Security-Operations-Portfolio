import fs from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN, SITE_BASE } from '../site.config.mjs';

const root = path.resolve('dist');
const hostname = new URL(SITE_ORIGIN).hostname;
const basePath = SITE_BASE;
const origin = SITE_ORIGIN;
const files = new Set();
const pages = [];
const bad = [];
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function visit(directory, prefix = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const rel = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) visit(path.join(directory, entry.name), rel);
    else if (entry.isFile()) {
      files.add(rel);
      if (rel.endsWith('.html')) pages.push(rel);
    }
  }
}
if (!fs.existsSync(root)) throw new Error('No generated dist directory; run npm run build first.');
visit(root);

const contentCache = new Map();
const idsCache = new Map();
function content(file) {
  if (!contentCache.has(file)) contentCache.set(file, fs.readFileSync(path.join(root, file), 'utf8'));
  return contentCache.get(file);
}
function ids(file) {
  if (!idsCache.has(file)) {
    const found = new Set([...content(file).matchAll(/\bid="([^"]*)"/g)].map(m => decode(m[1])));
    idsCache.set(file, found);
  }
  return idsCache.get(file);
}

let checked = 0;
let fragments = 0;
for (const page of pages) {
  const pageURL = origin + basePath + page;
  for (const match of content(page).matchAll(/\b(?:href|src)="([^"]*)"/g)) {
    const ref = decode(match[1]);
    if (!ref || ref.startsWith('data:') || ref.startsWith('mailto:') || ref.startsWith('tel:')) continue;
    let parsed;
    try { parsed = new URL(ref, pageURL); }
    catch { bad.push(page + ': unparseable URL ' + ref); continue; }
    if (parsed.hostname !== hostname || parsed.protocol !== 'https:') continue;
    checked++;
    if (!parsed.pathname.startsWith(basePath)) {
      bad.push(page + ': internal link escapes GitHub Pages base: ' + ref);
      continue;
    }
    let pathname;
    try { pathname = decodeURIComponent(parsed.pathname.slice(basePath.length)); }
    catch { bad.push(page + ': invalid URL encoding: ' + ref); continue; }
    if (pathname.startsWith('../') || pathname.includes('/../')) {
      bad.push(page + ': path traversal in site link: ' + ref);
      continue;
    }
    let target = pathname;
    if (!target || target.endsWith('/') || !path.posix.extname(target)) {
      target = (target ? target.replace(/\/?$/, '/') : '') + 'index.html';
    }
    if (!files.has(target)) {
      bad.push(page + ': missing destination ' + ref + ' => ' + target);
      continue;
    }
    if (parsed.hash && target.endsWith('.html')) {
      fragments++;
      let hash;
      try { hash = decodeURIComponent(parsed.hash.slice(1)); }
      catch { bad.push(page + ': malformed section fragment in ' + ref); continue; }
      if (hash && !ids(target).has(hash)) {
        bad.push(page + ': missing heading fragment #' + hash + ' in ' + target);
      }
    }
  }
}
// Verify the sitemap is complete, canonical, and free of missing pages.
for (const file of ['404.html', 'robots.txt', 'sitemap.xml']) {
  if (!files.has(file)) bad.push('Required generated file missing: ' + file);
}
if (files.has('sitemap.xml')) {
  const xml = content('sitemap.xml');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/&amp;/g, '&'));
  const expected = pages.filter(page => page !== '404.html').map(page =>
    origin + basePath + (page === 'index.html' ? '' : page.endsWith('/index.html')
      ? page.slice(0, -'index.html'.length) : page)
  );
  if (urls.length !== expected.length || new Set(urls).size !== urls.length) {
    bad.push('Sitemap has duplicates or a different page count: expected ' + expected.length + ', found ' + urls.length);
  }
  const actual = new Set(urls);
  for (const url of expected) {
    if (!actual.has(url)) bad.push('Sitemap is missing canonical page: ' + url);
  }
  if (urls.some(url => url.includes('/404.html'))) bad.push('Sitemap must not index the 404 page.');
}
if (files.has('robots.txt') && !content('robots.txt').includes(origin + basePath + 'sitemap.xml')) {
  bad.push('Project robots.txt does not reference the generated sitemap.');
}
if (bad.length) {
  for (const issue of bad.slice(0, 40)) console.error('BROKEN: ' + issue);
  throw new Error('Static site link audit failed: ' + bad.length + ' unresolved destinations or fragments.');
}
console.log('Static site link audit passed: ' + pages.length + ' HTML pages, ' + checked + ' internal href/src targets, ' + fragments + ' heading fragments; 0 broken.');
