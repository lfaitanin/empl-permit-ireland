import { useState, useMemo } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, ExternalLink, ChevronDown, ChevronUp, Ban, Briefcase } from 'lucide-react';

const OTHER_PERMITS = [
  { name: 'Dependent/Partner/Spouse Permit', desc: 'Allows spouses, civil partners and dependents of Critical Skills or Researcher permit holders to work freely in Ireland without a separate employment permit.' },
  { name: 'Intra-Company Transfer Permit', desc: 'For senior management, key personnel or trainees being transferred from an overseas branch of a multinational to an Irish operation.' },
  { name: 'Contract for Services Permit', desc: 'For non-EEA employees of a foreign company being temporarily assigned to carry out a contract for services in Ireland.' },
  { name: 'Reactivation Permit', desc: 'For non-EEA nationals who previously held a valid permit but fell out of the system through no fault of their own, or experienced workplace exploitation.' },
  { name: 'Internship Permit', desc: 'For non-EEA full-time students at international institutions studying Critical Skills-relevant disciplines who need Irish work experience.' },
  { name: 'Sport & Cultural Permit', desc: 'For non-EEA nationals with relevant qualifications, skills or experience in the sporting or cultural sectors.' },
  { name: 'Exchange Agreement Permit', desc: 'Facilitates employment under prescribed international bilateral agreements between Ireland and other countries.' },
];

// Quotas filled then RENEWED May 29, 2026 — accepting applications again
const RENEWED_QUOTAS = [
  {
    occupation: 'Car Mechanic / Motor Mechanic / Auto Electrician / Motor Vehicle Technician',
    filledDate: 'March 19, 2026',
    renewedDate: 'May 29, 2026',
    note: 'Previously full. Quota renewed — applications accepted again.',
  },
  {
    occupation: 'Catering & Bar Manager / Hotel & Accommodation Manager / Restaurant Manager / Publican & Manager of Licensed Premises',
    filledDate: 'April 28, 2026',
    renewedDate: 'May 29, 2026',
    note: 'Previously full. Quota renewed — applications accepted again.',
  },
];

// New General Employment Permit roles added May 29, 2026
const GENERAL_PERMIT_NEW = [
  // No quota
  { title: 'Pharmaceutical Technician (Healthcare)', quota: false },
  { title: 'Dental Hygienist', quota: false },
  { title: 'Plastic Lining Technician', quota: false },
  { title: 'Steel Fixer', quota: false },
  { title: 'Fencing Operator / Erector', quota: false },
  { title: 'Curtain Waller', quota: false },
  { title: 'Printer', quota: false },
  { title: 'Industrial Machine Knitter', quota: false },
  { title: 'Concrete Pump Operator', quota: false },
  // With new quota (open from 10 Jun 2026)
  { title: 'Fish Filleter', quota: true },
  { title: 'Seafood Operative', quota: true },
];
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';
import Fuse from 'fuse.js';

