import type {
  CaseStudy,
  LiveNotification,
  PricingTier,
  ProcessStep,
  ServiceTab,
  Testimonial,
} from './types';

export const NAV_LINKS = ['Work', 'Services', 'Results', 'Pricing', 'Contact'] as const;

export const HERO_STATS = [
  { value: '127+', label: 'Brands Scaled' },
  { value: '$24.7M', label: 'Revenue Generated' },
  { value: '340%', label: 'Avg ROAS' },
] as const;

export const LIVE_NOTIFICATIONS: LiveNotification[] = [
  { id: '1', brand: 'NorthFlow Fashion', metric: '+$4,200 revenue', timestamp: '2s ago' },
  { id: '2', brand: 'Meridian SaaS', metric: '+14 qualified leads', timestamp: '8s ago' },
  { id: '3', brand: 'PeakDTC', metric: 'ROAS hit 4.8x', timestamp: '23s ago' },
  { id: '4', brand: 'UrbanRetail', metric: '-12% CAC', timestamp: '1m ago' },
  { id: '5', brand: 'LaunchOS', metric: '+$8,400 revenue', timestamp: '2m ago' },
  { id: '6', brand: 'ClearSkin Beauty', metric: '+284% CTR', timestamp: '3m ago' },
  { id: '7', brand: 'Aero Digital', metric: '+$6,100 revenue', timestamp: '4m ago' },
  { id: '8', brand: 'Vault Finance', metric: '3.2x ROAS', timestamp: '5m ago' },
  { id: '9', brand: 'Nimbus Cloud', metric: '+22 MQLs', timestamp: '6m ago' },
  { id: '10', brand: 'Solari Health', metric: '-18% CPA', timestamp: '7m ago' },
  { id: '11', brand: 'Drift Motors', metric: '+$12,300 revenue', timestamp: '8m ago' },
  { id: '12', brand: 'Cardinal Labs', metric: '+180% CTR', timestamp: '9m ago' },
  { id: '13', brand: 'Apex Ventures', metric: '5.1x ROAS', timestamp: '10m ago' },
  { id: '14', brand: 'Forge Studio', metric: '+$3,800 revenue', timestamp: '11m ago' },
  { id: '15', brand: 'NorthFlow Fashion', metric: '-24% CAC', timestamp: '12m ago' },
  { id: '16', brand: 'PeakDTC', metric: '+$9,200 revenue', timestamp: '13m ago' },
  { id: '17', brand: 'Meridian SaaS', metric: '+31 demos booked', timestamp: '14m ago' },
  { id: '18', brand: 'UrbanRetail', metric: '+210% ROAS', timestamp: '15m ago' },
  { id: '19', brand: 'LaunchOS', metric: '+$5,600 ARR', timestamp: '16m ago' },
  { id: '20', brand: 'ClearSkin Beauty', metric: '+42K impressions', timestamp: '17m ago' },
];

export const MARQUEE_ROW_1 = [
  '@NorthFlow +$2.4M Revenue',
  '@MeridianSaaS 6x Pipeline',
  '@PeakDTC 340% ROAS',
  '@UrbanRetail -42% CAC',
  '@LaunchOS +$1.8M ARR',
  '@ClearSkin +284% CTR',
];

export const MARQUEE_ROW_2 = [
  'PAID SOCIAL',
  'GOOGLE ADS',
  'BRAND STRATEGY',
  'CONTENT PRODUCTION',
  'EMAIL MARKETING',
  'INFLUENCER',
  'CRO',
  'SEO',
  'ANALYTICS',
];

