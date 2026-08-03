# 🍏 Fresh Fruit Market — Full-Stack Sandbox App

A modern, robust full-stack web application built with **React (TypeScript)** and **NestJS (TypeORM)**. Designed to demonstrate enterprise-grade frontend patterns, resilient state management, efficient database interaction, and optimized search performance.

---

## 🛠 Tech Stack & Architecture

### **Frontend**

- **Framework:** React 18+ with TypeScript
- **Styling:** CSS-in-JS / Type-safe Design System (Design Tokens)
- **Testing:** React Testing Library + Jest

### **Backend**

- **Framework:** NestJS (Node.js framework)
- **ORM:** TypeORM
- **Database:** SQLite / PostgreSQL (Configurable)
- **Testing:** Jest + NestJS Testing Module

---

## 🚀 Architectural Key Features & Solutions

### 1. 🔍 Search & Network Optimization (Debounce & Throttling)

- **Search Debouncing:** Prevents network spam during user input in the search field. The API request is delayed by `300ms` until the user finishes typing.
- **Request Throttling:** Rapid button interactions (e.g., fast pagination clicking) are throttled to prevent race conditions and duplicate HTTP requests.

### 2. ⚡ In-Memory Caching Strategy

- **Client-side API Cache:** Implemented an in-memory caching mechanism (`Map<string, PaginatedResponse>`) within the API layer or custom hook (`useFruits`).
- **Cache Keying:** Requests are cached by a unique query signature `key = `${search}-${page}-${limit}``.
- **Cache Invalidation:** Searching invalidates page offsets and resets user focus to page 1 seamlessly.

### 3. 📄 Efficient Server-Side Pagination

- **Database Level (`OFFSET` & `LIMIT`):** Utilized TypeORM's `findAndCount` method to execute combined count and paginated query requests using SQL `skip` and `take`.
- **Standardized DTO Response:** Backend enforces a structured pagination response:
  ```json
  {
    "data": [ ... ],
    "total": 15,
    "page": 1,
    "limit": 6,
    "totalPages": 3
  }
  ```
  - **UI Edge Cases**: The Pagination component gracefully hides itself when totalPages <= 1 and disables action buttons at start/end boundaries.


### 4. 🛡️ API Route Normalization & Path Resolution

To guarantee predictable routing and prevent endpoint duplication traps between client and server layers, we established strict URL normalization rules:

- **Global API Prefix:** Configured `app.setGlobalPrefix('api')` in NestJS `main.ts` for uniform API namespace isolation.
- **Controller Scope Resolution:** Resolved classic `@Controller('api/fruits')` collisions by declaring `@Controller('fruits')`, eliminating double-prefix traps (`/api/api/fruits`).
- **Content-Type & Safety Guards:** The frontend API wrapper verifies `Content-Type: application/json` headers before parsing responses to gracefully catch `404` or dev-server `HTML (<!doctype html>)` fallback responses.

```text
┌──────────────────────────┐    GET /api/fruits?page=2&limit=6    ┌──────────────────────────┐
│   React Client (Fetch)   │ ───────────────────────────────────► │   NestJS Global Prefix   │
└──────────────────────────┘                                      └────────────┬─────────────┘
                                                                               │
                                                                  ┌────────────▼─────────────┐
                                                                  │ @Controller('fruits')    │
                                                                  └──────────────────────────┘
```

### 5. 🧪 Comprehensive Testing Strategy

We applied isolated unit testing to both backend services and individual UI components to guarantee edge-case resiliency across the entire stack.

#### 🟢 Backend Testing (NestJS + Jest)

- **Controller Layer (`fruits.controller.spec.ts`)**
  - **Dependency Injection:** Mocked `FruitsService` via `useValue: mockFruitsService` within `Test.createTestingModule`.
  - **Query Parsing:** Verified automatic conversion of string query parameters (e.g., `page: "2"`, `limit: "6"`) into numbers before reaching business logic.
  - **Default Fallbacks:** Ensured missing parameters gracefully fall back to default pagination settings (`page = 1`, `limit = 6`).

- **Service Layer (`fruits.service.spec.ts`)**
  - **Database Seeding:** Verified `onModuleInit` seeds initial records from JSON when `count === 0` and skips execution if data already exists.
  - **SQL Filtering:** Validated TypeORM `Like` operator query formatting for fuzzy name search.
  - **Pagination Calculations:** Tested exact offset math: `skip = (page - 1) * limit`.
  - **Input Sanitization:** Guaranteed boundary protection for invalid inputs like negative page values or `NaN` limits.

