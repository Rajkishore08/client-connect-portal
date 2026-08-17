import { ArrowRight, Bot, CheckCircle2, ChevronDown, Code2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RobotHero from "@/components/ui/robot-hero";

export function WebDevHero() {
  return (
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
  );
}
