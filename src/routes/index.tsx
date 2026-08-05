import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Clock, Lock, MessagesSquare, ShieldCheck } from "lucide-react";

import { CategoryExplorer } from "@/components/site/CategoryExplorer";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { TurnaroundEstimator } from "@/components/site/TurnaroundEstimator";
import { Button } from "@/components/ui/button";
import GradientWaves from "@/components/ui/GradientWaves";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One World Solutions — Expedited Passport, Visa & Digital Services" },
      {
        name: "description",
        content:
          "Fast, secure, and stress-free expedited passport and visa solutions by One World Solutions. Walk-ins welcome & emergency 24-hour rush processing available.",
      },
      { property: "og:title", content: "One World Solutions — Client Intake Portal" },
      {
        property: "og:description",
        content:
          "Expedited US Passport renewal, OCI, E-Visas, digital marketing, and web development intake.",
      },
    ],
  }),
  component: Home,
});

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: "Walk-Ins & Online",
    desc: "Chicago HQ or remote intake",
  },
  {
    icon: Clock,
    title: "24H Emergency Rush",
    desc: "Same-day expedited queue",
  },
  {
    icon: Lock,
    title: "Confidential Handling",
    desc: "100% document encryption",
  },
  {
    icon: MessagesSquare,
    title: "Direct Support",
    desc: "Dedicated case concierge",
  },
];

function Home() {
  return (
    <main>
      {/* Animated Hero Section */}
      <section className="relative overflow-hidden hero-wash border-b border-border py-10 sm:py-20">
        {/* Animated WebGL Canvas Waves - Vivid & High Contrast Colors */}
        <GradientWaves
          horizonColor="#085a6a"
          waveColor="#0284c7"
          crestColor="#38bdf8"
          speed={0.4}
          amplitude={2.8}
          waveScale={0.65}
          waveRatio={0.9}
          opacity={0.8}
          brightness={1.1}
          mouseInteraction={true}
          grain={true}
          grainIntensity={0.03}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground shadow-sm backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 sm:h-4 sm:w-4" />
              <span>Walk-Ins Welcome • Chicago HQ</span>
            </span>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl text-foreground drop-shadow-sm">
              Expedited Passport &amp; Visa Solutions — <span className="text-primary">Fast, Secure &amp; Easy.</span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-800 font-medium sm:text-lg drop-shadow-xs">
              Get your US passport or foreign visa expedited in as little as 1–14 days. Avoid 5–7 week government delays with guaranteed error-free preparation.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:flex sm:items-center sm:gap-3">
              <Button asChild size="lg" className="h-11 px-6 text-sm font-bold shadow-lg shadow-primary/30 sm:h-12 sm:px-7 sm:text-base">
                <a href="#services">
                  Explore Services <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm font-medium bg-card/90 backdrop-blur-md shadow-xs sm:h-12 sm:px-7 sm:text-base">
                <Link to="/book">
                  <CalendarCheck className="h-4 w-4 mr-1.5" /> Schedule Visit / Call
                </Link>
              </Button>
            </div>
          </div>

          {/* High-End Enterprise Trust Bar */}
          <div className="mt-8 sm:mt-12 rounded-2xl border border-border/80 bg-card/90 p-4 sm:p-5 backdrop-blur-md shadow-md">
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:divide-x lg:divide-border/60">
              {TRUST_BADGES.map((badge, idx) => (
                <li
                  key={badge.title}
                  className={`flex items-center gap-3 ${idx > 0 ? "lg:pl-6" : ""}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary shadow-xs">
                    <badge.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-extrabold text-foreground leading-tight truncate">
                      {badge.title}
                    </span>
                    <span className="block text-[11px] font-medium text-muted-foreground truncate mt-0.5">
                      {badge.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-16">
        {/* Interactive Capabilities Gallery */}
        <InteractiveCapabilitiesGallery
          badgeText="TAILORED EXPERTISE"
          mainHeading="Expedited Passport & Core Capabilities"
          mainSubheading="Explore our end-to-end expedited passport renewals, OCI applications, and digital services tailored for fast delivery."
        />

        {/* 3-Step Process Banner */}
        <StepsBanner />

        {/* Turnaround & Speed Estimator */}
        <TurnaroundEstimator />

        {/* Disclaimer Banner */}
        <TrustBanner />

        {/* Services Category Explorer */}
        <section id="services" className="scroll-mt-24">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Select a Service Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap a category below to explore services, requirements, and start your intake.
          </p>
          <div className="mt-6">
            <CategoryExplorer />
          </div>
        </section>

        {/* Tracking Card */}
        <section className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Track Your Active Application</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Follow your passport or visa application status through government preparation, submission, VFS, and FedEx delivery.
            </p>
          </div>
          <div className="flex items-end">
            <Button asChild variant="outline" size="lg" className="h-12 w-full text-base font-bold">
              <Link to="/track">Track My Application</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
