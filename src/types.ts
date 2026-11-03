export type PageId = 'home' | 'about' | 'work' | 'team' | 'contact' | 'investigation';

export interface NavItem {
  id: PageId;
  label: string;
}

export interface InvestigationDetailData {
  id: string;
  beatNumber: string;
  category: 'journalism' | 'platforms' | 'public';
  name: string;
  tagline: string;
  description: string;
  image: string;
  outputsCount: string;
  timeframe: string;
  status: 'Active Longitudinal Research' | 'Continuous Monitoring' | 'Annual Cycle';
  leadFellows: string[];
  metrics: { label: string; value: string; detail: string }[];
  overview: string[];
  keyQuestions: string[];
  methodologyDetails: {
    title: string;
    protocol: string;
    frequency: string;
    description: string;
  }[];
  caseStudies: {
    title: string;
    year: string;
    summary: string;
    impact: string;
  }[];
  publications: {
    title: string;
    type: 'Monograph' | 'Policy Brief' | 'Dataset' | 'Peer-Reviewed Paper';
    date: string;
    pagesOrSize: string;
    downloadUrl?: string;
  }[];
}

export interface FocusAreaItem {
  number: string;
  topic: string;
  description: string;
  image: string;
  expandedDetails?: string[];
}

export interface WorkCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  methods: string[];
  sampleInquiries: string[];
  image: string;
  outputsCount: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'leadership' | 'research';
  image: string;
  bio: string;
  fullBio: string;
  researchInterests: string[];
  recentPublications?: string[];
  education?: string;
  email?: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CoreValue {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}
