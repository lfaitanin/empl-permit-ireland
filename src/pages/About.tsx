import { ExternalLink } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{a.title}</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.whatTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{a.whatText}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.dataTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{a.dataText}</p>
          <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/statistics/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            <ExternalLink className="w-4 h-4" /> {a.dataLink}
          </a>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.howTitle}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {(a.howList as string[]).map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.coursesTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{a.coursesText}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{a.disclaimerTitle}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">{a.disclaimerText}</p>
        </section>
      </div>
    </div>
  );
}
