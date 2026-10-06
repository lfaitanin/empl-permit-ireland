import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Lang } from '../types';
import { translations, type Translations } from './translations';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  // Pages are prerendered in English, so start in English to match that HTML
  // during hydration; PageLayout switches to the saved language after.
  const [lang, setLang] = useState<Lang>('en');

  const handleSetLang = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem('lang', l); } catch { /* ignore */ }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
