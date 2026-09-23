
---


```markdown
# Development Rules & Conventions

**Project:** SHARVESH TOURS & TRAVELS
**Applies to:** Backend (Spring Boot) + Frontend (React) + Git + Docs

These rules are binding for all contributors. They exist to keep the codebase
consistent, reviewable, and safe to extend.

---

## 1. General Principles

1. **Readability > cleverness.** Write code your teammates can scan.
2. **One responsibility per class/function.**
3. **No dead code.** Delete unused classes, imports, files.
4. **No commented-out code.** Use Git history instead.
5. **Consistency beats personal preference.** Follow existing patterns.
6. **Never leak secrets.** No credentials, tokens, or keys in Git.
7. **Every public method has a purpose.** If it doesn't, remove it.

---

## 2. Backend Rules (Spring Boot)

### 2.1 Package layout

- Follow the exact package structure in `architecture.md`.
- No new packages without a stated reason in the PR description.

### 2.2 Controllers

- Only HTTP concerns: bind, call service, wrap in `ApiResponse<T>`.
- No business logic, no `try/catch` — rely on `GlobalExceptionHandler`.
- Use DTOs (`@Valid`) for request bodies.
- Use `@PreAuthorize("hasRole('ADMIN')")` on admin methods.
- Never return a JPA entity.

### 2.3 Services

- Hold all business logic.
- Annotate state-changing methods with `@Transactional`.
- Throw `ResourceNotFoundException` / `BadRequestException`.
- Never depend on `HttpServletRequest` (except via `SecurityUtils`).
- Accept/return only DTOs or primitive/id arguments.

### 2.4 Repositories

- Extend `JpaRepository`.
- Use derived queries when simple; JPQL for filters.
- Never expose raw `Query`/`EntityManager`.
- Don't return entities to controllers.

### 2.5 Entities

- JPA annotations only — no business methods.
- Use `@PrePersist` / `@PreUpdate` for timestamps.
- No `equals`/`hashCode` overrides that rely on mutable IDs.
- Enum fields use `@Enumerated(EnumType.STRING)`.

### 2.6 DTOs

- Immutable where practical (`@Getter`, `@Builder`).
- Never include sensitive fields (password, tokens).
- Validation annotations live here, not in the entity.

### 2.7 Mappers

- One mapper per aggregate (`UserMapper`, `PackageMapper`, ...).
- Mappers are `@Component` and pure.
- All entity → DTO conversions go through a mapper.

### 2.8 Exceptions

- Custom exceptions only for domain errors.
- Use `@RestControllerAdvice` — no per-controller handlers.
- Never expose internal details in error messages.

### 2.9 Security

- BCrypt for passwords — never any other hashing.
- JWT secret loaded from env; never hardcoded.
- Public endpoints declared explicitly in `SecurityConfig`.
- Roles checked via `@PreAuthorize`.
- CORS origins from env variable.

### 2.10 Configuration

- Externalize secrets and environment-specific values.
- `application.yml` uses `${VAR:default}` placeholders.
- `.env` gitignored; `.env.example` committed.

### 2.11 Logging

- Use SLF4J (`log.info/warn/error`).
- No `System.out.println`.
- Log business events at info, errors at error, no PII.

### 2.12 Testing

- Test files mirror the package of the code under test.
- Use JUnit 5 + AssertJ.
- Mock collaborators with Mockito.
- One behavior per test; descriptive method names.

---

## 3. Frontend Rules (React)

### 3.1 File & folder structure

- Follow `src/{components,pages,context,hooks,routes,services,utils}`.
- One component per file; filename = component name.
- Pages handle routing + data fetching; components render only.

### 3.2 Components

- Functional components only.
- Props destructured in the signature.
- No business logic inside JSX.
- Prefer composition over prop drilling.
- Keep components under ~200 lines; split if larger.

### 3.3 Hooks

- Prefix with `use`.
- Extract reusable stateful logic into hooks.
- Follow Rules of Hooks (no conditional hooks).

### 3.4 API calls

- Always via `src/services/api.js`.
- Never call `fetch` directly.
- Handle errors via toasts; never `alert` in new code (existing modals
  may use `alert` as a fallback).
- Never store tokens anywhere except `localStorage` (v1).

### 3.5 Forms

- Use React Hook Form.
- Validate on submit, not on every keystroke.
- Mirror backend DTO constraints.
- Display server error messages verbatim in a toast.

### 3.6 Styling

- Tailwind utility classes + component classes in `index.css`.
- No inline `style=` except for dynamic values (e.g. hero background).
- Reuse `.btn-primary`, `.card`, `.input`, `.label`, `.badge`.

### 3.7 State

- Global auth in `AuthContext`.
- Server data via `useApi` or local `useState`.
- No Redux/MobX in v1.

### 3.8 Routing

- All routes declared in `App.jsx`.
- Protect pages with `<ProtectedRoute adminOnly?>`, not inside pages.
- Always provide a fallback `*` route.

### 3.9 Accessibility

- Every input has a `<label>`.
- Buttons use `<button>`, not clickable `<div>`.
- Modals close on ESC (or an explicit Close button).
- Focus states styled (Tailwind defaults + custom).

---

## 4. Git Rules

### 4.1 Branches

main → protected, production-ready
develop → integration branch
feature/* → feat/booking-cancel
fix/* → fix/login-redirect
docs/* → docs/add-prd
chore/* → chore/bump-jjwt

text

### 4.2 Commit messages (Conventional Commits)
<type>(scope?): <short description>

text

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.

Examples:
feat(auth): add JWT login endpoint
fix(bookings): prevent cancel within 48h
docs(readme): add env var table
refactor(packages): extract PackageMapper

text

- Subject ≤ 72 chars, imperative mood, no trailing period.
- Reference issues: `feat: add filters (#12)`.

### 4.3 Pull requests

- One logical change per PR.
- PR template: what/why/how, screenshots for UI, test plan.
- No merges with failing CI.
- Squash-merge into `develop`.

---

## 5. Documentation Rules

- Every public API change updates Swagger annotations (if used) and README.
- New env vars must be added to `.env.example` and the README table.
- `docs/*.md` kept in sync with code — a code change that invalidates
  a doc must include the doc update in the same PR.
- No screenshots without alt text in markdown.

---

## 6. Security Rules

- Never commit `.env`, keystores, tokens, or service-account JSON.
- Rotate `JWT_SECRET` if it has ever been exposed.
- Never log request bodies containing passwords or tokens.
- Never disable CSRF protection for browser-authenticated state-changing
  endpoints. (Stateless JWT APIs are the exception.)
- Always validate on the server, even if the client validates.
- Reject unknown fields when deserializing (Jackson default strict).

---

## 7. Code Review Checklist

**Backend**
- [ ] Controller thin, service holds logic, DTO used.
- [ ] `@Transactional` on writes.
- [ ] Validation annotations on request DTOs.
- [ ] No entity returned from controller.
- [ ] No secrets or debug prints.
- [ ] Tests updated/added where behaviour changed.

**Frontend**
- [ ] Page/component split is correct.
- [ ] Loading, error, empty states handled.
- [ ] No console.log left behind.
- [ ] Responsive at 360 / 768 / 1280+.
- [ ] Toasts for errors; not silent failures.

**General**
- [ ] PR title is Conventional Commit.
- [ ] Docs updated if applicable.
- [ ] No unrelated changes snuck in.

---

## 8. Do Not

- Do not hardcode URLs, ports, or secrets.
- Do not modify `main` directly.
- Do not add dependencies without a stated reason.
- Do not disable tests or lint rules to make CI green.
- Do not catch and swallow exceptions silently.
- Do not return stack traces to clients.
- Do not expose JPA entities over the API.
- Do not store passwords in plaintext anywhere.
- Do not use `SELECT *` in raw queries when JPA can handle it.