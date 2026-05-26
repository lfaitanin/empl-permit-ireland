import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Building2, Factory, MapPin, Globe, ShieldCheck, BookOpen, Info, Menu, X, ClipboardList, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLang } from '../../i18n/LangContext';
import type { Lang } from '../../types';

const LANG_OPTIONS: { code: Lang; native: string; label: string }[] = [
  { code: 'en', native: 'English', label: 'EN' },
  { code: 'pt', native: 'Português', label: 'PT' },
  { code: 'hi', native: 'हिन्दी', label: 'HI' },
  { code: 'tl', native: 'Filipino', label: 'TL' },
  { code: 'zh', native: '中文', label: '中' },
  { code: 'es', native: 'Español', label: 'ES' },
  { code: 'ur', native: 'اردو', label: 'UR' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLang();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = LANG_OPTIONS.find(l => l.code === lang) ?? LANG_OPTIONS[0];

  const navItems = [
    { to: '/', label: t.nav.dashboard, icon: BarChart3 },
    { to: '/companies', label: t.nav.companies, icon: Building2 },
    { to: '/sectors', label: t.nav.sectors, icon: Factory },
    { to: '/counties', label: t.nav.counties, icon: MapPin },
    { to: '/nationalities', label: t.nav.nationalities, icon: Globe },
    { to: '/eligibility', label: t.nav.eligibility, icon: ShieldCheck },
    { to: '/visa-guide', label: t.nav.visaGuide, icon: BookOpen },
    { to: '/apply', label: t.nav.howToApply, icon: ClipboardList },
    { to: '/about', label: t.nav.about, icon: Info },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-base no-underline">
            <BarChart3 className="w-5 h-5" />
            <span className="hidden sm:inline">IE Work Permits</span>
            <span className="sm:hidden">IE Permits</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium no-underline transition-colors ${
                    active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[140px] py-1 overflow-hidden">
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${lang === opt.code ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'}`}
                    >
                      <span>{opt.native}</span>
                      <span className="text-gray-400 ml-2">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — 2-column icon grid */}
        {mobileOpen && (
          <nav className="md:hidden pb-3 pt-1">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                      active ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700 active:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
