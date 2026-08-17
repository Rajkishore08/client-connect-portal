import { FileCheck2, KeyRound, Lock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EngineeringGuarantees() {
  return (
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
  );
}
