// This is a *manual* editorial collection, not a GitHub repository feed.
// Only approved, completed/demonstrable projects and deliberately released works
// are eligible for the public lists. Every entry is verified at build time.
import source from './showcase.json';

export type Evidence = { label: string; url: string };
export type Detail = { title: string; description: string };
export type Project = {
  slug: string;
  title: string;
  category: string;
  status: 'completed' | 'demonstrable';
  summary: string;
  overview: string;
  approvedForPublication: true;
  evidence: Evidence[];
  sections: Detail[];
  technologies?: string[];
  releasedAt?: string;
};

export type Download = { label: string; url: string };
export type Edition = {
  id: string;
  version: string;
  releasedAt: string;
  publicUrl: string;
  markdownId?: string;
  downloads?: Download[];
  citation?: string;
};
export type Publication = {
  slug: string;
  title: string;
  kind: 'article' | 'paper' | 'book' | 'guide' | 'reference' | 'other';
  summary: string;
  approvedForPublication: true;
  currentEdition: string;
  editions: Edition[];
};

export const projects = source.projects as Project[];
export const publications = source.publications as Publication[];
