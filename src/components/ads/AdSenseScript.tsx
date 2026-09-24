import { useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

export default function AdSenseScript() {
  useEffect(() => {
    if (!CLIENT_ID) return;
    if (document.querySelector(`script[src*="adsbygoogle.js"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}
