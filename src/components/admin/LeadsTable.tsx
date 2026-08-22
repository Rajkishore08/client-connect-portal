import {
  ArrowDownToLine,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  DollarSign,
  Download,
  ExternalLink,
  FileCode,
  FileJson,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  Globe,
  Inbox,
  Lock,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sliders,
  Sparkles,
  Trash2,
  UserPlus,
  Wand2,
  X,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { analyzeLeadWithAI, type AILeadAnalysis } from "@/lib/ai-lead-analyzer";
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
import {
  LEADS,
  getDefaultMilestonesForCategory,
  type Lead,
  type LeadStatus,
  type Milestone,
  type TrackStatus,
} from "@/data/mock-data";
import { sendStatusUpdateEmail } from "@/lib/email-service";
import { exportToCSV, exportToJSON } from "@/lib/export-utils";
import {
  createLeadInSupabase,
  fetchLeadsFromSupabase,
  updateLeadInSupabase,
} from "@/lib/supabase-db";

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "In Contact",
  "Proposal Sent",
  "Payment Pending",
  "In Progress",
  "Completed",
  "Archived",
];

const TRACK_STATUSES: TrackStatus[] = ["Not Started", "In Progress", "Completed"];
const PAGE_SIZE = 6;

const STATUS_VARIANT: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-300 font-bold",
  "In Contact": "bg-amber-100 text-amber-900 border-amber-300 font-bold",
  "Proposal Sent": "bg-purple-100 text-purple-900 border-purple-300 font-bold",
  "Payment Pending": "bg-orange-100 text-orange-900 border-orange-300 font-bold",
  "In Progress": "bg-indigo-100 text-indigo-900 border-indigo-300 font-bold",
  Completed: "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold",
  Archived: "bg-slate-100 text-slate-700 border-slate-300 font-bold",
};

function dataURLtoBlob(dataurl: string): Blob {
  try {
    const parts = dataurl.split(",");
    const header = parts[0] || "";
    const mimeMatch = header.match(/:(.*?);/);
    const mime: string = (mimeMatch && mimeMatch[1]) ? mimeMatch[1] : "application/octet-stream";
    const bstr = atob(parts[1] || "");
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return new Blob([dataurl], { type: "application/octet-stream" });
  }
}

