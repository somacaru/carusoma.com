# Domain Setup Guide for arcanedigitalshield.com

This guide will help you map your custom domain `arcanedigitalshield.com` to your Google Cloud Run service.

## Current Status
- ✅ Website deployed to Google Cloud Run
- ✅ Service URL: https://arcanedigitalshield-website-j2z6yswc3a-uc.a.run.app
- ✅ Domain mapping created in Google Cloud

## Important: Nameserver Requirements

**If you are currently using custom nameservers (like Vercel):**
1. Log in to your domain registrar (GoDaddy)
2. Change nameservers back to your registrar's default nameservers
3. Wait for nameserver propagation (2-24 hours)
4. Then proceed with DNS record configuration below

## Step 1: Verify Domain Ownership (Optional)

Domain verification through Google Search Console is optional for Cloud Run but recommended:

### Google Search Console Verification
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account (same account used for Google Cloud)
3. Add your domain: `arcanedigitalshield.com`
4. Choose verification method:
   - **DNS record**: Add TXT record to your domain's DNS (recommended)
   - **HTML file**: Download and upload to your domain
   - **HTML tag**: Add meta tag to your website's `<head>` section

## Step 2: Map Domain to Cloud Run

The domain mapping has already been created. You can verify it with:

```powershell
gcloud beta run domain-mappings list --region=us-central1
```

## Step 3: Update DNS Records

Add these DNS records to your domain registrar (GoDaddy):

### Required A Records (IPv4) for Root Domain
Add all four of these A records:

```
Name: @ (or arcanedigitalshield.com)
Type: A
Value: 216.239.32.21
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: A
Value: 216.239.34.21
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: A
Value: 216.239.36.21
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: A
Value: 216.239.38.21
TTL: 3600 (or default)
```

### Required AAAA Records (IPv6) for Root Domain
Add all four of these AAAA records:

```
Name: @ (or arcanedigitalshield.com)
Type: AAAA
Value: 2001:4860:4802:32::15
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: AAAA
Value: 2001:4860:4802:34::15
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: AAAA
Value: 2001:4860:4802:36::15
TTL: 3600 (or default)

Name: @ (or arcanedigitalshield.com)
Type: AAAA
Value: 2001:4860:4802:38::15
TTL: 3600 (or default)
```

### CNAME Record for www Subdomain
```
Name: www
Type: CNAME
Value: ghs.googlehosted.com
TTL: 3600 (or default)
```

### DNS Record Tips for GoDaddy:
- Use `@` in the Name field to refer to your root domain
- If `@` doesn't work, try using `arcanedigitalshield.com` or leave the field blank
- Make sure to add ALL the A and AAAA records above
- Delete any existing A records that point to other IP addresses

## Step 4: SSL Certificate

Google Cloud Run automatically provisions SSL certificates for verified domains. The process typically takes 15 minutes to 48 hours after DNS propagation.

## Step 5: Test Your Domain

Once DNS propagation is complete (can take up to 48 hours), test:

- https://arcanedigitalshield.com
- https://www.arcanedigitalshield.com

## Troubleshooting

### Common Issues

1. **Using Custom Nameservers**
   - If you're using Vercel or other custom nameservers, switch back to your registrar's default nameservers first
   - Wait for nameserver propagation before adding DNS records

2. **DNS Not Propagated**
   - DNS changes can take 24-48 hours
   - Use tools like `nslookup` or `dig` to check propagation
   - Test with: `nslookup arcanedigitalshield.com 8.8.8.8`

3. **SSL Certificate Issues**
   - SSL certificates are provisioned automatically after DNS verification
   - Can take up to 48 hours after domain mapping
   - Check certificate status in Google Cloud Console

4. **Mixed IP Addresses**
   - Make sure all A records use the new Google Cloud IP addresses
   - Remove any old A records pointing to other services

### Verification Commands

```powershell
# Check domain mappings
gcloud beta run domain-mappings list --region=us-central1

# Check domain mapping status
gcloud beta run domain-mappings describe --domain=arcanedigitalshield.com --region=us-central1

# Check domain verification status (if you verified through Search Console)
gcloud domains list-user-verified
```

### DNS Testing Commands

```powershell
# Test DNS resolution
nslookup arcanedigitalshield.com
nslookup www.arcanedigitalshield.com

# Test with Google's DNS server
nslookup arcanedigitalshield.com 8.8.8.8

# Test specific record types
nslookup -type=A arcanedigitalshield.com
nslookup -type=AAAA arcanedigitalshield.com
```

## Expected Timeline

1. **Nameserver Change**: 2-24 hours (if switching from custom nameservers)
2. **DNS Record Addition**: 5-10 minutes to add records
3. **DNS Propagation**: 2-48 hours
4. **SSL Certificate**: 15 minutes to 48 hours after DNS verification

## Final Result

After completion, your website will be accessible at:
- **Primary**: https://arcanedigitalshield.com
- **Alternative**: https://www.arcanedigitalshield.com
- **Fallback**: https://arcanedigitalshield-website-j2z6yswc3a-uc.a.run.app

## Support

If you encounter issues:
1. Check the [Google Cloud Run documentation](https://cloud.google.com/run/docs/mapping-custom-domains)
2. Verify DNS settings with your domain registrar
3. Contact your domain registrar's support if DNS issues persist
4. Check Google Cloud Console for domain mapping status 