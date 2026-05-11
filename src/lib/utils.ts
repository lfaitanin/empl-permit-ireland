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

export function monthRangeLabel(count: number): string {
  if (count <= 0) return '';
  if (count === 1) return MONTHS[0];
  return `${MONTHS[0]}–${MONTHS[count - 1]}`;
}
