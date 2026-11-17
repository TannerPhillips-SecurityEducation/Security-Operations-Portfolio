import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { SITE_BASE } from '../site.config.mjs';

const REPO = 'TannerPhillips-SecurityEducation/Security-Education';
const REPO_URL = 'https://github.com/' + REPO + '.git';
const PUBLIC_BASE = SITE_BASE + 'knowledge/read/';
const contentDir = path.resolve('src/content/knowledge');
const catalogPath = path.resolve('src/data/generated/knowledge-catalog.json');
const graphPath = path.resolve('src/data/generated/knowledge-graph.json');
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
  const sources = new Map(paths.map(file => [file, fs.readFileSync(path.join(checkout, file), 'utf8')]));
  const headingIDs = new Map(paths.map(file => {
    const seen = new Map();
    const ids = [];
    for (const line of sources.get(file).split(/\r?\n/)) {
      const heading = line.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
      if (!heading) continue;
      const readable = heading[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, '').replace(/[\x60*_~]/g, '');
      const candidate = readable.trim().toLowerCase()
        .replace(/[^\p{L}\p{N}_\-\s]/gu, '').replace(/\s/g, '-');
      if (!candidate) continue;
      const prior = seen.get(candidate) || 0;
      ids.push(prior ? candidate + '-' + prior : candidate);
      seen.set(candidate, prior + 1);
    }
    return [file, new Set(ids)];
  }));
  let correctedFragments = 0;
  let unavailableReferences = 0;
  const docs = [];
  fs.rmSync(contentDir, { recursive: true, force: true });
  fs.mkdirSync(contentDir, { recursive: true });

  for (const file of paths) {
    const source = sources.get(file);
    const links = new Set();
    // Change relative Markdown destinations in the *generated copy only*.
    // The upstream authored text, headings, and status labels are preserved.
    const content = source.replace(/(!?)\[([^\]]+)\]\((<?[^\s)>]+>?)(?:\s+["'][^"']*["'])?\)/g,
      (match, image, label, wrappedUrl) => {
        if (image) return match;
        const url = wrappedUrl.replace(/^</, '').replace(/>$/, '');
        const target = resolveLinkedMarkdown(file, url, known);
        if (!target) {
          // Authored source documents can link to subjects that have only
          // been inventoried, not yet written. Preserve the label and state
          // the absence rather than publishing a broken local link.
          const destination = url.split('#', 1)[0].split('?', 1)[0];
          const localMarkdown = destination.toLowerCase().endsWith('.md') &&
            !url.startsWith('/') && !url.startsWith('//') &&
            !/^[a-z][a-z0-9+.-]*:/i.test(url);
          if (localMarkdown) {
            unavailableReferences++;
            return label + ' (linked article not yet available)';
          }
          return match;
        }
        links.add(target);
        const rawFragment = url.includes('#') ? url.split('#').slice(1).join('#') : '';
        let fragment = rawFragment;
        if (rawFragment) {
          let decoded = rawFragment;
          try { decoded = decodeURIComponent(rawFragment); } catch { /* keep raw fragment */ }
          const available = headingIDs.get(target);
          // Some older source links stop before a heading's parenthetical subtitle.
          // Correct only when there is exactly one heading with that prefix.
          if (available && !available.has(decoded)) {
            const candidates = [...available].filter(id => id.startsWith(decoded + '-'));
            if (candidates.length === 1) {
              fragment = candidates[0];
              correctedFragments++;
            }
          }
        }
        return match.replace(wrappedUrl, toSiteUrl(target) + (fragment ? '#' + fragment : ''));
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
  // Compact link data for the client-side graph: indexes replace repeated paths.
  // Excerpts, editorial status, and full GitHub URLs are intentionally omitted.
  const indexByFile = new Map(docs.map((doc, index) => [doc.file, index]));
  const compactGraph = {
    documents: docs.map(doc => [
      doc.file,
      doc.title,
      doc.slug,
      doc.links.map(file => indexByFile.get(file)).filter(Number.isInteger),
    ]),
  };
  fs.writeFileSync(graphPath, JSON.stringify(compactGraph) + '\n');
  console.log('Compact graph index: ' + Buffer.byteLength(JSON.stringify(compactGraph)) + ' bytes.');
  console.log('Synced ' + docs.length + ' Markdown documents from ' + REPO + ' @ ' + revision.slice(0, 12));
  console.log('Found ' + docs.reduce((n, doc) => n + doc.links.length, 0) + ' unique per-document Markdown links.');
  console.log('Adjusted ' + correctedFragments + ' unambiguous legacy section fragments in generated website links; source unchanged.');
  console.log('Labeled ' + unavailableReferences + ' links to source articles that have not yet been written; source unchanged.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
