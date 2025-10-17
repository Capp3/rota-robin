# Logging (Development)

## Locations

- Django app logs: `logs/django.log`
- Docker service logs: `docker compose logs -f` (per-service)

## Django Logging (suggested)

```python
# settings.py (DEV example)
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "class": "logging.FileHandler",
            "filename": "logs/django.log",
            "formatter": "simple",
        },
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
    },
    "formatters": {
        "simple": {
            "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        }
    },
    "root": {
        "handlers": ["console", "file"],
        "level": "INFO",
    },
}
```

## Guidelines

- Use INFO for normal ops, WARNING for recoverable issues, ERROR for failures
- No secrets in logs
- Keep logs in `logs/` directory at repo root (for Docker compatibility)
