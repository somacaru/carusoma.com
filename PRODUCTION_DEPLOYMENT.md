# Production Deployment Guide

## Current Status

✅ **The contact form system is now production-ready!**

The system automatically detects the environment and uses the appropriate storage:

- **Development** (`npm run dev`): Uses local file storage (`/data/contact-submissions.json`)
- **Production** (Cloud Run): Uses Google Cloud Storage (persistent across restarts)

## How It Works

### Automatic Environment Detection

The system automatically detects whether to use Cloud Storage or local files:

1. **Development Mode**: 
   - Runs locally
   - Uses local file storage
   - No GCS setup needed

2. **Production Mode** (Cloud Run):
   - Detects `NODE_ENV=production` and `K_SERVICE` (Cloud Run environment variable)
   - Uses Google Cloud Storage if `GCS_BUCKET_NAME` is set
   - Falls back to local storage if GCS is unavailable

### Storage Behavior

- **Local Storage**: Data persists only during container lifetime
- **Cloud Storage**: Data persists permanently across all container restarts

## Production Setup Steps

### 1. Create Cloud Storage Bucket

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Create the bucket
gcloud storage buckets create gs://arcanedigitalshield-contact-submissions \
  --location=us-central1 \
  --project=$PROJECT_ID
```

### 2. Grant Cloud Run Service Account Access

```bash
# Get your Cloud Run service account (default is PROJECT_NUMBER-compute@developer.gserviceaccount.com)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

# Grant storage permissions
gcloud storage buckets add-iam-policy-binding gs://arcanedigitalshield-contact-submissions \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/storage.objectAdmin" \
  --project=$PROJECT_ID
```

### 3. Deploy with Environment Variable

Update your `cloudbuild.yaml` or deployment script to set the bucket name:

**Option A: In cloudbuild.yaml**
```yaml
steps:
  # ... existing steps ...
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'arcanedigitalshield-website'
      # ... other args ...
      - '--set-env-vars'
      - 'GCS_BUCKET_NAME=arcanedigitalshield-contact-submissions'
```

**Option B: After deployment**
```bash
gcloud run services update arcanedigitalshield-website \
  --region=us-central1 \
  --set-env-vars="GCS_BUCKET_NAME=arcanedigitalshield-contact-submissions"
```

### 4. Deploy

```bash
# Using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or using deploy script
./deploy.sh
```

## Verification

### Check if GCS is Working

1. **Submit a test form** on your production site
2. **Check Cloud Storage**:
   ```bash
   gcloud storage ls gs://arcanedigitalshield-contact-submissions/
   ```
3. **View the file**:
   ```bash
   gcloud storage cat gs://arcanedigitalshield-contact-submissions/contact-submissions.json
   ```

### Check Logs

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=arcanedigitalshield-website" \
  --limit 50 \
  --format json
```

Look for:
- ✅ "Using Cloud Storage" messages
- ❌ "Falling back to local storage" warnings

## Fallback Behavior

If Cloud Storage is unavailable, the system will:
1. Log a warning
2. Fall back to local file storage
3. Continue working (but data won't persist across restarts)

This ensures the contact form always works, even if GCS setup is incomplete.

## Admin Dashboard

Access the admin dashboard at:
```
https://your-domain.com/admin
```

Features:
- View all submissions
- Filter unread messages
- Mark as read/unread
- See unread count

## Troubleshooting

### Submissions Not Persisting

1. **Check bucket exists**:
   ```bash
   gcloud storage buckets list --filter="name:arcanedigitalshield-contact-submissions"
   ```

2. **Check permissions**:
   ```bash
   gcloud storage buckets get-iam-policy gs://arcanedigitalshield-contact-submissions
   ```

3. **Check environment variable**:
   ```bash
   gcloud run services describe arcanedigitalshield-website \
     --region=us-central1 \
     --format='value(spec.template.spec.containers[0].env)'
   ```

### Using Custom Bucket Name

Set a custom bucket name:
```bash
gcloud run services update arcanedigitalshield-website \
  --region=us-central1 \
  --set-env-vars="GCS_BUCKET_NAME=my-custom-bucket-name"
```

## Next Steps

When you're ready to scale:
- **Database migration**: Move to Cloud SQL or Firestore
- **Email notifications**: Send alerts on new submissions
- **Admin authentication**: Protect `/admin` with login
- **Export functionality**: Export submissions to CSV/PDF
