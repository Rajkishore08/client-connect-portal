import { createFileRoute } from "@tanstack/react-router";

import { WebServiceGrid } from "@/components/site/CategoryExplorer";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";

export const Route = createFileRoute("/web-development")({
  head: () => ({
    meta: [
      { title: "Website Development — Meridian Client Services" },
      {
        name: "description",
        content:
          "Landing pages, portfolios, web apps, animated sites, ERP and SaaS platforms, MVPs and API integrations. Quotes after a scoping call.",
      },
      { property: "og:title", content: "Website Development — Meridian Client Services" },
      {
        property: "og:description",
        content: "Nine web and custom software services. Detailed quotes after a scoping call.",
      },
    ],
  }),
  component: WebDevelopmentPage,
});

function WebDevelopmentPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Website Development</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          From a fast landing page to a multi-tenant SaaS platform. Detailed quotes provided after a
          scoping call.
        </p>
      </header>

      <StepsBanner compact />
      <TrustBanner />
      <WebServiceGrid />
    </main>
  );
}
