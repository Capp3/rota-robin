# Architecture Overview

## System Diagram (Dev)

```mermaid
graph TB;
    subgraph "Frontend"
        FE[React SPA (Vite)\nlocalhost:8080]
    end

    subgraph "Backend Network (Docker)"
        DJ[Django API\n:8000]
        PG[(PostgreSQL\n:5432)]
        RD[(Redis\n:6379)]
        CL[Celery Worker]
        PA[PgAdmin\n:8888]
    end

    FE -->|HTTP (credentials, CSRF)| DJ
    DJ -->|DB| PG
    DJ -->|Cache/Queue| RD
    CL -->|Tasks| RD
    CL -->|DB| PG
    PA -->|Admin| PG
```

## Key Decisions

- Authentication: Django sessions (no JWT in MVP)
- Database: Postgres 18 (dev) via Docker
- Package manager: `uv` for Python (no pip)
- Timezone: Default UTC; configurable in app settings
- Requests: Holiday, Leave, TOIL

## Repositories & Paths

- Frontend code: `src/` (Vite alias `@` → `./src`)
- Backend containers: `backend/compose.yml`
- Postgres init scripts: `backend/init/*.sql`
- Docs: `docs/`

## Ports (Dev)

- Frontend (Vite): 8080
- Django API: 8000
- PgAdmin: 8888
- Postgres: 5432 (internal; exposed for local access)
- Redis: 6379 (internal)

## Authentication Flow (Dev)

1. SPA requests CSRF cookie via GET to API
2. SPA sends subsequent requests with `credentials: include`
3. For unsafe methods, SPA adds `X-CSRFToken` header
4. Django validates session and CSRF

See `docs/csrf-cors.md` for detailed configuration.
