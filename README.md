# 🌍 SHARVESH TOURS & TRAVELS — Full-Stack Travel Booking Platform

A modern, production-style **travel & tour booking web application** built with
**React + Vite + Tailwind** on the frontend and **Spring Boot + MySQL + JWT**
on the backend.

> ⚠️ **Read this first:** The **backend must be running before the frontend**
> will work. The frontend calls `http://localhost:8080/api` for every page,
> login, booking, and admin action. If the backend is down, the site will show
> network errors and empty pages.

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture at a Glance](#-architecture-at-a-glance)
3. [Prerequisites](#-prerequisites)
4. [⚡ Quick Start (Backend first, then Frontend)](#-quick-start-backend-first-then-frontend)
5. [Default Credentials](#-default-credentials)
6. [🎯 Frontend Functionality Walkthrough](#-frontend-functionality-walkthrough)
   - [Guest User](#1-guest-user-not-logged-in)
   - [Registered User](#2-registered-user)
   - [Admin User](#3-admin-user)
7. [Page-by-Page Feature Reference](#-page-by-page-feature-reference)
8. [How the Two Apps Talk](#-how-the-two-apps-talk)
9. [Project Structure](#-project-structure)
10. [Environment Variables](#-environment-variables)
11. [Verifying Everything Works](#-verifying-everything-works)
12. [Common Issues](#-common-issues)
13. [Documentation](#-documentation)
14. [License](#-license)

---

## 🧭 Project Overview

SHARVESH TOURS & TRAVELS lets users:

- **Discover destinations** with search, sort, and details pages.
- **Browse tour packages** filtered by price, duration, and rating.
- **View day-wise itineraries**, inclusions, exclusions, and terms.
- **Register / log in** securely (JWT).
- **Book a package** with multiple travellers.
- **Cancel eligible bookings** (≥ 48h before travel).
- **Manage their profile** and view booking history.
- **Leave reviews** (moderated by admin).

Admins additionally can:

- View **dashboard statistics** (users, bookings, revenue, reviews).
- **CRUD destinations** and **packages** (with itinerary builder).
- **Manage users** (enable/disable/delete).
- **Manage bookings** (status changes, cancellations).
- **Moderate reviews** (approve/hide/delete).

---

## 🏗 Architecture at a Glance

┌────────────────────────┐ REST + JWT ┌────────────────────────┐
│ React Frontend │ ───────────────────────▶ │ Spring Boot Backend │
│ Vite · Tailwind │ │ Spring Security │
│ Port 5173 │ ◀─── JSON (ApiResponse) ─│ Port 8080 │
└────────────────────────┘ └──────────┬─────────────┘
│ JDBC
▼
┌────────────────────┐
│ MySQL 8 │
│ travel_db │
└────────────────────┘



| Layer | Stack |
|---|---|
| Frontend | React 18, Vite 5, React Router 6, Tailwind 3, Axios, React Hook Form |
| Backend | Spring Boot 3.2, Java 21, Spring Security, JWT, JPA/Hibernate, MySQL 8 |
| Docs | Swagger/OpenAPI, Markdown docs in `docs/` |

---

## ✅ Prerequisites

| Tool | Version | Check |
|---|---|---|
| Java | **21+** | `java -version` |
| Maven | 3.9+ | `mvn -v` |
| MySQL | 8.0+ | `mysql --version` |
| Node.js | **18+** | `node -v` |
| npm | 9+ | `npm -v` |
| Git | Any | `git --version` |

---

## ⚡ Quick Start (Backend first, then Frontend)
---
### Step 1 — Start MySQL
```bash
Ensure MySQL is running and reachable at `localhost:3306`.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS travel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```
---

### Step 2 — Run the Backend
```bash
cd travel-website-backend

```
### Configure env (copy and edit)
cp .env.example .env
```

# Build and run
mvn clean install -DskipTests
mvn spring-boot:run
```
---

### Step 3 — Run the Frontend

```bash
cd travel-website-frontend
npm install
cp .env.example .env     # ensures VITE_API_URL=http://localhost:8080/api
npm run dev
```
---

The frontend starts on http://localhost:5173.

🚨 Do not start the frontend before the backend. Login, listings,
bookings, and admin pages will fail with network errors and empty states.
