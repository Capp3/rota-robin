# Rota Robin Documentation

Welcome to the Rota Robin documentation. This system provides timekeeping and time-off management for business units.

## 🚀 Quick Start

- **[Development Guide](development.md)** - Get up and running locally
- **[Architecture Overview](architecture.md)** - System design and components
- **[Product Requirements](prd.md)** - Complete feature specification

## 📚 Documentation Sections

### 🏗️ Architecture & Design

- **[Architecture Overview](architecture.md)** - System diagram, ports, and key decisions
- **[Technical Decisions](technical.md)** - Standards, conventions, and source of truth
- **[Product Requirements](prd.md)** - Complete product specification and business rules

### 🛠️ Development

- **[Development Guide](development.md)** - Setup, workflows, and troubleshooting
- **[Backend Documentation](backend.md)** - Django services, database, and configuration
- **[Frontend Documentation](frontend.md)** - React structure, routes, and conventions

### 🔒 Security & Configuration

- **[CSRF/CORS Guide](csrf-cors.md)** - Session authentication setup for SPA
- **[Logging Guide](logging.md)** - Log locations and configuration
- **[Environment Setup](.env.sample)** - Configuration variables reference

### 📊 Project Management

- **[Project Status](status.md)** - Current progress and next steps
- **[Tasks](tasks.md)** - Implementation tasks and planning

## 🎯 Current Focus

**Phase**: MVP Backend & API Setup  
**Goal**: Minimal Django backend with session auth, Postgres, and React frontend integration

### Key Features (MVP)

- Employee timeclock entry and approval
- Holiday/Leave/TOIL request management
- Manager dashboard and employee management
- Time balance tracking
- Django session authentication
- PostgreSQL database

## 🛠️ Technology Stack

| Component              | Technology                                          |
| ---------------------- | --------------------------------------------------- |
| **Frontend**           | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Backend**            | Django 5.2+, PostgreSQL 18, Redis, Celery           |
| **Package Management** | uv (Python), npm (Node.js)                          |
| **Infrastructure**     | Docker, GitHub Actions, GitHub Pages                |

## 🔧 Development Services

| Service    | Port | Purpose                |
| ---------- | ---- | ---------------------- |
| React SPA  | 8080 | Frontend application   |
| Django API | 8000 | Backend API            |
| PgAdmin    | 8888 | Database management    |
| Postgres   | 5432 | Database server        |
| Redis      | 6379 | Cache & message broker |

## 📖 Getting Help

1. **Setup Issues**: Check [Development Guide](development.md)
2. **Architecture Questions**: See [Architecture Overview](architecture.md)
3. **Feature Requirements**: Review [Product Requirements](prd.md)
4. **Technical Standards**: Consult [Technical Decisions](technical.md)

## 🔄 Recent Updates

- ✅ Documentation structure established
- ✅ MkDocs configuration with GitHub Pages
- ✅ Dependabot configuration for dependency updates
- ✅ Development workflow documented
- 🔄 Backend implementation in progress

---

_This documentation is automatically built and published to GitHub Pages on every push to main._
