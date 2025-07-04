# Google Cloud Deployment Setup Guide

This guide will help you deploy your CarusoMA website to Google Cloud Run.

## Prerequisites

### 1. Google Cloud Account
- Create a Google Cloud account at [console.cloud.google.com](https://console.cloud.google.com/)
- Enable billing for your account

### 2. Install Google Cloud SDK
**Windows:**
```powershell
# Download and install from: https://cloud.google.com/sdk/docs/install
# Or use winget:
winget install Google.CloudSDK
```

**macOS:**
```bash
# Using Homebrew
brew install --cask google-cloud-sdk
```

**Linux:**
```bash
# Follow instructions at: https://cloud.google.com/sdk/docs/install
```

### 3. Install Docker Desktop
- Download from [docker.com](https://www.docker.com/products/docker-desktop)
- Install and start Docker Desktop
- Ensure Docker is running

## Setup Steps

### 1. Initialize Google Cloud SDK
```bash
gcloud init
```
- Follow the prompts to authenticate
- Select or create a project
- Choose a default region (recommend: us-central1)

### 2. Enable Required APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Configure Docker for Google Cloud
```bash
gcloud auth configure-docker
```

### 4. Update Deployment Configuration

Edit `deploy.ps1` (Windows) or `deploy.sh` (Linux/macOS):
```powershell
# Replace "your-project-id" with your actual project ID
$PROJECT_ID = "your-actual-project-id"
```

You can find your project ID in the Google Cloud Console or by running:
```bash
gcloud config get-value project
```

## Deployment

### Quick Deployment (Windows)
```powershell
.\deploy.ps1
```

### Quick Deployment (Linux/macOS)
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment
```bash
# 1. Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/carusoma-website .

# 2. Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/carusoma-website

# 3. Deploy to Cloud Run
gcloud run deploy carusoma-website \
  --image gcr.io/YOUR_PROJECT_ID/carusoma-website \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000
```

## Automated Deployment with Cloud Build

For continuous deployment, you can use Google Cloud Build:

```bash
# Submit build
gcloud builds submit --config cloudbuild.yaml
```

## Configuration Options

### Environment Variables
You can set environment variables in your Cloud Run service:
```bash
gcloud run services update carusoma-website \
  --set-env-vars NODE_ENV=production
```

### Custom Domain
To use a custom domain:
1. Map your domain in Cloud Run
2. Update DNS records
3. Configure SSL certificate

```bash
gcloud run domain-mappings create \
  --service carusoma-website \
  --domain your-domain.com \
  --region us-central1
```

### Scaling Configuration
Adjust scaling parameters:
```bash
gcloud run services update carusoma-website \
  --max-instances 20 \
  --min-instances 1 \
  --cpu 2 \
  --memory 1Gi
```

## Monitoring and Logs

### View Logs
```bash
gcloud logs read --service=carusoma-website --limit=50
```

### Monitor Performance
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to Cloud Run > carusoma-website
- View metrics and logs

## Cost Optimization

### Free Tier
- Google Cloud Run offers a generous free tier
- 2 million requests per month
- 360,000 vCPU-seconds
- 180,000 GiB-seconds of memory

### Cost Monitoring
```bash
# View current costs
gcloud billing accounts list
gcloud billing budgets list
```

## Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Docker Build Fails**
   - Ensure Docker Desktop is running
   - Check Dockerfile syntax
   - Verify all dependencies are in package.json

3. **Deployment Fails**
   - Check logs: `gcloud logs read --service=carusoma-website`
   - Verify project ID is correct
   - Ensure APIs are enabled

4. **Service Not Accessible**
   - Check if service is deployed: `gcloud run services list`
   - Verify `--allow-unauthenticated` flag is set
   - Check service URL in Cloud Console

### Getting Help
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Run Troubleshooting](https://cloud.google.com/run/docs/troubleshooting)
- [Google Cloud Support](https://cloud.google.com/support)

## Next Steps

After successful deployment:
1. Test your website at the provided URL
2. Set up monitoring and alerts
3. Configure custom domain (optional)
4. Set up CI/CD pipeline (optional)
5. Configure backup and disaster recovery 