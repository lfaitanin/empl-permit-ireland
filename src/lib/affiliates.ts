// Affiliate / referral links shown in the "Moving to Ireland" resources block.
// Paste your personal referral or affiliate URL into `url`. Entries with an
// empty url are hidden, and the whole block stays hidden until at least one is set.

export type AffiliateCategory = 'banking' | 'courses';

export interface AffiliateLink {
  name: string;
  category: AffiliateCategory;
  url: string;
}

export const AFFILIATE_LINKS: AffiliateLink[] = [
  { name: 'Wise', category: 'banking', url: '' },
  { name: 'Revolut', category: 'banking', url: '' },
  { name: 'Coursera', category: 'courses', url: '' },
  { name: 'Udemy', category: 'courses', url: '' },
];
