# Tasks - Rota Robin

## Current Tasks

### High Priority

- [ ] Initialize Django backend project structure
- [ ] Set up Django database models (Employee, TimeclockEntry, Request)
- [ ] Create Django REST API endpoints
- [ ] Implement Django authentication system
- [ ] Connect React frontend to Django backend

### Medium Priority

- [ ] Create employee dashboard API integration
- [ ] Implement timeclock entry submission workflow
- [ ] Build request management system (Holiday/Leave/TOIL)
- [ ] Create manager approval workflows
- [ ] Implement time balance tracking

### Low Priority

- [ ] Add comprehensive error handling
- [ ] Implement audit logging system
- [ ] Create reporting functionality
- [ ] Add CSV export capabilities
- [ ] Implement notification system

## Completed Tasks

- [x] Set up Docker DevContainer environment
- [x] Integrate UV package management
- [x] Configure SSH access for git operations
- [x] Establish Memory Bank system
- [x] Complete Product Requirements Document (PRD)
- [x] Organize project documentation structure
- [x] MVP scope refactored to remove rota/scheduling features

## MVP Implementation Tasks

- [ ] **Backend Setup**
  - [ ] Django project initialization
  - [ ] Database configuration
  - [ ] Model creation and migrations (Employee, TimeclockEntry, Request, BalanceAdjustment, SystemSettings, Notification, AuditLog)
  - [ ] Admin interface setup
- [ ] **API Development**
  - [ ] Employee management endpoints
  - [ ] Timeclock entry endpoints
  - [ ] Request management endpoints
  - [ ] Authentication endpoints
- [ ] **Frontend Integration**
  - [ ] API client setup
  - [ ] Authentication integration
  - [ ] Employee dashboard connection
  - [ ] Timeclock entry form integration
- [ ] **Testing & Validation**
  - [ ] Unit tests for models
  - [ ] API endpoint testing
  - [ ] Frontend-backend integration testing
  - [ ] User acceptance testing

## Future Enhancements (Post-MVP)

- [ ] **Event & Scheduling Management**
  - [ ] Event creation and management
  - [ ] Shift assignment system
  - [ ] Rota creation interface
  - [ ] Drag-and-drop functionality
  - [ ] Calendar views
  - [ ] Schedule notifications
  - [ ] Event reports
  - [ ] Schedule optimization
  - [ ] Unfilled shift warnings

## Notes

- MVP focuses on core timekeeping and time-off management
- Event/rota features moved to future enhancements
- Backend implementation is the critical path for project progress
- Frontend structure is already in place and ready for backend integration
- Memory Bank system is active for AI-assisted development

## Planning: MVP Backend & API Setup

### Description

Establish the Django backend, core models, REST API, and authentication, then connect the existing React frontend for the MVP (timekeeping and time-off requests).

### Complexity

- Level: 3
- Type: Feature

### Technology Stack

- Language: Python 3.11+
- Backend: Django 5.x, Django REST Framework
- Auth: djangorestframework-simplejwt (JWT)
- DB: SQLite for dev (PostgreSQL later if needed)
- Tooling: uv for package management, Docker DevContainer
- API Docs: drf-spectacular (OpenAPI)

### Technology Validation Checkpoints

- [ ] Project initialization with uv and Django verified
- [ ] DRF and SimpleJWT installed and configured
- [ ] Migrations run successfully (SQLite dev)
- [ ] Minimal endpoint returns 200 (health or "me")
- [ ] OpenAPI schema generated via drf-spectacular

### Status

- [ ] Initialization complete
- [x] Planning complete
- [ ] Technology validation complete
- [ ] Implementation in progress

### Implementation Plan

1. Backend initialization
   - [ ] Create Django project and core app (e.g., `core`)
   - [ ] Configure settings (installed apps, CORS, REST_FRAMEWORK, SimpleJWT)
   - [ ] Add base URL config and health endpoint
2. Data models and admin
   - [ ] Implement models: Employee, TimeclockEntry, Request, BalanceAdjustment, SystemSettings, Notification, AuditLog
   - [ ] Create migrations and register models in admin
3. Authentication
   - [ ] Add JWT auth endpoints (token obtain/refresh)
   - [ ] Implement `User` ↔ `Employee` linkage
4. API endpoints (DRF)
   - [ ] Serializers, viewsets, and routers for Employee, TimeclockEntry, Request
   - [ ] Permissions (authenticated, staff where needed)
5. API docs and validation
   - [ ] Add drf-spectacular and expose `/schema/` and `/docs/`
   - [ ] Basic unit tests for models and API smoke tests
6. Frontend integration
   - [ ] Configure API base URL and auth flows in React
   - [ ] Integrate dashboard data, timeclock submission, and request submission
7. QA & hardening
   - [ ] Error handling, CORS, and basic logging to `logs/django.log`
   - [ ] Review against MVP acceptance criteria

### Creative Phases Required

- [x] Data Model design (fields/relations for core entities)
- [ ] Architecture design (N/A for MVP beyond standard Django/DRF)
- [ ] UI/UX design (handled in existing frontend; minor adjustments only)

### Dependencies

- Existing React frontend structure
- DevContainer with uv installed
- Config files under `config/` with `.env` and `.env.sample`

### Challenges & Mitigations

- Authentication choice (JWT vs session): prefer JWT for SPA – keep config minimal
- Timezones and date handling: enforce UTC in DB; convert at UI; document in `docs/technical.md`
- Field definitions scope creep: stick to MVP-required fields only

### Open Questions

1. Preferred dev database: SQLite (default) or PostgreSQL from the start?
2. Authentication: proceed with JWT (SimpleJWT) for SPA, or do you prefer session auth?
3. Time off Request types and minimal fields to include for MVP (e.g., holiday, sick, TOIL)?
4. Any existing frontend routes/components we must match for endpoint paths/naming?
5. Timezone policy: confirm UTC in backend with client-side localization acceptable?
