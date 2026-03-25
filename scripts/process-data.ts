import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const OUT_DIR = path.join(process.cwd(), 'src', 'data');

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function readSheet(filename: string): Record<string, unknown>[] {
  const filepath = path.join(DATA_DIR, filename);
  const workbook = XLSX.readFile(filepath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: 0 });
}

// ─── COMPANIES ────────────────────────────────────────────────────────────────

function processCompanies2022or2023(filename: string, year: number) {
  const rows = readSheet(filename);
  // Structure: row0=header, row1=col labels, row2=Grand Total, row3+=data
  // __EMPTY = company name, first year col = Jan, __EMPTY_1..__EMPTY_11 = Feb-Dec, Grand Total col = total
  const MONTHS_KEYS = ['__EMPTY_1','__EMPTY_2','__EMPTY_3','__EMPTY_4','__EMPTY_5','__EMPTY_6','__EMPTY_7','__EMPTY_8','__EMPTY_9','__EMPTY_10','__EMPTY_11'];
  const yearKey = Object.keys(rows[0]).find(k => k.trim() === String(year)) || String(year);
  const totalKey = Object.keys(rows[0]).find(k => k.trim() === 'Grand Total') || 'Grand Total';

  return rows.slice(3)
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const jan = Number(row[yearKey] || 0);
      const rest = MONTHS_KEYS.map(k => Number(row[k] || 0));
      const monthly = [jan, ...rest];
      let total = Number(row[totalKey] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { slug: slugify(name), name, monthly, total, year };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processCompanies2024(filename: string) {
  const rows = readSheet(filename);
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return rows
    .filter(row => {
      const name = String(row['Employer Name'] || '').trim();
      return name && name !== 'Grand Total';
    })
    .map(row => {
      const name = String(row['Employer Name'] || '').trim();
      const monthly = MONTHS.map(m => Number(row[m] || 0));
      let total = Number(row['Grand Total'] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { slug: slugify(name), name, monthly, total, year: 2024 };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processCompanies2025() {
  const rows = readSheet('permits-issued-to-companies-2025.xlsx');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return rows
    .filter(row => {
      const name = String(row['Employer Name'] || row['__EMPTY'] || '').trim();
      return name && name !== 'Employer Name' && name !== 'Grand Total';
    })
    .map(row => {
      const name = String(row['Employer Name'] || row['__EMPTY'] || '').trim();
      const monthly = months.map(m => Number(row[m] || 0));
      let total = Number(row['Grand Total'] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { slug: slugify(name), name, monthly, total, year: 2025 };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processCompanies2026() {
  const rows = readSheet('employment-permits-issued-to-companies-2026.xlsx');
  return rows
    .filter(row => {
      const name = String(Object.values(row)[0] || '').trim();
      return name && name !== 'Employer Name' && name !== 'Grand Total';
    })
    .map(row => {
      const keys = Object.keys(row);
      const name = String(row[keys[0]] || '').trim();
      const jan = Number(row[keys[1]] || 0);
      const feb = Number(row[keys[2]] || 0);
      let total = Number(row[keys[3]] || 0);
      if (!total) total = jan + feb;
      return { slug: slugify(name), name, monthly: [jan, feb], total, year: 2026 };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);
}

// ─── SECTORS ──────────────────────────────────────────────────────────────────

function processSectors2022or2023(filename: string, year: number) {
  const rows = readSheet(filename);
  const MONTHS_KEYS = ['__EMPTY_1','__EMPTY_2','__EMPTY_3','__EMPTY_4','__EMPTY_5','__EMPTY_6','__EMPTY_7','__EMPTY_8','__EMPTY_9','__EMPTY_10','__EMPTY_11'];
  const yearKey = Object.keys(rows[0]).find(k => k.trim() === String(year)) || String(year);
  const totalKey = Object.keys(rows[0]).find(k => k.trim() === 'Grand Total') || 'Grand Total';

  return rows.slice(3)
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const code = (name.match(/^([A-Z])\s*-/) || [])[1] || '';
      const jan = Number(row[yearKey] || 0);
      const rest = MONTHS_KEYS.map(k => Number(row[k] || 0));
      const monthly = [jan, ...rest];
      let total = Number(row[totalKey] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { name, slug: slugify(name), code, monthly, total, year };
    })
    .filter(s => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processSectors2024() {
  const rows = readSheet('permits-by-sector-2024.xlsx');
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return rows
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total' && name !== 'Economic Sector';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const code = (name.match(/^([A-Z])\s*-/) || [])[1] || '';
      const monthly = MONTHS.map(m => Number(row[m] || 0));
      let total = Number(row['__EMPTY_1'] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { name, slug: slugify(name), code, monthly, total, year: 2024 };
    })
    .filter(s => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processSectors2025() {
  const rows = readSheet('permits-by-sector-2025.xlsx');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return rows
    .filter(row => {
      const name = String(Object.values(row)[0] || '').trim();
      return name && name !== 'Grand Total' && !name.startsWith('Sector');
    })
    .map(row => {
      const keys = Object.keys(row);
      const name = String(row[keys[0]] || '').trim();
      const code = (name.match(/^([A-Z])\s*-/) || [])[1] || '';
      const monthly = months.map((_, i) => Number(row[keys[i + 1]] || 0));
      let total = Number(row[keys[13]] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { name, slug: slugify(name), code, monthly, total, year: 2025 };
    })
    .filter(s => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

function processSectors2026() {
  const rows = readSheet('employment-permits-by-sector-2026.xlsx');
  return rows
    .filter(row => {
      const name = String(Object.values(row)[0] || '').trim();
      return name && name !== 'Grand Total' && !name.startsWith('Sector');
    })
    .map(row => {
      const keys = Object.keys(row);
      const name = String(row[keys[0]] || '').trim();
      const code = (name.match(/^([A-Z])\s*-/) || [])[1] || '';
      const monthly = [Number(row[keys[1]] || 0), Number(row[keys[2]] || 0)];
      let total = Number(row[keys[3]] || 0);
      if (!total) total = monthly.reduce((a, b) => a + b, 0);
      return { name, slug: slugify(name), code, monthly, total, year: 2026 };
    })
    .filter(s => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

// ─── COUNTIES ─────────────────────────────────────────────────────────────────

function processCounties2022(filename: string) {
  const rows = readSheet(filename);
  // Structure: row0=header (Issued, __EMPTY=0, __EMPTY_1=Refused), rows 2+=data
  // 2022 col = issued, __EMPTY = county, __EMPTY_1 = refused
  return rows.slice(2)
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const issued = Number(row['2022'] || 0);
      const refused = Number(row['__EMPTY_1'] || 0);
      const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
      return { name, slug: slugify(name), issued, refused, approvalRate, year: 2022 };
    })
    .filter(c => c.issued > 0 || c.refused > 0)
    .sort((a, b) => b.issued - a.issued);
}

function processCounties2023(filename: string) {
  const rows = readSheet(filename);
  // __EMPTY = county, ' 2023 ' = issued, __EMPTY_1 = refused
  const issuedKey = Object.keys(rows[0]).find(k => k.trim() === '2023') || ' 2023 ';
  return rows
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total' && name !== 'No County Entered';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const issued = Number(row[issuedKey] || 0);
      const refused = Number(row['__EMPTY_1'] || 0);
      const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
      return { name, slug: slugify(name), issued, refused, approvalRate, year: 2023 };
    })
    .filter(c => c.issued > 0 || c.refused > 0)
    .sort((a, b) => b.issued - a.issued);
}

function processCounties2024() {
  const rows = readSheet('permits-by-county-2024.xlsx');
  return rows
    .filter(row => {
      const name = String(row['__EMPTY'] || '').trim();
      return name && name !== 'Grand Total' && name !== 'No County Entered';
    })
    .map(row => {
      const name = String(row['__EMPTY'] || '').trim();
      const issued = Number(row['Issued'] || 0);
      const refused = Number(row['Refused'] || 0);
      const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
      return { name, slug: slugify(name), issued, refused, approvalRate, year: 2024 };
    })
    .filter(c => c.issued > 0 || c.refused > 0)
    .sort((a, b) => b.issued - a.issued);
}

function processCounties2025() {
  const rows = readSheet('permits-by-county-2025.xlsx');
  return rows
    .filter(row => {
      const vals = Object.values(row).map(v => String(v).trim());
      return !vals.includes('Issued') && !vals.includes('Refused') && !vals.includes('Grand Total') && !vals.includes('County');
    })
    .map(row => {
      const keys = Object.keys(row);
      const vals = Object.values(row);
      let name = '';
      for (const v of vals) {
        const s = String(v).trim();
        if (s && isNaN(Number(s)) && s !== '0') { name = s; break; }
      }
      if (keys.length >= 3) {
        const k0 = row[keys[0]], k1 = row[keys[1]], k2 = row[keys[2]];
        if (typeof k1 === 'string' && isNaN(Number(k1))) {
          name = String(k1).trim();
          const issued = Number(k0) || 0;
          const refused = Number(k2) || 0;
          const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
          return { name, slug: slugify(name), issued, refused, approvalRate, year: 2025 };
        } else if (typeof k0 === 'string' && isNaN(Number(k0))) {
          name = String(k0).trim();
          const issued = Number(k1) || 0;
          const refused = Number(k2) || 0;
          const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
          return { name, slug: slugify(name), issued, refused, approvalRate, year: 2025 };
        }
      }
      return { name, slug: slugify(name), issued: 0, refused: 0, approvalRate: 0, year: 2025 };
    })
    .filter(c => c.name && (c.issued > 0 || c.refused > 0))
    .sort((a, b) => b.issued - a.issued);
}

function processCounties2026() {
  const rows = readSheet('employment-permits-by-county-2026.xlsx');
  return rows
    .filter(row => {
      const vals = Object.values(row).map(v => String(v).trim());
      return !vals.includes('Issued') && !vals.includes('Refused') && !vals.includes('Grand Total') && !vals.includes('County');
    })
    .map(row => {
      const keys = Object.keys(row);
      const k0 = row[keys[0]], k1 = row[keys[1]], k2 = row[keys[2]];
      let name = '', issued = 0, refused = 0;
      if (typeof k1 === 'string' && isNaN(Number(k1))) {
        name = String(k1).trim(); issued = Number(k0) || 0; refused = Number(k2) || 0;
      } else if (typeof k0 === 'string' && isNaN(Number(k0))) {
        name = String(k0).trim(); issued = Number(k1) || 0; refused = Number(k2) || 0;
      }
      const approvalRate = issued + refused > 0 ? Math.round((issued / (issued + refused)) * 10000) / 100 : 0;
      return { name, slug: slugify(name), issued, refused, approvalRate, year: 2026 };
    })
    .filter(c => c.name && (c.issued > 0 || c.refused > 0))
    .sort((a, b) => b.issued - a.issued);
}

// ─── YEARLY TOTALS ────────────────────────────────────────────────────────────

function buildYearlyTotals(
  allCompanies: { year: number; total: number }[][],
  allCounties: { year: number; issued: number; refused: number }[][],
) {
  const years = [2022, 2023, 2024, 2025, 2026];
  return years.map((year, i) => {
    const companies = allCompanies[i];
    const counties = allCounties[i];
    const totalPermits = companies.reduce((a, b) => a + b.total, 0);
    const totalIssued = counties.reduce((a, b) => a + b.issued, 0);
    const totalRefused = counties.reduce((a, b) => a + b.refused, 0);
    const approvalRate = totalIssued + totalRefused > 0
      ? Math.round((totalIssued / (totalIssued + totalRefused)) * 10000) / 100 : 0;
    return { year, totalPermits, totalIssued, totalRefused, approvalRate, totalCompanies: companies.length };
  });
}

function buildSummary(
  allCompanies: ReturnType<typeof processCompanies2025>[],
  allSectors: ReturnType<typeof processSectors2025>[],
  allCounties: ReturnType<typeof processCounties2025>[],
  yearlyTotals: ReturnType<typeof buildYearlyTotals>,
) {
  const companies2025 = allCompanies[3];
  const companies2026 = allCompanies[4];
  const sectors2025 = allSectors[3];
  const sectors2026 = allSectors[4];
  const counties2025 = allCounties[3];
  const counties2026 = allCounties[4];

  const totalPermits2025 = companies2025.reduce((a, b) => a + b.total, 0);
  const totalPermits2026 = companies2026.reduce((a, b) => a + b.total, 0);
  const totalRefused2025 = counties2025.reduce((a, b) => a + b.refused, 0);
  const totalRefused2026 = counties2026.reduce((a, b) => a + b.refused, 0);
  const totalIssued2025 = counties2025.reduce((a, b) => a + b.issued, 0);
  const totalIssued2026 = counties2026.reduce((a, b) => a + b.issued, 0);

  const monthlyTrend2025 = Array.from({ length: 12 }, (_, i) =>
    sectors2025.reduce((sum, s) => sum + (s.monthly[i] || 0), 0));
  const monthlyTrend2026 = [0, 1].map(i =>
    sectors2026.reduce((sum, s) => sum + (s.monthly[i] || 0), 0));

  return {
    totalPermits2025, totalPermits2026, totalRefused2025, totalRefused2026,
    totalCompanies2025: companies2025.length, totalCompanies2026: companies2026.length,
    approvalRate2025: totalIssued2025 + totalRefused2025 > 0
      ? Math.round((totalIssued2025 / (totalIssued2025 + totalRefused2025)) * 10000) / 100 : 0,
    approvalRate2026: totalIssued2026 + totalRefused2026 > 0
      ? Math.round((totalIssued2026 / (totalIssued2026 + totalRefused2026)) * 10000) / 100 : 0,
    topCompanies2025: companies2025.slice(0, 15).map(c => ({ name: c.name, total: c.total })),
    topCompanies2026: companies2026.slice(0, 15).map(c => ({ name: c.name, total: c.total })),
    topSectors2025: sectors2025.slice(0, 10).map(s => ({ name: s.name, total: s.total })),
    topSectors2026: sectors2026.slice(0, 10).map(s => ({ name: s.name, total: s.total })),
    topCounties2025: counties2025.slice(0, 10).map(c => ({ name: c.name, issued: c.issued })),
    topCounties2026: counties2026.slice(0, 10).map(c => ({ name: c.name, issued: c.issued })),
    monthlyTrend2025, monthlyTrend2026, yearlyTotals,
  };
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('Processing companies...');
const c2022 = processCompanies2022or2023('permits-issued-to-companies-2022.xlsx', 2022);
const c2023 = processCompanies2022or2023('permits-issued-to-companies-2023.xlsx', 2023);
const c2024 = processCompanies2024('permits-issued-to-companies-2024.xlsx');
const c2025 = processCompanies2025();
const c2026 = processCompanies2026();
console.log(`  2022: ${c2022.length} | 2023: ${c2023.length} | 2024: ${c2024.length} | 2025: ${c2025.length} | 2026: ${c2026.length}`);

console.log('Processing sectors...');
const s2022 = processSectors2022or2023('permits-by-sector-2022.xlsx', 2022);
const s2023 = processSectors2022or2023('permits-by-sector-2023.xlsx', 2023);
const s2024 = processSectors2024();
const s2025 = processSectors2025();
const s2026 = processSectors2026();
console.log(`  2022: ${s2022.length} | 2023: ${s2023.length} | 2024: ${s2024.length} | 2025: ${s2025.length} | 2026: ${s2026.length}`);

console.log('Processing counties...');
const co2022 = processCounties2022('permits-by-county-2022.xlsx');
const co2023 = processCounties2023('permits-by-county-2023.xlsx');
const co2024 = processCounties2024();
const co2025 = processCounties2025();
const co2026 = processCounties2026();
console.log(`  2022: ${co2022.length} | 2023: ${co2023.length} | 2024: ${co2024.length} | 2025: ${co2025.length} | 2026: ${co2026.length}`);

const yearlyTotals = buildYearlyTotals([c2022,c2023,c2024,c2025,c2026], [co2022,co2023,co2024,co2025,co2026]);
const summary = buildSummary([c2022,c2023,c2024,c2025,c2026], [s2022,s2023,s2024,s2025,s2026], [co2022,co2023,co2024,co2025,co2026], yearlyTotals);

const write = (name: string, data: unknown) => {
  fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 2));
  console.log(`  → ${name}`);
};

console.log('Writing JSON...');
write('companies-2022.json', c2022); write('companies-2023.json', c2023);
write('companies-2024.json', c2024); write('companies-2025.json', c2025);
write('companies-2026.json', c2026);
write('sectors-2022.json', s2022); write('sectors-2023.json', s2023);
write('sectors-2024.json', s2024); write('sectors-2025.json', s2025);
write('sectors-2026.json', s2026);
write('counties-2022.json', co2022); write('counties-2023.json', co2023);
write('counties-2024.json', co2024); write('counties-2025.json', co2025);
write('counties-2026.json', co2026);
write('summary.json', summary);
console.log('Done!');
