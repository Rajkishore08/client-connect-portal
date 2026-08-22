import {
  KeyRound,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  UserX,
  X,
} from "lucide-react";
import { useState } from "react";
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

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  pass: string;
  role: "super_admin" | "lead_manager";
  status: "active" | "disabled";
  createdAt: string;
  lastLogin: string;
}

export const INITIAL_STAFF_ACCOUNTS: StaffAccount[] = [
  {
    id: "admin01",
    name: "Master Super Admin",
    email: "admin01@oneworldsolutionsusa.com",
    pass: "Priyanka@OneWorld1028",
    role: "super_admin",
    status: "active",
    createdAt: "2026-01-01",
    lastLogin: "Just now",
  },
  {
    id: "staff-2",
    name: "Sarah Jenkins (Lead Operations)",
    email: "sarah.leadmanager@oneworldsolutionsusa.com",
    pass: "Priyanka@OneWorld1028",
    role: "lead_manager",
    status: "active",
    createdAt: "2026-08-01",
    lastLogin: "2 hours ago",
  },
];

export function StaffCredentialsManager() {
  const [staffList, setStaffList] = useState<StaffAccount[]>(INITIAL_STAFF_ACCOUNTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    pass: "",
    role: "lead_manager" as "super_admin" | "lead_manager",
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.pass) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const created: StaffAccount = {
      id: `staff-${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      pass: newStaff.pass,
      role: newStaff.role,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0]!,
      lastLogin: "Never",
    };

    setStaffList((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewStaff({
      name: "",
      email: "",
      pass: "",
      role: "lead_manager",
    });
    toast.success("Staff Account Created", {
      description: `Created credentials for ${created.name} (${created.role === "lead_manager" ? "Lead Manager Access" : "Super Admin"}).`,
    });
  };

  const toggleStaffStatus = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "active" ? "disabled" : "active";
          toast.info(`Account status updated`, {
            description: `${s.name} is now ${nextStatus.toUpperCase()}`,
          });
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const deleteStaff = (id: string, name: string) => {
    if (staffList.length <= 1) {
      toast.error("Cannot delete master admin account.");
      return;
    }
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Staff credentials revoked for ${name}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 grid place-items-center font-bold">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-display">
              Staff Credentials &amp; Employee Access Control
            </h2>
            <p className="text-xs text-slate-500">
              Create and manage restricted login accounts for your team members and Lead Managers.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
        >
          <UserPlus className="h-4 w-4" /> Create Staff Login
        </Button>
      </div>

      {/* Staff Accounts Table */}
      <div className="surface-card overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Active Staff Credentials ({staffList.length})
          </h3>
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-bold">
            Employee Portal URL: /employee-portal
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-xs">
            <thead className="bg-slate-100/70 text-left text-[11px] uppercase tracking-wider font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Staff Name</th>
                <th className="px-4 py-3">Login Email</th>
                <th className="px-4 py-3">Assigned Role</th>
                <th className="px-4 py-3">Access Level</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {staffList.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors align-middle">
                  <td className="px-4 py-3.5 font-bold text-slate-900">{st.name}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-700">{st.email}</td>
                  <td className="px-4 py-3.5">
                    {st.role === "super_admin" ? (
                      <Badge className="bg-purple-100 text-purple-900 border-purple-300 font-bold text-[10px]">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Super Admin
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-900 border-blue-300 font-bold text-[10px]">
                        <UserCheck className="h-3 w-3 mr-1" /> Lead Manager
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                    {st.role === "super_admin"
                      ? "Full System Access"
                      : "Leads Pipeline & Reminders Only"}
                  </td>
                  <td className="px-4 py-3.5">
                    {st.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStaffStatus(st.id)}
                      className="h-8 text-[11px] font-bold cursor-pointer"
                    >
                      {st.status === "active" ? (
                        <>
                          <UserX className="h-3.5 w-3.5 text-amber-600 mr-1" /> Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3.5 w-3.5 text-emerald-600 mr-1" /> Activate
                        </>
                      )}
                    </Button>

                    {st.role !== "super_admin" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteStaff(st.id, st.name)}
                        className="h-8 text-[11px] font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-md rounded-3xl bg-white p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 grid place-items-center font-bold">
                  <UserPlus className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Create Staff Credentials</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 grid place-items-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
              <div className="space-y-1">
                <Label htmlFor="staff-name" className="font-extrabold text-slate-800">Staff Member Name *</Label>
                <Input
                  id="staff-name"
                  required
                  placeholder="e.g. Sarah Jenkins (Lead Specialist)"
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium h-10 text-xs"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="staff-email" className="font-extrabold text-slate-800">Work Email Address *</Label>
                <Input
                  id="staff-email"
                  type="email"
                  required
                  placeholder="e.g. sarah@oneworldsolutions.com"
                  className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 font-medium h-10 text-xs"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="staff-pass" className="font-bold text-slate-700">Set Login Password *</Label>
                <Input
                  id="staff-pass"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newStaff.pass}
                  onChange={(e) => setNewStaff({ ...newStaff, pass: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label className="font-bold text-slate-700">Assigned System Role</Label>
                <Select
                  value={newStaff.role}
                  onValueChange={(v) => setNewStaff({ ...newStaff, role: v as any })}
                >
                  <SelectTrigger className="h-10 text-xs font-bold bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[9999]">
                    <SelectItem value="lead_manager" className="text-xs font-bold py-2 cursor-pointer">
                      Lead Manager (Employee Access — Leads &amp; Reminders Only)
                    </SelectItem>
                    <SelectItem value="super_admin" className="text-xs font-bold py-2 cursor-pointer">
                      Super Admin (Full Platform Control)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-[11px]">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-700" /> Employee Access Boundary
                </p>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  Lead Manager staff can access <strong>Lead Management</strong> and <strong>Client Reminders</strong> at <code className="bg-amber-100 px-1 rounded font-mono">/employee-portal</code>. They will NOT have access to service pricing or system settings.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Create Staff Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
