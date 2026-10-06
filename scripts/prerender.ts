// Writes static HTML for every sitemap route into dist/, so crawlers (Google,
// AdSense review) see real page content instead of an empty <div id="root">.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr/entry-server.js).
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { STATIC_ROUTES, topCompanySlugs } from './routes';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

type SeoTags = { title: string; description: string; url: string };
const { render } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href) as {
  render: (url: string) => Promise<{ html: string; seo?: SeoTags }>;
};

const template = readFileSync(join(dist, 'index.html'), 'utf-8');
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty #root to fill');

// Untouched shell for routes that aren't prerendered (vercel.json rewrites to it)
writeFileSync(join(dist, 'spa.html'), template);

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withHead(html: string, seo: SeoTags): string {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${attr(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${attr(seo.description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${attr(seo.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${attr(seo.description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${attr(seo.url)}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${attr(seo.title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${attr(seo.description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${attr(seo.url)}"`);
}

const routes = [...STATIC_ROUTES.map(r => r.path), ...topCompanySlugs().map(s => `/companies/${s}`)];

for (const route of routes) {
  const { html, seo } = await render(route);
  if (html.length < 2000) throw new Error(`Prerender of ${route} looks empty (${html.length} chars)`);

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (seo) page = withHead(page, seo);

  const outDir = route === '/' ? dist : join(dist, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page);
}

console.log(`Prerendered ${routes.length} routes`);
