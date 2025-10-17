# CSRF & CORS (Development)

This guide documents how the React SPA (Vite dev server) communicates with the Django backend using session authentication.

## Goals

- Use Django sessions (no JWT) per PRD
- Allow cross-origin requests from the Vite dev server
- Ensure CSRF protection is correctly handled in dev

## Dev Origins

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:8000`

## Django Settings (reference)

Add/verify these settings in Django for development:

```python
# settings.py (DEV)
INSTALLED_APPS += [
    # If you choose to use django-cors-headers
    "corsheaders",
]

MIDDLEWARE = [
    # If using django-cors-headers, it must be high in the list
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    # ...
]

# CSRF trusted origins (required for cross-origin POSTs)
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

# CORS (if using django-cors-headers)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
CORS_ALLOW_CREDENTIALS = True

# Session & CSRF cookies (dev)
SESSION_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Allow cookies to be sent from the SPA
CSRF_COOKIE_HTTPONLY = False  # SPA needs to read csrftoken
```

Notes:

- If you prefer not to add `django-cors-headers`, you can proxy API via Vite or serve SPA from Django in production. For dev cross-origin, `django-cors-headers` is the simplest.
- Always keep `CsrfViewMiddleware` enabled when using sessions.

## Frontend Requests

Use `credentials: "include"` and include the CSRF token header for unsafe methods.

```ts
// utils/api.ts (example)
export async function apiFetch(url: string, options: RequestInit = {}) {
  const csrftoken = getCookie("csrftoken");
  const headers = new Headers(options.headers);
  if (options.method && options.method !== "GET") {
    headers.set("X-CSRFToken", csrftoken ?? "");
  }
  return fetch(`http://localhost:8000${url}`, {
    ...options,
    headers,
    credentials: "include",
  });
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
```

To initialize the CSRF cookie, make a GET request to any view protected by `CsrfViewMiddleware` (e.g., `/auth/login/` page or a dedicated `/csrf/` endpoint that calls `django.middleware.csrf.get_token`).

## Verification Checklist

- [ ] `Set-Cookie: csrftoken=...` is present after initial GET
- [ ] React requests include `credentials: include`
- [ ] POST/PUT/DELETE include `X-CSRFToken` header
- [ ] `CSRF_TRUSTED_ORIGINS` includes the SPA origin
- [ ] If using CORS: `CORS_ALLOWED_ORIGINS` includes SPA origin and `CORS_ALLOW_CREDENTIALS=True`

## Production Considerations (FYI)

- Serve SPA and API from the same origin to avoid CORS where possible
- Set `SESSION_COOKIE_SECURE=True`, `CSRF_COOKIE_SECURE=True`
- Consider `SameSite="Lax"` or `"Strict"` based on UX
