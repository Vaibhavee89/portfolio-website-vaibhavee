# Deployment Guide - Vercel

## Prerequisites
- GitHub repository pushed with latest code
- Supabase project set up and running
- Admin user created in Supabase Auth

## Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select `Vaibhavee89/portfolio-website-vaibhavee`
   - Click "Import"

4. **Configure Project**:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_SUPABASE_URL=https://ncuvbphblhoulljlxcdx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdXZicGhibGhvdWxsamx4Y2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NDc1NzcsImV4cCI6MjA4NTUyMzU3N30.qFNDF-6k_kjScrytzI9ZM56coLRQ_oBwR6UJm7Kj2RA
   ```

6. **Deploy**: Click "Deploy" and wait ~2 minutes

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio-website-vaibhavee
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
# Paste: https://ncuvbphblhoulljlxcdx.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your anon key

# Deploy to production
vercel --prod
```

## Post-Deployment Steps

### 1. Configure Supabase for Production

Go to Supabase Dashboard → Authentication → URL Configuration:
- Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
- Add to **Redirect URLs**: `https://your-app.vercel.app/admin/**`

### 2. Test Your Deployment

Visit your deployed site:
- ✅ Public pages load correctly
- ✅ Projects display from database
- ✅ Admin login works: `https://your-app.vercel.app/admin/login`
- ✅ Can create/edit/delete content in admin panel
- ✅ Changes reflect on public site in real-time

### 3. Set Up Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain (e.g., `vaibhavee.dev`)
3. Update DNS records as instructed
4. Update Supabase redirect URLs with new domain

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment

## Environment Variables Management

To update environment variables:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit or add new variables
3. Redeploy for changes to take effect

Or via CLI:
```bash
vercel env add VARIABLE_NAME
vercel env rm VARIABLE_NAME
vercel env ls
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check browser console for connection errors

### Admin Panel Not Working
- Verify Supabase URL is added to redirect URLs
- Check RLS policies are set correctly
- Ensure admin user exists in Supabase Auth

### 404 on Routes
Vercel should auto-configure for SPA routing. If not, create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Monitoring

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → [deployment] → Logs
- **Performance**: Use Vercel Speed Insights

## Rollback

If deployment has issues:
1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Only `VITE_SUPABASE_ANON_KEY` is exposed (safe for client)
- ✅ RLS policies protect database
- ✅ Admin routes require authentication
- ✅ HTTPS enabled (automatic on Vercel)

## Cost

- **Vercel**: Free tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Custom domains

- **Supabase**: Free tier includes:
  - 500MB database
  - 1GB file storage
  - 50,000 monthly active users

Both are sufficient for a portfolio website!
