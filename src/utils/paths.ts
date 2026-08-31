/** BASE_URL with a trailing slash (`/astro-frame-shift/` in production). */
export function baseUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
}

export function categoryUrl(slug: string): string {
  return `${baseUrl()}category/${slug}/`;
}

export function imageUrl(id: string): string {
  return `${baseUrl()}image/${id}`;
}
