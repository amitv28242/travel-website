# Product Requirements Document (PRD)

**Project:** SHARVESH TOURS & TRAVELS — Full-Stack Travel & Tour Booking Platform
**Version:** 1.0.0
**Status:** Active
**Owner:** TravelGo Team
**Last Updated:** 2026-09-23

---

## 1. Overview

TravelGo is a modern full-stack web application that allows travellers to
discover destinations, browse curated tour packages, view day-wise
itineraries, register/login, book tours with traveller details, manage their
bookings, and leave reviews. Admins manage destinations, packages, bookings,
users, and moderate reviews.

The product is a **production-style** reference application demonstrating
React, Spring Boot, Spring Security, JWT, JPA/Hibernate, MySQL, and REST
best practices.

---

## 2. Goals

### Business goals
- Provide a complete, responsive travel-booking experience end to end.
- Enable discovery via search/filtering across destinations and packages.
- Support safe, authenticated bookings with traveller detail capture.
- Give admins a single control surface for content, bookings, and reviews.

### Technical goals
- Clean layered architecture (controller → service → repository → entity).
- DTO-based APIs — no JPA entities exposed.
- Stateless JWT authentication with role-based authorization.
- Consistent error handling and validation.
- Documented via Swagger/OpenAPI.
- Deployable by another developer using the README alone.

### Non-goals (v1)
- Real payment integration (bookings are recorded as CONFIRMED without charge).
- Real email/SMS delivery (forgot-password flow is optional/out of scope for v1).
- Multi-currency; single currency (INR) is assumed.
- Multi-language UI.

---

## 3. Target Users

| Persona | Description | Needs |
|---|---|---|
| **Traveller (USER)** | Anyone browsing and booking trips | Discover destinations, compare packages, book, cancel, review |
| **Administrator (ADMIN)** | Platform operator | Manage content and bookings, moderate reviews, view stats |
| **Guest** | Unauthenticated visitor | Browse destinations and packages, view reviews |

---

## 4. User Stories

### Guest
- As a guest, I can browse destinations and view their details.
- As a guest, I can browse packages with filters and view package details.
- As a guest, I can read approved reviews on destinations and packages.
- As a guest, I can register or log in.

### USER
- As a user, I can log in and receive a JWT.
- As a user, I can view and edit my profile and change my password.
- As a user, I can book a package with a travel date and multiple travellers.
- As a user, I can view my booking history and booking details.
- As a user, I can cancel an eligible booking (≥ 48h before travel).
- As a user, I can submit a review (rating 1–5 + comment) for a package
  or destination.

### ADMIN
- As an admin, I can see aggregate stats (users, bookings, revenue, reviews).
- As an admin, I can create, edit, and delete destinations.
- As an admin, I can create, edit, and delete packages with itineraries.
- As an admin, I can view, search, filter, update status of, and cancel bookings.
- As an admin, I can enable, disable, or delete users.
- As an admin, I can approve, hide, or delete reviews.

---

## 5. Functional Requirements

### 5.1 Authentication
- Register: name, email, phone, password, confirmPassword.
- Login returns a JWT (subject = email, role claim).
- Password hashing with BCrypt (no plaintext stored).
- Role-based authorization: `USER`, `ADMIN`.

### 5.2 Destinations
- CRUD (admin).
- Public list with `q` search, `sort` (name/country/cost), pagination.
- Details page includes activities, best time, estimated cost.

### 5.3 Packages
- CRUD (admin) with day-wise itineraries.
- Public list with filters: `destination`, `minPrice`, `maxPrice`,
  `duration`, `minRating`, `sort`, pagination.
- Details include inclusions, exclusions, itinerary, terms.

### 5.4 Bookings
- Create with packageId, travelDate (future), numberOfTravellers,
  traveller list (name, age, gender, phone, email, ID optional).
- Unique human-friendly booking reference (`TRV-YYMMDD-XXXXXX`).
- Statuses: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.
- User can cancel ≥ 48h before travel; admin can cancel anytime
  (except completed).

### 5.5 Reviews
- Authenticated users submit reviews (rating 1–5 + comment ≥ 5 chars).
- Statuses: `PENDING`, `APPROVED`, `HIDDEN`.
- Only `APPROVED` reviews visible publicly.
- Admin moderates.

### 5.6 Admin
- Stats endpoint: totals by status + total revenue (confirmed + completed).
- User list: search/filter by role & status; enable/disable/delete.
- Booking list: search/filter by reference/email/package/status.
- Review moderation queue.

### 5.7 Validation & Errors
- All request DTOs use Jakarta Bean Validation.
- Consistent `ApiResponse<T>` envelope.
- Global exception handler maps exceptions to HTTP status + message.

---

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Security | JWT + BCrypt + role-based authorization; no secrets in repo |
| Performance | P95 API latency < 300ms on local dev dataset |
| Scalability | Stateless backend, horizontally scalable |
| Reliability | Global error handler; no stack traces leaked |
| Maintainability | Layered architecture; DTO + Mapper separation |
| Usability | Fully responsive UI (mobile/tablet/desktop) |
| Accessibility | Semantic HTML, labels, focus states, keyboard-friendly modals |
| Documentation | Swagger UI + README + docs/*.md |
| Portability | Runs on Java 21 + MySQL 8 with Maven |

---

## 7. Success Metrics

- A guest can go from home → destination → package → register → booking
  in under 3 minutes.
- All endpoints documented in Swagger and covered by Postman examples.
- Another developer can clone and run both services in under 10 minutes.
- Zero high-severity issues in `mvn test` (baseline context test passes).
- Admin can moderate content without touching the database.

---

## 8. Scope

### In scope (v1)
- Authentication, users, destinations, packages, itineraries, bookings,
  travellers, reviews, admin panel, Swagger, README, Postman examples.

### Out of scope (v1)
- Payments, invoicing, email/SMS notifications, live chat, multi-currency,
  multi-language, CMS for blog posts, push notifications.

### Future scope
- Payment gateway integration (Stripe/Razorpay).
- Email confirmation and password reset.
- Wishlists and saved searches.
- Reviews with photos.
- Coupon codes and dynamic pricing.
- Analytics dashboards (charts over time).

---

## 9. Assumptions & Dependencies

- Frontend communicates with the backend over REST at `/api/**`.
- Deployment assumes MySQL 8 reachable from the backend.
- Time zone: UTC at the DB; rendering in user's locale on the frontend.
- Currency: INR (`₹`), single-currency.

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| JWT secret leakage | High | Store in env; rotate regularly; never commit |
| N+1 queries on listing pages | Medium | Use fetch joins / projections where needed |
| Admin accidental data loss | High | Guard admin deletes; require confirmations in UI |
| Booking race conditions | Medium | Server-side validation on traveller count/date |
| Unvalidated image URLs | Low | Only accept http(s) URLs; trim whitespace |

---

## 11. Acceptance Criteria (v1)

- [ ] All API endpoints return the `ApiResponse<T>` envelope.
- [ ] Register + login + protected routes work end to end.
- [ ] Admin endpoints reject non-admins with `403`.
- [ ] Destination & package CRUD works from the admin UI.
- [ ] Booking captures traveller details and generates a unique reference.
- [ ] User cancel works ≥ 48h before travel; blocked otherwise.
- [ ] Reviews are moderated; only APPROVED are public.
- [ ] Swagger UI lists every endpoint with request/response examples.
- [ ] `README.md` + `docs/*.md` present and accurate.
- [ ] Responsive UI verified on 360px, 768px, 1280px+.