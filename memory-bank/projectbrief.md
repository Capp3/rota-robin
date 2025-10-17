# Rota Robin - Project Brief

## Project Overview

**Rota Robin** is an operational web application for a broadcast facility providing employee time tracking, scheduling (rota), and event management. The system supports 20-30 employees with 3-5 concurrent users, tracking time against events while managing holiday, leave, and TOIL (Time Off In Lieu) balances.

## Core Purpose

Enable scheduling and timekeeping for a single business unit with separate interfaces for employees and managers.

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript, Vite, Tailwind CSS + shadcn/ui
- **Backend**: Django 5.2+ with Python 3.12+
- **Database**: PostgreSQL 18+
- **Task Queue**: Celery with Redis
- **Deployment**: Docker containers
- **Development**: VS Code DevContainer with UV package management

## Key Features

1. **Time Tracking**: Employee timeclock entry and approval workflow
2. **Scheduling**: Event management and rota creation
3. **Request Management**: Holiday/Leave/TOIL request submission and approval
4. **Balance Tracking**: Time balance management (Holiday, TOIL, OT)
5. **Reporting**: Timecard and balance reports with CSV export

## User Roles

- **Employee**: Submit time entries, create requests, view personal dashboard
- **Manager**: All employee features plus approval workflows, employee management, event creation

## Development Phases

- **Phase 1**: Core timekeeping and request management
- **Phase 2**: Event management and scheduling features

## Current Status

- Development environment configured with Docker DevContainer
- UV package management integrated
- SSH access configured for git operations
- Ready for backend Django implementation
