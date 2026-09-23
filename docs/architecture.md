# System Architecture

**Project:** SHARVESH TOURS & TRAVELS
**Scope:** Backend (Spring Boot), Frontend (React), Database (MySQL)

---

## 1. High-Level Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Client (Browser) │
│ React 18 + Vite + Tailwind + Axios + Router │
└──────────────────────────┬──────────────────────────────────┘
│ HTTPS / JSON
▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Spring Boot) │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ Controller │→ │ Service │→ │ Repository │ │
│ └────────────┘ └────────────┘ └────────────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ DTO / Mapper Validation JPA/Hibernate │
│ │ │ │ │
│ └───────┬──────┴─────────────────┘ │
│ ▼ │
│ Spring Security + JWT Filter │
└──────────────────────────┬──────────────────────────────────┘
│ JDBC
▼
┌─────────────────────────────────────────────────────────────┐
│ MySQL 8 │
│ users · destinations · travel_packages · itineraries · │
│ bookings · traveller_details · reviews │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Backend Architecture

### 2.1 Layered design

```
com.travelapp
├── controller → REST endpoints, DTO in/out
├── service → business logic, transactions
├── repository → Spring Data JPA interfaces
├── entity → JPA entities (persistence)
├── dto → request/response models
├── mapper → entity ↔ dto conversion
├── security → JWT filter, JwtService, SecurityConfig
├── exception → custom exceptions + global handler
├── config → OpenAPI, CORS, Jackson, DataInitializer
└── util → helpers (reference gen, constants)
```

Each layer has one reason to change:
```
| Layer | Responsibility |
|---|---|
| Controller | HTTP concerns, request binding, response envelope |
| Service | Orchestration, rules, transactions, cross-entity logic |
| Repository | Data access; JPQL / derived queries |
| Entity | Persistence mapping only — never returned via API |
| DTO | Stable contracts shared with clients |
| Mapper | Single source of truth for entity ↔ DTO conversion |
| Security | Authentication filter + authorization rules |
| Exception | Uniform error responses |
| Config | Framework wiring, cross-cutting settings |
| Util | Small, stateless helpers |
```
### 2.2 Request lifecycle
```
HTTP request
→ JwtAuthenticationFilter (parse Bearer, populate context)
→ DispatcherServlet → Controller
→ Bean Validation
→ Service (@Transactional)
→ Repository (JPA/Hibernate)
→ MySQL
→ Mapper (entity → DTO)
→ ApiResponse<T> (JSON)
→ HTTP response
```


### 2.3 Authentication
```
- Stateless JWT (HS512), TTL 24h.
- Token payload: `sub` (email), `role`, `iat`, `exp`.
- Filter validates signature + expiry, loads `UserDetails`, sets
  `SecurityContext`.
- `@PreAuthorize("hasRole('ADMIN')")` guards admin controllers.
- Public routes are declared in `SecurityConfig`.
```

### 2.4 Error handling
```
`@RestControllerAdvice` maps all exceptions to `ApiResponse<Void>`:

```json
{
  "success": false,
  "message": "Package not found",
  "status": 404,
  "timestamp": "2026-09-23T10:30:00"
}

Stack traces logged server-side; never returned to clients.
```
2.5 Transactions
```
Service methods that modify data are @Transactional.

Booking creation writes Booking + Travellers atomically.

Package update replaces itineraries atomically (orphanRemoval).
```
2.6 Validation

```
Jakarta Bean Validation on all request DTOs.

Cross-field checks in services (e.g. password === confirmPassword,
traveller count === numberOfTravellers).
```

3. Data Model
3.1 Entity relationships
```
text
User 1─────* Booking *─────1 TravelPackage *─────1 Destination
                 │                     │
                 │                     └──* PackageItinerary
                 │
                 └──* TravellerDetail

User 1─────* Review *─────0..1 TravelPackage
                │
                └─────0..1 Destination

```
3.2 Tables

```
Table	Purpose	Key columns
users	Auth + profile	email (unique), role, status
destinations	Content	name, country, estimated_cost
travel_packages	Content	destination_id, price, duration, rating
package_itineraries	Content	package_id, day_number
bookings	Transactions	booking_reference (unique), user_id, package_id, status
traveller_details	Transactions	booking_id, full_name, age
reviews	Engagement	user_id, package_id, destination_id, rating, status
3.3 Indexes & constraints
Unique index on users.email.

