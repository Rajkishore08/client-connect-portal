import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  CalendarCheck,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  MapPin,
  Megaphone,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { useEffect, useState } from "react";
import { CategoryExplorer } from "@/components/site/CategoryExplorer";
import { FaqSection } from "@/components/site/FaqSection";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";

import { ServiceIntakeWizardModal } from "@/components/site/ServiceIntakeWizardModal";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Testimonials } from "@/components/site/Testimonials";
import { TurnaroundEstimator } from "@/components/site/TurnaroundEstimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hero3DBackground } from "@/components/ui/Hero3DBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One World Solutions — Passport, Software & Digital Marketing Agency" },
      {
        name: "description",
        content:
          "Chicago premier multi-service agency for expedited passports & OCI, custom web & software development, and digital marketing growth.",
      },
      { property: "og:title", content: "One World Solutions — 3 Specialized Agency Divisions" },
      {
        property: "og:description",
        content:
          "Connecting People. Powering Businesses. Travel Smarter. Build Better. Grow Faster.",
      },
    ],
  }),
  component: Home,
});

const SOCIAL_PROOF_METRICS = [
  { label: "Google Rating", value: "4.9 / 5.0", sub: "340+ Verified Reviews" },
  { label: "Satisfied Clients", value: "2,500+", sub: "Passports, Web & Marketing" },
  { label: "US States Served", value: "35+ States", sub: "Nationwide Intake & Expediting" },
  { label: "Success Rate", value: "98.6%", sub: "Guaranteed Zero-Error Filing" },
];

