export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Passport & Visa Guides" | "Web Development & AI" | "Digital Marketing & PPC";
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  readTimeMinutes: number;
  status: "Published" | "Draft" | "Archived";
  metaDescription: string;
  keywords: string[];
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Complete 2026 Guide to International Passport Renewal & Expedited Visas in the USA",
    slug: "international-passport-renewal-usa-2026-guide",
    category: "Passport & Visa Guides",
    summary: "Step-by-step checklist for renewing your international passport in the United States. Covers Government Consular forms, document audit rules, photo dimensions, and expedited priority filing.",
    content: `
# Complete 2026 Guide to International Passport Renewal in the USA

Renewing your passport from the United States requires navigating official Government Consular portals and submission rules. This guide breaks down the process to ensure 100% first-pass approval without consular rejection.

---

## 1. Document Requirements Checklist

Before filling out your online consular application, ensure you have original copies of:
- **Current Original Passport** (valid or expired).
- **Proof of Legal Status**: Valid Visa, Green Card, or Residency documentation.
- **Proof of US Address**: State Driver's License, Utility Bill, or Residential Lease Agreement.
- **2x2 Photo Specifications**: Plain white background, neutral expression, zero glare on eyeglasses.

---

## 2. Consular Step-by-Step

1. **Government Application**: Fill out the official passport website application form.
2. **Account Setup**: Register your reference number and generate your tracking shipping label.
3. **Physical Audit & Submission**: Double-check annexures and notarized affidavits.

> [!TIP]
> Need expedited emergency priority filing or error-free form preparation? Contact One World Solutions at **+1 (417) 569-0711** for end-to-end concierge assistance.
    `,
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    author: "Elena Rostova (Senior Consular Specialist)",
    date: "2026-08-10",
    readTimeMinutes: 6,
    status: "Published",
    metaDescription: "Comprehensive 2026 guide for international passport renewal in USA. Step-by-step consular checklist, photo requirements, and expedited priority filing.",
    keywords: ["Passport Renewal USA", "Consular Services", "Expedited Passport Renewal", "Dual Residency Application"],
  },
  {
    id: "blog-2",
    title: "How We Build Enterprise SaaS Products with Next.js 15, Supabase & AI Agents",
    slug: "building-enterprise-saas-nextjs-supabase-ai",
    category: "Web Development & AI",
    summary: "An architectural blueprint for building scalable, high-performance web applications. Learn how Supabase PostgreSQL RLS and OpenAI Vector Embeddings power modern software platforms.",
    content: `
# Building Enterprise SaaS Products with Next.js 15, Supabase & AI

Modern web app development demands speed, strict type safety, real-time sync, and intelligent AI capabilities. Here is how One World Solutions engineers robust software applications for global clients.

---

## Technical Stack Architecture

- **Frontend Core**: Next.js 15 (App Router) + TanStack Query + Tailwind CSS
- **Database Layer**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **AI Logic**: OpenAI GPT-4o Vector Search & Function Calling APIs
- **Hosting**: Vercel Serverless Functions + Global Edge CDN

---

## Key Best Practices for High Performance

1. **Zero-Latency Database Queries**: Leverage indexed SQL queries and Supabase real-time subscriptions.
2. **SEO Optimization**: Render server-side metadata and dynamic JSON-LD schemas for high Google rankings.
3. **Automated Error Tracking**: Sentry logging and strict TypeScript contracts.
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    author: "Alex Rivera (Lead Full Stack Architect)",
    date: "2026-08-12",
    readTimeMinutes: 8,
    status: "Published",
    metaDescription: "Learn how to build modern SaaS web applications using Next.js 15, Supabase PostgreSQL, and AI agent automation. Architectural guide by One World Solutions.",
    keywords: ["Nextjs 15 SaaS Architecture", "Supabase PostgreSQL RLS", "Web Application Development Chicago", "AI Agent Integration"],
  },
  {
    id: "blog-3",
    title: "High-ROI PPC & Digital Marketing Strategies for Service Businesses in 2026",
    slug: "high-roi-ppc-digital-marketing-strategies-2026",
    category: "Digital Marketing & PPC",
    summary: "Stop wasting Google Ads budget. Learn how high-intent conversion landers, negative keyword lists, and GA4 attribution double your inbound lead velocity.",
    content: `
# High-ROI PPC & Digital Marketing Strategies for 2026

Driving high-converting leads for professional services requires hyper-targeted Google PPC campaigns paired with optimized conversion landing pages.

---

## 3 Core Pillars of High-Converting Campaigns

1. **High-Intent Match Types**: Focus on exact and phrase match keywords with negative keyword exclusions.
2. **Sub-2-Second Landing Page Loads**: Optimizing image assets and mobile layout conversions.
3. **Multi-Channel Follow-ups**: Automated SMS and email drip reminders to convert warm leads.
    `,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: "Sarah Jenkins (Digital Growth Strategist)",
    date: "2026-08-14",
    readTimeMinutes: 5,
    status: "Published",
    metaDescription: "Master Google Ads PPC and digital marketing for service businesses in 2026. Proven ROI strategies and conversion optimization techniques.",
    keywords: ["PPC Management Chicago", "Digital Marketing Agency", "Google Ads Conversion Optimization", "Lead Generation"],
  },
];

let localBlogStore: BlogPost[] = [...INITIAL_BLOG_POSTS];

export function getPublishedBlogs(): BlogPost[] {
  return localBlogStore.filter((b) => b.status === "Published");
}

export function getAllBlogs(): BlogPost[] {
  return localBlogStore;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return localBlogStore.find((b) => b.slug === slug);
}

export function saveBlog(post: BlogPost): BlogPost {
  const idx = localBlogStore.findIndex((b) => b.id === post.id);
  if (idx !== -1) {
    localBlogStore[idx] = post;
  } else {
    localBlogStore.unshift(post);
  }
  return post;
}

export function deleteBlog(id: string): void {
  localBlogStore = localBlogStore.filter((b) => b.id !== id);
}
