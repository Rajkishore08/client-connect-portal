import {
  TrendingUp,
  Inbox,
  Clock,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  FileText,
  Users,
  Activity,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_BREAKDOWN, DASHBOARD_STATS, LEADS } from "@/data/mock-data";

// Analytics Seed Datasets
const REVENUE_TREND = [
  { month: "Jan", revenue: 24500, cases: 38, conversion: 34 },
  { month: "Feb", revenue: 28900, cases: 44, conversion: 38 },
  { month: "Mar", revenue: 32100, cases: 51, conversion: 41 },
  { month: "Apr", revenue: 29800, cases: 46, conversion: 39 },
  { month: "May", revenue: 36400, cases: 58, conversion: 43 },
  { month: "Jun", revenue: 41200, cases: 64, conversion: 45 },
  { month: "Jul", revenue: 45800, cases: 72, conversion: 47 },
  { month: "Aug (YTD)", revenue: 48250, cases: 78, conversion: 49 },
];

const STATUS_DONUT_DATA = [
  { name: "In Progress", value: 4, color: "#3B82F6" },
  { name: "New Enquiries", value: 4, color: "#8B5CF6" },
  { name: "Contacted", value: 2, color: "#F59E0B" },
  { name: "Closed / Completed", value: 2, color: "#10B981" },
];

const FUNNEL_METRICS = [
  { stage: "Portal Visitors", count: 1840, fill: "#3B82F6" },
  { stage: "Intake Wizard Started", count: 920, fill: "#6366F1" },
  { stage: "Form Submitted", count: 340, fill: "#8B5CF6" },
  { stage: "Doc Verified & Audited", count: 280, fill: "#EC4899" },
  { stage: "Consultation Booked", count: 210, fill: "#10B981" },
];

const SLA_METRICS = [
  { service: "Passport Renewal", avgDays: 2.8, targetDays: 3.0, onTimeRate: "98.2%" },
  { service: "OCI Application", avgDays: 4.1, targetDays: 5.0, onTimeRate: "95.6%" },
  { service: "Renunciation / Surrender", avgDays: 3.5, targetDays: 4.0, onTimeRate: "97.0%" },
  { service: "Emergency Certificate", avgDays: 0.8, targetDays: 1.0, onTimeRate: "99.4%" },
  { service: "Website MVP Build", avgDays: 12.4, targetDays: 14.0, onTimeRate: "94.0%" },
];

