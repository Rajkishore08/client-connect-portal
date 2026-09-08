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

Renewing your passport from the United States requires navigating official Government Consular portals, compliance rules, and strict document specifications. This comprehensive guide breaks down the end-to-end process to ensure 100% first-pass approval without consular rejection delays.

---

## 1. Document Requirements & Physical Audit Checklist

Before filling out your online consular application, assemble original physical copies and notarized affidavits:

- **Current Original Passport**: Must be in good physical condition with valid visa pages intact.
- **Proof of Legal US Status**: Valid US Green Card, Employment Authorization Document (EAD), or valid I-797 Approval Notice.
- **Proof of Residential Address**: State Driver's License, Utility Bill (gas/electric within 60 days), or formal Residential Lease Agreement.
- **2x2 Photo Specifications**: Plain white background, 51mm x 51mm dimensions, zero glare on eyeglasses, neutral expression.

---

## 2. Step-by-Step Government & Consular Process

1. **Government Application Portal**: Fill out official forms carefully on the [U.S. Department of State Passport Portal](https://travel.state.gov) or [VFS Global Consular Services](https://visa.vfsglobal.com).
2. **Reference Registration**: Create your submission tracking number and verify physical mailing labels.
3. **Pre-Audit & Affidavit Check**: Ensure all Annexures (Annexure E, Annexure F) are signed and notarized by a licensed US notary public.

---

## 3. Avoiding Common Rejection Triggers

Consular rejections most frequently occur due to:
- Mismatched address details between State ID and utility bills.
- Non-compliant photo dimensions or shadowy backgrounds.
- Unnotarized affidavits for name changes or minor passports.

> Need expedited 24-hour emergency filing or error-free document preparation? Contact One World Solutions at **+1 (773) 974-5045** for concierge assistance.
    `,
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    author: "Elena Rostova (Senior Consular Specialist)",
    date: "2026-08-10",
    readTimeMinutes: 5,
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

Modern web software development demands instant load speeds, strict type safety, real-time database sync, and intelligent AI capabilities. Here is how One World Solutions engineers robust enterprise web applications for global clients.

---

## 1. Technical Stack Architecture

- **Frontend Core**: Next.js 15 (App Router) + TanStack Query + Tailwind CSS
- **Database & Security Layer**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **AI Logic Engine**: OpenAI GPT-4o Vector Search, RAG embeddings, and Function Calling APIs
- **Global Edge Infrastructure**: Vercel Serverless Functions + Cloudflare Edge CDN

---

## 2. Key Best Practices for High Performance & Scale

1. **Zero-Latency Database Queries**: Leverage indexed SQL queries, Supabase connection pooling, and real-time WebSocket subscriptions.
2. **Server-Side Rendering & SEO**: Render dynamic metadata and JSON-LD schemas on the server for instant Google indexing.
3. **Automated Reliability & Error Tracking**: Sentry error boundaries, strict TypeScript contracts, and automated CI/CD deployment pipelines.

---

## 3. Security & Compliance Standards

All custom web software applications engineered by One World Solutions undergo rigorous 256-bit SSL encryption audits, OWASP vulnerability scans, and role-based access control (RBAC) testing before production launch.
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    author: "Alex Rivera (Lead Full Stack Architect)",
    date: "2026-08-12",
    readTimeMinutes: 6,
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

Driving high-converting inbound leads for service businesses requires hyper-targeted Google PPC campaigns paired with optimized conversion landing pages.

---

## 1. Core Pillars of High-Converting Growth Campaigns

1. **High-Intent Match Types**: Focus on exact and phrase match keywords with strict negative keyword exclusions to eliminate ad spend waste.
2. **Sub-2-Second Landing Page Loads**: Optimize image assets, mobile viewport layouts, and call-to-action buttons for maximum lead conversion.
3. **Multi-Channel Follow-up Sequences**: Automated SMS and email drip reminders to convert warm leads into booked consultations.

---

## 2. Conversion Rate Optimization (CRO) Best Practices

- Clear value proposition displayed above the fold on mobile screens.
- Trust badges (E-Verified, SSL encryption, verified client review metrics).
- Simplified single-column intake forms to minimize user friction.
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

import { supabase } from "@/lib/supabase";

function mapRowToBlogPost(row: Record<string, any>): BlogPost {
  return {
    id: String(row["id"]),
    title: row["title"] || "Untitled Guide",
    slug: row["slug"] || `guide-${Date.now()}`,
    category: row["category"] || "Passport & Visa Guides",
    summary: row["summary"] || "",
    content: row["content"] || "",
    coverImage: row["cover_image"] || row["coverImage"] || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    author: row["author"] || "One World Solutions Editorial Team",
    date: row["date"] || new Date().toISOString().split("T")[0]!,
    readTimeMinutes: typeof row["read_time_minutes"] === "number" ? row["read_time_minutes"] : 5,
    status: row["status"] || "Published",
    metaDescription: row["meta_description"] || row["summary"] || "",
    keywords: Array.isArray(row["keywords"]) ? row["keywords"] : [],
  };
}

/** Fetch All Blogs Live from Supabase PostgreSQL Database */
export async function fetchBlogsFromSupabase(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return localBlogStore;
    }

    const fetched = data.map(mapRowToBlogPost);
    localBlogStore = fetched;
    return fetched;
  } catch {
    return localBlogStore;
  }
}

/** Save or Update Blog Post in Supabase PostgreSQL Database */
export async function saveBlogToSupabase(post: BlogPost): Promise<boolean> {
  // Update local cache immediately
  saveBlog(post);

  try {
    const payload = {
      title: post.title,
      slug: post.slug,
      category: post.category,
      summary: post.summary,
      content: post.content,
      cover_image: post.coverImage,
      author: post.author,
      date: post.date,
      read_time_minutes: post.readTimeMinutes,
      status: post.status,
      meta_description: post.metaDescription,
      keywords: post.keywords,
    };

    // Upsert by slug or ID
    const { error } = await supabase.from("blogs").upsert(payload, { onConflict: "slug" });
    if (error) {
      console.warn("[Supabase DB] Save blog notice:", error.message);
    }
    return true;
  } catch (err) {
    console.warn("[Supabase DB Error] saveBlogToSupabase:", err);
    return true;
  }
}

/** Delete Blog Post in Supabase PostgreSQL Database */
export async function deleteBlogInSupabase(idOrSlug: string): Promise<boolean> {
  deleteBlog(idOrSlug);

  try {
    await supabase.from("blogs").delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    return true;
  } catch (err) {
    console.warn("[Supabase DB Error] deleteBlogInSupabase:", err);
    return true;
  }
}

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
  const idx = localBlogStore.findIndex((b) => b.id === post.id || b.slug === post.slug);
  if (idx !== -1) {
    localBlogStore[idx] = post;
  } else {
    localBlogStore.unshift(post);
  }
  return post;
}

export function deleteBlog(id: string): void {
  localBlogStore = localBlogStore.filter((b) => b.id !== id && b.slug !== id);
}
