export interface PricingTier {
  id: string;
  name: string;
  price: number | 'custom';
  annualPrice?: number;
  tagline: string;
  features: string[];
  inheritedCount: number;
  isPopular: boolean;
  ctaLabel: string;
}

export interface CaseStudy {
  id: string;
  brand: string;
  industry: string;
  mainMetric: string;
  mainMetricLabel: string;
  secondaryMetrics: { value: string; label: string }[];
  timeline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  resultBadge: string;
  initial: string;
}

export interface LiveNotification {
  id: string;
  brand: string;
  metric: string;
  timestamp: string;
}

export interface OrderFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: 'email' | 'whatsapp' | 'telegram' | 'phone';
  budget: string;
  challenge: string;
  selectedPlan: string;
  selectedPrice: string;
}

export interface ROIInputs {
  monthlySpend: number;
  currentROAS: number;
  industry: string;
}

export interface ServiceTab {
  id: 'performance' | 'brand' | 'content';
  label: string;
  services: { iconName: string; name: string; description: string }[];
  proof: { metric: string; caseRef: string; quote: string };
}

export interface ProcessStep {
  number: string;
  title: string;
  timeline: string;
  description: string;
  output: string;
}
