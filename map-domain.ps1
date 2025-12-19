# Domain Mapping Script for Arcane Digital Shield Website

Write-Host "🌐 Setting up domain mapping for arcanedigitalshield.com..." -ForegroundColor Green

# Configuration
$SERVICE_NAME = "arcanedigitalshield-website"
$DOMAIN = "arcanedigitalshield.com"
$REGION = "us-central1"

# Check if domain mapping already exists
Write-Host "📋 Checking existing domain mappings..." -ForegroundColor Yellow
$existingMappings = gcloud beta run domain-mappings list --region=$REGION --format="value(metadata.name)" 2>$null

if ($existingMappings -contains $DOMAIN) {
    Write-Host "✅ Domain mapping for $DOMAIN already exists!" -ForegroundColor Green
} else {
    Write-Host "🔗 Creating domain mapping..." -ForegroundColor Yellow
    
    # Create the domain mapping
    $result = gcloud beta run domain-mappings create --service=$SERVICE_NAME --domain=$DOMAIN --region=$REGION 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Domain mapping created successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to create domain mapping: $result" -ForegroundColor Red
        exit 1
    }
}

# Get the mapping details
Write-Host "📋 Domain mapping details:" -ForegroundColor Yellow
gcloud beta run domain-mappings describe $DOMAIN --region=$REGION

Write-Host "`n🌐 Next steps:" -ForegroundColor Green
Write-Host "1. Update your DNS records to point to the provided CNAME" -ForegroundColor White
Write-Host "2. Wait for DNS propagation (can take up to 48 hours)" -ForegroundColor White
Write-Host "3. Your site will be available at https://$DOMAIN" -ForegroundColor White 