export function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "quarter" | "ytd">("30d");

  const handleExportCSV = () => {
    const csvContent =
      "Month,Revenue ($),Total Cases,Conversion Rate (%)\n" +
      REVENUE_TREND.map((r) => `${r.month},${r.revenue},${r.cases},${r.conversion}%`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `OWS_Analytics_Report_${timeframe}.csv`;
    a.click();
    toast.success("Analytics CSV Dispatched to Download Folder");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Controls */}
      <div className="surface-card p-6 rounded-3xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
              <Activity className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-bold font-display text-foreground">Executive Intelligence &amp; Analytics</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Real-time telemetry on client intakes, SLA turnaround performance, conversion rates, and revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex items-center rounded-xl border border-border bg-muted/40 p-1 text-xs">
            {(["7d", "30d", "quarter", "ytd"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`rounded-lg px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  timeframe === tf ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : tf === "quarter" ? "Quarter" : "YTD"}
              </button>
            ))}
          </div>

          <Button onClick={handleExportCSV} variant="outline" size="sm" className="h-9 text-xs font-bold gap-1.5 cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export Analytics CSV
          </Button>

          <Button
            onClick={() => toast.info("Analytics metrics synced with live store.")}
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue KPI */}
        <div className="surface-card p-5 rounded-3xl border border-border relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Gross Intake Revenue</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold font-display text-foreground">$48,250</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" /> +19.4% vs last month
            </div>
          </div>
          <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[78%]" />
          </div>
        </div>

        {/* Total Active Cases KPI */}
        <div className="surface-card p-5 rounded-3xl border border-border relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Active Cases</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-500/10 text-blue-600 font-bold">
              <Inbox className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold font-display text-foreground">{LEADS.length}</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <ArrowUpRight className="h-3.5 w-3.5" /> +24% WoW Intake Volume
            </div>
          </div>
          <div className="h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[65%]" />
          </div>
        </div>

        {/* SLA On-Time Rate KPI */}
        <div className="surface-card p-5 rounded-3xl border border-border relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SLA Turnaround Rate</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 font-bold">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold font-display text-foreground">96.8%</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> 3.1 Days Avg Processing
            </div>
          </div>
          <div className="h-1 w-full bg-indigo-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[96.8%]" />
          </div>
        </div>

        {/* Conversion Rate KPI */}
        <div className="surface-card p-5 rounded-3xl border border-border relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Conversion Rate</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-purple-500/10 text-purple-600 font-bold">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold font-display text-foreground">42.5%</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" /> +5.2% vs benchmark
            </div>
          </div>
          <div className="h-1 w-full bg-purple-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[42.5%]" />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Revenue & Case Volume Chart (Spans 2 columns) */}
        <div className="surface-card p-6 rounded-3xl border border-border lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-foreground">Revenue &amp; Case Growth Trend</h3>
              <p className="text-xs text-muted-foreground">Monthly revenue trajectory ($ USD) vs total client intakes</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono font-bold">
              YTD +41.2% Revenue
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F52FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F52FF" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#0F52FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area yAxisId="right" type="monotone" dataKey="cases" name="Intake Cases" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorCases)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Case Status Distribution Donut */}
        <div className="surface-card p-6 rounded-3xl border border-border space-y-4">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-base font-bold font-display text-foreground">Pipeline Status Breakdown</h3>
            <p className="text-xs text-muted-foreground">Distribution across ongoing intake stages</p>
          </div>

          <div className="h-56 w-full relative grid place-items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={STATUS_DONUT_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                  {STATUS_DONUT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <div className="text-2xl font-extrabold font-display text-foreground">{LEADS.length}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Total Cases</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {STATUS_DONUT_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-muted/30">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{item.value} cases</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Intake Breakdown Bar Chart */}
        <div className="surface-card p-6 rounded-3xl border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-foreground">Intake Volume by Service Category</h3>
              <p className="text-xs text-muted-foreground">Demands across passport, web dev &amp; marketing</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              3 Main Pillars
            </Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_BREAKDOWN} margin={{ left: -15, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="leads" name="Active Leads" fill="#0F52FF" radius={[8, 8, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel Bar Chart */}
        <div className="surface-card p-6 rounded-3xl border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-foreground">Client Intake Conversion Funnel</h3>
              <p className="text-xs text-muted-foreground">Step-by-step visitor progression through portal</p>
            </div>
            <Badge variant="secondary" className="text-xs font-mono font-bold">
              22.8% End-to-End
            </Badge>
          </div>

          <div className="space-y-3 pt-2">
            {FUNNEL_METRICS.map((item, idx) => {
              const totalCount = FUNNEL_METRICS[0]?.count || 1;
              const percentage = Math.round((item.count / totalCount) * 100);
              return (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground">#{idx + 1}</span> {item.stage}
                    </span>
                    <span className="font-mono font-semibold text-muted-foreground">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SLA Processing Compliance Table */}
      <div className="surface-card overflow-hidden rounded-3xl border border-border">
        <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold font-display text-foreground">SLA Turnaround Performance</h3>
            <p className="text-xs text-muted-foreground">Service delivery timelines, average processing days, and zero-rejection rates</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-bold">
            <Award className="h-3.5 w-3.5 mr-1" /> 96.8% On-Time Guarantee
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 text-left text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-3.5">Service Offering</th>
                <th className="px-6 py-3.5">Target SLA</th>
                <th className="px-6 py-3.5">Actual Average</th>
                <th className="px-6 py-3.5">On-Time Rate</th>
                <th className="px-6 py-3.5 text-right">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {SLA_METRICS.map((row) => (
                <tr key={row.service} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-bold text-foreground">{row.service}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{row.targetDays} Days</td>
                  <td className="px-6 py-4 font-mono font-semibold text-primary">{row.avgDays} Days</td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-600">{row.onTimeRate}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3" /> Optimal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
