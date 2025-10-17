# Technical Context - Rota Robin

## Technology Stack

- **Frontend**: React 18.3.1, TypeScript 5.8.3, Vite 5.4.19
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query, React Hook Form + Zod
- **Backend**: Django 5.2+, Python 3.12+
- **Database**: PostgreSQL 18+
- **Task Queue**: Celery 5.5+ with Redis
- **Package Management**: UV (Python), npm (Node.js)
- **Development**: VS Code DevContainer, Docker

## Development Environment

- **Container**: Docker DevContainer with DinD (Docker-in-Docker)
- **Services**: PostgreSQL, Redis, PgAdmin (GUI)
- **SSH Access**: Host .ssh directory mounted for git operations
- **UV Integration**: Automatic venv creation and dependency sync
- **Port Forwarding**: PgAdmin (8888), Frontend (3000)

## Project Structure

```
rota-round/
├── frontend/           # React application (ALL frontend code)
├── backend/           # Django backend (to be implemented)
├── memory-bank/       # AI context and documentation
├── docs/              # Project documentation (PRD)
├── .devcontainer/     # DevContainer configuration
└── optimization-journey/ # System optimization docs
```

## Key Configuration Files

- `pyproject.toml`: Python dependencies and project metadata
- `frontend/vite.config.ts`: Vite configuration with @ alias
- `.devcontainer/devcontainer.json`: DevContainer settings
- `.devcontainer/post-create.sh`: Post-creation setup script
- `backend/compose.yml`: Docker Compose for services

## Database Schema (Preliminary)

- **Employee**: Extended Django User with time balances
- **TimeclockEntry**: Work time tracking with approval workflow
- **Request**: Holiday/Leave/TOIL requests
- **Event**: Broadcast events with location details
- **Shift**: Staffing assignments within events
- **SystemSettings**: Configurable business rules
- **AuditLog**: Complete audit trail

## API Design (Future)

- RESTful API following OpenAPI 3.0
- JWT authentication (post-MVP)
- Role-based endpoints (Employee/Manager)
- Comprehensive error handling
- Pagination and filtering support

## Performance Requirements

- Page load time < 2 seconds
- Support 3-5 concurrent users
- 99% uptime during business hours
- Efficient database queries with proper indexing
