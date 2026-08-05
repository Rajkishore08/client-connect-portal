import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Lock, MessagesSquare, ShieldCheck, Timer } from "lucide-react";

import { CategoryExplorer } from "@/components/site/CategoryExplorer";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Client Services — Passport, Visa & Digital Services" },
      {
        name: "description",
        content:
          "Request passport, visa, digital marketing or website development services in three easy steps. Clear checklists, live tracking and a private, transparent process.",
      },
      { property: "og:title", content: "Meridian Client Services Intake Portal" },
      {
        property: "og:description",
        content:
          "Request passport, visa, digital marketing or website development services in three easy steps.",
      },
    ],
  }),
  component: Home,
});

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Private, secure intake" },
  { icon: Timer, label: "Response within 1 business day" },
  { icon: Lock, label: "Documents handled confidentially" },
  { icon: MessagesSquare, label: "Real humans, no call centre" },
];

function Home() {
  return (
    <main>
      <section className="hero-wash border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              A private service company — never a government agency
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              Passport, visa and digital services — handled properly, start to finish.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Pick a category, pick a service, and see exactly which documents you need before you
              type a single field. Built for NRIs who want clarity, not paperwork anxiety.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 text-base">
                <a href="#services">
                  Request a Service <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 text-base">
                <Link to="/book">
                  <CalendarCheck className="h-4 w-4" /> Book a Consultation
                </Link>
              </Button>
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-sm"
              >
                <badge.icon className="h-4.5 w-4.5 shrink-0 text-primary" />
                <span className="min-w-0 text-sm font-medium">{badge.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <StepsBanner />

        <TrustBanner />

        <section id="services" className="scroll-mt-24">
          <h2 className="text-2xl font-bold sm:text-3xl">Choose a category</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap a category to see its services. Everything is two levels deep — never more.
          </p>
          <div className="mt-6">
            <CategoryExplorer />
          </div>
        </section>

        <section className="surface-card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Already applied with us?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Follow your application through government form preparation, VFS processing and
              courier delivery — all in one place.
            </p>
          </div>
          <div className="flex items-end">
            <Button asChild variant="outline" size="lg" className="h-12 w-full text-base">
              <Link to="/track">Track My Application</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
