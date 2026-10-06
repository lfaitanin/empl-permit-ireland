import { lazy, type ComponentType } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * A lazily loaded page that can also be loaded ahead of time. Once preloaded it
 * renders synchronously, so hydrating a prerendered page never suspends.
 */
function lazyPage(importer: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const load = () => importer().then(m => { Loaded = m.default; return m; });
  const Lazy = lazy(load);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = load;
  return Page;
}

export const pageRoutes = [
  { path: '/', Page: lazyPage(() => import('./Dashboard')) },
  { path: '/companies', Page: lazyPage(() => import('./Companies')) },
  { path: '/companies/:slug', Page: lazyPage(() => import('./CompanyDetail')) },
  { path: '/sectors', Page: lazyPage(() => import('./Sectors')) },
  { path: '/counties', Page: lazyPage(() => import('./Counties')) },
  { path: '/nationalities', Page: lazyPage(() => import('./Nationalities')) },
  { path: '/eligibility', Page: lazyPage(() => import('./Eligibility')) },
  { path: '/visa-guide', Page: lazyPage(() => import('./VisaGuide')) },
  { path: '/apply', Page: lazyPage(() => import('./HowToApply')) },
  { path: '/about', Page: lazyPage(() => import('./About')) },
  { path: '/privacy', Page: lazyPage(() => import('./Privacy')) },
];

export const notFoundPage = lazyPage(() => import('./NotFound'));

/** Loads the code for the page at `pathname` (used before hydrating). */
export function preloadPage(pathname: string) {
  const route = pageRoutes.find(r => matchPath(r.path, pathname));
  return (route?.Page ?? notFoundPage).preload();
}
