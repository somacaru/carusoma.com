# How to Find Your Google Cloud Project ID

## Quick Commands

### 1. Check Current Project
```bash
gcloud config get-value project
```

This shows the project ID that's currently set in your gcloud configuration.

### 2. List All Your Projects
```bash
gcloud projects list
```

This shows all projects you have access to, including:
- **Project ID** (what you need for deployment)
- **Project Name** (display name)
- **Project Number** (internal number)

### 3. List Projects with More Details
```bash
gcloud projects list --format="table(projectId,name,projectNumber)"
```

This gives you a cleaner table view.

### 4. Search for Projects with "arcanedigitalshield" in the Name
```bash
gcloud projects list --filter="name:arcanedigitalshield OR projectId:arcanedigitalshield"
```

This filters projects that contain "arcanedigitalshield" in either the name or project ID.

## Finding Your Project in Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Look at the top bar** - The project selector shows your current project
3. **Click the project selector** - This shows all your projects
4. **Look for the Project ID** - It's usually shown in parentheses or as a separate column

## Common Project ID Patterns

Your project ID might be:
- `arcanedigitalshield-com`
- `arcanedigitalshield-website`
- `arcanedigitalshield-production`
- Or something completely different

## Setting Your Project

Once you find your project ID, set it:

```bash
gcloud config set project YOUR_PROJECT_ID
```

## Verify It's Set Correctly

```bash
# Check current project
gcloud config get-value project

# List Cloud Run services (to verify you're in the right project)
gcloud run services list --region=us-central1
```

## If You Don't Have a Project Yet

Create a new project:

```bash
# Create a new project
gcloud projects create arcanedigitalshield-production --name="Arcane Digital Shield Website"

# Set it as your current project
gcloud config set project arcanedigitalshield-production

# Enable billing (required for Cloud Run)
# You'll need to do this in the console or with:
gcloud billing projects link arcanedigitalshield-production --billing-account=YOUR_BILLING_ACCOUNT_ID
```

## Check Your Deploy Scripts

Your deployment scripts might already have the project ID:

```bash
# Check deploy.sh
grep PROJECT_ID deploy.sh

# Check deploy.ps1
grep PROJECT_ID deploy.ps1

# Check cloudbuild.yaml
grep PROJECT_ID cloudbuild.yaml
```

Based on your files, it looks like it might be: `arcanedigitalshield-production`
