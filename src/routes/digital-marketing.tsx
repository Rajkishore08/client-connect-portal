import { createFileRoute } from "@tanstack/react-router";

import { MarketingPanel } from "@/components/site/CategoryExplorer";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";

export const Route = createFileRoute("/digital-marketing")({
  head: () => ({
    meta: [
      { title: "Digital Marketing — Meridian Client Services" },
      {
        name: "description",
        content:
          "Our digital marketing catalog is being finalised. Tell us what you need and we'll come back with a tailored recommendation.",
      },
      { property: "og:title", content: "Digital Marketing — Meridian Client Services" },
      {
        property: "og:description",
        content: "Tell us your marketing goals and we'll recommend the right approach.",
      },
    ],
  }),
  component: DigitalMarketingPage,
});

function DigitalMarketingPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Digital Marketing</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Growth, campaigns and brand presence for service businesses.
        </p>
      </header>

      <StepsBanner compact />
      <TrustBanner />
      <MarketingPanel />
    </main>
  );
}
