import type { Company, Sector, County, Nationality, Summary } from '../types';

import companies2022Data from '../data/companies-2022.json';
import companies2023Data from '../data/companies-2023.json';
import companies2024Data from '../data/companies-2024.json';
import companies2025Data from '../data/companies-2025.json';
import companies2026Data from '../data/companies-2026.json';
import sectors2022Data from '../data/sectors-2022.json';
import sectors2023Data from '../data/sectors-2023.json';
import sectors2024Data from '../data/sectors-2024.json';
import sectors2025Data from '../data/sectors-2025.json';
import sectors2026Data from '../data/sectors-2026.json';
import counties2022Data from '../data/counties-2022.json';
import counties2023Data from '../data/counties-2023.json';
import counties2024Data from '../data/counties-2024.json';
import counties2025Data from '../data/counties-2025.json';
import counties2026Data from '../data/counties-2026.json';
import nationalities2022Data from '../data/nationalities-2022.json';
import nationalities2023Data from '../data/nationalities-2023.json';
import nationalities2024Data from '../data/nationalities-2024.json';
import nationalities2025Data from '../data/nationalities-2025.json';
import nationalities2026Data from '../data/nationalities-2026.json';
import summaryData from '../data/summary.json';

export const companies2022 = companies2022Data as Company[];
export const companies2023 = companies2023Data as Company[];
export const companies2024 = companies2024Data as Company[];
export const companies2025 = companies2025Data as Company[];
export const companies2026 = companies2026Data as Company[];
export const sectors2022 = sectors2022Data as Sector[];
export const sectors2023 = sectors2023Data as Sector[];
export const sectors2024 = sectors2024Data as Sector[];
export const sectors2025 = sectors2025Data as Sector[];
export const sectors2026 = sectors2026Data as Sector[];
export const counties2022 = counties2022Data as County[];
export const counties2023 = counties2023Data as County[];
export const counties2024 = counties2024Data as County[];
export const counties2025 = counties2025Data as County[];
export const counties2026 = counties2026Data as County[];
export const nationalities2022 = nationalities2022Data as Nationality[];
export const nationalities2023 = nationalities2023Data as Nationality[];
export const nationalities2024 = nationalities2024Data as Nationality[];
export const nationalities2025 = nationalities2025Data as Nationality[];
export const nationalities2026 = nationalities2026Data as Nationality[];
export const summary = summaryData as Summary;

export const companiesByYear: Record<number, Company[]> = { 2022: companies2022, 2023: companies2023, 2024: companies2024, 2025: companies2025, 2026: companies2026 };
export const sectorsByYear: Record<number, Sector[]> = { 2022: sectors2022, 2023: sectors2023, 2024: sectors2024, 2025: sectors2025, 2026: sectors2026 };
export const countiesByYear: Record<number, County[]> = { 2022: counties2022, 2023: counties2023, 2024: counties2024, 2025: counties2025, 2026: counties2026 };
export const nationalitiesByYear: Record<number, Nationality[]> = { 2022: nationalities2022, 2023: nationalities2023, 2024: nationalities2024, 2025: nationalities2025, 2026: nationalities2026 };

export const ALL_YEARS = [2022, 2023, 2024, 2025, 2026] as const;

export function getCompanyBySlug(slug: string): Record<number, Company | undefined> {
  const result: Record<number, Company | undefined> = {};
  for (const year of ALL_YEARS) {
    result[year] = companiesByYear[year].find(c => c.slug === slug);
  }
  return result;
}

export function getAllCompanies(): {
  name: string; slug: string;
  total2022: number; total2023: number; total2024: number; total2025: number; total2026: number;
  grandTotal: number; yearsActive: number;
}[] {
  const map = new Map<string, { name: string; slug: string; total2022: number; total2023: number; total2024: number; total2025: number; total2026: number; grandTotal: number; yearsActive: number }>();

  const add = (companies: Company[], yearKey: 'total2022' | 'total2023' | 'total2024' | 'total2025' | 'total2026') => {
    for (const c of companies) {
      const existing = map.get(c.slug);
      if (existing) {
        existing[yearKey] = c.total;
        existing.grandTotal += c.total;
        existing.yearsActive += 1;
      } else {
        map.set(c.slug, { name: c.name, slug: c.slug, total2022: 0, total2023: 0, total2024: 0, total2025: 0, total2026: 0, grandTotal: c.total, yearsActive: 1, [yearKey]: c.total });
      }
    }
  };

  add(companies2022, 'total2022');
  add(companies2023, 'total2023');
  add(companies2024, 'total2024');
  add(companies2025, 'total2025');
  add(companies2026, 'total2026');

  return Array.from(map.values()).sort((a, b) => b.grandTotal - a.grandTotal);
}
