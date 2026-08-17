import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export function EngagementModels() {
  return (
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
  );
}
