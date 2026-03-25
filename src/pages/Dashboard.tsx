import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Building2, Factory, MapPin, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { summary } from '../lib/data-loader';
import { formatNumber, MONTHS } from '../lib/utils';
import { useLang } from '../i18n/LangContext';

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

  const yearlyData = summary.yearlyTotals.map(y => ({
    year: String(y.year),
    permits: y.totalPermits,
    companies: y.totalCompanies,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.dashboard.title}</h1>
        <p className="text-gray-500 mt-1">{t.dashboard.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label={t.dashboard.permits2025} value={formatNumber(summary.totalPermits2025)} icon={TrendingUp} sub={t.dashboard.fullYear} color="bg-blue-50 text-blue-600" />
        <StatCard label={t.dashboard.permits2026} value={formatNumber(summary.totalPermits2026)} icon={TrendingUp} sub={t.dashboard.janFebOnly} color="bg-emerald-50 text-emerald-600" />
        <StatCard label={t.dashboard.companies2025} value={formatNumber(summary.totalCompanies2025)} icon={Users} color="bg-amber-50 text-amber-500" />
        <StatCard label={t.dashboard.approvalRate} value={`${summary.approvalRate2025}%`} icon={ShieldCheck} sub="2025" color="bg-purple-50 text-purple-600" />
      </div>

      {/* Yearly Growth Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboard.yearlyGrowth}</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={12} />
            <YAxis fontSize={12} />
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.dashboard.monthlyTrend}</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="2025" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="2026" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Top Companies */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t.dashboard.topCompanies}</h2>
            <Link to="/companies" className="text-sm text-blue-600 hover:text-blue-700 no-underline">{t.dashboard.viewAll}</Link>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topCompanies} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={11} />
              <YAxis type="category" dataKey="name" width={180} fontSize={11} tick={{ fill: '#374151' }} />
              <Tooltip />
              <Bar dataKey="total" fill="#2563eb" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Sectors */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t.dashboard.topSectors}</h2>
            <Link to="/sectors" className="text-sm text-blue-600 hover:text-blue-700 no-underline">{t.dashboard.viewAll}</Link>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topSectors} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={11} />
              <YAxis type="category" dataKey="name" width={200} fontSize={10} tick={{ fill: '#374151' }} />
              <Tooltip />
              <Bar dataKey="total" fill="#10b981" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/companies" className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-blue-300 transition-colors no-underline">
          <Building2 className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900">{formatNumber(summary.totalCompanies2025)} {t.dashboard.companies}</h3>
          <p className="text-sm text-gray-500 mt-1">{t.dashboard.companiesDesc}</p>
        </Link>
        <Link to="/sectors" className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-emerald-300 transition-colors no-underline">
          <Factory className="w-8 h-8 text-emerald-600 mb-2" />
          <h3 className="font-semibold text-gray-900">26 {t.dashboard.sectors}</h3>
          <p className="text-sm text-gray-500 mt-1">{t.dashboard.sectorsDesc}</p>
        </Link>
        <Link to="/counties" className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-amber-300 transition-colors no-underline">
          <MapPin className="w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-semibold text-gray-900">27 {t.dashboard.counties}</h3>
          <p className="text-sm text-gray-500 mt-1">{t.dashboard.countiesDesc}</p>
        </Link>
      </div>
    </div>
  );
}
