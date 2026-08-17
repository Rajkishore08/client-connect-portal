import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    name: "Dr. Raj K. Patel",
    role: "Global Executive",
    location: "Chicago, IL",
    service: "Expedited Passport & Visas",
    division: "Passport & Visa",
    rating: 5,
    quote:
      "One World Solutions saved my urgent international business trip! Their 24-hour emergency rush service got my passport renewed and visa processed in record time with zero errors.",
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
  {
    name: "Anita Desai",
    role: "Medical Resident",
    location: "New York, NY",
    service: "Family Passport Renewal",
    division: "Passport & Visa",
    rating: 5,
    quote:
      "Extremely professional consular assistance! They reviewed all our government forms before priority filing and handled courier tracking seamlessly.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
  },
  {
    name: "David Chen",
    role: "CTO, CloudScale",
    location: "Austin, TX",
    service: "Enterprise ERP Portal",
    division: "Software & UI/UX",
    rating: 5,
    quote:
      "The architectural quality and Supabase real-time integration built by One World allowed us to onboard 10,000 active users with zero downtime.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    name: "Priya Sharma",
    role: "Managing Partner",
    location: "Chicago, IL",
    service: "PPC Growth Campaign",
    division: "Digital Marketing",
    rating: 5,
    quote:
      "Outstanding ROI! Our cost per lead dropped by 45% in Chicago and nationwide. One World is our trusted long-term marketing engine.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll Carousel Loop Every 3.5 Seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 320;
    const gap = 16;
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % REVIEWS.length;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + REVIEWS.length) % REVIEWS.length;
    scrollToCard(prevIdx);
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 space-y-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="text-center sm:text-left space-y-2 max-w-2xl">
          <Badge variant="outline" className="glass-pill text-xs font-semibold text-primary border-primary/30 px-3.5 py-1">
            CLIENT SUCCESS STORIES
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight font-display">
            Trusted by 2,500+ Clients &amp; Businesses
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
            Side-by-side client reviews from Chicago and nationwide across our 3 specialized divisions.
          </p>
        </div>

        {/* Desktop & Mobile Carousel Nav Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-10 w-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 shadow-2xs cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-10 w-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 shadow-2xs cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </Button>
        </div>
      </div>

      {/* Side-by-Side Horizontal Auto-Scrolling Carousel Track */}
      <div
        className="relative w-full max-w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 w-full scroll-smooth"
        >
          {REVIEWS.map((r, idx) => (
            <div
              key={r.name + idx}
              className="snap-center shrink-0 w-[290px] sm:w-[360px] glass-card group flex flex-col justify-between p-5 sm:p-6 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-400 transition-all shadow-sm hover:shadow-lg space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </span>
                  <Badge variant="secondary" className="glass-pill text-[10px] font-bold bg-blue-50 text-blue-700 border-blue-200">
                    {r.division}
                  </Badge>
                </div>

                <Quote className="h-5 w-5 text-blue-500/40 group-hover:text-blue-600 transition-colors" />

                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium italic line-clamp-4">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover border border-blue-200 shadow-2xs"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{r.name}</h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    {r.role} • {r.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToCard(i)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              activeIndex === i ? "w-7 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
