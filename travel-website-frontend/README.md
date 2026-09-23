

# SHARVESH OURS & TRAVELS — Frontend

It’s only temporary and is being used for backend API (http://localhost:8080/api) testing.


> React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · Axios · React Hook Form

Modern, responsive SPA for the **SHARVESH OURS & TRAVELS** travel & tour booking platform.
Consumes the SHARVESH OURS & TRAVELS Spring Boot API (http://localhost:8080/api)for authentication, destinations,
packages, bookings, reviews, and admin operations.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [System Requirements](#-system-requirements)
4. [Project Structure](#-project-structure)
5. [Installation](#-installation)
6. [Environment Variables](#-environment-variables)
7. [Running the Application](#-running-the-application)
8. [Building for Production](#-building-for-production)
9. [Route Map](#-route-map)
10. [Authentication Flow](#-authentication-flow)
11. [API Client](#-api-client)
12. [Components](#-components)
13. [Styling & Theming](#-styling--theming)
14. [Responsive Design](#-responsive-design)
15. [Testing the App](#-testing-the-app)
16. [Troubleshooting](#-troubleshooting)
17. [Deployment](#-deployment)
18. [License](#-license)

---

## ✨ Features

### Public
- 🏠 **Home page** — hero banner, destination search, popular destinations, featured packages, testimonials
- 🌍 **Destinations listing** — search, sort, pagination
- 📍 **Destination details** — gallery, activities, related packages, reviews
- 📦 **Packages listing** — filters (destination, price range, duration, rating), sorting, pagination
- 🎒 **Package details** — description, inclusions/exclusions, day-wise itinerary, reviews, book CTA

### User (authenticated)
- 🔐 **Login & Register** with form validation
- 📅 **Booking flow** — travel date, dynamic traveller form, live total, confirmation
- 🧾 **Booking confirmation** — reference number, summary, print button
- 👤 **Dashboard** — booking history with cancel action, editable profile

### Admin
- 📊 **Dashboard** — revenue, aggregate stats, status counters
- 👥 **User management** — search, filter, enable/disable, delete
- 🌍 **Destination management** — create/edit/delete via modal form
- 📦 **Package management** — create/edit/delete with dynamic itinerary builder
- 📅 **Booking management** — search, filter, status update, cancel with reason, detail modal
- ⭐ **Review moderation** — approve, hide, delete

### UX
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Tailwind design system (`.btn-primary`, `.card`, `.input`, `.badge`)
- 🔔 Toast notifications (react-hot-toast)
- ⏳ Loading spinners and empty states everywhere
- 🛡 Protected routes (user + admin), 401 auto-redirect
- 🎯 Form validation with inline error messages
- 🖼 Lazy-loaded images

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router DOM 6 |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Forms | React Hook Form 7 |
| HTTP | Axios 1 |
| Notifications | react-hot-toast |
| State | React Context (AuthContext) |
| Fonts | Inter (Google Fonts) |

---

## 🖥 System Requirements

| Tool | Version | Notes |
|---|---|---|
| Node.js | **18+** | LTS recommended (`node -v`) |
| npm | 9+ | Or `pnpm` / `yarn` |
| Backend API | running on port `8080` | See backend README |

Optional:
- **VS Code** with ESLint + Tailwind IntelliSense extensions

---

## 📁 Project Structure
travel-website-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env
├── .env.example
├── .gitignore
├── README.md
└── src/
├── main.jsx
├── App.jsx
├── index.css
├── assets/
│ └── logo.svg
├── services/
│ └── api.js
├── context/
│ └── AuthContext.jsx
├── hooks/
│ └── useApi.js
├── routes/
│ └── ProtectedRoute.jsx
├── utils/
│ └── format.js
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── LoadingSpinner.jsx
│ ├── ErrorMessage.jsx
│ ├── EmptyState.jsx
│ ├── DestinationCard.jsx
│ ├── PackageCard.jsx
│ ├── ReviewCard.jsx
│ ├── SearchBar.jsx
│ ├── Pagination.jsx
│ └── admin/
│ ├── DestinationFormModal.jsx
│ ├── PackageFormModal.jsx
│ └── BookingDetailModal.jsx
└── pages/
├── Home.jsx
├── Destinations.jsx
├── DestinationDetails.jsx
├── Packages.jsx
├── PackageDetails.jsx
├── BookPackage.jsx
├── BookingConfirmation.jsx
├── Dashboard.jsx
├── Login.jsx
├── Register.jsx
├── NotFound.jsx
└── admin/
├── AdminLayout.jsx
├── AdminDashboard.jsx
├── AdminUsers.jsx
├── AdminDestinations.jsx
├── AdminPackages.jsx
├── AdminBookings.jsx
└── AdminReviews.jsx
---

## Running the Application
###Development

```bash
npm run dev
```
---
### Preview production build locally

```bash
npm run build
npm run preview
```
---

### Lint
```bash
npm run lint
```
---
## 🏗 Building for Production
```bash
npm run build
The static bundle is emitted to dist/. Serve it with any static host
(Netlify, Vercel, Nginx, S3, Cloudflare Pages).
```
## Verify the built output:

```bash
npm run preview
```
---

## 🗺 Route Map
```
Path	Page	Access
/	Home	Public
/destinations	Destinations list	Public
/destinations/:id	Destination details	Public
/packages	Packages list	Public
/packages/:id	Package details	Public
/login	Login	Public
/register	Register	Public
/book/:id	Booking form	USER
/booking-confirmation/:id	Booking confirmation	USER
/dashboard	User dashboard	USER
/admin	Admin dashboard	ADMIN
/admin/users	User management	ADMIN
/admin/destinations	Destination management	ADMIN
/admin/packages	Package management	ADMIN
/admin/bookings	Booking management	ADMIN
/admin/reviews	Review moderation	ADMIN
/404	Not found	Public
*	Redirects to /404	Public
```

### Testing the App

Start the backend on http://localhost:8080

Start the frontend on http://localhost:5173

Register a user → /register

Browse destinations → click a card → view its packages

Open a package → Book Now → fill traveller form → Confirm

See Booking Confirmation with reference; go to Dashboard to manage

Log out → log in as admin (admin@travelgo.com / Admin@123)

Open /admin → try users, destinations, packages, bookings, reviews
