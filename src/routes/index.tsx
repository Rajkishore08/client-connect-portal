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
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
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
          "Helping individuals travel confidently and businesses scale smarter across Passport Concierge, Web Software & Digital Marketing.",
      },
    ],
  }),
  component: Home,
});

const SOCIAL_PROOF_METRICS = [
  { label: "Google Rating", value: "4.9 / 5.0", sub: "⭐ 340+ Verified Reviews" },
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
    <main>
      {/* High-Impact Hero Section with World Network Atmosphere */}
      <section className="relative overflow-hidden hero-wash border-b border-border py-12 sm:py-20 lg:py-24">
        {/* Animated WebGL Canvas Waves */}
        <GradientWaves
          horizonColor="#EFF6FF"
          waveColor="#93C5FD"
          crestColor="#2563EB"
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

        {/* Subtle World Map Latitude Arcs Texture (2% Opacity) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.15fr_0.95fr] items-center gap-10 lg:gap-14">
            
            {/* Left Column: Story-Driven Headline & Proof */}
            <div className="space-y-6">
              {/* Top Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-900 shadow-2xs backdrop-blur-md dark:text-amber-300">
                <span className="flex items-center gap-1 text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                </span>
                <span>Trusted Across USA • Chicago HQ</span>
              </div>

              {/* Story-Driven Headline */}
              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                One Agency. <br className="hidden sm:inline" />
                Three Specialized Divisions.
              </h1>

              {/* Story Subtitle */}
              <p className="text-base leading-relaxed text-muted-foreground font-normal sm:text-lg max-w-xl">
                Helping individuals travel confidently and businesses scale smarter — with expedited passport handling, custom web software development, and high-ROI digital marketing.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="pt-2 grid grid-cols-1 gap-3 sm:flex sm:items-center sm:gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <a href="#divisions">
                    Explore Services <ArrowRight className="h-4.5 w-4.5 ml-1.5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-7 text-sm font-semibold bg-primary-soft/50 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <Link to="/book">
                    <CalendarCheck className="h-4.5 w-4.5 mr-2" /> Book Consultation
                  </Link>
                </Button>
              </div>

              {/* Immediate Social Proof Bar Under Buttons (Point #12) */}
              <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1 font-bold text-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> 4.9/5 Google Rating
                </span>
                <span>•</span>
                <span>2,500+ Happy Clients</span>
                <span>•</span>
                <span>35+ States Served</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">98.6% Success</span>
              </div>
            </div>

            {/* Right Column: Branded Multi-Service Visual Illustration Anchor (Point #1) */}
            <div className="relative">
              <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-glass space-y-6">
                {/* Official Brand Symbol Visual Motif */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <img src="/logo-symbol.png" alt="One World Symbol" className="h-10 w-auto object-contain" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">One World Ecosystem</h3>
                      <p className="text-[11px] text-muted-foreground">Connecting People. Powering Businesses.</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    GLOBAL PLATFORM
                  </Badge>
                </div>

                {/* 3 Interlocking Floating Division Nodes */}
                <div className="space-y-3 relative z-10">
                  {/* Node 1: Passport */}
                  <div className="group glass-card flex items-center justify-between p-3.5 rounded-xl border border-white/80 bg-white/80 hover:border-primary/40 hover:bg-white transition-all shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 grid place-items-center font-bold">
                        🛂
                      </span>
                      <div>
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Passport &amp; Visa Concierge</p>
                        <p className="text-[11px] text-muted-foreground">24H Expedited Filing Active</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      VFS Approved
                    </span>
                  </div>

                  {/* Node 2: Software */}
                  <div className="group glass-card flex items-center justify-between p-3.5 rounded-xl border border-white/80 bg-white/80 hover:border-primary/40 hover:bg-white transition-all shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 grid place-items-center font-bold">
                        💻
                      </span>
                      <div>
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Custom Software &amp; SaaS</p>
                        <p className="text-[11px] text-muted-foreground">React / Next.js / Cloud</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      100% IP Code
                    </span>
                  </div>

                  {/* Node 3: Marketing */}
                  <div className="group glass-card flex items-center justify-between p-3.5 rounded-xl border border-white/80 bg-white/80 hover:border-primary/40 hover:bg-white transition-all shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 grid place-items-center font-bold">
                        📈
                      </span>
                      <div>
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Digital Growth &amp; SEO</p>
                        <p className="text-[11px] text-muted-foreground">High-ROI PPC Campaigns</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-500/10 px-2 py-0.5 rounded-full">
                      3.4x Avg. ROI
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Integrated solutions designed for seamless execution.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Statistics Strip */}
      <section className="glass-card bg-white/60 border-y border-border/60 backdrop-blur-md py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

      {/* Choose Your Division — 3 Equal Division Cards (Points #3, #4) */}
      <section id="divisions" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-medium text-primary border-primary/30">
            CHOOSE YOUR DIVISION
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">
            Three Equal Pillars of Excellence
          </h2>
          <p className="text-sm text-muted-foreground font-normal leading-relaxed">
            Select any division below to explore guided intake forms, project scope calculators, and strategy consultations.
          </p>
        </div>

        {/* 3 Equal Division Cards: Same Height, Same Visual Weight */}
        <div className="grid gap-6 md:grid-cols-3">
          {EQUAL_DIVISIONS.map((div) => (
            <div
              key={div.title}
              className="group glass-card flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/75 hover:bg-white/95 hover:border-primary/50 transition-all hover:-translate-y-1.5 shadow-card hover:shadow-lift"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary font-bold grid place-items-center shadow-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <div.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-medium">
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
                <Button asChild variant="outline" className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  <Link to={div.link}>
                    Explore Division <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Division Detailed Showcases */}
      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6 sm:pb-20">
        
        {/* PASSPORT & VISA DIVISION SHOWCASE */}
        <section className="space-y-6 border-t border-border/60 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2 text-xs font-medium">
                DIVISION 01 • PASSPORT &amp; VISA
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl text-foreground">Passport &amp; Visa Concierge Services</h2>
              <p className="mt-1 text-sm text-muted-foreground font-normal">
                24-Hour emergency rush processing, adult/minor renewals, OCI cards, and e-visas with guaranteed error-free preparation.
              </p>
            </div>
            <Button asChild variant="outline" className="font-semibold shrink-0">
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
        <section className="surface-card p-6 sm:p-10 rounded-3xl border border-border/80 bg-card space-y-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-center gap-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-xs font-medium">
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
                <Button asChild size="lg" className="h-11 font-semibold">
                  <Link to="/web-development">
                    Explore Software Development <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" /> Software Development Intake
              </h3>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                Need a custom web app, mobile-friendly portal, or UI redesign? Tell us about your project for a scope &amp; turnaround estimate.
              </p>
              <Button asChild variant="outline" className="w-full font-semibold">
                <Link to="/web-development">Start Web Dev Intake</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* DIGITAL MARKETING DIVISION SHOWCASE */}
        <section className="surface-card p-6 sm:p-10 rounded-3xl border border-border/80 bg-card space-y-6">
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-center gap-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-xs font-medium">
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
                <Button asChild size="lg" className="h-11 font-semibold">
                  <Link to="/digital-marketing">
                    Explore Digital Marketing <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" /> Growth Marketing Inquiry
              </h3>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                Ready to scale your online presence and acquire high-intent customers? Get a free marketing strategy consultation.
              </p>
              <Button asChild variant="outline" className="w-full font-semibold">
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

        {/* Tracking Card */}
        <section className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl text-foreground">Track Your Active Intake or Project</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-normal">
              Follow your passport renewal status or active web application milestone in real time.
            </p>
          </div>
          <div className="flex items-end">
            <Button asChild variant="outline" size="lg" className="h-12 w-full text-sm font-semibold">
              <Link to="/track">Track My Intake Status</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
