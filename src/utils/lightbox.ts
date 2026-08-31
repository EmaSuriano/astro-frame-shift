/** Build a larger Unsplash (or compatible) URL for the PhotoSwipe lightbox. */
export function lightboxSrc(src: string, width = 1600): string {
  try {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    if (!url.searchParams.has('q')) url.searchParams.set('q', '80');
    if (!url.searchParams.has('auto')) url.searchParams.set('auto', 'format');
    return url.toString();
  } catch {
    return src;
  }
}
