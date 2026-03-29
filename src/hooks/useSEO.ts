import { useEffect } from 'react';

const SITE_NAME = 'IE Work Permits Explorer';
const BASE_URL = 'https://ie-work-permits.com';

export function useSEO({
  title,
  description,
  path = '',
}: {
  title: string;
  description: string;
  path?: string;
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', fullTitle);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', `${BASE_URL}${path}`);
    set('meta[name="twitter:title"]', 'content', fullTitle);
    set('meta[name="twitter:description"]', 'content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;
  }, [title, description, path]);
}
