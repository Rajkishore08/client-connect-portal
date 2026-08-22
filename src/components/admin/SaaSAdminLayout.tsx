import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  CreditCard,
  Download,
  FileCheck2,
  FileText,
  FolderLock,
  Globe,
  HelpCircle,
  History,
  Inbox,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type AdminTab =
  | "dashboard"
  | "leads"
  | "vault"
  | "services"
  | "emails"
  | "users"
  | "staff"
  | "audit"
  | "blogs";

interface SaaSAdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onLogout: () => void;
  userRole?: string;
  userName?: string;
  children: React.ReactNode;
}

export function SaaSAdminLayout({
  activeTab,
  setActiveTab,
  onLogout,
  userRole = "Super Admin",
  userName = "Operations Director",
  children,
}: SaaSAdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);

  // New Quick Intake Form State inside Admin SaaS Layout
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newCategory, setNewCategory] = useState("SOFTWARE & UI/UX DIVISION");
  const [newServiceTitle, setNewServiceTitle] = useState("Custom Web Application (Full-Stack)");
  const [newNotes, setNewNotes] = useState("");

  const handleQuickCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail) {
      toast.error("Please specify client name and email.");
      return;
    }

    const newRef = `OWS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord = {
      id: `lead-${Date.now()}`,
      reference: newRef,
      date: new Date().toISOString().split("T")[0],
      name: newClientName,
      email: newClientEmail,
      phone: newClientPhone || "+1 (312) 555-0100",
      category: newCategory,
      service: newServiceTitle,
      source: "Manual Admin Entry",
      status: "New",
      progressPercent: 25,
      notes: newNotes || "Manual lead entered via Ops Admin SaaS Portal.",
      documents: [],
    };

    try {
      const storedStr = localStorage.getItem("ows_submitted_intakes");
      const list = storedStr ? JSON.parse(storedStr) : [];
      list.unshift(newRecord);
      localStorage.setItem("ows_submitted_intakes", JSON.stringify(list));
      localStorage.setItem("ows_last_submitted_intake", JSON.stringify(newRecord));
    } catch (err) {
      console.warn("[Admin SaaS] Error saving lead:", err);
    }

    toast.success("New Client Record Provisioned!", {
      description: `Created lead #${newRef} for ${newClientName}.`,
    });

    setShowNewModal(false);
    setNewClientName("");
    setNewClientEmail("");
    setNewClientPhone("");
    setNewNotes("");
    setActiveTab("leads");
  };

interface NavItem {
  id: AdminTab;
  label: string;
  icon: any;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

