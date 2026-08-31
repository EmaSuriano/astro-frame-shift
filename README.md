# Astro Frame Shift - Minimalist Photo Gallery

A clean, minimalist photo gallery built with Astro featuring smooth transitions, dark/light theme support, and responsive masonry layout.

This theme is **Astro 7 ready**.

![Demo](https://github.com/user-attachments/assets/722dc92e-151a-454b-be75-90974536c7f5)

## ✨ Features

- **Minimalist Design**: Clean, borderless interface with no shadows or visual clutter
- **Dark/Light Theme**: Persistent theme switching with smooth transitions
- **Responsive Masonry Layout**: CSS-based masonry layout that adapts to all screen sizes
- **PhotoSwipe Lightbox**: Clicking a thumbnail opens [PhotoSwipe](https://photoswipe.com/) for zoom, swipe, and keyboard navigation. Captions include the title, categories, and a link to the existing detail page (`image/{id}`).
- **Static Category Routes**: Tags are real pages (`/` and `/category/{slug}/`) so view transitions can morph images. Client-side `display: none` filters broke `transition:name`.
- **Image Validation**: Build-time TypeScript script to verify all image URLs are working
- **Smooth Transitions**: Astro View Transitions for seamless navigation between pages
- **Hover Effects**: Image information appears only on hover for maximum minimalism
- **Performance Optimized**: Static site generation with optimized images using Astro's Image component

## 🎨 Design Philosophy

This gallery embraces ultra-minimalism:

- No borders or shadows
- Clean typography with Inter and JetBrains Mono fonts
- Information only appears on hover
- Stone/slate color palette for subtle elegance
- Generous white space and clean layouts

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── GalleryThumb.astro         # Thumbnail that opens PhotoSwipe
│   │   ├── ImageGallery.astro         # Shared grid + category chip links
│   │   └── ThemeToggle.astro          # Dark/light theme toggle
│   ├── content.config.ts              # Content collection schema
│   ├── data/
│   │   └── gallery.json               # 60+ curated images with metadata
│   ├── layouts/
│   │   └── Layout.astro               # Main layout with theme persistence
│   ├── pages/
│   │   ├── index.astro                # Gallery grid (all images)
│   │   ├── category/
│   │   │   └── [category].astro       # One static page per category tag
│   │   └── image/
│   │       └── [title].astro          # Individual image detail page
│   ├── scripts/
│   │   └── photoswipe-gallery.ts      # PhotoSwipe lightbox (rebinds after view transitions)
│   └── styles/
│       └── global.css                 # Global styles
├── scripts/
│   └── check-images.ts                # Image URL validation script
└── package.json
```

## 🖼️ Gallery Features

- **60+ Images**: Diverse collection spanning multiple categories
- **Category Organization**: Architecture, Nature, Street, Portraits, and more — each tag is its own static route so filtering keeps view transitions working
- **Photographer Attribution**: Credit with optional links to photographer profiles
- **Related Images**: Images can have multiple categories; related images are ranked by tag overlap
- **Responsive Images**: Optimized loading with Astro's Image component
- **Lightbox**: PhotoSwipe v5 on the grid and detail pages. The primary click opens the lightbox instead of navigating away. Detail pages remain available from the caption (and direct URLs). PhotoSwipe on a category page only includes that page's images.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`         | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn check-images`    | Validate all gallery image URLs                  |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## 🗂️ Category routes and lightbox

Category tags are **real static pages**, not query parameters or client-side hide/show. This site is SSG on GitHub Pages, and hiding masonry items with `display: none` broke `transition:name` morphs between the gallery and detail views.

| Route | Content |
| :---- | :------ |
| `/` | All images |
| `/category/{slug}/` | Images whose `categories` include that tag |
| `/image/{id}` | Detail page (large image also opens PhotoSwipe) |

Filter chips are links: **All** goes to the gallery root (`BASE_URL`), each tag goes to `BASE_URL/category/{slug}/`, and the current page gets `is-active`.

## 🛠️ Development

### Adding New Images

Edit `src/data/gallery.json` to add new images:

```json
{
  "src": "https://example.com/image.jpg",
  "alt": "Image description",
  "title": "Image Title",
  "description": "Detailed description of the image",
  "categories": ["Primary Tag", "Secondary Tag"],
  "date": "2024-01-01",
  "photographer": "Photographer Name",
  "photographerLink": "https://photographer-website.com"
}
```

### Image Validation

The project includes automatic image URL validation:

- Run `yarn check-images` to verify all URLs are accessible
- Validation runs automatically during build process
- Failed URLs are reported for manual review

### Theme Customization

The project uses Tailwind CSS with a stone/slate color palette:

- Light mode: Stone colors (warm, neutral)
- Dark mode: Slate colors (cool blue-gray undertones)
- Easy to customize in `tailwind.config.mjs`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile viewing
- **Masonry Layout**: 1-4 columns based on screen size
- **Touch Friendly**: Proper hover states and touch interactions
- **Performance**: Lazy loading and optimized images

## 🎯 Performance Features

- **Static Site Generation**: Pre-rendered for maximum speed
- **Image Optimization**: Automatic WebP conversion and responsive sizes
- **View Transitions**: Smooth navigation without full page reloads
- **Minimal JavaScript**: Theme persistence and PhotoSwipe lightbox
- **CSS-Based Masonry**: No JavaScript dependencies for layout
