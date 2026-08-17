import { Activity, Clock, Cpu, FileCheck2, Flame, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ROADMAP = [
  {
    step: "01",
    title: "Discovery & Architecture",
    desc: "We analyze business requirements, map database schemas, and formulate API contract specifications.",
    icon: Layers,
  },
  {
    step: "02",
    title: "UI/UX & Wireframing",
    desc: "Crafting modern glassmorphic design systems, user flow prototypes, and responsive component libraries.",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "Agile Full-Stack Dev",
    desc: "Sprint-based frontend and backend engineering in TypeScript with real-time progress updates.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Security & QA Testing",
    desc: "Rigorous automated testing, security penetration audits, and cross-browser performance optimization.",
    icon: Activity,
  },
  {
    step: "05",
    title: "Staging & Client Demo",
    desc: "Interactive preview deployment on isolated staging servers for final approval and feedback loops.",
    icon: Clock,
  },
  {
    step: "06",
    title: "Market Launch & Scale",
    desc: "Zero-downtime deployment to production servers with 24/7 telemetry monitoring and automated scaling.",
    icon: Flame,
  },
];

export function WebDevProcessRoadmap() {
  return (
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
  );
}
