import { ChevronDown, FileSpreadsheet, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEADS, type Lead, type LeadStatus, type TrackStatus } from "@/data/mock-data";
import { exportLeadsToExcel } from "@/lib/backend-stubs";

const STATUSES: LeadStatus[] = ["New", "In Progress", "Contacted", "Closed"];
const TRACK_STATUSES: TrackStatus[] = ["Not Started", "In Progress", "Completed"];
const PAGE_SIZE = 5;

const STATUS_VARIANT: Record<LeadStatus, string> = {
  New: "bg-primary-soft text-primary",
  "In Progress": "bg-warning/15 text-warning-foreground",
  Contacted: "bg-accent text-accent-foreground",
  Closed: "bg-muted text-muted-foreground",
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(LEADS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const categories = useMemo(() => Array.from(new Set(LEADS.map((l) => l.category))), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesQuery =
        !q ||
        [l.name, l.email, l.phone, l.service, l.reference].some((v) => v.toLowerCase().includes(q));
      return (
        matchesQuery &&
        (category === "all" || l.category === category) &&
        (status === "all" || l.status === status)
      );
    });
  }, [leads, search, category, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const updateLead = (id: string, patch: Partial<Lead>) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const updateTracking = (id: string, key: keyof Lead["tracking"], patch: { status?: TrackStatus; ref?: string }) =>
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, tracking: { ...l.tracking, [key]: { ...l.tracking[key], ...patch } } }
          : l,
      ),
    );

  const doExport = async () => {
    setExporting(true);
    // TODO: replace with real Excel export
    await exportLeadsToExcel();
    setExporting(false);
    toast.success("Export ready", { description: `${filtered.length} leads exported to Excel.` });
  };

  return (
    <div className="space-y-4">
      <div className="surface-card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <RefreshCw className="h-4 w-4 shrink-0 text-success" />
          <span className="min-w-0 truncate text-muted-foreground">
            Google Sheets sync — <span className="font-medium text-success">Connected</span>, last
            synced 6 minutes ago
          </span>
        </div>
        <Button onClick={doExport} disabled={exporting} variant="outline">
          <FileSpreadsheet className="h-4 w-4" />
          {exporting ? "Exporting..." : "Export to Excel"}
        </Button>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 pl-9"
              placeholder="Search name, email, service or reference"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Docs</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((lead) => (
                <>
                  <tr key={lead.id} className="border-t border-border align-middle">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{lead.date}</td>
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{lead.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.category}</td>
                    <td className="px-4 py-3">{lead.service}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{lead.source}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.documents.length}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={lead.status}
                        onValueChange={(v) => updateLead(lead.id, { status: v as LeadStatus })}
                      >
                        <SelectTrigger
                          className={`h-8 w-[9.5rem] border-0 text-xs font-medium ${STATUS_VARIANT[lead.status]}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle details"
                        onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expanded === lead.id ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-detail`} className="border-t border-border bg-muted/30">
                      <td colSpan={10} className="px-4 py-5">
                        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                          <div>
                            <h4 className="text-sm font-semibold">Tracking</h4>
                            <div className="mt-3 space-y-3">
                              {(
                                [
                                  ["governmentForm", "Government Form"],
                                  ["vfs", "VFS"],
                                  ["courier", "FedEx / Courier"],
                                ] as const
                              ).map(([key, label]) => (
                                <div key={key} className="grid gap-2 sm:grid-cols-[10rem_1fr_1fr]">
                                  <span className="self-center text-sm text-muted-foreground">
                                    {label}
                                  </span>
                                  <Select
                                    value={lead.tracking[key].status}
                                    onValueChange={(v) =>
                                      updateTracking(lead.id, key, { status: v as TrackStatus })
                                    }
                                  >
                                    <SelectTrigger className="h-9">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {TRACK_STATUSES.map((s) => (
                                        <SelectItem key={s} value={s}>
                                          {s}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    className="h-9"
                                    placeholder="Tracking number"
                                    value={lead.tracking[key].ref ?? ""}
                                    onChange={(e) =>
                                      updateTracking(lead.id, key, { ref: e.target.value })
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`notes-${lead.id}`}>Notes</Label>
                              <Textarea
                                id={`notes-${lead.id}`}
                                rows={3}
                                value={lead.notes}
                                onChange={(e) => updateLead(lead.id, { notes: e.target.value })}
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Uploaded documents</h4>
                              {lead.documents.length === 0 ? (
                                <p className="mt-2 text-sm text-muted-foreground">None uploaded.</p>
                              ) : (
                                <ul className="mt-2 flex flex-wrap gap-2">
                                  {lead.documents.map((doc) => (
                                    <li key={doc}>
                                      <Badge variant="secondary">{doc}</Badge>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Reference {lead.reference}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {rows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={10} className="px-4 py-10 text-center text-muted-foreground">
                    No leads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {filtered.length} lead{filtered.length === 1 ? "" : "s"} · page {current} of {pageCount}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current <= 1}
              onClick={() => setPage(current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={current >= pageCount}
              onClick={() => setPage(current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
