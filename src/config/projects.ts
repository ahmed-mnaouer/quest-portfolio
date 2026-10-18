export type ProjectCategory =
  | 'AI & Software'
  | 'Analytics'
  | 'Web & Games'

export interface PortfolioProject {
  id: string
  title: string
  category: ProjectCategory
  label: string
  summary: string
  tools: string[]
  pipeline: string[]
  contribution: string
  approach: string[]
  evidence: string
  limitations: string
  sourceUrl?: string
  sourceLabel?: string
  featured?: boolean
  demo?: 'wish'
}

// Based on Ahmed's supplied project summaries.
// Repository contents and original evaluation outputs remain to be reviewed.
export const PROJECTS: PortfolioProject[] = [
  {
    id: 'wish-analytics',
    title: 'Wish E-Commerce Analytics',
    category: 'Analytics',
    label: 'Academic BI project · Two-person team',
    summary:
      'An end-to-end BI workflow connecting Python data preparation, a PostgreSQL snowflake warehouse, SQL analysis, and Power BI reporting.',
    tools: ['Python', 'Pandas', 'PostgreSQL', 'SQL', 'Power BI'],
    pipeline: [
      'CSV preparation',
      'Snowflake warehouse',
      'SQL analysis',
      'Power BI reporting',
    ],
    contribution:
      'Collaborated equally across preparation, warehouse design, and analysis. Led the initial Power BI dashboard implementation and visual design, with subsequent refinements contributed by my teammate.',
    approach: [
      'Prepared two CSV sources using a Kaggle dataset of Wish summer-product listings collected in August 2020.',
      'Handled duplicates and missing values, standardized columns, derived fields, and created aggregations using Python and Pandas.',
      'Loaded an Inventory Fact table linked to Product, Merchant, and Shipping dimensions, with Origin Country and Merchant Profile sub-dimensions.',
      'Queried the warehouse and developed Power BI views comparing merchants, products, shipping options, and countries of origin.',
    ],
    evidence:
      'The original project included merchant comparisons, product rankings, shipping-related inventory views, and country-level analysis. The interactive example below is a new portfolio prototype, not an export of that Power BI report.',
    limitations:
      'The original units-sold / starting-inventory indicator requires confirmation of its underlying assumptions. The original price-gap calculation is not treated as profit. Neither the reported 0.84 ratio nor the €95M calculation is presented here as verified business impact. The sample dashboard uses explicitly synthetic data.',
    sourceUrl:
      'https://github.com/ahmed-mnaouer/Inventory-Analysis_Wish-Platform',
    sourceLabel: 'Project repository',
    featured: true,
    demo: 'wish',
  },
  {
    id: 'trik-esslema',
    title: 'Trik Esslema',
    category: 'Web & Games',
    label: 'Railway booking application · Individual project',
    summary:
      'A full-stack railway booking application connecting reservation flows, administration, payment integration, notifications, and PDF ticket generation.',
    tools: ['Python', 'Flask', 'JavaScript', 'PostgreSQL'],
    pipeline: [
      'Trip selection',
      'Booking flow',
      'Payment integration',
      'PDF ticket',
    ],
    contribution:
      'Built the application individually, including booking and administration flows, REST endpoints, notifications, booking-timeout protection, Konnect integration, and QR-coded PDF ticket generation.',
    approach: [
      'Connected the frontend booking flow to Flask endpoints and PostgreSQL.',
      'Implemented reservation and administration functionality.',
      'Integrated payment handling, booking-timeout protection, and ticket generation.',
      'Tested selected endpoints and application interactions.',
    ],
    evidence:
      'The repository is linked for implementation details. Application screenshots and an annotated booking walkthrough will be added after reviewing the current build.',
    limitations:
      'No production operation, comprehensive security audit, or real railway affiliation is claimed. The cancelled scraping experiment is outside this public case study.',
    sourceUrl: 'https://github.com/ahmed-mnaouer/Trik-Esslema',
    sourceLabel: 'Project repository',
  },
  {
    id: 'humidity-regression',
    title: 'Humidity Prediction',
    category: 'Analytics',
    label: 'Regression analysis · Individual project',
    summary:
      'An econometrics project exploring humidity prediction through feature refinement, Lasso selection, OLS modelling, and residual diagnostics.',
    tools: ['Python', 'OLS', 'Lasso', 'Regression diagnostics'],
    pipeline: [
      'Weather data',
      'Feature refinement',
      'Model comparison',
      'Residual diagnostics',
    ],
    contribution:
      'Developed the analysis individually, including VIF-based feature refinement, Lasso selection, interpretable linear modelling, and comparison with a polynomial alternative.',
    approach: [
      'Examined relationships and multicollinearity in the input features.',
      'Used feature-refinement and selection methods to construct candidate models.',
      'Compared linear and polynomial specifications.',
      'Examined residual diagnostics and model limitations.',
    ],
    evidence:
      'The repository is linked. Exact model scores will be added after checking that the reported metrics and evaluation settings are comparable.',
    limitations:
      'Model fit is not presented as proof of performance on future weather conditions. Evaluation details and diagnostic outputs remain to be reviewed.',
    sourceUrl:
      'https://github.com/ahmed-mnaouer/Weather-Regression-analysis',
    sourceLabel: 'Project repository',
  },
  {
    id: 'loan-approval',
    title: 'Loan Approval Prediction',
    category: 'Analytics',
    label: 'Machine learning · Individual project',
    summary:
      'An R-based classification project comparing Decision Tree and Random Forest approaches to loan-approval prediction.',
    tools: ['R', 'Decision Tree', 'Random Forest'],
    pipeline: [
      'Loan data',
      'Preparation',
      'Model comparison',
      'Evaluation',
    ],
    contribution:
      'Built and evaluated the models individually and explored feature importance to explain their predictions.',
    approach: [
      'Defined the classification task and prepared the available variables.',
      'Compared Decision Tree and Random Forest models.',
      'Examined evaluation results and feature importance.',
      'Documented the workflow and findings.',
    ],
    evidence:
      'The repository is linked. The reported high accuracy is intentionally not used as a headline until the split, preprocessing, and evaluation methodology have been reviewed.',
    limitations:
      'This is an educational project, not a deployed lending system. Generalisation, leakage risks, and decision-making implications require careful evaluation.',
    sourceUrl:
      'https://github.com/ahmed-mnaouer/Loan-Approval-Prediction_Project',
    sourceLabel: 'Project repository',
  },
  {
    id: 'ahmeds-quest',
    title: 'Ahmed’s Quest',
    category: 'Web & Games',
    label: 'Interactive portfolio · In development',
    summary:
      'An explorable RPG village with animated four-direction movement and a direct professional portfolio for visitors who prefer conventional browsing.',
    tools: ['React', 'TypeScript', 'Phaser', 'Tiled'],
    pipeline: [
      'Tiled village',
      'Phaser movement',
      'React panels',
      'Shared portfolio',
    ],
    contribution:
      'Building this portfolio with AI-assisted implementation while configuring the environment, preparing the village map, testing interactions, and directing the visual design.',
    approach: [
      'Created the village layout and marked spawn, collision, and interaction objects in Tiled.',
      'Integrated sprite-sheet walking animations and four-direction movement.',
      'Connected village doors to portfolio panels.',
      'Developed a direct professional browsing experience alongside the optional game.',
    ],
    evidence:
      'The current implementation includes movement, collision rectangles, door interactions, and browser-saved exploration progress.',
    limitations:
      'Collision accuracy, foreground layering, mobile presentation, and content remain in progress. Third-party village and character artwork require their own credits.',
    sourceUrl: 'https://github.com/ahmed-mnaouer/quest-portfolio',
    sourceLabel: 'Source code',
  },

  {
    id: 'cipherguard',
    title: 'CipherGuard',
    category: 'AI & Software',
    label: 'Encryption application · Two-person team',
    summary:
      'A web-based educational encryption application exploring AES, RSA, ECC, and a hybrid ECC–AES workflow.',
    tools: ['Python', 'Flask', 'JavaScript', 'AES', 'RSA', 'ECC'],
    pipeline: [
      'User input',
      'Encryption workflow',
      'Key handling',
      'Output',
    ],
    contribution:
      'Contributed to the encryption implementation in a two-person team, including a hybrid ECC–AES scheme using HKDF-derived AES keys. The final case study will distinguish individual responsibilities in more detail.',
    approach: [
      'Built a web interface connected to Flask-based encryption functionality.',
      'Implemented workflows involving AES, RSA, and ECC.',
      'Explored key-handling considerations and a hybrid ECC–AES design.',
    ],
    evidence:
      'The repository is available for implementation details. An annotated workflow and screenshots can be added after reviewing the current version.',
    limitations:
      'This is an educational application, not an independently audited security product. No production-security or compliance guarantee is claimed.',
    sourceUrl: 'https://github.com/ahmed-mnaouer/CipherGuard',
    sourceLabel: 'Project repository',
  },
  {
    id: 'disneyland-eda',
    title: 'Disneyland Reviews Exploration',
    category: 'Analytics',
    label: 'Exploratory data analysis · Individual project',
    summary:
      'An exploratory analysis of Disneyland reviews, examining visitor sentiment, review activity, reviewer locations, and branch distribution.',
    tools: ['Python', 'Exploratory data analysis'],
    pipeline: [
      'Review data',
      'Exploration',
      'Category comparisons',
      'Interpretation',
    ],
    contribution:
      'Conducted the analysis individually to explore review patterns and categorical differences across the available dataset.',
    approach: [
      'Examined the review dataset and its available fields.',
      'Explored review activity and visitor-sentiment patterns.',
      'Compared reviewer locations and branch distribution.',
      'Summarized observations and limitations.',
    ],
    evidence:
      'The repository is available. Selected charts and specific findings will be added after reviewing the original analysis.',
    limitations:
      'Review data may not represent all visitors. No causal explanation, representative satisfaction estimate, or verified business impact is claimed.',
    sourceUrl:
      'https://github.com/ahmed-mnaouer/Exploratory-Data-Analysis-for-Disney-Land-Reviews',
    sourceLabel: 'Project repository',
  },
]