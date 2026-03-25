import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUpDown } from 'lucide-react';
import { countiesByYear } from '../lib/data-loader';
import { formatNumber } from '../lib/utils';
import { useLang } from '../i18n/LangContext';

type SortKey = 'name' | 'issued' | 'refused' | 'approvalRate';

export default function Counties() {
  const { t } = useLang();
  const [year, setYear] = useState<number>(2025);
  const [sortKey, setSortKey] = useState<SortKey>('issued');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const counties = countiesByYear[year] || [];

  const sorted = [...counties].sort((a, b) => {
    const av = a[sortKey] as number | string;
    const bv = b[sortKey] as number | string;
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
    return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const maxIssued = Math.max(...counties.map(c => c.issued));
  const chartData = sorted.slice(0, 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.counties.title}</h1>
          <p className="text-gray-500 mt-1">{t.counties.subtitle}</p>
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

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.counties.top15}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" fontSize={11} />
            <YAxis type="category" dataKey="name" width={100} fontSize={12} />
            <Tooltip />
            <Bar dataKey="issued" fill="#2563eb" name={t.counties.issued} radius={[0,4,4,0]} />
            <Bar dataKey="refused" fill="#ef4444" name={t.counties.refused} radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900">
                  {t.counties.county} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('issued')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.counties.issued} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('refused')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.counties.refused} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => toggleSort('approvalRate')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
                  {t.counties.approvalRate} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">{t.counties.distribution}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(c => (
              <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700">{formatNumber(c.issued)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-600">{formatNumber(c.refused)}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono font-medium ${c.approvalRate >= 90 ? 'text-emerald-600' : c.approvalRate >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                    {c.approvalRate}%
                  </span>
                </td>
                <td className="px-4 py-3 w-48">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: `${(c.issued / maxIssued) * 100}%` }} />
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
