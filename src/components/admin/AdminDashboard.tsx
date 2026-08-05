import { CheckCircle2, Clock, Inbox, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { CATEGORY_BREAKDOWN, DASHBOARD_STATS } from "@/data/mock-data";

const CARDS = [
  { label: "New leads today", value: DASHBOARD_STATS.newToday, icon: Inbox },
  { label: "New this week", value: DASHBOARD_STATS.newThisWeek, icon: TrendingUp },
  { label: "In progress", value: DASHBOARD_STATS.inProgress, icon: Clock },
  { label: "Closed this week", value: DASHBOARD_STATS.closed, icon: CheckCircle2 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card) => (
          <div key={card.label} className="surface-card p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-sm text-muted-foreground">{card.label}</span>
              <card.icon className="h-4 w-4 shrink-0 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-extrabold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="surface-card p-5 sm:p-6">
        <h2 className="text-base font-semibold">Leads by category</h2>
        <div className="mt-5 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CATEGORY_BREAKDOWN} margin={{ left: -18, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
              />
              <Tooltip
                cursor={{ fill: "var(--color-muted)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="leads" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} maxBarSize={72} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
