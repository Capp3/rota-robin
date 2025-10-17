#!/bin/bash

# Post-create script for Rota Round dev container
echo "🚀 Setting up Rota Round development environment..."

# Debug: Check if workspace is mounted and list contents
echo "🔍 Debugging workspace mount..."
echo "Current directory: $(pwd)"
echo "Workspace contents:"
ls -la /workspace || echo "❌ Cannot access /workspace directory"
echo ""

# Ensure we're in the workspace directory
cd /workspace

# Set up UV virtual environment if it doesn't exist
echo "🐍 Setting up UV virtual environment..."
if [ ! -d ".venv" ]; then
    echo "📦 Creating UV virtual environment..."
    uv venv
    echo "✅ UV virtual environment created"
else
    echo "ℹ️  UV virtual environment already exists"
fi

# Sync dependencies from pyproject.toml
echo "📋 Syncing Python dependencies..."
uv sync
echo "✅ Dependencies synced successfully"

# Copy environment template if .env doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file from template..."
    cat > backend/.env << EOF
# Database Configuration
POSTGRES_PORT=5432
POSTGRES_PASSWORD=dev_password_123
POSTGRES_DB=rota_round
POSTGRES_USER=rota_user

# PgAdmin Configuration
PGADMIN_PORT=8888
PGADMIN_USER=admin@rota.com
PGADMIN_PASSWORD=admin_password

# Django Configuration
DJANGO_SECRET_KEY=dev-secret-key-change-in-production
DJANGO_DEBUG=True
DJANGO_PORT=8000
DJANGO_HOST=0.0.0.0

# Database URL
DATABASE_URL=postgresql://rota_user:dev_password_123@postgres:5432/rota_round

# Celery Configuration
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

# Redis Configuration
REDIS_PORT=6379
REDIS_PASSWORD=dev_redis_password
EOF
    echo "✅ Created backend/.env file with development defaults"
else
    echo "ℹ️  backend/.env already exists, skipping creation"
fi

# Create useful aliases
echo "🔗 Setting up development aliases..."
cat >> ~/.bashrc << 'EOF'

# Rota Round Development Aliases
alias dc="docker compose"
alias dcu="docker compose up -d"
alias dcd="docker compose down"
alias dcl="docker compose logs -f"
alias dcb="docker compose build"
alias dce="docker compose exec"

# Django specific aliases
alias dm="python manage.py migrate"
alias dmm="python manage.py makemigrations"
alias dsu="python manage.py createsuperuser"
alias ds="python manage.py shell"
alias dr="python manage.py runserver 0.0.0.0:8000"

# Quick navigation
alias cdbackend="cd /workspace/backend"
alias cdfrontend="cd /workspace/frontend"

# Development shortcuts
alias start-dev="cd /workspace && docker compose up -d && echo 'Services starting...'"
alias stop-dev="cd /workspace && docker compose down && echo 'Services stopped'"
alias logs="docker compose logs -f"

EOF

# Reload bashrc
source ~/.bashrc

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Quick start commands:"
echo "  • start-dev    - Start all services"
echo "  • stop-dev     - Stop all services"
echo "  • logs         - View service logs"
echo "  • cdbackend    - Navigate to backend"
echo "  • cdfrontend   - Navigate to frontend"
echo ""
echo "📚 Next steps:"
echo "  1. Run 'start-dev' to start the services"
echo "  2. VS Code will forward GUI ports (PgAdmin + Frontend)"
echo "  3. Backend services run in isolated Docker network:"
echo "     • PgAdmin:     http://localhost:8888 (forwarded from 8888)"
echo "     • Frontend:    http://localhost:3000 (forwarded from 3000)"
echo "     • Django API:  localhost:8000 (isolated, no forwarding)"
echo "     • PostgreSQL:  localhost:5432 (isolated, no forwarding)"
echo "     • Redis:       localhost:6379 (isolated, no forwarding)"
echo ""
echo "🔒 TRUE Docker-in-Docker: Complete network isolation"
echo "   Backend services only accessible within container network"
echo "   GUI ports mapped to avoid host conflicts (8888, 3000)"
echo ""
