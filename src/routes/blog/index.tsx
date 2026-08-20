import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Filter,
  Globe,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBlogsFromSupabase, getPublishedBlogs, type BlogPost } from "@/data/blogs-data";
import { useEffect } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blogs & Consular Guides — One World Solutions Agency" },
      {
        name: "description",
        content:
          "Official guides and technical articles on International Passport Renewal, Dual Residency specs, Next.js Web SaaS architecture, and PPC Growth Marketing.",
      },
      { property: "og:title", content: "Blogs & Guides | One World Solutions" },
      {
        property: "og:description",
        content: "Expert step-by-step guides for passport renewals, web app development, and growth marketing.",
      },
    ],
  }),
  component: BlogListingPage,
});

function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>(getPublishedBlogs());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    fetchBlogsFromSupabase().then((data) => {
      setPosts(data.filter((b) => b.status === "Published"));
    });
  }, []);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesSearch =
        !q ||
        [p.title, p.summary, p.author, p.keywords.join(" ")].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesSearch && (categoryFilter === "all" || p.category === categoryFilter);
    });
  }, [posts, search, categoryFilter]);

  const categories = ["all", "Passport & Visa Guides", "Web Development & AI", "Digital Marketing & PPC"];

  // JSON-LD Structured Data for Google Indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "One World Solutions Official Blog & Consular Guides",
    url: "https://www.oneworldsolutionsusa.com/blog",
    description: "Expert guides for international passport renewal, web software architecture, and PPC growth.",
    publisher: {
      "@type": "Organization",
      name: "One World Solutions Agency Chicago",
      logo: "https://www.oneworldsolutionsusa.com/logo-rect.png",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Inject Google SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1527] via-[#0F1C33] to-[#122240] text-white pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="h-4 w-4" /> Official Knowledge &amp; SEO Guides
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white max-w-3xl mx-auto leading-tight">
            Expert Consular Guides &amp; Technical Insights
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Step-by-step documentation for International Passport Renewals, Dual Residency Specs, Enterprise Next.js SaaS Architecture, and High-ROI PPC Marketing.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                className="h-12 pl-11 pr-4 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-slate-400 text-sm rounded-2xl focus:bg-white/20"
                placeholder="Search guides by keyword (e.g. Passport, Visas, Next.js, Ads)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills & Blog Grid Container */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>

        {/* Blog Article Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="surface-card group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 backdrop-blur-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.readTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-display">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[160px]">
                  {post.author}
                </span>

                <Button asChild size="sm" variant="ghost" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    Read Guide <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 surface-card p-8 rounded-3xl border border-slate-200 bg-white space-y-3">
            <p className="text-sm font-bold text-slate-700">No blog guides found for "{search}".</p>
            <Button onClick={() => { setSearch(""); setCategoryFilter("all"); }} variant="outline" size="sm">
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      <TrustBanner />
    </div>
  );
}
