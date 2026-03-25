import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAllCompanies } from '../lib/data-loader';
import { formatNumber } from '../lib/utils';
import { googleJobsUrl, linkedInUrl } from '../lib/url-builders';
import { useLang } from '../i18n/LangContext';

const allCompanies = getAllCompanies();
const fuse = new Fuse(allCompanies, { keys: ['name'], threshold: 0.3 });

const PAGE_SIZE = 50;

type SortKey = 'name' | 'total2022' | 'total2023' | 'total2024' | 'total2025' | 'total2026' | 'grandTotal' | 'yearsActive';
type SortDir = 'asc' | 'desc';

export default function Companies() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('grandTotal');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [yearFilter, setYearFilter] = useState<'all' | '2022' | '2023' | '2024' | '2025' | '2026'>('all');

  const filtered = useMemo(() => {
    let list = search ? fuse.search(search).map(r => r.item) : allCompanies;
    if (yearFilter !== 'all') {
      const key = `total${yearFilter}` as keyof typeof list[0];
      list = list.filter(c => (c[key] as number) > 0);
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey as keyof typeof a] as number | string;
      const bv = b[sortKey as keyof typeof b] as number | string;
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [search, sortKey, sortDir, yearFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
    setPage(0);
  };

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900 ml-auto">
      {label} <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.companies.title}</h1>
      <p className="text-gray-500 mb-6">{formatNumber(allCompanies.length)} {t.companies.subtitle}</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder={t.companies.searchPlaceholder} value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select value={yearFilter} onChange={e => { setYearFilter(e.target.value as typeof yearFilter); setPage(0); }}
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">{t.companies.allYears}</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <div className="text-sm text-gray-500 mb-3">{formatNumber(filtered.length)} {t.companies.found}</div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-gray-600 font-medium w-8">#</th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-gray-600 font-medium hover:text-gray-900">
                  {t.companies.company} <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-right hidden xl:table-cell"><SortBtn k="total2022" label="2022" /></th>
              <th className="px-4 py-3 text-right hidden xl:table-cell"><SortBtn k="total2023" label="2023" /></th>
              <th className="px-4 py-3 text-right hidden lg:table-cell"><SortBtn k="total2024" label="2024" /></th>
              <th className="px-4 py-3 text-right hidden sm:table-cell"><SortBtn k="total2025" label="2025" /></th>
              <th className="px-4 py-3 text-right hidden sm:table-cell"><SortBtn k="total2026" label="2026" /></th>
              <th className="px-4 py-3 text-right"><SortBtn k="grandTotal" label={t.companies.total} /></th>
              <th className="px-4 py-3 text-right hidden md:table-cell"><SortBtn k="yearsActive" label={t.companies.yearsActive} /></th>
              <th className="px-4 py-3 text-center text-gray-600 font-medium">{t.companies.links}</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((c, i) => (
              <tr key={c.slug} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{page * PAGE_SIZE + i + 1}</td>
                <td className="px-4 py-3">
                  <Link to={`/companies/${c.slug}`} className="text-blue-600 hover:text-blue-800 font-medium no-underline">{c.name}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono text-gray-500 text-xs hidden xl:table-cell">{c.total2022 > 0 ? formatNumber(c.total2022) : '-'}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-500 text-xs hidden xl:table-cell">{c.total2023 > 0 ? formatNumber(c.total2023) : '-'}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-600 text-xs hidden lg:table-cell">{c.total2024 > 0 ? formatNumber(c.total2024) : '-'}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700 hidden sm:table-cell">{c.total2025 > 0 ? formatNumber(c.total2025) : '-'}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700 hidden sm:table-cell">{c.total2026 > 0 ? formatNumber(c.total2026) : '-'}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-gray-900">{formatNumber(c.grandTotal)}</td>
                <td className="px-4 py-3 text-right hidden md:table-cell">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${c.yearsActive >= 4 ? 'bg-emerald-100 text-emerald-700' : c.yearsActive >= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {c.yearsActive}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <a href={googleJobsUrl(c.name)} target="_blank" rel="noopener noreferrer" title="Google Jobs" className="text-gray-400 hover:text-blue-600">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href={linkedInUrl(c.name)} target="_blank" rel="noopener noreferrer" title="LinkedIn Jobs" className="text-gray-400 hover:text-blue-600">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">{t.companies.page} {page + 1} {t.companies.of} {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" /> {t.companies.prev}
            </button>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50">
              {t.companies.next} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
