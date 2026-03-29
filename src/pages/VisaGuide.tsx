import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Briefcase, GraduationCap, Users, Clock, FileCheck } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

interface StampInfo {
  stamp: string;
  name: { en: string; pt: string };
  description: { en: string; pt: string };
  workRights: { en: string; pt: string };
  duration: string;
  icon: typeof Briefcase;
  color: string;
  examples: { en: string[]; pt: string[] };
}

const STAMPS: StampInfo[] = [
  {
    stamp: 'Stamp 1',
    name: { en: 'Work Permit', pt: 'Permissao de Trabalho' },
    description: {
      en: 'For non-EEA nationals with an employment permit. Tied to a specific employer.',
      pt: 'Para nacionais de fora do EEE com permissao de trabalho. Vinculado a um empregador especifico.',
    },
    workRights: {
      en: 'Full-time work for the named employer only',
      pt: 'Trabalho em tempo integral apenas para o empregador nomeado',
    },
    duration: '1–2 years (renewable)',
    icon: Briefcase,
    color: 'blue',
    examples: {
      en: ['General Employment Permit holders', 'Critical Skills Employment Permit holders (initial)'],
      pt: ['Titulares de General Employment Permit', 'Titulares de Critical Skills Employment Permit (inicial)'],
    },
  },
  {
    stamp: 'Stamp 1G',
    name: { en: 'Graduate Permission', pt: 'Permissao de Graduado' },
    description: {
      en: 'For graduates of Irish higher education who want to find employment after studies.',
      pt: 'Para graduados de ensino superior irlandes que querem encontrar emprego apos os estudos.',
    },
    workRights: {
      en: 'Full-time work (any employer, no permit needed)',
      pt: 'Trabalho em tempo integral (qualquer empregador, sem permit necessario)',
    },
    duration: '1–2 years',
    icon: GraduationCap,
    color: 'purple',
    examples: {
      en: ['Honours degree (Level 8) graduates: 1 year', 'Masters/PhD (Level 9-10) graduates: 2 years'],
      pt: ['Graduados com Honours degree (Level 8): 1 ano', 'Graduados com Masters/PhD (Level 9-10): 2 anos'],
    },
  },
  {
    stamp: 'Stamp 2',
    name: { en: 'Student', pt: 'Estudante' },
    description: {
      en: 'For non-EEA students studying full-time on an approved course in Ireland.',
      pt: 'Para estudantes de fora do EEE estudando em tempo integral em curso aprovado na Irlanda.',
    },
    workRights: {
      en: '20 hours/week during term, 40 hours/week during holidays (Jun–Sep, 15 Dec–15 Jan)',
      pt: '20 horas/semana durante o periodo letivo, 40 horas/semana durante ferias (Jun-Set, 15 Dez-15 Jan)',
    },
    duration: 'Duration of course',
    icon: GraduationCap,
    color: 'indigo',
    examples: {
      en: ['Language school students (max 2 years)', 'University/college students'],
      pt: ['Estudantes de escola de idiomas (max 2 anos)', 'Estudantes universitarios'],
    },
  },
  {
    stamp: 'Stamp 3',
    name: { en: 'Non-work Permission', pt: 'Permissao sem Trabalho' },
    description: {
      en: 'For non-EEA nationals who do not have permission to work. Often retirees or people of independent means.',
      pt: 'Para nacionais de fora do EEE sem permissao para trabalhar. Geralmente aposentados ou pessoas com meios independentes.',
    },
    workRights: {
      en: 'No work permitted',
      pt: 'Trabalho nao permitido',
    },
    duration: '1 year (renewable)',
    icon: Clock,
    color: 'gray',
    examples: {
      en: ['Retired persons', 'Persons of independent means', 'Ministers of religion'],
      pt: ['Aposentados', 'Pessoas com meios independentes', 'Ministros religiosos'],
    },
  },
  {
    stamp: 'Stamp 4',
    name: { en: 'Unrestricted Work', pt: 'Trabalho sem Restricoes' },
    description: {
      en: 'For non-EEA nationals who have permission to work without any employment permit. Includes spouses of Irish/EU citizens and Critical Skills permit holders after 2 years.',
      pt: 'Para nacionais de fora do EEE com permissao para trabalhar sem employment permit. Inclui conjuges de cidadaos irlandeses/UE e titulares de Critical Skills apos 2 anos.',
    },
    workRights: {
      en: 'Full-time work (any employer, no permit needed)',
      pt: 'Trabalho em tempo integral (qualquer empregador, sem permit necessario)',
    },
    duration: '1–2 years (renewable)',
    icon: Briefcase,
    color: 'emerald',
    examples: {
      en: [
        'Spouses/partners of Irish or EU citizens',
        'Critical Skills Permit holders (after 2 years)',
        'Convention refugees',
        'Programme refugees',
      ],
      pt: [
        'Conjuges/parceiros de cidadaos irlandeses ou da UE',
        'Titulares de Critical Skills Permit (apos 2 anos)',
        'Refugiados convencionais',
        'Refugiados de programa',
      ],
    },
  },
  {
    stamp: 'Stamp 4D',
    name: { en: 'Dependent/Partner', pt: 'Dependente/Parceiro' },
    description: {
      en: 'For dependents of Critical Skills Employment Permit holders.',
      pt: 'Para dependentes de titulares de Critical Skills Employment Permit.',
    },
    workRights: {
      en: 'Full-time work (any employer, no permit needed)',
      pt: 'Trabalho em tempo integral (qualquer empregador, sem permit necessario)',
    },
    duration: 'Tied to primary permit holder',
    icon: Users,
    color: 'teal',
    examples: {
      en: ['Spouse/partner of Critical Skills Permit holder', 'Dependent children over 16'],
      pt: ['Conjuge/parceiro de titular de Critical Skills Permit', 'Filhos dependentes maiores de 16 anos'],
    },
  },
  {
    stamp: 'Stamp 5',
    name: { en: 'Long-Term Residency (No Condition)', pt: 'Residencia de Longa Duracao (Sem Condicao)' },
    description: {
      en: 'Granted to non-EEA nationals who have legally resided in Ireland for at least 5 years (or 2 years on Critical Skills Permit).',
      pt: 'Concedido a nacionais de fora do EEE que residiram legalmente na Irlanda por pelo menos 5 anos (ou 2 anos com Critical Skills Permit).',
    },
    workRights: {
      en: 'Full-time work (any employer, no permit needed)',
      pt: 'Trabalho em tempo integral (qualquer empregador, sem permit necessario)',
    },
    duration: '5 years',
    icon: FileCheck,
    color: 'amber',
    examples: {
      en: ['After 5 years on Stamp 1 (with continuous employment)', 'After 2 years on Critical Skills Permit'],
      pt: ['Apos 5 anos com Stamp 1 (com emprego continuo)', 'Apos 2 anos com Critical Skills Permit'],
    },
  },
  {
    stamp: 'Stamp 6',
    name: { en: 'Dual Citizenship', pt: 'Dupla Cidadania' },
    description: {
      en: 'For persons who hold dual citizenship with Ireland and a non-EEA country.',
      pt: 'Para pessoas com dupla cidadania com a Irlanda e um pais fora do EEE.',
    },
    workRights: {
      en: 'Full-time work (same as Irish citizens)',
      pt: 'Trabalho em tempo integral (mesmos direitos que cidadaos irlandeses)',
    },
    duration: 'No expiry',
    icon: FileCheck,
    color: 'emerald',
    examples: {
      en: ['Naturalised Irish citizens who retain another nationality'],
      pt: ['Cidadaos irlandeses naturalizados que mantem outra nacionalidade'],
    },
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; lightBg: string }> = {
  blue: { bg: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-700', lightBg: 'bg-blue-50' },
  purple: { bg: 'bg-purple-500', border: 'border-purple-200', text: 'text-purple-700', lightBg: 'bg-purple-50' },
  indigo: { bg: 'bg-indigo-500', border: 'border-indigo-200', text: 'text-indigo-700', lightBg: 'bg-indigo-50' },
  gray: { bg: 'bg-gray-500', border: 'border-gray-200', text: 'text-gray-700', lightBg: 'bg-gray-50' },
  emerald: { bg: 'bg-emerald-500', border: 'border-emerald-200', text: 'text-emerald-700', lightBg: 'bg-emerald-50' },
  teal: { bg: 'bg-teal-500', border: 'border-teal-200', text: 'text-teal-700', lightBg: 'bg-teal-50' },
  amber: { bg: 'bg-amber-500', border: 'border-amber-200', text: 'text-amber-700', lightBg: 'bg-amber-50' },
};

export default function VisaGuide() {
  const { t, lang } = useLang();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (stamp: string) => setExpanded(expanded === stamp ? null : stamp);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.visaGuide.title}</h1>
      <p className="text-gray-500 mb-8">{t.visaGuide.subtitle}</p>

      {/* Common Path for Brazilians */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🇧🇷</span>
          <h2 className="text-lg font-bold text-gray-900">{t.visaGuide.commonPath}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full font-medium">
            Stamp 2 ({t.visaGuide.student})
          </div>
          <span className="text-gray-400">&rarr;</span>
          <div className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full font-medium">
            Stamp 1G ({t.visaGuide.graduate})
          </div>
          <span className="text-gray-400">&rarr;</span>
          <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-medium">
            Stamp 1 ({t.visaGuide.workPermit})
          </div>
          <span className="text-gray-400">&rarr;</span>
          <div className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full font-medium">
            Stamp 4 ({t.visaGuide.unrestricted})
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">{t.visaGuide.commonPathDesc}</p>
      </div>

      {/* Work Rights Summary Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-600">Stamp</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">{t.visaGuide.workRights}</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">{t.visaGuide.duration}</th>
            </tr>
          </thead>
          <tbody>
            {STAMPS.map(s => {
              const colors = colorMap[s.color];
              return (
                <tr key={s.stamp} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${colors.lightBg} ${colors.text}`}>
                      {s.stamp}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{s.workRights[lang]}</td>
                  <td className="px-4 py-3 text-gray-500">{s.duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stamp Cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t.visaGuide.detailedGuide}</h2>
      <div className="space-y-3 mb-8">
        {STAMPS.map(s => {
          const isOpen = expanded === s.stamp;
          const colors = colorMap[s.color];
          const Icon = s.icon;
          return (
            <div key={s.stamp} className={`rounded-xl border ${colors.border} overflow-hidden`}>
              <button
                onClick={() => toggle(s.stamp)}
                className={`flex items-center gap-3 w-full p-4 text-left hover:bg-gray-50 transition-colors`}
              >
                <div className={`w-10 h-10 rounded-lg ${colors.lightBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.lightBg} ${colors.text}`}>{s.stamp}</span>
                    <span className="font-semibold text-gray-900">{s.name[lang]}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{s.description[lang]}</p>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {isOpen && (
                <div className={`border-t ${colors.border} p-4 ${colors.lightBg}`}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{t.visaGuide.workRights}</h4>
                      <p className="text-sm text-gray-800">{s.workRights[lang]}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{t.visaGuide.duration}</h4>
                      <p className="text-sm text-gray-800">{s.duration}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">{t.visaGuide.whoGets}</h4>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {s.examples[lang].map((ex, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 shrink-0`} />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* External links */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">{t.visaGuide.officialLinks}</h3>
        <div className="space-y-2">
          <a href="https://www.irishimmigration.ie/registering-your-immigration-permission/information-on-registering/immigration-permission-stamps/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.visaGuide.linkStamps}
          </a>
          <a href="https://www.irishimmigration.ie/registering-your-immigration-permission/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.visaGuide.linkIRP}
          </a>
          <a href="https://www.citizensinformation.ie/en/moving-country/working-in-ireland/employment-permits/overview-employment-permits/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4" /> {t.visaGuide.linkCitizensInfo}
          </a>
        </div>
      </div>
    </div>
  );
}
