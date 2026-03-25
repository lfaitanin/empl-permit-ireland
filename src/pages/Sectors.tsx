import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChevronDown, ChevronUp, BookOpen, GraduationCap, Award } from 'lucide-react';
import { sectorsByYear } from '../lib/data-loader';
import { getCoursesForSector } from '../constants/sector-courses';
import { formatNumber, MONTHS } from '../lib/utils';
import { useLang } from '../i18n/LangContext';

const YEAR_MONTH_COUNT: Record<number, number> = { 2022: 12, 2023: 12, 2024: 12, 2025: 12, 2026: 2 };

export default function Sectors() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2025);

  const sectors = sectorsByYear[year] || [];
  const monthCount = YEAR_MONTH_COUNT[year];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.sectors.title}</h1>
          <p className="text-gray-500 mt-1">{t.sectors.subtitle}</p>
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

      <div className="space-y-3">
        {sectors.map(sector => {
          const isExpanded = expanded === sector.slug;
          const courses = getCoursesForSector(sector.name);
          const chartData = MONTHS.slice(0, monthCount).map((m, i) => ({ month: m, permits: sector.monthly[i] || 0 }));

          // Show permit counts across years for this sector
          const yearStats = [2022, 2023, 2024, 2025, 2026].map(y => ({
            total: sectorsByYear[y]?.find(s => s.name === sector.name)?.total || 0,
            year: y,
          })).filter(s => s.total > 0);

          return (
            <div key={sector.slug} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : sector.slug)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{sector.name}</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="text-sm text-gray-700 font-medium">{formatNumber(sector.total)} {t.sectors.permits} ({year})</span>
                    {yearStats.length > 1 && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        {yearStats.map(ys => (
                          <span key={ys.year} className={ys.year === year ? 'text-gray-600 font-medium' : ''}>{ys.year}: {formatNumber(ys.total)}</span>
                        )).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`}> · </span>, el], [])}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {formatNumber(sector.total)}
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="mt-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{t.sectors.monthlyBreakdown}</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" fontSize={11} />
                        <YAxis fontSize={11} />
                        <Tooltip />
                        <Bar dataKey="permits" fill="#2563eb" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {courses && (
                    <div className="space-y-4">
                      {courses.technicalCourses.length > 0 && (
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <BookOpen className="w-4 h-4 text-blue-600" /> {t.sectors.technicalCourses}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {courses.technicalCourses.map(c => (
                              <div key={c.name} className="p-3 bg-blue-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-900">{c.name}</div>
                                <div className="text-xs text-gray-500">{c.provider} · {c.duration}{c.free && <span className="text-emerald-600 font-medium"> · {t.sectors.free}</span>}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {courses.universityPrograms.length > 0 && (
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <GraduationCap className="w-4 h-4 text-emerald-600" /> {t.sectors.universityPrograms}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {courses.universityPrograms.map(p => (
                              <div key={p.name} className="p-3 bg-emerald-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                <div className="text-xs text-gray-500">{p.university} · {p.level}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {courses.certifications.length > 0 && (
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Award className="w-4 h-4 text-amber-500" /> {t.sectors.certifications}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {courses.certifications.map(cert => (
                              <span key={cert.name} className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-medium">
                                {cert.name} ({cert.body})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {!courses && <p className="text-sm text-gray-400 italic mt-4">{t.sectors.noCourses}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
