import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Building2, Factory, MapPin, TrendingUp, Users, ShieldCheck, ListPlus, ExternalLink, ArrowRight } from 'lucide-react';
import { summary } from '../lib/data-loader';
import { formatNumber, MONTHS, MONTHS_FULL, shortenName, monthRangeLabel } from '../lib/utils';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';

const YEAR_COLORS: Record<number, string> = { 2022: '#94a3b8', 2023: '#f59e0b', 2024: '#8b5cf6', 2025: '#2563eb', 2026: '#10b981' };

const monthlyData = MONTHS.map((m, i) => ({
  month: m,
  '2025': summary.monthlyTrend2025[i] || 0,
  '2026': summary.monthlyTrend2026[i] || null,
}));

const topCompanies = summary.topCompanies2025.slice(0, 10);
const topSectors = summary.topSectors2025.slice(0, 8);

function StatCard({ label, value, icon: Icon, sub, color }: { label: string; value: string; icon: React.ElementType; sub?: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color}`}><Icon className="w-5 h-5" /></div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { t } = useLang();
  const n2026 = summary.monthlyTrend2026.length;
  const rangeLabel = monthRangeLabel(n2026);
  const ytd2025 = summary.monthlyTrend2025.slice(0, n2026).reduce((a, b) => a + b, 0);
  const growth = ytd2025 > 0 ? Math.round(((summary.totalPermits2026 - ytd2025) / ytd2025) * 100) : 0;
  const growthStr = growth >= 0 ? `+${growth}%` : `${growth}%`;
  useSEO({
    title: 'Ireland Work Permits Explorer | Companies, Sectors & Statistics 2022–2026',
    description: 'Explore Irish employment permit statistics from 2022 to 2026. Search 8,000+ sponsoring companies, 26 sectors, check your occupation eligibility and understand Irish visa stamps. Free tool for immigrants.',
    path: '/',
  });

  const yearlyData = summary.yearlyTotals.map(y => ({
    year: String(y.year),
    permits: y.totalPermits,
    companies: y.totalCompanies,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.dashboard.title}</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">{t.dashboard.subtitle}</p>
      </div>

      {/* Occupation Update Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0"><ListPlus className="w-4 h-4" /></div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t.dashboard.occupationUpdateTitle}</p>
            <p className="text-xs text-gray-600 mt-0.5">{t.dashboard.occupationUpdateDesc}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 pl-9 sm:pl-0">
          <Link to="/eligibility" className="flex items-center gap-1 text-xs font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 no-underline transition-colors">
            {t.dashboard.occupationUpdateCta} <ArrowRight className="w-3 h-3" />
          </Link>
          <a href="https://enterprise.gov.ie/en/news-and-events/department-news/2026/may/20260528.html" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium border border-emerald-400 text-emerald-800 px-3 py-1.5 rounded-lg hover:bg-emerald-100 no-underline transition-colors">
            {t.dashboard.occupationUpdateOfficial} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-1">
        <StatCard label={t.dashboard.permits2025} value={formatNumber(summary.totalPermits2025)} icon={TrendingUp} sub={t.dashboard.fullYear} color="bg-blue-50 text-blue-600" />
        <StatCard label={t.dashboard.permits2026} value={formatNumber(summary.totalPermits2026)} icon={TrendingUp} sub={`${rangeLabel} | ${growthStr} ${t.dashboard.vsSamePeriod}`} color="bg-emerald-50 text-emerald-600" />
        <StatCard label={t.dashboard.companies2025} value={formatNumber(summary.totalCompanies2025)} icon={Users} color="bg-amber-50 text-amber-500" />
        <StatCard label={t.dashboard.approvalRate} value={`${summary.approvalRate2025}%`} icon={ShieldCheck} sub="2025" color="bg-purple-50 text-purple-600" />
      </div>
      <p className="text-xs text-gray-400 text-right mb-5">{t.dashboard.dataThrough} {MONTHS_FULL[n2026 - 1]} 2026</p>

      {/* Yearly Growth Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">{t.dashboard.yearlyGrowth}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={11} />
            <YAxis fontSize={11} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} width={36} />
            <Tooltip formatter={(v: unknown) => formatNumber(Number(v))} />
            <Bar dataKey="permits" name="Permits" radius={[4,4,0,0]}>
              {yearlyData.map((entry) => (
                <rect key={entry.year} fill={YEAR_COLORS[Number(entry.year)] || '#2563eb'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">{t.dashboard.monthlyTrend}</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData} margin={{ left: 0, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" fontSize={10} interval={1} />
            <YAxis fontSize={10} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} width={32} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="2025" stroke="#2563eb" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="2026" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Top Companies */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t.dashboard.topCompanies}</h2>
            <Link to="/companies" className="text-sm text-blue-600 hover:text-blue-700 no-underline">{t.dashboard.viewAll}</Link>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topCompanies} layout="vertical" margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
              <YAxis type="category" dataKey="name" width={120} fontSize={10} tick={{ fill: '#374151' }}
                tickFormatter={(v: string) => shortenName(v, 16)} />
              <Tooltip />
              <Bar dataKey="total" fill="#2563eb" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Sectors */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t.dashboard.topSectors}</h2>
            <Link to="/sectors" className="text-sm text-blue-600 hover:text-blue-700 no-underline">{t.dashboard.viewAll}</Link>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topSectors} layout="vertical" margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={10} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
              <YAxis type="category" dataKey="name" width={130} fontSize={10} tick={{ fill: '#374151' }}
                tickFormatter={(v: string) => shortenName(v, 18)} />
              <Tooltip />
              <Bar dataKey="total" fill="#10b981" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3">
        <Link to="/companies" className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 hover:border-blue-300 transition-colors no-underline">
          <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{formatNumber(summary.totalCompanies2025)} {t.dashboard.companies}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">{t.dashboard.companiesDesc}</p>
        </Link>
        <Link to="/sectors" className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 hover:border-emerald-300 transition-colors no-underline">
          <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-2" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">26 {t.dashboard.sectors}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">{t.dashboard.sectorsDesc}</p>
        </Link>
        <Link to="/counties" className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 hover:border-amber-300 transition-colors no-underline">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mb-2" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">27 {t.dashboard.counties}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">{t.dashboard.countiesDesc}</p>
        </Link>
      </div>
    </div>
  );
}
