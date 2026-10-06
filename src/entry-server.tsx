import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { takeSeoTags, type SeoTags } from './lib/ssr-seo';

/** Renders one route to static HTML, waiting for lazy pages to load. */
export async function render(url: string): Promise<{ html: string; seo?: SeoTags }> {
  takeSeoTags();

  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );

  const html = await new Response(prelude).text();
  return { html, seo: takeSeoTags() };
}
