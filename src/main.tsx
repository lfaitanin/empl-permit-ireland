import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App'
import { preloadPage } from './pages/routes'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)

// Prerendered pages ship with HTML already inside #root — load that page's
// code first, then hydrate in one pass. Other routes (dev server,
// non-prerendered company pages) start empty and render normally.
if (root.hasChildNodes()) preloadPage(window.location.pathname).then(() => hydrateRoot(root, app))
else createRoot(root).render(app)
