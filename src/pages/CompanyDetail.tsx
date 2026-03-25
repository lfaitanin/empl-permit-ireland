import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { ArrowLeft, ExternalLink, Search as SearchIcon, Briefcase, Star } from 'lucide-react';
import { getCompanyBySlug, ALL_YEARS } from '../lib/data-loader';
import { googleJobsUrl, linkedInUrl, indeedUrl, careersPageUrl, irishJobsUrl } from '../lib/url-builders';
import { MONTHS, formatNumber } from '../lib/utils';
import { useLang } from '../i18n/LangContext';

const YEAR_COLORS: Record<number, string> = { 2022: '#94a3b8', 2023: '#f59e0b', 2024: '#8b5cf6', 2025: '#2563eb', 2026: '#10b981' };

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLang();
  const byYear = getCompanyBySlug(slug || '');

  const activeYears = ALL_YEARS.filter(y => byYear[y]);
  if (activeYears.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.companyDetail.notFound}</h1>
        <Link to="/companies" className="text-blue-600 hover:text-blue-800">{t.companyDetail.backToCompanies}</Link>
      </div>
    );
  }

  const name = byYear[activeYears[0]]!.name;

  // Monthly chart for 2025 (12 months) if available
  const company2025 = byYear[2025];
  const company2026 = byYear[2026];
  const monthlyData = MONTHS.map((m, i) => ({
    month: m,
    '2025': company2025?.monthly[i] || 0,
    '2026': company2026?.monthly[i] ?? null,
  }));

  // Multi-year trend chart
  const yearTrendData = ALL_YEARS.map(y => ({
    year: String(y),
    permits: byYear[y]?.total || 0,
  }));

  const totalAll = activeYears.reduce((sum, y) => sum + (byYear[y]?.total || 0), 0);

  const jobLinks = [
    { label: 'Google Jobs', url: googleJobsUrl(name), color: 'bg-red-50 text-red-700 border-red-200' },
    { label: 'LinkedIn Jobs', url: linkedInUrl(name), color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Indeed Ireland', url: indeedUrl(name), color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'IrishJobs.ie', url: irishJobsUrl(name), color: 'bg-green-50 text-green-700 border-green-200' },
    { label: 'Careers Page', url: careersPageUrl(name), color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/companies" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 no-underline mb-4">
        <ArrowLeft className="w-4 h-4" /> {t.companyDetail.backToCompanies}
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
        <div className="flex flex-wrap gap-2 mt-3">
          {activeYears.map(y => (
            <span key={y} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: YEAR_COLORS[y] + '20', color: YEAR_COLORS[y] }}>
              <Briefcase className="w-3.5 h-3.5" /> {formatNumber(byYear[y]!.total)} {t.companyDetail.permitsIn} {y}
            </span>
          ))}
          {activeYears.length >= 3 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              <Star className="w-3.5 h-3.5 text-amber-500" /> {activeYears.length} {t.companyDetail.yearsSponsoring}
            </span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Multi-year trend */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.companyDetail.multiYearTrend}</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={yearTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={12} />
              <YAxis fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="permits" radius={[4,4,0,0]}>
                {yearTrendData.map((entry) => (
                  <rect key={entry.year} fill={YEAR_COLORS[Number(entry.year)] || '#2563eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly 2025 */}
        {(company2025 || company2026) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.companyDetail.monthlyPermits}</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Legend />
                {company2025 && <Bar dataKey="2025" fill="#2563eb" radius={[4,4,0,0]} />}
                {company2026 && <Bar dataKey="2026" fill="#10b981" radius={[4,4,0,0]} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Job Links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <SearchIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t.companyDetail.findJobs} {name}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">{t.companyDetail.clickToSearch}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobLinks.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-medium text-sm no-underline transition-all hover:shadow-md ${link.color}`}>
              <ExternalLink className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
