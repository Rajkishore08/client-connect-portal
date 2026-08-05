import { createFileRoute } from "@tanstack/react-router";

import { PassportList } from "@/components/site/CategoryExplorer";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";

export const Route = createFileRoute("/passport/")({
  head: () => ({
    meta: [
      { title: "Passport & Visa Services — Meridian Client Services" },
      {
        name: "description",
        content:
          "Passport renewal, OCI, renunciation, emergency certificate, e-visa and lost passport assistance with clear document checklists.",
      },
      { property: "og:title", content: "Passport & Visa Services" },
      {
        property: "og:description",
        content: "Six guided passport and visa services with document checklists shown upfront.",
      },
    ],
  }),
  component: PassportIndex,
});

function PassportIndex() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Passport &amp; Visa Services</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Choose a service to see the exact documents you'll need before filling in any personal
          details.
        </p>
      </header>

      <StepsBanner compact />
      <TrustBanner />
      <PassportList />
    </main>
  );
}
