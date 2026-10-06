export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-IE');
}

export function shortenName(name: string, maxLen = 30): string {
  if (name.length <= maxLen) return name;
  return name.slice(0, maxLen - 1) + '\u2026';
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const INTL_LOCALE: Record<string, string> = { tl: 'fil' };

/** Full month name (0-based index) in the UI language, e.g. 2 + 'pt' → "março". */
export function localMonthName(index: number, lang: string): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang] ?? lang, { month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(2025, index, 1)));
}

/** Replaces {key} placeholders in a translated sentence. */
export function fillTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

/** "+12%" / "-5%" */
export function signedPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${n}%`;
}

export function monthRangeLabel(count: number): string {
  if (count <= 0) return '';
  if (count === 1) return MONTHS[0];
  return `${MONTHS[0]}–${MONTHS[count - 1]}`;
}
