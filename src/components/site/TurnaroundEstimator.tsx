import { Check, Clock, Code2, Flame, Megaphone, ShieldAlert, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SPEED_TIERS, SpeedTier } from "@/data/mock-data";

const defaultTier: SpeedTier = SPEED_TIERS[1] ?? {
  id: "express",
  name: "2–4 Day Expedited",
  turnaround: "2 to 4 Days",
  serviceFee: 249,
  govFee: 209.50,
  popular: true,
  description: "Fast-track processing for travel within the next 1–2 weeks.",
};

export function TurnaroundEstimator() {
  const [activeDivision, setActiveDivision] = useState<"passport" | "web" | "marketing">("passport");
  const [selectedTier, setSelectedTier] = useState<SpeedTier>(defaultTier);

  // Calculate estimated completion date
  const getEstimatedDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <section className="glass-panel relative overflow-hidden p-6 sm:p-10 shadow-glass rounded-3xl border border-white/80">
      <div className="surface-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">Turnaround &amp; Scope Calculator</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Select your division and required urgency tier to calculate live completion estimates.
            </p>
          </div>

          {/* Division Switcher */}
          <div className="flex items-center gap-1 rounded-2xl bg-muted/60 p-1.5 border border-border/60">
            <button
              type="button"
              onClick={() => setActiveDivision("passport")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDivision === "passport"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Passport &amp; Visa
            </button>
            <button
              type="button"
              onClick={() => setActiveDivision("web")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDivision === "web"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5 shrink-0" /> Software &amp; UI/UX
            </button>
            <button
              type="button"
              onClick={() => setActiveDivision("marketing")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDivision === "marketing"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5 shrink-0" /> Marketing &amp; SEO
            </button>
          </div>
        </div>
      </div>

      {/* Division 01: Passport Tiers */}
      {activeDivision === "passport" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPEED_TIERS.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`group glass-card relative flex flex-col justify-between p-5 text-left transition-all rounded-2xl border ${
                    isSelected
                      ? "border-primary bg-white ring-2 ring-primary/30 shadow-lift"
                      : "border-white/80 bg-white/70 hover:bg-white hover:border-primary/40"
                  }`}
                >
                  {tier.emergency && (
                    <span className="absolute -top-2.5 left-4 rounded-md bg-accent px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide shadow-2xs">
                      24H Emergency
                    </span>
                  )}
                  {tier.popular && (
                    <span className="absolute -top-2.5 left-4 rounded-md bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wide shadow-2xs">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mt-1">
                      <h3 className="text-sm font-bold text-foreground">{tier.name}</h3>
                      {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </div>

                    <div className="mt-2 flex flex-col gap-0.5">
                      <span className="text-lg font-extrabold text-primary">Custom Quote</span>
                      <span className="text-[10px] text-slate-500 font-medium">Finalized during scoping consultation</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-normal">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary">{tier.turnaround}</span>
                    <span className="text-muted-foreground font-medium text-[11px]">Quote on Call</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/90 bg-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-primary">Selected Passport Speed: {selectedTier.name}</p>
              <p className="text-xs text-muted-foreground">Estimated Delivery: <strong className="text-foreground">{getEstimatedDate(selectedTier.id === "same-day" ? 1 : selectedTier.id === "express" ? 3 : 7)}</strong></p>
            </div>
            <Button size="lg" className="font-bold shadow-md">
              Launch Passport Intake →
            </Button>
          </div>
        </div>
      )}

      {/* Division 02: Software & UI/UX Tiers */}
      {activeDivision === "web" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-card p-5 space-y-3 border border-white/80 bg-white/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">Starter Web Package</span>
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-black text-foreground">1 to 2 Weeks</p>
              <p className="text-xs text-muted-foreground">Custom landing page or portfolio with responsive UI/UX and SEO setup.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> 100% Code Ownership
              </div>
            </div>

            <div className="glass-card p-5 space-y-3 border border-primary/40 bg-white shadow-lift ring-2 ring-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">Full SaaS / Web App Sprint</span>
                <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-white">Popular</span>
              </div>
              <p className="text-2xl font-black text-foreground">2 to 4 Weeks</p>
              <p className="text-xs text-muted-foreground">React / Next.js full-stack platform with auth, database, and payment integration.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Cloud Serverless Deployment
              </div>
            </div>

            <div className="glass-card p-5 space-y-3 border border-white/80 bg-white/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">Enterprise Custom Software</span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-black text-foreground">4 to 8 Weeks</p>
              <p className="text-xs text-muted-foreground">Custom ERP, client intake portal, AI agent workflows, and API architecture.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Dedicated SLA &amp; Support
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Division 03: Marketing Tiers */}
      {activeDivision === "marketing" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-card p-5 space-y-3 border border-white/80 bg-white/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">SEO Audit &amp; Fixes</span>
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-black text-foreground">7-Day Turnaround</p>
              <p className="text-xs text-muted-foreground">Complete technical SEO audit, keyword strategy, and on-page optimization.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Ranking Report Included
              </div>
            </div>

            <div className="glass-card p-5 space-y-3 border border-primary/40 bg-white shadow-lift ring-2 ring-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">PPC &amp; Paid Lead Sprint</span>
                <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold text-white">High ROI</span>
              </div>
              <p className="text-2xl font-black text-foreground">14-Day Launch</p>
              <p className="text-xs text-muted-foreground">Google Ads campaign setup, negative keyword filters, and landing page audit.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> 3.4x Avg. ROI Target
              </div>
            </div>

            <div className="glass-card p-5 space-y-3 border border-white/80 bg-white/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase">Full Growth Management</span>
                <Flame className="h-4 w-4 text-accent" />
              </div>
              <p className="text-2xl font-black text-foreground">30-Day Cycles</p>
              <p className="text-xs text-muted-foreground">Full-service SEO, Google &amp; Social Ads, content creation, and conversion optimization.</p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> No Lock-in Contracts
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
