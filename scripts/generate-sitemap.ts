import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { STATIC_ROUTES, topCompanySlugs } from './routes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BASE_URL = 'https://ie-work-permits.com';
const TODAY = new Date().toISOString().split('T')[0];

const top100 = topCompanySlugs();

const urls = [
  ...STATIC_ROUTES.map(r => `
  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
  ...top100.map(slug => `
  <url>
    <loc>${BASE_URL}/companies/${slug}</loc>
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
