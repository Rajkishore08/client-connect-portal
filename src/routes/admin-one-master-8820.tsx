import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  FileText,
  FolderLock,
  Globe,
  History,
  Inbox,
  KeyRound,
  LogOut,
  Mail,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AuditLogsManager } from "@/components/admin/AuditLogsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { ClientDocumentVault } from "@/components/admin/ClientDocumentVault";
import { EmailAutomationManager } from "@/components/admin/EmailAutomationManager";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { RegisteredUsersManager } from "@/components/admin/RegisteredUsersManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { StaffCredentialsManager } from "@/components/admin/StaffCredentialsManager";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-one-master-8820")({
  head: () => ({
    meta: [
      { title: "Admin Console — One World Solutions Agency" },
      { name: "description", content: "Internal admin console for managing intakes, services, emails, and client accounts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

export type AdminTab = "dashboard" | "leads" | "blogs" | "vault" | "services" | "emails" | "users" | "staff" | "audit";

function AdminPage() {
  // Local-only gate. TODO: replace with real Supabase auth session.
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  if (!loggedIn) return <AdminLogin onSuccess={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-slate-50/80">
      {/* Top Navbar Header with Company Rectangular Logo & Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0B1527] text-white border-b border-slate-800 shadow-lg">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left: Official Company Logo & Admin Console Badge */}
            <div className="flex items-center gap-4 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <picture>
                  <source srcSet="/logo-rect.webp" type="image/webp" />
                  <img
                    src="/logo-rect.png"
                    alt="One World Solutions"
                    className="h-9 w-auto object-contain brightness-0 invert"
                  />
                </picture>
              </Link>
              <span className="hidden sm:inline-block h-4 w-px bg-slate-700" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-extrabold text-[11px] uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" /> Super Admin
              </span>
            </div>

            {/* Middle: Integrated Navbar Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <BarChart3 className="h-4 w-4" /> Dashboard
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("leads")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "leads"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Inbox className="h-4 w-4" /> Enquiries
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <FileText className="h-4 w-4 text-amber-400" /> Blogs CMS
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("vault")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "vault"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <FolderLock className="h-4 w-4 text-emerald-400" /> Document Vault
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("staff")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "staff"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <KeyRound className="h-4 w-4" /> Staff Credentials
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "audit"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <History className="h-4 w-4" /> Audit Logs
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "services"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <BookOpen className="h-4 w-4" /> Services Catalog
              </button>
            </nav>

            {/* Right: View Site, Employee Portal & Logout */}
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex text-xs font-bold border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-white">
                <Link to="/ops-team-portal-1028" target="_blank">
                  <UserCheck className="h-3.5 w-3.5 mr-1" /> Employee Portal
                </Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                <Link to="/" target="_blank">
                  <Globe className="h-4 w-4 mr-1.5" /> View Site
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setLoggedIn(false)}
                className="h-9 px-3 text-xs font-bold border-slate-700 bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
              </Button>
            </div>
          </div>

          {/* Mobile Secondary Scrollable Navbar Bar */}
          <div className="lg:hidden flex items-center gap-1.5 py-2 overflow-x-auto border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "dashboard" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "leads" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Enquiries &amp; Leads
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "blogs" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Blogs CMS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("vault")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "vault" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Document Vault
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("staff")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "staff" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Staff Credentials
            </button>
          </div>
        </div>
      </header>

      {/* Main Active Page Content */}
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "leads" && <LeadsTable />}
        {activeTab === "blogs" && <BlogManager />}
        {activeTab === "vault" && <ClientDocumentVault />}
        {activeTab === "staff" && <StaffCredentialsManager />}
        {activeTab === "audit" && <AuditLogsManager />}
        {activeTab === "services" && <ServicesManager />}
        {activeTab === "emails" && <EmailAutomationManager />}
        {activeTab === "users" && <RegisteredUsersManager />}
      </main>
    </div>
  );
}
