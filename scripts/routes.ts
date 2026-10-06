import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/companies', priority: '0.9', changefreq: 'monthly' },
  { path: '/sectors', priority: '0.9', changefreq: 'monthly' },
  { path: '/counties', priority: '0.8', changefreq: 'monthly' },
  { path: '/nationalities', priority: '0.8', changefreq: 'monthly' },
  { path: '/eligibility', priority: '0.9', changefreq: 'monthly' },
  { path: '/visa-guide', priority: '0.9', changefreq: 'monthly' },
  { path: '/apply', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

/** Top 100 companies by 2025 permits — the company pages in the sitemap and prerender. */
export function topCompanySlugs(): string[] {
  const companies2025 = JSON.parse(readFileSync(join(root, 'src/data/companies-2025.json'), 'utf-8')) as { slug: string; total: number }[];
  return companies2025.sort((a, b) => b.total - a.total).slice(0, 100).map(c => c.slug);
}
