import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Vercel blocks saving env vars with recognized "public" prefixes (VITE_, NEXT_PUBLIC_, etc.)
  // unless explicitly marked as safe. To avoid that friction, the AdSense client ID can be set
  // on Vercel as plain `ADSENSE_CLIENT_ID` (no prefix) and gets mapped here at build time.
  const adsenseClientId = env.ADSENSE_CLIENT_ID || process.env.ADSENSE_CLIENT_ID || env.VITE_ADSENSE_CLIENT_ID || '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_ADSENSE_CLIENT_ID': JSON.stringify(adsenseClientId),
    },
  };
})
