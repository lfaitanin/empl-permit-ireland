export interface Company {
  slug: string;
  name: string;
  monthly: number[];
  total: number;
  year: number;
}

export interface Sector {
  name: string;
  slug: string;
  code: string;
  monthly: number[];
  total: number;
  year: number;
}

export interface County {
  name: string;
  slug: string;
  issued: number;
  refused: number;
  approvalRate: number;
  year: number;
}

export interface YearlyTotal {
  year: number;
  totalPermits: number;
  totalIssued: number;
  totalRefused: number;
  approvalRate: number;
  totalCompanies: number;
}

export interface Summary {
  totalPermits2025: number;
  totalPermits2026: number;
  totalRefused2025: number;
  totalRefused2026: number;
  totalCompanies2025: number;
  totalCompanies2026: number;
  approvalRate2025: number;
  approvalRate2026: number;
  topCompanies2025: { name: string; total: number }[];
  topCompanies2026: { name: string; total: number }[];
  topSectors2025: { name: string; total: number }[];
  topSectors2026: { name: string; total: number }[];
  topCounties2025: { name: string; issued: number }[];
  topCounties2026: { name: string; issued: number }[];
  monthlyTrend2025: number[];
  monthlyTrend2026: number[];
  yearlyTotals: YearlyTotal[];
}

export interface CourseRecommendation {
  sector: string;
  technicalCourses: {
    name: string;
    provider: string;
    duration: string;
    free: boolean;
  }[];
  universityPrograms: {
    name: string;
    university: string;
    level: string;
  }[];
  certifications: {
    name: string;
    body: string;
  }[];
}

export interface Nationality {
  name: string;
  slug: string;
  issued: number;
  refused: number;
  withdrawn: number;
  total: number;
  approvalRate: number;
  year: number;
}

export interface CriticalSkillOccupation {
  title: string;
  socCode: string;
  category: 'critical_skills' | 'ineligible';
}

export interface VisaStamp {
  stamp: string;
  name: string;
  description: string;
  workRights: string;
  duration: string;
  examples: string[];
}

export type Lang = 'en' | 'pt';
