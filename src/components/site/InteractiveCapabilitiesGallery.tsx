import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tag?: string;
}

const DEFAULT_CAPABILITIES: CapabilityItem[] = [
  {
    id: "01",
    title: "US Passport Renewal",
    subtitle: "24-Hour to 14-Day Speed Tiers",
    description:
      "Fast-track your US & Indian passport renewal with error-free application preparation, DS-82 form validation, and guaranteed expedited State Department queue processing.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
    link: "/passport/passport-renewal",
    tag: "Most Popular",
  },
  {
    id: "02",
    title: "OCI Card Services",
    subtitle: "Overseas Citizen of India",
    description:
      "Seamless OCI application processing for NRIs and foreign spouses. Includes complete VFS document audit, photo compliance check, and end-to-end courier tracking.",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200",
    link: "/passport/oci",
    tag: "NRI Specialty",
  },
  {
    id: "03",
    title: "Global E-Visas & Entry Permits",
    subtitle: "India, UK ETA, Brazil & Kenya",
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
    subtitle: "Indian Citizenship Surrender",
    description:
      "Official surrender certificate filing and Indian passport cancellation following naturalization, fully compliant with Ministry of External Affairs regulations.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200",
    link: "/passport/renunciation",
  },
];

export function InteractiveCapabilitiesGallery({
  items = DEFAULT_CAPABILITIES,
  badgeText = "TAILORED EXPERTISE",
  mainHeading = "Expedited Services & Core Capabilities",
  mainSubheading = "We deliver stress-free expedited passport renewals, NRI visa solutions, and digital capabilities with guaranteed speed.",
}: {
  items?: CapabilityItem[];
  badgeText?: string;
  mainHeading?: string;
  mainSubheading?: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const fallback = DEFAULT_CAPABILITIES[0]!;
  const activeItem: CapabilityItem = items[activeIdx] ?? items[0] ?? fallback;

  return (
    <section className="rounded-3xl border border-border/80 bg-card p-6 text-foreground shadow-[var(--shadow-lift)] sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12 items-stretch">
        {/* Left Side Details Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {badgeText}
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl text-foreground">
              {mainHeading}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {mainSubheading}
            </p>
          </div>

          {/* Active Detail Card Box (Light Theme) */}
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

            <div className="mt-5">
              <Link
                to={activeItem.link}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/20"
              >
                Explore Service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side Interactive Accordion Gallery (Light Theme) */}
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
                {/* Background Image — Full Color Always */}
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

                {/* Gradient Legibility Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
                      : "bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                  )}
                />

                {/* Expanded Panel Overlay Details */}
                {isActive ? (
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white animate-fadeIn">
                    {item.tag && (
                      <span className="mb-2 inline-block rounded-md bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold sm:text-xl text-white">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-200">{item.description}</p>
                    <Link
                      to={item.link}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      Explore Service <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  /* Collapsed Rotated Vertical Label */
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
    </section>
  );
}
