import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShieldCheck } from "lucide-react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { OFFICE_LOCATION } from "@/data/mock-data";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — One World Solutions" },
      {
        name: "description",
        content:
          "Terms and Conditions of Service for One World Solutions client intake portal and expedited document assistance.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
          <FileText className="h-3.5 w-3.5" /> Legal &amp; Compliance
        </span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl text-foreground">
          Terms &amp; Conditions of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <TrustBanner />

      <div className="surface-card p-6 sm:p-8 space-y-6 text-sm text-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. Service Scope &amp; Private Company Disclaimer</h2>
          <p className="text-muted-foreground">
            One World Solutions ("Company", "we", "us") is a private service-based consultancy that provides administrative assistance, document pre-checking, expedited form preparation, and process guidance. We are not a government agency, embassy, consulate, or official government affiliate.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. Fees &amp; Payment Responsibilities</h2>
          <p className="text-muted-foreground">
            Our service fees cover professional document preparation, concierge handling, and status tracking. Official government filing fees (e.g., U.S. Department of State passport fees, consular visa fees) and courier delivery charges are distinct and paid by the client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. Processing Times &amp; Guarantees</h2>
          <p className="text-muted-foreground">
            Estimated turnaround times (e.g., 24-Hour Emergency Rush, 2–4 Day Expedited) represent our target processing schedules based on normal agency operations. Final passport or visa approval rests solely with the government authority.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">4. Client Accuracy &amp; Document Verification</h2>
          <p className="text-muted-foreground">
            Clients are responsible for providing authentic, accurate, and truthful documentation. One World Solutions reviews submissions for procedural compliance but does not alter government record filings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">5. Refund &amp; Cancellation Policy</h2>
          <p className="text-muted-foreground">
            <strong>Applicant Error Non-Refundability:</strong> No refunds will be provided if delays, government rejections, or processing issues occur due to errors, inaccuracies, missing details, fraudulent documents, or personal circumstances on the applicant’s side. 
          </p>
          <p className="text-muted-foreground">
            <strong>Eligible Refunds:</strong> A full or partial refund of our service fee will be issued <strong>strictly and exclusively</strong> if the processing failure or procedural error originates directly from One World Solutions' administrative handling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">6. Source Code Acquisition &amp; Commercial IP Buyout</h2>
          <p className="text-muted-foreground">
            Standard software and web development scopes cover fully managed deployment, hosted cloud infrastructure, and operational software access. Clients requesting complete source code delivery, master GitHub repository transfer, and full commercial IP acquisition are subject to a <strong>200% (2x) project total fee multiplier</strong>, finalized during the initial project scoping phase.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-bold text-foreground">6. Contact Information &amp; Office Location</h2>
          <div className="text-muted-foreground space-y-1 text-xs sm:text-sm">
            <p><strong>One World Solutions Headquarters</strong></p>
            <p>{OFFICE_LOCATION.address}</p>
            <p>Hotline: {OFFICE_LOCATION.phone}</p>
            <p>Email: {OFFICE_LOCATION.email}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
