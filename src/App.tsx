import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import PageLayout from './components/layout/PageLayout';
import { LangProvider } from './i18n/LangContext';
import AdSenseScript from './components/ads/AdSenseScript';
import { pageRoutes, notFoundPage as NotFound } from './pages/routes';

function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

/** Everything inside the router — shared by the browser app and the prerenderer. */
export function AppRoutes() {
  return (
    <LangProvider>
      <AdSenseScript />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PageLayout />}>
            {pageRoutes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />)}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </LangProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
