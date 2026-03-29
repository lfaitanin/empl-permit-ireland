import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageLayout from './components/layout/PageLayout';
import { LangProvider } from './i18n/LangContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Companies = lazy(() => import('./pages/Companies'));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'));
const Sectors = lazy(() => import('./pages/Sectors'));
const Counties = lazy(() => import('./pages/Counties'));
const Nationalities = lazy(() => import('./pages/Nationalities'));
const Eligibility = lazy(() => import('./pages/Eligibility'));
const VisaGuide = lazy(() => import('./pages/VisaGuide'));
const About = lazy(() => import('./pages/About'));

function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/counties" element={<Counties />} />
              <Route path="/nationalities" element={<Nationalities />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/visa-guide" element={<VisaGuide />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LangProvider>
  );
}
