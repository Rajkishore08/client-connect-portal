import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Megaphone, Search, Target, TrendingUp, Zap } from "lucide-react";

import { MarketingPanel } from "@/components/site/CategoryExplorer";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/digital-marketing")({
  head: () => ({
    meta: [
      { title: "Digital Marketing, SEO & PPC Services — One World Solutions Agency" },
      {
        name: "description",
        content:
          "Data-driven digital marketing, SEO, Google Ads PPC campaigns, social media management, and lead generation by One World Solutions in Chicago.",
      },
      { property: "og:title", content: "Digital Marketing & Performance Growth | One World Solutions" },
      {
        property: "og:description",
        content: "Scale your revenue with data-backed SEO, targeted PPC ads, and high-converting marketing funnels.",
      },
    ],
  }),
  component: DigitalMarketingPage,
});

const MARKETING_SERVICES = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    desc: "Dominate search rankings for high-intent keywords. Complete technical audit, on-page optimization, and authoritative backlink building.",
    tag: "High ROI",
  },
  {
    icon: Target,
    title: "Google Ads & PPC Campaigns",
    desc: "Immediate targeted lead generation with optimized ad copy, negative keyword filters, and conversion-focused landing pages.",
    tag: "Instant Leads",
  },
  {
    icon: TrendingUp,
    title: "Conversion Rate Optimization (CRO)",
    desc: "Turn existing website traffic into paying clients with behavioral heatmaps, A/B testing, and frictionless intake forms.",
    tag: "Revenue Boost",
  },
  {
    icon: Megaphone,
    title: "Social Media & Brand Growth",
    desc: "Strategic content creation, multi-platform brand management, and targeted social ad campaigns designed for customer trust.",
    tag: "Brand Awareness",
  },
];

function DigitalMarketingPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30">
            PILLAR 03 • DIGITAL MARKETING &amp; PERFORMANCE GROWTH
          </Badge>
          <Badge variant="secondary" className="text-xs font-bold gap-1">
            <Zap className="h-3.5 w-3.5 text-primary" /> 3.4x Average Client ROI
          </Badge>
        </div>

        <h1 className="text-3xl font-black sm:text-5xl text-foreground tracking-tight">
          Scale Your Business Revenue —{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-4">
            With Data-Driven Marketing.
          </span>
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          We engineer targeted Search Engine Optimization (SEO), high-ROI Google Ads PPC campaigns, social media strategies, and lead acquisition funnels designed to grow your business.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Transparent Monthly Analytics &amp; Reporting
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Dedicated Growth Strategy Concierge
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            No Long-Term Lock-in Contracts
          </span>
        </div>
      </header>

      {/* Marketing Services Grid */}
      <section className="grid gap-4 sm:grid-cols-2">
        {MARKETING_SERVICES.map((item) => (
          <div
            key={item.title}
            className="surface-card p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="h-10 w-10 rounded-xl bg-primary-soft text-primary font-bold grid place-items-center shadow-xs">
                <item.icon className="h-5 w-5" />
              </span>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {item.tag}
              </Badge>
            </div>
            <h3 className="text-base font-extrabold text-foreground">{item.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      <StepsBanner compact />
      <TrustBanner />

      <section className="pt-2">
        <h2 className="text-2xl font-black mb-4">Request a Custom Digital Marketing Plan</h2>
        <MarketingPanel />
      </section>
    </main>
  );
}
