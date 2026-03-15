# Email Notification Setup Guide

This guide explains how to configure email notifications for the contact form.

## Overview

When someone submits the contact form, you'll receive an email notification with:
- Customer's name, email, phone, company
- Their message
- Quick reply buttons
- Link to admin dashboard

## Prerequisites

- Google Workspace account (you have this: `a.caruso@arcanedigitalshield.com`)
- Google Cloud project (where your site is deployed)
- Access to Google Cloud Console

---

## Step 1: Create a Google App Password

Since Google Workspace uses 2FA, you need an "App Password" for SMTP access.

1. **Go to your Google Account settings**
   - Visit: https://myaccount.google.com/
   - Sign in as `a.caruso@arcanedigitalshield.com`

2. **Navigate to Security**
   - Click "Security" in the left sidebar

3. **Enable 2-Step Verification** (if not already enabled)
   - Under "How you sign in to Google"
   - Click "2-Step Verification" and follow the prompts

4. **Create an App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Or search "App passwords" in your Google Account
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter: "Arcane Digital Shield Website"
   - Click "Generate"
   - **COPY THE 16-CHARACTER PASSWORD** (you won't see it again!)

---

## Step 2: Store Secrets in Google Cloud Secret Manager

We store sensitive credentials in Secret Manager, not in code.

### Open Cloud Console

1. Go to: https://console.cloud.google.com/
2. Select your project (the one running your website)

### Create Secrets

Run these commands in Cloud Shell (click the `>_` icon in the top right of Cloud Console):

```bash
# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Create the SMTP user secret
echo -n "a.caruso@arcanedigitalshield.com" | gcloud secrets create smtp-user --data-file=-

# Create the SMTP App Password secret (replace with your actual App Password)
echo -n "YOUR_16_CHAR_APP_PASSWORD" | gcloud secrets create smtp-app-password --data-file=-

# Create the notification email secret
echo -n "a.caruso@arcanedigitalshield.com" | gcloud secrets create notification-email --data-file=-
```

### Grant Cloud Run Access to Secrets

```bash
# Get your Cloud Run service account
SERVICE_ACCOUNT=$(gcloud run services describe arcanedigitalshield-website \
  --region=us-central1 \
  --format='value(spec.template.spec.serviceAccountName)')

# If empty, use the default compute service account
if [ -z "$SERVICE_ACCOUNT" ]; then
  PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')
  SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
fi

echo "Service Account: $SERVICE_ACCOUNT"

# Grant access to each secret
for SECRET in smtp-user smtp-app-password notification-email; do
  gcloud secrets add-iam-policy-binding $SECRET \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"
done
```

---

## Step 3: Create Cloud Storage Bucket

This stores contact form submissions for the admin dashboard.

```bash
# Create the bucket
gcloud storage buckets create gs://arcanedigitalshield-contact-submissions \
  --location=us-central1 \
  --project=$(gcloud config get-value project)

# Grant Cloud Run access
gcloud storage buckets add-iam-policy-binding gs://arcanedigitalshield-contact-submissions \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/storage.objectAdmin"
```

---

## Step 4: Redeploy the Website

After setting up secrets, redeploy to apply changes:

```bash
# Option 1: Trigger Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Option 2: If you have the deploy script
./deploy.sh
```

---

## Step 5: Test the Contact Form

1. Go to https://arcanedigitalshield.com/contact
2. Fill out the form with test data
3. Submit
4. Check your email for the notification
5. Check https://arcanedigitalshield.com/admin to see the submission

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_USER` | Your Google Workspace email | `a.caruso@arcanedigitalshield.com` |
| `SMTP_APP_PASSWORD` | 16-char App Password from Google | `abcd efgh ijkl mnop` |
| `NOTIFICATION_EMAIL` | Where to send notifications | `a.caruso@arcanedigitalshield.com` |
| `NOTIFICATION_CC_EMAIL` | Optional CC recipient | `support@arcanedigitalshield.com` |
| `GCS_BUCKET_NAME` | Cloud Storage bucket | `arcanedigitalshield-contact-submissions` |

---

## Optional: Add CC Recipient (Support Email)

If you want notifications to also go to a group/support email:

```bash
# Create the CC email secret
echo -n "support@arcanedigitalshield.com" | gcloud secrets create notification-cc-email --data-file=-

# Grant access
gcloud secrets add-iam-policy-binding notification-cc-email \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"
```

Then update `cloudbuild.yaml` to include it in `--set-secrets`.

---

## Troubleshooting

### Email not sending?

1. **Check Cloud Run logs**:
   ```bash
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=arcanedigitalshield-website" --limit 50
   ```

2. **Verify secrets are accessible**:
   ```bash
   gcloud secrets versions access latest --secret=smtp-user
   ```

3. **Check App Password is correct**:
   - Go to https://myaccount.google.com/apppasswords
   - Revoke and create a new one if needed

### Submissions not appearing in admin?

1. **Check bucket exists**:
   ```bash
   gcloud storage buckets list --filter="name:arcanedigitalshield-contact-submissions"
   ```

2. **Check permissions**:
   ```bash
   gcloud storage buckets get-iam-policy gs://arcanedigitalshield-contact-submissions
   ```

---

## Security Notes

- App Passwords are stored encrypted in Secret Manager
- Never commit credentials to git
- The App Password only works for SMTP, not full account access
- You can revoke App Passwords anytime at https://myaccount.google.com/apppasswords

---

**Last Updated**: January 2026
