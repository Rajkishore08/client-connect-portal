import { useState } from "react";
import { Lock, Server, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ADVANCED_TECH_STACK: Record<
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
      color: "bg-slate-100 border-slate-300 text-slate-800",
    },
    {
      name: "Vue 3 / Nuxt 3",
      category: "Reactivity Ecosystem",
      badge: "Ultra Fast",
      description: "Lightweight progressive framework for real-time dashboards.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
    },
    {
      name: "Node.js 22 LTS",
      category: "Server Execution Engine",
      badge: "High Concurrency",
      description: "Event-driven asynchronous I/O powering microservice backends.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "bg-green-50/80 border-green-200 text-green-800",
    },
    {
      name: "FastAPI / Django",
      category: "High-Performance Python",
      badge: "Async Native",
      description: "Automatic OpenAPI documentation and async database pipelines.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      color: "bg-teal-50/80 border-teal-200 text-teal-800",
    },
    {
      name: "Tailwind CSS v4",
      category: "Design System Utility",
      badge: "Zero Runtime",
      description: "JIT utility compilation powering custom glassmorphism interfaces.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      color: "bg-sky-50/80 border-sky-200 text-sky-800",
    },
  ],
  Databases: [
    {
      name: "PostgreSQL 16",
      category: "Relational SQL Engine",
      badge: "Enterprise Standard",
      description: "ACID compliant, JSONB indexing, and Row-Level Security (RLS).",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "bg-blue-50/80 border-blue-200 text-blue-800",
    },
    {
      name: "Supabase & Prisma",
      category: "Real-Time Cloud BaaS",
      badge: "Modern BaaS",
      description: "Type-safe ORM, auto-generated APIs, and live database subscriptions.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
    },
    {
      name: "Redis Cache Engine",
      category: "In-Memory Data Store",
      badge: "<1ms Caching",
      description: "Sub-millisecond session caching and rate-limiting queues.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      color: "bg-red-50/80 border-red-200 text-red-800",
    },
    {
      name: "MongoDB Atlas",
      category: "Document NoSQL",
      badge: "Flexible Schema",
      description: "High-volume unstructured document storage and horizontal sharding.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "bg-green-50/80 border-green-200 text-green-800",
    },
    {
      name: "Pinecone / Vector DB",
      category: "AI Embedding Store",
      badge: "AI Vector Engine",
      description: "High-dimensional vector search powering RAG document retrieval.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "bg-purple-50/80 border-purple-200 text-purple-800",
    },
  ],
  DevOps: [
    {
      name: "Docker & Kubernetes",
      category: "Container Orchestration",
      badge: "Cloud Standard",
      description: "Immutable container packaging and automated cluster scaling.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "bg-blue-50/80 border-blue-200 text-blue-800",
    },
    {
      name: "AWS & Vercel Edge",
      category: "Global Cloud Infrastructure",
      badge: "99.99% Uptime",
      description: "Serverless lambda workers, multi-region CDN, and automated failover.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      color: "bg-amber-50/80 border-amber-200 text-amber-800",
    },
    {
      name: "GitHub Actions CI/CD",
      category: "Automated Pipeline",
      badge: "Zero Downtime",
      description: "Automated linting, end-to-end testing, and seamless deployments.",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      color: "bg-slate-100 border-slate-300 text-slate-800",
    },
  ],
};

export function TechStackMatrix() {
  const [activeTechTab, setActiveTechTab] = useState<keyof typeof ADVANCED_TECH_STACK>("Languages");

  const allTechItems = Object.values(ADVANCED_TECH_STACK).flat();

  return (
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

      {/* Auto-Scrollable Hero-Style Infinite Marquee Card Track */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-xl">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-4">
          {[...allTechItems, ...allTechItems].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 shrink-0 hover:bg-slate-800 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-700 p-1.5 grid place-items-center shrink-0">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                  }}
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                  {tech.name}
                </p>
                <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{tech.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Grid Cards */}
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
  );
}