// Critical Skills Occupation List (SOC 2010) — updated May 2026
const CRITICAL_SKILLS: { title: string; socCode: string }[] = [
  { title: 'ICT Manager', socCode: '1136' },
  { title: 'Financial Manager', socCode: '1131' },
  { title: 'Marketing and Sales Director', socCode: '1132' },
  { title: 'Research and Development Manager', socCode: '1137' },
  { title: 'Construction Project Manager', socCode: '2121' },
  { title: 'Civil Engineer', socCode: '2121' },
  { title: 'Mechanical Engineer', socCode: '2122' },
  { title: 'Electrical Engineer', socCode: '2123' },
  { title: 'Electronics Engineer', socCode: '2124' },
  { title: 'Chemical Engineer', socCode: '2125' },
  { title: 'Design Engineer', socCode: '2126' },
  { title: 'Production and Process Engineer', socCode: '2127' },
  { title: 'Biomedical Engineer', socCode: '2126' },
  { title: 'Aerospace Engineer', socCode: '2126' },
  { title: 'IT Business Analyst / Architect / Systems Designer', socCode: '2135' },
  { title: 'Programmer / Software Developer', socCode: '2136' },
  { title: 'Web Design and Development Professional', socCode: '2137' },
  { title: 'Data Analyst / Data Scientist', socCode: '2136' },
  { title: 'Cybersecurity Specialist', socCode: '2136' },
  { title: 'DevOps Engineer', socCode: '2136' },
  { title: 'Cloud Engineer / Architect', socCode: '2135' },
  { title: 'Machine Learning Engineer', socCode: '2136' },
  { title: 'Database Specialist / DBA', socCode: '2139' },
  { title: 'Network Engineer', socCode: '5242' },
  { title: 'Registered Nurse (General / Psychiatric / Intellectual Disability)', socCode: '2231' },
  { title: 'Midwife', socCode: '2232' },
  { title: 'Medical Practitioner / Doctor', socCode: '2211' },
  { title: 'Specialist Doctor / Consultant', socCode: '2212' },
  { title: 'Dentist', socCode: '2215' },
  { title: 'Pharmacist', socCode: '2213' },
  { title: 'Radiographer', socCode: '2217' },
  { title: 'Physiotherapist', socCode: '2221' },
  { title: 'Occupational Therapist', socCode: '2222' },
  { title: 'Speech and Language Therapist', socCode: '2223' },
  { title: 'Psychologist (Clinical / Educational)', socCode: '2212' },
  { title: 'Social Worker', socCode: '2442' },
  { title: 'Quantity Surveyor', socCode: '2433' },
  { title: 'Chartered Surveyor', socCode: '2434' },
  { title: 'Actuary', socCode: '2424' },
  { title: 'Chartered / Certified Accountant', socCode: '2421' },
  { title: 'Financial Analyst / Advisor', socCode: '2422' },
  { title: 'Auditor', socCode: '3537' },
  { title: 'Environmental Scientist', socCode: '2112' },
  { title: 'Biologist / Biochemist', socCode: '2112' },
  { title: 'Physicist', socCode: '2113' },
  { title: 'Chemist', socCode: '2111' },
  { title: 'Veterinary Surgeon', socCode: '2216' },
  { title: 'Architect', socCode: '2431' },
  { title: 'Town Planner', socCode: '2432' },
  { title: 'Agricultural Engineer / Scientist', socCode: '2112' },
  { title: 'Quality Assurance Manager (Pharma / Medical Devices)', socCode: '1137' },
  { title: 'Validation Engineer (Pharma)', socCode: '2127' },
  { title: 'Supply Chain Manager', socCode: '1162' },
  // Added May 29, 2026
  { title: 'Agronomist', socCode: '2112' },
  { title: 'Construction Planner / Scheduler', socCode: '2121' },
  { title: 'Community Eye Care Professional', socCode: '2217' },
  { title: 'Intellectual Property Professional / Patent Attorney', socCode: '2419' },
  { title: 'Geospatial Surveyor / Land Surveyor / Geomatics Surveyor', socCode: '2434' },
  { title: 'Rigger (Games Industry)', socCode: '2137' },
];

// Ineligible Categories of Employment
const INELIGIBLE: { title: string; socCode: string }[] = [
  { title: 'Cleaner / Domestic Worker', socCode: '9233' },
  { title: 'Food Processing Operative', socCode: '8111' },
  { title: 'Sales Assistant / Retail Cashier', socCode: '7111' },
  { title: 'Waiter / Waitress', socCode: '9272' },
  { title: 'Bar Staff', socCode: '9274' },
  { title: 'General Labourer', socCode: '9120' },
  { title: 'Security Guard', socCode: '9241' },
  { title: 'Receptionist', socCode: '4215' },
  { title: 'General Office Clerk', socCode: '4159' },
  { title: 'Childminder / Nursery Worker', socCode: '6121' },
  { title: 'Healthcare Assistant / Care Worker', socCode: '6145' },
  { title: 'Hairdresser / Beautician', socCode: '6221' },
  { title: 'Driver / Delivery Driver', socCode: '8211' },
  { title: 'Warehouse Operative', socCode: '9260' },
  { title: 'Kitchen Porter / Kitchen Hand', socCode: '9272' },
  { title: 'Hotel Room Attendant / Housekeeper', socCode: '9233' },
  { title: 'Agricultural Worker / Farm Hand', socCode: '9111' },
  { title: 'Craft Worker (not meeting trade qualifications)', socCode: '5000' },
  { title: 'Transport Operative', socCode: '8200' },
  { title: 'General Operative / Production Worker', socCode: '8100' },
];

