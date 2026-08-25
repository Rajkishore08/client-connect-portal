import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Globe, CreditCard, Building2, ShoppingBag, Bot, ShieldCheck } from "lucide-react";

export function LightImpactCardsSection() {
  const cards = [
    {
      title: "Enterprise FinTech",
      category: "Financial Core & Ledger Solutions",
      icon: CreditCard,
      iconBg: "bg-blue-100 text-blue-600 border-blue-200",
      tag: "FinTech Core",
    },
    {
      title: "Nutty Delights",
      category: "E-Commerce & Global Retail",
      icon: ShoppingBag,
      iconBg: "bg-amber-100 text-amber-700 border-amber-200",
      tag: "E-Commerce",
    },
    {
      title: "TechnoBills SaaS",
      category: "FinTech & Invoicing Engine",
      icon: Building2,
      iconBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
      tag: "SaaS Platform",
    },
    {
      title: "TechnoTenant",
      category: "Property Management Portal",
      icon: Globe,
      iconBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
      tag: "Real Estate SaaS",
    },
    {
      title: "Agentic AI Workspace",
      category: "LLM RAG & Autonomous Agents",
      icon: Bot,
      iconBg: "bg-purple-100 text-purple-700 border-purple-200",
      tag: "AI Engineering",
    },
    {
      title: "Consular Passport Portal",
      category: "24H Expedited Intake Pipeline",
      icon: ShieldCheck,
      iconBg: "bg-rose-100 text-rose-700 border-rose-200",
      tag: "Government Services",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-100/90 border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
      {/* Background Marquee Text Track (Matching Image 2 in Light Theme) */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden select-none opacity-20 z-0">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="flex whitespace-nowrap font-black tracking-widest text-slate-400 text-[clamp(2rem,6vw,5rem)] uppercase"
        >
          <span className="pr-12">
            INTEGRATIONS • CLOUD SOLUTIONS • MACHINE LEARNING • DATA PLATFORMS • AI AGENTS • SAAS PIPELINES •
          </span>
          <span className="pr-12">
            INTEGRATIONS • CLOUD SOLUTIONS • MACHINE LEARNING • DATA PLATFORMS • AI AGENTS • SAAS PIPELINES •
          </span>
        </motion.div>
      </div>

      {/* Header Pill Badge (Matching Image 2) */}
      <div className="relative z-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          PROVEN IMPACT ACROSS BUSINESSES &amp; PRODUCTS
        </div>
      </div>

      {/* Horizontal Interactive Cards Track (Matching Image 2 in Light Theme) */}
      <div className="relative z-10 overflow-x-auto pb-4 pt-2 no-scrollbar">
        <div className="flex items-center gap-4 min-w-max px-2">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group flex items-center gap-4 p-4 pr-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer min-w-[260px] sm:min-w-[280px]"
              >
                <div className={`h-11 w-11 rounded-xl border grid place-items-center shrink-0 font-bold transition-transform group-hover:scale-105 ${card.iconBg}`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {card.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