  const navGroups: NavGroup[] = [
    {
      group: "OVERVIEW",
      items: [
        { id: "dashboard", label: "Executive Analytics", icon: LayoutDashboard, badge: "Live" },
      ],
    },
    {
      group: "OPERATIONS & PIPELINE",
      items: [
        { id: "leads", label: "Pipeline & Document Vault", icon: Inbox, badge: "Unified" },
      ],
    },
    {
      group: "SERVICES & PRICING",
      items: [
        { id: "services", label: "Services & SLA Catalog", icon: Package },
      ],
    },
    {
      group: "COMMUNICATIONS",
      items: [
        { id: "emails", label: "Resend Email & SMS Engine", icon: Mail },
        { id: "blogs", label: "Blog & Article CMS", icon: BookOpen },
      ],
    },
    {
      group: "SYSTEM & TEAMS",
      items: [
        { id: "users", label: "Registered Client Accounts", icon: Users },
        { id: "staff", label: "Staff Access & Credentials", icon: KeyRound },
        { id: "audit", label: "Security & Audit Logs", icon: History },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* SaaS Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1527] backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 shadow-md text-white">
        {/* Left: Brand Logo & Workspace Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <picture>
              <source srcSet="/logo-rect.webp" type="image/webp" />
              <img
                src="/logo-rect.png"
                alt="One World Solutions"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </picture>
          </Link>

          <span className="hidden sm:inline-block h-4 w-px bg-slate-700" />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-extrabold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> {userRole}
          </span>
        </div>

        {/* Middle: Global Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Global search by reference (#REF-245105), client name, or email..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && globalSearch.trim()) {
                setActiveTab("leads");
              }
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Right: Quick Action Modal Trigger & Profile Dropdown */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowNewModal(true)}
            className="h-9 px-3.5 rounded-xl bg-[#0F52FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" /> New Record
          </Button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* Active Admin Pill */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white grid place-items-center font-bold text-xs shadow-inner">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-tight">{userName}</p>
              <p className="text-[10px] text-slate-300 font-mono">Chicago HQ Ops</p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="h-9 w-9 text-slate-300 hover:text-red-400 hover:bg-red-950/30 cursor-pointer rounded-xl"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main SaaS Workspace Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left SaaS Sidebar (Light Theme) */}
        <aside
          className={`bg-white border-r border-slate-200/90 transition-all duration-300 flex flex-col justify-between shadow-xs ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Sidebar Nav Items */}
          <div className="p-3 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-1.5">
                {!collapsed && (
                  <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                    {grp.group}
                  </p>
                )}
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#0F52FF] text-white shadow-md shadow-blue-500/20"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                        title={collapsed ? item.label : undefined}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </div>
                        {!collapsed && item.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-mono text-[9px] font-extrabold border border-emerald-200">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer System Health */}
          {!collapsed && (
            <div className="p-3 border-t border-slate-200 bg-slate-50/60">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Database Status</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-600" /> Supabase PostgreSQL Live
                </p>
                <p className="text-[10px] text-slate-500 font-mono">Chicago HQ • E-Verified</p>
              </div>
            </div>
          )}
        </aside>

        {/* Center Main Workspace Content Area (Light Theme) */}
        <main className="flex-1 bg-slate-50/80 overflow-y-auto p-4 sm:p-6 space-y-6">
          {children}
        </main>
      </div>

      {/* Modal: New Intake Record Quick Creation (Light Theme) */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 space-y-5 shadow-2xl text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-blue-100 border border-blue-200 text-blue-600 grid place-items-center font-bold">
                  <Plus className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Create New Lead / Client Intake</h3>
                  <p className="text-[11px] text-slate-500">Manual intake logging for phone/walk-in enquiries.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quick-name" className="font-bold text-slate-700">Client Full Name *</Label>
                  <Input
                    id="quick-name"
                    required
                    placeholder="Alex Morgan"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quick-email" className="font-bold text-slate-700">Client Email *</Label>
                  <Input
                    id="quick-email"
                    type="email"
                    required
                    placeholder="alex.m@example.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quick-phone" className="font-bold text-slate-700">Phone Number (USA)</Label>
                  <Input
                    id="quick-phone"
                    placeholder="+1 (312) 555-0199"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-bold text-slate-700">Agency Division *</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900 text-xs">
                      <SelectItem value="SOFTWARE & UI/UX DIVISION">SOFTWARE & UI/UX DIVISION</SelectItem>
                      <SelectItem value="PASSPORT & CONSULAR SERVICES">PASSPORT & CONSULAR SERVICES</SelectItem>
                      <SelectItem value="DIGITAL MARKETING DIVISION">DIGITAL MARKETING DIVISION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quick-service" className="font-bold text-slate-700">Requested Service *</Label>
                <Input
                  id="quick-service"
                  required
                  placeholder="Custom Web Application / OCI Application / Google Ads"
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quick-notes" className="font-bold text-slate-700">Initial Project / Intake Notes</Label>
                <Textarea
                  id="quick-notes"
                  rows={3}
                  placeholder="Notes from initial consultation call or email inquiry..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowNewModal(false)}
                  className="h-9 px-4 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 px-5 bg-[#0F52FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Provision Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
