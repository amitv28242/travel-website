
# SHARVESH OURS & TRAVELS — Frontend

> React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · Axios · React Hook Form

Modern, responsive SPA for the **SHARVESH OURS & TRAVELS** booking platform. Talks to the
Spring Boot backend at `http://localhost:8080/api`.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [System Requirements](#-system-requirements)
4. [Project Structure](#-project-structure)
5. [Installation](#-installation)
6. [Environment Variables](#-environment-variables)
7. [Running the Application](#-running-the-application)
8. [Available Scripts](#-available-scripts)
9. [Routing Map](#-routing-map)
10. [Page Overview](#-page-overview)
11. [Admin Panel](#-admin-panel)
12. [Authentication Flow](#-authentication-flow)
13. [Form Validation](#-form-validation)
14. [API Integration](#-api-integration)
15. [Styling & Design System](#-styling--design-system)
16. [Build & Deployment](#-build--deployment)
17. [Troubleshooting](#-troubleshooting)
18. [License](#-license)

---

## ✨ Features

- 🎨 **Modern travel UI** — hero banner, popular destinations, featured packages, testimonials
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🔍 **Search & filtering** — destinations and packages
- 🧭 **Destinations** — listing, details with attractions & reviews
- 📦 **Packages** — listing with filters (price, duration, rating), details with itinerary
- 📅 **Booking flow** — multi-traveller, review, confirmation
- 👤 **User dashboard** — booking history, cancellation, profile update
- 🛠 **Admin panel** — dashboard, users, destinations, packages, bookings, reviews
- 🔐 **JWT auth** — context-based login/register, protected routes
- 🧾 **Toast notifications** — success/error feedback
- ⚠️ **Error & empty states** — consistent UX across all pages
- 🧩 **Reusable components** — cards, modal, spinner, pagination
- ⚡ **Fast dev server** — Vite with HMR
- 🎯 **Tailwind design tokens** — one place to change colors/typography
- 🚪 **Route guards** — user-only and admin-only pages
- ♿ **Accessible forms** — labels, focus states, keyboard-friendly modals

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router v6 |
| HTTP | Axios |
| Forms | React Hook Form |
| Styling | Tailwind CSS 3 |
| Notifications | react-hot-toast |
| Icons | Inline SVG / emoji |
| State | React Context (Auth) |

---

## 🖥 System Requirements

| Tool | Version |
|---|---|
| Node.js | **18+** (20 LTS recommended) |
| npm | 9+ (or pnpm/yarn) |
| Backend | Running at `http://localhost:8080` |

---

## 📁 Project Structure

travel-website-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
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

## ⚙️ Installation

### 1. Clone

```bash
git clone https://github.com/amitv28242/travel-website.git/travel-website-frontend.git
cd travel-website-frontend
----

### 2. Install dependencies

```bash
npm install

### 3. Configure environment

```bash
cp .env.example .env

### 4. Start the dev server
```bash
npm run dev

App: http://localhost:5173

The backend must be running on http://localhost:8080.


▶️ Running the Application
Development

```bash
npm run dev


Preview production build

```bash
npm run build
npm run preview