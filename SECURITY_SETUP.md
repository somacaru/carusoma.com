# Security Setup Guide

This guide covers all the security configurations needed before deploying to production.

## Security Features Implemented

| Feature | Status | Notes |
|---------|--------|-------|
| Admin authentication | ✅ Code complete | Needs secrets in GCP |
| Rate limiting | ✅ Complete | 5 requests/minute per IP |
| Input validation | ✅ Complete | Length limits, email format |
| Security headers | ✅ Complete | CSP, HSTS, X-Frame-Options, etc. |
| Email notifications | ✅ Code complete | Needs secrets in GCP |
| Cloud Storage | ✅ Code complete | Needs bucket creation |

---

## Required: Google Cloud Setup

### Step 1: Create Secrets in Secret Manager

Open Cloud Shell at https://console.cloud.google.com/ and run:

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# === EMAIL SECRETS ===
# Your Google Workspace email
echo -n "a.caruso@arcanedigitalshield.com" | gcloud secrets create smtp-user --data-file=-

# Google App Password (get from https://myaccount.google.com/apppasswords)
echo -n "YOUR_16_CHAR_APP_PASSWORD" | gcloud secrets create smtp-app-password --data-file=-

# Where to send notifications
echo -n "a.caruso@arcanedigitalshield.com" | gcloud secrets create notification-email --data-file=-

# === ADMIN SECRETS ===
# Admin username for /admin dashboard
echo -n "admin" | gcloud secrets create admin-username --data-file=-

# Admin password (use a strong password!)
echo -n "YOUR_STRONG_ADMIN_PASSWORD" | gcloud secrets create admin-password --data-file=-
```

### Step 2: Create Cloud Storage Bucket

```bash
# Create bucket for contact form submissions
gcloud storage buckets create gs://arcanedigitalshield-contact-submissions \
  --location=us-central1 \
  --project=$(gcloud config get-value project)
```

### Step 3: Grant Permissions to Cloud Run Service Account

```bash
# Get the service account
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')
SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

echo "Service Account: $SERVICE_ACCOUNT"

# Grant secret access
for SECRET in smtp-user smtp-app-password notification-email admin-username admin-password; do
  gcloud secrets add-iam-policy-binding $SECRET \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"
done

# Grant storage access
gcloud storage buckets add-iam-policy-binding gs://arcanedigitalshield-contact-submissions \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/storage.objectAdmin"
```

### Step 4: Deploy

```bash
gcloud builds submit --config cloudbuild.yaml
```

---

## Security Controls Explained

### 1. Admin Authentication (HTTP Basic Auth)

The `/admin` route is protected by HTTP Basic Authentication via middleware.

- **How it works**: Browser prompts for username/password
- **Credentials**: Stored in Secret Manager, not in code
- **Fallback**: If `ADMIN_PASSWORD` not set, access is blocked entirely

**To access admin after deployment:**
1. Go to https://arcanedigitalshield.com/admin
2. Enter the username and password you set in the secrets

### 2. Rate Limiting

Contact form API is rate limited to prevent abuse.

- **Limit**: 5 requests per minute per IP
- **Response**: 429 Too Many Requests with Retry-After header
- **Storage**: In-memory (resets on container restart)

### 3. Input Validation

All contact form inputs are validated:

- **Name**: Required, max 200 characters
- **Email**: Required, valid format, max 254 characters
- **Message**: Required, max 10,000 characters
- **Company**: Optional, max 200 characters
- **Phone**: Optional, max 30 characters

### 4. Security Headers

Applied to all responses via `next.config.js` and middleware:

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | 1 year, includeSubDomains | Force HTTPS |
| `X-Frame-Options` | DENY | Prevent clickjacking |
| `X-Content-Type-Options` | nosniff | Prevent MIME sniffing |
| `X-XSS-Protection` | 1; mode=block | XSS protection |
| `Referrer-Policy` | strict-origin-when-cross-origin | Control referrer |
| `Permissions-Policy` | Restrictive | Disable cameras, mic, etc. |
| `Content-Security-Policy` | See config | Restrict resource loading |

---

## Testing Security

### Test Rate Limiting

```bash
# Should work (first 5 requests)
for i in {1..5}; do
  curl -X POST https://arcanedigitalshield.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Test"}'
  echo ""
done

# 6th request should return 429
curl -X POST https://arcanedigitalshield.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Test Admin Auth

```bash
# Without auth - should return 401
curl https://arcanedigitalshield.com/admin

# With auth - should return 200
curl -u admin:YOUR_PASSWORD https://arcanedigitalshield.com/admin
```

### Test Security Headers

```bash
curl -I https://arcanedigitalshield.com/
# Check for Strict-Transport-Security, X-Frame-Options, etc.
```

---

## Future Improvements

- [ ] Replace HTTP Basic Auth with NextAuth.js or Clerk
- [ ] Add CAPTCHA (hCaptcha or reCAPTCHA) to contact form
- [ ] Implement Redis for rate limiting (persists across containers)
- [ ] Add login attempt logging
- [ ] Set up alerting for failed auth attempts

---

**Last Updated**: January 2026
