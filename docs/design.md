# Design Document

**Project:** SHARVESH TOURS & TRAVELS
**Scope:** UI/UX, visual language, component library, and design tokens

---

## 1. Design Principles

1. **Clarity first** — user always knows where they are and what to do next.
2. **Travel-forward imagery** — big, high-quality photos sell the destination.
3. **Consistent rhythm** — same spacing scale, radii, and shadows everywhere.
4. **Accessible by default** — contrast, focus states, semantic HTML.
5. **Mobile-first responsive** — designed for small screens, enhanced upward.
6. **Calm colour palette** — sky/blue primary, amber accents for ratings.
7. **Fast feedback** — loading spinners, toasts, skeletons where needed.

---

## 2. Design Tokens

### 2.1 Colours

| Token | Value | Usage |
|---|---|---|
| `primary` | `#0ea5e9` (sky-500) | CTAs, links, active nav |
| `primary-dark` | `#0369a1` (sky-700) | Hover, gradients |
| `primary-light` | `#7dd3fc` (sky-300) | Badges, highlights |
| `accent` | `#f59e0b` (amber-500) | Ratings, highlights |
| `accent-dark` | `#b45309` (amber-700) | Rating text |
| Success | `#16a34a` | Confirmed, active |
| Warning | `#ca8a04` | Pending |
| Danger | `#dc2626` | Cancelled, delete |
| Neutral-50 | `#f9fafb` | Page background sections |
| Neutral-100 | `#f3f4f6` | Card borders |
| Neutral-500 | `#6b7280` | Secondary text |
| Neutral-700 | `#374151` | Body text |
| Neutral-900 | `#111827` | Headings |

### 2.2 Typography

- Font family: **Inter** (system fallback: `system-ui, sans-serif`).
- Base size: `16px`; line height: `1.6`.
- Scale:

| Token | Size | Weight | Usage |
|---|---|---|---|
| `text-5xl` | 48px | 700 | Hero heading (desktop) |
| `text-4xl` | 36px | 700 | Page title |
| `text-3xl` | 30px | 700 | Section title |
| `text-2xl` | 24px | 700 | Card title |
| `text-xl` | 20px | 600 | Sub-heading |
| `text-base` | 16px | 400 | Body |
| `text-sm` | 14px | 400 | Secondary |
| `text-xs` | 12px | 500 | Badges, captions |

### 2.3 Spacing scale

Tailwind's default 4px scale. Standard values: `1, 2, 3, 4, 5, 6, 8, 10, 12, 16`.

Page container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### 2.4 Radii

| Element | Radius |
|---|---|
| Buttons, inputs | `rounded-lg` (8px) |
| Cards, images | `rounded-xl` / `rounded-2xl` |
| Badges, chips | `rounded-full` |

### 2.5 Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-card` | `0 2px 8px rgba(0,0,0,0.06)` | Cards |
| `shadow-lg` | Tailwind default | Modals, hero search |
| None | — | Buttons and inputs (flat) |

---

## 3. Component Library

All component classes live in `src/index.css` under `@layer components`.

### 3.1 `.btn-primary`

bg-primary hover:bg-primary-dark text-white
px-5 py-2.5 rounded-lg font-medium
disabled:opacity-60 disabled:cursor-not-allowed

text

### 3.2 `.btn-outline`
border border-gray-300 hover:border-primary hover:text-primary
px-5 py-2.5 rounded-lg

text

### 3.3 `.btn-danger`
bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg

text

### 3.4 `.card`
bg-white rounded-xl shadow-card border border-gray-100

text

### 3.5 `.input`
w-full border border-gray-300 rounded-lg px-3 py-2
focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
disabled:bg-gray-100

text

### 3.6 `.label`
block text-sm font-medium text-gray-700 mb-1

text

### 3.7 `.badge`
inline-block text-xs font-medium bg-amber-100 text-amber-800
px-2 py-1 rounded-full

text

### 3.8 `.error`
text-sm text-red-500 mt-1

text

---

## 4. Layout Patterns

### 4.1 Public shell
Navbar (sticky, backdrop-blur)
├── Logo | Nav links | Auth buttons / avatar
Main content
Footer (dark, 4-column, responsive)

text

### 4.2 Admin shell
Navbar (same as public)
├── Sidebar (sticky) — Dashboard, Users, Destinations, Packages, Bookings, Reviews
└── Content area (right, responsive)

text

### 4.3 Grid patterns

| Context | Columns |
|---|---|
| Destination cards | 1 / 2 / 3 (sm / lg) |
| Package cards | 1 / 2 / 3 (sm / xl) |
| Why Choose Us | 2 / 4 (base / md) |
| Admin stats | 2 / 3 / 5 (base / md / xl) |

