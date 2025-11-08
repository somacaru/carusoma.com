# How to Find Your Google Cloud Project ID

## Quick Commands (PowerShell)

### 1. Check Current Project
```powershell
gcloud config get-value project
```

This shows the project ID that's currently set in your gcloud configuration.

### 2. List All Your Projects
```powershell
gcloud projects list
```

This shows all projects you have access to, including:
- **Project ID** (what you need for deployment)
- **Project Name** (display name)
- **Project Number** (internal number)

### 3. List Projects with More Details
```powershell
gcloud projects list --format="table(projectId,name,projectNumber)"
```

This gives you a cleaner table view.

### 4. Search for Projects with "carusoma" in the Name
```powershell
gcloud projects list --filter="name:carusoma OR projectId:carusoma"
```

This filters projects that contain "carusoma" in either the name or project ID.

## Finding Your Project in Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Look at the top bar** - The project selector shows your current project
3. **Click the project selector** - This shows all your projects
4. **Look for the Project ID** - It's usually shown in parentheses or as a separate column

## Common Project ID Patterns

Your project ID might be:
- `carusoma-com`
- `carusoma-website`
- `carusoma-production`
- `carusoma-production-website` (based on your deploy.sh file)
- Or something completely different

## Setting Your Project

Once you find your project ID, set it:

```powershell
gcloud config set project YOUR_PROJECT_ID
```

## Verify It's Set Correctly

```powershell
# Check current project
gcloud config get-value project

# List Cloud Run services (to verify you're in the right project)
gcloud run services list --region=us-central1
```

## If You Don't Have a Project Yet

Create a new project:

```powershell
# Create a new project
gcloud projects create carusoma-com --name="CarusoMA Website"

# Set it as your current project
gcloud config set project carusoma-com

# Enable billing (required for Cloud Run)
# You'll need to do this in the console or with:
gcloud billing projects link carusoma-com --billing-account=YOUR_BILLING_ACCOUNT_ID
```

## Check Your Deploy Scripts

Your deployment scripts might already have the project ID:

```powershell
# Check deploy.ps1 (PowerShell script)
Select-String -Path deploy.ps1 -Pattern "PROJECT_ID"

# Or view the file
Get-Content deploy.ps1 | Select-String "PROJECT_ID"

# Check deploy.sh (bash script - if you have Git Bash)
Select-String -Path deploy.sh -Pattern "PROJECT_ID"

# Check cloudbuild.yaml
Select-String -Path cloudbuild.yaml -Pattern "PROJECT_ID"
```

Based on your files, it looks like it might be: `carusoma-production-website`
