import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

import { PassportList } from "@/components/site/CategoryExplorer";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/passport/")({
  head: () => ({
    meta: [
      { title: "Best Passport Services Company in USA | Expedited Renewal & OCI Concierge" },
      {
        name: "description",
        content:
          "Leading passport services company in USA. Expedited US passport renewal within 24 hours, OCI card application, surrender certificates & global e-visas. Top-rated Chicago agency.",
      },
      { name: "keywords", content: "passport services company usa, expedited passport renewal usa, 24 hour passport rush, oci card application, surrendered passport certificate" },
      { property: "og:title", content: "Top Passport Services Company in USA | One World Solutions" },
      {
        property: "og:description",
        content: "Expedited US passport renewal, OCI cards & visa processing. 24-hour emergency rush intake with document pre-audit.",
      },
    ],
  }),
  component: PassportIndex,
});

const EXACT_PASSPORT_CAPABILITIES = [
  {
    id: "01",
    title: "Passport Renewal",
    subtitle: "Expiring or Expired Passports",
    description: "Renew an expiring or expired international passport with guided form preparation.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
    link: "/passport/passport-renewal",
    tag: "Most Popular",
  },
  {
    id: "02",
    title: "OCI Application",
    subtitle: "Overseas Citizenship of India",
    description: "Overseas Citizenship of India (OCI) registration, renewal & consular guidance.",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200",
    link: "/passport/oci",
    tag: "Global Specialty",
  },
  {
    id: "03",
    title: "Renunciation / Passport Surrender",
    subtitle: "Post Naturalization Surrender",
    description: "Surrender your former passport after acquiring new citizenship.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200",
    link: "/passport/renunciation",
  },
  {
    id: "04",
    title: "Emergency Certificate",
    subtitle: "One-Way Urgent Return",
    description: "One-way travel document for urgent international return travel.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
    link: "/passport/emergency-certificate",
  },
  {
    id: "05",
    title: "E-Visa",
    subtitle: "Electronic Visa Preparation",
    description: "Electronic visa application preparation and document review.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    link: "/passport/e-visa",
  },
  {
    id: "06",
    title: "Lost / Damaged Passport",
    subtitle: "Stolen or Damaged Replacements",
    description: "Replacement guidance for a lost, stolen or damaged passport.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200",
    link: "/passport/lost-damaged-passport",
    tag: "Urgent",
  },
];

function PassportIndex() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 pt-24 sm:pt-32 pb-12 sm:pb-16 sm:px-6">
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30">
            PILLAR 01 • PASSPORT &amp; VISA CONCIERGE
          </Badge>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> 4.9/5 Rating (2,500+ Processed)
          </div>
        </div>

        <h1 className="text-3xl font-black sm:text-5xl text-foreground tracking-tight">
          Get Your Passport &amp; Visas Handled —{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-4">
            Without the Confusion.
          </span>
        </h1>
        
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Double-verified form preparation, consular compliance audit, AES-256 SSL secure document vault, and 24-hour emergency rush filing. Select your service below to review exact document checklists.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            24-Hour Same-Day Rush Available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Guaranteed Error-Free Filing
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            By Appointment &amp; Online Intake Only
          </span>
        </div>
      </header>

      {/* Interactive Capabilities Gallery */}
      <InteractiveCapabilitiesGallery
        items={EXACT_PASSPORT_CAPABILITIES}
        badgeText="PASSPORT & VISA SOLUTIONS"
        mainHeading="Expedited Passport &amp; OCI Capabilities"
        mainSubheading="Select any of our 6 core passport & visa services to start your guided intake."
      />

      <StepsBanner compact />
      <TrustBanner />

      <section className="pt-4">
        <h2 className="text-2xl font-black mb-4">All Guided Passport &amp; Visa Intake Forms</h2>
        <PassportList />
      </section>
    </main>
  );
}
