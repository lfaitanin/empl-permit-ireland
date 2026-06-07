import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, ArrowUpDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAllCompanies } from '../lib/data-loader';
import { formatNumber } from '../lib/utils';
import { googleJobsUrl, linkedInUrl } from '../lib/url-builders';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';

const allCompanies = getAllCompanies();
const fuse = new Fuse(allCompanies, { keys: ['name'], threshold: 0.3 });

const PAGE_SIZE = 50;

type SortKey = 'name' | 'total2022' | 'total2023' | 'total2024' | 'total2025' | 'total2026' | 'grandTotal' | 'yearsActive';
type SortDir = 'asc' | 'desc';
type SectorId = 'all' | 'it' | 'healthcare' | 'consulting' | 'pharma' | 'hospitality' | 'education';

const SECTOR_FILTERS: { id: SectorId; label: string; emoji: string; nameKw: string[]; slugParts: string[] }[] = [
  {
    id: 'it', label: 'IT & Tech', emoji: '💻',
    nameKw: ['software', 'technology', 'technologies', 'digital', 'cloud', 'cyber', 'analytics', 'computing', 'saas', 'fintech', 'networks', 'systems ltd', 'systems limited', 'solutions ltd', 'solutions limited', 'data services', 'it services'],
    slugParts: ['google', 'amazon-development', 'amazon-web', 'microsoft', 'apple-distribution', 'meta-platforms', 'linkedin', 'facebook', 'twitter', 'accenture', 'tata-consultancy', 'ibm-', 'oracle-', 'salesforce', 'workday', 'hubspot', 'stripe', 'zendesk', 'intel-', 'ericsson', 'huawei', 'intercom', 'airbnb', 'shopify', 'databricks', 'snowflake', 'servicenow', 'sap-', 'infosys', 'wipro', 'hcl-', 'cognizant', 'capgemini', 'dxc', 'fujitsu', 'vmware', 'cisco', 'indeed-', 'gitlab', 'atlassian', 'ringcentral', 'qualtrics', 'klaviyo', 'twilio', 'datadog', 'box-ireland', 'dropbox', 'docusign', 'zendesk', 'sprinklr', 'medallia', 'wix-', 'palo-alto', 'fortinet'],
  },
  {
    id: 'healthcare', label: 'Healthcare', emoji: '🏥',
    nameKw: ['hospital', 'hospice', 'healthcare', 'health care', 'nursing home', 'homecare', 'home care', 'care facility', 'care services', 'disability', 'physiotherapy', 'clinic', 'rehabilitation', 'dental'],
    slugParts: ['hse-', 'health-service-executive', 'redwood-extended', 'mowlam', 'caredoc', 'beacon-hospital', 'bon-secours', 'mercy-university', 'st-james', 'beaumont-hospital', 'university-hospital', 'childrens-health', 'national-childrens', 'cork-university-hospital', 'st-vincents', 'mater-', 'tallaght-university'],
  },
  {
    id: 'consulting', label: 'Finance & Consulting', emoji: '💰',
    nameKw: ['bank', 'banking', 'financial services', 'capital markets', 'investment', 'insurance', ' consulting', 'consultants', 'advisory', 'advisors', 'audit', 'accountants', 'accountancy', 'asset management', 'wealth management'],
    slugParts: ['ernst-young', 'deloitte', 'kpmg', 'pwc', 'pricewaterhousecoopers', 'mazars', 'grant-thornton', 'bdo-', 'marsh-', 'aon-', 'willis-', 'citibank', 'bank-of-ireland', 'allied-irish', 'permanent-tsb', 'ulster-bank', 'ing-bank', 'bnp-paribas', 'societe-generale', 'deutsche-bank', 'jp-morgan', 'goldman-sachs', 'morgan-stanley', 'merrill-lynch', 'barclays', 'hsbc-', 'northern-trust', 'state-street', 'blackrock', 'fidelity'],
  },
  {
    id: 'pharma', label: 'Pharma & Biotech', emoji: '💊',
    nameKw: ['pharma', 'pharmaceutical', 'biotech', 'biologics', 'therapeutics', 'life sciences', 'medtech', 'biopharma', 'biosciences', 'biopharmaceutical'],
    slugParts: ['pfizer', 'johnson-johnson', 'roche-', 'novartis', 'lilly-', 'abbvie', 'bristol-myers', 'astrazeneca', 'merck-', 'biogen', 'amgen', 'regeneron', 'gilead', 'mylan', 'allergan', 'alkermes', 'prothena', 'icon-plc', 'parexel', 'iqvia', 'wuxi-biologics', 'lonza', 'quintiles'],
  },
  {
    id: 'hospitality', label: 'Hospitality & Food', emoji: '🍽️',
    nameKw: ['hotel', 'restaurant', 'hospitality', 'catering', 'meat processing', 'meats', 'food company', 'food group', 'beverage', 'pub group', 'cuisine', 'bakery'],
    slugParts: ['dawn-meats', 'kepak', 'liffey-meats', 'moyvalley-meats', 'keelings', 'dairygold', 'kerry-group', 'glanbia', 'arrabawn', 'lakeland-dairies', 'dunnes-stores', 'supervalu', 'centra-', 'spar-ireland'],
  },
  {
    id: 'education', label: 'Education', emoji: '🎓',
    nameKw: ['university', 'university college', 'college of', 'institute of technology', 'technological university', 'school of', 'education board', 'training centre', 'etb '],
    slugParts: ['university-of-', 'national-university', 'dublin-city-university', 'trinity-college', 'ucd-', 'tcd-', 'dcu-', 'rcsi-', 'royal-college-of-surgeons', 'university-limerick', 'university-galway', 'maynooth-university', 'athlone-institute'],
  },
];

