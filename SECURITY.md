# API Security Configuration Guide
# This file provides security guidelines for API key management

## Google Maps API Security Checklist

### 1. API Key Restrictions (CRITICAL - Set in Google Cloud Console)

#### Application Restrictions:
- **Development**: None (localhost only)
- **Production**: HTTP referrers
  - https://yourdomain.com/*
  - https://*.yourdomain.com/*
  - https://*.netlify.app/* (for preview deploys)

#### API Restrictions:
Enable ONLY the APIs you need:
- ✅ Maps JavaScript API
- ✅ Places API  
- ✅ Geocoding API
- ❌ Disable all other APIs

### 2. Minimal Permissions Setup

#### Places API Scope:
- Use Place Search only (not Place Details unless needed)
- Limit to specific place types if possible
- Set reasonable radius limits

#### Maps JavaScript API:
- Restrict to specific map types if possible
- Disable Street View if not used

### 3. Usage Monitoring & Quotas

#### Set Quotas (Recommended):
```
Maps JavaScript API: 25,000 loads/day
Places API: 1,000 searches/day  
Geocoding API: 2,500 requests/day
```

#### Enable Alerts:
- 80% quota usage warning
- Unexpected traffic spikes
- Suspicious usage patterns

### 4. Key Rotation Schedule

#### Recommended Rotation:
- **Development**: Every 90 days
- **Production**: Every 30-60 days
- **Incident Response**: Immediately

#### Rotation Process:
1. Generate new key in Google Cloud Console
2. Update environment variables
3. Deploy with new key
4. Monitor for 24-48 hours
5. Delete old key

### 5. Network Security

#### IP Whitelisting (Optional):
Only if your app runs from fixed IPs:
- Add your server IPs to Google Cloud Console
- Include CI/CD pipeline IPs
- Update list when infrastructure changes

### 6. Monitoring & Alerting

#### Set up monitoring for:
- Unusual API usage patterns
- Failed requests from unknown sources
- Geographic anomalies in requests
- Rate limit violations

### 7. Environment-Specific Configuration

#### Development:
- Separate API key for dev environment
- Looser restrictions for testing
- Lower quotas to prevent accidental overuse

#### Production:
- Strict domain restrictions
- Monitoring and alerting enabled
- Regular key rotation

### 8. Incident Response Plan

#### If API key is compromised:
1. Immediately disable key in Google Cloud Console
2. Generate new key with same restrictions
3. Update application environment variables
4. Deploy immediately
5. Monitor for unauthorized usage
6. Review access logs

#### Recovery checklist:
- [ ] Old key disabled
- [ ] New key generated
- [ ] Restrictions applied to new key  
- [ ] Application updated and deployed
- [ ] Monitoring active
- [ ] Access logs reviewed

## Additional Security Resources

- Google Maps Platform Security Guide: https://developers.google.com/maps/api-security-best-practices
- GitGuardian Secrets Management: https://blog.gitguardian.com/secrets-api-management/
- OWASP API Security: https://owasp.org/www-project-api-security/