const EQUAL_DIVISIONS = [
  {
    icon: ShieldCheck,
    title: "Passport & Visa Services",
    subtitle: "Renewals • OCI • Emergency 24H",
    desc: "Guided form preparation, consular compliance verification, and 24-hour emergency priority filing.",
    link: "/passport",
    badge: "24H Rush Available",
    highlights: ["Adult & Minor Renewals", "OCI & Renunciation", "E-Visa & Lost Replacements"],
  },
  {
    icon: Code2,
    title: "Custom Software & Web Dev",
    subtitle: "Web Apps • SaaS • UI/UX Design",
    desc: "Scalable React/Next.js web applications, modern UI/UX design systems, and cloud infrastructure.",
    link: "/web-development",
    badge: "Enterprise Ready",
    highlights: ["React & Next.js Platforms", "Bespoke UI/UX Design Systems", "API & Cloud Architecture"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Growth",
    subtitle: "SEO • PPC Ads • Lead Funnels",
    desc: "Data-driven Search Engine Optimization, Google Ads campaigns, and lead conversion funnels.",
    link: "/digital-marketing",
    badge: "High ROI Focus",
    highlights: ["Technical SEO & Local Search", "Targeted Google Ads PPC", "Conversion Rate Audits"],
  },
];

function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<"passport" | "software" | "marketing">("passport");
  const [isTabHovered, setIsTabHovered] = useState(false);

  useEffect(() => {
    if (isTabHovered) return;
    const timer = setInterval(() => {
      setActiveHeroTab((prev) => {
        if (prev === "passport") return "software";
        if (prev === "software") return "marketing";
        return "passport";
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isTabHovered]);

  return (
    <main className="relative overflow-hidden bg-slate-50/50">
      {/* Background Radial Light Glow Orbs for High Glassmorphism Contrast */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[5%] left-[-10%] h-[550px] w-[550px] rounded-full bg-blue-500/12 blur-[130px]" />
        <div className="absolute top-[25%] right-[-10%] h-[550px] w-[550px] rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute top-[55%] left-[15%] h-[600px] w-[600px] rounded-full bg-sky-400/12 blur-[160px]" />
      </div>

      {/* Ultra-Premium Hero Section */}
      <section className="relative z-10 hero-wash border-b border-slate-200/80 pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        {/* Interactive 3D Holographic Globe & Particles Background Canvas */}
        <Hero3DBackground />

        {/* Brand Network Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#0F52FF_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 w-full overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-10 xl:gap-14 w-full">
            
            {/* Left Column: Story & Headline */}
            <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
              {/* Top Trust & Status Badge */}
              <div className="glass-pill max-w-full inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 backdrop-blur-xl bg-white/90 border border-blue-200/90 shadow-2xs rounded-full">
                <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Desk
                </span>
                <span className="text-slate-300">|</span>
                <Building className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate font-bold text-slate-800">Chicago HQ • Global Operations</span>
              </div>

              {/* Transformation Headline - Mobile Scaled with Breathable Spacing */}
              <h1 className="text-4xl xs:text-5xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#0B1527] font-display break-words max-w-full my-3 sm:my-0">
                Helping People Cross <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Borders &amp; Businesses
                </span> <br />
                <span className="text-slate-900">Scale Worldwide.</span>
              </h1>

              {/* Simple Punchy Slogan for Mobile Screen & Extended Text for Desktop */}
              <p className="sm:hidden text-sm font-semibold text-slate-700 leading-relaxed my-3">
                Connecting People. Powering Businesses. <br />
                <span className="text-blue-600 font-bold">Travel Smarter. Build Better. Scale Worldwide.</span>
              </p>
              <p className="hidden sm:block text-base leading-relaxed text-slate-600 font-medium max-w-xl sm:my-0">
                We simplify international passport &amp; consular travel, engineer high-impact React/Next.js web platforms, and run targeted Google Ads growth campaigns.
              </p>

              {/* Mobile & Desktop Main Action */}
              <div className="pt-2 sm:pt-0 pb-1 sm:pb-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3 w-full">
                <Button
                  size="lg"
                  onClick={() => setWizardOpen(true)}
                  className="h-12 sm:h-13 px-6 text-sm sm:text-base font-extrabold shadow-lg shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all bg-blue-600 hover:bg-blue-700 text-white rounded-2xl cursor-pointer"
                >
                  Start Instant Intake <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 shrink-0" />
                </Button>

                <Button asChild size="lg" variant="outline" className="h-12 sm:h-13 px-6 text-sm sm:text-base font-bold bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-50 transition-all rounded-2xl shadow-2xs cursor-pointer">
                  <Link to="/book">
                    <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0 text-blue-600" /> Book Consultation
                  </Link>
                </Button>
              </div>

              {/* Clean Feature Highlights List */}
              <div className="space-y-2.5 py-2 sm:py-0 text-xs sm:text-sm text-slate-700 font-bold">
                <div className="flex items-center gap-2.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> International Passport, Visas &amp; 24H Rush
                </div>
                <div className="flex items-center gap-2.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Enterprise React/Next.js Web Apps &amp; SaaS Platforms
                </div>
                <div className="flex items-center gap-2.5 sm:gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> High-ROI Google Ads PPC &amp; Technical SEO Funnels
                </div>
              </div>

              {/* Social Proof Ticker */}
              <div className="pt-4 sm:pt-4 mt-3 sm:mt-0 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
                <div className="p-3 sm:p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-1 text-amber-500 font-bold text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-500" /> 4.9 / 5.0
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5 sm:mt-0">340+ Verified Reviews</p>
                </div>

                <div className="p-3 sm:p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-1 text-slate-900 font-extrabold text-xs">
                    <Users className="h-3.5 w-3.5 text-blue-600" /> 2,500+
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5 sm:mt-0">Happy Clients</p>
                </div>

                <div className="p-3 sm:p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-1 text-slate-900 font-extrabold text-xs">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" /> 35+ States
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5 sm:mt-0">Nationwide Service</p>
                </div>

                <div className="p-3 sm:p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 sm:gap-1 text-emerald-600 font-extrabold text-xs">
                    <Zap className="h-3.5 w-3.5 text-emerald-600" /> 98.6%
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5 sm:mt-0">Zero-Error Filing</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3-Division Translucent Glass Showcase Card */}
            <div
              className="relative z-10 mt-6 lg:mt-0"
              onMouseEnter={() => setIsTabHovered(true)}
              onMouseLeave={() => setIsTabHovered(false)}
            >
              <div className="surface-card p-6 sm:p-7 rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/70 shadow-2xl shadow-blue-900/10 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    OUR SPECIALIZED DIVISIONS
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">Auto 5s</span>
                  </span>
                  <Badge variant="secondary" className="glass-pill text-[10px] font-bold bg-blue-50/80 backdrop-blur-md text-blue-700 border-blue-200/80">
                    Select Division Below
                  </Badge>
                </div>

                {/* 3 Interactive Glass Selector Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-900/5 backdrop-blur-md border border-white/50 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab("passport")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeHeroTab === "passport"
                        ? "bg-white/95 text-blue-600 shadow-md backdrop-blur-md border border-white/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    <Plane className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Passport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHeroTab("software")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeHeroTab === "software"
                        ? "bg-white/95 text-blue-600 shadow-md backdrop-blur-md border border-white/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                    <span className="truncate">Software</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHeroTab("marketing")}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeHeroTab === "marketing"
                        ? "bg-white/95 text-blue-600 shadow-md backdrop-blur-md border border-white/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    <Megaphone className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">Marketing</span>
                  </button>
                </div>

                {/* Dynamic Active Division Showcase Content */}
                <div className="pt-2">
                  {activeHeroTab === "passport" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">TRAVEL CONFIDENTLY</p>
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                            Passport &amp; Consular Concierge
                          </h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Guided documentation, consular audit compliance, global visa applications, and 24-hour emergency priority processing.
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-blue-50/80 backdrop-blur-md border border-blue-200/50 text-blue-600 grid place-items-center shrink-0 shadow-2xs">
                          <Plane className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-800 font-semibold bg-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Adult &amp; Minor Passport Renewals
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Dual Residency &amp; Consular Certificates
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 24-Hour Emergency Priority Filing
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-extrabold text-slate-600">Avg Turnaround: 24H - 5 Days</span>
                        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20">
                          <Link to="/passport">
                            View Passport Services <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeHeroTab === "software" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">BUILD DIGITALLY</p>
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                            Custom Software &amp; Web SaaS
                          </h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            Enterprise React/Next.js web portals, ERP dashboards, modern UI/UX design systems, and cloud backend architecture.
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-slate-100/80 backdrop-blur-md border border-slate-200/50 text-slate-800 grid place-items-center shrink-0 shadow-2xs">
                          <Code2 className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-800 font-semibold bg-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Next.js &amp; React Enterprise Web Apps
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Glassmorphism UI/UX Design &amp; Systems
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 100% Full IP Code Ownership
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-extrabold text-slate-600">Delivery: 2 - 4 Weeks</span>
                        <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md">
                          <Link to="/web-development">
                            Explore Web Dev <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeHeroTab === "marketing" && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider">GROW GLOBALLY</p>
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                            Digital Growth &amp; PPC Marketing
                          </h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                            High-converting Google Ads PPC campaigns, technical SEO, brand identity, and multi-channel lead funnels.
                          </p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-rose-50/80 backdrop-blur-md border border-rose-200/50 text-rose-600 grid place-items-center shrink-0 shadow-2xs">
                          <Megaphone className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-800 font-semibold bg-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/70 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Google Ads &amp; PPC Funnel Optimization
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Local &amp; International Technical SEO
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Guaranteed ROI Tracking &amp; Analytics
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-extrabold text-slate-600">Setup: 48H Launch</span>
                        <Button asChild size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/20">
                          <Link to="/digital-marketing">
                            View Marketing <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 3 Core Division Detailed Showcases */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 space-y-16 pb-16 sm:pb-20">
        
        {/* PASSPORT & VISA DIVISION SHOWCASE */}
        <section className="space-y-6 border-t border-border/60 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="secondary" className="glass-pill mb-2 text-xs font-semibold">
                DIVISION 01 • PASSPORT &amp; VISA
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl text-foreground">Passport &amp; Visa Concierge Services</h2>
              <p className="mt-1 text-sm text-muted-foreground font-normal">
                24-Hour emergency rush processing, adult/minor renewals, OCI cards, and e-visas with guaranteed error-free preparation.
              </p>
            </div>
            <Button asChild variant="outline" className="glass-card font-semibold shrink-0">
              <Link to="/passport">
                View Passport Services <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <InteractiveCapabilitiesGallery
            badgeText="PASSPORT & VISA SOLUTIONS"
            mainHeading="Expedited Passport & OCI Capabilities"
            mainSubheading="Select any of our 6 core passport & visa services to start your guided intake."
          />
        </section>

        {/* WEB & CUSTOM SOFTWARE DIVISION SHOWCASE */}
        <section className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/90 space-y-6 shadow-glass">
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-center gap-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="glass-pill text-xs font-semibold">
                DIVISION 02 • SOFTWARE &amp; UI/UX
              </Badge>
              <h2 className="text-2xl font-extrabold sm:text-3xl text-foreground">
                Web Development, Custom Software &amp; UI/UX Design
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                We build high-performance web applications, enterprise SaaS platforms, and modern UI/UX design systems engineered for scale. From landing pages to full-stack cloud applications.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" /> React / Next.js / TypeScript
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Custom UI/UX Design Systems
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Full-Stack API Integration
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Cloud &amp; Serverless Backend
                </div>
              </div>
              <div className="pt-2">
                <Button asChild size="lg" className="h-11 font-semibold shadow-md">
                  <Link to="/web-development">
                    Explore Software Development <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/80">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" /> Software Development Intake
              </h3>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                Need a custom web app, mobile-friendly portal, or UI redesign? Tell us about your project for a scope &amp; turnaround estimate.
              </p>
              <Button asChild variant="outline" className="glass-card w-full font-semibold">
                <Link to="/web-development">Start Web Dev Intake</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* DIGITAL MARKETING DIVISION SHOWCASE */}
        <section className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/90 space-y-6 shadow-glass">
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-center gap-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="glass-pill text-xs font-semibold">
                DIVISION 03 • DIGITAL MARKETING
              </Badge>
              <h2 className="text-2xl font-extrabold sm:text-3xl text-foreground">
                Digital Marketing, SEO &amp; Performance Growth
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                Accelerate your business with data-backed Search Engine Optimization (SEO), targeted Google Ads PPC campaigns, social media marketing, and conversion rate optimization.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Local &amp; National SEO Audit
                </div>
                <div className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-primary" /> Google &amp; Social Ads Campaigns
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Conversion Funnel Audits
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Real-Time Analytics &amp; ROI
                </div>
              </div>
              <div className="pt-2">
                <Button asChild size="lg" className="h-11 font-semibold shadow-md">
                  <Link to="/digital-marketing">
                    Explore Digital Marketing <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/80">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" /> Growth Marketing Inquiry
              </h3>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                Ready to scale your online presence and acquire high-intent customers? Get a free marketing strategy consultation.
              </p>
              <Button asChild variant="outline" className="glass-card w-full font-semibold">
                <Link to="/digital-marketing">Request Marketing Plan</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 3-Step Process Banner */}
        <StepsBanner />

        {/* Turnaround Speed Estimator */}
        <TurnaroundEstimator />

        {/* Disclaimer Banner */}
        <TrustBanner />

        {/* Unified Category Explorer with 3 Divisions */}
        <section id="services" className="scroll-mt-24">
          <h2 className="text-2xl font-bold sm:text-3xl text-foreground">Explore All 3 Divisions</h2>
          <p className="mt-1 text-sm text-muted-foreground font-normal">
            Tap a category below to explore services, requirements, and launch your intake.
          </p>
          <div className="mt-6">
            <CategoryExplorer />
          </div>
        </section>

        {/* Client Success Stories & Testimonials (PRD Section 7) */}
        <Testimonials />

        {/* Frequently Asked Questions Accordion (PRD Section 8) */}
        <FaqSection />

        {/* Tracking Card */}
        <section className="glass-panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr] rounded-3xl border border-white/90">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl text-foreground">Track Your Active Intake or Project</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-normal">
              Follow your passport renewal status, custom web application milestone, or digital marketing campaign performance in real time.
            </p>
          </div>
          <div className="flex items-end">
            <Button asChild variant="outline" size="lg" className="glass-card h-12 w-full text-sm font-semibold">
              <Link to="/track">Track My Intake Status</Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Guided 3-Step Express Intake Modal */}
      <ServiceIntakeWizardModal open={wizardOpen} onOpenChange={setWizardOpen} />
    </main>
  );
}
