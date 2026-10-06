import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLang } from '../../i18n/LangContext';
import { translations } from '../../i18n/translations';
import type { Lang } from '../../types';

export default function PageLayout() {
  const { setLang } = useLang();

  // Apply the saved language here, inside the page's Suspense boundary: this
  // effect only runs once the boundary has hydrated, so the switch can't
  // collide with hydrating the prerendered English HTML.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang');
      if (stored && stored !== 'en' && stored in translations) setLang(stored as Lang);
    } catch {
      // storage unavailable — keep English
    }
  }, [setLang]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