function triggerFileDownload(url: string, fileName: string) {
  if (!url || url === "#") {
    toast.info(`Vault File Record: "${fileName}"`, {
      description: "Encrypted file record logged into vault.",
    });
    return;
  }

  if (url.startsWith("data:")) {
    try {
      const blob = dataURLtoBlob(url);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      toast.success(`Downloaded "${fileName}"`);
      return;
    } catch (e) {
      console.warn("[Download Error] Base64 blob conversion warning:", e);
    }
  }

  if (url.startsWith("blob:")) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded "${fileName}"`);
    return;
  }

  toast.loading(`Preparing "${fileName}" for download...`, { id: "dl-toast" });
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json") || contentType.includes("text/html")) {
        throw new Error("Remote endpoint returned text error instead of binary file");
      }
      return res.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      toast.success(`Downloaded "${fileName}"`, { id: "dl-toast" });
    })
    .catch((err) => {
      console.warn("[Download Warning] Remote fetch fallback:", err);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Opened "${fileName}"`, { id: "dl-toast" });
    });
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Dedicated Manage Progress Modal State
  const [activeManageLead, setActiveManageLead] = useState<Lead | null>(null);

  // Custom In-App Milestone Modal State (No native browser prompts!)
  const [customMilestoneModalLeadId, setCustomMilestoneModalLeadId] = useState<string | null>(null);
  const [customMilestoneTitle, setCustomMilestoneTitle] = useState("");

  // AI Lead Scoping Audit Modal State
  const [aiTargetLead, setAiTargetLead] = useState<Lead | null>(null);

  // New Lead Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Passport & Visa Services",
    service: "Expedited Passport Renewal",
    status: "New" as LeadStatus,
    notes: "",
  });

  // Fetch Live Leads from Supabase DB on Mount
  const reloadLeads = async () => {
    setLoading(true);
    const data = await fetchLeadsFromSupabase();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    reloadLeads();
  }, []);

  const categories = useMemo(() => Array.from(new Set(leads.map((l) => l.category))), [leads]);

  // Compute status counts for pipeline pills
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: leads.length };
    ALL_STATUSES.forEach((s) => (counts[s] = 0));
    leads.forEach((l) => {
      counts[l.status] = (counts[l.status] || 0) + 1;
    });
    return counts;
  }, [leads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesQuery =
        !q ||
        [l.name, l.email, l.phone, l.service, l.reference].some((v) =>
          v.toLowerCase().includes(q)
        );
      return (
        matchesQuery &&
        (category === "all" || l.category === category) &&
        (statusFilter === "all" || l.status === statusFilter)
      );
    });
  }, [leads, search, category, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const updated = { ...l, ...patch };
          if (patch.status && patch.status !== l.status) {
            sendStatusUpdateEmail({
              clientName: l.name,
              clientEmail: l.email,
              serviceTitle: l.service,
              trackingId: l.reference,
              newStatus: patch.status,
            });
            toast.success(`Status updated to "${patch.status}"`, {
              description: `Email notification sent to ${l.email}`,
            });
          }
          return updated;
        }
        return l;
      })
    );

    // Sync update to Supabase DB
    await updateLeadInSupabase(id, patch);
  };

  // Submit In-App Custom Milestone Modal (0 Browser Prompts!)
  const handleAddCustomMilestoneSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customMilestoneModalLeadId || !customMilestoneTitle.trim()) {
      toast.error("Please enter a milestone title.");
      return;
    }

    const leadId = customMilestoneModalLeadId;
    const title = customMilestoneTitle.trim();

    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const currentMilestones =
      targetLead.milestones && targetLead.milestones.length > 0
        ? [...targetLead.milestones]
        : getDefaultMilestonesForCategory(targetLead.category);

    const newMilestone: Milestone = {
      id: `m-${Date.now()}`,
      title: title,
      status: "In Progress",
      ref: "",
    };

    const updatedMilestones = [...currentMilestones, newMilestone];

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, milestones: updatedMilestones } : l))
    );

    if (activeManageLead?.id === leadId) {
      setActiveManageLead((prev) => (prev ? { ...prev, milestones: updatedMilestones } : null));
    }

    setCustomMilestoneModalLeadId(null);
    setCustomMilestoneTitle("");

    await updateLeadInSupabase(leadId, { milestones: updatedMilestones });
    toast.success("Custom Milestone Added", {
      description: `"${title}" milestone added to lead #${targetLead.reference}`,
    });
  };

  // Delete Milestone Item
  const handleDeleteMilestone = async (leadId: string, milestoneId: string) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const currentMilestones =
      targetLead.milestones && targetLead.milestones.length > 0
        ? [...targetLead.milestones]
        : getDefaultMilestonesForCategory(targetLead.category);

    if (currentMilestones.length <= 1) {
      toast.error("Cannot Delete Milestone", {
        description: "A lead must have at least 1 active milestone step.",
      });
      return;
    }

    const updatedMilestones = currentMilestones.filter((m) => m.id !== milestoneId);

    // Recalculate completion progress
    const completedCount = updatedMilestones.filter((m) => m.status === "Completed").length;
    const computedProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, milestones: updatedMilestones, progressPercent: computedProgress }
          : l
      )
    );

    if (activeManageLead?.id === leadId) {
      setActiveManageLead((prev) =>
        prev ? { ...prev, milestones: updatedMilestones, progressPercent: computedProgress } : null
      );
    }

    await updateLeadInSupabase(leadId, {
      milestones: updatedMilestones,
      progressPercent: computedProgress,
    });

    toast.success("Milestone Removed");
  };

  // Open In-App Custom Milestone Creator Dialog (0 Browser Prompts!)
  const handleOpenAddCustomMilestoneModal = (leadId: string) => {
    setCustomMilestoneModalLeadId(leadId);
    setCustomMilestoneTitle("");
  };

  // Helper to update specific milestone item with strict sequential validation rule
  const handleUpdateMilestone = async (
    leadId: string,
    milestoneId: string,
    patch: Partial<Milestone>
  ) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const currentMilestones =
      targetLead.milestones && targetLead.milestones.length > 0
        ? [...targetLead.milestones]
        : getDefaultMilestonesForCategory(targetLead.category);

    const milestoneIndex = currentMilestones.findIndex((m) => m.id === milestoneId);
    if (milestoneIndex === -1) return;

    const targetMilestone = currentMilestones[milestoneIndex];
    if (!targetMilestone) return;

    // Strict Sequential Progression Rule:
    // If attempting to set status to "In Progress" or "Completed",
    // check if all preceding milestones (0 to milestoneIndex - 1) are "Completed".
    if (patch.status && (patch.status === "In Progress" || patch.status === "Completed")) {
      for (let i = 0; i < milestoneIndex; i++) {
        const prev = currentMilestones[i];
        if (prev && prev.status !== "Completed") {
          toast.error(`Sequential Milestone Validation Blocked`, {
            description: `Cannot set "${targetMilestone.title}" to ${patch.status}. Step ${i + 1} ("${prev.title}") must be "Completed" first.`,
          });
          return;
        }
      }
    }

    const updatedMilestones = currentMilestones.map((m, idx) => {
      if (idx === milestoneIndex) {
        return { ...m, ...patch };
      }
      return m;
    });

    // Calculate auto-progress percentage based on completed milestones
    const completedCount = updatedMilestones.filter((m) => m.status === "Completed").length;
    const computedProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    // Auto-sync overall lead status if all completed
    let newLeadStatus = targetLead.status;
    if (computedProgress === 100 && targetLead.status !== "Completed") {
      newLeadStatus = "Completed";
      toast.success("Lead Processing Complete!", {
        description: `All milestones finished for #${targetLead.reference}. Status updated to Completed.`,
      });
    } else if (computedProgress > 0 && targetLead.status === "New") {
      newLeadStatus = "In Progress";
    }

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              milestones: updatedMilestones,
              progressPercent: computedProgress,
              status: newLeadStatus,
            }
          : l
      )
    );

    if (activeManageLead?.id === leadId) {
      setActiveManageLead((prev) =>
        prev
          ? {
              ...prev,
              milestones: updatedMilestones,
              progressPercent: computedProgress,
              status: newLeadStatus,
            }
          : null
      );
    }

    await updateLeadInSupabase(leadId, {
      milestones: updatedMilestones,
      progressPercent: computedProgress,
      status: newLeadStatus,
    });
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) {
      toast.error("Please provide at least Name and Email.");
      return;
    }

    const defaultMs = getDefaultMilestonesForCategory(newLeadForm.category);

    const created: Lead = {
      id: `lead-${Date.now()}`,
      reference: `OWS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0]!,
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone || "+1 (312) 555-0100",
      category: newLeadForm.category,
      service: newLeadForm.service,
      source: "Form",
      status: newLeadForm.status,
      progressPercent: 25,
      notes: newLeadForm.notes,
      documents: [],
      milestones: defaultMs,
      tracking: {
        governmentForm: { status: "Not Started" },
        vfs: { status: "Not Started" },
        courier: { status: "Not Started" },
      },
    };

    setLeads((prev) => [created, ...prev]);
    setShowAddModal(false);

    // Save to Supabase PostgreSQL Database
    await createLeadInSupabase(created);

    setNewLeadForm({
      name: "",
      email: "",
      phone: "",
      category: "Passport & Visa Services",
      service: "Expedited Passport Renewal",
      status: "New",
      notes: "",
    });
    toast.success("Lead created successfully!", {
      description: `Ref: ${created.reference} saved to Supabase DB with custom category milestones.`,
    });
  };

  // CSV Export Trigger
  const handleExportCSV = () => {
    try {
      const exportData = filtered.map((l) => ({
        "Reference ID": l.reference,
        Date: l.date,
        Name: l.name,
        Email: l.email,
        Phone: l.phone,
        Category: l.category,
        Service: l.service,
        Source: l.source,
        Status: l.status,
        "Progress %": `${l.progressPercent ?? 0}%`,
        Notes: l.notes || "",
      }));

      exportToCSV(exportData, `ows_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
      toast.success("CSV Export Completed", {
        description: `Exported ${filtered.length} lead records to CSV spreadsheet.`,
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to export CSV.");
    }
  };

  // JSON Export Trigger
  const handleExportJSON = () => {
    try {
      exportToJSON(filtered, `ows_leads_export_${new Date().toISOString().split("T")[0]}.json`);
      toast.success("JSON Export Completed", {
        description: `Exported ${filtered.length} lead records to JSON format.`,
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to export JSON.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Sync Banner & Data Export Toolbar */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-600 grid place-items-center shrink-0">
            <RefreshCw className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Lead Management Engine</p>
            <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Supabase DB Connected • {leads.length} Active Client Intakes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-1.5 shadow-sm text-xs cursor-pointer"
          >
            <UserPlus className="h-4 w-4" /> Add Lead
          </Button>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="gap-1.5 font-bold border-slate-300 hover:bg-slate-100 text-slate-800 text-xs cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export CSV
          </Button>

          <Button
            onClick={handleExportJSON}
            variant="outline"
            size="sm"
            className="gap-1.5 font-bold border-slate-300 hover:bg-slate-100 text-slate-800 text-xs cursor-pointer"
          >
            <FileJson className="h-4 w-4 text-purple-600" /> Export JSON
          </Button>
        </div>
      </div>

      {/* Interactive Status Pipeline Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
            statusFilter === "all"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          All Leads
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-current font-mono">
            {statusCounts["all"]}
          </span>
        </button>

        {ALL_STATUSES.map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
              statusFilter === st
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {st}
            {statusCounts[st] ? (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-900 font-bold font-mono">
                {statusCounts[st]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="surface-card overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid gap-3 border-b border-slate-200/80 p-4 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="h-10 pl-9 text-xs"
              placeholder="Search by lead name, email, phone, service, or reference ID (e.g. OWS-99241)"
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
            <SelectTrigger className="h-10 w-full sm:w-56 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Service Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-full sm:w-44 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pipeline Statuses</SelectItem>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lead Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-xs">
            <thead className="bg-slate-100/70 text-left text-[11px] uppercase tracking-wider font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Date / Ref</th>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Contact Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service &amp; Category</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Pipeline Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {rows.map((lead) => {
                const activeMilestones =
                  lead.milestones && lead.milestones.length > 0
                    ? lead.milestones
                    : getDefaultMilestonesForCategory(lead.category);

                return (
                  <Fragment key={lead.id}>
                    <tr className={`transition-colors align-middle ${
                      lead.isSpecialRequest || lead.priority === "High"
                        ? "bg-amber-50/70 hover:bg-amber-100/70 border-l-4 border-l-amber-500"
                        : "hover:bg-slate-50/80"
                    }`}>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          { (lead.isSpecialRequest || lead.priority === "High") && (
                            <Flame className="h-4 w-4 text-amber-600 shrink-0 animate-pulse" />
                          )}
                          <p className="font-bold text-slate-900 font-mono text-[11px]">{lead.reference}</p>
                        </div>
                        <p className="text-[10px] text-slate-500">{lead.date}</p>
                        { (lead.isSpecialRequest || lead.priority === "High") && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-600 text-white shadow-2xs">
                            HIGH PRIORITY
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900">
                        {lead.name}
                        {lead.engagementModel && (
                          <p className="text-[10px] font-extrabold text-blue-700 bg-blue-100/90 px-2 py-0.5 rounded mt-1 border border-blue-300 inline-block">
                            Model: {lead.engagementModel}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                        <a href={`mailto:${lead.email}`} className="hover:underline text-blue-600">
                          {lead.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 font-mono text-slate-700">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline text-emerald-600 font-semibold inline-flex items-center gap-1"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-800">{lead.service}</p>
                        <p className="text-[10px] text-slate-500">{lead.category}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="outline" className="text-[10px] font-bold">
                          {lead.source}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <Select
                          value={lead.status}
                          onValueChange={(v) => updateLead(lead.id, { status: v as LeadStatus })}
                        >
                          <SelectTrigger
                            className={`h-8 w-[10.5rem] border text-xs shadow-2xs transition-all ${
                              STATUS_VARIANT[lead.status] || "bg-slate-100 text-slate-900 font-bold border-slate-300"
                            }`}
                          >
                            <SelectValue placeholder={lead.status || "Select Status"} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-slate-200 shadow-2xl z-[9999]">
                            {ALL_STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs font-bold py-1.5 cursor-pointer">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3.5 text-right flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAiTargetLead(lead)}
                          className="h-8 gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer"
                        >
                          <Wand2 className="h-3.5 w-3.5 text-purple-600" />
                          AI Audit
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveManageLead(lead)}
                          className="h-8 gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200 cursor-pointer"
                        >
                          <Sliders className="h-3.5 w-3.5 text-blue-600" />
                          Manage Progress
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                          className="h-8 gap-1 text-xs font-bold text-slate-700 hover:bg-slate-200/70 cursor-pointer"
                        >
                          Details
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${expanded === lead.id ? "rotate-180" : ""}`}
                          />
                        </Button>
                      </td>
                    </tr>

                    {/* Expanded Lead Inspection Drawer */}
                    {expanded === lead.id && (
                      <tr className="bg-slate-50/90 border-t border-slate-200">
                        <td colSpan={8} className="px-4 py-6">
                          <div className="grid gap-6 lg:grid-cols-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                            {/* Left Column: Service Specific Milestones */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                    {lead.category} Milestones
                                  </h4>
                                  <p className="text-[10px] text-slate-500">
                                    {activeMilestones.length} active steps configured for this lead
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenAddCustomMilestoneModal(lead.id)}
                                  className="h-7 text-[11px] font-bold border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                                >
                                  <Plus className="h-3 w-3 mr-1" /> Add Custom Milestone
                                </Button>
                              </div>

                               <div className="space-y-2.5">
                                {activeMilestones.map((m, idx, allMs) => {
                                  const isLocked = allMs.slice(0, idx).some((prev) => prev.status !== "Completed");

                                  return (
                                    <div
                                      key={m.id}
                                      className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                                        isLocked
                                          ? "bg-slate-50/80 border-slate-200"
                                          : m.status === "Completed"
                                          ? "bg-emerald-50/50 border-emerald-300"
                                          : m.status === "In Progress"
                                          ? "bg-blue-50/70 border-blue-300 ring-1 ring-blue-200"
                                          : "bg-white border-slate-200"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span
                                            className={`h-6 w-6 rounded-lg font-mono text-[10px] font-bold grid place-items-center shrink-0 ${
                                              m.status === "Completed"
                                                ? "bg-emerald-600 text-white"
                                                : m.status === "In Progress"
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-200 text-slate-600"
                                            }`}
                                          >
                                            0{idx + 1}
                                          </span>
                                          <span className="text-xs font-bold text-slate-900 truncate">
                                            {m.title}
                                          </span>
                                        </div>

                                        {isLocked ? (
                                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg">
                                            <Lock className="h-3 w-3 text-amber-600" /> Step {idx} First
                                          </span>
                                        ) : (
                                          <Select
                                            value={m.status}
                                            onValueChange={(v) =>
                                              handleUpdateMilestone(lead.id, m.id, {
                                                status: v as TrackStatus,
                                              })
                                            }
                                          >
                                            <SelectTrigger
                                              className={`h-7 text-[11px] font-bold w-32 ${
                                                m.status === "Completed"
                                                  ? "bg-emerald-600 text-white border-emerald-600"
                                                  : m.status === "In Progress"
                                                  ? "bg-blue-600 text-white border-blue-600"
                                                  : "bg-white text-slate-800 border-slate-300"
                                              }`}
                                            >
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white z-[9999] border border-slate-200 shadow-2xl">
                                              {TRACK_STATUSES.map((s) => (
                                                <SelectItem
                                                  key={s}
                                                  value={s}
                                                  className="text-xs font-bold py-1.5 cursor-pointer"
                                                >
                                                  {s}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        )}
                                      </div>

                                      <Input
                                        className="h-7 text-[11px] bg-white font-mono border-slate-200"
                                        placeholder="Tracking / Reference #"
                                        value={m.ref || ""}
                                        onChange={(e) =>
                                          handleUpdateMilestone(lead.id, m.id, { ref: e.target.value })
                                        }
                                      />
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Direct Client Contact Action Buttons */}
                              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-transform active:scale-95 cursor-pointer"
                                >
                                  WhatsApp Client
                                </a>
                                <a
                                  href={`mailto:${lead.email}?subject=Update%20regarding%20${encodeURIComponent(lead.service)}%20(${lead.reference})`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-transform active:scale-95 cursor-pointer"
                                >
                                  Email Client
                                </a>
                              </div>
                            </div>

                            {/* Right Column: Internal Notes & Email Quick Copy */}
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <Label htmlFor={`notes-${lead.id}`} className="text-xs font-bold text-slate-700">
                                  Internal Lead Notes &amp; Scope Requirements
                                </Label>
                                <Textarea
                                  id={`notes-${lead.id}`}
                                  rows={4}
                                  className="text-xs bg-slate-50"
                                  placeholder="Add client notes, budget preferences, or specific document notes..."
                                  value={lead.notes}
                                  onChange={(e) => updateLead(lead.id, { notes: e.target.value })}
                                />
                              </div>

                              {/* Quick Client Email Templates */}
                              <div className="pt-2 border-t border-slate-100 space-y-2">
                                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                  Quick Client Email Responses
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const body = `Dear ${lead.name},\n\nThank you for submitting your intake request for ${lead.service} (Ref: ${lead.reference}).\n\nOur team in Chicago has received your details and is reviewing your file. Please let us know if you have any questions.\n\nWarm regards,\nOne World Solutions Concierge Team`;
                                      navigator.clipboard.writeText(body);
                                      toast.success("Confirmation Copied", { description: "Email template copied to clipboard!" });
                                    }}
                                    className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                                  >
                                    Copy Intake Receipt
                                  </Button>

                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const body = `Dear ${lead.name},\n\nRegarding your project #${lead.reference} (${lead.service}).\n\nWe require an updated document photo or specification sheet before proceeding to the next milestone.\n\nWarm regards,\nOne World Solutions Team`;
                                      navigator.clipboard.writeText(body);
                                      toast.success("Doc Request Copied", { description: "Email template copied to clipboard!" });
                                    }}
                                    className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                                  >
                                    Copy Doc Request
                                  </Button>
                                </div>
                              </div>

                              {/* Uploaded Intake Documents & Attachments Block */}
                              <div className="pt-3 border-t border-slate-100 space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Paperclip className="h-3.5 w-3.5 text-blue-600" />
                                    Uploaded Intake Files &amp; Attachments
                                  </p>
                                  <Badge variant="outline" className="text-[10px] font-bold bg-blue-50 text-blue-700 border-blue-200">
                                    {lead.documents && lead.documents.length > 0 ? `${lead.documents.length} File(s)` : "No Files Uploaded"}
                                  </Badge>
                                </div>

                                {lead.documents && lead.documents.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-2">
                                    {lead.documents.map((docUrl, idx) => {
                                      const isUrl = typeof docUrl === "string" && (docUrl.startsWith("http://") || docUrl.startsWith("https://") || docUrl.startsWith("data:"));
                                      const fileName = typeof docUrl === "string" ? docUrl.split("/").pop() || `Document_${idx + 1}` : `Uploaded_Doc_${idx + 1}`;

                                      return (
                                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                                            <span className="font-bold text-slate-800 truncate text-[11px]">{fileName}</span>
                                          </div>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => triggerFileDownload(docUrl, fileName)}
                                            className="h-7 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 cursor-pointer"
                                          >
                                            <Download className="h-3 w-3 mr-1" /> Download
                                          </Button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-[11px] text-slate-400 italic">No document attachments uploaded during intake submission.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    No lead records match your search or selected pipeline stage.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 text-xs bg-slate-50/50">
          <span className="text-slate-500 font-medium">
            Showing {rows.length} of {filtered.length} lead{filtered.length === 1 ? "" : "s"} (Page {current} of {pageCount})
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current <= 1}
              onClick={() => setPage(current - 1)}
              className="text-xs font-bold cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={current >= pageCount}
              onClick={() => setPage(current + 1)}
              className="text-xs font-bold cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dedicated Lead Progress & Status Update Modal */}
      {activeManageLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="surface-card w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 grid place-items-center font-bold">
                  <Sliders className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Lead Status &amp; Progress Console
                  </h3>
                  <p className="text-xs text-slate-500">
                    #{activeManageLead.reference} • {activeManageLead.name} ({activeManageLead.service})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveManageLead(null)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Pipeline Status Selector & Overall Completion % */}
              <div className="grid gap-4 sm:grid-cols-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="space-y-1.5">
                  <Label className="font-bold text-slate-800">Pipeline Stage Status</Label>
                  <Select
                    value={activeManageLead.status}
                    onValueChange={(v) => {
                      updateLead(activeManageLead.id, { status: v as LeadStatus });
                      setActiveManageLead({ ...activeManageLead, status: v as LeadStatus });
                    }}
                  >
                    <SelectTrigger className="h-10 bg-white font-bold text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[9999]">
                      {ALL_STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="text-xs font-bold">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="font-bold text-slate-800">Completion Progress (%)</Label>
                    <span className="font-mono font-bold text-blue-600 text-xs">
                      {activeManageLead.progressPercent ?? 45}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={activeManageLead.progressPercent ?? 45}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateLead(activeManageLead.id, { progressPercent: val });
                      setActiveManageLead({ ...activeManageLead, progressPercent: val });
                    }}
                  />
                </div>
              </div>

              {/* Service Category Milestones Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    {activeManageLead.category} Milestones
                  </h4>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenAddCustomMilestoneModal(activeManageLead.id)}
                    className="h-7 text-xs font-bold border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Custom Milestone
                  </Button>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {(activeManageLead.milestones && activeManageLead.milestones.length > 0
                    ? activeManageLead.milestones
                    : getDefaultMilestonesForCategory(activeManageLead.category)
                  ).map((m, idx, allMs) => {
                    const isLocked = allMs.slice(0, idx).some((prev) => prev.status !== "Completed");

                    return (
                      <div
                        key={m.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isLocked
                            ? "bg-slate-50/80 border-slate-200"
                            : m.status === "Completed"
                            ? "bg-emerald-50/50 border-emerald-300 shadow-2xs"
                            : m.status === "In Progress"
                            ? "bg-blue-50/70 border-blue-300 shadow-xs ring-1 ring-blue-300"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {/* Left: Step Number & Editable Title */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span
                              className={`h-8 w-8 rounded-xl font-mono text-xs font-bold grid place-items-center shrink-0 ${
                                m.status === "Completed"
                                  ? "bg-emerald-600 text-white"
                                  : m.status === "In Progress"
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              0{idx + 1}
                            </span>

                            <Input
                              className="h-8 text-xs bg-white font-extrabold text-slate-900 border-slate-200"
                              value={m.title}
                              onChange={(e) =>
                                handleUpdateMilestone(activeManageLead.id, m.id, {
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Right: Status Selector or Sequential Lock Badge */}
                          <div className="flex items-center gap-2 shrink-0">
                            {isLocked ? (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-3 py-1.5 rounded-xl">
                                <Lock className="h-3.5 w-3.5 text-amber-600" /> Complete Step {idx} First
                              </span>
                            ) : (
                              <Select
                                value={m.status}
                                onValueChange={(v) =>
                                  handleUpdateMilestone(activeManageLead.id, m.id, {
                                    status: v as TrackStatus,
                                  })
                                }
                              >
                                <SelectTrigger
                                  className={`h-8 text-xs font-bold w-36 shadow-2xs ${
                                    m.status === "Completed"
                                      ? "bg-emerald-600 text-white border-emerald-600"
                                      : m.status === "In Progress"
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "bg-white text-slate-800 border-slate-300"
                                  }`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white z-[9999] border border-slate-200 shadow-2xl">
                                  {TRACK_STATUSES.map((s) => (
                                    <SelectItem
                                      key={s}
                                      value={s}
                                      className="text-xs font-bold py-1.5 cursor-pointer"
                                    >
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>

                        {/* Reference / Tracking ID Input */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 shrink-0">
                            Tracking / Match Ref #:
                          </span>
                          <Input
                            className="h-7 text-xs bg-white font-mono text-slate-800 border-slate-200"
                            placeholder="e.g. GOV-88231, VFS-45120, PRD-APPROVED"
                            value={m.ref || ""}
                            onChange={(e) =>
                              handleUpdateMilestone(activeManageLead.id, m.id, {
                                ref: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Tracker Link Preview */}
              {/* Uploaded Intake Documents & Attachments Block */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="h-4 w-4 text-blue-600" />
                    Uploaded Intake Files &amp; Attachments
                  </p>
                  <Badge variant="outline" className="text-[10px] font-bold bg-blue-100 text-blue-800 border-blue-300">
                    {activeManageLead.documents && activeManageLead.documents.length > 0
                      ? `${activeManageLead.documents.length} File(s)`
                      : "No Files Uploaded"}
                  </Badge>
                </div>

                {activeManageLead.documents && activeManageLead.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {activeManageLead.documents.map((docUrl, idx) => {
                      const isUrl = typeof docUrl === "string" && (docUrl.startsWith("http://") || docUrl.startsWith("https://") || docUrl.startsWith("data:"));
                      const fileName = typeof docUrl === "string" ? docUrl.split("/").pop() || `Document_${idx + 1}` : `Uploaded_Doc_${idx + 1}`;

                      return (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                            <span className="font-bold text-slate-800 truncate text-[11px]">{fileName}</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => triggerFileDownload(docUrl, fileName)}
                            className="h-7 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 cursor-pointer"
                          >
                            <Download className="h-3 w-3 mr-1" /> Download
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">No document attachments uploaded during intake submission.</p>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900 text-xs">Live Client Track View</p>
                  <p className="text-[11px] text-slate-500">
                    Clients enter <strong>#{activeManageLead.reference}</strong> on `/track` to view these exact milestones.
                  </p>
                </div>
                <a
                  href={`/track`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View /track
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-100 pt-4">
              <Button
                type="button"
                onClick={() => setActiveManageLead(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 cursor-pointer"
              >
                Done Editing
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 grid place-items-center font-bold">
                  <UserPlus className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Lead</h3>
                  <p className="text-xs text-slate-500">Manually record a client enquiry or intake lead.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="lead-name" className="font-bold text-slate-700">Client Name *</Label>
                  <Input
                    id="lead-name"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lead-email" className="font-bold text-slate-700">Email Address *</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="lead-phone" className="font-bold text-slate-700">Phone Number</Label>
                  <Input
                    id="lead-phone"
                    placeholder="+1 (312) 555-0199"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Initial Pipeline Status</Label>
                  <Select
                    value={newLeadForm.status}
                    onValueChange={(v) => setNewLeadForm({ ...newLeadForm, status: v as LeadStatus })}
                  >
                    <SelectTrigger className="h-10 text-xs font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[9999]">
                      {ALL_STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="text-xs font-bold">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Service Category</Label>
                  <Select
                    value={newLeadForm.category}
                    onValueChange={(v) => setNewLeadForm({ ...newLeadForm, category: v })}
                  >
                    <SelectTrigger className="h-10 text-xs font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[9999]">
                      <SelectItem value="Passport & Visa Services">Passport &amp; Visa Services</SelectItem>
                      <SelectItem value="Web Development & Software">Web Development &amp; Software</SelectItem>
                      <SelectItem value="Digital Marketing & Growth">Digital Marketing &amp; Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="lead-service" className="font-bold text-slate-700">Specific Service Name</Label>
                  <Input
                    id="lead-service"
                    placeholder="e.g. 24H Emergency Rush Passport"
                    value={newLeadForm.service}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="lead-notes" className="font-bold text-slate-700">Initial Notes / Scope</Label>
                <Textarea
                  id="lead-notes"
                  rows={3}
                  placeholder="e.g. Travel date in 3 days, needs urgent hand-carry processing."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer">
                  Create Lead Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom In-App Milestone Creator Modal Dialog */}
      {customMilestoneModalLeadId && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-md rounded-3xl bg-white p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 grid place-items-center font-bold">
                  <Plus className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Add Custom Milestone</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCustomMilestoneModalLeadId(null);
                  setCustomMilestoneTitle("");
                }}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomMilestoneSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="custom-ms-title" className="font-bold text-slate-700">
                  Milestone Name / Stage Description *
                </Label>
                <Input
                  id="custom-ms-title"
                  required
                  autoFocus
                  placeholder="e.g. Domain DNS Transfer, Surrender Certificate Audit..."
                  value={customMilestoneTitle}
                  onChange={(e) => setCustomMilestoneTitle(e.target.value)}
                  className="h-10 text-xs font-semibold bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCustomMilestoneModalLeadId(null);
                    setCustomMilestoneTitle("");
                  }}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Add Milestone Step
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Lead Scoping Audit & Cost Estimator Modal Dialog */}
      {aiTargetLead && (() => {
        const ai = analyzeLeadWithAI(aiTargetLead);
        return (
          <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="surface-card w-full max-w-xl rounded-3xl bg-white p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl bg-purple-100 border border-purple-300 text-purple-700 grid place-items-center font-bold">
                    <Wand2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-display">
                      AI Lead Audit &amp; Scope Estimator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Automated intake scoping for #{aiTargetLead.reference} ({aiTargetLead.name})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAiTargetLead(null)}
                  className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Top Estimates Cards */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    Est. Quote Value
                  </span>
                  <p className="text-lg font-extrabold text-purple-900 font-mono">
                    ${ai.estimatedValueUsd} USD
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    Est. Turnaround
                  </span>
                  <p className="text-lg font-extrabold text-blue-900 font-mono">
                    ~{ai.estimatedDays} Days
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Priority Level
                  </span>
                  <p className="text-xs font-extrabold text-emerald-900 font-mono mt-1">
                    {ai.priorityLevel}
                  </p>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                  AI Executive Audit Summary:
                </span>
                <p className="text-slate-700 leading-relaxed">{ai.executiveSummary}</p>
              </div>

              {/* Document Compliance Checklist */}
              <div className="space-y-2">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                  Required Document Compliance Checklist:
                </span>
                <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-2xl border border-slate-200">
                  {ai.recommendedChecklist.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{c.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(ai.suggestedClientResponse);
                    toast.success("AI Client Response Copied to Clipboard!");
                  }}
                  className="font-bold text-xs gap-1.5 cursor-pointer text-slate-800"
                >
                  <Copy className="h-3.5 w-3.5 text-blue-600" /> Copy AI Response Template
                </Button>

                <Button
                  type="button"
                  onClick={() => setAiTargetLead(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Close Audit
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
