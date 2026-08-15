import { KeyRound, Lock, Mail, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INITIAL_STAFF_ACCOUNTS, type StaffAccount } from "./StaffCredentialsManager";

interface EmployeeLoginProps {
  onSuccess: (staff: StaffAccount) => void;
}

export function EmployeeLogin({ onSuccess }: EmployeeLoginProps) {
  const [emailOrId, setEmailOrId] = useState("rahul.leadmanager@oneworldsolutions.com");
  const [password, setPassword] = useState("LeadPass2026!");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const q = emailOrId.trim().toLowerCase();
      // Match against staff accounts
      const match = INITIAL_STAFF_ACCOUNTS.find(
        (s) =>
          (s.email.toLowerCase() === q || s.id.toLowerCase() === q) &&
          s.pass === password
      );

      if (!match) {
        toast.error("Invalid Employee ID or Password.", {
          description: "Check your staff credentials or contact your Super Admin.",
        });
        setLoading(false);
        return;
      }

      if (match.status === "disabled") {
        toast.error("Staff Access Suspended.", {
          description: "Your employee account has been suspended by the Super Admin.",
        });
        setLoading(false);
        return;
      }

      toast.success(`Welcome back, ${match.name}!`, {
        description: "Authenticated with Lead Manager Access.",
      });
      setLoading(false);
      onSuccess(match);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="surface-card w-full max-w-md rounded-3xl bg-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-800 relative animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header Rectangular Logo & Portal Badge */}
        <div className="text-center space-y-3">
          <picture className="inline-block">
            <source srcSet="/logo-rect.webp" type="image/webp" />
            <img
              src="/logo-rect.png"
              alt="One World Solutions"
              className="h-10 w-auto mx-auto object-contain brightness-0 invert"
            />
          </picture>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider">
              <UserCheck className="h-3.5 w-3.5" /> Staff &amp; Employee Portal
            </span>
            <h1 className="text-xl font-extrabold text-white font-display mt-2">
              Employee Login
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Enter your assigned Employee ID / Work Email and Password to access Lead Management.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <Label htmlFor="emp-id" className="font-bold text-slate-300">
              Employee ID / Work Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                id="emp-id"
                required
                type="text"
                className="h-11 pl-10 bg-slate-900 border-slate-800 text-white focus:border-blue-500 text-xs font-mono"
                placeholder="e.g. rahul.leadmanager@oneworldsolutions.com"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emp-pass" className="font-bold text-slate-300">
              Staff Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                id="emp-pass"
                required
                type="password"
                className="h-11 pl-10 bg-slate-900 border-slate-800 text-white focus:border-blue-500 text-xs"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Demo Staff Quick Fill Button */}
          <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-800/60 space-y-1.5 text-blue-200">
            <p className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between text-blue-300">
              <span>Quick Demo Staff Fill</span>
              <span className="font-mono text-[10px] text-emerald-400 font-normal">Ready</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setEmailOrId("rahul.leadmanager@oneworldsolutions.com");
                setPassword("LeadPass2026!");
                toast.info("Filled Rahul Verma (Lead Manager) Credentials");
              }}
              className="w-full text-left text-[11px] font-mono p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors text-slate-300"
            >
              <strong className="text-white">Rahul Verma:</strong> rahul.leadmanager@oneworldsolutions.com
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer rounded-xl"
          >
            {loading ? "Authenticating Staff..." : "Sign In to Employee Console"}
          </Button>
        </form>

        {/* Footer Boundary Notice */}
        <div className="pt-3 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Protected Staff Area • One World Solutions Agency Chicago
          </p>
        </div>
      </div>
    </div>
  );
}
