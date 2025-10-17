# Technical Decisions & Standards

## Source of Truth

- Product requirements: `docs/prd.md`
- Backend reference: `docs/backend.md`
- Frontend reference: `docs/frontend.md`
- Architecture: `docs/architecture.md`
- CSRF/CORS (sessions): `docs/csrf-cors.md`

## Core Decisions (MVP)

- **Auth**: Django sessions; no JWT in MVP
- **DB**: Postgres 18 (dev) via Docker; init scripts in `backend/init/`
- **Timezone**: Default UTC; user-facing timezone via app settings
- **Python Manager**: `uv` (not pip)
- **Frontend**: React + Vite, alias `@` → `./src`, minimal changes
- **Backend Focus**: Minimal—only what's necessary to support the SPA flows

## Configuration & Environment

- `.env` files live under `config/` (documented in `config/.env.sample`)
- Backend dev variables currently in `backend/.env` for container use; plan to align with `config/`
- Logs directory: `logs/` (e.g., `logs/django.log`)

## Conventions

- TypeScript imports use `@` alias; no `.ts` extensions in imports
- Keep PRD-aligned page names and routes
- Favor composition, small components, and shadcn/ui patterns

## Testing Strategy (Dev)

- Backend: smoke tests for health, session login
- Frontend: route-level smoke checks; form validation via Zod

## Future Alignment

- Consider moving SPA to `frontend/` directory per PRD when non-disruptive
- Expand API and OpenAPI after MVP if needed
