import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Database,
  HardDrive,
  HelpCircle,
  Plane,
  Stethoscope,
  Truck,
} from "lucide-react";

import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { UniversalServiceIntakeForm } from "@/components/site/UniversalServiceIntakeForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { EngineeringGuarantees } from "@/components/web-dev/EngineeringGuarantees";
import { EngineeringStandards } from "@/components/web-dev/EngineeringStandards";
import { EngagementModels } from "@/components/web-dev/EngagementModels";
import { TechStackMatrix } from "@/components/web-dev/TechStackMatrix";
import { WebDevCaseStudies } from "@/components/web-dev/WebDevCaseStudies";
import { WebDevCoreBenefits } from "@/components/web-dev/WebDevCoreBenefits";
import { WebDevHero } from "@/components/web-dev/WebDevHero";
import { WebDevOfferings } from "@/components/web-dev/WebDevOfferings";
import { WebDevProcessRoadmap } from "@/components/web-dev/WebDevProcessRoadmap";

export const Route = createFileRoute("/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development, Custom Software & UI/UX — One World Solutions Agency" },
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
    image: "/ai_agent_futuristic.png",
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

const INDUSTRIES = [
  { name: "Healthcare & MedTech", icon: Stethoscope, count: "24+ Portals Built" },
  { name: "Logistics & Fleet", icon: Truck, count: "18+ SaaS Platforms" },
  { name: "Public Sector & Defense", icon: Building2, count: "12+ Government Sites" },
  { name: "Consular & Immigration", icon: Plane, count: "40+ Intake Portals" },
  { name: "Data Analytics & ML", icon: Database, count: "15+ AI Dashboards" },
  { name: "FinTech & Banking", icon: HardDrive, count: "10+ Payment Apps" },
];

const FAQS = [
  {
    q: "Are custom web applications scalable for enterprise workloads?",
    a: "Yes! Our web applications are built on modern cloud-native architectures (Next.js, Node, PostgreSQL, serverless edge networks) designed to auto-scale from thousands to millions of concurrent active users without performance degradation.",
  },
  {
    q: "What is the difference between a standard website and a web application?",
    a: "A standard website is primarily informational. A web application is an interactive software platform (like a portal, SaaS tool, or intake dashboard) where users log in, manage data, execute transactions, and trigger real-time backend workflows.",
  },
  {
    q: "What is the fee policy for acquiring complete source code & master IP?",
    a: "Standard development packages include fully managed cloud hosting, automated deployments, and software access. Clients requiring complete source code transfer, repository ownership, and master commercial IP buyout can add source code acquisition at 2x (double) the project base estimate.",
  },
  {
    q: "How long does it take to develop a custom web application?",
    a: "Typical development timelines range from 3 to 6 weeks for MVP web applications and 8 to 12 weeks for complex enterprise SaaS platforms, depending on feature scope.",
  },
];

function WebDevelopmentPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 sm:py-16">
      {/* 1. Hero Section with Interactive 3D Robot */}
      <WebDevHero />

      {/* 2. Core Fact / Benefit Cards */}
      <WebDevCoreBenefits />

      {/* 3. Interactive Capabilities Gallery */}
      <InteractiveCapabilitiesGallery
        items={WEB_CAPABILITIES}
        badgeText="SOFTWARE &amp; UI/UX EXCELLENCE"
        mainHeading="Core Engineering Capabilities"
        mainSubheading="Explore our custom web applications, SaaS platforms, and UI/UX design systems engineered for scale."
      />

      {/* 4. Offerings Grid Section */}
      <WebDevOfferings />

      {/* 5. Enterprise Technology Stack Matrix */}
      <TechStackMatrix />

      {/* 6. Industries We Serve Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            VERTICALS &amp; DOMAINS
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            We have helped clients across diverse sectors bring their business vision to life through scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-all flex items-center gap-3.5 group"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center shrink-0 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 truncate">{ind.name}</p>
                  <p className="text-[11px] font-bold text-slate-400">{ind.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Development Process Roadmap */}
      <WebDevProcessRoadmap />

      {/* 8. Featured Client Work Showcase */}
      <WebDevCaseStudies />

      {/* 9. Quality Guarantee — Engineering Standards */}
      <EngineeringStandards />

      {/* 10. Simple Partnership Plans — Engagement Models */}
      <EngagementModels />

      {/* 11. Engineering Ownership & Security Commitments */}
      <EngineeringGuarantees />

      {/* 12. Dedicated Interactive Web Development Intake Form Section */}
      <section id="intake-form" className="scroll-mt-24">
        <UniversalServiceIntakeForm category="web-development" />
      </section>

      {/* 13. Interactive FAQ Accordion */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Web App Development FAQs</h2>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-b border-slate-100 last:border-none pb-3">
                <AccordionTrigger className="text-left font-extrabold text-slate-900 hover:text-blue-600 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 14. Bottom Disclaimer Banner */}
      <TrustBanner />
    </main>
  );
}
