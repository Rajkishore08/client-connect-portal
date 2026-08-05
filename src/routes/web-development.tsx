import { createFileRoute } from "@tanstack/react-router";

import { WebServiceGrid } from "@/components/site/CategoryExplorer";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";

export const Route = createFileRoute("/web-development")({
  head: () => ({
    meta: [
      { title: "Website & Enterprise Software Development — One World Solutions" },
      {
        name: "description",
        content:
          "Landing pages, portfolios, web apps, AI systems, ERP and SaaS platforms, MVPs and API integrations.",
      },
      { property: "og:title", content: "Website & Software Development — One World Solutions" },
      {
        property: "og:description",
        content: "Custom web design, AI systems, SaaS platforms, and enterprise software engineering.",
      },
    ],
  }),
  component: WebDevelopmentPage,
});

const WEB_CAPABILITIES = [
  {
    id: "01",
    title: "Website Designing (UI/UX)",
    subtitle: "Stunning & Brand-Aligned Interfaces",
    description:
      "Stunning, intuitive, and brand-aligned website interfaces that captivate users. We combine visual excellence with user experience principles to create memorable digital journeys.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200",
    link: "/book",
    tag: "UI/UX Design",
  },
  {
    id: "02",
    title: "Web Applications",
    subtitle: "Scalable Full-Stack SaaS Platforms",
    description:
      "High-performance full-stack web applications built with Next.js, React, Node, and real-time database architecture designed for rapid growth.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    link: "/book",
  },
  {
    id: "03",
    title: "AI Agents & Systems",
    subtitle: "Autonomous LLM Workflows",
    description:
      "Custom AI agents, RAG document search engines, and multi-agent orchestrations that automate complex business processes and client intake.",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200",
    link: "/book",
    tag: "AI & ML",
  },
  {
    id: "04",
    title: "Custom Software Dev",
    subtitle: "Enterprise ERP & Portal Systems",
    description:
      "Bespoke internal portals, client intake dashboards, payment gateway integrations, and cloud infrastructure engineered for zero downtime.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200",
    link: "/book",
  },
  {
    id: "05",
    title: "Mobile Applications",
    subtitle: "iOS & Android Cross-Platform",
    description:
      "Native and cross-platform mobile apps for iOS and Android delivering fluid 60fps animations, offline capabilities, and secure push notifications.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    link: "/book",
  },
];

function WebDevelopmentPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl text-foreground">
          Core Engineering Capabilities
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We build end-to-end AI systems, SaaS platforms, web apps, and mobile applications tailored for growth.
        </p>
      </header>

      {/* Interactive Capabilities Gallery */}
      <InteractiveCapabilitiesGallery
        items={WEB_CAPABILITIES}
        badgeText="TAILORED EXPERTISE"
        mainHeading="Core Engineering Capabilities"
        mainSubheading="We build end-to-end AI systems, SaaS platforms, and mobile apps tailored for growth."
      />

      <StepsBanner compact />
      <TrustBanner />
      <WebServiceGrid />
    </main>
  );
}
