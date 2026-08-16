import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import { ServiceIntakeForm } from "@/components/site/ServiceIntakeForm";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Badge } from "@/components/ui/badge";
import { PASSPORT_SERVICES } from "@/data/mock-data";

export const Route = createFileRoute("/passport/$service")({
  loader: ({ params }) => {
    const service = PASSPORT_SERVICES.find((s) => s.slug === params.service);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — Meridian Client Services` },
        { name: "description", content: service.description },
        { property: "og:title", content: `${service.title} — Meridian Client Services` },
        { property: "og:description", content: service.description },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/passport"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> All passport services
      </Link>

      <header
        className={`rounded-2xl border p-5 sm:p-7 ${
          service.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{service.title}</h1>
          {service.urgent && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" /> Urgent
            </Badge>
          )}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.description}
        </p>
        {service.urgent && (
          <p className="mt-3 text-sm font-medium text-destructive">
            Lost or stolen passports are prioritised. Submit what you have — we'll call you the same
            business day.
          </p>
        )}
      </header>

      {/* Prominently Highlighted Official Disclaimer Banner */}
      <TrustBanner />

      <StepsBanner compact />

      <ServiceIntakeForm service={service} />
    </main>
  );
}
