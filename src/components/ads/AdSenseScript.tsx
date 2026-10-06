import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

// Only pages with real publisher content may carry ads (AdSense policy):
// no ads on the privacy policy, 404s or other unknown routes.
const CONTENT_PATHS = new Set([
  '/', '/companies', '/sectors', '/counties', '/nationalities',
  '/eligibility', '/visa-guide', '/apply', '/about',
]);

function isContentPage(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return CONTENT_PATHS.has(path) || /^\/companies\/[^/]+$/.test(path);
}

export default function AdSenseScript() {
  const { pathname } = useLocation();
  const allowed = isContentPage(pathname);

  useEffect(() => {
    if (!CLIENT_ID || !allowed) return;
    if (document.querySelector(`script[src*="adsbygoogle.js"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [allowed]);

  return null;
}
