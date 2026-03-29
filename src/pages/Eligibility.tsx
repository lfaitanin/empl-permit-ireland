import { useState, useMemo } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import Fuse from 'fuse.js';

// Critical Skills Occupation List (SOC 2010) — updated March 2026
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
  const [search, setSearch] = useState('');
  const [showCriticalSkills, setShowCriticalSkills] = useState(false);
  const [showIneligible, setShowIneligible] = useState(false);

  const allOccupations: SearchResult[] = useMemo(() => [
    ...CRITICAL_SKILLS.map(o => ({ ...o, category: 'critical_skills' as const })),
    ...INELIGIBLE.map(o => ({ ...o, category: 'ineligible' as const })),
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
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
