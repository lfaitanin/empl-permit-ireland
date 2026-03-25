export const googleJobsUrl = (company: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(company + ' jobs Ireland')}`;

export const linkedInUrl = (company: string) =>
  `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(company)}&location=Ireland`;

export const indeedUrl = (company: string) =>
  `https://ie.indeed.com/jobs?q=${encodeURIComponent(company)}&l=Ireland`;

export const careersPageUrl = (company: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(company + ' careers Ireland')}`;

export const irishJobsUrl = (company: string) =>
  `https://www.irishjobs.ie/ShowResults.aspx?Keywords=${encodeURIComponent(company)}`;
