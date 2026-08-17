import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  Flame,
  Globe,
  HardDrive,
  HelpCircle,
  KeyRound,
  Layers,
  Layout,
  Lock,
  MessageSquare,
  Package,
  Plane,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Terminal,
  TrendingUp,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { InteractiveCapabilitiesGallery } from "@/components/site/InteractiveCapabilitiesGallery";
import { TrustBanner } from "@/components/site/SiteFooter";
import { UniversalServiceIntakeForm } from "@/components/site/UniversalServiceIntakeForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RobotHero from "@/components/ui/robot-hero";

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

const OFFERINGS = [
  {
    icon: Code2,
    title: "Custom Web App Development",
    description:
      "Our custom application development services cater to your unique business requirements. We build highly modular, responsive web solutions that perform seamlessly in any modern browser.",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    icon: Server,
    title: "API Engineering & Microservices",
    description:
      "API implementation elevates the user experience by enabling connectivity across apps. Our API development services allow seamless data access and efficient user funnelling.",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    icon: ShieldCheck,
    title: "Secured Data Transmission",
    description:
      "Our web applications are engineered to withstand security threats with end-to-end SSL/TLS encryption, OAuth2 authentication, and strict compliance safeguards.",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    icon: Layout,
    title: "Headless CMS Development",
    description:
      "Empower your marketing and operational teams with flexible headless CMS platforms that cut maintenance time while enabling rapid content distribution globally.",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    icon: Bot,
    title: "AI Development & Agents",
    description:
      "From intelligent client intake chatbots to autonomous RAG search engines, our AI engineering team integrates machine learning directly into your digital workflow.",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    icon: Smartphone,
    title: "Progressive Web & Mobile Apps",
    description:
      "From concept to deployment, we build robust cross-platform mobile applications for iOS & Android with offline support, push alerts, and 60fps native feel.",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
];

const ADVANCED_TECH_STACK: Record<
  string,
  Array<{
    name: string;
    category: string;
    badge: string;
    description: string;
    logo: string;
    color: string;
  }>
> = {
  Languages: [
    {
      name: "TypeScript 5.5",
      category: "Strict Type Safety Engine",
      badge: "Core Standard",
      description: "End-to-end type safety across client & server API boundaries.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "bg-blue-50/80 border-blue-200 text-blue-700",
    },
    {
      name: "JavaScript (ES6+)",
      category: "Dynamic Web Engine",
      badge: "Universal",
      description: "Non-blocking event loop execution for fluid web interactions.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "bg-amber-50/80 border-amber-200 text-amber-800",
    },
    {
      name: "Python 3.12",
      category: "AI & Neural Networks",
      badge: "LLM & ML",
      description: "Powering PyTorch, RAG vector pipelines, and autonomous AI agents.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "bg-sky-50/80 border-sky-200 text-sky-800",
    },
    {
      name: "C# / .NET 9",
      category: "Enterprise Microservices",
      badge: "Enterprise",
      description: "High-throughput financial transactions and back-office ERP engines.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      color: "bg-purple-50/80 border-purple-200 text-purple-800",
    },
    {
      name: "Java 21 LTS",
      category: "Robust Cloud Backend",
      badge: "High Scale",
      description: "Multi-threaded enterprise systems with Spring Boot microservices.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "bg-orange-50/80 border-orange-200 text-orange-800",
    },
    {
      name: "Go (Golang)",
      category: "High-Speed Microservices",
      badge: "<10ms Latency",
      description: "Ultra-fast concurrent gRPC microservices and network proxies.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
      color: "bg-cyan-50/80 border-cyan-200 text-cyan-800",
    },
    {
      name: "PHP 8.3 / Laravel",
      category: "E-Commerce & CMS",
      badge: "Rapid SaaS",
      description: "Modular web application architecture and automated REST APIs.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "bg-indigo-50/80 border-indigo-200 text-indigo-800",
    },
    {
      name: "GraphQL & SQL",
      category: "Declarative Querying",
      badge: "High Speed",
      description: "Precise typed data fetching with automated schema generation.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      color: "bg-rose-50/80 border-rose-200 text-rose-800",
    },
  ],
  Frameworks: [
    {
      name: "React 19",
      category: "UI Rendering Architecture",
      badge: "Production Core",
      description: "Server Components, concurrent rendering, and zero-bundle hydration.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-cyan-50/80 border-cyan-200 text-cyan-800",
    },
    {
      name: "Next.js 15 (App Router)",
      category: "Full-Stack SaaS Platform",
      badge: "Leading Standard",
      description: "Hybrid SSR/ISR, Edge API routes, and top Core Web Vitals performance.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "bg-slate-100 border-slate-300 text-slate-900",
    },
    {
      name: "Node.js 22",
      category: "Asynchronous Backend",
      badge: "High Throughput",
      description: "Event-driven runtime handling thousands of real-time WebSocket clients.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
    },
    {
      name: "TailwindCSS v4",
      category: "Utility Design Engine",
      badge: "Glassmorphism",
      description: "Zero-runtime CSS engine delivering custom responsive design tokens.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      color: "bg-sky-50/80 border-sky-200 text-sky-800",
    },
    {
      name: "Angular 18",
      category: "Enterprise Web SPA",
      badge: "Structured",
      description: "Strictly typed framework for complex corporate enterprise dashboards.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      color: "bg-red-50/80 border-red-200 text-red-800",
    },
    {
      name: "Django / FastAPI",
      category: "Python Web Engine",
      badge: "AI Native",
      description: "High-performance Python backend for ML inference and REST endpoints.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
    },
  ],
  Databases: [
    {
      name: "PostgreSQL 16",
      category: "Relational Data Store",
      badge: "ACID Compliant",
      description: "Battle-tested relational database with JSONB indexing and pgvector LLM search.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "bg-blue-50/80 border-blue-200 text-blue-800",
    },
    {
      name: "MongoDB Enterprise",
      category: "NoSQL Document Engine",
      badge: "Dynamic Schema",
      description: "High-throughput JSON document store for rapid analytics and catalogs.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
    },
    {
      name: "Redis Cloud",
      category: "In-Memory Data Structure",
      badge: "<1ms Latency",
      description: "Ultra-fast session storage, rate limiting, and pub/sub messaging.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      color: "bg-red-50/80 border-red-200 text-red-800",
    },
    {
      name: "ElasticSearch",
      category: "Distributed Vector Search",
      badge: "Real-Time Query",
      description: "Sub-second full-text and vector search across millions of records.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
      color: "bg-amber-50/80 border-amber-200 text-amber-800",
    },
  ],
  CloudDevOps: [
    {
      name: "AWS Cloud Infrastructure",
      category: "Enterprise Cloud Hosting",
      badge: "99.999% SLA",
      description: "EC2, S3, Lambda, CloudFront, and automated multi-region failover.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      color: "bg-amber-50/80 border-amber-200 text-amber-900",
    },
    {
      name: "Vercel Enterprise Edge",
      category: "Global Serverless Network",
      badge: "Zero Latency",
      description: "Global edge deployment with automated CI/CD branch deployments.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "bg-slate-100 border-slate-300 text-slate-900",
    },
    {
      name: "Docker & Kubernetes",
      category: "Container Orchestration",
      badge: "Cloud Native",
      description: "Isolated microservice containerization with horizontal auto-scaling.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "bg-blue-50/80 border-blue-200 text-blue-800",
    },
    {
      name: "GitHub Actions CI/CD",
      category: "Automated Deployments",
      badge: "Zero Downtime",
      description: "Automated test suites, security scanning, and seamless deployments.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      color: "bg-purple-50/80 border-purple-200 text-purple-900",
    },
  ],
};

const INDUSTRIES = [
  { icon: Stethoscope, name: "Healthcare & BioTech", count: "35+ Apps" },
  { icon: Building2, name: "FinTech & Banking", count: "40+ Portals" },
  { icon: Truck, name: "Logistics & Fleet", count: "25+ Systems" },
  { icon: Package, name: "E-Commerce & Retail", count: "50+ Stores" },
  { icon: Plane, name: "Aerospace & Travel", count: "20+ Platforms" },
  { icon: Zap, name: "Energy & Utilities", count: "15+ Dashboards" },
  { icon: ShieldCheck, name: "Government & Public", count: "12+ Applications" },
  { icon: Cpu, name: "Electronics & High Tech", count: "30+ Software" },
];

const ROADMAP = [
  {
    step: "01",
    title: "Idea & Discovery",
    desc: "We analyze project requirements, target user personas, and commercial objectives to form a rock-solid scope.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Architecture Strategy",
    desc: "Designing the database schemas, API specs, cloud topology, and selecting optimal frameworks for long-term scalability.",
    icon: Layers,
  },
  {
    step: "03",
    title: "UI/UX Prototyping",
    desc: "Crafting wireframes and high-fidelity glassmorphism interactive designs centered on intuitive user journeys.",
    icon: Layout,
  },
  {
    step: "04",
    title: "Full-Stack Development",
    desc: "Transforming design mockups into production-ready frontend and backend code with continuous automated integration.",
    icon: Terminal,
  },
  {
    step: "05",
    title: "Beta & Security Auditing",
    desc: "Rigorous QA testing, vulnerability scanning, and user feedback iterations prior to official commercial release.",
    icon: CheckCircle2,
  },
  {
    step: "06",
    title: "Market Launch & Scale",
    desc: "Zero-downtime deployment to production servers with 24/7 telemetry monitoring and automated scaling.",
    icon: Flame,
  },
];

const CASE_STUDIES = [
  {
    title: "ManageTeamz — Fleet & Logistics Operations Portal",
    category: "Logistics & Supply Chain",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
    description:
      "Full-stack web application enabling real-time delivery fleet monitoring, route optimization, and instant customer SMS notifications.",
    metrics: "4.8x Efficiency Increase • 120,000+ Active Deliveries Tracked Daily",
  },
  {
    title: "Ocean Observatory System — Government Environmental Portal",
    category: "Government & Public Safety",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800",
    description:
      "High-concurrency disaster management and ocean weather telemetry portal processing real-time sensor streams for coastal safety.",
    metrics: "99.999% Uptime • Real-Time Satellite & Sensor Telemetry Feed",
  },
  {
    title: "Global Confectionery Analytics & Sales Forecasting System",
    category: "Data Analytics & Enterprise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    description:
      "Web application fused with predictive ML models to monitor product pipelines across 14 international target markets.",
    metrics: "3.2x Predictive Sales Accuracy • Automated Supply Allocation",
  },
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
  const [activeTechTab, setActiveTechTab] = useState<keyof typeof ADVANCED_TECH_STACK>("Languages");

  return (
    <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 sm:py-16">
      
      {/* Hero Banner Section with Interactive 3D Robot (Light Theme) */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50/90 text-slate-900 p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/90">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Copy */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-100/90 text-blue-700 border-blue-200 px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
                PILLAR 02 • CUSTOM SOFTWARE &amp; UI/UX
              </Badge>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Code2 className="h-4 w-4 text-blue-600" /> 150+ Web Applications Built
              </span>
            </div>

            <h1 className="text-3xl font-black sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight">
              We Build Web Apps That Are{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Dynamic, Fluid &amp; Scalable.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              Our custom web application development services bring you everything but the moon! We provide tailored web app solutions for startups, SMEs, and enterprises to achieve maximum customer engagement at optimized costs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-2xl bg-[#0F52FF] hover:bg-blue-700 text-white font-bold text-sm px-8 h-13 shadow-xl shadow-blue-500/25 transition-transform active:scale-95 cursor-pointer">
                <Link to="/book">
                  Book Scoping Call <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <a href="#offerings" className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                Explore Our Capabilities <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            {/* Quick Badges Ticker */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> React / Next.js / TypeScript</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> 100% Full GitHub Access</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Strict NDA &amp; IP Protection</span>
            </div>
          </div>

          {/* Right Interactive 3D Robot Showcase */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-md">
            <RobotHero
              hideNavbar={true}
              backgroundText="AI WEB APPS"
              pantallaColor="#00ffc6"
              pantallaBrillo={1.2}
              color="#c4c4c4"
              metalness={0.0}
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/60 text-center pointer-events-none">
              <p className="text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5">
                <Bot className="h-3.5 w-3.5 text-blue-600 shrink-0" /> Move cursor or click to interact with our 3D AI Engineering Assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 3 Core Fact / Benefit Cards */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 grid place-items-center font-black">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">100+ Happy Clients &amp; Apps</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Delivered over 100+ dynamic web applications and enterprise portals for clients across global healthcare, logistics, e-commerce, and FinTech verticals.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 grid place-items-center font-black">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Light On Your Pocket</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Serverless cloud architectures and modern component libraries provide maximum operational efficiency at minimum infrastructure disposal costs.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 grid place-items-center font-black">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Maximum Customer Engagement</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Progressive web applications featuring instant push notifications, real-time analytics models, and interactive glassmorphism UI/UX designs.
          </p>
        </div>
      </section>

      {/* Interactive Capabilities Gallery */}
      <InteractiveCapabilitiesGallery
        items={WEB_CAPABILITIES}
        badgeText="SOFTWARE &amp; UI/UX EXCELLENCE"
        mainHeading="Core Engineering Capabilities"
        mainSubheading="Explore our custom web applications, SaaS platforms, and UI/UX design systems engineered for scale."
      />

      {/* Offerings Grid Section */}
      <section id="offerings" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            WHAT WE DO
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
            Our Web Development Offerings
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Compatibility and accessibility are the cornerstones of a rapidly transforming digital economy. Explore our modular services below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((offering) => {
            const Icon = offering.icon;
            return (
              <div
                key={offering.title}
                className="group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Card Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className={`h-14 w-14 rounded-2xl border ${offering.color} grid place-items-center transition-transform group-hover:scale-105 shadow-2xs`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full bg-slate-50">
                      OFFERING
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors pt-1">
                    {offering.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {offering.description}
                  </p>
                </div>

                <a
                  href="#intake-form"
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Request Proposal &amp; Scope Intake</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Advanced Technology Stack Matrix (Top SaaS Provider Standard) */}
      <section className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 space-y-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
              ENGINEERING PROFICIENCY
            </Badge>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
              Enterprise Technology Stack
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Our engineers build with battle-tested open-source frameworks, edge databases, and robust language ecosystems designed for scale.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {(Object.keys(ADVANCED_TECH_STACK) as Array<keyof typeof ADVANCED_TECH_STACK>).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTechTab(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTechTab === cat ? "bg-[#0F52FF] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid Cards with Official SVG Logos & Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {ADVANCED_TECH_STACK[activeTechTab]?.map((tech) => (
            <div
              key={tech.name}
              className="group p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all duration-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/80 p-2 shadow-2xs grid place-items-center shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="h-7 w-7 object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                      }}
                    />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${tech.color}`}>
                    {tech.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400">{tech.category}</p>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-600 pt-2 border-t border-slate-200/60 font-medium">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* Live Architecture & SLA Metrics Banner */}
        <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs font-black text-slate-900">&lt;45ms</p>
              <p className="text-[10px] text-slate-500 font-medium">Global Edge Latency</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-black text-slate-900">SOC2 Type II</p>
              <p className="text-[10px] text-slate-500 font-medium">Security Compliant</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-3">
            <Server className="h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs font-black text-slate-900">99.99% SLA</p>
              <p className="text-[10px] text-slate-500 font-medium">Cloud Uptime Guarantee</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
            <Lock className="h-5 w-5 text-purple-600 shrink-0" />
            <div>
              <p className="text-xs font-black text-slate-900">AES-256</p>
              <p className="text-[10px] text-slate-500 font-medium">End-to-End Encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve Grid */}
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

      {/* Development Process Roadmap (Light Theme) */}
      <section className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 space-y-8 border border-slate-200/90 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            DEVELOPMENT ROADMAP
          </Badge>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
            Our 6-Step Development Process
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From initial strategy formulation to production launch, we maintain complete transparency and rigorous quality checks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ROADMAP.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-600 font-mono">{step.step}</span>
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 grid place-items-center">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 font-normal">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Case Studies Showcase */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            OUR HISTORY &amp; CASE STUDIES
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
            Featured Client Work Showcase
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Explore how our custom web applications have solved real-world operational challenges.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.title}
              className="group overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {cs.category}
                  </Badge>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">{cs.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 space-y-3 border-t border-slate-100 mt-2">
                <p className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 p-2.5 rounded-xl">
                  {cs.metrics}
                </p>
                <Button asChild variant="ghost" size="sm" className="w-full text-xs font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50">
                  <Link to="/book">
                    View Case Details <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Ownership & Security Commitments */}
      <section className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-blue-50/80 p-8 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge className="bg-blue-600 text-white text-xs font-extrabold">GUARANTEED OWNERSHIP</Badge>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Our Engineering Guarantees</h2>
          <p className="text-xs text-slate-600 font-medium">We deliver enterprise transparency with 100% intellectual property protection.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 grid place-items-center shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Strict Non-Disclosure (NDA)</p>
              <p className="text-[11px] text-slate-500 font-medium">100% Confidentiality</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 grid place-items-center shrink-0">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Complete GitHub Access</p>
              <p className="text-[11px] text-slate-500 font-medium">Master Repository Control</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 grid place-items-center shrink-0">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Transfer Of Code Ownership</p>
              <p className="text-[11px] text-slate-500 font-medium">Source Code Buyout Available (2x Project Total)</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-blue-900/90 text-white p-4.5 text-xs flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-300 shrink-0" />
            <span>
              <strong>Commercial Source Code Buyout Policy:</strong> Standard plans include managed cloud hosting &amp; deployment. Complete source code delivery &amp; master IP transfer is charged at <strong>2x (double)</strong> the project base estimate.
            </span>
          </div>
        </div>
      </section>

      {/* QUALITY GUARANTEE — OUR ENGINEERING STANDARDS */}
      <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-14 space-y-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge className="bg-blue-600/90 text-white border-blue-400/40 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest">
            QUALITY GUARANTEE
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl text-white tracking-tight">
            OUR ENGINEERING STANDARDS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Every software product we engineer adheres to strict technical protocols designed to minimize technical debt, safeguard security, and maximize long-term reliability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Standard 01 */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60">
                  /01 Standard 01
                </span>
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors">
                Performance &amp; Sub-Second Speeds
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Sub-second response times, Core Web Vitals A+ ratings, and zero-lag user interactions. Every line of code, asset pipeline, database query, and API call is optimized so users complete tasks without friction or delays.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono font-bold text-blue-300">
              <span className="bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">LCP &lt; 1.2s</span>
              <span className="bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">100/100 Lighthouse</span>
              <span className="bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">Zero Layout Shifts</span>
            </div>
          </div>

          {/* Standard 02 */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                  /02 Standard 02
                </span>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                Enterprise Security &amp; Privacy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Zero-trust access control, data encryption in transit &amp; at rest, and strict security audits. Security is engineered into every release—featuring granular RBAC permissions, JWT/OAuth standards, CSRF protection, and sanitized inputs.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono font-bold text-emerald-300">
              <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">Role-Based RBAC</span>
              <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">AES-256 Encryption</span>
              <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">Regular Security Audits</span>
            </div>
          </div>

          {/* Standard 03 */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800/60">
                  /03 Standard 03
                </span>
                <Server className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                Elastic Cloud Scalability
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Cloud-native architectures built to handle traffic spikes and enterprise growth effortlessly. We design resilient microservices, auto-scaling databases, and serverless background workers that perform reliably from 100 to 1,000,000+ active users.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono font-bold text-indigo-300">
              <span className="bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">99.99% Uptime SLA</span>
              <span className="bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">Auto-Scaling Queues</span>
              <span className="bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">Multi-Region Failover</span>
            </div>
          </div>

          {/* Standard 04 */}
          <div className="p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-purple-400 uppercase tracking-widest bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60">
                  /04 Standard 04
                </span>
                <Code2 className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-purple-400 transition-colors">
                Maintainability &amp; Clean Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Strict internal engineering protocols that minimize technical debt and maximize longevity. We write clean, modular, self-documenting TypeScript &amp; Node.js code with automated test coverage so your team can extend features with confidence.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono font-bold text-purple-300">
              <span className="bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">Strict TypeScript</span>
              <span className="bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">Modular Component Architecture</span>
              <span className="bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">Automated CI Testing</span>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE PARTNERSHIP PLANS — FLEXIBLE ENGAGEMENT MODELS */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1 uppercase tracking-wider">
            SIMPLE PARTNERSHIP PLANS
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            FLEXIBLE ENGAGEMENT MODELS
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Choose the plan that fits your business stage. Investment quotes are tailored transparently after our initial discovery call.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {/* Plan 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
                Fixed Scope &amp; Timeline
              </span>
              <h3 className="text-2xl font-black text-slate-900">One-Time Project</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Ideal when you have a clear feature list, fixed budget, and set launch date.
              </p>
              
              <div className="pt-2 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                  FIXED PRICE BASED ON YOUR SCOPE
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Clear feature roadmap &amp; milestone plan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Guaranteed launch timeline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Fixed budget quote after discovery call
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Full quality testing &amp; cloud deployment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> 30 days of free post-launch support
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <a
                href="#intake-form"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-transform active:scale-95"
              >
                Submit Project Scope <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/book"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Prefer a live call? Schedule meeting ↗
              </Link>
            </div>
          </div>

          {/* Plan 2: MOST POPULAR */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white border-2 border-blue-500 shadow-2xl flex flex-col justify-between space-y-6 relative transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full border border-blue-400 shadow-md">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800 inline-block">
                Monthly Squad Hire
              </span>
              <h3 className="text-2xl font-black text-white">Dedicated Developer Team</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Your own full-time developer &amp; designer team working exclusively on your product every week.
              </p>

              <div className="pt-2 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-300 bg-blue-950/90 px-3 py-1 rounded-lg border border-blue-700">
                  FLEXIBLE MONTHLY RATE
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 font-semibold pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Full-time developers &amp; UI/UX designers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Flexible 2-week work sprints
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Direct WhatsApp &amp; Slack communication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> 100% code &amp; IP ownership transferred
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" /> Dedicated senior technical project lead
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800">
              <a
                href="#intake-form"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
              >
                Request Developer Squad <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/book"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-400 hover:text-blue-300 transition-colors"
              >
                Prefer a live call? Schedule meeting ↗
              </Link>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
                Long-Term Collaboration
              </span>
              <h3 className="text-2xl font-black text-slate-900">Enterprise Tech Partner</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Long-term partnership for companies needing CTO advisory, system modernization, and custom AI integration.
              </p>

              <div className="pt-2 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                  TAILORED ENTERPRISE PLAN
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" /> CTO-level technical advisory &amp; leadership
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" /> System architecture &amp; code security review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" /> Legacy database &amp; app modernization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" /> Cloud infrastructure &amp; security hardening
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" /> Priority 24/7 technical support &amp; SLA
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <a
                href="#intake-form"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95"
              >
                Request Enterprise Plan <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/book"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Prefer a live call? Schedule meeting ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Interactive Web Development Intake Form Section */}
      <section id="intake-form" className="scroll-mt-24">
        <UniversalServiceIntakeForm category="web-development" />
      </section>

      {/* Interactive FAQ Accordion */}
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

      {/* Bottom Disclaimer Banner */}
      <TrustBanner />
    </main>
  );
}
