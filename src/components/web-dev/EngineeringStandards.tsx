import { Code2, Server, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EngineeringStandards() {
  return (
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
  );
}
