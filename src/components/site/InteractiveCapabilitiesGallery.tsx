import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Layers, Sparkles, X, CalendarCheck, Zap, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tag?: string;
  deliverables?: string[];
  processSteps?: { step: string; title: string; desc: string }[];
}

const DEFAULT_CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    title: "Passport Renewal Services",
    subtitle: "24-Hour to 14-Day Speed Tiers",
    description:
      "Fast-track your international passport renewal with error-free application preparation, form validation, and guaranteed expedited queue processing.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
    link: "/passport/passport-renewal",
    tag: "Most Popular",
  },
  {
    id: "02",
    title: "OCI Application",
    subtitle: "Overseas Citizenship of India",
    description:
      "Seamless OCI card application processing & renewal guidance. Includes complete document audit, photo compliance check, and end-to-end status tracking.",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200",
    link: "/passport/oci",
    tag: "Global Specialty",
  },
  {
    id: "03",
    title: "Global E-Visas & Entry Permits",
    subtitle: "UK ETA, Brazil, Kenya & Global Permits",
    description:
      "Guaranteed electronic visa filing for international business & travel. Receive official electronic travel authorizations directly in your email in 24–48 hours.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    link: "/passport/e-visa",
  },
  {
    id: "04",
    title: "Emergency 24H Rush",
    subtitle: "Same-Day Hand Carry Courier",
    description:
      "Immediate emergency appointment booking & hand-carry courier dispatch for urgent flight departures scheduled within 24 to 48 hours.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
    link: "/passport/lost-damaged-passport",
    tag: "Emergency Rush",
  },
  {
    id: "05",
    title: "Renunciation & Surrender",
    subtitle: "Former Citizenship Surrender",
    description:
      "Official surrender declaration filing and former passport cancellation following naturalization, fully compliant with consular regulations.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200",
    link: "/passport/renunciation",
  },
];

export function InteractiveCapabilitiesGallery({
  items = DEFAULT_CAPABILITIES,
  badgeText = "TAILORED EXPERTISE",
  mainHeading = "Expedited Services & Core Capabilities",
  mainSubheading = "Explore our custom web applications, SaaS platforms, and UI/UX design systems engineered for scale.",
}: {
  items?: CapabilityItem[];
  badgeText?: string;
  mainHeading?: string;
  mainSubheading?: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<CapabilityItem | null>(null);

  useEffect(() => {
    if (activeIdx >= items.length) {
      setActiveIdx(0);
    }
  }, [items, activeIdx]);

  const fallbackItem = DEFAULT_CAPABILITIES[0]!;
  const activeItem: CapabilityItem = items[activeIdx] ?? items[0] ?? fallbackItem;

  const handleExploreClick = (e: React.MouseEvent, item: CapabilityItem) => {
    if (item.link.startsWith("#") || item.deliverables) {
      e.preventDefault();
      setSelectedModalItem(item);
    }
  };

  return (
    <section className="space-y-8 sm:space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {badgeText}
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl text-foreground font-display">
              {mainHeading}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {mainSubheading}
            </p>
          </div>

          <div className="rounded-2xl border border-border/90 bg-muted/40 p-6 backdrop-blur-md transition-all duration-300 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-primary text-base">
                <Layers className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{activeItem.title}</span>
              </div>
              <span className="text-xs font-mono font-bold text-muted-foreground">
                {activeItem.id} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-foreground/80 sm:text-sm">
              {activeItem.description}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {activeItem.link.startsWith("/") && !activeItem.deliverables ? (
                <Link
                  to={activeItem.link}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/20"
                >
                  Explore Service Details <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleExploreClick(e, activeItem)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/20 cursor-pointer"
                >
                  Explore Service Details <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-[440px] sm:h-[480px] w-full gap-2 sm:gap-3 overflow-hidden rounded-2xl">
          {items.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out select-none",
                  isActive
                    ? "flex-[3.5] border-2 border-primary shadow-[0_4px_25px_rgba(9,117,138,0.3)]"
                    : "flex-1 border border-border/80 bg-muted/60 opacity-85 hover:opacity-100 hover:border-primary/50"
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200";
                  }}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-transform duration-700",
                    isActive ? "scale-105 saturate-120" : "scale-100 saturate-100 opacity-95 group-hover:scale-105"
                  )}
                />

                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
                      : "bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                  )}
                />

                {isActive ? (
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white animate-fadeIn">
                    {item.tag && (
                      <span className="mb-2 inline-block rounded-md bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold sm:text-xl text-white">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-200">{item.description}</p>
                    
                    {item.link.startsWith("/") && !item.deliverables ? (
                      <Link
                        to={item.link}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:underline"
                      >
                        Explore Service Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExploreClick(e, item);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:underline cursor-pointer"
                      >
                        Explore Service Details <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <span className="writing-vertical-rl text-xs font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap rotate-180">
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedModalItem && (
        <Dialog open={!!selectedModalItem} onOpenChange={() => setSelectedModalItem(null)}>
          <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden border border-slate-200 bg-white shadow-2xl rounded-3xl z-[200]">
            <div className="bg-slate-900 text-white p-6 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-600/20 text-blue-400 grid place-items-center shrink-0 border border-blue-500/30">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-extrabold text-white font-display">
                    {selectedModalItem.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-400 font-medium">
                    {selectedModalItem.subtitle}
                  </DialogDescription>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModalItem(null)}
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 font-bold text-[10px] uppercase">
                  OVERVIEW & SCOPE
                </Badge>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedModalItem.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-display">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" /> Key Deliverables & Technical Capabilities
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(selectedModalItem.deliverables || [
                    "Bespoke React / Next.js architecture",
                    "Custom responsive UI/UX design system",
                    "API integration & database sync",
                    "SEO, performance & WCAG accessibility",
                    "Security audit & SSL encryption",
                    "Cloud deployment & staging preview",
                  ]).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-display">
                  <Zap className="h-4 w-4 text-blue-600" /> Step-by-Step Delivery Roadmap
                </h4>
                <div className="space-y-2.5">
                  {(selectedModalItem.processSteps || [
                    { step: "Step 1", title: "Discovery & Architecture Scoping", desc: "30-min technical consultation, wireframe approval, and scope lock." },
                    { step: "Step 2", title: "UI/UX Prototype & Component Design", desc: "Crafting pixel-perfect design tokens, responsive layouts, and interactive demos." },
                    { step: "Step 3", title: "Agile Development Sprint", desc: "Full-stack coding, database setup, API webhooks, and automated testing." },
                    { step: "Step 4", title: "QA Audit & Production Launch", desc: "Vercel/AWS staging deployment, performance optimization, and handover." },
                  ]).map((proc, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px] shrink-0">
                        {proc.step}
                      </span>
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs">{proc.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">{proc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  asChild
                  className="w-full sm:flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                  onClick={() => setSelectedModalItem(null)}
                >
                  <Link to="/book">
                    <CalendarCheck className="h-4 w-4 mr-2" /> Book Strategy Call
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs rounded-xl border-slate-300 cursor-pointer"
                  onClick={() => {
                    setSelectedModalItem(null);
                    const intakeEl = document.getElementById("intake-form");
                    if (intakeEl) intakeEl.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start Intake Form <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
