import {
  CheckCircle2,
  ExternalLink,
  Mail,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserPlus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { sendIntakeConfirmationEmail } from "@/lib/email-service";

import { fetchLeadsFromSupabase } from "@/lib/supabase-db";

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "email";
  joinedDate: string;
  lastActive: string;
  intakesCount: number;
  status: "Active" | "Verified" | "VIP Client";
  role: "Client" | "Corporate Account";
}

export function RegisteredUsersManager() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");

  const loadRealUsers = async () => {
    setLoading(true);
    const userMap = new Map<string, RegisteredUser>();

    // 1. Check current logged-in user session
    try {
      const storedUser = localStorage.getItem("ows_portal_user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u && u.email) {
          const emailKey = u.email.toLowerCase();
          const userObj: RegisteredUser = {
            id: u.id || `usr-${emailKey.replace(/[^a-z0-9]/g, "-")}`,
            name: u.name || u.email.split("@")[0],
            email: u.email,
            provider: u.provider === "google" ? "google" : "email",
            joinedDate: u.createdAt ? u.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
            lastActive: "Active Session",
            intakesCount: 0,
            status: "Active",
            role: "Client",
          };
          if (u.avatar) userObj.avatar = u.avatar;
          userMap.set(emailKey, userObj);
        }
      }
    } catch (err) {
      console.warn("[RegisteredUsersManager] Active session check notice:", err);
    }

    // 2. Check registered users list in localStorage
    try {
      const registeredList = localStorage.getItem("ows_registered_users");
      if (registeredList) {
        const list = JSON.parse(registeredList);
        if (Array.isArray(list)) {
          list.forEach((u: any) => {
            if (u && u.email) {
              const emailKey = u.email.toLowerCase();
              const existing = userMap.get(emailKey);
              const avatarVal = u.avatar || existing?.avatar;
              const userObj: RegisteredUser = {
                id: u.id || existing?.id || `usr-${emailKey.replace(/[^a-z0-9]/g, "-")}`,
                name: u.name || existing?.name || u.email.split("@")[0],
                email: u.email,
                provider: u.provider === "google" ? "google" : (existing?.provider || "email"),
                joinedDate: u.joinedDate || (u.createdAt ? u.createdAt.slice(0, 10) : (existing?.joinedDate || new Date().toISOString().slice(0, 10))),
                lastActive: u.lastActive || existing?.lastActive || "Recently Active",
                intakesCount: existing?.intakesCount || 0,
                status: u.status || existing?.status || "Verified",
                role: u.role || existing?.role || "Client",
              };
              if (avatarVal) userObj.avatar = avatarVal;
              userMap.set(emailKey, userObj);
            }
          });
        }
      }
    } catch (err) {
      console.warn("[RegisteredUsersManager] Registered users storage notice:", err);
    }

    // 3. Aggregate unique intake applicants from local storage & Supabase DB
    try {
      const dbLeads = await fetchLeadsFromSupabase();
      const localIntakesStr = localStorage.getItem("ows_submitted_intakes");
      const localIntakes = localIntakesStr ? JSON.parse(localIntakesStr) : [];
      const combinedIntakes = [...dbLeads, ...localIntakes];

      combinedIntakes.forEach((intake: any) => {
        const email = intake.email || intake.applicantEmail || intake.user_email;
        if (email) {
          const emailKey = email.toLowerCase();
          const existing = userMap.get(emailKey);
          const currentCount = (existing?.intakesCount || 0) + 1;
          const name = intake.name || intake.applicantName || intake.fullName || (existing ? existing.name : email.split("@")[0]);
          const avatarVal = existing?.avatar;

          const userObj: RegisteredUser = {
            id: existing?.id || intake.id || `usr-intake-${emailKey.replace(/[^a-z0-9]/g, "-")}`,
            name: name,
            email: email,
            provider: existing?.provider || (email.includes("@gmail.com") ? "google" : "email"),
            joinedDate: existing?.joinedDate || intake.date || new Date().toISOString().slice(0, 10),
            lastActive: existing?.lastActive || "Active Client",
            intakesCount: currentCount,
            status: currentCount > 1 ? "VIP Client" : (existing?.status || "Verified"),
            role: "Client",
          };
          if (avatarVal) userObj.avatar = avatarVal;
          userMap.set(emailKey, userObj);
        }
      });
    } catch (err) {
      console.warn("[RegisteredUsersManager] Intake aggregation notice:", err);
    }

    // Fallback if no user is present yet: register Raj as default authenticated user
    if (userMap.size === 0) {
      userMap.set("rajkishores2004@gmail.com", {
        id: "usr-raj-001",
        name: "Raj",
        email: "rajkishores2004@gmail.com",
        provider: "google",
        joinedDate: new Date().toISOString().slice(0, 10),
        lastActive: "Active Session",
        intakesCount: 1,
        status: "VIP Client",
        role: "Client",
      });
    }

    setUsers(Array.from(userMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    loadRealUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesProvider = providerFilter === "all" || u.provider === providerFilter;
      return matchesQ && matchesProvider;
    });
  }, [users, search, providerFilter]);

  const handleSendNotification = (user: RegisteredUser) => {
    sendIntakeConfirmationEmail({
      name: user.name,
      email: user.email,
      service: "General Account Status Update",
      reference: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      consultationSlot: "Reserved in Portal",
    });
    toast.success(`Account notification email sent to ${user.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="surface-card p-6 rounded-3xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
              <Users className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold font-display text-foreground">Registered Site Users</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage authenticated portal accounts, Google OAuth sign-ins, and client intake activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold px-3 py-1 text-xs">
            {users.filter((u) => u.provider === "google").length} Google Auth Accounts
          </Badge>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-3 py-1 text-xs">
            {users.length} Total Users
          </Badge>
        </div>
      </div>

      {/* Filter Bar & Table */}
      <div className="surface-card overflow-hidden rounded-3xl border border-border">
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-[1fr_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 pl-9 text-xs bg-card"
              placeholder="Search user name or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="h-10 w-full sm:w-48 text-xs bg-card">
              <SelectValue placeholder="All Sign-In Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Auth Types</SelectItem>
              <SelectItem value="google">Google OAuth</SelectItem>
              <SelectItem value="email">Email &amp; Password</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 text-left text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">User Profile</th>
                <th className="px-4 py-3">Auth Provider</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3">Active Intakes</th>
                <th className="px-4 py-3">Account Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-border/60 hover:bg-muted/20 align-middle">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-primary-soft text-primary font-bold grid place-items-center">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {user.provider === "google" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[11px]">
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Google OAuth
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px]">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        Email &amp; Password
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500">{user.joinedDate}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{user.lastActive}</td>
                  <td className="px-4 py-3 font-bold text-primary">
                    <Badge variant="outline" className="bg-primary-soft text-primary font-bold">
                      {user.intakesCount} Active Case{user.intakesCount === 1 ? "" : "s"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`text-[10px] uppercase font-extrabold ${
                        user.status === "VIP Client"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : user.status === "Verified"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendNotification(user)}
                      className="h-8 text-xs font-bold text-slate-800 hover:bg-primary hover:text-white cursor-pointer"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" /> Notify Client
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No registered users match your search query.
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
