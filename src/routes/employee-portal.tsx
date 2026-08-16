import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Globe,
  Inbox,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BlogManager } from "@/components/admin/BlogManager";
import { EmployeeLogin } from "@/components/admin/EmployeeLogin";
import { type StaffAccount } from "@/components/admin/StaffCredentialsManager";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/employee-portal")({
  head: () => ({
    meta: [
      { title: "Employee Lead Management Console — One World Solutions Agency" },
      { name: "description", content: "Restricted employee lead management and client reminder engine." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeePortalPage,
});

function EmployeePortalPage() {
  const [employeeSession, setEmployeeSession] = useState<StaffAccount | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("ows_employee_session");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<"leads" | "reminders" | "blogs">("leads");

  // Client Reminder Sender State
  const [reminderRef, setReminderRef] = useState("OWS-889124");
  const [reminderClientName, setReminderClientName] = useState("Ananya Sharma");
  const [reminderClientPhone, setReminderClientPhone] = useState("+1 (312) 555-0132");
  const [reminderClientEmail, setReminderClientEmail] = useState("ananya.sharma@example.com");
  const [reminderType, setReminderType] = useState<"sms" | "email">("sms");
  const [reminderMessage, setReminderMessage] = useState(
    "Hi Ananya, this is a reminder from One World Solutions. Your passport intake #OWS-889124 has advanced to VFS Audit. Please check your tracking status on /track."
  );

  if (!employeeSession) {
    return (
      <EmployeeLogin
        onSuccess={(staff) => {
          setEmployeeSession(staff);
          localStorage.setItem("ows_employee_session", JSON.stringify(staff));
        }}
      />
    );
  }

  const handleLogout = () => {
    setEmployeeSession(null);
    localStorage.removeItem("ows_employee_session");
    toast.info("Logged out of Employee Portal.");
  };

  const handleSendReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (reminderType === "sms") {
      toast.success("SMS Reminder Dispatched", {
        description: `Sent text reminder to ${reminderClientPhone} for intake #${reminderRef}.`,
      });
    } else {
      toast.success("Email Notification Dispatched", {
        description: `Sent official email reminder to ${reminderClientEmail} for intake #${reminderRef}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80">
      {/* Employee Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0B1527] text-white border-b border-slate-800 shadow-lg">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left Logo & Employee Role Badge */}
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
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider">
                <UserCheck className="h-3.5 w-3.5 text-emerald-400" /> Employee Console (Lead Manager)
              </span>
            </div>

            {/* Middle Nav Links (Restricted Access) */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("leads")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "leads"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Inbox className="h-4 w-4" /> Lead Management &amp; Pipeline
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <FileText className="h-4 w-4 text-amber-400" /> Blogs CMS
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reminders")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "reminders"
                    ? "bg-[#0F52FF] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Bell className="h-4 w-4" /> Client Reminders Engine
              </button>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-xs text-slate-300 hover:text-white hover:bg-slate-800">
                <Link to="/" target="_blank">
                  <Globe className="h-4 w-4 mr-1.5" /> View Site
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 px-3.5 text-xs font-bold border-slate-700 bg-slate-800 text-slate-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 mr-1.5" /> Staff Logout
              </Button>
            </div>
          </div>

          {/* Mobile Secondary Scrollable Navbar Bar */}
          <div className="lg:hidden flex items-center gap-2 py-2 overflow-x-auto border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "leads" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Lead Management
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reminders")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                activeTab === "reminders" ? "bg-[#0F52FF] text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              Client Reminders
            </button>
          </div>
        </div>
      </header>

      {/* Main Employee Content */}
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Assigned Access: Lead Operations &amp; Reminders
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
              Rahul Verma — Lead Manager Console
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Manage incoming lead pipeline, advance milestones, and dispatch instant SMS/Email reminders to clients.
            </p>
          </div>
        </div>

        {/* Tab 1: Lead Management System */}
        {activeTab === "leads" && <LeadsTable />}

        {/* Tab 2: SEO Blog CMS */}
        {activeTab === "blogs" && <BlogManager />}

        {/* Tab 2: Client Reminders Engine */}
        {activeTab === "reminders" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="surface-card p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl bg-white space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="h-10 w-10 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 grid place-items-center font-bold">
                  <Bell className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Client Reminder Dispatcher</h3>
                  <p className="text-xs text-slate-500">Send instant SMS or Email reminders for pending documents or milestone updates.</p>
                </div>
              </div>

              <form onSubmit={handleSendReminder} className="space-y-4 text-xs">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="rem-ref" className="font-bold text-slate-700">Lead Reference ID *</Label>
                    <Input
                      id="rem-ref"
                      required
                      placeholder="OWS-889124"
                      value={reminderRef}
                      onChange={(e) => setReminderRef(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rem-name" className="font-bold text-slate-700">Client Name *</Label>
                    <Input
                      id="rem-name"
                      required
                      placeholder="Ananya Sharma"
                      value={reminderClientName}
                      onChange={(e) => setReminderClientName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="rem-phone" className="font-bold text-slate-700">Client Phone (SMS) *</Label>
                    <Input
                      id="rem-phone"
                      required
                      placeholder="+1 (312) 555-0132"
                      value={reminderClientPhone}
                      onChange={(e) => setReminderClientPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rem-email" className="font-bold text-slate-700">Client Email *</Label>
                    <Input
                      id="rem-email"
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={reminderClientEmail}
                      onChange={(e) => setReminderClientEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-bold text-slate-700">Dispatch Channel</Label>
                  <div className="flex gap-3">
                    <label className={`flex-1 p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${reminderType === "sms" ? "bg-blue-50 border-blue-500 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span>SMS Text Reminder (~1.1¢ / msg)</span>
                      </div>
                      <input
                        type="radio"
                        name="remType"
                        checked={reminderType === "sms"}
                        onChange={() => setReminderType("sms")}
                      />
                    </label>

                    <label className={`flex-1 p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${reminderType === "email" ? "bg-emerald-50 border-emerald-500 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-emerald-600" />
                        <span>Official Email Alert (Free)</span>
                      </div>
                      <input
                        type="radio"
                        name="remType"
                        checked={reminderType === "email"}
                        onChange={() => setReminderType("email")}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rem-msg" className="font-bold text-slate-700">Reminder Content Message *</Label>
                  <Textarea
                    id="rem-msg"
                    rows={4}
                    required
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer">
                    <Send className="h-4 w-4" /> Dispatch Reminder Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
