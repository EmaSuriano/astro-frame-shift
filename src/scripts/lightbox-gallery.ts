import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const LIGHTBOX_WIDTH = 1600;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fillDimensions(root: ParentNode = document): void {
  root.querySelectorAll<HTMLAnchorElement>('a.pswp-item').forEach((anchor) => {
    const img = anchor.querySelector('img');
    if (!img) return;

    const apply = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const height = Math.max(
        1,
        Math.round((img.naturalHeight / img.naturalWidth) * LIGHTBOX_WIDTH),
      );
      anchor.setAttribute('data-pswp-width', String(LIGHTBOX_WIDTH));
      anchor.setAttribute('data-pswp-height', String(height));
    };

    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply, { once: true });
  });
}

function captionHtml(el: HTMLElement | undefined): string {
  if (!el) return '';
  const title = el.dataset.captionTitle ?? '';
  const categories = el.dataset.captionCategories ?? '';
  const detailUrl = el.dataset.detailUrl ?? '';
  const parts: string[] = [];
  if (title) {
    parts.push(
      `<strong class="pswp-caption-title">${escapeHtml(title)}</strong>`,
    );
  }
  if (categories) {
    parts.push(
      `<span class="pswp-caption-cats">${escapeHtml(categories)}</span>`,
    );
  }
  if (detailUrl) {
    parts.push(
      `<a class="pswp-caption-link" href="${escapeHtml(detailUrl)}">View details</a>`,
    );
  }
  return parts.join('');
}

function bindCaption(lightbox: PhotoSwipeLightbox): void {
  lightbox.on('uiRegister', () => {
    lightbox.pswp?.ui.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
      onInit: (el) => {
        lightbox.pswp?.on('change', () => {
          const slideEl = lightbox.pswp?.currSlide?.data.element as
            | HTMLElement
            | undefined;
          el.innerHTML = captionHtml(slideEl);
        });
      },
    });
  });
}

let instances: PhotoSwipeLightbox[] = [];

function destroyLightboxes(): void {
  instances.forEach((instance) => {
    instance.pswp?.close();
    instance.destroy();
  });
  instances = [];
}

function createLightbox(gallery: string, children: string): void {
  if (!document.querySelector(gallery)) return;

  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children,
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.92,
    padding: { top: 24, bottom: 88, left: 16, right: 16 },
  });

  lightbox.addFilter('domItemData', (itemData, _element, linkEl) => {
    const img = linkEl?.querySelector('img');
    if (img && img.naturalWidth && img.naturalHeight) {
      itemData.width = LIGHTBOX_WIDTH;
      itemData.height = Math.max(
        1,
        Math.round((img.naturalHeight / img.naturalWidth) * LIGHTBOX_WIDTH),
      );
    }
    return itemData;
  });

  bindCaption(lightbox);
  lightbox.init();
  instances.push(lightbox);
}

export function setupPhotoSwipe(): void {
  destroyLightboxes();
  fillDimensions();
  createLightbox(
    '#gallery-grid',
    '.masonry-item:not(.is-filtered-out) a.pswp-item',
  );
  createLightbox('#detail-gallery', 'a.pswp-item');
}

setupPhotoSwipe();
document.addEventListener('astro:after-swap', setupPhotoSwipe);
document.addEventListener('astro:before-swap', destroyLightboxes);
document.addEventListener('gallery:filters-changed', setupPhotoSwipe);
