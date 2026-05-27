# Scribd SaaS Platform — Complete Build

A production-ready Scribd-like document sharing platform. Built on Next.js 16 App Router, Supabase, Cloudflare R2, and Razorpay.

## ✅ Build Status
`npm run build` — **PASSING** (20 routes, Exit 0)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
cd e:/scribd
npm install
```

### 2. Set Environment Variables
Copy `.env.example` → `.env.local` and fill in your real credentials:

```bash
cp .env.example .env.local
```

| Variable | Where to find |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard > Settings > API |
| `R2_ACCOUNT_ID` | Cloudflare Dashboard > R2 |
| `R2_ACCESS_KEY_ID` | Cloudflare Dashboard > R2 > Manage API Tokens |
| `R2_SECRET_ACCESS_KEY` | Same as above |
| `R2_BUCKET_NAME` | Name of your R2 bucket |
| `R2_PUBLIC_URL` | Cloudflare Dashboard > R2 Bucket > Settings > Public URL |
| `RAZORPAY_KEY_ID` | Razorpay Dashboard > Settings > API Keys |
| `RAZORPAY_KEY_SECRET` | Same as above |

### 3. Set Up Supabase Database
1. Go to [supabase.com](https://supabase.com) → your project → **SQL Editor**
2. Open and run: `supabase/migration.sql`
3. This creates all tables, RLS policies, triggers, and seed data

### 4. Set Up Cloudflare R2
1. Go to Cloudflare Dashboard → **R2 Object Storage**
2. Create a bucket named `scribd-docs`
3. Enable **Public Access** on the bucket
4. Copy the public URL to `.env.local`

### 5. Supabase Auth Setup
1. Go to Supabase Dashboard → **Authentication > Providers**
2. Email provider is enabled by default
3. (Optional) Enable Google OAuth: add Google Client ID/Secret

### 6. Run Locally
```bash
npm run dev
# App runs at http://localhost:3000
```

### 7. Promote First Admin
After registering your first account, run in Supabase SQL Editor:
```sql
UPDATE public.profiles SET role = 'admin' WHERE id = 'YOUR_USER_UUID';
```

---

## 📦 Deploy to Vercel

1. Push code to GitHub
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in Vercel Project Settings > Environment Variables
4. Vercel auto-deploys on every push

---

## 📁 Project Structure

```
e:/scribd/
├── app/
│   ├── page.tsx              # Homepage
│   ├── search/page.tsx       # Search results
│   ├── documents/[id]/       # Document detail + PDF viewer
│   ├── upload/page.tsx       # Upload page
│   ├── dashboard/page.tsx    # User dashboard
│   ├── subscription/page.tsx # Pricing + Razorpay
│   ├── admin/page.tsx        # Admin panel
│   ├── login/page.tsx        # Auth
│   ├── signup/page.tsx       # Auth
│   └── api/                  # API routes
│       ├── documents/
│       ├── upload/
│       ├── likes/
│       ├── comments/
│       ├── bookmarks/
│       ├── subscription/
│       └── admin/
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # Hero, Trending, Categories, Featured
│   ├── documents/            # DocumentCard, PDFViewer, PaywallOverlay
│   └── providers/            # AuthProvider
├── lib/
│   ├── supabase/             # Client + Server clients
│   ├── r2.ts                 # Cloudflare R2 SDK
│   ├── razorpay.ts           # Razorpay integration
│   └── utils.ts              # Shared utilities
├── store/
│   ├── authStore.ts          # Zustand auth state
│   └── uiStore.ts            # Zustand UI state
├── types/index.ts            # TypeScript types
├── middleware.ts             # Route protection
└── supabase/migration.sql   # Full DB schema + RLS
```

---

## 🎨 Stitch MCP Designs
7 screens were generated in the Stitch project **"Scribd SaaS Platform"** (ID: `2457907906259566987`):
- Homepage
- Search Results
- Document Detail + Paywall
- Upload Page
- User Dashboard
- Subscription/Pricing
- Admin Panel

---

## 🔑 Key Features
| Feature | Implementation |
|---|---|
| Auth | Supabase email/password |
| PDF Storage | Cloudflare R2 (S3-compatible) |
| PDF Viewer | PDF.js with page navigation |
| Paywall | Blur overlay after page 5 for free users |
| Subscriptions | Razorpay ₹199/mo with signature verification |
| Admin | Role-based access with user/doc management |
| RLS | Every table has row-level security policies |
| State | Zustand with persistence |
