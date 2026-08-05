import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Clock, Lock, MapPin, MessagesSquare, ShieldCheck, Zap } from "lucide-react";

import { CategoryExplorer } from "@/components/site/CategoryExplorer";
import { QuickServiceSelector } from "@/components/site/QuickServiceSelector";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { TurnaroundEstimator } from "@/components/site/TurnaroundEstimator";
import { Button } from "@/components/ui/button";

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
  { icon: ShieldCheck, label: "Walk-Ins & Online Intake" },
  { icon: Clock, label: "24-Hour Emergency Rush Available" },
  { icon: Lock, label: "Confidential Document Handling" },
  { icon: MessagesSquare, label: "Direct Concierge Support" },
];

function Home() {
  return (
    <main>
      {/* Hero Section with Quick Service Selector */}
      <section className="hero-wash border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Walk-Ins Welcome • Chicago HQ Office
              </span>
              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                Expedited Passport &amp; Visa Solutions — Fast, Secure &amp; Easy.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get your US passport or foreign visa expedited in as little as 1–14 days. Avoid 5–7 week government delays with guaranteed error-free preparation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 text-base font-bold">
                  <a href="#services">
                    Explore Services <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 text-base">
                  <Link to="/book">
                    <CalendarCheck className="h-4 w-4" /> Schedule Visit / Call
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Interactive Quick Selector */}
            <div>
              <QuickServiceSelector />
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-sm shadow-xs"
              >
                <badge.icon className="h-4.5 w-4.5 shrink-0 text-primary" />
                <span className="min-w-0 text-xs sm:text-sm font-semibold">{badge.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
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
