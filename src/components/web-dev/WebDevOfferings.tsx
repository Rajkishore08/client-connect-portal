import { ArrowRight, Bot, Code2, Layout, Server, ShieldCheck, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const OFFERINGS = [
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

export function WebDevOfferings() {
  return (
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
  );
}
