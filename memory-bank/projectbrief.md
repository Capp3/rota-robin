# Rota Robin - Project Brief

## Project Overview

**Rota Robin** is an operational web application for a broadcast facility providing employee time tracking and time-off request management. The system supports 20-30 employees with 3-5 concurrent users, managing holiday, leave, and TOIL (Time Off In Lieu) balances.

## Core Purpose

Enable timekeeping and time-off management for a single business unit with separate interfaces for employees and managers.

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript, Vite, Tailwind CSS + shadcn/ui
- **Backend**: Django 5.2+ with Python 3.12+
- **Database**: PostgreSQL 18+
- **Task Queue**: Celery with Redis
- **Deployment**: Docker containers
- **Development**: VS Code DevContainer with UV package management

## Key Features

1. **Time Tracking**: Employee timeclock entry and approval workflow
2. **Request Management**: Holiday/Leave/TOIL request submission and approval
3. **Balance Tracking**: Time balance management (Holiday, TOIL, OT)
4. **Reporting**: Timecard and balance reports with CSV export

## User Roles

- **Employee**: Submit time entries, create requests, view personal dashboard
- **Manager**: All employee features plus approval workflows, employee management, balance adjustments

## Current Status

- Development environment configured with Docker DevContainer
- UV package management integrated
- SSH access configured for git operations
- MVP scope simplified to focus on core timekeeping and time-off management
- Rota/scheduling features moved to future enhancements
- Ready for backend Django implementation
