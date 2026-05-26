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
  hi: {
    title: 'Employment Permit के लिए आवेदन कैसे करें',
    subtitle: 'नए EPOS पोर्टल के लिए चरण-दर-चरण गाइड (अप्रैल 2025 में लॉन्च)',
    newSystem: {
      badge: 'अप्रैल 2025 में अपडेट',
      heading: 'नया ऑनलाइन सिस्टम (EPOS)',
      body: 'DETE ने पुराने पोर्टल को एक आधुनिक क्लाउड-आधारित Employment Permits Online System से बदल दिया। सभी आवेदन — नए और नवीनीकरण — अब इस पोर्टल के माध्यम से करने होंगे। पुरानी Trusted Partner Initiative अब मौजूद नहीं है।',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'पोर्टल अकाउंट बनाएं',
        color: 'blue',
        items: [
          'नियोक्ता और कर्मचारी दोनों को epos.enterprise.gov.ie पर अलग-अलग अकाउंट बनाने होंगे।',
          'नियोक्ताओं को Revenue और CRO दस्तावेज़ देने होंगे और अकाउंट सक्रिय होने से पहले Employment Permits Unit की मंज़ूरी का इंतज़ार करना होगा।',
          'एक नियोक्ता अकाउंट पर कई एडमिनिस्ट्रेटर हो सकते हैं।',
          'सभी अकाउंट के लिए मोबाइल फोन के ज़रिए Multi-Factor Authentication (MFA) ज़रूरी है।',
        ],
      },
      {
        icon: Users,
        title: 'संयुक्त आवेदन शुरू करें',
        color: 'emerald',
        items: [
          'आवेदन अब संयुक्त रूप से पूरे होते हैं — नियोक्ता अपने हिस्से भरता है और कर्मचारी सीधे अपनी जानकारी भरता है।',
          'दोनों पक्ष अपने अलग-अलग अकाउंट से एक ही आवेदन पर real-time में काम करते हैं।',
          'अब फॉर्म ईमेल से भेजने की ज़रूरत नहीं।',
        ],
      },
      {
        icon: PenLine,
        title: 'डिजिटल हस्ताक्षर करें',
        color: 'purple',
        items: [
          'सभी पक्ष पोर्टल के माध्यम से e-signatures से आवेदन पर हस्ताक्षर करते हैं।',
          'कोई भौतिक हस्ताक्षर या स्कैन किए दस्तावेज़ आवश्यक नहीं।',
        ],
      },
      {
        icon: CreditCard,
        title: 'आवेदन शुल्क का भुगतान करें',
        color: 'amber',
        items: [
          'शुल्क आवेदन जमा होने के बाद पोर्टल के माध्यम से ऑनलाइन भरा जाता है।',
          'शुल्क की पुष्टि होने तक आवेदन की स्थिति "Awaiting Payment" दिखेगी।',
        ],
      },
      {
        icon: Eye,
        title: 'आवेदन ट्रैक करें',
        color: 'indigo',
        items: [
          'पोर्टल में real-time स्टेटस अपडेट: Draft, Awaiting Payment, Processing, Decision Issued।',
          'Non-core विवरण (संपर्क जानकारी) सीधे अपडेट किए जा सकते हैं; मुख्य बदलावों के लिए यूनिट की मंज़ूरी ज़रूरी है।',
          'सहायता: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: 'पुराने सिस्टम की तुलना में क्या नया है',
      items: [
        { label: 'संयुक्त ऑनलाइन आवेदन', desc: 'नियोक्ता और कर्मचारी एक साथ एक ही फॉर्म भरते हैं।' },
        { label: 'E-signatures', desc: 'पूरी तरह डिजिटल हस्ताक्षर, कोई कागज़ या स्कैनिंग नहीं।' },
        { label: 'MFA सुरक्षा', desc: 'मोबाइल फोन प्रमाणीकरण सभी अकाउंट की सुरक्षा करता है।' },
        { label: 'Trusted Partner Initiative हटाया गया', desc: 'सभी नियोक्ता एक ही पोर्टल का उपयोग करते हैं।' },
        { label: 'Real-time स्टेटस ट्रैकिंग', desc: 'हर चरण में अपने आवेदन की स्थिति जानें।' },
        { label: 'क्लाउड-आधारित बुनियादी ढांचा', desc: 'बेहतर विश्वसनीयता और तेज़ प्रसंस्करण के लिए।' },
      ],
    },
    processing: {
      heading: 'वर्तमान प्रसंस्करण समय',
      asOf: '26 मई 2026 तक',
      source: 'DETE प्रसंस्करण तिथियाँ',
      note: 'आवेदन प्राप्ति की तारीख के क्रम में संसाधित होते हैं। दिखाई गई तिथियाँ वर्तमान में संसाधित हो रहे नवीनतम आवेदनों की हैं।',
      rows: [
        { type: 'Critical Skills (नया)', date: '11 मई 2026', lag: '~2 सप्ताह', speed: 'fast' },
        { type: 'Intra-Company Transfer (नया)', date: '22 अप्रैल 2026', lag: '~5 सप्ताह', speed: 'medium' },
        { type: 'General और अन्य नए आवेदन', date: '8 मार्च 2026', lag: '~12 सप्ताह', speed: 'slow' },
        { type: 'नवीनीकरण (सभी प्रकार)', date: '28 फरवरी 2026', lag: '~3 महीने', speed: 'slow' },
        { type: 'समीक्षा / अपील', date: '9 दिसंबर 2025', lag: '~6 महीने', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'आधिकारिक संसाधन',
      portal: 'EPOS पोर्टल पर जाएं',
      info: 'DETE — नए EPOS की जानकारी',
      support: 'तकनीकी सहायता: epos@enterprise.gov.ie',
    },
  },
  tl: {
    title: 'Paano Mag-apply para sa Employment Permit',
    subtitle: 'Hakbang-hakbang na gabay para sa bagong EPOS portal (inilunsad Abril 2025)',
    newSystem: {
      badge: 'Na-update Abril 2025',
      heading: 'Bagong Online na Sistema (EPOS)',
      body: 'Pinalitan ng DETE ang nakaraang portal ng modernong cloud-based na Employment Permits Online System. Lahat ng aplikasyon — bago at renewal — ay dapat na isumite sa pamamagitan ng bagong portal. Ang dating Trusted Partner Initiative ay hindi na umiiral.',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'Gumawa ng portal account',
        color: 'blue',
        items: [
          'Parehong employer at empleyado ay dapat gumawa ng hiwalay na account sa epos.enterprise.gov.ie.',
          'Ang mga employer ay kailangang magbigay ng Revenue at CRO na dokumentasyon at hintayin ang validation ng Employment Permits Unit bago ma-activate ang account.',
          'Maraming administrator ang maaaring italaga sa isang employer account.',
          'Kinakailangan ang Multi-Factor Authentication (MFA) sa pamamagitan ng mobile phone para sa lahat ng account.',
        ],
      },
      {
        icon: Users,
        title: 'Magsimula ng joint application',
        color: 'emerald',
        items: [
          'Ang mga aplikasyon ay pinupunan na nang magkasama — ang employer ay nagpupuno ng kanilang mga seksyon at ang empleyado ay nagpupuno ng kanilang personal na impormasyon nang direkta.',
          'Ang magkabilang partido ay nagtatrabaho sa parehong aplikasyon sa real time sa pamamagitan ng kanilang mga hiwalay na account.',
          'Hindi na kailangang mag-email ng mga form pabalik-balik.',
        ],
      },
      {
        icon: PenLine,
        title: 'Pumirma nang digital',
        color: 'purple',
        items: [
          'Lahat ng partido ay pumipirma sa aplikasyon gamit ang mga e-signature sa pamamagitan ng portal.',
          'Hindi na kailangan ang mga pisikal na pirma o mga na-scan na dokumento.',
        ],
      },
      {
        icon: CreditCard,
        title: 'Bayaran ang bayad sa aplikasyon',
        color: 'amber',
        items: [
          'Ang mga bayad ay binabayaran online sa pamamagitan ng portal pagkatapos isumite ang aplikasyon.',
          'Ang status ng aplikasyon ay magpapakita ng "Awaiting Payment" hanggang makumpirma ang bayad.',
        ],
      },
      {
        icon: Eye,
        title: 'I-track ang iyong aplikasyon',
        color: 'indigo',
        items: [
          'Ang mga real-time na update sa status ay makikita sa iyong portal account: Draft, Awaiting Payment, Processing, Decision Issued.',
          'Ang mga non-core na detalye ay maaaring i-update nang direkta; ang mga pangunahing pagbabago ay nangangailangan ng unit validation.',
          'Suporta: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: 'Ano ang bago kumpara sa lumang sistema',
      items: [
        { label: 'Joint online application', desc: 'Ang employer at empleyado ay pinupunan ang parehong form nang magkasama.' },
        { label: 'Mga E-signature', desc: 'Ganap na digital na pagpirma, hindi na kailangan ng papel o pag-scan.' },
        { label: 'MFA security', desc: 'Ang mobile phone authentication ay nagpoprotekta sa lahat ng account.' },
        { label: 'Inalis ang Trusted Partner Initiative', desc: 'Lahat ng employer ay gumagamit ng parehong portal.' },
        { label: 'Real-time status tracking', desc: 'Malaman kung saan eksaktong naroon ang iyong aplikasyon sa bawat yugto.' },
        { label: 'Cloud-based infrastructure', desc: 'Dinisenyo para sa mas mahusay na reliability at mas mabilis na pagproseso.' },
      ],
    },
    processing: {
      heading: 'Kasalukuyang Oras ng Pagproseso',
      asOf: 'Noong May 26, 2026',
      source: 'DETE Processing Dates',
      note: 'Ang mga aplikasyon ay pinoproseso ayon sa pagkakasunod ng pagtanggap. Ang mga petsa na ipinapakita ay ang pinakabagong mga aplikasyon na kasalukuyang pinoproseso.',
      rows: [
        { type: 'Critical Skills (bago)', date: 'Mayo 11, 2026', lag: '~2 linggo', speed: 'fast' },
        { type: 'Intra-Company Transfer (bago)', date: 'Abr 22, 2026', lag: '~5 linggo', speed: 'medium' },
        { type: 'General at iba pang bagong aplikasyon', date: 'Mar 8, 2026', lag: '~12 linggo', speed: 'slow' },
        { type: 'Mga Renewal (lahat ng uri)', date: 'Peb 28, 2026', lag: '~3 buwan', speed: 'slow' },
        { type: 'Mga Review / Appeal', date: 'Dis 9, 2025', lag: '~6 buwan', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'Mga opisyal na mapagkukunan',
      portal: 'Pumunta sa EPOS portal',
      info: 'DETE — Pahina ng impormasyon ng bagong EPOS',
      support: 'Technical support: epos@enterprise.gov.ie',
    },
  },
  zh: {
    title: '如何申请就业许可证',
    subtitle: '新EPOS门户申请指南（2025年4月上线）',
    newSystem: {
      badge: '2025年4月更新',
      heading: '新在线系统（EPOS）',
      body: 'DETE将旧门户替换为现代化的云端就业许可证在线系统。所有申请——新申请和续期——现在必须通过新门户提交。旧的Trusted Partner Initiative已不再存在。',
    },
    steps: [
      {
        icon: UserPlus,
        title: '创建门户账户',
        color: 'blue',
        items: [
          '雇主和员工都必须在epos.enterprise.gov.ie上分别创建独立账户。',
          '雇主需提供Revenue和CRO文件，并等待就业许可证部门验证后账户才会激活。',
          '一个雇主账户可以分配多个管理员。',
          '所有账户均须通过手机进行多因素认证（MFA）。',
        ],
      },
      {
        icon: Users,
        title: '开始联合申请',
        color: 'emerald',
        items: [
          '申请现在由双方共同完成——雇主填写其部分，员工直接填写个人信息。',
          '双方通过各自的账户实时处理同一份申请。',
          '不再需要来回发送电子邮件表格。',
        ],
      },
      {
        icon: PenLine,
        title: '数字签名',
        color: 'purple',
        items: [
          '所有当事人通过门户使用电子签名签署申请。',
          '无需物理签名或扫描文件。',
        ],
      },
      {
        icon: CreditCard,
        title: '支付申请费用',
        color: 'amber',
        items: [
          '申请提交后，通过门户在线支付费用。',
          '在费用确认之前，申请状态将显示"Awaiting Payment"。',
        ],
      },
      {
        icon: Eye,
        title: '跟踪您的申请',
        color: 'indigo',
        items: [
          '门户账户中可查看实时状态更新：草稿、等待付款、处理中、已发出决定。',
          '非核心信息（联系方式、营业地点）可直接更新；核心变更需要部门验证。',
          '支持：epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: '与旧系统相比有什么新变化',
      items: [
        { label: '联合在线申请', desc: '雇主和员工一起填写同一份表格，无需分割PDF。' },
        { label: '电子签名', desc: '完全数字化签名，无需纸质签名或扫描。' },
        { label: 'MFA安全', desc: '手机身份验证保护所有账户。' },
        { label: '取消Trusted Partner Initiative', desc: '所有雇主现在使用同一门户，无优先队列。' },
        { label: '实时状态跟踪', desc: '在每个阶段都能准确了解申请进度。' },
        { label: '云端基础设施', desc: '设计用于更好的可靠性和更快的处理速度。' },
      ],
    },
    processing: {
      heading: '当前处理时间',
      asOf: '截至2026年5月26日',
      source: 'DETE处理日期',
      note: '申请按收到日期顺序处理。所显示的日期是目前正在处理的最新申请日期。',
      rows: [
        { type: 'Critical Skills（新申请）', date: '2026年5月11日', lag: '约2周', speed: 'fast' },
        { type: 'Intra-Company Transfer（新申请）', date: '2026年4月22日', lag: '约5周', speed: 'medium' },
        { type: 'General及其他新申请', date: '2026年3月8日', lag: '约12周', speed: 'slow' },
        { type: '续期（所有类型）', date: '2026年2月28日', lag: '约3个月', speed: 'slow' },
        { type: '审查/上诉', date: '2025年12月9日', lag: '约6个月', speed: 'very-slow' },
      ],
    },
    links: {
      heading: '官方资源',
      portal: '前往EPOS门户',
      info: 'DETE — 新EPOS信息页面',
      support: '技术支持：epos@enterprise.gov.ie',
    },
  },
  es: {
    title: 'Cómo Solicitar un Permiso de Trabajo',
    subtitle: 'Guía paso a paso para el nuevo portal EPOS (lanzado en abril de 2025)',
    newSystem: {
      badge: 'Actualizado Abril 2025',
      heading: 'Nuevo Sistema Online (EPOS)',
      body: 'El DETE reemplazó el portal anterior con un moderno sistema en la nube llamado Employment Permits Online System. Todas las solicitudes —nuevas y renovaciones— deben hacerse a través de este portal. La antigua Trusted Partner Initiative ya no existe.',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'Crea tu cuenta en el portal',
        color: 'blue',
        items: [
          'Tanto el empleador como el empleado deben crear cuentas individuales separadas en epos.enterprise.gov.ie.',
          'Los empleadores deben proporcionar documentación de Revenue y CRO y esperar validación de la Employment Permits Unit antes de que la cuenta se active.',
          'Se pueden asignar múltiples administradores a una cuenta de empleador.',
          'Se requiere Autenticación de Múltiples Factores (MFA) por teléfono móvil para todas las cuentas.',
        ],
      },
      {
        icon: Users,
        title: 'Inicia una solicitud conjunta',
        color: 'emerald',
        items: [
          'Las solicitudes ahora se completan conjuntamente — el empleador completa sus secciones y el empleado introduce su información personal directamente.',
          'Ambas partes trabajan en la misma solicitud en tiempo real a través de sus cuentas separadas.',
          'Ya no es necesario enviar formularios por correo electrónico.',
        ],
      },
      {
        icon: PenLine,
        title: 'Firma digitalmente',
        color: 'purple',
        items: [
          'Todas las partes firman la solicitud con e-signatures a través del portal.',
          'No se requieren firmas físicas ni documentos escaneados.',
        ],
      },
      {
        icon: CreditCard,
        title: 'Paga la tasa de solicitud',
        color: 'amber',
        items: [
          'Las tasas se pagan online a través del portal después de enviar la solicitud.',
          'El estado de la solicitud mostrará "Awaiting Payment" hasta que se confirme el pago.',
        ],
      },
      {
        icon: Eye,
        title: 'Sigue tu solicitud',
        color: 'indigo',
        items: [
          'Actualizaciones de estado en tiempo real visibles en tu cuenta: Borrador, Esperando Pago, En Proceso, Decisión Emitida.',
          'Los detalles no esenciales pueden actualizarse directamente; los cambios principales requieren validación.',
          'Soporte: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: 'Qué cambió respecto al sistema antiguo',
      items: [
        { label: 'Solicitud conjunta online', desc: 'Empleador y empleado completan el mismo formulario juntos.' },
        { label: 'Firmas electrónicas', desc: 'Firma completamente digital, sin papel ni escaneado.' },
        { label: 'Seguridad MFA', desc: 'Autenticación por teléfono móvil protege todas las cuentas.' },
        { label: 'Trusted Partner Initiative eliminado', desc: 'Todos los empleadores usan el mismo portal, sin cola prioritaria.' },
        { label: 'Seguimiento en tiempo real', desc: 'Sabe exactamente en qué etapa está tu solicitud.' },
        { label: 'Infraestructura cloud', desc: 'Diseñado para mayor fiabilidad y procesamiento más rápido.' },
      ],
    },
    processing: {
      heading: 'Tiempos de Procesamiento Actuales',
      asOf: 'Al 26 de mayo de 2026',
      source: 'DETE — Fechas de Procesamiento',
      note: 'Las solicitudes se procesan por orden de recepción. Las fechas mostradas son las de las últimas solicitudes que se están procesando actualmente.',
      rows: [
        { type: 'Critical Skills (nueva)', date: '11 may 2026', lag: '~2 semanas', speed: 'fast' },
        { type: 'Intra-Company Transfer (nueva)', date: '22 abr 2026', lag: '~5 semanas', speed: 'medium' },
        { type: 'General y otras nuevas solicitudes', date: '8 mar 2026', lag: '~12 semanas', speed: 'slow' },
        { type: 'Renovaciones (todos los tipos)', date: '28 feb 2026', lag: '~3 meses', speed: 'slow' },
        { type: 'Revisiones / Apelaciones', date: '9 dic 2025', lag: '~6 meses', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'Recursos oficiales',
      portal: 'Ir al portal EPOS',
      info: 'DETE — Página de información del nuevo EPOS',
      support: 'Soporte técnico: epos@enterprise.gov.ie',
    },
  },
  ur: {
    title: 'Employment Permit کے لیے درخواست کیسے دیں',
    subtitle: 'نئے EPOS پورٹل کے لیے مرحلہ وار گائیڈ (اپریل 2025 میں لانچ)',
    newSystem: {
      badge: 'اپریل 2025 میں اپڈیٹ',
      heading: 'نیا آن لائن نظام (EPOS)',
      body: 'DETE نے پرانے پورٹل کو جدید کلاؤڈ بیسڈ Employment Permits Online System سے تبدیل کر دیا۔ تمام درخواستیں — نئی اور تجدید — اب نئے پورٹل سے دینی ہوں گی۔ پرانا Trusted Partner Initiative اب موجود نہیں ہے۔',
    },
    steps: [
      {
        icon: UserPlus,
        title: 'پورٹل اکاؤنٹ بنائیں',
        color: 'blue',
        items: [
          'آجر اور ملازم دونوں کو epos.enterprise.gov.ie پر الگ الگ انفرادی اکاؤنٹ بنانے ہوں گے۔',
          'آجروں کو Revenue اور CRO دستاویزات فراہم کرنی ہوں گی اور اکاؤنٹ فعال ہونے سے پہلے Employment Permits Unit کی تصدیق کا انتظار کرنا ہوگا۔',
          'ایک آجر اکاؤنٹ میں متعدد ایڈمنسٹریٹر شامل کیے جا سکتے ہیں۔',
          'تمام اکاؤنٹس کے لیے موبائل فون کے ذریعے Multi-Factor Authentication (MFA) لازمی ہے۔',
        ],
      },
      {
        icon: Users,
        title: 'مشترکہ درخواست شروع کریں',
        color: 'emerald',
        items: [
          'درخواستیں اب مشترکہ طور پر پر کی جاتی ہیں — آجر اپنے حصے بھرتا ہے اور ملازم اپنی ذاتی معلومات براہ راست بھرتا ہے۔',
          'دونوں فریق اپنے الگ اکاؤنٹس کے ذریعے real time میں ایک ہی درخواست پر کام کرتے ہیں۔',
          'اب فارم ای میل سے بھیجنے کی ضرورت نہیں۔',
        ],
      },
      {
        icon: PenLine,
        title: 'ڈیجیٹل دستخط کریں',
        color: 'purple',
        items: [
          'تمام فریق پورٹل کے ذریعے e-signatures سے درخواست پر دستخط کرتے ہیں۔',
          'کوئی جسمانی دستخط یا اسکین شدہ دستاویزات کی ضرورت نہیں۔',
        ],
      },
      {
        icon: CreditCard,
        title: 'درخواست فیس ادا کریں',
        color: 'amber',
        items: [
          'فیس درخواست جمع ہونے کے بعد پورٹل کے ذریعے آن لائن ادا کی جاتی ہے۔',
          'فیس کی تصدیق ہونے تک درخواست کی حیثیت "Awaiting Payment" دکھائے گی۔',
        ],
      },
      {
        icon: Eye,
        title: 'اپنی درخواست ٹریک کریں',
        color: 'indigo',
        items: [
          'پورٹل اکاؤنٹ میں real-time اسٹیٹس اپڈیٹس: Draft, Awaiting Payment, Processing, Decision Issued۔',
          'Non-core تفصیلات (رابطہ معلومات) براہ راست اپڈیٹ کی جا سکتی ہیں؛ بنیادی تبدیلیوں کے لیے یونٹ کی تصدیق ضروری ہے۔',
          'مدد: epos@enterprise.gov.ie',
        ],
      },
    ],
    changed: {
      heading: 'پرانے نظام کے مقابلے میں کیا نیا ہے',
      items: [
        { label: 'مشترکہ آن لائن درخواست', desc: 'آجر اور ملازم ایک ساتھ ایک ہی فارم بھرتے ہیں۔' },
        { label: 'E-signatures', desc: 'مکمل ڈیجیٹل دستخط، کوئی کاغذ یا اسکیننگ نہیں۔' },
        { label: 'MFA سیکیورٹی', desc: 'موبائل فون تصدیق تمام اکاؤنٹس کی حفاظت کرتی ہے۔' },
        { label: 'Trusted Partner Initiative ختم', desc: 'تمام آجر ایک ہی پورٹل استعمال کرتے ہیں، کوئی ترجیحی قطار نہیں۔' },
        { label: 'Real-time اسٹیٹس ٹریکنگ', desc: 'ہر مرحلے پر اپنی درخواست کی صحیح صورت حال جانیں۔' },
        { label: 'کلاؤڈ بیسڈ انفراسٹرکچر', desc: 'بہتر وشوسنییتا اور تیز تر پروسیسنگ کے لیے ڈیزائن کیا گیا۔' },
      ],
    },
    processing: {
      heading: 'موجودہ پروسیسنگ اوقات',
      asOf: '26 مئی 2026 تک',
      source: 'DETE پروسیسنگ تاریخیں',
      note: 'درخواستیں موصول ہونے کی تاریخ کی ترتیب میں پروسیس کی جاتی ہیں۔ دکھائی گئی تاریخیں موجودہ وقت میں پروسیس ہونے والی تازہ ترین درخواستوں کی ہیں۔',
      rows: [
        { type: 'Critical Skills (نئی)', date: '11 مئی 2026', lag: '~2 ہفتے', speed: 'fast' },
        { type: 'Intra-Company Transfer (نئی)', date: '22 اپریل 2026', lag: '~5 ہفتے', speed: 'medium' },
        { type: 'General اور دیگر نئی درخواستیں', date: '8 مارچ 2026', lag: '~12 ہفتے', speed: 'slow' },
        { type: 'تجدید (تمام اقسام)', date: '28 فروری 2026', lag: '~3 ماہ', speed: 'slow' },
        { type: 'نظرثانی / اپیلیں', date: '9 دسمبر 2025', lag: '~6 ماہ', speed: 'very-slow' },
      ],
    },
    links: {
      heading: 'سرکاری وسائل',
      portal: 'EPOS پورٹل پر جائیں',
      info: 'DETE — نئے EPOS کی معلوماتی صفحہ',
      support: 'تکنیکی مدد: epos@enterprise.gov.ie',
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
  const c = content[lang as keyof typeof content] ?? content.en;

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
