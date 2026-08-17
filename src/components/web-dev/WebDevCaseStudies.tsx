import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CASE_STUDIES = [
  {
    title: "ManageTeamz — Fleet & Logistics Operations Portal",
    category: "Logistics & Supply Chain",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
    description:
      "Full-stack web application enabling real-time delivery fleet monitoring, route optimization, and instant customer SMS notifications.",
    metrics: "4.8x Efficiency Increase • 120,000+ Active Deliveries Tracked Daily",
  },
  {
    title: "Ocean Observatory System — Government Environmental Portal",
    category: "Government & Public Safety",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800",
    description:
      "High-concurrency disaster management and ocean weather telemetry portal processing real-time sensor streams for coastal safety.",
    metrics: "99.999% Uptime • Real-Time Satellite & Sensor Telemetry Feed",
  },
  {
    title: "Global Confectionery Analytics & Sales Forecasting System",
    category: "Data Analytics & Enterprise",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    description:
      "Web application fused with predictive ML models to monitor product pipelines across 14 international target markets.",
    metrics: "3.2x Predictive Sales Accuracy • Automated Supply Allocation",
  },
];

export function WebDevCaseStudies() {
  return (
    <section className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
          OUR HISTORY &amp; CASE STUDIES
        </Badge>
        <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
          Featured Client Work Showcase
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          Explore how our custom web applications have solved real-world operational challenges.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {CASE_STUDIES.map((cs) => (
          <div
            key={cs.title}
            className="group overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {cs.category}
                </Badge>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">{cs.description}</p>
              </div>
            </div>
            <div className="p-6 pt-0 space-y-3 border-t border-slate-100 mt-2">
              <p className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 p-2.5 rounded-xl">
                {cs.metrics}
              </p>
              <Button asChild variant="ghost" size="sm" className="w-full text-xs font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50">
                <Link to="/book">
                  View Case Details <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
