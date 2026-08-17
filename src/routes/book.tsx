import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Star } from "lucide-react";

import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Free Agency Consultation — One World Solutions" },
      {
        name: "description",
        content:
          "Schedule a 30-minute consultation with our Chicago specialists for expedited passport renewal, custom software scoping, or digital marketing growth.",
      },
      { property: "og:title", content: "Book Free Consultation | One World Solutions Agency" },
      {
        property: "og:description",
        content: "Choose a date and time slot for your 30-minute strategy call or Chicago HQ visit.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 pt-24 sm:pt-32 pb-12 sm:pb-16 sm:px-6">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30">
            STRATEGY &amp; INTAKE CONSULTATION
          </Badge>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Rated 4.9/5 • Free 30-Min Consultation
          </div>
        </div>

        <h1 className="text-3xl font-black sm:text-5xl text-foreground tracking-tight">
          Book Your Strategy Call —{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-4">
            Or Chicago HQ Visit.
          </span>
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Connect with our specialists for a 30-minute session to review your expedited passport documents, custom software architecture, or digital marketing growth plan.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            100% Free &amp; No Obligation
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Covers Passport, Web Dev &amp; Marketing
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Same-Day Confirmation by Email/SMS
          </span>
        </div>
      </header>

      <TrustBanner />
      <BookingWidget />
    </main>
  );
}
