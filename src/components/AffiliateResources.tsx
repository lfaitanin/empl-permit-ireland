import { ExternalLink, Landmark, GraduationCap } from 'lucide-react';
import { AFFILIATE_LINKS, type AffiliateCategory } from '../lib/affiliates';
import { useLang } from '../i18n/LangContext';

const CATEGORY_ICONS: Record<AffiliateCategory, React.ElementType> = {
  banking: Landmark,
  courses: GraduationCap,
};

export default function AffiliateResources({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const active = AFFILIATE_LINKS.filter(l => l.url);
  if (active.length === 0) return null;

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
                  <a
                    key={l.name}
                    href={l.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 no-underline transition-colors"
                  >
                    {l.name} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
