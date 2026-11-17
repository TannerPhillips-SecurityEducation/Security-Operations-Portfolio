import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO = 'TannerPhillips-SecurityEducation/Security-Education';
const REPO_URL = 'https://github.com/' + REPO + '.git';
const PUBLIC_BASE = '/Security-Operations-Portfolio/knowledge/read/';
const contentDir = path.resolve('src/content/knowledge');
const catalogPath = path.resolve('src/data/generated/knowledge-catalog.json');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tsp-knowledge-'));
const checkout = path.join(tempDir, 'source');

function markdownPaths(dir, prefix = '') {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const rel = path.posix.join(prefix, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...markdownPaths(full, rel));
    else if (entry.isFile() && rel.toLowerCase().endsWith('.md')) result.push(rel);
  }
  return result;
}

function slug(file) {
  if (file === 'README.md') return 'overview';
  if (file.endsWith('/README.md')) return file.slice(0, -'/README.md'.length);
  return file.replace(/\.md$/i, '');
}

function toSiteUrl(file) {
  return PUBLIC_BASE + slug(file).split('/').map(encodeURIComponent).join('/') + '/';
}

function resolveLinkedMarkdown(fromFile, url, knownPaths) {
  if (!url || url.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return null;
  const pathname = url.split('#', 1)[0].split('?', 1)[0];
  if (!pathname.toLowerCase().endsWith('.md')) return null;
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  if (decoded.startsWith('/')) return null;
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), decoded));
  if (target.startsWith('../') || target === '..' || !knownPaths.has(target)) return null;
  return target;
}

function describe(raw) {
  const match = raw.match(/^#\s+(.+)$/m);
  const title = match ? match[1].replace(/[\x60*]/g, '').trim() : 'Untitled Document';
  const lines = raw.split(/\r?\n/).slice(0, 30);
  const item = lines.find(line => /^\*\*(?:Development status|Content status|Architecture status|Status)\*\*:/i.test(line));
  const status = item ? item.replace(/^\*\*[^*]+\*\*:\s*/, '').trim() : null;
  const intro = raw.split(/\r?\n\s*\r?\n/).slice(1)
    .find(block => block.trim() && !/^#|^\||^\*\*.*\*\*:|^---/m.test(block.trim()));
  const excerpt = (intro || '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[\x60*#]/g, '').replace(/\s+/g, ' ').trim().slice(0, 230);
  return { title, status, excerpt };
}

try {
  // A new clone is used on every build so stale local output never masquerades
  // as current source content. An unavailable source fails the build.
  execFileSync('git', ['clone', '--quiet', '--depth', '1', '--single-branch', '--branch', 'main', REPO_URL, checkout], {
    stdio: ['ignore', 'pipe', 'pipe'], timeout: 120000,
  });
  const revision = execFileSync('git', ['-C', checkout, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const paths = markdownPaths(checkout).sort((a, b) => a.localeCompare(b));
  if (!paths.includes('README.md') || paths.length === 0) {
    throw new Error('Source repository has no root README.md or Markdown files.');
  }
  const known = new Set(paths);
  const docs = [];
  fs.rmSync(contentDir, { recursive: true, force: true });
  fs.mkdirSync(contentDir, { recursive: true });

  for (const file of paths) {
    const source = fs.readFileSync(path.join(checkout, file), 'utf8');
    const links = new Set();
    // Change relative Markdown destinations in the *generated copy only*.
    // The upstream authored text, headings, and status labels are preserved.
    const content = source.replace(/(!?)\[([^\]]+)\]\((<?[^\s)>]+>?)(?:\s+["'][^"']*["'])?\)/g,
      (match, image, label, wrappedUrl) => {
        if (image) return match;
        const url = wrappedUrl.replace(/^</, '').replace(/>$/, '');
        const target = resolveLinkedMarkdown(file, url, known);
        if (!target) return match;
        links.add(target);
        const anchor = url.includes('#') ? '#' + url.split('#').slice(1).join('#') : '';
        return match.replace(wrappedUrl, toSiteUrl(target) + anchor);
      });
    const destination = path.join(contentDir, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, 'utf8');
    docs.push({
      file,
      id: file.replace(/\.md$/i, ''),
      slug: slug(file),
      domain: file.includes('/') ? file.split('/')[0] : 'repository',
      ...describe(source),
      links: [...links].sort(),
      sourceUrl: 'https://github.com/' + REPO + '/blob/' + revision + '/' + file.split('/').map(encodeURIComponent).join('/'),
    });
  }

  const catalog = {
    source: REPO,
    revision,
    count: docs.length,
    note: 'Document links only. These are NOT formally typed semantic relations.',
    documents: docs,
  };
  fs.mkdirSync(path.dirname(catalogPath), { recursive: true });
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
  console.log('Synced ' + docs.length + ' Markdown documents from ' + REPO + ' @ ' + revision.slice(0, 12));
  console.log('Found ' + docs.reduce((n, doc) => n + doc.links.length, 0) + ' unique per-document Markdown links.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