function inferSector(name: string, slug: string): SectorId | null {
  const nl = name.toLowerCase();
  const sl = slug.toLowerCase();
  for (const s of SECTOR_FILTERS) {
    if (s.id === 'all') continue;
    if (s.slugParts.some(p => sl.includes(p))) return s.id;
    if (s.nameKw.some(kw => nl.includes(kw))) return s.id;
  }
  return null;
}

const MIN_PERMIT_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '5+', value: 5 },
  { label: '20+', value: 20 },
  { label: '50+', value: 50 },
  { label: '100+', value: 100 },
];

export default function Companies() {
  const { t } = useLang();
  useSEO({
    title: 'Companies Sponsoring Work Permits in Ireland | 8,000+ Employers',
    description: 'Search 8,000+ companies that sponsored Irish employment permits from 2022 to 2026. Filter by year, see permit history, and find direct job links on LinkedIn, Indeed and Google Jobs.',
    path: '/companies',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('grandTotal');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [yearFilter, setYearFilter] = useState<'all' | '2022' | '2023' | '2024' | '2025' | '2026'>('all');
  const [sectorFilter, setSectorFilter] = useState<SectorId>('all');
  const [active2026, setActive2026] = useState(false);
  const [minPermits, setMinPermits] = useState(0);

  const reset = () => { setSectorFilter('all'); setActive2026(false); setMinPermits(0); setYearFilter('all'); setPage(0); };

  const filtered = useMemo(() => {
    let list = search ? fuse.search(search).map(r => r.item) : allCompanies;
    if (yearFilter !== 'all') {
      const key = `total${yearFilter}` as keyof typeof list[0];
      list = list.filter(c => (c[key] as number) > 0);
    }
    if (sectorFilter !== 'all') {
      list = list.filter(c => inferSector(c.name, c.slug) === sectorFilter);
    }
    if (active2026) {
      list = list.filter(c => c.total2026 > 0);
    }
    if (minPermits > 0) {
      list = list.filter(c => c.grandTotal >= minPermits);
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey as keyof typeof a] as number | string;
      const bv = b[sortKey as keyof typeof b] as number | string;
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [search, sortKey, sortDir, yearFilter, sectorFilter, active2026, minPermits]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.companies.title}</h1>
      <p className="text-gray-500 mb-6">{formatNumber(allCompanies.length)} {t.companies.subtitle}</p>

      {/* Search + year */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
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

      {/* Sector chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => { setSectorFilter('all'); setPage(0); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${sectorFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
        >
          <SlidersHorizontal className="w-3 h-3" /> All sectors
        </button>
        {SECTOR_FILTERS.map(s => (
          <button
            key={s.id}
            onClick={() => { setSectorFilter(s.id); setPage(0); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${sectorFilter === s.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Extra filters row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Active in 2026 */}
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
          <div
            onClick={() => { setActive2026(!active2026); setPage(0); }}
            className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${active2026 ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${active2026 ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          Active in 2026
        </label>

        {/* Min permits */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="font-medium">Min permits:</span>
          {MIN_PERMIT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setMinPermits(opt.value); setPage(0); }}
              className={`px-2 py-1 rounded border text-xs transition-colors ${minPermits === opt.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Reset */}
        {(sectorFilter !== 'all' || active2026 || minPermits > 0 || yearFilter !== 'all') && (
          <button onClick={reset} className="text-xs text-red-500 hover:text-red-700 underline ml-auto">
            Clear filters
          </button>
        )}
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
