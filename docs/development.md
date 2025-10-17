# Development Guide (MVP)

## Prerequisites

- Docker & Docker Compose
- Node.js (for SPA)
- Config: copy `config/.env.sample` to `config/.env` and adjust if needed

## Start Backend Services

```bash
cd /workspace/backend
docker compose up -d
# Logs
docker compose logs -f
```

Services:

- Django: http://localhost:8000
- PgAdmin: http://localhost:8888 (admin@rota.com / admin_password)
- Postgres: localhost:5432 (rota_user / dev_password_123)

## Start Frontend (SPA)

```bash
cd /workspace
npm install
npm run dev  # Vite on http://localhost:8080
```

## Docs (MkDocs via uv)

```bash
# Install docs tools (one-time)
uv add --group dev mkdocs mkdocstrings[python]

# Serve docs locally
docs_serve() { uv run mkdocs serve --config-file config/mkdocs.yml --dev-addr 127.0.0.1:9000; }
docs_serve

# Build docs
docs_build() { uv run mkdocs build --config-file config/mkdocs.yml; }
docs_build
```

Docs are sourced exclusively from `docs/` and use the Read the Docs theme.

**Publishing**: Docs are automatically published to GitHub Pages on push to `main` branch via `.github/workflows/docs.yml`.

## Auth & CSRF (Dev)

- Authentication: Django sessions (no JWT)
- SPA must use `credentials: include` and `X-CSRFToken`
- See `docs/csrf-cors.md` for settings and examples

## Health Checks

- API: `GET http://localhost:8000/health/` (if implemented)
- PgAdmin UI: `http://localhost:8888`

## Database Init Scripts

- Place SQL files under `backend/init/` (e.g., `00-init.sql`)
- Mounted to `/docker-entrypoint-initdb.d/` in `backend/compose.yml`

## Common Tasks

- Update docs first when adding/changing behavior
- Prefer minimal backend changes; wire SPA to existing flows
- Use `uv` for Python packages (not pip)
- Dependabot handles dependency updates weekly (Python via uv, Node.js via npm)

## Troubleshooting

- CORS/CSRF issues: verify SPA origin in `CSRF_TRUSTED_ORIGINS` and CORS settings
- Session not set: ensure `credentials: include` on requests and CSRF header for POST/PUT/DELETE
- DB connection: check `backend/.env` and container health
