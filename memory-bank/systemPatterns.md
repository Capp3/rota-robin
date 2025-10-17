# System Patterns - Rota Robin

## Architecture Patterns

- **Frontend-Backend Separation**: React SPA with Django REST API
- **Container-First Development**: Docker DevContainer for consistent environment
- **Package Management**: UV for Python dependencies (fast, modern)
- **Database-First Design**: PostgreSQL with Django ORM
- **Task Queue Pattern**: Celery for background processing

## Code Organization Patterns

- **Frontend Structure**: Components organized by domain (dashboard, layout, ui)
- **Import Aliases**: Consistent use of `@` alias for clean imports
- **Component Composition**: shadcn/ui components with custom business components
- **State Management**: React Context for global state, local state for components

## Development Patterns

- **Environment Configuration**: Docker Compose for services, .env for secrets
- **Git Workflow**: Feature branches with pull request reviews
- **Testing Strategy**: Unit tests for business logic, integration tests for APIs
- **Documentation**: PRD-driven development with Memory Bank context

## Security Patterns

- **Authentication**: Django sessions (no JWT for MVP)
- **Authorization**: Role-based access control (Employee/Manager)
- **Audit Logging**: Complete audit trail for all business operations
- **Data Protection**: GDPR-compliant data handling and retention

## Deployment Patterns

- **Container Orchestration**: Docker Compose for local development
- **Service Isolation**: Backend services in isolated Docker network
- **Port Forwarding**: GUI services exposed, backend services isolated
- **Configuration Management**: Environment variables for all settings

## UI/UX Patterns

- **Design System**: shadcn/ui components with Tailwind CSS
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: WCAG 2.1 AA compliance
- **User Feedback**: Clear success/error states and loading indicators
