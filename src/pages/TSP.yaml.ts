import source from '../data/TSP.yaml?raw';

export const prerender = true;

export function GET() {
  return new Response(source, {
    headers: {
      'Content-Type': 'application/yaml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