### 4.4 Breakpoints

| Breakpoint | Width |
|---|---|
| `sm` | ≥ 640px |
| `md` | ≥ 768px |
| `lg` | ≥ 1024px |
| `xl` | ≥ 1280px |

---

## 5. Screen Specifications

### 5.1 Home
- **Hero** — full-bleed image with 50% overlay, centered H1 + tagline,
  search form, two CTAs. Height 520px desktop / auto on mobile.
- **Popular Destinations** — 3-column grid, 6 cards.
- **Featured Packages** — grey-50 background section, 3-column grid.
- **Why Choose Us** — 4 feature cards with emoji icons.
- **Testimonials** — 3 review cards, star rating + comment.
- **Footer** — company, quick links, popular destinations, contact.

### 5.2 Destinations listing
- SearchBar (2/3 width) + Sort select (1/3 width).
- Cards grid: 1/2/3 columns.
- Pagination at bottom (only if > 1 page).
- Empty state: 🌍 icon + "No destinations found".

### 5.3 Destination details
- Hero image with name overlay.
- Left column: About, Popular Activities, Available Packages, Reviews.
- Right column (sticky): Estimated cost card + CTA.

### 5.4 Packages listing
- Left sidebar (sticky on desktop, full-width mobile): filters.
- Right main area: sort + grid of package cards + pagination.

### 5.5 Package details
- Hero with name, destination, rating, duration, traveller count.
- Left: Overview, Inclusions, Exclusions, Day-wise Itinerary, Terms,
  Reviews.
- Right (sticky): price card with "Book Now" and "View Destination".

### 5.6 Booking form
- Two-column top: Travel Date + Number of Travellers.
- One card per traveller with 6 fields in 2-column grid.
- Sticky summary row: total + Confirm Booking.
### 5.7 Booking confirmation
- Centered card: green check, "Booking Confirmed!"
- Booking reference highlight box.
- Summary list (package, destination, date, travellers, amount, status).
- Actions: Go to Dashboard, View Booking, Print.

### 5.8 Dashboard
- Greeting + subtitle.
- Tabs: My Bookings | Profile.
- Bookings: cards with status badge, key facts, cancel button when eligible.
- Profile: editable name + phone, read-only email.

### 5.9 Admin pages
- Sidebar layout with emoji icons per section.
- Dashboard: gradient revenue card + 10 stat tiles.
- Tables: sticky header, hover row, action buttons right-aligned.
- Modals: centered, max-w-2xl/3xl, ESC-dismissible, click-outside-close.

---

## 6. Interactions & Motion

- Hover: card image scales `1 → 1.05` (500ms ease).
- Buttons: color transition `150ms ease`.
- Nav: active link uses primary background.
- Toasts: top-right, 3s duration, slide-in.
- Modals: fade-in backdrop + scale-in panel (implicit via browser).

No animations longer than 500ms. No parallax in v1.

---

## 7. Empty, Loading, Error States

| State | Pattern |
|---|---|
| Loading (page) | `<LoadingSpinner />` — spinner + "Loading..." |
| Loading (button) | Disabled + "Saving..." text |
| Empty (list) | `<EmptyState icon title message action />` |
| Error (page) | `<ErrorMessage message onRetry />` |
| Error (action) | Toast with backend message |
| Not found | 404 page with 🧭 icon and "Go Home" |

---

## 8. Accessibility

- All inputs have `<label>` associated by name.
- Focus rings: `focus:ring-1 focus:ring-primary`.
- Colour contrast: minimum 4.5:1 for text on backgrounds.
- Buttons have discernible text, no icon-only without `aria-label`.
- Modals: close button always present.
- Navigation uses semantic `<nav>`, `<header>`, `<main>`, `<footer>`.

---

## 9. Imagery Guidelines

- Destination/package images: 16:9 landscape, ≥ 1200px wide.
- Hero images: ≥ 1600px wide, dark overlay.
- Source from Unsplash/Pexels; store as full URLs (no local assets in v1).
- Alt text = destination/package name.

---

## 10. Copy & Tone

- Friendly, confident, second-person ("Discover", "Book your next trip").
- Sentence case for buttons ("Book Now", "View Package").
- No exclamation marks in body copy; only in confirmations.
- Currency formatted `₹1,23,456` (Indian number system via `toLocaleString("en-IN")`).

---

## 11. Future Design Work

- Skeleton loaders for card grids.
- Dark mode via Tailwind's `class` strategy.
- Chart palette for admin analytics (recharts).
- Image lazy-loading with blur-up placeholders.
- Multi-step booking wizard (2 columns → stepper).