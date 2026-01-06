
export interface BirthDetails {
  date: string;
  time: string;
  location: string;
  lat?: number;
  lon?: number;
  timezone?: string;
}

export interface Bazi {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
}

export interface PersonInput {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  birth: BirthDetails;
  bazi?: Bazi; // Optional in input, populated by AI ideally
}

export interface Dimension {
  score: number;
  comment: string;
}

export interface Overall {
  summary: string;
  summaryScore: number;
  dimensions: {
    communication: Dimension;
    values: Dimension;
    career: Dimension;
    wealth: Dimension;
    family: Dimension;
    intimacy: Dimension;
    stability: Dimension;
  };
  bestYears: number[];
  riskYears: number[];
}

export interface LoveKlinePoint {
  gregorianYear: number;
  ganZhiYear: string;
  daYunA: string | null;
  daYunB: string | null;
  open: number;
  close: number;
  high: number;
  low: number;
  volatilityLevel: 'LOW' | 'MID' | 'HIGH';
  trend: 'UP' | 'DOWN' | 'FLAT';
  tags: string[];
  reason: string;
}

export interface LifeLinePoint {
  gregorianYear: number;
  ganZhiYear: string;
  personA: { lifeScore: number; tags: string[] };
  personB: { lifeScore: number; tags: string[] };
}

export interface Annotation {
  gregorianYear: number;
  who: 'A' | 'B' | 'BOTH';
  title: string;
  detail: string;
}

export interface AnalysisResult {
  meta: {
    version: string;
    generatedAt: string;
    timezone: string;
    note: string;
  };
  inputEcho: {
    range: { startYear: number; endYear: number };
    personA: PersonInput;
    personB: PersonInput;
  };
  overall: Overall;
  page1LoveKline: {
    title: string;
    xAxis: string;
    yAxis: string;
    series: LoveKlinePoint[];
  };
  page2DualLifeLine: {
    title: string;
    xAxis: string;
    yAxis: string;
    series: LifeLinePoint[];
    annotations: Annotation[];
  };
}
