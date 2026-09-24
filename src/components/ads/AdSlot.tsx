import { useEffect, useRef } from 'react';

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

interface AdSlotProps {
  /** Ad unit slot ID from AdSense (create one per placement) */
  slot: string;
  className?: string;
  format?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot({ slot, className = '', format = 'auto' }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT_ID || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded yet or blocked — fail silently
    }
  }, []);

  if (!CLIENT_ID) return null;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
