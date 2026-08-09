import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const REVIEWS = [
  {
    name: "Dr. Rajesh K. Patel",
    role: "NRI Entrepreneur",
    location: "Chicago, IL",
    service: "Passport Renewal & OCI",
    division: "Passport & Visa",
    rating: 5,
    quote:
      "One World Solutions saved my urgent business trip to Mumbai! Their 24-hour emergency rush service got my passport renewed and OCI processed in record time with zero errors.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Product, FinTech",
    location: "San Francisco, CA",
    service: "Custom SaaS Platform",
    division: "Software & UI/UX",
    rating: 5,
    quote:
      "They delivered our Next.js client portal 2 weeks ahead of schedule. The glassmorphism UI/UX design is world-class, and we got 100% code ownership. Worth every penny!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
  {
    name: "Marcus Vance",
    role: "Founder, Apex Logistics",
    location: "Dallas, TX",
    service: "SEO & Google Ads PPC",
    division: "Digital Marketing",
    rating: 5,
    quote:
      "Within 30 days of launching our Google Ads and local SEO campaign with One World, our inbound lead volume grew by 3.8x. Their monthly analytics reporting is crystal clear.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
  },
];

export function Testimonials() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="glass-pill text-xs font-semibold text-primary border-primary/30 px-3.5 py-1">
          CLIENT SUCCESS STORIES
        </Badge>
        <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">
          Trusted by 2,500+ Clients &amp; Businesses
        </h2>
        <p className="text-sm text-muted-foreground font-normal leading-relaxed">
          See how our 3 specialized divisions empower individuals to travel confidently and businesses to scale faster.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="glass-card group flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-white/90 hover:border-primary/50 transition-all hover:-translate-y-1.5 shadow-card hover:shadow-lift space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </span>
                <Badge variant="secondary" className="glass-pill text-[10px] font-semibold">
                  {r.division}
                </Badge>
              </div>

              <Quote className="h-6 w-6 text-primary/30 group-hover:text-primary transition-colors" />

              <p className="text-xs leading-relaxed text-slate-800 font-normal italic">
                "{r.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="h-10 w-10 rounded-full object-cover border border-primary/20 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-foreground truncate">{r.name}</h3>
                <p className="text-[11px] text-muted-foreground font-medium truncate">
                  {r.role} • {r.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
