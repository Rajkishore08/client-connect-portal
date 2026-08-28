import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogBySlug, getPublishedBlogs } from "@/data/blogs-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogBySlug(params.slug);
    return {
      meta: [
        { title: `${post ? post.title : "Article"} — One World Solutions Agency` },
        { name: "description", content: post ? post.metaDescription : "Official guide by One World Solutions." },
        { property: "og:title", content: post ? post.title : "Article" },
        { property: "og:description", content: post ? post.summary : "" },
        { property: "og:image", content: post ? post.coverImage : "" },
      ],
    };
  },
  component: SingleBlogPostPage,
});

function SingleBlogPostPage() {
  const { slug } = Route.useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="surface-card p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 max-w-md">
          <h1 className="text-xl font-bold text-slate-900">Article Not Found</h1>
          <p className="text-xs text-slate-500">The requested guide may have been moved or updated.</p>
          <Button asChild size="sm">
            <Link to="/blog">Return to Blog Index</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = getPublishedBlogs().filter((b) => b.slug !== slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top Header Navigation */}
      <div className="bg-[#0B1527] text-white border-b border-slate-800 py-3 px-4 sm:px-8">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="text-xs text-slate-300 hover:text-white hover:bg-slate-800">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to All Guides
            </Link>
          </Button>

          <Button onClick={handleShare} variant="outline" size="sm" className="text-xs font-bold border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700">
            <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share Article
          </Button>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="mx-auto max-w-4xl px-4 pt-24 sm:pt-32 pb-10 sm:px-6 lg:px-8 space-y-8">
        {/* Article Meta Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <Badge className="bg-blue-600 text-white font-bold text-xs px-3 py-1">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-300 text-blue-700 font-bold grid place-items-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{post.author}</p>
                <p className="text-[10px] text-slate-500">Published on {post.date}</p>
              </div>
            </div>

            <a
              href="https://wa.me/17739745045"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Chicago Office
            </a>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-video">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Formatted Article Body */}
        <div className="surface-card p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("# ")) {
              return <h1 key={idx} className="text-2xl font-extrabold text-slate-900 font-display mt-4">{paragraph.replace("# ", "")}</h1>;
            }
            if (paragraph.startsWith("## ")) {
              return <h2 key={idx} className="text-xl font-extrabold text-slate-900 font-display mt-4">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("> ")) {
              return (
                <div key={idx} className="p-4 rounded-2xl bg-blue-50 border-l-4 border-blue-600 text-blue-900 font-medium text-xs sm:text-sm">
                  {paragraph.replace("> ", "")}
                </div>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Related Articles Footer */}
        {related.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Related Consular &amp; Tech Guides
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to="/blog/$slug"
                  params={{ slug: rel.slug }}
                  className="surface-card p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all space-y-2 block"
                >
                  <Badge variant="outline" className="text-[10px] font-bold">
                    {rel.category}
                  </Badge>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{rel.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <TrustBanner />
    </div>
  );
}
