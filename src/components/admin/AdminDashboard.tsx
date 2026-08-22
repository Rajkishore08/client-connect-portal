import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  History,
  Inbox,
  KeyRound,
  Layers,
  Mail,
  MessageSquare,
  Package,
  Phone,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Lead, type LeadStatus } from "@/data/mock-data";
import { fetchLeadsFromSupabase, updateLeadInSupabase } from "@/lib/supabase-db";
import { type AdminTab } from "@/components/admin/SaaSAdminLayout";

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

interface AdminDashboardProps {
  onNavigateTab?: (tab: AdminTab) => void;
}

export function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadRealLeads = async () => {
    setLoading(true);
    try {
      const data = await fetchLeadsFromSupabase();
      setLeads(data);
    } catch (err) {
      console.warn("[Executive Analytics] Load leads notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealLeads();

    const handleUpdate = () => {
      loadRealLeads();
    };
    window.addEventListener("ows_lead_updated", handleUpdate);
    return () => window.removeEventListener("ows_lead_updated", handleUpdate);
  }, []);

  const handleQuickStatusChange = async (leadId: string, leadRef: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    try {
      await updateLeadInSupabase(leadId, { status: newStatus });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId || l.reference === leadRef ? { ...l, status: newStatus } : l))
      );
      toast.success(`Lead #${leadRef} status updated to "${newStatus}"`);
    } catch (e) {
      toast.error("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    toast.success(`Copied Reference #${ref} to clipboard`);
  };

  const handleExportLeadsCSV = () => {
    if (leads.length === 0) {
      toast.error("No lead records available to export.");
      return;
    }
    const csvHeader = "Reference,Date,Name,Email,Phone,Category,Service,Status,Notes\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.reference}","${l.date}","${l.name.replace(/"/g, '""')}","${l.email}","${l.phone}","${l.category}","${l.service}","${l.status}","${(l.notes || "").replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `OWS_Real_Leads_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Executive Leads Telemetry CSV Exported Successfully");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all"
        ? true
        : l.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Real Data Telemetry Metrics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const inContactCount = leads.filter((l) => l.status === "In Contact").length;
  const inProgressCount = leads.filter((l) => l.status === "In Progress").length;
  const completedCount = leads.filter((l) => l.status === "Completed" || l.status === "Archived").length;

  const passportCount = leads.filter((l) => l.category.toLowerCase().includes("passport") || l.category.toLowerCase().includes("visa")).length;
  const webTechCount = leads.filter((l) => l.category.toLowerCase().includes("soft") || l.category.toLowerCase().includes("web") || l.category.toLowerCase().includes("ui")).length;
  const marketingCount = leads.filter((l) => l.category.toLowerCase().includes("market") || l.category.toLowerCase().includes("seo") || l.category.toLowerCase().includes("ads")).length;

  const formSourceCount = leads.filter((l) => (l.source || "").toLowerCase().includes("form")).length;
  const chatSourceCount = leads.filter((l) => (l.source || "").toLowerCase().includes("chat") || (l.source || "").toLowerCase().includes("whatsapp")).length;
  const calSourceCount = leads.filter((l) => (l.source || "").toLowerCase().includes("cal") || (l.source || "").toLowerCase().includes("book")).length;

  const getPct = (val: number) => (totalLeadsCount > 0 ? Math.round((val / totalLeadsCount) * 100) : 0);

  return (
    <div className="space-y-6">
      {/* Top Banner with Real Telemetry Controls */}
      <div className="surface-card p-6 rounded-3xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-4 bg-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600/10 text-blue-600 font-bold">
              <Activity className="h-4 w-4" />
            </span>
            <h1 className="text-xl font-extrabold font-display text-slate-900">Executive Operations Intelligence</h1>
            <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-[10px] font-bold">
              ● Real Live Data
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Real-time telemetry on incoming client intakes, category distribution, and immediate management controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={loadRealLeads} variant="outline" size="sm" className="h-9 text-xs font-bold gap-1.5 cursor-pointer">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-blue-600" : ""}`} /> Refresh Live Data
          </Button>

          <Button onClick={handleExportLeadsCSV} variant="default" size="sm" className="h-9 text-xs font-bold gap-1.5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-3.5 w-3.5" /> Export Intake Data (CSV)
          </Button>
        </div>
      </div>

      {/* Quick Access Operations Navigation Shortcuts */}
      {onNavigateTab && (
        <div className="surface-card p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" /> Operations Suite Quick Navigation
              </h3>
              <p className="text-xs text-slate-500">Direct 1-click access to all primary management modules</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono font-bold bg-slate-50 text-slate-700">
              7 Active Modules
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Pipeline & Document Vault */}
            <button
              type="button"
              onClick={() => onNavigateTab("leads")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-blue-50/50 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-blue-600/10 text-blue-600 grid place-items-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Inbox className="h-4 w-4" />
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-[10px] font-bold">Unified Vault</Badge>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                  Pipeline &amp; Document Vault
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage intakes, milestones &amp; documents</p>
              </div>
            </button>

            {/* 2. Services & SLA Catalog */}
            <button
              type="button"
              onClick={() => onNavigateTab("services")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-indigo-50/50 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-indigo-600/10 text-indigo-600 grid place-items-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Package className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">Catalog</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">
                  Services &amp; SLA Catalog
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Configure service packages &amp; pricing</p>
              </div>
            </button>

            {/* 3. Resend Email & SMS Engine */}
            <button
              type="button"
              onClick={() => onNavigateTab("emails")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-emerald-50/50 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-emerald-600/10 text-emerald-600 grid place-items-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-emerald-600 font-mono font-bold">Resend API</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-emerald-600 transition-colors">
                  Resend Email &amp; SMS Engine
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Automated notifications &amp; email triggers</p>
              </div>
            </button>

            {/* 4. Blog & Article CMS */}
            <button
              type="button"
              onClick={() => onNavigateTab("blogs")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-purple-50/50 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-purple-600/10 text-purple-600 grid place-items-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">CMS</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-purple-600 transition-colors">
                  Blog &amp; Article CMS
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Publish articles &amp; company news</p>
              </div>
            </button>

            {/* 5. Registered Client Accounts */}
            <button
              type="button"
              onClick={() => onNavigateTab("users")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-amber-50/50 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-amber-600/10 text-amber-600 grid place-items-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">Clients</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-amber-600 transition-colors">
                  Registered Client Accounts
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">View user credentials &amp; profiles</p>
              </div>
            </button>

            {/* 6. Staff Access & Credentials */}
            <button
              type="button"
              onClick={() => onNavigateTab("staff")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-slate-700 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-slate-100 group cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-slate-900/10 text-slate-900 grid place-items-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <KeyRound className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">Staff</span>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-slate-900 transition-colors">
                  Staff Access &amp; Credentials
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage staff permissions &amp; access keys</p>
              </div>
            </button>

            {/* 7. Security & Audit Logs */}
            <button
              type="button"
              onClick={() => onNavigateTab("audit")}
              className="p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:shadow-md transition-all text-left bg-slate-50/70 hover:bg-rose-50/50 group cursor-pointer space-y-2 lg:col-span-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-rose-600/10 text-rose-600 grid place-items-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <History className="h-4 w-4" />
                </div>
                <Badge className="bg-rose-100 text-rose-800 text-[10px] font-bold">Telemetry Audit</Badge>
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-xs group-hover:text-rose-600 transition-colors">
                  Security &amp; Audit Logs
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Review access logs &amp; system audit trail</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Real Real-Time KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Active Intakes */}
        <div className="surface-card p-5 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Received Intakes</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold">
              <Inbox className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-slate-900">{totalLeadsCount}</div>
            <div className="text-xs font-semibold text-blue-600 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Active Client Pipeline Records
            </div>
          </div>
        </div>

        {/* New Unhandled Intakes */}
        <div className="surface-card p-5 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Unhandled Intakes</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-50 text-amber-600 font-bold">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-amber-600">{newLeadsCount}</div>
            <div className="text-xs font-semibold text-amber-600 flex items-center gap-1">
              {newLeadsCount > 0 ? "⚠️ Requires Staff Review" : "✓ All Intakes Triaged"}
            </div>
          </div>
        </div>

        {/* In Progress Pipeline */}
        <div className="surface-card p-5 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">In Progress Pipeline</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-indigo-600">{inProgressCount}</div>
            <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> Active Service Execution
            </div>
          </div>
        </div>

        {/* Completed Deliveries */}
        <div className="surface-card p-5 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Completed / Handed Over</span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-emerald-600">{completedCount}</div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Successfully Closed Cases
            </div>
          </div>
        </div>
      </div>

      {/* REAL DATA VISUAL CHARTS SECTION */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* CHART 1: Pipeline Stage Funnel & Velocity Breakdown */}
        <div className="surface-card p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" /> Pipeline Stage Breakdown (Real Data)
              </h3>
              <p className="text-xs text-slate-500">Live proportion of leads by current status stage</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono font-bold bg-blue-50 text-blue-700">
              {totalLeadsCount} Total Leads
            </Badge>
          </div>

          {/* Multi-Segment Stacked Visual Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <span>Overall Pipeline Composition</span>
              <span className="font-mono text-blue-600">100% Live Sync</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${getPct(newLeadsCount)}%` }} className="bg-amber-500 transition-all duration-500" title={`New: ${newLeadsCount}`} />
              <div style={{ width: `${getPct(inContactCount)}%` }} className="bg-sky-500 transition-all duration-500" title={`In Contact: ${inContactCount}`} />
              <div style={{ width: `${getPct(inProgressCount)}%` }} className="bg-indigo-600 transition-all duration-500" title={`In Progress: ${inProgressCount}`} />
              <div style={{ width: `${getPct(completedCount)}%` }} className="bg-emerald-500 transition-all duration-500" title={`Completed: ${completedCount}`} />
            </div>
          </div>

          {/* Detailed Stage Bars */}
          <div className="space-y-3.5 pt-2">
            {/* New Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> New Unhandled Intakes
                </span>
                <span className="font-mono font-extrabold text-amber-600">
                  {newLeadsCount} ({getPct(newLeadsCount)}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${getPct(newLeadsCount)}%` }} className="h-full bg-amber-500 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* In Contact Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> In Contact / Consultation
                </span>
                <span className="font-mono font-extrabold text-sky-600">
                  {inContactCount} ({getPct(inContactCount)}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${getPct(inContactCount)}%` }} className="h-full bg-sky-500 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* In Progress Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Active Service Execution
                </span>
                <span className="font-mono font-extrabold text-indigo-600">
                  {inProgressCount} ({getPct(inProgressCount)}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${getPct(inProgressCount)}%` }} className="h-full bg-indigo-600 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* Completed Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Completed &amp; Handed Over
                </span>
                <span className="font-mono font-extrabold text-emerald-600">
                  {completedCount} ({getPct(completedCount)}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${getPct(completedCount)}%` }} className="h-full bg-emerald-500 rounded-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: Lead Acquisition Channels & Source Distribution */}
        <div className="surface-card p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-purple-600" /> Lead Acquisition Sources (Real Data)
              </h3>
              <p className="text-xs text-slate-500">Breakdown of intake channels &amp; booking entrypoints</p>
            </div>
            <Badge variant="outline" className="text-xs font-mono font-bold bg-purple-50 text-purple-700">
              Channel Telemetry
            </Badge>
          </div>

          <div className="space-y-4 pt-1">
            {/* Form Source */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" /> Online Form Submissions
                </span>
                <span className="font-mono font-black text-blue-600">
                  {formSourceCount} Intakes ({getPct(formSourceCount)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: `${getPct(formSourceCount)}%` }} className="h-full bg-blue-600 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* WhatsApp / Chat Source */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-600" /> WhatsApp &amp; Direct Live Chat
                </span>
                <span className="font-mono font-black text-emerald-600">
                  {chatSourceCount} Intakes ({getPct(chatSourceCount)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: `${getPct(chatSourceCount)}%` }} className="h-full bg-emerald-600 rounded-full transition-all duration-500" />
              </div>
            </div>

            {/* Calendar Source */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" /> Calendar Appointments &amp; Consultations
                </span>
                <span className="font-mono font-black text-purple-600">
                  {calSourceCount} Intakes ({getPct(calSourceCount)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: `${getPct(calSourceCount)}%` }} className="h-full bg-purple-600 rounded-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Division Category Distribution Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passport &amp; Consular</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{passportCount} Intakes</p>
          </div>
          <Badge variant="outline" className="text-xs font-bold bg-blue-50 text-blue-700 border-blue-200">
            {getPct(passportCount)}% Share
          </Badge>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Software &amp; UI/UX</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{webTechCount} Intakes</p>
          </div>
          <Badge variant="outline" className="text-xs font-bold bg-indigo-50 text-indigo-700 border-indigo-200">
            {getPct(webTechCount)}% Share
          </Badge>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Digital Marketing &amp; SEO</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{marketingCount} Intakes</p>
          </div>
          <Badge variant="outline" className="text-xs font-bold bg-emerald-50 text-emerald-700 border-emerald-200">
            {getPct(marketingCount)}% Share
          </Badge>
        </div>
      </div>

      {/* Main Interactive Table: Recently Received Intakes */}
      <div className="surface-card rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Recently Received Client Intakes</h3>
            <p className="text-xs text-slate-500">Live operational feed with 1-click status controls and client direct actions</p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Filter by name, email or ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-slate-50 border-slate-200"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-xs w-44 bg-slate-50 border-slate-200 font-bold">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="passport">Passport &amp; Consular</SelectItem>
                <SelectItem value="soft">Software &amp; Web</SelectItem>
                <SelectItem value="market">Digital Marketing &amp; SEO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
            <p className="text-xs font-bold text-slate-600">Loading Real Lead Records...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Inbox className="h-10 w-10 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No Matching Intakes Found</h4>
            <p className="text-xs text-slate-500">Try clearing search filters to see all received lead records.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="px-4 py-3">Ref ID &amp; Date</th>
                  <th className="px-4 py-3">Client Details</th>
                  <th className="px-4 py-3">Service Intake &amp; Details</th>
                  <th className="px-4 py-3">Live Pipeline Status</th>
                  <th className="px-4 py-3 text-right">Quick Operations Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeads.map((lead, idx) => {
                  const prevDate = idx > 0 ? filteredLeads[idx - 1]?.date : null;
                  const isNewDateGroup = lead.date !== prevDate;
                  const parsed = parseLeadNotes(lead.notes);
                  const isUpdating = updatingId === lead.id;

                  return (
                    <Fragment key={lead.id}>
                      {isNewDateGroup && (
                        <tr className="bg-slate-100/90 border-y-2 border-slate-300">
                          <td colSpan={5} className="px-4 py-2 bg-slate-100 text-slate-800">
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
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        {/* Ref ID & Date */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-blue-600 text-xs">#{lead.reference}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyRef(lead.reference)}
                              className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                              title="Copy Reference"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{lead.date}</p>
                          <Badge variant="outline" className="text-[10px] font-bold text-slate-600 mt-1">
                            {lead.source}
                          </Badge>
                        </td>

                        {/* Client Details */}
                        <td className="px-4 py-3.5 align-top">
                          <p className="font-bold text-slate-900">{lead.name}</p>
                          <p className="text-[11px] text-slate-600 font-mono">{lead.email}</p>
                          <p className="text-[11px] text-slate-500">{lead.phone}</p>
                        </td>

                        {/* Service Intake & Formatted Details */}
                        <td className="px-4 py-3.5 align-top space-y-1 max-w-xs">
                          <Badge className="bg-slate-100 text-slate-800 border-slate-200 text-[10px] font-bold">
                            {lead.category}
                          </Badge>
                          <p className="font-extrabold text-slate-900 leading-snug">{lead.service}</p>

                          {parsed.isJson && parsed.data ? (
                            <div className="text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-200 text-slate-700 space-y-0.5 mt-1">
                              {parsed.data.companyName && (
                                <p className="truncate"><strong>Company:</strong> {parsed.data.companyName}</p>
                              )}
                              {parsed.data.scopeType && (
                                <p className="truncate"><strong>Scope:</strong> {parsed.data.scopeType}</p>
                              )}
                              {parsed.data.budget && (
                                <p className="text-emerald-700 font-bold truncate"><strong>Budget:</strong> {parsed.data.budget}</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{lead.notes}</p>
                          )}
                        </td>

                        {/* Live Pipeline Status Dropdown Control */}
                        <td className="px-4 py-3.5 align-top">
                          <Select
                            disabled={isUpdating}
                            value={lead.status}
                            onValueChange={(val) => handleQuickStatusChange(lead.id, lead.reference, val as LeadStatus)}
                          >
                            <SelectTrigger
                              className={`h-8 text-xs font-bold w-36 ${
                                lead.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : lead.status === "In Progress" || lead.status === "In Contact"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-amber-50 text-amber-800 border-amber-300"
                              }`}
                            >
                              <SelectValue>{lead.status}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New Intake</SelectItem>
                              <SelectItem value="In Contact">In Contact</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>

                        {/* Quick Operations Actions */}
                        <td className="px-4 py-3.5 align-top text-right">
                          <div className="inline-flex items-center justify-end gap-1.5 shrink-0">
                            {lead.phone && (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hello ${lead.name}, regarding your One World Solutions intake #${lead.reference}...`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors font-bold text-xs inline-flex items-center gap-1"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="h-3.5 w-3.5" /> WA
                              </a>
                            )}

                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent(
                                `One World Solutions Update — Ref #${lead.reference}`
                              )}`}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors font-bold text-xs inline-flex items-center gap-1"
                              title="Email Client"
                            >
                              <Mail className="h-3.5 w-3.5" /> Email
                            </a>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
