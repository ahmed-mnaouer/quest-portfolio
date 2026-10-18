export interface ExperienceEntry {
  id: string
  role: string
  organisation: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'talys-ai-engineering',
    role: 'AI Engineering Intern',
    organisation: 'TALYS',
    period: 'February–May 2026',
    location: 'Tunis, Tunisia · Hybrid',
    summary:
      'Developed a conversational AI prototype for an internal banking platform.',
    highlights: [
      'Worked on application integration, controlled access to operations, and structured evaluation.',
      'Internal implementation details and company materials are not published in this portfolio.',
    ],
  },
  {
    id: 'monetique-bi',
    role: 'Business Intelligence Intern',
    organisation: 'Monétique Tunisie',
    period: 'July 2025',
    location: 'Ariana, Tunisia · Hybrid',
    summary:
      'Prepared financial datasets and developed two interactive Power BI dashboards.',
    highlights: [
      'Cleaned, unpivoted, and standardized INS datasets using Excel and Power Query.',
      'Explored monetary resources, financial structure, regional banking infrastructure, and external payment flows.',
    ],
  },
  {
    id: 'talys-ai',
    role: 'Artificial Intelligence Intern',
    organisation: 'TALYS',
    period: 'June–July 2025',
    location: 'Tunis, Tunisia · Hybrid',
    summary:
      'Worked on a prototype for AML name screening using similarity features and machine learning.',
    highlights: [
      'Experimented with classification models and name-comparison features.',
      'Implemented a Streamlit interface connected to a Flask API. Model evaluation is being revisited; no performance claims are presented here.',
    ],
  },
]

export const EDUCATION = [
  {
    id: 'iseg',
    institution: 'ISEG, Lisbon',
    qualification: 'Master’s in Data Analytics for Business',
    period: 'Currently pursuing',
    details: [
      'Developing further expertise in business-focused data analysis.',
    ],
  },
  {
    id: 'tbs',
    institution: 'Tunis Business School · University of Tunis',
    qualification: 'Bachelor of Science in Business Administration',
    period: 'September 2022–July 2026',
    details: [
      'Major: Business Analytics · Minor: Information Technology.',
      'Cumulative GPA: 3.68/4.00 · Magna Cum Laude.',
      'End-of-studies project defended with Excellent mention.',
      'Selected coursework: Business Intelligence, Data Mining, Advanced Econometrics, Time Series Analysis, and Database Administration.',
    ],
  },
]

export const HONOURS = [
  {
    id: 'university-rank',
    title: 'First rank — University of Tunis',
    detail: 'University-wide graduating-class distinction.',
  },
  {
    id: 'magna-cum-laude',
    title: 'Magna Cum Laude',
    detail: 'Graduated with a cumulative GPA of 3.68/4.00.',
  },
  {
    id: 'excellence-2023',
    title: 'Academic Excellence · 2023/24',
    detail: 'Academic-year GPA: 3.761/4.00.',
  },
  {
    id: 'excellence-2024',
    title: 'Academic Excellence · 2024/25',
    detail: 'Academic-year GPA: 3.717/4.00.',
  },
  {
    id: 'excellence-2025',
    title: 'Academic Excellence · 2025/26',
    detail: 'Academic-year GPA: 3.833/4.00.',
  },
]

export const LEADERSHIP = [
  {
    id: 'tbsje-hr',
    role: 'HR Manager',
    organisation: 'TBS Junior Enterprise',
    period: 'September 2023–June 2024',
    highlights: [
      'Tracked HR and performance indicators for more than 50 members.',
      'Supported training, onboarding, evaluation, and documentation practices.',
    ],
  },
  {
    id: 'tbsje-consultant',
    role: 'Junior Consultant',
    organisation: 'TBS Junior Enterprise',
    period: 'October 2022–June 2023',
    highlights: [
      'Delivered two market-research projects covering survey design, collection, analysis, and reporting.',
      'Used Sphinx Declic and coordinated field outreach to support data quality.',
    ],
  },
]

export const SKILL_GROUPS = [
  {
    id: 'analysis',
    title: 'Data analysis',
    description:
      'Preparing, querying, and exploring data across analytical projects.',
    tools: ['Python', 'Pandas', 'R', 'SQL'],
  },
  {
    id: 'bi',
    title: 'Business intelligence',
    description:
      'Connecting data preparation and warehouse modelling to reporting.',
    tools: [
      'Power BI',
      'Power Query',
      'Excel',
      'PostgreSQL',
      'ETL',
      'Dimensional modelling',
    ],
  },
  {
    id: 'modelling',
    title: 'Statistical modelling & ML',
    description:
      'Building candidate models and examining their evaluation and limitations.',
    tools: [
      'scikit-learn',
      'XGBoost',
      'Classification',
      'Regression',
      'Model evaluation',
    ],
  },
  {
    id: 'software',
    title: 'Applications & integration',
    description:
      'Building interfaces, backend services, and connected workflows.',
    tools: [
      'Flask',
      'Streamlit',
      'REST APIs',
      'JavaScript',
      'Angular',
      'MCP',
    ],
  },
  {
    id: 'portfolio-development',
    title: 'Current portfolio stack',
    description:
      'Technologies used while building this AI-assisted portfolio project.',
    tools: ['React', 'TypeScript', 'Phaser', 'Tiled', 'Git'],
  },
]

export const LANGUAGES = [
  {
    name: 'Arabic',
    level: 'Native',
  },
  {
    name: 'English',
    level: 'C1 · Self-assessed',
  },
  {
    name: 'French',
    level: 'B2 · Self-assessed',
  },
  {
    name: 'Portuguese',
    level: 'Currently learning',
  },
  {
    name: 'Maltese',
    level: 'Beginner · Self-directed learning',
  },
]