Unique index on bookings.booking_reference.

FKs with ON DELETE CASCADE where children shouldn't outlive parents
(itineraries, traveller details, reviews).
```
3.4 Enumerations

```
Enum	Values
User.Role	USER, ADMIN
User.Status	ACTIVE, DISABLED
Booking.BookingStatus	PENDING, CONFIRMED, CANCELLED, COMPLETED
Review.ReviewStatus	PENDING, APPROVED, HIDDEN
```

4. API Design
4.1 Conventions
```
Base path: /api

Resource names plural: /destinations, /packages

HTTP verbs: GET / POST / PUT / DELETE

Query params for filtering, sorting, pagination

Consistent envelope: ApiResponse<T>

ISO-8601 dates in JSON
```

4.2 Response envelope
```
json
{
  "success": true,
  "message": "OK",
  "data": { ... },
  "status": 200,
  "timestamp": "2026-09-23T10:30:00"
}
```
4.3 Pagination
```
Spring Page<T> serialized:
```
```

GET /api/packages?page=0&size=9&sort=rating
```
Returns:
```
json
{
  "content": [ ... ],
  "pageable": { "pageNumber": 0, "pageSize": 9 },
  "totalPages": 4,
  "totalElements": 33,
  "last": false,
  "first": true
}

```

5. Frontend Architecture
5.1 Structure
```
src/
├── components       → reusable presentational UI
├── pages            → route-level containers
├── layouts          → shared shells (Navbar/Footer/AdminLayout)
├── services         → Axios instance + API calls
├── hooks            → reusable logic (useApi)
├── context          → AuthContext
├── routes           → ProtectedRoute
├── utils            → formatting helpers
├── assets           → images, svg
└── App.jsx          → route table

```
5.2 State management
```
Global auth state via React Context.

Local page state via useState / useReducer.

Server state cached ad hoc via useApi (refetch pattern).
```

5.3 Routing
```
BrowserRouter with nested routes.

Guards via <ProtectedRoute> and adminOnly.

Lazy loading is a v2 enhancement.
```
5.4 Data flow
```
Component → useApi / api.<verb> → Axios (Bearer JWT) →
Backend → ApiResponse<T> → Component state → UI
5.5 Error handling
Axios interceptor catches 401 → clears token + redirects to /login.

Toasts for success/failure (react-hot-toast).

<ErrorMessage> and <EmptyState> components for page-level states.
```

6. Security Architecture
```
Concern	Approach
Authentication	JWT (HS512), 24h TTL, stateless
Password storage	BCrypt, strength 10
Authorization	@PreAuthorize + SecurityFilterChain
CORS	Allow-list configured via env
CSRF	Disabled (stateless API)
Input validation	Bean Validation on DTOs
Secret storage	Env vars, never committed
Response hygiene	No passwords or stack traces
Session	No server sessions; token in localStorage
```

8. Deployment Topology
```
        ┌──────────────┐         ┌──────────────┐
Users → │  CDN / SPA   │────┐    │  Backend     │
        │  (Vercel)    │    └──▶ │  (Render /   │
        └──────────────┘         │   Railway)   │
                                 └──────┬───────┘
                                        │
                                 ┌──────▼───────┐
                                 │  MySQL 8     │
                                 │  (Managed)   │
                                 └──────────────┘
Frontend served as static assets.

Backend packaged as a fat jar (java -jar).

MySQL as a managed service (RDS / PlanetScale / Railway / Aiven).
```
8. Observability
```
Structured logs via Spring Boot + SLF4J.

SQL logging toggle via SHOW_SQL.

Global exception handler logs stack traces.

Admin stats endpoint for business-level visibility.
```

9. Non-Functional Architecture Concerns
```
Idempotency: booking creation generates a unique reference; duplicate
submissions from the same user are prevented by reference uniqueness.

Concurrency: transactional writes for booking + travellers.

Extensibility: adding a new resource means adding entity → repository
→ DTO → mapper → service → controller; no layer coupling.

Testability: mappers and services are unit-testable in isolatio
```
