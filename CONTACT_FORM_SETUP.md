# Contact Form Setup Guide

## Overview

The contact form system supports both **local file storage** (for development) and **Google Cloud Storage** (for production on Cloud Run).

## Development (Local)

By default, the system uses local file storage. Submissions are saved to:
```
/data/contact-submissions.json
```

No additional setup required! Just run:
```bash
npm run dev
```

## Production (Google Cloud Run)

For production deployments on Cloud Run, the system automatically uses **Google Cloud Storage** to persist submissions across container restarts.

### Setup Steps

1. **Create a Cloud Storage Bucket** (if it doesn't exist):
   ```bash
   gcloud storage buckets create gs://arcanedigitalshield-contact-submissions \
     --location=us-central1 \
     --project=YOUR_PROJECT_ID
   ```

2. **Grant Cloud Run Service Account Access**:
   The default Cloud Run service account needs permission to read/write to the bucket:
   ```bash
   # Get your service account email
   SERVICE_ACCOUNT=$(gcloud run services describe arcanedigitalshield-website \
     --region=us-central1 \
     --format='value(spec.template.spec.serviceAccountName)')
   
   # Grant storage permissions
   gcloud storage buckets add-iam-policy-binding gs://arcanedigitalshield-contact-submissions \
     --member="serviceAccount:${SERVICE_ACCOUNT}" \
     --role="roles/storage.objectAdmin"
   ```

3. **Set Environment Variable** (Optional):
   You can customize the bucket name by setting:
   ```bash
   gcloud run services update arcanedigitalshield-website \
     --region=us-central1 \
     --set-env-vars="GCS_BUCKET_NAME=your-custom-bucket-name"
   ```

### Automatic Behavior

The system automatically detects the environment:
- **Development**: Uses local file storage (`/data/contact-submissions.json`)
- **Production**: Uses Cloud Storage (bucket: `arcanedigitalshield-contact-submissions`)

If Cloud Storage is unavailable, it gracefully falls back to local storage.

## Admin Dashboard

Access the admin dashboard at:
```
http://localhost:3000/admin          (development)
https://your-domain.com/admin         (production)
```

Features:
- View all contact submissions
- Filter to show only unread messages
- Mark messages as read/unread
- See unread count
- Click email/phone to contact customers

## Troubleshooting

### Submissions Not Persisting in Production

1. **Check bucket exists**:
   ```bash
   gcloud storage buckets list --filter="name:arcanedigitalshield-contact-submissions"
   ```

2. **Check service account permissions**:
   ```bash
   gcloud storage buckets get-iam-policy gs://arcanedigitalshield-contact-submissions
   ```

3. **Check Cloud Run logs**:
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=arcanedigitalshield-website" --limit 50
   ```

### Fallback Behavior

If Cloud Storage fails, the system will:
1. Log a warning
2. Fall back to local file storage
3. Continue working (but data won't persist across restarts)

## Future Enhancements

When you're ready to scale, consider:
- **Database migration**: Move to Cloud SQL (PostgreSQL) or Firestore
- **Email notifications**: Send alerts when new submissions arrive
- **Admin authentication**: Add login protection for the admin page
- **Export functionality**: Export submissions to CSV/PDF
