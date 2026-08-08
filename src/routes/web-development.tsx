import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Code2, Layers, Terminal } from "lucide-react";

import { WebServiceGrid } from "@/components/site/CategoryExplorer";
import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { StepsBanner } from "@/components/site/StepsBanner";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development, Custom Software & UI/UX Design — One World Solutions Agency" },
      {
        name: "description",
        content:
          "Custom web application development, SaaS platforms, UI/UX design systems, AI agents, and mobile apps by One World Solutions in Chicago.",
      },
      { property: "og:title", content: "Web & Custom Software Engineering | One World Solutions" },
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
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30">
            PILLAR 02 • WEB DEVELOPMENT, CUSTOM SOFTWARE &amp; UI/UX
          </Badge>
          <Badge variant="secondary" className="text-xs font-bold gap-1">
            <Code2 className="h-3.5 w-3.5 text-primary" /> 150+ Web Projects Built
          </Badge>
        </div>

        <h1 className="text-3xl font-black sm:text-5xl text-foreground tracking-tight">
          Custom Web Apps, Software &amp; UI/UX —{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-4">
            Engineered for Growth.
          </span>
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          We build high-performance web applications, enterprise SaaS portals, bespoke UI/UX design systems, and autonomous AI agents tailored for your business goals.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            React / Next.js / TypeScript Stack
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Full Code Ownership &amp; IP Protection
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            99.9% Cloud Uptime Guarantee
          </span>
        </div>
      </header>

      {/* Interactive Capabilities Gallery */}
      <InteractiveCapabilitiesGallery
        items={WEB_CAPABILITIES}
        badgeText="SOFTWARE & UI/UX EXCELLENCE"
        mainHeading="Core Engineering Capabilities"
        mainSubheading="Explore our custom web applications, SaaS platforms, and UI/UX design systems engineered for scale."
      />

      <StepsBanner compact />
      <TrustBanner />
      <WebServiceGrid />
    </main>
  );
}
