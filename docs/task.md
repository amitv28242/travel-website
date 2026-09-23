# Task Tracker

**Project:** SHARVESH TOURS & TRAVELS
**Legend:** ✅ done · 🚧 in progress · ⬜ planned · ⛔ blocked

---

## 0. Repo & Tooling

| # | Task | Status |
|---|---|---|
| 0.1 | Initialize backend Maven project | ✅ |
| 0.2 | Initialize frontend Vite + React project | ✅ |
| 0.3 | Configure Tailwind + PostCSS | ✅ |
| 0.4 | Add `.gitignore` for both repos | ✅ |
| 0.5 | Add `.env.example` for both repos | ✅ |
| 0.6 | Configure ESLint (frontend) | ⬜ |
| 0.7 | Add Prettier config | ⬜ |

---

## 1. Database

| # | Task | Status |
|---|---|---|
| 1.1 | Create `travel_db` | ✅ |
| 1.2 | Users table + unique email index | ✅ |
| 1.3 | Destinations table | ✅ |
| 1.4 | Travel packages table | ✅ |
| 1.5 | Package itineraries table | ✅ |
| 1.6 | Bookings table + unique reference | ✅ |
| 1.7 | Traveller details table | ✅ |
| 1.8 | Reviews table | ✅ |
| 1.9 | Sample data (`data.sql`) | ✅ |
| 1.10 | Admin seeder (`DataInitializer`) | ✅ |

---

## 2. Backend — Core

| # | Task | Status |
|---|---|---|
| 2.1 | `pom.xml` with all dependencies | ✅ |
| 2.2 | `application.yml` | ✅ |
| 2.3 | `TravelApplication` main class | ✅ |
| 2.4 | JPA entities (7) | ✅ |
| 2.5 | Repositories (5) | ✅ |
| 2.6 | DTOs (20) | ✅ |
| 2.7 | Mappers (5) | ✅ |
| 2.8 | `ApiResponse<T>` envelope | ✅ |
| 2.9 | `GlobalExceptionHandler` | ✅ |

---

## 3. Backend — Security

| # | Task | Status |
|---|---|---|
| 3.1 | `JwtService` | ✅ |
| 3.2 | `JwtAuthenticationFilter` | ✅ |
| 3.3 | `SecurityConfig` | ✅ |
| 3.4 | `ApplicationConfig` (`UserDetailsService`) | ✅ |
| 3.5 | BCrypt `PasswordEncoder` | ✅ |
| 3.6 | CORS filter | ✅ |
| 3.7 | Role-based `@PreAuthorize` | ✅ |

---

## 4. Backend — APIs

| # | Task | Status |
|---|---|---|
| 4.1 | `POST /api/auth/register` | ✅ |
| 4.2 | `POST /api/auth/login` | ✅ |
| 4.3 | `GET/PUT /api/users/profile` | ✅ |
| 4.4 | `PUT /api/users/change-password` | ✅ |
| 4.5 | `GET/POST/PUT/DELETE /api/destinations` | ✅ |
| 4.6 | `GET/POST/PUT/DELETE /api/packages` | ✅ |
| 4.7 | `POST/GET /api/bookings` | ✅ |
| 4.8 | `PUT /api/bookings/{id}/cancel` | ✅ |
| 4.9 | `GET/POST/PUT/DELETE /api/reviews` | ✅ |
| 4.10 | `GET /api/admin/stats` | ✅ |
| 4.11 | `GET/PUT/DELETE /api/admin/users` | ✅ |
| 4.12 | `GET/PUT /api/admin/bookings` | ✅ |
| 4.13 | Swagger/OpenAPI config | ✅ |

---

## 5. Frontend — Core

| # | Task | Status |
|---|---|---|
| 5.1 | Vite + React bootstrap | ✅ |
| 5.2 | Tailwind design tokens | ✅ |
| 5.3 | Axios instance + interceptors | ✅ |
| 5.4 | `AuthContext` | ✅ |
| 5.5 | `ProtectedRoute` | ✅ |
| 5.6 | `useApi` hook | ✅ |
| 5.7 | `format.js` helpers | ✅ |
| 5.8 | `Navbar` + `Footer` | ✅ |
| 5.9 | Shared components (Card, Spinner, Empty, Pagination) | ✅ |

---

## 6. Frontend — Public Pages

