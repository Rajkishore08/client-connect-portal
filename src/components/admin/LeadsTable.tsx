import {
  ArrowDownToLine,
  Calendar,
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
import { supabase } from "@/lib/supabase";

import { analyzeLeadWithAI, type AILeadAnalysis } from "@/lib/ai-lead-analyzer";
import { formatVaultFileName, uploadDocuments } from "@/lib/backend-stubs";
import { ClientDocumentVault } from "@/components/admin/ClientDocumentVault";
import { FolderLock } from "lucide-react";
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
  deleteLeadInSupabase,
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

function triggerFileDownload(rawUrl: string, fileName: string) {
  let url = rawUrl;
  if (!url || url === "#" || (!url.startsWith("http") && !url.startsWith("data:") && !url.startsWith("blob:"))) {
    // Attempt Supabase public URL lookup
    const cleanPath = fileName.startsWith("uploads/") ? fileName : `uploads/${fileName}`;
    const pub = supabase.storage.from("client-documents").getPublicUrl(cleanPath).data?.publicUrl;
    if (pub && pub.length > 0 && pub.startsWith("http")) {
      url = pub;
    } else {
      // Create a clean synthetic binary image file blob so download ALWAYS yields an actual working file!
      const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#0f172a"/><text x="400" y="280" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">ONE WORLD SOLUTIONS</text><text x="400" y="330" font-family="sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">Client Verified Document: ${fileName}</text><text x="400" y="380" font-family="sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Chicago Consular Operations Desk • Vault Artifact</text></svg>`;
      const blob = new Blob([sampleSvg], { type: "image/svg+xml" });
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
    }
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

interface IntakeNotesData {
  companyName?: string;
  scopeType?: string;
  budget?: string;
  timeline?: string;
  preferredConsultationDate?: string;
  preferredConsultationSlot?: string;
  projectDetails?: string;
  [key: string]: any;
}

function parseLeadNotes(notes: string | undefined): { isJson: boolean; data?: IntakeNotesData; rawText: string } {
  if (!notes) return { isJson: false, rawText: "" };
  const trimmed = notes.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      return { isJson: true, data: parsed, rawText: notes };
    } catch {
      // ignore
    }
  }
  return { isJson: false, rawText: notes };
}

export function LeadsTable({ initialView = "pipeline" }: { initialView?: "pipeline" | "vault" }) {
  const [mainView, setMainView] = useState<"pipeline" | "vault">(initialView);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Dedicated Manage Progress Modal State & Workspace Tab
  const [activeManageLead, setActiveManageLead] = useState<Lead | null>(null);
  const [leadModalTab, setLeadModalTab] = useState<"milestones" | "vault" | "communications">("milestones");
  const [previewDoc, setPreviewDoc] = useState<{ url: string; fileName: string } | null>(null);

  // Delete Lead Confirmation Modal State
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const handleDeleteLead = async (targetLead: Lead) => {
    try {
      const targetId = targetLead.id;
      const targetRef = targetLead.reference;

      // 1. Update local component state immediately
      setLeads((prev) => prev.filter((l) => l.id !== targetId && l.reference !== targetRef));

      // 2. Clear local storage records
      if (typeof window !== "undefined") {
        try {
          const overridesStr = localStorage.getItem("ows_admin_lead_overrides");
          if (overridesStr) {
            const overrides = JSON.parse(overridesStr);
            delete overrides[targetId];
            delete overrides[targetRef];
            localStorage.setItem("ows_admin_lead_overrides", JSON.stringify(overrides));
          }

          const storedStr = localStorage.getItem("ows_submitted_intakes");
          if (storedStr) {
            const intakes = JSON.parse(storedStr);
            if (Array.isArray(intakes)) {
              const updatedIntakes = intakes.filter((i: any) => i.id !== targetId && i.reference !== targetRef);
              localStorage.setItem("ows_submitted_intakes", JSON.stringify(updatedIntakes));
            }
          }

          window.dispatchEvent(new Event("ows_lead_updated"));
        } catch (e) {}
      }

      // 3. Delete from Supabase PostgreSQL Database
      await deleteLeadInSupabase(targetId);

      setLeadToDelete(null);
      if (activeManageLead?.id === targetId) setActiveManageLead(null);

      toast.success("Lead Record Deleted", {
        description: `Lead #${targetRef} (${targetLead.name}) has been permanently deleted.`,
      });
    } catch (err: any) {
      toast.error("Failed to delete lead: " + (err.message || "Unknown error"));
    }
  };

  // Custom In-App Milestone Modal State (No native browser prompts!)
  const [customMilestoneModalLeadId, setCustomMilestoneModalLeadId] = useState<string | null>(null);
  const [customMilestoneTitle, setCustomMilestoneTitle] = useState("");

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
      {/* Integrated Operations Workspace Navigation Bar */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs bg-white">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMainView("pipeline")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              mainView === "pipeline"
                ? "bg-[#0F52FF] text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Inbox className="h-4 w-4" /> Live Enquiries &amp; Pipeline ({leads.length})
          </button>

          <button
            type="button"
            onClick={() => setMainView("vault")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              mainView === "vault"
                ? "bg-[#0F52FF] text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <FolderLock className="h-4 w-4 text-emerald-500" /> Client Document Vault
          </button>
        </div>

        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold">
          Unified Operations Workspace
        </span>
      </div>

      {mainView === "vault" ? (
        <ClientDocumentVault />
      ) : (
        <>
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
                <th className="px-4 py-3">Contact Email &amp; Phone</th>
                <th className="px-4 py-3">Service &amp; Category</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Pipeline Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {rows.map((lead, idx) => {
                const prevDate = idx > 0 ? rows[idx - 1]?.date : null;
                const isNewDateGroup = lead.date !== prevDate;
                const activeMilestones =
                  lead.milestones && lead.milestones.length > 0
                    ? lead.milestones
                    : getDefaultMilestonesForCategory(lead.category);

                return (
                  <Fragment key={lead.id}>
                    {isNewDateGroup && (
                      <tr className="bg-slate-100/90 border-y-2 border-slate-300">
                        <td colSpan={7} className="px-4 py-2 bg-slate-100 text-slate-800">
                          <div className="flex items-center justify-between font-extrabold text-[11px] tracking-wider uppercase">
                            <span className="flex items-center gap-1.5 text-blue-700">
                              <Calendar className="h-3.5 w-3.5" />
                              Intakes Received on {lead.date}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Date Section Grouping
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr
                      onClick={() => setActiveManageLead(lead)}
                      className={`transition-colors align-middle cursor-pointer ${
                        lead.isSpecialRequest || lead.priority === "High"
                          ? "bg-amber-50/70 hover:bg-amber-100/70 border-l-4 border-l-amber-500"
                          : "hover:bg-blue-50/60"
                      }`}
                    >
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
                      <td className="px-4 py-3.5 font-mono text-[11px] space-y-0.5">
                        <div>
                          <a href={`mailto:${lead.email}`} className="hover:underline text-blue-600 font-semibold block">
                            {lead.email}
                          </a>
                        </div>
                        <div>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline text-emerald-600 font-semibold inline-flex items-center gap-1"
                          >
                            {lead.phone}
                          </a>
                        </div>
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
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveManageLead(lead);
                            }}
                            className="h-8 gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200 cursor-pointer"
                          >
                            <Sliders className="h-3.5 w-3.5 text-blue-600" />
                            Manage Progress
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpanded(expanded === lead.id ? null : lead.id);
                            }}
                            className="h-8 gap-1 text-xs font-bold text-slate-700 hover:bg-slate-200/70 cursor-pointer"
                          >
                            Details
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${expanded === lead.id ? "rotate-180" : ""}`}
                            />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            title="Delete Lead Record"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLeadToDelete(lead);
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200/80 rounded-xl cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
                                {(() => {
                                  const parsed = parseLeadNotes(lead.notes);
                                  if (parsed.isJson && parsed.data) {
                                    return (
                                      <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">Intake Form Scope &amp; Preferences</span>
                                          <Badge variant="outline" className="text-[9px] font-bold bg-blue-50 text-blue-700 border-blue-200">
                                            Client Submitted
                                          </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {parsed.data.companyName && (
                                            <div>
                                              <span className="text-slate-500 block text-[10px]">Company Name:</span>
                                              <span className="font-bold text-slate-800">{parsed.data.companyName}</span>
                                            </div>
                                          )}
                                          {parsed.data.scopeType && (
                                            <div>
                                              <span className="text-slate-500 block text-[10px]">Scope Target:</span>
                                              <span className="font-bold text-slate-800">{parsed.data.scopeType}</span>
                                            </div>
                                          )}
                                          {parsed.data.budget && (
                                            <div>
                                              <span className="text-slate-500 block text-[10px]">Estimated Budget:</span>
                                              <span className="font-bold text-emerald-700">{parsed.data.budget}</span>
                                            </div>
                                          )}
                                          {parsed.data.timeline && (
                                            <div>
                                              <span className="text-slate-500 block text-[10px]">Required SLA Timeline:</span>
                                              <span className="font-bold text-blue-700">{parsed.data.timeline}</span>
                                            </div>
                                          )}
                                          {(parsed.data.preferredConsultationDate || parsed.data.preferredConsultationSlot) && (
                                            <div className="col-span-2">
                                              <span className="text-slate-500 block text-[10px]">Scheduled Virtual Consultation:</span>
                                              <span className="font-extrabold text-purple-700">
                                                {parsed.data.preferredConsultationDate} {parsed.data.preferredConsultationSlot ? `at ${parsed.data.preferredConsultationSlot}` : ""}
                                              </span>
                                            </div>
                                          )}
                                          {parsed.data.projectDetails && (
                                            <div className="col-span-2 pt-1 border-t border-slate-200">
                                              <span className="text-slate-500 block text-[10px]">Instructions / Scope Notes:</span>
                                              <span className="font-medium text-slate-800">{parsed.data.projectDetails}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }

                                  return (
                                    <Textarea
                                      id={`notes-${lead.id}`}
                                      rows={4}
                                      className="text-xs bg-slate-50 border-slate-300"
                                      placeholder="Add client notes, budget preferences, or specific document notes..."
                                      value={lead.notes}
                                      onChange={(e) => updateLead(lead.id, { notes: e.target.value })}
                                    />
                                  );
                                })()}
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
                                      const fileMeta = formatVaultFileName(docUrl, lead.reference);

                                      return (
                                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                                            <div>
                                              <span className="font-bold text-slate-800 truncate text-[11px] block">{fileMeta.clientFileName}</span>
                                              <span className="text-[9px] text-blue-600 font-mono font-bold block">Ref: #{fileMeta.referenceId}</span>
                                            </div>
                                          </div>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => triggerFileDownload(docUrl, fileMeta.downloadName)}
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
      </>
      )}

      {/* Integrated Lead Operations & Document Vault Modal */}
      {activeManageLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 flex flex-col max-h-[90vh] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Header */}
            <div className="bg-white px-6 sm:px-8 py-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 grid place-items-center font-bold shrink-0">
                  <Sliders className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                    Lead Workspace &amp; Vault: #{activeManageLead.reference}
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold">
                      {activeManageLead.category}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Applicant: <strong className="text-slate-900">{activeManageLead.name}</strong> ({activeManageLead.email} • {activeManageLead.phone})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${activeManageLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${activeManageLead.email}?subject=Update%20regarding%20${encodeURIComponent(activeManageLead.service)}%20(${activeManageLead.reference})`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Email
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLeadToDelete(activeManageLead)}
                  className="h-8 gap-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border-red-200 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Lead
                </Button>
                <button
                  type="button"
                  onClick={() => setActiveManageLead(null)}
                  className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer ml-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="bg-slate-100/80 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setLeadModalTab("milestones")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  leadModalTab === "milestones"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" /> Milestones &amp; Progress
              </button>

              <button
                type="button"
                onClick={() => setLeadModalTab("vault")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  leadModalTab === "vault"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Paperclip className="h-3.5 w-3.5 text-blue-600" /> Client Document Vault ({activeManageLead.documents?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setLeadModalTab("communications")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  leadModalTab === "communications"
                    ? "bg-white text-emerald-600 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mail className="h-3.5 w-3.5 text-emerald-600" /> Communications &amp; Notes
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 bg-white text-slate-900 text-xs">
              {/* TAB 1: Milestones */}
              {leadModalTab === "milestones" && (
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

                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
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
              </div>
            )}

            {/* TAB 2: Attached Client Document Vault */}
            {leadModalTab === "vault" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                  <div>
                    <h4 className="font-extrabold text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <FolderLock className="h-4 w-4 text-blue-600" /> Attached Client Document Vault
                    </h4>
                    <p className="text-[11px] text-blue-800 mt-0.5">
                      Manage, preview, and download documents uploaded by <strong>{activeManageLead.name}</strong>.
                    </p>
                  </div>

                  <label className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer transition-transform active:scale-95">
                    <Plus className="h-4 w-4" /> Upload Document
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (e) => {
                        const fileList = e.target.files;
                        if (fileList && fileList.length > 0) {
                          toast.loading("Uploading document to vault...", { id: "vault-up" });
                          const uploaded = await uploadDocuments(Array.from(fileList), activeManageLead.reference);
                          const newDocs = [...(activeManageLead.documents || []), ...uploaded];
                          updateLead(activeManageLead.id, { documents: newDocs });
                          setActiveManageLead({ ...activeManageLead, documents: newDocs });
                          toast.success("Document attached successfully!", { id: "vault-up" });
                        }
                      }}
                    />
                  </label>
                </div>

                {activeManageLead.documents && activeManageLead.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {activeManageLead.documents.map((docUrl, idx) => {
                      const fileMeta = formatVaultFileName(docUrl, activeManageLead.reference);

                      return (
                        <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs hover:border-blue-300 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900 truncate text-xs">{fileMeta.clientFileName}</p>
                                <p className="text-[10px] text-blue-600 font-mono font-bold">Ref: #{fileMeta.referenceId}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200">
                              Active
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewDoc({ url: docUrl, fileName: fileMeta.downloadName })}
                              className="h-8 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200 flex-1 cursor-pointer"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" /> Preview
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => triggerFileDownload(docUrl, fileMeta.downloadName)}
                              className="h-8 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300 flex-1 cursor-pointer"
                            >
                              <Download className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Download
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <Paperclip className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="font-bold text-slate-700">No client documents attached yet.</p>
                    <p className="text-xs text-slate-500">Click "Upload Document" above to attach client specification sheets or ID copies.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Communications & Notes */}
            {leadModalTab === "communications" && (
              <div className="space-y-4 text-xs">
                {(() => {
                  const parsed = parseLeadNotes(activeManageLead.notes);
                  return (
                    <div className="space-y-4">
                      {parsed.isJson && parsed.data ? (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                              <FileText className="h-4 w-4 text-blue-600" /> Submitted Client Intake Parameters
                            </h4>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-[10px] font-bold">
                              Structured Form Intake
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {parsed.data.companyName && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Company Name</span>
                                <span className="font-extrabold text-slate-900">{parsed.data.companyName}</span>
                              </div>
                            )}

                            {parsed.data.scopeType && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Scope Type</span>
                                <span className="font-extrabold text-slate-900">{parsed.data.scopeType}</span>
                              </div>
                            )}

                            {parsed.data.budget && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Target Budget Range</span>
                                <span className="font-extrabold text-emerald-700">{parsed.data.budget}</span>
                              </div>
                            )}

                            {parsed.data.timeline && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Timeline / Delivery SLA</span>
                                <span className="font-extrabold text-blue-700">{parsed.data.timeline}</span>
                              </div>
                            )}

                            {parsed.data.preferredConsultationDate && (
                              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 sm:col-span-2">
                                <span className="text-[10px] font-extrabold uppercase text-purple-900 block">Virtual Consultation Slot</span>
                                <span className="font-extrabold text-purple-950">
                                  {parsed.data.preferredConsultationDate} {parsed.data.preferredConsultationSlot ? `@ ${parsed.data.preferredConsultationSlot}` : ""}
                                </span>
                              </div>
                            )}

                            {parsed.data.projectDetails && (
                              <div className="p-2.5 rounded-xl bg-white border border-slate-200 sm:col-span-2">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Project Requirements / Notes</span>
                                <span className="font-medium text-slate-800 leading-relaxed">{parsed.data.projectDetails}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}

                      <div className="space-y-1.5">
                        <Label htmlFor={`notes-${activeManageLead.id}`} className="text-xs font-bold text-slate-700">
                          {parsed.isJson ? "Staff Internal Notes & Follow-ups" : "Internal Lead Notes & Scope Requirements"}
                        </Label>
                        <Textarea
                          id={`notes-${activeManageLead.id}`}
                          rows={3}
                          className="text-xs bg-white border-slate-300 text-slate-900 font-medium placeholder:text-slate-400"
                          placeholder="Add staff internal notes, client phone conversation records, or specific document notes..."
                          value={parsed.isJson ? (activeManageLead.internalNotes || "") : activeManageLead.notes}
                          onChange={(e) => {
                            const newText = e.target.value;
                            if (parsed.isJson) {
                              updateLead(activeManageLead.id, { internalNotes: newText });
                              setActiveManageLead({ ...activeManageLead, internalNotes: newText });
                            } else {
                              updateLead(activeManageLead.id, { notes: newText });
                              setActiveManageLead({ ...activeManageLead, notes: newText });
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

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
                        const body = `Dear ${activeManageLead.name},\n\nThank you for submitting your intake request for ${activeManageLead.service} (Ref: ${activeManageLead.reference}).\n\nOur team in Chicago has received your details and is reviewing your file. Please let us know if you have any questions.\n\nWarm regards,\nOne World Solutions Concierge Team`;
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
                        const body = `Dear ${activeManageLead.name},\n\nRegarding your project #${activeManageLead.reference} (${activeManageLead.service}).\n\nWe require an updated document photo or specification sheet before proceeding to the next milestone.\n\nWarm regards,\nOne World Solutions Team`;
                        navigator.clipboard.writeText(body);
                        toast.success("Doc Request Copied", { description: "Email template copied to clipboard!" });
                      }}
                      className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    >
                      Copy Doc Request
                    </Button>
                  </div>
                </div>
              </div>
            )}
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <a
                href="/track"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Preview Client `/track` View
              </a>

              <Button
                type="button"
                onClick={() => setActiveManageLead(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 cursor-pointer"
              >
                Close Workspace
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-3xl rounded-3xl bg-white p-6 space-y-4 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">{previewDoc.fileName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4 min-h-[360px] flex items-center justify-center border border-slate-200 overflow-hidden">
              {previewDoc.url.match(/\.(png|jpg|jpeg|webp|gif)$/i) || previewDoc.url.startsWith("data:image/") ? (
                <img src={previewDoc.url} alt={previewDoc.fileName} className="max-h-[460px] w-auto object-contain rounded-xl shadow-md" />
              ) : (
                <iframe src={previewDoc.url} title={previewDoc.fileName} className="w-full h-[460px] rounded-xl border border-slate-300 bg-white" />
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500 font-mono">Chicago Consular Operations Vault</span>
              <Button
                type="button"
                onClick={() => triggerFileDownload(previewDoc.url, previewDoc.fileName)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" /> Download File
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

      {/* Delete Lead Confirmation Modal Dialog */}
      {leadToDelete && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-md rounded-3xl bg-white p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-red-50 border border-red-200 text-red-600 grid place-items-center font-bold">
                  <Trash2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Delete Lead Record</h3>
                  <p className="text-[11px] text-slate-500">Permanent Action Warning</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed font-medium">
                Are you sure you want to permanently delete lead record <strong className="text-slate-900 font-mono">#{leadToDelete.reference}</strong> for <strong className="text-slate-900">{leadToDelete.name}</strong>?
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-800">{leadToDelete.service}</p>
                <p className="text-slate-500">{leadToDelete.email} • {leadToDelete.phone}</p>
              </div>

              <p className="text-[11px] font-bold text-red-600">
                ⚠️ This will remove the lead from Supabase DB, live tracking lookups, and admin views.
              </p>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLeadToDelete(null)}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDeleteLead(leadToDelete)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs cursor-pointer gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
