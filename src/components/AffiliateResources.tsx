import { ExternalLink, Landmark, GraduationCap } from 'lucide-react';
import { AFFILIATE_LINKS, type AffiliateCategory } from '../lib/affiliates';
import { useLang } from '../i18n/LangContext';

const CATEGORY_ICONS: Record<AffiliateCategory, React.ElementType> = {
  banking: Landmark,
  courses: GraduationCap,
};

function LinkButton({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 no-underline transition-colors"
    >
      {name} <ExternalLink className="w-3.5 h-3.5" />
    </a>
  );
}

export default function AffiliateResources({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useLang();
  const active = AFFILIATE_LINKS.filter(l => l.url);
  if (active.length === 0) return null;

  if (compact) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0"><Landmark className="w-4 h-4" /></div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t.affiliates.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.affiliates.disclosure}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0 pl-11 sm:pl-0">
          {active.map(l => <LinkButton key={l.name} name={l.name} url={l.url} />)}
        </div>
      </div>
    );
  }

  const categories = [...new Set(active.map(l => l.category))];

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 ${className}`}>
      <h2 className="font-semibold text-gray-900">{t.affiliates.title}</h2>
      <p className="text-sm text-gray-500 mt-0.5 mb-4">{t.affiliates.subtitle}</p>
      <div className="space-y-4">
        {categories.map(cat => {
          const Icon = CATEGORY_ICONS[cat];
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-800">{t.affiliates[cat]}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.filter(l => l.category === cat).map(l => (
                  <LinkButton key={l.name} name={l.name} url={l.url} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-4">{t.affiliates.disclosure}</p>
    </div>
  );
}
