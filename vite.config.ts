import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Vercel blocks saving env vars with recognized "public" prefixes (VITE_, NEXT_PUBLIC_, etc.)
  // unless explicitly marked as safe. To avoid that friction, the AdSense client ID can be set
  // on Vercel as plain `ADSENSE_CLIENT_ID` (no prefix) and gets mapped here at build time.
  const adsenseClientId = env.ADSENSE_CLIENT_ID || process.env.ADSENSE_CLIENT_ID || env.VITE_ADSENSE_CLIENT_ID || '';
  // Same reason: the radar waitlist form endpoint is set on Vercel as plain WAITLIST_ENDPOINT.
  // Not a secret — it's visible in the page either way. Env var overrides the default.
  const waitlistEndpoint = env.WAITLIST_ENDPOINT || process.env.WAITLIST_ENDPOINT || env.VITE_WAITLIST_ENDPOINT || 'https://formspree.io/f/xrperoej';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_ADSENSE_CLIENT_ID': JSON.stringify(adsenseClientId),
      'import.meta.env.VITE_WAITLIST_ENDPOINT': JSON.stringify(waitlistEndpoint),
    },
  };
})
