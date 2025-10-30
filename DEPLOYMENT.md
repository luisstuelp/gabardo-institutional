# Deployment Guide - Gabardo Institutional Website

## Pre-Deployment Checklist

### 1. Supabase Setup

#### Create Tables
Run the following migration in Supabase SQL Editor:

```sql
-- Run the migration file: migrations/20251030_add_content_metrics.sql
```

#### Configure Row Level Security (RLS)
For public tables (posts, midia), either:
- **Option A**: Disable RLS (simpler for public content)
- **Option B**: Enable RLS with SELECT policy for published content:

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE midia ENABLE ROW LEVEL SECURITY;

-- Allow public SELECT on published posts
CREATE POLICY "Public posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true);

-- Allow public SELECT on midia
CREATE POLICY "Public midia are viewable by everyone" ON midia
  FOR SELECT USING (true);
```

#### Storage Configuration
1. Create a storage bucket named `content-images` (or your preferred name)
2. Set bucket to **public** ✅ CRITICAL
3. Configure storage policies (see below)
4. Update file size limits: recommended 10MB max

**Storage Policies (Required for uploads):**
```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-images');

-- Allow public read access
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'content-images');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'content-images');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'content-images');
```

⚠️ **Without these policies, image uploads will fail!**

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Email Service
EMAIL_SERVICE_API_KEY=your-api-key
EMAIL_TO=contact@gabardo.com

# Admin
ADMIN_SESSION_SECRET=generate-random-secret-here
```

**In Vercel:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Mark sensitive keys (SERVICE_ROLE_KEY, API keys) as **Sensitive**

### 3. Database Seed (Optional)

If migrating from static data:
1. Use the admin dashboard to create posts/midia manually
2. Or create a seed script to bulk insert from `src/data/blogData.ts` and `src/data/mediaArticles.ts`

### 4. Vercel Deployment

#### First Time Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

#### Auto-Deploy from Git
1. Connect repository in Vercel dashboard
2. Configure build settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add environment variables
4. Deploy automatically on push to `main`

### 5. Post-Deployment Testing

#### Critical Paths to Test
- [ ] Home page loads
- [ ] `/blog` displays posts from Supabase
- [ ] `/blog/[slug]` displays individual post
- [ ] `/midia` displays media articles
- [ ] `/admin` login works
- [ ] `/admin/blog/posts` CRUD operations
- [ ] `/admin/midia/artigos` CRUD operations
- [ ] `/admin/metricas` displays metrics
- [ ] Quote form submission
- [ ] Image uploads in admin forms
- [ ] Metrics tracking (check Supabase tables)

#### Metrics Validation
1. Visit a blog post → wait 2s → check `post_metrics` table for view increment
2. Click social share → check for share increment
3. Click media article external link → check `midia_metrics` for click increment

### 6. Performance Optimization

- [ ] Enable Vercel Analytics
- [ ] Configure Image Optimization domains in `next.config.js`
- [ ] Set up CDN for Supabase storage if needed
- [ ] Enable caching headers
- [ ] Monitor Core Web Vitals

### 7. SEO & Monitoring

- [ ] Submit sitemap to Google Search Console
- [ ] Verify OpenGraph meta tags
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure Supabase log retention
- [ ] Set up uptime monitoring

## Common Issues

### Issue: 500 Error on API Routes
- **Cause**: Missing environment variables
- **Fix**: Verify all `NEXT_PUBLIC_*` and service role keys are set in Vercel

### Issue: Images Not Loading
- **Cause**: Supabase storage bucket not public or CORS misconfigured
- **Fix**: Check bucket policies and add domain to allowed origins

### Issue: Metrics Not Tracking
- **Cause**: RPC functions not created or incorrect permissions
- **Fix**: Re-run migration, verify functions exist in Supabase dashboard

### Issue: Admin Login Fails
- **Cause**: Cookie settings or session secret not configured
- **Fix**: Verify `ADMIN_SESSION_SECRET` is set and cookies are allowed

## Rollback Plan

If deployment fails:
1. Revert to previous Vercel deployment via dashboard
2. Check Vercel logs for errors
3. Verify Supabase connection
4. Roll back database migrations if needed

## Support

For deployment issues:
- Check Vercel logs: `vercel logs`
- Check Supabase logs in dashboard
- Review migration status in Supabase SQL Editor
