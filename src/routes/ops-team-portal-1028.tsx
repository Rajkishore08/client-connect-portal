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
import { SaaSAdminLayout, type AdminTab } from "@/components/admin/SaaSAdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/ops-team-portal-1028")({
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

  const [activeTab, setActiveTab] = useState<AdminTab>("leads");

  // Client Reminder Sender State
  const [reminderRef, setReminderRef] = useState("OWS-889124");
  const [reminderClientName, setReminderClientName] = useState("Alex Morgan");
  const [reminderClientPhone, setReminderClientPhone] = useState("+1 (312) 555-0132");
  const [reminderClientEmail, setReminderClientEmail] = useState("alex.morgan@example.com");
  const [reminderType, setReminderType] = useState<"sms" | "email">("sms");
  const [reminderMessage, setReminderMessage] = useState(
    "Hi Alex, this is a reminder from One World Solutions. Your passport intake #OWS-889124 has advanced to Consular Audit. Please check your tracking status on /track."
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
    <SaaSAdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      userRole={employeeSession.role || "Lead Manager"}
      userName={employeeSession.name || "Rahul Verma"}
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Assigned Access: Lead Operations &amp; Reminders
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
              {employeeSession.name} — {employeeSession.role} Console
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

        {/* Tab 3: Client Reminders Engine */}
        {activeTab === "emails" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="surface-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl bg-slate-900 text-slate-100 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="h-10 w-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 grid place-items-center font-bold">
                  <Bell className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Client Reminder Dispatcher</h3>
                  <p className="text-xs text-slate-400">Send instant SMS or Email reminders for pending documents or milestone updates.</p>
                </div>
              </div>

              <form onSubmit={handleSendReminder} className="space-y-4 text-xs">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="rem-ref" className="font-bold text-slate-300">Lead Reference ID *</Label>
                    <Input
                      id="rem-ref"
                      required
                      placeholder="OWS-889124"
                      value={reminderRef}
                      onChange={(e) => setReminderRef(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rem-name" className="font-bold text-slate-300">Client Name *</Label>
                    <Input
                      id="rem-name"
                      required
                      placeholder="Alex Morgan"
                      value={reminderClientName}
                      onChange={(e) => setReminderClientName(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="rem-phone" className="font-bold text-slate-300">Client Phone (SMS) *</Label>
                    <Input
                      id="rem-phone"
                      required
                      placeholder="+1 (312) 555-0132"
                      value={reminderClientPhone}
                      onChange={(e) => setReminderClientPhone(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="rem-email" className="font-bold text-slate-300">Client Email *</Label>
                    <Input
                      id="rem-email"
                      type="email"
                      required
                      placeholder="alex.morgan@example.com"
                      value={reminderClientEmail}
                      onChange={(e) => setReminderClientEmail(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-bold text-slate-300">Dispatch Channel</Label>
                  <div className="flex gap-3">
                    <label className={`flex-1 p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${reminderType === "sms" ? "bg-blue-600/20 border-blue-500 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span>SMS Text Reminder (~1.1¢ / msg)</span>
                      </div>
                      <input
                        type="radio"
                        name="remType"
                        checked={reminderType === "sms"}
                        onChange={() => setReminderType("sms")}
                      />
                    </label>

                    <label className={`flex-1 p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${reminderType === "email" ? "bg-emerald-600/20 border-emerald-500 text-white font-bold" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-emerald-400" />
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
                  <Label htmlFor="rem-msg" className="font-bold text-slate-300">Reminder Content Message *</Label>
                  <Textarea
                    id="rem-msg"
                    rows={4}
                    required
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 shadow-md cursor-pointer">
                    <Send className="h-4 w-4" /> Dispatch Reminder Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SaaSAdminLayout>
  );
}
