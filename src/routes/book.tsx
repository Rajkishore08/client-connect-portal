import { createFileRoute } from "@tanstack/react-router";

import { BookingWidget } from "@/components/site/BookingWidget";
import { TrustBanner } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Meridian Client Services" },
      {
        name: "description",
        content:
          "Pick a date and time for a free consultation about your passport, visa, marketing or web project.",
      },
      { property: "og:title", content: "Book a Consultation — Meridian Client Services" },
      {
        property: "og:description",
        content: "Choose a date and time slot and we'll confirm by email.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Book a Consultation</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          A 30-minute call to review your case, confirm the documents you need, and outline the
          timeline.
        </p>
      </header>

      <TrustBanner />
      <BookingWidget />
    </main>
  );
}
