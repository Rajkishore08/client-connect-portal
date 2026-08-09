import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Zap,
} from "lucide-react";

import { CategoryExplorer } from "@/components/site/CategoryExplorer";
import { FaqSection } from "@/components/site/FaqSection";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Testimonials } from "@/components/site/Testimonials";
import { TurnaroundEstimator } from "@/components/site/TurnaroundEstimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GradientWaves from "@/components/ui/GradientWaves";

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
    desc: "Guided form preparation, VFS compliance verification, and 24-hour emergency hand-carry filing.",
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
  return (
    <main className="relative overflow-hidden">
      {/* Background Radial Light Glow Orbs for High Glassmorphism Contrast */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-500/12 blur-[140px]" />
        <div className="absolute top-[60%] left-[20%] h-[600px] w-[600px] rounded-full bg-sky-400/15 blur-[150px]" />
      </div>

      {/* High-Impact Hero Section */}
      <section className="relative z-10 hero-wash border-b border-border/70 pt-4 pb-8 sm:py-20 lg:py-24">
        {/* Animated WebGL Canvas Waves */}
        <GradientWaves
          horizonColor="#EFF4FF"
          waveColor="#93C5FD"
          crestColor="#0F52FF"
          opacity={0.35}
          speed={0.3}
          amplitude={2.2}
          waveScale={0.55}
          waveRatio={0.85}
          brightness={1.05}
          mouseInteraction={true}
          grain={true}
          grainIntensity={0.02}
        />

        {/* Brand Network Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#0F52FF_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.15fr_0.95fr] items-center gap-6 lg:gap-14">
            
            {/* Left Column: Story & Transformation-Focused Hero */}
            <div className="space-y-3.5 sm:space-y-6">
              {/* Top Trust Badge */}
              <div className="glass-pill max-w-full inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-slate-800 backdrop-blur-md">
                <span className="flex items-center gap-0.5 text-amber-500 shrink-0">
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                </span>
                <span className="font-semibold text-slate-900 truncate">Rated 4.9/5 • Chicago HQ • USA</span>
              </div>

              {/* High-Contrast Transformation Headline (Ultra-Responsive for iPhone 5/6/7/SE) */}
              <h1 className="text-[clamp(1.25rem,5.2vw,3.75rem)] font-extrabold leading-[1.15] tracking-tight text-foreground font-display break-words">
                Helping People Cross Borders <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-700 via-primary to-blue-900 bg-clip-text text-transparent font-extrabold">
                  &amp; Businesses Scale Worldwide.
                </span>
              </h1>

              {/* Outcome-Focused Subheadline */}
              <p className="text-xs sm:text-lg leading-relaxed text-muted-foreground font-normal max-w-xl">
                We simplify international travel, build world-class digital products, and accelerate business growth—all under one trusted global partner.
              </p>

              {/* CTAs (Full-Width Touch-Friendly Buttons on Mobile) */}
              <div className="pt-1 grid grid-cols-1 gap-2.5 sm:flex sm:items-center sm:gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-6 text-sm sm:text-base font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground">
                  <a href="#divisions">
                    Get Started Today <ArrowRight className="h-4.5 w-4.5 ml-2 shrink-0" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="glass-card w-full sm:w-auto h-12 sm:h-13 px-6 text-sm sm:text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <Link to="/book">
                    <CalendarCheck className="h-4.5 w-4.5 mr-2 shrink-0" /> Book Free Consultation
                  </Link>
                </Button>
              </div>

              {/* Trust Section Metrics Grid (2x2 on Mobile, 4-Columns on Desktop) */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 border-t border-border/60">
                <div className="p-2.5 sm:p-3.5 rounded-2xl glass-card text-center space-y-0.5">
                  <p className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight font-display">4.9/5</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-primary">340+ Reviews</p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-2xl glass-card text-center space-y-0.5">
                  <p className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight font-display">2,500+</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-primary">Happy Clients</p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-2xl glass-card text-center space-y-0.5">
                  <p className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight font-display">35+ States</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-primary">USA Network</p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-2xl glass-card text-center space-y-0.5">
                  <p className="text-lg sm:text-2xl font-extrabold text-emerald-700 tracking-tight font-display">98.6%</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-emerald-700">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Visual Composition featuring Chicago Skyline & Interlocking Ecosystem */}
            <div className="relative z-10 mt-6 lg:mt-0">
              <div className="glass-panel relative overflow-hidden p-4 sm:p-8 shadow-glass rounded-3xl border border-white/90">
                {/* Background Chicago & World Flight Map Visual Backdrop */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#0F52FF_2px,transparent_2px)] [background-size:24px_24px]" />

                {/* Official Brand Symbol & Chicago HQ Motif */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/60 pb-4">
                  <div className="flex items-center gap-3">
                    <img src="/logo-symbol.webp" alt="One World Symbol" className="h-12 w-auto object-contain" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">One World Ecosystem</h3>
                      <p className="text-[11px] text-muted-foreground font-medium">Chicago HQ • Global Operations</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="glass-pill text-[10px] font-mono text-primary font-bold border-primary/30 px-3 py-1">
                    FORTUNE 500 READY
                  </Badge>
                </div>

                {/* 3 Interlocking Floating Glass Division Cards */}
                <div className="space-y-3.5 pt-4 relative z-10">
                  {/* Card 1: Passport & Visa */}
                  <div className="glass-card group flex items-center justify-between p-4 rounded-2xl border border-white/80 hover:bg-white hover:border-primary/50 transition-all shadow-2xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="h-11 w-11 shrink-0 rounded-2xl bg-emerald-500/15 text-emerald-700 grid place-items-center shadow-2xs">
                        <ShieldCheck className="h-5.5 w-5.5 text-emerald-700" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">Passport &amp; Visa Concierge</p>
                        <p className="text-[11px] text-muted-foreground font-normal truncate">24H Rush Expediting &amp; VFS Audit</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0 ml-2">
                      VFS Compliant
                    </span>
                  </div>

                  {/* Card 2: Custom Software & SaaS */}
                  <div className="glass-card group flex items-center justify-between p-4 rounded-2xl border border-white/80 hover:bg-white hover:border-primary/50 transition-all shadow-2xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="h-11 w-11 shrink-0 rounded-2xl bg-blue-500/15 text-blue-700 grid place-items-center shadow-2xs">
                        <Code2 className="h-5.5 w-5.5 text-blue-700" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">Custom Software &amp; SaaS</p>
                        <p className="text-[11px] text-muted-foreground font-normal truncate">React / Next.js / Cloud Platforms</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 shrink-0 ml-2">
                      100% IP Code
                    </span>
                  </div>

                  {/* Card 3: Digital Growth & Marketing */}
                  <div className="glass-card group flex items-center justify-between p-4 rounded-2xl border border-white/80 hover:bg-white hover:border-primary/50 transition-all shadow-2xs">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="h-11 w-11 shrink-0 rounded-2xl bg-purple-500/15 text-purple-700 grid place-items-center shadow-2xs">
                        <TrendingUp className="h-5.5 w-5.5 text-purple-700" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">Digital Growth &amp; Marketing</p>
                        <p className="text-[11px] text-muted-foreground font-normal truncate">High-ROI Campaigns &amp; Conversion</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 shrink-0 ml-2">
                      3.4x Avg. ROI
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Integrated solutions designed for seamless enterprise execution.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Statistics Strip */}
      <section className="glass-card relative z-10 border-y border-white/80 py-6 sm:py-8 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x-0 sm:divide-x divide-border/60">
            {SOCIAL_PROOF_METRICS.map((item) => (
              <div key={item.label} className="space-y-1 p-2">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{item.value}</p>
                <p className="text-xs font-semibold text-primary">{item.label}</p>
                <p className="text-[11px] text-muted-foreground font-normal">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Division — 3 Equal Division Cards */}
      <section id="divisions" className="relative z-10 scroll-mt-24 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="glass-pill text-xs font-semibold text-primary border-primary/30 px-3 py-1">
            CHOOSE YOUR DIVISION
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">
            Three Equal Pillars of Excellence
          </h2>
          <p className="text-sm text-muted-foreground font-normal leading-relaxed">
            Select any division below to explore guided intake forms, project scope calculators, and strategy consultations.
          </p>
        </div>

        {/* 3 Equal Division Cards: Glassmorphism Enabled */}
        <div className="grid gap-6 md:grid-cols-3">
          {EQUAL_DIVISIONS.map((div) => (
            <div
              key={div.title}
              className="group glass-card flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-white/80 hover:border-primary/50 transition-all hover:-translate-y-1.5 shadow-card hover:shadow-lift"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary font-bold grid place-items-center shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <div.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="glass-pill text-[10px] font-medium border-border/80">
                    {div.badge}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {div.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary">{div.subtitle}</p>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground font-normal">
                  {div.desc}
                </p>

                <div className="pt-2 space-y-2 border-t border-border/60">
                  {div.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs font-normal text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button asChild className="w-full font-bold bg-primary text-primary-foreground hover:bg-blue-700 shadow-md transition-all group-hover:shadow-lift">
                  <Link to={div.link}>
                    Explore Division <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
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
    </main>
  );
}