export const RESULTS_METRICS = [
  { label: 'Revenue Generated', value: 24.7, prefix: '$', suffix: 'M', bar: 85, description: 'Total revenue generated across all client accounts' },
  { label: 'Average ROAS', value: 340, prefix: '', suffix: '%', bar: 72, description: 'Return on ad spend averaged across campaigns' },
  { label: 'Brands Scaled', value: 127, prefix: '', suffix: '+', bar: 65, description: 'Brands that scaled past their growth plateaus' },
  { label: 'Avg Growth Multiplier', value: 4.2, prefix: '', suffix: 'x', bar: 78, description: 'Average revenue multiplier within 12 months' },
] as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    brand: 'NorthFlow Fashion',
    industry: 'E-Commerce',
    mainMetric: '+$2.4M Revenue',
    mainMetricLabel: 'Total revenue generated in 89 days',
    secondaryMetrics: [
      { value: '4.1x', label: 'ROAS' },
      { value: '+127%', label: 'CTR' },
    ],
    timeline: '89 days',
  },
  {
    id: '2',
    brand: 'Meridian SaaS',
    industry: 'B2B Software',
    mainMetric: '6.2x Pipeline',
    mainMetricLabel: 'Sales pipeline growth multiplier',
    secondaryMetrics: [
      { value: '-38%', label: 'CAC' },
      { value: '+210%', label: 'Demos' },
    ],
    timeline: '6 months',
  },
  {
    id: '3',
    brand: 'PeakDTC',
    industry: 'Direct-to-Consumer',
    mainMetric: '340% ROAS',
    mainMetricLabel: 'Return on ad spend achieved',
    secondaryMetrics: [
      { value: '$840K', label: 'Q4 Revenue' },
      { value: '3.2M', label: 'Reach' },
    ],
    timeline: '60 days',
  },
  {
    id: '4',
    brand: 'UrbanRetail',
    industry: 'Retail Chain',
    mainMetric: '-42% CAC',
    mainMetricLabel: 'Customer acquisition cost reduction',
    secondaryMetrics: [
      { value: '+180%', label: 'ROAS' },
      { value: '22', label: 'Locations' },
    ],
    timeline: '4 months',
  },
  {
    id: '5',
    brand: 'LaunchOS',
    industry: 'B2B Tech',
    mainMetric: '+$1.8M ARR',
    mainMetricLabel: 'Annual recurring revenue added',
    secondaryMetrics: [
      { value: '127', label: 'MQL/mo' },
      { value: '4.8x', label: 'LTV' },
    ],
    timeline: '9 months',
  },
  {
    id: '6',
    brand: 'ClearSkin Beauty',
    industry: 'Health & Beauty',
    mainMetric: '+284% CTR',
    mainMetricLabel: 'Click-through rate improvement',
    secondaryMetrics: [
      { value: '3.6x', label: 'ROAS' },
      { value: '2.1M', label: 'Impressions' },
    ],
    timeline: '45 days',
  },
];

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: 'performance',
    label: 'PERFORMANCE',
    services: [
      { iconName: 'Target', name: 'Paid Social (Meta/TikTok/LinkedIn)', description: 'Full-funnel paid social campaigns across every major platform' },
      { iconName: 'Search', name: 'Google Ads & PPC', description: 'Search, shopping, and display campaigns optimized for ROAS' },
      { iconName: 'Monitor', name: 'Programmatic Display', description: 'Automated display buying across premium inventory' },
      { iconName: 'MousePointerClick', name: 'Conversion Rate Optimization', description: 'Landing pages, funnels, and checkout flows that convert' },
      { iconName: 'BarChart3', name: 'Attribution & Analytics', description: 'Multi-touch attribution and real-time performance dashboards' },
      { iconName: 'RefreshCw', name: 'Retargeting', description: 'Dynamic retargeting across channels to recapture lost conversions' },
    ],
    proof: {
      metric: '340% Average ROAS',
      caseRef: 'NorthFlow Fashion',
      quote: 'NorthFlow hit $2.4M in 89 days on Meta alone.',
    },
  },
  {
    id: 'brand',
    label: 'BRAND',
    services: [
      { iconName: 'Compass', name: 'Brand Strategy & Positioning', description: 'Define your market position and competitive advantage' },
      { iconName: 'Palette', name: 'Visual Identity System', description: 'Logo, color, typography, and design system creation' },
      { iconName: 'MessageSquare', name: 'Brand Voice & Messaging', description: 'Tone, language, and messaging framework across channels' },
      { iconName: 'Eye', name: 'Competitive Analysis', description: 'Deep competitive intelligence and opportunity mapping' },
      { iconName: 'BookOpen', name: 'Brand Guidelines', description: 'Comprehensive brand bible for consistent execution' },
      { iconName: 'Rocket', name: 'Go-to-Market Planning', description: 'Launch strategy with channel mix and timing' },
    ],
    proof: {
      metric: '6.2x Revenue Post-Rebrand',
      caseRef: 'Meridian SaaS',
      quote: 'Meridian went from "another tool" to category leader.',
    },
  },
  {
    id: 'content',
    label: 'CONTENT',
    services: [
      { iconName: 'FileText', name: 'Content Strategy', description: 'Editorial calendar and content pillars aligned with growth goals' },
      { iconName: 'Video', name: 'Short-form Video (Reels/TikTok)', description: 'Scroll-stopping vertical video for organic and paid' },
      { iconName: 'PenTool', name: 'Long-form & SEO', description: 'Authority content that ranks and converts' },
      { iconName: 'Mail', name: 'Email Sequences', description: 'Automated flows and campaigns that nurture and sell' },
      { iconName: 'Users', name: 'Influencer Management', description: 'End-to-end influencer partnerships and campaign management' },
      { iconName: 'Share2', name: 'Social Media', description: 'Platform-native content and community management' },
    ],
    proof: {
      metric: '+284% Organic Reach',
      caseRef: 'ClearSkin Beauty',
      quote: 'ClearSkin doubled their email list in 45 days.',
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'AUDIT & ANALYSIS',
    timeline: 'Week 1-2',
    description: 'Full diagnostic of your current performance, competitors, and growth gaps. No assumptions. Only data.',
    output: 'Full performance audit + opportunity map',
  },
  {
    number: '02',
    title: 'STRATEGY',
    timeline: 'Week 3',
    description: 'Custom growth blueprint. Channels, budget split, 90-day targets. Built for your business, not templated.',
    output: 'Strategy doc + KPI framework',
  },
  {
    number: '03',
    title: 'EXECUTE',
    timeline: 'From Week 4',
    description: 'Campaigns live within 7 days of sign-off. Creative, copy, targeting — all handled.',
    output: 'Live campaigns + weekly reports',
  },
  {
    number: '04',
    title: 'SCALE',
    timeline: 'Ongoing',
    description: 'Double down on what works. Kill what doesn\'t. No ego. Only results. Your budget is treated like ours.',
    output: 'Monthly reports + scaling roadmap',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James R.',
    title: 'CMO',
    company: 'NorthFlow Fashion',
    quote: 'KOVA didn\'t just run our ads. They rebuilt our entire acquisition model. We hit $2.4M in the first 90 days together. I\'ve worked with four agencies before. None of them thought like KOVA.',
    resultBadge: '+$2.4M Revenue \u00B7 89 days',
    initial: 'J',
  },
  {
    id: '2',
    name: 'Sofia M.',
    title: 'Founder',
    company: 'Meridian SaaS',
    quote: 'We were burning budget on what felt right but had no data behind it. KOVA killed everything, rebuilt from scratch, and our pipeline is up 6x. I wish we\'d called them a year earlier.',
    resultBadge: '6x Pipeline Growth',
    initial: 'S',
  },
  {
    id: '3',
    name: 'Daniel K.',
    title: 'Head of Growth',
    company: 'PeakDTC',
    quote: 'The ROAS projections looked unrealistic. Then we hit them in week 6. Then we doubled them by month 3. This team operates on a completely different level.',
    resultBadge: '340% ROAS \u00B7 Month 3',
    initial: 'D',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'spark',
    name: 'SPARK',
    price: 1500,
    annualPrice: 1200,
    tagline: 'For brands ready to grow systematically.',
    features: [
      'SMM (2 platforms, 12 posts/mo)',
      'Basic SEO',
      'Monthly strategy call (1h)',
      'Monthly performance report',
      'Shared account manager',
      'Client dashboard access',
    ],
    inheritedCount: 0,
    isPopular: false,
    ctaLabel: 'ORDER NOW',
  },
  {
    id: 'ignite',
    name: 'IGNITE',
    price: 3500,
    annualPrice: 2800,
    tagline: 'For brands ready to spend smarter.',
    features: [
      'Paid Ads (Meta OR Google, up to $5K spend)',
      'Email marketing (2 campaigns/mo)',
      'Content strategy doc',
      'Bi-weekly calls',
      'A/B testing (ads + pages)',
      'Competitor monitoring',
    ],
    inheritedCount: 6,
    isPopular: false,
    ctaLabel: 'ORDER NOW',
  },
  {
    id: 'scale',
    name: 'SCALE',
    price: 7500,
    annualPrice: 6000,
    tagline: 'For brands serious about market dominance.',
    features: [
      'Full multi-platform ads (Meta + Google + TikTok)',
      'Content production (8 reels/mo + graphics)',
      'Influencer outreach (up to 8/mo)',
      'Dedicated account manager',
      'Weekly strategy calls',
      'CRO audit & implementation',
      'Real-time performance dashboard',
    ],
    inheritedCount: 12,
    isPopular: true,
    ctaLabel: 'ORDER NOW',
  },
  {
    id: 'dominate',
    name: 'DOMINATE',
    price: 15000,
    annualPrice: 12000,
    tagline: 'For brands that want total market control.',
    features: [
      'Full brand strategy & identity',
      'PR & media placements (4/mo)',
      'Advanced attribution setup',
      'Funnel architecture & optimization',
      'Dedicated creative director',
      'Priority SLA (< 4h response)',
      'Quarterly business reviews',
    ],
    inheritedCount: 19,
    isPopular: false,
    ctaLabel: 'ORDER NOW',
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: 'custom',
    tagline: 'For brands that need a full marketing department.',
    features: [
      'Team of 6+ dedicated specialists',
      'Full marketing dept. outsourcing',
      'Custom KPI framework & SLA guarantees',
      'C-Suite strategy advisory',
      'Custom integrations & reporting',
      'White-glove onboarding',
    ],
    inheritedCount: 26,
    isPopular: false,
    ctaLabel: "LET'S TALK",
  },
];

export const TRUST_SIGNALS = [
  { icon: 'Lock', title: 'Data-backed decisions only', description: 'Every recommendation backed by real analytics' },
  { icon: 'BarChart2', title: 'Weekly transparent reporting', description: 'Full visibility into spend, results, and next steps' },
  { icon: 'RefreshCw', title: 'No lock-in contracts', description: 'Month-to-month. Results keep you, not contracts' },
  { icon: 'Zap', title: 'Campaigns live in 7 days', description: 'From sign-off to live campaigns in one week' },
] as const;

export const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  'E-Commerce': 1.15,
  'SaaS': 1.25,
  'Retail': 1.0,
  'B2B': 1.2,
  'Health': 1.1,
  'Other': 1.05,
};

export const LOGO_ROW_1 = ['NORTHFLOW', 'MERIDIAN', 'PEAKDTC', 'URBANRETAIL', 'LAUNCHOS', 'CLEARSKIN'];
export const LOGO_ROW_2 = ['AERO', 'VAULT', 'NIMBUS', 'SOLARI', 'DRIFT', 'CARDINAL', 'APEX', 'FORGE'];
