# 🔒 Security & Configuration Guide

## Overview

This project implements a **secure serverless contact form** using Astro API Routes with comprehensive security measures to protect against spam, abuse, and credential exposure.

## 🛡️ Security Features Implemented

### 1. **Server-Side Processing**
- ✅ All email sending happens on the server (not client-side)
- ✅ Credentials are never exposed to the browser
- ✅ API endpoint validates and sanitizes all inputs

### 2. **Rate Limiting**
- ✅ **3 emails per hour** per IP address
- ✅ Automatic cleanup of expired rate limit records
- ✅ Returns `429 Too Many Requests` when limit exceeded

### 3. **Input Validation & Sanitization**
- ✅ Double validation (client + server)
- ✅ XSS prevention through input sanitization
- ✅ Email format validation
- ✅ Message length limits (10-2000 characters)
- ✅ Name validation (letters, spaces, basic punctuation only)

### 4. **Bot Protection**
- ✅ Honeypot fields (invisible to humans, visible to bots)
- ✅ Bots receive fake success responses
- ✅ Server-side bot detection logging

### 5. **CORS Protection**
- ✅ Only allows requests from authorized domains
- ✅ Blocks requests from unauthorized origins
- ✅ Configurable allowed origins list

### 6. **Error Handling**
- ✅ Never exposes internal errors to clients
- ✅ Comprehensive server-side logging
- ✅ User-friendly error messages

---

## 📋 Environment Variables Setup

### Required Variables

Create a `.env` file in the root directory with the following variables:

```env
# EmailJS Configuration (PRIVATE - Server-side only)
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here

# Google Analytics (Optional - Public)
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### ⚠️ Important Notes:

1. **DO NOT** prefix EmailJS variables with `PUBLIC_`
   - Variables without `PUBLIC_` prefix are **server-only**
   - They will never be exposed to the client

2. **Never commit `.env` to version control**
   - Already included in `.gitignore`
   - Use environment variables in your hosting platform

3. **Deployment Configuration**
   - Set these variables in your Vercel/Netlify dashboard
   - Use the exact same names (without `PUBLIC_` prefix)

---

## 🚀 Deployment Checklist

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:

```
EMAILJS_SERVICE_ID = your_service_id
EMAILJS_TEMPLATE_ID = your_template_id
EMAILJS_PUBLIC_KEY = your_public_key
```

4. Deploy or redeploy your project

### Netlify Deployment

1. Go to **Site settings** → **Environment variables**
2. Add the same variables as above
3. Trigger a new deployment

---

## 🔧 EmailJS Template Configuration

Your EmailJS template should include these variables:

```
{{from_name}}
{{from_email}}
{{to_email}}
{{phone}}
{{subject}}
{{event_type}}
{{message}}
```

### Recommended Template Structure:

**Subject:** New Contact Form Submission - {{subject}}

**Body:**
```
You have received a new contact form submission from Dito's Bartender website.

Contact Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Event Type: {{event_type}}

Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the Dito's Bartender contact form.
```

---

## 🧪 Testing the Contact Form

### Local Testing

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the contact page

3. Fill out the form and submit

4. Check the browser console for any errors

5. Check your email inbox for the test message

### Production Testing

1. Deploy to your hosting platform

2. Test the form on the live site

3. Verify rate limiting by submitting multiple times

4. Check server logs for any issues

---

## 📊 Monitoring & Logs

### Server Logs

The API endpoint logs the following events:

- ✅ Successful email sends (with sender email and IP)
- ⚠️ Rate limit violations (with IP address)
- ⚠️ Bot detection (with IP address)
- ❌ Configuration errors
- ❌ Email sending failures

### Recommended Monitoring

1. **Vercel/Netlify Logs**: Check function logs regularly
2. **EmailJS Dashboard**: Monitor email quota usage
3. **Google Analytics**: Track form submission events

---

## 🔐 Security Best Practices

### DO ✅

- Keep your `.env` file secure and never commit it
- Rotate your EmailJS credentials periodically
- Monitor your EmailJS quota to detect abuse
- Review server logs for suspicious activity
- Keep dependencies updated

### DON'T ❌

- Never expose EmailJS credentials in client-side code
- Don't increase rate limits too high (risk of spam)
- Don't disable input sanitization
- Don't remove CORS protection
- Don't ignore security warnings in logs

---

## 🆘 Troubleshooting

### "Server configuration error"
- **Cause**: Missing environment variables
- **Fix**: Verify all `EMAILJS_*` variables are set in your hosting platform

### "Too many requests"
- **Cause**: Rate limit exceeded (3 per hour per IP)
- **Fix**: Wait 1 hour or adjust rate limit in `src/pages/api/contact.ts`

### "Unauthorized origin"
- **Cause**: Request from unauthorized domain
- **Fix**: Add your domain to `allowedOrigins` in `src/pages/api/contact.ts`

### Emails not being received
- **Cause**: EmailJS configuration issue
- **Fix**: 
  1. Verify EmailJS credentials
  2. Check EmailJS dashboard for errors
  3. Verify email template configuration
  4. Check spam folder

---

## 📝 Migration from Old System

If you're migrating from the old client-side EmailJS implementation:

### Changes Made:

1. ✅ Removed `@emailjs/browser` imports from components
2. ✅ Removed `PUBLIC_` prefix from environment variables
3. ✅ Created secure API endpoint at `/api/contact`
4. ✅ Updated both English and Spanish contact forms
5. ✅ Added comprehensive security measures

### What to Update:

1. **Environment Variables**: Remove `PUBLIC_` prefix in your hosting platform
2. **Test Thoroughly**: Test the form in both languages
3. **Monitor**: Watch logs for the first few days after deployment

---

## 📞 Support

For issues or questions about the security implementation:
- Review this documentation
- Check server logs for error details
- Verify environment variables are correctly set
- Test in local development first

---

**Last Updated**: November 2025  
**Version**: 2.0 (Secure Serverless Implementation)
