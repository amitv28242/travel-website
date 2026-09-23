# TravelGo — Backend API

> Spring Boot 3.2 · Java 21 · MySQL 8 · JWT · Spring Security · JPA/Hibernate · Swagger

RESTful backend for the **TravelGo** travel & tour booking platform. Provides
JWT-based authentication, destination/package management, booking flow with
traveller details, reviews with moderation, and a full admin panel.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [System Requirements](#-system-requirements)
4. [Project Structure](#-project-structure)
5. [Installation](#-installation)
6. [Environment Variables](#-environment-variables)
7. [Database Setup](#-database-setup)
8. [Running the Application](#-running-the-application)
9. [Default Credentials](#-default-credentials)
10. [API Overview](#-api-overview)
11. [API Documentation (Swagger)](#-api-documentation-swagger)
12. [Sample Requests](#-sample-requests)
13. [Testing](#-testing)
14. [Error Handling](#-error-handling)
15. [Security](#-security)
16. [Troubleshooting](#-troubleshooting)
17. [License](#-license)

---

## ✨ Features

- 🔐 **JWT Authentication** — stateless login/register with BCrypt password hashing
- 👥 **Role-based Access Control** — `USER` and `ADMIN` roles
- 🌍 **Destinations CRUD** — with search, sorting, and pagination
- 📦 **Travel Packages** — filters by destination, price range, duration, rating; day-wise itineraries
- 📅 **Booking System** — multi-traveller bookings with unique reference codes
- ❌ **Booking Cancellation** — user-driven (48h policy) and admin override
- ⭐ **Reviews & Ratings** — user submissions with admin moderation (PENDING/APPROVED/HIDDEN)
- 📊 **Admin Dashboard** — aggregate stats (users, bookings, revenue, reviews)
- 🛠 **Admin Panel APIs** — user management, booking management, review moderation
- 🧪 **Validation** — Bean Validation on all request DTOs
- ⚠️ **Global Exception Handling** — consistent JSON error responses
- 📖 **Swagger / OpenAPI 3** — interactive API docs
- 🧱 **Layered Architecture** — controller → service → repository → entity
- 🔄 **DTO + Mapper pattern** — no JPA entities leak to the API
- 🚫 **No plaintext passwords** — BCrypt everywhere
- 🌐 **CORS** — configurable allowed origins

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.2.5 |
| Web | Spring Web (Spring MVC) |
| Security | Spring Security 6 + JWT (jjwt 0.12.5) |
| Persistence | Spring Data JPA + Hibernate 6 |
| Database | MySQL 8+ |
| Validation | Jakarta Bean Validation (Hibernate Validator) |
| Build | Maven 3.9+ |
| Documentation | springdoc-openapi (Swagger UI) |
| Utilities | Lombok, Jackson (JSR-310) |
| Password Hashing | BCrypt |

---

## 🖥 System Requirements

| Tool | Version | Notes |
|---|---|---|
| Java | **21+** | Required (`java -version`) |
| Maven | 3.9+ | Or use the wrapper `./mvnw` |
| MySQL | 8.0+ | Must be running locally or remotely |
| Git | Any | For cloning the repo |

Optional:
- **Postman** / **Insomnia** — for manual testing
- **Docker** — to run MySQL in a container

---

## 📁 Project Structure


travel-website-backend/
├── pom.xml
├── .env.example
├── README.md
└── src/
├── main/
│ ├── java/com/travelapp/
│ │ ├── TravelApplication.java
│ │ ├── config/ # OpenAPI, CORS, Jackson, DataInitializer
│ │ ├── controller/ # REST endpoints
│ │ ├── dto/ # Request / Response DTOs
│ │ ├── entity/ # JPA entities
│ │ ├── exception/ # Custom exceptions + global handler
│ │ ├── mapper/ # Entity ↔ DTO mappers
│ │ ├── repository/ # Spring Data JPA repositories
│ │ ├── security/ # JWT filter, JwtService, SecurityConfig
│ │ ├── service/ # Business logic
│ │ └── util/ # Helpers (reference generator, constants)
│ └── resources/
│ ├── application.yml
│ └── data.sql
└── test/java/com/travelapp/
└── TravelApplicationTests.java



---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/travel-website-backend.git
cd travel-website-backend

2. Verify prerequisites

java -version     # must print 21 or higher
mvn -v            # must print 3.9+
mysql --version   # must print 8.x

3. Create the database (or let Hibernate do it)

mysql -u root -p -e "CREATE DATABASE travel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"


4. Configure environment variables

cp .env.example .env
# Edit .env with your MySQL credentials + a strong JWT secret
5. Build the project

mvn clean install -DskipTests

6. Run

mvn spring-boot:run
The API will start on http://localhost:8080

Running the Application

Development mode

mvn spring-boot:run


Build a jar and run it

mvn clean package -DskipTests
java -jar target/travel-website-backend-1.0.0.jar

🌐 API Overview
Base URL: http://localhost:8080/api

Authentication
Method	Endpoint	Access	Description
POST	/auth/register	Public	Register a new user
POST	/auth/login	Public	Login and receive a JWT
User Profile
Method	Endpoint	Access	Description
GET	/users/profile	USER	Get current profile
PUT	/users/profile	USER	Update name & phone
PUT	/users/change-password	USER	Change password
Destinations
Method	Endpoint	Access	Description
GET	/destinations	Public	Paginated list (?q=&sort=&page=&size=)
GET	/destinations/{id}	Public	Single destination
POST	/destinations	ADMIN	Create
PUT	/destinations/{id}	ADMIN	Update
DELETE	/destinations/{id}	ADMIN	Delete
Packages
Method	Endpoint	Access	Description
GET	/packages	Public	Filters: destination, minPrice, maxPrice, duration, minRating, sort, page, size
GET	/packages/{id}	Public	Single package with itineraries
POST	/packages	ADMIN	Create (with itineraries)
PUT	/packages/{id}	ADMIN	Update (with itineraries)
DELETE	/packages/{id}	ADMIN	Delete
Bookings (User)
Method	Endpoint	Access	Description
POST	/bookings	USER	Create booking with traveller details
GET	/bookings	USER	List current user's bookings
GET	/bookings/{id}	USER	Booking detail
PUT	/bookings/{id}/cancel	USER	Cancel (48h before travel)
Reviews
Method	Endpoint	Access	Description
GET	/reviews	Public	Filters: packageId, destinationId, status, page, size
POST	/reviews	USER	Submit review (goes to PENDING)
PUT	/reviews/{id}/moderate?status=	ADMIN	Approve / Hide
DELETE	/reviews/{id}	ADMIN	Delete
Admin
Method	Endpoint	Access	Description
GET	/admin/stats	ADMIN	Dashboard aggregates
GET	/admin/users	ADMIN	Search/filter users
GET	/admin/users/{id}	ADMIN	User detail
PUT	/admin/users/{id}/status?status=	ADMIN	Enable / Disable
DELETE	/admin/users/{id}	ADMIN	Delete user
GET	/admin/bookings	ADMIN	Search/filter bookings
GET	/admin/bookings/{id}	ADMIN	Booking detail
PUT	/admin/bookings/{id}/status?status=	ADMIN	Update booking status
PUT	/admin/bookings/{id}/cancel?reason=	ADMIN	Admin cancel
📖 API Documentation (Swagger)
Once the app is running, open:

Swagger UI: http://localhost:8080/swagger-ui.html

OpenAPI JSON: http://localhost:8080/v3/api-docs

How to authorize in Swagger
Call POST /api/auth/login with the admin credentials.

Copy the token from the response.

Click Authorize in the Swagger UI.

Paste the token (the "Bearer " prefix is added automatically).

All subsequent requests carry the JWT.

