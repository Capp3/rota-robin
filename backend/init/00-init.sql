-- Postgres initialization script
-- Runs on first container start via /docker-entrypoint-initdb.d

-- Enable useful extensions when available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Placeholder for future seed or role grants
-- NOTE: DB, user, and password are provided via environment variables
