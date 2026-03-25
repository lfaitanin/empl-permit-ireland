import { createContext, useContext, useState, type ReactNode } from 'react';
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
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return (stored === 'pt' || stored === 'en') ? stored : 'en';
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
