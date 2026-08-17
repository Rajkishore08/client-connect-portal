import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { OFFICE_LOCATION } from "@/data/mock-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — One World Solutions" },
      {
        name: "description",
        content:
          "Privacy policy, data security practices, and document protection guarantees for One World Solutions.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          <Lock className="h-3.5 w-3.5" /> Confidentiality &amp; Data Security
        </span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <TrustBanner />

      <div className="surface-card p-6 sm:p-8 space-y-6 text-sm text-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. Corporate Entity &amp; Information We Collect</h2>
          <p className="text-muted-foreground">
            One World Solutions operates under <strong>ABHIPRIYA GROUPS LLC</strong>. We collect personal identification data necessary for client intake, including full names, contact emails, phone numbers, birth dates, passport details, and supporting application files uploaded by clients.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. How We Use Your Data</h2>
          <p className="text-muted-foreground">
            Your data is strictly utilized to prepare official application forms, verify document eligibility, coordinate courier shipments, and communicate status updates regarding your requested passport or visa services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. Strict Data Confidentiality &amp; Non-Disclosure</h2>
          <p className="text-muted-foreground">
            One World Solutions does not sell, rent, or lease client data to third parties. Information is only shared with designated processing partners (e.g., government passport agencies, courier services) as required to fulfill your order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">4. Document Retention &amp; Disposal</h2>
          <p className="text-muted-foreground">
            Digital copies of sensitive documents are stored in encrypted form during processing and purged following successful service delivery in accordance with security retention guidelines.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-bold text-foreground">5. Privacy Officer Contact</h2>
          <div className="text-muted-foreground space-y-1 text-xs sm:text-sm">
            <p><strong>One World Solutions Data Protection</strong></p>
            <p>{OFFICE_LOCATION.address}</p>
            <p>Email: {OFFICE_LOCATION.email}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