type SearchResult = {
  title: string;
  socCode: string;
  category: 'critical_skills' | 'general' | 'ineligible';
};

export default function Eligibility() {
  const { t } = useLang();
  useSEO({
    title: 'Ireland Work Permit Eligibility Checker | Critical Skills & General Permits',
    description: 'Check if your occupation qualifies for an Irish employment permit. Search the Critical Skills Occupation List, ineligible categories, salary thresholds (€40,904 / €34,000) and permit types explained simply.',
    path: '/eligibility',
  });
  const [search, setSearch] = useState('');
  const [showCriticalSkills, setShowCriticalSkills] = useState(false);
  const [showIneligible, setShowIneligible] = useState(false);
  const [showOtherPermits, setShowOtherPermits] = useState(false);
  const [showNewGeneral, setShowNewGeneral] = useState(false);
  const [showRenewed, setShowRenewed] = useState(false);

  const allOccupations: SearchResult[] = useMemo(() => [
    ...CRITICAL_SKILLS.map(o => ({ ...o, category: 'critical_skills' as const })),
    ...INELIGIBLE.map(o => ({ ...o, category: 'ineligible' as const })),
    ...GENERAL_PERMIT_NEW.map(o => ({ title: o.title, socCode: '', category: 'general' as const })),
  ], []);

  const fuse = useMemo(() => new Fuse(allOccupations, {
    keys: ['title', 'socCode'],
    threshold: 0.4,
    includeScore: true,
  }), [allOccupations]);

  const results = search.length >= 2
    ? fuse.search(search).map(r => r.item)
    : [];

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'critical_skills': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: CheckCircle };
      case 'ineligible': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: XCircle };
      default: return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: AlertTriangle };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.eligibility.title}</h1>
      <p className="text-gray-500 mb-8">{t.eligibility.subtitle}</p>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.eligibility.searchTitle}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.eligibility.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {search.length >= 2 && results.length === 0 && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-800">{t.eligibility.notFound}</p>
            </div>
            <p className="text-sm text-amber-700 mt-1">{t.eligibility.notFoundHint}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            {results.map((r, i) => {
              const style = getCategoryStyle(r.category);
              const Icon = style.icon;
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${style.bg} ${style.border}`}>
                  <Icon className={`w-5 h-5 ${style.text} shrink-0`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{r.title}</div>
                    <div className="text-xs text-gray-500">SOC {r.socCode}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                    {r.category === 'critical_skills' ? t.eligibility.criticalSkills
                      : r.category === 'ineligible' ? t.eligibility.ineligible
                      : t.eligibility.general}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Permit Types */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-800">{t.eligibility.criticalSkillsPermit}</h3>
          </div>
          <ul className="text-sm text-emerald-900 space-y-1.5 ml-7">
            <li>{t.eligibility.csDesc1}</li>
            <li>{t.eligibility.csDesc2}</li>
            <li>{t.eligibility.csDesc3}</li>
            <li>{t.eligibility.csDesc4}</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-800">{t.eligibility.generalPermit}</h3>
          </div>
          <ul className="text-sm text-blue-900 space-y-1.5 ml-7">
            <li>{t.eligibility.gpDesc1}</li>
            <li>{t.eligibility.gpDesc2}</li>
            <li>{t.eligibility.gpDesc3}</li>
            <li>{t.eligibility.gpDesc4}</li>
          </ul>
        </div>
      </div>

      {/* Other permit types */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <button onClick={() => setShowOtherPermits(!showOtherPermits)}
          className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Other Permit Types (7)</h2>
          </div>
          {showOtherPermits ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {showOtherPermits && (
          <div className="border-t border-gray-200 p-5 space-y-3">
            {OTHER_PERMITS.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0 mt-2" />
                <div>
                  <p className="font-medium text-sm text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
            <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 pt-1 no-underline">
              <ExternalLink className="w-3 h-3" /> Full details on all permit types — DETE
            </a>
          </div>
        )}
      </div>

      {/* New General Permit Roles — May 2026 */}
      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm mb-6">
        <button
          onClick={() => setShowNewGeneral(!showNewGeneral)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold text-gray-900">New General Permit Roles — May 2026 </span>
              <span className="text-xs font-normal text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full ml-1">{GENERAL_PERMIT_NEW.length} roles added</span>
            </div>
          </div>
          {showNewGeneral ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {showNewGeneral && (
          <div className="border-t border-emerald-100 px-4 sm:px-5 pb-4 pt-3 space-y-2">
            <p className="text-xs text-gray-500 mb-3">These roles were added to General Employment Permit eligibility on <strong>May 29, 2026</strong>. Minimum salary: €34,000/year. Subject to Labour Market Needs Test.</p>
            {GENERAL_PERMIT_NEW.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-800">{r.title}</span>
                {r.quota
                  ? <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0 ml-2">Quota · from 10 Jun 2026</span>
                  : <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full shrink-0 ml-2">No quota</span>
                }
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-2">Source: <a href="https://enterprise.gov.ie/en/news-and-events/department-news/2026/may/20260528.html" target="_blank" rel="noopener noreferrer" className="underline">DETE — May 28, 2026</a></p>
          </div>
        )}
      </div>

      {/* Renewed Quotas */}
      <div className="bg-white rounded-xl border border-amber-200 shadow-sm mb-8">
        <button
          onClick={() => setShowRenewed(!showRenewed)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
        >
          <div className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-semibold text-gray-900">Previously Full — Quotas Renewed May 2026 </span>
              <span className="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full ml-1">accepting applications</span>
            </div>
          </div>
          {showRenewed ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {showRenewed && (
          <div className="border-t border-amber-100 px-4 sm:px-5 pb-4 pt-3 space-y-3">
            <p className="text-xs text-gray-500 mb-3">These quotas were exhausted earlier in 2026 but were <strong>renewed on May 29, 2026</strong>. New applications are now accepted subject to Labour Market Needs Test.</p>
            {RENEWED_QUOTAS.map((q, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-900 text-sm">{q.occupation}</p>
                  <span className="shrink-0 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">RENEWED</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Was full: {q.filledDate} · Renewed: {q.renewedDate} · {q.note}</p>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-2">Source: <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/latest-updates/" target="_blank" rel="noopener noreferrer" className="underline">DETE Latest Updates</a></p>
          </div>
        )}
      </div>

      {/* Salary thresholds */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.eligibility.salaryTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-700">&euro;40,904</div>
            <div className="text-sm text-gray-600 mt-1">{t.eligibility.csSalary}</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">&euro;34,000</div>
            <div className="text-sm text-gray-600 mt-1">{t.eligibility.gpSalary}</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">&euro;68,911</div>
            <div className="text-sm text-gray-600 mt-1">{t.eligibility.anyOccSalary}</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">National Minimum Wage as of Jan 1, 2026: €14.15/hr · €28,696/yr. All permit applications must meet the higher thresholds above.</p>
      </div>

      {/* Full Lists */}
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowCriticalSkills(!showCriticalSkills)}
            className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {t.eligibility.criticalSkillsList} ({CRITICAL_SKILLS.length})
              </h2>
            </div>
            {showCriticalSkills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {showCriticalSkills && (
            <div className="border-t border-gray-200 p-5">
              <div className="grid sm:grid-cols-2 gap-2">
                {CRITICAL_SKILLS.map((o, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{o.title}</span>
                    <span className="text-gray-400 text-xs">({o.socCode})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowIneligible(!showIneligible)}
            className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {t.eligibility.ineligibleList} ({INELIGIBLE.length})
              </h2>
            </div>
            {showIneligible ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {showIneligible && (
            <div className="border-t border-gray-200 p-5">
              <div className="grid sm:grid-cols-2 gap-2">
                {INELIGIBLE.map((o, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm py-1">
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{o.title}</span>
                    <span className="text-gray-400 text-xs">({o.socCode})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* External links */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">{t.eligibility.officialLinks}</h3>
        <div className="space-y-2">
          <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/highly-skilled-eligible-occupations-list/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.eligibility.linkCriticalSkills}
          </a>
          <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/ineligible-categories-of-employment/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.eligibility.linkIneligible}
          </a>
          <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.eligibility.linkApply}
          </a>
        </div>
      </div>
    </div>
  );
}
