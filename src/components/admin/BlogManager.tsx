import {
  BookOpen,
  CheckCircle2,
  Edit3,
  Eye,
  FileText,
  Globe,
  Plus,
  Search,
  Sparkles,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteBlogInSupabase,
  fetchBlogsFromSupabase,
  getAllBlogs,
  saveBlogToSupabase,
  type BlogPost,
} from "@/data/blogs-data";
import { useEffect } from "react";

export function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>(getAllBlogs());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Modal State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  const reloadBlogs = async () => {
    setLoading(true);
    const data = await fetchBlogsFromSupabase();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    reloadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesQuery =
        !q ||
        [b.title, b.summary, b.author, b.slug].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesQuery && (categoryFilter === "all" || b.category === categoryFilter);
    });
  }, [blogs, search, categoryFilter]);

  const handleOpenCreateModal = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: "",
      slug: "",
      category: "Passport & Visa Guides",
      summary: "",
      content: "# Title Header\n\nWrite your blog article content here in Markdown format...",
      coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      author: "One World Solutions Editorial Team",
      date: new Date().toISOString().split("T")[0]!,
      readTimeMinutes: 5,
      status: "Published",
      metaDescription: "",
      keywords: ["Chicago Agency", "Consular Services"],
    };
    setEditingPost(newPost);
    setIsNew(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title.trim() || !editingPost.slug.trim()) {
      toast.error("Please enter a title and valid URL slug.");
      return;
    }

    await saveBlogToSupabase(editingPost);
    await reloadBlogs();
    toast.success(isNew ? "Blog Article Published to Database" : "Blog Article Updated in Database", {
      description: `Article "${editingPost.title}" is now active for SEO indexing at /blog/${editingPost.slug}.`,
    });
    setEditingPost(null);
  };

  const handleDeletePost = async (id: string, title: string) => {
    await deleteBlogInSupabase(id);
    await reloadBlogs();
    toast.success(`Deleted article "${title}" from database`);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 grid place-items-center font-bold">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-display">
              SEO Blog &amp; Content Marketing CMS
            </h2>
            <p className="text-xs text-slate-500">
              Publish and update high-ranking SEO guides for Passport Renewals, Web SaaS, and Marketing.
            </p>
          </div>
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Create New SEO Article
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="surface-card overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-[1fr_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9 text-xs"
              placeholder="Search blog articles by title, author, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-10 w-full sm:w-56 text-xs font-bold">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[9999]">
              <SelectItem value="all">All Blog Categories</SelectItem>
              <SelectItem value="Passport & Visa Guides">Passport &amp; Visa Guides</SelectItem>
              <SelectItem value="Web Development & AI">Web Development &amp; AI</SelectItem>
              <SelectItem value="Digital Marketing & PPC">Digital Marketing &amp; PPC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-xs">
            <thead className="bg-slate-100/70 text-left text-[11px] uppercase tracking-wider font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Article Title &amp; Slug</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBlogs.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors align-middle">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900">{post.title}</p>
                    <p className="text-[10px] font-mono text-blue-600">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {post.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700">{post.author}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-600">{post.date}</td>
                  <td className="px-4 py-3.5">
                    {post.status === "Published" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPost({ ...post });
                        setIsNew(false);
                      }}
                      className="h-8 text-[11px] font-bold cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-blue-600 mr-1" /> Edit Article
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="h-8 text-[11px] font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Create / Edit Modal Dialog */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 grid place-items-center font-bold">
                  <Edit3 className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {isNew ? "Create New SEO Article" : "Edit Article Content & Meta"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div className="space-y-1">
                <Label htmlFor="blog-title" className="font-bold text-slate-700">Article Title *</Label>
                <Input
                  id="blog-title"
                  required
                  placeholder="e.g. Complete 2026 Guide to International Passport Renewal in the USA"
                  value={editingPost.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    setEditingPost({
                      ...editingPost,
                      title,
                      slug: isNew ? autoSlug : editingPost.slug,
                    });
                  }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="blog-slug" className="font-bold text-slate-700">URL Slug *</Label>
                  <Input
                    id="blog-slug"
                    required
                    className="font-mono text-xs"
                    placeholder="international-passport-renewal-usa-2026"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Blog Category</Label>
                  <Select
                    value={editingPost.category}
                    onValueChange={(v) => setEditingPost({ ...editingPost, category: v as any })}
                  >
                    <SelectTrigger className="h-10 text-xs font-bold bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[9999]">
                      <SelectItem value="Passport & Visa Guides">Passport &amp; Visa Guides</SelectItem>
                      <SelectItem value="Web Development & AI">Web Development &amp; AI</SelectItem>
                      <SelectItem value="Digital Marketing & PPC">Digital Marketing &amp; PPC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="blog-summary" className="font-bold text-slate-700">Article Short Summary (SEO Snippet) *</Label>
                <Textarea
                  id="blog-summary"
                  rows={2}
                  required
                  placeholder="Summarize the core takeaways for search engine previews..."
                  value={editingPost.summary}
                  onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="blog-content" className="font-bold text-slate-700">Main Content (Markdown Format) *</Label>
                <Textarea
                  id="blog-content"
                  rows={8}
                  required
                  className="font-mono text-xs leading-relaxed"
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="blog-author" className="font-bold text-slate-700">Author Name *</Label>
                  <Input
                    id="blog-author"
                    required
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="blog-img" className="font-bold text-slate-700">Cover Image URL *</Label>
                  <Input
                    id="blog-img"
                    required
                    value={editingPost.coverImage}
                    onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPost(null)}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Save &amp; Publish Article
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
