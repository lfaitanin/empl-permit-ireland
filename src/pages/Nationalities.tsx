import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { ArrowUpDown, Search, TrendingUp } from 'lucide-react';
import { nationalitiesByYear, ALL_YEARS } from '../lib/data-loader';
import { formatNumber } from '../lib/utils';
import { useLang } from '../i18n/LangContext';
import Fuse from 'fuse.js';

type SortKey = 'name' | 'issued' | 'refused' | 'approvalRate';

const HIGHLIGHT_NATIONALITIES = ['Brazil', 'India', 'Philippines', 'Pakistan', 'Nigeria', 'South Africa', 'Bangladesh', 'China', 'Turkey', 'Egypt'];

export default function Nationalities() {
  const { t } = useLang();
  const [year, setYear] = useState<number>(2025);
  const [sortKey, setSortKey] = useState<SortKey>('issued');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  const nationalities = nationalitiesByYear[year] || [];

  const fuse = useMemo(() => new Fuse(nationalities, { keys: ['name'], threshold: 0.3 }), [nationalities]);

  const filtered = search
    ? fuse.search(search).map(r => r.item)
    : nationalities;

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey] as number | string;
    const bv = b[sortKey] as number | string;
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
    return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const chartData = nationalities.slice(0, 15);
  const maxIssued = Math.max(...nationalities.map(n => n.issued), 1);

  // Multi-year trend for highlighted nationalities
  const trendData = useMemo(() => {
    const yearlyMap: Record<string, Record<number, number>> = {};
    for (const nat of HIGHLIGHT_NATIONALITIES) {
      yearlyMap[nat] = {};
      for (const y of ALL_YEARS) {
        const data = nationalitiesByYear[y];
        const found = data?.find(n => n.name === nat);
        yearlyMap[nat][y] = found?.issued || 0;
      }
    }
    return ALL_YEARS.map(y => {
      const entry: Record<string, number | string> = { year: y === 2026 ? '2026*' : String(y) };
      for (const nat of HIGHLIGHT_NATIONALITIES) {
        entry[nat] = yearlyMap[nat][y];
      }
      return entry;
    });
  }, []);

  // Brazil highlight
  const brazilData = useMemo(() => {
    return ALL_YEARS.map(y => {
      const data = nationalitiesByYear[y];
      const br = data?.find(n => n.name === 'Brazil');
      return { year: y === 2026 ? '2026*' : String(y), issued: br?.issued || 0, refused: br?.refused || 0 };
    });
  }, []);

  const brazilCurrent = nationalities.find(n => n.name === 'Brazil');
  const brazilRank = nationalities.findIndex(n => n.name === 'Brazil') + 1;

  const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#ea580c', '#8b5cf6', '#0891b2', '#d97706', '#be185d', '#4f46e5', '#059669'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.nationalities.title}</h1>
          <p className="text-gray-500 mt-1">{t.nationalities.subtitle}</p>
        </div>
        <select value={year} onChange={e => setYear(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
          <option value={2026}>2026 (Jan–Feb)</option>
        </select>
      </div>

      {/* Brazil Highlight Card */}
      {brazilCurrent && (
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🇧🇷</span>
            <h2 className="text-lg font-bold text-gray-900">{t.nationalities.brazilHighlight}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-green-700">{formatNumber(brazilCurrent.issued)}</div>
              <div className="text-xs text-gray-500">{t.nationalities.permitsIssued}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-700">#{brazilRank}</div>
              <div className="text-xs text-gray-500">{t.nationalities.ranking}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{brazilCurrent.approvalRate}%</div>
              <div className="text-xs text-gray-500">{t.nationalities.approvalRate}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{formatNumber(brazilCurrent.refused)}</div>
              <div className="text-xs text-gray-500">{t.nationalities.refused}</div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brazilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" fontSize={12} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="issued" fill="#16a34a" name={t.nationalities.issued} radius={[4,4,0,0]} />
                <Bar dataKey="refused" fill="#ef4444" name={t.nationalities.refused} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top 15 Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.nationalities.top15}</h2>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={11} />
            <YAxis type="category" dataKey="name" width={120} fontSize={12} />
            <Tooltip />
            <Bar dataKey="issued" fill="#2563eb" name={t.nationalities.issued} radius={[0,4,4,0]} />
            <Bar dataKey="refused" fill="#ef4444" name={t.nationalities.refused} radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Multi-year trend */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t.nationalities.yearlyTrend}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-3">{t.nationalities.yearlyTrendDesc}</p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={12} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Legend />
            {HIGHLIGHT_NATIONALITIES.map((nat, i) => (
              <Line key={nat} type="monotone" dataKey={nat} stroke={COLORS[i % COLORS.length]}
                strokeWidth={nat === 'Brazil' ? 3 : 1.5}
                dot={{ r: nat === 'Brazil' ? 4 : 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">* 2026: Jan–Feb {t.nationalities.only}</p>
      </div>

      {/* Search + Table */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.nationalities.searchPlaceholder}
            className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{sorted.length} {t.nationalities.found}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900">
                  {t.nationalities.nationality} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('issued')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.nationalities.issued} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('refused')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.nationalities.refused} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('approvalRate')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.nationalities.approvalRate} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">{t.nationalities.distribution}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(n => (
              <tr key={n.slug} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${n.name === 'Brazil' ? 'bg-green-50/50' : ''}`}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {n.name}
                  {n.name === 'Brazil' && <span className="ml-1.5 text-xs">🇧🇷</span>}
                </td>
                <td className="px-4 py-3 text-right font-mono text-gray-700">{formatNumber(n.issued)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-600">{formatNumber(n.refused)}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono font-medium ${n.approvalRate >= 90 ? 'text-emerald-600' : n.approvalRate >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                    {n.approvalRate}%
                  </span>
                </td>
                <td className="px-4 py-3 w-48">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: `${(n.issued / maxIssued) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
