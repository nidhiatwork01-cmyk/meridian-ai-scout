export type Stage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';

export type SignalType = 'hiring' | 'funding' | 'product' | 'press' | 'partnership' | 'exec_move';

export interface Signal {
  id: string;
  type: SignalType;
  title: string;
  description: string;
  date: string;
  source?: string;
  icon: string;
}

export interface DerivedSignal {
  label: string;
  description: string;
  type: 'positive' | 'neutral' | 'warning';
}

export interface EnrichResult {
  summary: string;
  bullets: string[];
  keywords: string[];
  signals: DerivedSignal[];
  sources: { url: string; fetchedAt: string }[];
  enrichedAt: string;
}

export interface Founder {
  name: string;
  role: string;
  linkedin?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  website: string;
  logo: string;
  tagline: string;
  description: string;
  stage: Stage;
  sector: string;
  subSector: string;
  hq: string;
  country: string;
  founded: number;
  employees: string;
  totalRaised: string;
  lastRound: string;
  lastRoundDate: string;
  investors: string[];
  founders: Founder[];
  tags: string[];
  signalScore: number;
  thesisMatch: number;
  signals: Signal[];
  notes: string;
  savedToLists: string[];
  enriched: EnrichResult | null;
  createdAt: string;
}

export interface List {
  id: string;
  name: string;
  description: string;
  companyIds: string[];
  createdAt: string;
  color: string;
}

export interface FilterState {
  query: string;
  stages: Stage[];
  sectors: string[];
  countries: string[];
  foundedRange: [number, number];
  employeeRanges: string[];
  thesisMatchMin: number | null;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: FilterState;
  resultCount: number;
  createdAt: string;
  lastRunAt: string;
}

export interface SearchState {
  name: string;
  query: string;
  filters: FilterState;
  resultCount: number;
}
