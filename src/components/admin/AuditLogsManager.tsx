import {
  Activity,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileSpreadsheet,
  Filter,
  History,
  Lock,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToCSV } from "@/lib/export-utils";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: "Super Admin" | "Lead Manager (Employee)";
  category: "Status Change" | "Milestone Update" | "Client Reminder Sent" | "Staff Login Admin";
  action: string;
  details: string;
  ipAddress: string;
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-101",
    timestamp: "2026-08-14 23:15:42",
    actorName: "Super Admin",
    actorRole: "Super Admin",
    category: "Status Change",
    action: "Updated Lead Pipeline Status",
    details: "Lead #OWS-889124 (Ananya Sharma) moved to 'In Progress'",
    ipAddress: "172.56.21.104 (Chicago, USA)",
  },
  {
    id: "log-102",
    timestamp: "2026-08-14 22:48:10",
    actorName: "Rahul Verma",
    actorRole: "Lead Manager (Employee)",
    category: "Milestone Update",
    action: "Advanced Milestone Step",
    details: "Advanced Step 01 (PRD & Scope Architecture) to 'Completed' for #OWS-102488",
    ipAddress: "107.12.89.41 (Chicago, USA)",
  },
  {
    id: "log-103",
    timestamp: "2026-08-14 21:02:18",
    actorName: "Rahul Verma",
    actorRole: "Lead Manager (Employee)",
    category: "Client Reminder Sent",
    action: "Dispatched Automated SMS Alert",
    details: "Sent SMS intake receipt & consultation reminder to +1 (312) 555-0132",
    ipAddress: "107.12.89.41 (Chicago, USA)",
  },
  {
    id: "log-104",
    timestamp: "2026-08-14 19:30:00",
    actorName: "Super Admin",
    actorRole: "Super Admin",
    category: "Staff Login Admin",
    action: "Created Employee Account",
    details: "Issued Lead Manager credentials for 'rahul.leadmanager@oneworldsolutions.com'",
    ipAddress: "172.56.21.104 (Chicago, USA)",
  },
  {
    id: "log-105",
    timestamp: "2026-08-14 18:12:05",
    actorName: "Rahul Verma",
    actorRole: "Lead Manager (Employee)",
    category: "Milestone Update",
    action: "Added Custom Milestone",
    details: "Added custom milestone 'Surrender Certificate Audit' to #OWS-440219",
    ipAddress: "107.12.89.41 (Chicago, USA)",
  },
];

export function AuditLogsManager() {
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredLogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((l) => {
      const matchesSearch =
        !q ||
        [l.actorName, l.action, l.details, l.ipAddress].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesSearch && (categoryFilter === "all" || l.category === categoryFilter);
    });
  }, [logs, search, categoryFilter]);

  const handleExportAuditCSV = () => {
    try {
      const exportData = filteredLogs.map((l) => ({
        "Log ID": l.id,
        Timestamp: l.timestamp,
        "Performed By": `${l.actorName} (${l.actorRole})`,
        Category: l.category,
        Action: l.action,
        Details: l.details,
        "IP Address": l.ipAddress,
      }));

      exportToCSV(exportData, `system_audit_logs_${new Date().toISOString().split("T")[0]}.csv`);
      toast.success("Audit Log Exported", {
        description: `Exported ${filteredLogs.length} activity audit log records to CSV.`,
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to export audit logs.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-indigo-100 border border-indigo-300 text-indigo-700 grid place-items-center font-bold">
            <History className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-display">
              System Activity Audit Trail &amp; Change Logs
            </h2>
            <p className="text-xs text-slate-500">
              Complete real-time log tracking all lead modifications, milestone advances, and staff logins.
            </p>
          </div>
        </div>

        <Button
          onClick={handleExportAuditCSV}
          variant="outline"
          size="sm"
          className="gap-1.5 font-bold border-slate-300 hover:bg-slate-100 text-slate-800 text-xs cursor-pointer"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export Audit CSV
        </Button>
      </div>

      {/* Filter Toolbar & Table */}
      <div className="surface-card overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-[1fr_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9 text-xs"
              placeholder="Search audit trail by actor, action description, lead reference, or IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-10 w-full sm:w-56 text-xs font-bold">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[9999]">
              <SelectItem value="all">All Action Categories</SelectItem>
              <SelectItem value="Status Change">Status Changes</SelectItem>
              <SelectItem value="Milestone Update">Milestone Updates</SelectItem>
              <SelectItem value="Client Reminder Sent">Client Reminders Sent</SelectItem>
              <SelectItem value="Staff Login Admin">Staff Account Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-xs">
            <thead className="bg-slate-100/70 text-left text-[11px] uppercase tracking-wider font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Performed By</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Action Description</th>
                <th className="px-4 py-3">Details &amp; Lead Ref</th>
                <th className="px-4 py-3">IP / Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors align-middle">
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[11px] text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900">{log.actorName}</p>
                    <p className="text-[10px] text-slate-500">{log.actorRole}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {log.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800">{log.action}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs max-w-xs">{log.details}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[10px] text-slate-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No activity audit logs match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
