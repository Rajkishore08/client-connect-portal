import { TrendingUp, Users, Zap } from "lucide-react";

export function WebDevCoreBenefits() {
  return (
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
  );
}
