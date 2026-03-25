import type { CourseRecommendation } from '../types';

export const sectorCourses: CourseRecommendation[] = [
  {
    sector: 'A - Agriculture, Forestry & Fishing',
    technicalCourses: [
      { name: 'Agriculture - QQI Level 5', provider: 'Teagasc / ETBs', duration: '1 year', free: true },
      { name: 'Horticulture Skills', provider: 'SOLAS / ETBs', duration: '6 months', free: true },
      { name: 'Farm Management', provider: 'Teagasc', duration: '2 years', free: false },
    ],
    universityPrograms: [
      { name: 'BSc Agricultural Science', university: 'UCD', level: 'Bachelor' },
      { name: 'BSc Agriculture', university: 'SETU Waterford', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'Safe Pass', body: 'SOLAS' },
      { name: 'Pesticide Application (PA1/PA6)', body: 'DAFM' },
    ],
  },
  {
    sector: 'Q - Health & Social Work Activities',
    technicalCourses: [
      { name: 'Healthcare Support - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Nursing Studies - QQI Level 5', provider: 'ETBs / Springboard+', duration: '1 year', free: true },
      { name: 'Phlebotomy Training', provider: 'Various', duration: '2 days', free: false },
    ],
    universityPrograms: [
      { name: 'BSc Nursing', university: 'UCD / TCD / UCC / UL', level: 'Bachelor' },
      { name: 'MSc Advanced Healthcare Practice', university: 'TCD', level: 'Master' },
      { name: 'HDip in Midwifery', university: 'TCD / UCC', level: 'Higher Diploma' },
    ],
    certifications: [
      { name: 'NMBI Registration', body: 'Nursing & Midwifery Board of Ireland' },
      { name: 'CORU Registration', body: 'Health & Social Care Professionals Council' },
      { name: 'Manual Handling Instructor', body: 'QQI' },
    ],
  },
  {
    sector: 'J - Information & Communication Activities',
    technicalCourses: [
      { name: 'Software Development - Springboard+', provider: 'Springboard+', duration: '1 year', free: true },
      { name: 'Data Analytics - QQI Level 8', provider: 'Springboard+ / Various', duration: '1 year', free: true },
      { name: 'Cybersecurity Fundamentals', provider: 'Springboard+ / SOLAS', duration: '6 months', free: true },
      { name: 'Cloud Computing (AWS/Azure)', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'MSc Computer Science', university: 'TCD / UCD / DCU', level: 'Master' },
      { name: 'HDip in Data Analytics', university: 'TU Dublin / UCD', level: 'Higher Diploma' },
      { name: 'BSc in Computing', university: 'TU Dublin / ATU', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'AWS Solutions Architect', body: 'Amazon Web Services' },
      { name: 'CompTIA A+ / Network+ / Security+', body: 'CompTIA' },
      { name: 'Microsoft Azure Fundamentals (AZ-900)', body: 'Microsoft' },
      { name: 'Google Cloud Professional', body: 'Google' },
    ],
  },
  {
    sector: 'K - Financial & Insurance Activities',
    technicalCourses: [
      { name: 'Accounting Technician', provider: 'Accounting Technicians Ireland', duration: '2 years', free: false },
      { name: 'Financial Services - QQI Level 6', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'FinTech Certificate', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'MSc Finance', university: 'UCD / TCD / UL', level: 'Master' },
      { name: 'BSc Accounting & Finance', university: 'DCU / UL', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'ACCA (Chartered Certified Accountant)', body: 'ACCA' },
      { name: 'CFA (Chartered Financial Analyst)', body: 'CFA Institute' },
      { name: 'QFA (Qualified Financial Adviser)', body: 'IOB' },
    ],
  },
  {
    sector: 'I - Accommodation & Food Services Activities',
    technicalCourses: [
      { name: 'Culinary Arts - QQI Level 5/6', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Hospitality Management - QQI Level 6', provider: 'ETBs / Springboard+', duration: '1 year', free: true },
      { name: 'Barista / Food Safety Training', provider: 'Various', duration: '1-2 days', free: false },
    ],
    universityPrograms: [
      { name: 'BA Culinary Arts', university: 'TU Dublin / MTU', level: 'Bachelor' },
      { name: 'BSc Hospitality Management', university: 'TU Dublin / ATU', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'HACCP Food Safety', body: 'FSAI' },
      { name: 'Wine & Spirit Education Trust (WSET)', body: 'WSET' },
    ],
  },
  {
    sector: 'C - All Other Manufacturing',
    technicalCourses: [
      { name: 'Manufacturing Technology - QQI Level 5', provider: 'ETBs / SOLAS', duration: '1 year', free: true },
      { name: 'Lean Six Sigma Green Belt', provider: 'Various / Springboard+', duration: '3-6 months', free: false },
      { name: 'CNC Machining', provider: 'SOLAS / ETBs', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'BEng Manufacturing Engineering', university: 'TU Dublin / UL', level: 'Bachelor' },
      { name: 'MSc Operations & Supply Chain', university: 'UCD / UL', level: 'Master' },
    ],
    certifications: [
      { name: 'Lean Six Sigma Black Belt', body: 'ASQ' },
      { name: 'Safe Pass', body: 'SOLAS' },
    ],
  },
  {
    sector: 'C - Manufacture of Food, Drink & Tobacco',
    technicalCourses: [
      { name: 'Food Science & Technology - QQI Level 6', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Meat Processing Skills', provider: 'SOLAS', duration: '6 months', free: true },
      { name: 'Brewing & Distilling', provider: 'Various', duration: '6 months', free: false },
    ],
    universityPrograms: [
      { name: 'BSc Food Science', university: 'UCC / UCD', level: 'Bachelor' },
      { name: 'MSc Food Engineering', university: 'UCC', level: 'Master' },
    ],
    certifications: [
      { name: 'HACCP Food Safety', body: 'FSAI' },
      { name: 'ISO 22000 Auditor', body: 'Various' },
    ],
  },
  {
    sector: 'C - Manufacture of Chemicals & Pharmaceuticals',
    technicalCourses: [
      { name: 'Pharmaceutical Manufacturing - QQI Level 6', provider: 'Springboard+ / ETBs', duration: '1 year', free: true },
      { name: 'Bioprocessing & Biopharma', provider: 'Springboard+', duration: '1 year', free: true },
      { name: 'Good Manufacturing Practice (GMP)', provider: 'Various', duration: '2 days', free: false },
    ],
    universityPrograms: [
      { name: 'BSc Pharmaceutical Science', university: 'UCC / RCSI', level: 'Bachelor' },
      { name: 'MSc Biopharmaceutical Engineering', university: 'TU Dublin / SETU', level: 'Master' },
    ],
    certifications: [
      { name: 'GMP Certification', body: 'ISPE' },
      { name: 'Lean Six Sigma Green Belt', body: 'ASQ' },
    ],
  },
  {
    sector: 'C - Manufacture of Medical Devices',
    technicalCourses: [
      { name: 'Medical Device Manufacturing - QQI Level 6', provider: 'Springboard+ / ATU', duration: '1 year', free: true },
      { name: 'Quality Assurance in Medical Devices', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'BEng Biomedical Engineering', university: 'NUI Galway / UL', level: 'Bachelor' },
      { name: 'MSc Medical Device Design', university: 'NUI Galway', level: 'Master' },
    ],
    certifications: [
      { name: 'ISO 13485 Auditor', body: 'Various' },
      { name: 'Regulatory Affairs (RA) Certification', body: 'RAPS' },
    ],
  },
  {
    sector: 'C - Manufacture of Computers, Electronics & Optical Equipment',
    technicalCourses: [
      { name: 'Electronics & Automation - QQI Level 6', provider: 'ETBs / SOLAS', duration: '1 year', free: true },
      { name: 'PCB Design & Assembly', provider: 'Various', duration: '3 months', free: false },
    ],
    universityPrograms: [
      { name: 'BEng Electronic Engineering', university: 'UCD / TU Dublin / UL', level: 'Bachelor' },
      { name: 'MSc Microelectronics', university: 'UCC / UL', level: 'Master' },
    ],
    certifications: [
      { name: 'IPC-A-610 Electronics Assembly', body: 'IPC' },
      { name: 'CompTIA A+', body: 'CompTIA' },
    ],
  },
  {
    sector: 'F - Construction',
    technicalCourses: [
      { name: 'Carpentry & Joinery Apprenticeship', provider: 'SOLAS', duration: '4 years', free: true },
      { name: 'Electrical Apprenticeship', provider: 'SOLAS', duration: '4 years', free: true },
      { name: 'Plumbing Apprenticeship', provider: 'SOLAS', duration: '4 years', free: true },
      { name: 'Construction Skills - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Construction Management', university: 'TU Dublin / ATU', level: 'Bachelor' },
      { name: 'BEng Civil Engineering', university: 'TCD / UCD / UCC', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'Safe Pass', body: 'SOLAS' },
      { name: 'CSCS (Construction Skills Certification Scheme)', body: 'SOLAS' },
      { name: 'Manual Handling', body: 'QQI' },
    ],
  },
  {
    sector: 'G - Wholesale & Retail Trade',
    technicalCourses: [
      { name: 'Retail Skills - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Supply Chain & Logistics', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Business Studies', university: 'DCU / UL / TU Dublin', level: 'Bachelor' },
      { name: 'MSc Supply Chain Management', university: 'UCD / DBS', level: 'Master' },
    ],
    certifications: [
      { name: 'CILT (Chartered Institute of Logistics)', body: 'CILT' },
    ],
  },
  {
    sector: 'H - Transport & Storage',
    technicalCourses: [
      { name: 'Logistics & Distribution - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Forklift / Warehouse Operations', provider: 'SOLAS', duration: '1-2 weeks', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Logistics & Supply Chain', university: 'TU Dublin / DBS', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'CPC (Certificate of Professional Competence)', body: 'RSA' },
      { name: 'ADR (Dangerous Goods by Road)', body: 'RSA' },
    ],
  },
  {
    sector: 'M - All other Professional, Scientific & Technical Activities',
    technicalCourses: [
      { name: 'Laboratory Techniques - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Project Management', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'MSc Project Management', university: 'TCD / UCD', level: 'Master' },
      { name: 'BSc Applied Science', university: 'Various', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'PMP (Project Management Professional)', body: 'PMI' },
      { name: 'PRINCE2 Practitioner', body: 'AXELOS' },
    ],
  },
  {
    sector: 'M - Professional, Scientific & Technical Activities of Head Offices, Management Consultancy Services',
    technicalCourses: [
      { name: 'Business Management - QQI Level 6', provider: 'ETBs / Springboard+', duration: '1 year', free: true },
      { name: 'Digital Marketing', provider: 'Springboard+', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'MBA', university: 'TCD / UCD / Smurfit / DCU', level: 'Master' },
      { name: 'MSc Management Consultancy', university: 'UCD / DBS', level: 'Master' },
    ],
    certifications: [
      { name: 'CMC (Certified Management Consultant)', body: 'IMCA' },
      { name: 'PMP', body: 'PMI' },
    ],
  },
  {
    sector: 'N - Administrative & Support Service Activities',
    technicalCourses: [
      { name: 'Office Administration - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Payroll & Bookkeeping', provider: 'ETBs / IPASS', duration: '6 months', free: false },
    ],
    universityPrograms: [
      { name: 'BSc Business Administration', university: 'TU Dublin / DCU', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'IPASS Payroll Certification', body: 'IPASS' },
      { name: 'ECDL (European Computer Driving Licence)', body: 'ICS' },
    ],
  },
  {
    sector: 'P - Education',
    technicalCourses: [
      { name: 'Teaching English as a Foreign Language (TEFL)', provider: 'Various', duration: '120 hours', free: false },
      { name: 'Special Needs Assistant - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'Professional Master of Education (PME)', university: 'TCD / UCD / DCU / UL', level: 'Master' },
      { name: 'BA in Education', university: 'DCU / MIE / Maynooth', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'Teaching Council Registration', body: 'Teaching Council of Ireland' },
      { name: 'CELTA', body: 'Cambridge Assessment' },
    ],
  },
  {
    sector: 'L - Real Estate Activities',
    technicalCourses: [
      { name: 'Property Services - QQI Level 6', provider: 'ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Property Economics', university: 'TU Dublin', level: 'Bachelor' },
      { name: 'MSc Real Estate', university: 'TU Dublin / UCD', level: 'Master' },
    ],
    certifications: [
      { name: 'PSRA Licence', body: 'Property Services Regulatory Authority' },
      { name: 'SCSI Membership', body: 'Society of Chartered Surveyors Ireland' },
    ],
  },
  {
    sector: 'R - Arts, Entertainment and Recreation',
    technicalCourses: [
      { name: 'Media Production - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Graphic Design', provider: 'Springboard+ / ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'BA Film & Broadcasting', university: 'IADT / TU Dublin', level: 'Bachelor' },
      { name: 'BA Fine Art', university: 'NCAD / Crawford (MTU)', level: 'Bachelor' },
    ],
    certifications: [],
  },
  {
    sector: 'S - Other Service Activities',
    technicalCourses: [
      { name: 'Beauty Therapy - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Hairdressing Apprenticeship', provider: 'SOLAS', duration: '3 years', free: true },
    ],
    universityPrograms: [],
    certifications: [
      { name: 'ITEC Diploma', body: 'ITEC' },
    ],
  },
  {
    sector: 'D - Electricity & Gas & Air Conditioning Supply',
    technicalCourses: [
      { name: 'Electrical Apprenticeship', provider: 'SOLAS', duration: '4 years', free: true },
      { name: 'Renewable Energy - QQI Level 6', provider: 'Springboard+ / ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'BEng Electrical Engineering', university: 'UCD / TU Dublin / UL', level: 'Bachelor' },
      { name: 'MSc Sustainable Energy', university: 'UCC / UCD', level: 'Master' },
    ],
    certifications: [
      { name: 'RECI (Registered Electrical Contractor)', body: 'RECI' },
      { name: 'Safe Electric', body: 'CRU' },
    ],
  },
  {
    sector: 'E - Water Supply - Sewerage Waste Management & Remedial Activities',
    technicalCourses: [
      { name: 'Environmental Science - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Water & Wastewater Treatment', provider: 'SOLAS / ETBs', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Environmental Science', university: 'UCD / TCD / UCC', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'EPA Licensed Operator', body: 'EPA' },
    ],
  },
  {
    sector: 'O - Public Administration & Defence',
    technicalCourses: [
      { name: 'Public Administration - QQI Level 6', provider: 'ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'MA Public Policy', university: 'UCD / TCD', level: 'Master' },
    ],
    certifications: [],
  },
  {
    sector: 'B - Mining & Quarrying',
    technicalCourses: [
      { name: 'Quarrying Skills', provider: 'SOLAS', duration: '6 months', free: true },
    ],
    universityPrograms: [
      { name: 'BSc Geology', university: 'TCD / UCD', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'Safe Pass', body: 'SOLAS' },
      { name: 'CSCS Quarry Skills', body: 'SOLAS' },
    ],
  },
  {
    sector: 'T - Domestic - Activities of Households as Employers',
    technicalCourses: [
      { name: 'Childcare - QQI Level 5/6', provider: 'ETBs', duration: '1 year', free: true },
      { name: 'Healthcare Support - QQI Level 5', provider: 'ETBs', duration: '1 year', free: true },
    ],
    universityPrograms: [
      { name: 'BA Early Childhood Education', university: 'Various', level: 'Bachelor' },
    ],
    certifications: [
      { name: 'Garda Vetting', body: 'National Vetting Bureau' },
      { name: 'First Aid Responder', body: 'PHECC' },
    ],
  },
];

export function getCoursesForSector(sectorName: string): CourseRecommendation | undefined {
  return sectorCourses.find((c) => sectorName.includes(c.sector) || c.sector.includes(sectorName));
}