| # | Task | Status |
|---|---|---|
| 6.1 | `Home` (hero, popular, featured, why, testimonials) | ✅ |
| 6.2 | `Destinations` listing + search + sort + pagination | ✅ |
| 6.3 | `DestinationDetails` | ✅ |
| 6.4 | `Packages` listing + filters + pagination | ✅ |
| 6.5 | `PackageDetails` (itinerary + reviews) | ✅ |
| 6.6 | `Login` | ✅ |
| 6.7 | `Register` | ✅ |
| 6.8 | `NotFound` | ✅ |

---

## 7. Frontend — User Flow

| # | Task | Status |
|---|---|---|
| 7.1 | `BookPackage` (dynamic traveller form) | ✅ |
| 7.2 | `BookingConfirmation` | ✅ |
| 7.3 | `Dashboard` (bookings + profile tabs) | ✅ |
| 7.4 | Cancel booking from Dashboard | ✅ |

---

## 8. Frontend — Admin Panel

| # | Task | Status |
|---|---|---|
| 8.1 | `AdminLayout` (sidebar) | ✅ |
| 8.2 | `AdminDashboard` (stats) | ✅ |
| 8.3 | `AdminUsers` (search, enable/disable, delete) | ✅ |
| 8.4 | `AdminDestinations` (CRUD modal) | ✅ |
| 8.5 | `AdminPackages` (CRUD modal + itinerary builder) | ✅ |
| 8.6 | `AdminBookings` (search, filter, status, cancel) | ✅ |
| 8.7 | `BookingDetailModal` | ✅ |
| 8.8 | `AdminReviews` (approve/hide/delete) | ✅ |

---

## 9. Documentation

| # | Task | Status |
|---|---|---|
| 9.1 | Backend `README.md` | ✅ |
| 9.2 | Frontend `README.md` | ✅ |
| 9.3 | `docs/prd.md` | ✅ |
| 9.4 | `docs/architecture.md` | ✅ |
| 9.5 | `docs/rules.md` | ✅ |
| 9.6 | `docs/design.md` | ✅ |
| 9.7 | `docs/task.md` (this file) | ✅ |
| 9.8 | `docs/memory.md` | ✅ |
| 9.9 | Postman collection JSON | ⬜ |
| 9.10 | Screenshots in README | ⬜ |

---

## 10. Quality & Testing

| # | Task | Status |
|---|---|---|
| 10.1 | `TravelApplicationTests` context test | ✅ |
| 10.2 | Mapper unit tests | ⬜ |
| 10.3 | Service unit tests (Mockito) | ⬜ |
| 10.4 | Controller `@WebMvcTest` | ⬜ |
| 10.5 | Integration test (booking flow) | ⬜ |
| 10.6 | Frontend smoke test (manual) | 🚧 |
| 10.7 | Accessibility audit (Lighthouse) | ⬜ |

---

## 11. Deployment

| # | Task | Status |
|---|---|---|
| 11.1 | Backend Dockerfile | ⬜ |
| 11.2 | Frontend Dockerfile (Nginx) | ⬜ |
| 11.3 | `docker-compose.yml` (backend + mysql) | ⬜ |
| 11.4 | Deploy backend (Render/Railway) | ⬜ |
| 11.5 | Deploy frontend (Vercel/Netlify) | ⬜ |
| 11.6 | Configure production env vars | ⬜ |

---

## 12. Backlog (Post-v1)

| # | Task | Priority |
|---|---|---|
| 12.1 | Payments (Stripe/Razorpay) | High |
| 12.2 | Email confirmation + reset password | High |
| 12.3 | Wishlist / saved packages | Medium |
| 12.4 | Review photos | Medium |
| 12.5 | Coupon codes | Medium |
| 12.6 | Analytics charts on admin dashboard | Medium |
| 12.7 | Multi-currency | Low |
| 12.8 | Multi-language (i18n) | Low |
| 12.9 | Skeleton loaders | Low |
| 12.10 | Dark mode | Low |

---

## 13. Current Sprint Focus

**Sprint goal:** deliver v1.0 (feature complete, documented, local run).

- [x] Core APIs and pages
- [x] Admin panel
- [x] Docs suite (PRD, architecture, rules, design, tasks, memory)
- [ ] Postman collection
- [ ] Screenshots for README
- [ ] First commit history cleaned up