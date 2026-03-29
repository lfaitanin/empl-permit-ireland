import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BASE_URL = 'https://ie-work-permits.com';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/companies', priority: '0.9', changefreq: 'monthly' },
  { path: '/sectors', priority: '0.9', changefreq: 'monthly' },
  { path: '/counties', priority: '0.8', changefreq: 'monthly' },
  { path: '/nationalities', priority: '0.8', changefreq: 'monthly' },
  { path: '/eligibility', priority: '0.9', changefreq: 'monthly' },
  { path: '/visa-guide', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
];

// Load top companies from 2025 data (highest traffic)
const companies2025 = JSON.parse(readFileSync(join(root, 'src/data/companies-2025.json'), 'utf-8')) as { slug: string; total: number }[];
const top100 = companies2025.sort((a, b) => b.total - a.total).slice(0, 100);

const urls = [
  ...STATIC_ROUTES.map(r => `
  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
  ...top100.map(c => `
  <url>
    <loc>${BASE_URL}/companies/${c.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
].join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

writeFileSync(join(root, 'public/sitemap.xml'), sitemap);
console.log(`Sitemap generated: ${STATIC_ROUTES.length} static routes + ${top100.length} company pages`);
