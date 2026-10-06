// Collects the page's SEO tags while prerendering (there is no document on the
// server), so scripts/prerender.ts can write them into the static <head>.

export interface SeoTags {
  title: string;
  description: string;
  url: string;
}

let current: SeoTags | undefined;

export function recordSeoTags(tags: SeoTags) {
  current = tags;
}

/** Returns the tags recorded by the last render and clears them. */
export function takeSeoTags(): SeoTags | undefined {
  const tags = current;
  current = undefined;
  return tags;
}