#### 🔵 Frontend Testing (React Testing Library)

- **Pagination Component (`Pagination.spec.tsx`)**
  - **Visibility Edge Cases:** Verified component returns `null` when `totalPages <= 1` to clean up unnecessary UI clutter.
  - **Boundary Disabling:** Validated `Previous` button is disabled on page 1 and `Next` button is disabled on the last page.
  - **Event Handling:** Verified `onPageChange` fires with correct target page values when navigation controls are clicked.

### 6. 🏗️ Separation of Concerns (SoC) & Feature-Based Architecture

The application strictly adheres to the **Separation of Concerns (SoC)** principle. Each layer of the system fulfills a single, well-defined responsibility, ensuring the codebase remains modular, testable, and maintainable.

#### 1. 🌐 API Layer vs. UI Hooks (`fruits-api.ts` vs. `useFruits.ts`)

- **`fruits-api.ts` (Data Layer / Pure HTTP Client):** Completely agnostic of React, components, or state. Its sole duty is to execute network `fetch` requests, validate `Content-Type` headers, and return a strongly typed Promise.
- **`useFruits.ts` (Business Logic & State / Custom Hook):** Manages UI states (`isLoading`, `error`), pagination lifecycle (`useEffect`), and data updates. It delegates URL building and HTTP execution to `fetchFruitsApi`.

#### 2. 🎨 Smart (Container) vs. Dumb (Presentational) Components

- **Dumb / Presentational Components (`Pagination`, `Tooltip`, `FruitCard`):**
  - **Pure UI Components:** These components (like `Tooltip` for long text handling or `Pagination` for navigation) are strictly presentational. They perform zero HTTP requests and contain no business logic.
  - **Reusability:** Because they receive data via `props`, they remain context-agnostic and fully reusable across the application.
- **Smart / Controller Container (`App.tsx`):**
  - Acts as the coordinator: passes search query inputs from the UI to hooks and pipes the resulting state into presentational components.

#### 3. ⚙️ Backend Layered Architecture (NestJS)

- **`fruits.controller.ts` (Transport Layer):** Handles HTTP routing, parses query parameters from strings to numbers (`page`, `limit`), and formats outgoing JSON responses.
- **`fruits.service.ts` (Business Logic & Database Layer):** Encapsulates SQL querying, TypeORM `Like` filtering, offset calculation formulas (`skip = (page - 1) * limit`), and initial database seeding (`onModuleInit`). It operates independently of HTTP concepts.

## ⚙️ Getting Started

**Prerequisites**

- **Node.js**: >=18.x
- **pnpm** or **yarn**

### 1. Running the Backend (NestJS)

```Bash
# Navigate to the backend directory
cd backend

# Install dependencies
pnpm install

# Run the development server (runs on http://localhost:3000)
pnpm run start:dev

# Run unit tests
pnpm run test
```

**Note on Seeding**: The database is automatically seeded from fruits-init.json on the first startup via onModuleInit when the record count is 0.

### 2. Running the Frontend (React)

```Bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the Vite / React development server
pnpm run dev
```

## 🧪 Running Tests

To execute the unit tests for both backend controllers and service layers:

```Bash
# Run backend tests
cd backend && pnpm run test

# Run frontend tests
cd frontend && pnpm run test
```

## 🚀 Planned & Modular Future Features

Thanks to the Feature-Based Architecture, new capabilities can be plugged in without refactoring core structures:

```text
src/features/
├── fruits/            # Existing Fruit Catalog
├── cart/              # 🛍️ Shopping Cart Feature (Add to cart, Checkout)
├── favorites/         # 🌟 Wishlist Feature (Favorite fruits persisted to localStorage)
└── analytics/         # 📊 User Analytics & Event Tracking
```

- 🛍️ **Shopping Cart Module** (features/cart): Add fruit items to a local shopping cart state with total price calculations.
- 🌟 **Favorites & Bookmarks** (features/favorites): LocalStorage-backed state allowing users to save preferred items.
- ⚡ **Server-Side Sorting** (features/fruits): Add dynamic sorting Query Params (sortBy=price&order=asc) on backend and frontend.
- 📱 **Infinite Scroll Toggle**: Option to switch between classic Pagination and Infinite Scroll leveraging IntersectionObserver.
- ♿ **Accessibility (a11y) Enhancements**: Focus on WCAG compliance, including full keyboard navigation, ARIA live regions for dynamic search result updates, and screen-reader-friendly Tooltip and Pagination components.
