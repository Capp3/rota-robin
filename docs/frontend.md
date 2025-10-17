# Frontend Documentation

## Overview

- React 18 + TypeScript, Vite 5, Tailwind + shadcn/ui
- State/data: TanStack Query, React Context where needed
- Routing: React Router DOM
- Alias: `@` → `./src`

## Directory Structure (current)

```
/src
  ├─ components/
  │  ├─ dashboard/
  │  ├─ layout/
  │  └─ ui/
  ├─ contexts/
  │  └─ UserContext.tsx
  ├─ hooks/
  │  ├─ use-mobile.tsx
  │  └─ use-toast.ts
  ├─ lib/
  │  └─ utils.ts
  ├─ pages/
  │  ├─ EmployeeDashboard.tsx
  │  ├─ EmployeeDetail.tsx
  │  ├─ EmployeeManagement.tsx
  │  ├─ Login.tsx
  │  ├─ ManagementDashboard.tsx
  │  ├─ NotFound.tsx
  │  ├─ Requests.tsx
  │  ├─ Settings.tsx
  │  ├─ TimeclockApprovals.tsx
  │  ├─ TimeclockEntry.tsx
  │  └─ TimekeepingHistory.tsx
  ├─ App.tsx
  ├─ index.css
  ├─ main.tsx
  └─ vite-env.d.ts
```

## Routes

Defined in `src/App.tsx`:

- `/login` → `Login`
- `/dashboard` → `EmployeeDashboard`
- `/timeclock` → `TimeclockEntry`
- `/history` → `TimekeepingHistory`
- `/requests` → `Requests`
- `/management` → `ManagementDashboard`
- `/employees` → `EmployeeManagement`
- `/employees/:id` → `EmployeeDetail`
- `/approvals` → `TimeclockApprovals`
- `/settings` → `Settings`
- `*` → `NotFound`

## Conventions

- Use `@` alias for imports from `src` (configured in `vite.config.ts`).
- Components:
  - UI components under `components/ui/` (shadcn/ui)
  - Layout under `components/layout/`
  - Domain components under `components/dashboard/` etc.
- Forms: React Hook Form + Zod
- Styling: Tailwind utility-first; extend via shadcn components

## Authentication (per PRD)

- Backend uses Django sessions (no JWT in MVP)
- SPA must handle CSRF for state-changing requests; expect CSRF cookie and header per Django

## API & Data

- Base URL (dev): `http://localhost:8000`
- During MVP backend ramp-up, continue using mock/local state where present; integrate gradually

## Timezone

- Default backend timezone: UTC
- App settings will allow changing timezone; frontend should display times in the selected timezone

## Deviation from PRD Structure

- PRD specifies `frontend/` subdirectory. Current code resides at project root under `src/`.
- Action: keep current structure for MVP to avoid churn; plan a future move to `frontend/` if required.

## Setup & Scripts

- Dev server: `npm run dev` (Vite on port 8080 per `vite.config.ts`)
- Lint: `npm run lint`
- Build: `npm run build`

## Next Steps

- Add README under `src/` or `docs/` with component patterns and shared types
- Inventory shared UI patterns (tables, forms, modals) and document usage
- Coordinate with backend on CSRF and session cookie behavior for fetch calls
