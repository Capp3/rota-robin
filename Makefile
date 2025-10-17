# Rota Round - Development Makefile
# Provides convenient commands for development, testing, and deployment

.PHONY: help install dev test lint format clean build start stop restart logs status setup

# Default target
help: ## Show this help message
	@echo "Rota Round - Development Commands"
	@echo "================================="
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
	@echo "Examples:"
	@echo "  make dev          # Start development environment"
	@echo "  make test         # Run all tests"
	@echo "  make lint         # Check code quality"

# Environment setup
setup: ## Initial project setup
	@echo "🚀 Setting up Rota Round development environment..."
	@mkdir -p backend/logs
	@mkdir -p backend/config
	@if [ ! -f backend/.env ]; then \
		echo "📝 Creating backend/.env from template..."; \
		cp backend/.env.example backend/.env 2>/dev/null || echo "No .env.example found"; \
	fi
	@echo "✅ Setup complete! Run 'make dev' to start development."

install: ## Install dependencies (when not using dev container)
	@echo "📦 Installing dependencies..."
	@cd frontend && npm install
	@echo "✅ Dependencies installed"

# Development commands
dev: ## Start development environment
	@echo "🚀 Starting development environment..."
	@cd backend && docker compose up -d
	@echo "✅ Development services started"
	@echo "📊 Service status:"
	@make status

start: ## Start all services
	@echo "▶️  Starting all services..."
	@cd backend && docker compose up -d
	@echo "✅ All services started"

stop: ## Stop all services
	@echo "⏹️  Stopping all services..."
	@cd backend && docker compose down
	@echo "✅ All services stopped"

restart: ## Restart all services
	@echo "🔄 Restarting all services..."
	@cd backend && docker compose restart
	@echo "✅ All services restarted"

# Service management
logs: ## View service logs
	@echo "📋 Showing service logs (Ctrl+C to exit)..."
	@cd backend && docker compose logs -f

status: ## Show service status
	@echo "📊 Service Status:"
	@echo "=================="
	@cd backend && docker compose ps
	@echo ""
	@echo "🌐 Service URLs:"
	@echo "  Frontend:    http://localhost:5173"
	@echo "  Django API:  http://localhost:8000"
	@echo "  PgAdmin:     http://localhost:8888"
	@echo "  PostgreSQL:  localhost:5432"

# Database commands
db-migrate: ## Run Django database migrations
	@echo "🗃️  Running database migrations..."
	@cd backend && docker compose exec django python manage.py migrate
	@echo "✅ Migrations completed"

db-makemigrations: ## Create Django database migrations
	@echo "📝 Creating database migrations..."
	@cd backend && docker compose exec django python manage.py makemigrations
	@echo "✅ Migrations created"

db-reset: ## Reset database (WARNING: destroys all data)
	@echo "⚠️  WARNING: This will destroy all database data!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	@cd backend && docker compose down -v
	@cd backend && docker compose up -d postgres
	@sleep 5
	@make db-migrate
	@echo "✅ Database reset complete"

db-shell: ## Access database shell
	@echo "🐘 Accessing PostgreSQL shell..."
	@cd backend && docker compose exec postgres psql -U rota_user -d rota_round

# Django commands
django-shell: ## Access Django shell
	@echo "🐍 Accessing Django shell..."
	@cd backend && docker compose exec django python manage.py shell

django-admin: ## Create Django superuser
	@echo "👤 Creating Django superuser..."
	@cd backend && docker compose exec django python manage.py createsuperuser

django-collectstatic: ## Collect Django static files
	@echo "📁 Collecting static files..."
	@cd backend && docker compose exec django python manage.py collectstatic --noinput
	@echo "✅ Static files collected"

# Code quality
lint: ## Run linting checks
	@echo "🔍 Running code quality checks..."
	@echo "Python (Ruff):"
	@cd backend && ruff check . || true
	@echo "Type checking (Basedpyright):"
	@cd backend && basedpyright . || true
	@echo "✅ Linting complete"

format: ## Format code
	@echo "✨ Formatting code..."
	@cd backend && ruff format .
	@cd backend && ruff check --fix .
	@echo "✅ Code formatted"

# Testing
test: ## Run all tests
	@echo "🧪 Running tests..."
	@cd backend && docker compose exec django python -m pytest
	@echo "✅ Tests completed"

test-coverage: ## Run tests with coverage
	@echo "📊 Running tests with coverage..."
	@cd backend && docker compose exec django python -m pytest --cov=. --cov-report=html
	@echo "✅ Coverage report generated"

# Build and deployment
build: ## Build all services
	@echo "🏗️  Building all services..."
	@cd backend && docker compose build
	@echo "✅ Build complete"

build-no-cache: ## Build all services without cache
	@echo "🏗️  Building all services (no cache)..."
	@cd backend && docker compose build --no-cache
	@echo "✅ Build complete"

# Cleanup
clean: ## Clean up containers, images, and volumes
	@echo "🧹 Cleaning up..."
	@cd backend && docker compose down -v --rmi all
	@docker system prune -f
	@echo "✅ Cleanup complete"

clean-logs: ## Clean log files
	@echo "🧹 Cleaning log files..."
	@find . -name "*.log" -type f -delete
	@find . -name "logs" -type d -exec rm -rf {} + 2>/dev/null || true
	@echo "✅ Logs cleaned"

# Frontend commands (when implemented)
frontend-dev: ## Start frontend development server
	@echo "⚛️  Starting frontend development server..."
	@cd frontend && npm run dev

frontend-build: ## Build frontend for production
	@echo "🏗️  Building frontend..."
	@cd frontend && npm run build
	@echo "✅ Frontend built"

frontend-install: ## Install frontend dependencies
	@echo "📦 Installing frontend dependencies..."
	@cd frontend && npm install
	@echo "✅ Frontend dependencies installed"

# Utility commands
ports: ## Show all service ports
	@echo "🔌 Service Ports:"
	@echo "================="
	@echo "  Frontend (Vite):     10123 (host) -> 5173 (container)"
	@echo "  Django API:          8000 (container only)"
	@echo "  PostgreSQL:          5432 (container only)"
	@echo "  PgAdmin:             10122 (host) -> 8888 (container)"
	@echo "  Redis:               6379 (container only)"

env-check: ## Check environment variables
	@echo "🔍 Checking environment configuration..."
	@if [ -f backend/.env ]; then \
		echo "✅ backend/.env exists"; \
		echo "📋 Environment variables:"; \
		grep -v "^#" backend/.env | grep -v "^$$" | sed 's/^/  /'; \
	else \
		echo "❌ backend/.env not found"; \
		echo "Run 'make setup' to create it"; \
	fi

# Development workflow shortcuts
quick-start: setup start ## Quick project setup and start
	@echo "🎉 Quick start complete!"
	@echo "Visit http://localhost:8888 for PgAdmin"
	@make status

# Production helpers (for future use)
prod-build: ## Build for production
	@echo "🚀 Building for production..."
	@cd backend && docker compose -f compose.yml -f compose.prod.yml build
	@echo "✅ Production build complete"

prod-deploy: ## Deploy to production (placeholder)
	@echo "🚀 Deploying to production..."
	@echo "⚠️  Production deployment not yet implemented"
	@echo "✅ Deployment placeholder complete"
