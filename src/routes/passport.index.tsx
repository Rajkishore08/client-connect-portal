import { createFileRoute } from "@tanstack/react-router";

import { PassportList } from "@/components/site/CategoryExplorer";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";

export const Route = createFileRoute("/passport/")({
  head: () => ({
    meta: [
      { title: "Passport & Visa Services — One World Solutions" },
      {
        name: "description",
        content:
          "Passport renewal, OCI, renunciation, emergency certificate, e-visa and lost passport assistance with clear document checklists.",
      },
      { property: "og:title", content: "Passport & Visa Services — One World Solutions" },
      {
        property: "og:description",
        content: "Six guided passport and visa services with document checklists shown upfront.",
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
    description: "Renew an expiring or expired Indian passport with guided form preparation.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200",
    link: "/passport/passport-renewal",
    tag: "Most Popular",
  },
  {
    id: "02",
    title: "OCI",
    subtitle: "Overseas Citizen of India",
    description: "Overseas Citizen of India registration, re-issue and miscellaneous services.",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200",
    link: "/passport/oci",
    tag: "NRI Specialty",
  },
  {
    id: "03",
    title: "Renunciation / Passport Surrender",
    subtitle: "Post Naturalization Surrender",
    description: "Surrender your Indian passport after acquiring foreign citizenship.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200",
    link: "/passport/renunciation",
  },
  {
    id: "04",
    title: "Emergency Certificate",
    subtitle: "One-Way Urgent Return",
    description: "One-way travel document for urgent return to India.",
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
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl text-foreground">
          Passport &amp; Visa Services
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Choose a service below to review exact document requirements, calculate turnaround speed, and launch your intake.
        </p>
      </header>

      {/* Interactive Capabilities Gallery with Exact 6 Passport Services */}
      <InteractiveCapabilitiesGallery
        items={EXACT_PASSPORT_CAPABILITIES}
        badgeText="PASSPORT & VISA SOLUTIONS"
        mainHeading="Expedited Passport & Visa Capabilities"
        mainSubheading="Select any of our 6 core passport & visa services to start your guided intake."
      />

      <StepsBanner compact />
      <TrustBanner />

      <section className="pt-4">
        <h2 className="text-2xl font-bold mb-4">All Guided Passport &amp; Visa Intake Forms</h2>
        <PassportList />
      </section>
    </main>
  );
}
