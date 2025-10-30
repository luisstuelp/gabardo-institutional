# Pre-Deploy Checklist ✅

## 1. Supabase Configuration

### Database Tables & Functions
- [ ] Run migration: `migrations/20251030_add_content_metrics.sql` in Supabase SQL Editor
- [ ] Run migration: `migrations/20251030_add_post_fields.sql` in Supabase SQL Editor ⚠️ **CRITICAL**
- [ ] Run migration: `migrations/20251030_add_midia_fields.sql` in Supabase SQL Editor (optional)
- [ ] Verify tables exist: `posts`, `midia`, `post_metrics`, `midia_metrics`, `user_roles`
- [ ] Verify RPC functions: `increment_post_metric`, `increment_midia_metric`, `has_role`, `is_admin`
- [ ] Verify new columns in posts: `featured`, `category`, `tags`, `author`, `read_time`, `seo_description`, `seo_keywords`

### Row Level Security (RLS)
Choose one option:

**Option A - Disable RLS (Simpler for Public Content)**
```sql
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE midia DISABLE ROW LEVEL SECURITY;
ALTER TABLE post_metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE midia_metrics DISABLE ROW LEVEL SECURITY;
```

**Option B - Enable RLS with Policies (More Secure)**
```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE midia ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE midia_metrics ENABLE ROW LEVEL SECURITY;

-- Allow public SELECT on published content
CREATE POLICY "Public can view published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view midia" ON midia
  FOR SELECT USING (true);

CREATE POLICY "Public can view post metrics" ON post_metrics
  FOR SELECT USING (true);

CREATE POLICY "Public can view midia metrics" ON midia_metrics
  FOR SELECT USING (true);

-- Allow service role to insert/update metrics
CREATE POLICY "Service role can manage post metrics" ON post_metrics
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage midia metrics" ON midia_metrics
  FOR ALL USING (auth.role() = 'service_role');
```

### Storage
- [ ] Create bucket: `content-images` (or your preferred name)
- [ ] Set bucket to **Public**
- [ ] Configure allowed file types: jpg, jpeg, png, gif, webp, svg
- [ ] Set max file size (recommended: 10MB)

## 2. Environment Variables

### Local Development (.env.local)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `EMAIL_SERVICE_API_KEY` (if using email service)
- [ ] `EMAIL_TO`
- [ ] `ADMIN_SESSION_SECRET`

### Vercel Production
- [ ] All environment variables added
- [ ] Sensitive variables marked as "Sensitive"
- [ ] Variables available in production environment

## 3. Data Migration

### Option A: Manual Entry via Admin Dashboard
- [ ] Login to `/admin`
- [ ] Create blog posts
- [ ] Create media articles
- [ ] Upload images to storage

### Option B: Bulk Import (if needed)
- [ ] Create seed script from `src/data/blogData.ts`
- [ ] Run seed script with Supabase client
- [ ] Verify data in Supabase dashboard

## 4. Code Quality

- [ ] Run `npm run build` locally - build succeeds
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run type-check` (if available) - no errors
- [ ] All images referenced exist or have fallbacks
- [ ] No console.errors in production build

## 5. Functional Testing

### Public Pages
- [ ] `/` - Home page loads
- [ ] `/sobre` - About page works
- [ ] `/servicos` - Services page works
- [ ] `/contato` - Contact form submits
- [ ] `/blog` - Lists posts from Supabase
- [ ] `/blog/[slug]` - Individual post renders
- [ ] `/midia` - Lists media articles from Supabase

### Admin Dashboard
- [ ] `/admin` - Login page appears
- [ ] Login with admin credentials works
- [ ] `/admin/blog/posts` - Lists posts
- [ ] Create new post - successful
- [ ] Edit existing post - successful
- [ ] Delete post - successful
- [ ] Upload image - successful
- [ ] `/admin/midia/artigos` - All CRUD operations work
- [ ] `/admin/metricas` - Displays metrics data

### Metrics Tracking
- [ ] View a blog post → wait 3s → check `post_metrics.views` incremented
- [ ] Click social share button → check `post_metrics.shares` incremented
- [ ] Click external media link → check `midia_metrics.external_clicks` incremented

## 6. Performance & SEO

- [ ] Lighthouse score > 90 (Performance)
- [ ] Images optimized (using next/image)
- [ ] Meta tags present on all pages
- [ ] OpenGraph tags for social sharing
- [ ] Favicon and app icons present
- [ ] Sitemap.xml generated (if applicable)
- [ ] robots.txt configured

## 7. Security

- [ ] No API keys exposed in client code
- [ ] Service role key only used in server components/API routes
- [ ] Admin routes protected with session checks
- [ ] CORS configured properly
- [ ] Content Security Policy headers (optional but recommended)

## 8. Monitoring & Analytics

- [ ] Vercel Analytics enabled (optional)
- [ ] Supabase logs retention configured
- [ ] Error tracking setup (Sentry/LogRocket - optional)
- [ ] Uptime monitoring (optional)

## 9. Final Vercel Deployment

- [ ] Git repository connected to Vercel
- [ ] Build settings configured:
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Environment variables set
- [ ] Deploy to production
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

## 10. Post-Deploy Validation

- [ ] Visit production URL - site loads
- [ ] Test blog post view - metrics tracked
- [ ] Test media article click - metrics tracked
- [ ] Test admin login on production
- [ ] Test quote form submission
- [ ] Verify images load from Supabase storage
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Test in different browsers (Chrome, Firefox, Safari)

## Emergency Rollback

If issues occur:
1. Revert to previous deployment in Vercel dashboard
2. Check logs: `vercel logs --prod`
3. Verify Supabase connection
4. Check environment variables
5. Review recent database changes

## Support Contacts

- **Vercel Support**: https://vercel.com/help
- **Supabase Support**: https://supabase.com/docs/support
- **Team**: [Add your team contacts here]

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Production URL**: _______________
**Notes**: _______________
