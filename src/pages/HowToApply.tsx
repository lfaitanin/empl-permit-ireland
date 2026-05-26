import { ExternalLink, UserPlus, Users, PenLine, CreditCard, Eye, AlertTriangle, CheckCircle2, Smartphone, Clock } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import { useSEO } from '../hooks/useSEO';

const EPOS_URL = 'https://epos.enterprise.gov.ie';
const EPOS_INFO_URL = 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/latest-updates/new-eps/new-employment-permits-system.html';

const content = {
  en: {
    title: 'How to Apply for an Employment Permit',
    subtitle: 'Step-by-step guide for the new EPOS portal (launched April 2025)',
    newSystem: {
      badge: 'Updated April 2025',
      heading: 'New Online System (EPOS)',
      body: 'DETE replaced the previous portal with a modern cloud-based Employment Permits Online System. All applications — new and renewals — must now go through this portal. The old Trusted Partner Initiative no longer exists; every employer uses the same portal.',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'Create your portal account',
        color: 'blue',
        items: [
          'Both the employer and employee must create separate individual accounts at epos.enterprise.gov.ie.',
          'Employers must provide Revenue and CRO documentation and wait for validation by the Employment Permits Unit before the account is activated.',
          'Multiple administrators can be assigned to an employer account.',
          'Multi-Factor Authentication (MFA) via mobile phone is required for all accounts.',
        ],
      },
      {
        icon: Users,
        title: 'Start a joint application',
        color: 'emerald',
        items: [
          'Applications are now completed jointly — the employer fills their sections and the employee fills their personal information directly.',
          'Both parties work on the same application in real time through their separate accounts.',
          'No more emailing forms back and forth.',
        ],
      },
      {
        icon: PenLine,
        title: 'Sign digitally',
        color: 'purple',
        items: [
          'All parties sign the application with e-signatures through the portal.',
          'No physical signatures or scanned documents required.',
        ],
      },
      {
        icon: CreditCard,
        title: 'Pay the application fee',
        color: 'amber',
        items: [
          'Fees are paid online through the portal after the application is submitted.',
          'The application status will show "Awaiting Payment" until the fee is confirmed.',
        ],
      },
      {
        icon: Eye,
        title: 'Track your application',
        color: 'indigo',
        items: [
          'Real-time status updates are visible in your portal account: Draft, Awaiting Payment, Processing, Decision Issued.',
          'Non-core details (contact info, business locations) can be updated directly; core changes require unit validation.',
          'Support: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: "What's new vs. the old system",
      items: [
        { label: 'Joint online application', desc: 'Employer and employee fill the same form together — no more splitting PDFs.' },
        { label: 'E-signatures', desc: 'Fully digital signing, no wet ink or scanning required.' },
        { label: 'MFA security', desc: 'Mobile phone authentication protects all accounts.' },
        { label: 'Trusted Partner Initiative removed', desc: 'All employers now use the same portal — no priority queue.' },
        { label: 'Real-time status tracking', desc: 'Know exactly where your application is at every stage.' },
        { label: 'Cloud-based infrastructure', desc: 'Designed for better reliability and faster processing.' },
      ],
    },
    processing: {
      heading: 'Current Processing Times',
      asOf: 'As of May 26, 2026',
      source: 'DETE Processing Dates',
      note: 'Applications processed in date order of receipt. Dates shown are the latest applications currently being processed.',
      rows: [
        { type: 'Critical Skills (new)', date: 'May 11, 2026', lag: '~2 weeks', speed: 'fast' },
        { type: 'Intra-Company Transfer (new)', date: 'Apr 22, 2026', lag: '~5 weeks', speed: 'medium' },
        { type: 'General & other new applications', date: 'Mar 8, 2026', lag: '~12 weeks', speed: 'slow' },
        { type: 'Renewals (all types)', date: 'Feb 28, 2026', lag: '~3 months', speed: 'slow' },
        { type: 'Reviews / Appeals', date: 'Dec 9, 2025', lag: '~6 months', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'Official resources',
      portal: 'Go to EPOS portal',
      info: 'DETE — New EPOS information page',
      support: 'Technical support: epos@enterprise.gov.ie',
    },
  },
  pt: {
    title: 'Como Solicitar uma Employment Permit',
    subtitle: 'Guia passo a passo para o novo portal EPOS (lançado em abril de 2025)',
    newSystem: {
      badge: 'Atualizado Abril 2025',
      heading: 'Novo Sistema Online (EPOS)',
      body: 'O DETE substituiu o portal anterior por um moderno sistema cloud chamado Employment Permits Online System. Todas as aplicações — novas e renovações — devem ser feitas por esse portal. O antigo Trusted Partner Initiative foi encerrado; todos os empregadores usam o mesmo portal.',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'Crie sua conta no portal',
        color: 'blue',
        items: [
          'Tanto o empregador quanto o funcionário devem criar contas individuais separadas em epos.enterprise.gov.ie.',
          'Empregadores precisam fornecer documentação da Revenue e CRO e aguardar validação da Employment Permits Unit antes da conta ser ativada.',
          'Múltiplos administradores podem ser atribuídos a uma conta de empregador.',
          'Autenticação de dois fatores (MFA) via celular é obrigatória para todas as contas.',
        ],
      },
      {
        icon: Users,
        title: 'Inicie uma aplicação conjunta',
        color: 'emerald',
        items: [
          'As aplicações agora são preenchidas em conjunto — o empregador preenche suas seções e o funcionário preenche seus dados pessoais diretamente.',
          'Ambas as partes trabalham na mesma aplicação em tempo real através de suas contas separadas.',
          'Sem troca de formulários por e-mail.',
        ],
      },
      {
        icon: PenLine,
        title: 'Assine digitalmente',
        color: 'purple',
        items: [
          'Todas as partes assinam a aplicação com assinaturas eletrônicas pelo portal.',
          'Não são necessárias assinaturas físicas ou documentos digitalizados.',
        ],
      },
      {
        icon: CreditCard,
        title: 'Pague a taxa de aplicação',
        color: 'amber',
        items: [
          'As taxas são pagas online pelo portal após o envio da aplicação.',
          'O status da aplicação mostrará "Aguardando Pagamento" até a taxa ser confirmada.',
        ],
      },
      {
        icon: Eye,
        title: 'Acompanhe sua aplicação',
        color: 'indigo',
        items: [
          'Atualizações de status em tempo real visíveis na sua conta: Rascunho, Aguardando Pagamento, Em Processamento, Decisão Emitida.',
          'Detalhes não essenciais (contato, localização) podem ser atualizados diretamente; mudanças essenciais requerem validação.',
          'Suporte: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: 'O que mudou em relação ao sistema antigo',
      items: [
        { label: 'Aplicação conjunta online', desc: 'Empregador e funcionário preenchem o mesmo formulário juntos — sem mais dividir PDFs.' },
        { label: 'Assinaturas eletrônicas', desc: 'Assinatura totalmente digital, sem necessidade de papel ou digitalização.' },
        { label: 'Segurança MFA', desc: 'Autenticação via celular protege todas as contas.' },
        { label: 'Trusted Partner Initiative encerrado', desc: 'Todos os empregadores usam o mesmo portal — sem fila prioritária.' },
        { label: 'Acompanhamento em tempo real', desc: 'Saiba exatamente onde está sua aplicação em cada etapa.' },
        { label: 'Infraestrutura cloud', desc: 'Projetado para maior confiabilidade e processamento mais rápido.' },
      ],
    },
    processing: {
      heading: 'Tempo Atual de Processamento',
      asOf: 'Em 26 de maio de 2026',
      source: 'DETE — Datas de Processamento',
      note: 'Aplicações processadas por ordem de recebimento. As datas mostradas são das últimas aplicações sendo processadas.',
      rows: [
        { type: 'Critical Skills (nova)', date: '11 mai 2026', lag: '~2 semanas', speed: 'fast' },
        { type: 'Intra-Company Transfer (nova)', date: '22 abr 2026', lag: '~5 semanas', speed: 'medium' },
        { type: 'General e outras novas aplicações', date: '8 mar 2026', lag: '~12 semanas', speed: 'slow' },
        { type: 'Renovações (todos os tipos)', date: '28 fev 2026', lag: '~3 meses', speed: 'slow' },
        { type: 'Revisões / Recursos', date: '9 dez 2025', lag: '~6 meses', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'Recursos oficiais',
      portal: 'Ir para o portal EPOS',
      info: 'DETE — Página de informações sobre o novo EPOS',
      support: 'Suporte técnico: epos@enterprise.gov.ie',
    },
  },
};

const speedStyle: Record<string, string> = {
  fast: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-blue-100 text-blue-700',
  slow: 'bg-amber-100 text-amber-700',
  'very-slow': 'bg-red-100 text-red-700',
};

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
  amber: 'bg-amber-100 text-amber-700',
  indigo: 'bg-indigo-100 text-indigo-700',
};

export default function HowToApply() {
  const { lang } = useLang();
  const c = content[lang];

  useSEO({
    title: 'How to Apply for an Irish Employment Permit | New EPOS Portal 2025',
    description: 'Step-by-step guide to applying for an Irish employment permit using the new EPOS portal launched in April 2025. Learn about joint applications, e-signatures, MFA, and status tracking.',
    path: '/apply',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{c.title}</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">{c.subtitle}</p>
      </div>

      {/* New system notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="inline-block text-xs font-semibold bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 mb-1">{c.newSystem.badge}</span>
            <h2 className="font-semibold text-gray-900 mb-1">{c.newSystem.heading}</h2>
            <p className="text-sm text-gray-700">{c.newSystem.body}</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8">
        {c.steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colorMap[step.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">STEP {i + 1}</span>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* What changed */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">{c.changed.heading}</h2>
        <div className="space-y-2">
          {c.changed.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div><span className="font-medium text-gray-900">{item.label}:</span>{' '}<span className="text-gray-600">{item.desc}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing times */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-8">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-gray-900">{c.processing.heading}</h2>
          </div>
          <span className="text-xs text-gray-400">{c.processing.asOf}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">{c.processing.note}</p>
        <div className="space-y-2">
          {c.processing.rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-800">{row.type}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-500">{row.date}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${speedStyle[row.speed]}`}>{row.lag}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/current-application-processing-dates/"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-3 no-underline">
          <ExternalLink className="w-3 h-3" />{c.processing.source}
        </a>
      </div>

      {/* MFA note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-8">
        <Smartphone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          {lang === 'en'
            ? 'You will need your mobile phone to complete registration — MFA is mandatory for all portal accounts.'
            : 'Você precisará do seu celular para completar o cadastro — MFA é obrigatório para todas as contas do portal.'}
        </p>
      </div>

      {/* Official links */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">{c.links.heading}</h2>
        <div className="space-y-2">
          <a href={EPOS_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 no-underline">
            <ExternalLink className="w-4 h-4" />
            {c.links.portal}
          </a>
          <a href={EPOS_INFO_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 no-underline">
            <ExternalLink className="w-4 h-4" />
            {c.links.info}
          </a>
          <p className="text-sm text-gray-500">{c.links.support}</p>
        </div>
      </div>
    </div>
  );
}
