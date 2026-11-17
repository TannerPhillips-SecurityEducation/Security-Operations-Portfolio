import fs from 'node:fs';
import path from 'node:path';

const source = JSON.parse(fs.readFileSync('src/data/showcase.json', 'utf8'));
const fail = (message) => { throw new Error('Public showcase validation: ' + message); };
const validSlug = (x) => typeof x === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x);
const nonEmpty = (x) => typeof x === 'string' && x.trim().length > 0;
const httpUrl = (x) => {
  if (!nonEmpty(x)) return false;
  try {
    const parsed = new URL(x);
    return ['https:', 'http:'].includes(parsed.protocol) && !['localhost','127.0.0.1','example.com','www.example.com'].includes(parsed.hostname);
  } catch { return false; }
};
const dateOnly = (x) => nonEmpty(x) && /^\d{4}-\d{2}-\d{2}$/.test(x) && !Number.isNaN(Date.parse(x + 'T00:00:00Z'));
const unique = (values) => new Set(values).size === values.length;
const requireLinks = (items,where) => {
  if (!Array.isArray(items) || !items.length) fail(where + ' requires at least one public link');
  for (const item of items) {
    if (!nonEmpty(item.label) || !httpUrl(item.url)) fail(where + ' contains a link without a valid label or public URL');
  }
};

if (!Array.isArray(source.projects) || !Array.isArray(source.publications)) fail('Expected projects and publications arrays');
if (!unique(source.projects.map(item=>item.slug)) || !unique(source.publications.map(item=>item.slug))) fail('Duplicate slugs are not allowed');

for (const p of source.projects) {
  const where = 'project ' + JSON.stringify(p.slug);
  if (!validSlug(p.slug) || !nonEmpty(p.title) || !nonEmpty(p.category) || !nonEmpty(p.summary) || !nonEmpty(p.overview)) fail(where + ' lacks required content');
  if (p.approvedForPublication !== true) fail(where + ' has not been manually approved');
  if (!['completed','demonstrable'].includes(p.status)) fail(where + ' must be completed or demonstrable');
  requireLinks(p.evidence,where+' evidence');
  if (!Array.isArray(p.sections) || p.sections.some(s=>!nonEmpty(s.title)||!nonEmpty(s.description))) fail(where + ' has invalid case-study sections');
  if (p.technologies !== undefined && (!Array.isArray(p.technologies) || p.technologies.some(t=>!nonEmpty(t)))) fail(where + ' has invalid technologies');
  if (p.releasedAt!==undefined && !dateOnly(p.releasedAt)) fail(where + ' has invalid release date');
}

for (const p of source.publications) {
  const where = 'publication ' + JSON.stringify(p.slug);
  if (!validSlug(p.slug) || !nonEmpty(p.title) || !nonEmpty(p.summary)) fail(where + ' lacks required content');
  if (!['article','paper','book','guide','reference','other'].includes(p.kind)) fail(where + ' kind is invalid');
  if (p.approvedForPublication!==true) fail(where + ' has not been manually approved');
  if (!Array.isArray(p.editions) || !p.editions.length) fail(where + ' requires a public edition');
  if (!unique(p.editions.map(e=>e.id))) fail(where + ' has duplicate edition identifiers');
  if (!p.editions.some(e=>e.id===p.currentEdition)) fail(where + ' current edition does not exist');
  for (const e of p.editions) {
    if (!validSlug(e.id) || !nonEmpty(e.version) || !dateOnly(e.releasedAt) || !httpUrl(e.publicUrl)) fail(where + ' has an invalid or unpublished edition');
    if (e.downloads!==undefined) {
      if (!Array.isArray(e.downloads)) fail(where + ' downloads must be an array');
      for (const file of e.downloads) {
        if (!nonEmpty(file.label) || !httpUrl(file.url)) fail(where + ' has an invalid download link');
      }
    }
    if (e.markdownId!==undefined) {
      if (typeof e.markdownId!=='string' || !/^[a-z0-9/-]+$/.test(e.markdownId) || e.markdownId.includes('..')) fail(where + ' has an invalid Markdown ID');
      const file=path.resolve('src/content/releases',e.markdownId+'.md');
      if (!fs.existsSync(file)) fail(where + ' links to a missing native-reading edition: '+e.markdownId);
    }
  }
}
console.log('Curated showcase validation passed: '+source.projects.length+' selected projects, '+source.publications.length+' released publications.');
