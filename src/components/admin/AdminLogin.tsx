import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminSignIn } from "@/lib/backend-stubs";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await adminSignIn(email, password);
      if (res.ok) {
        toast.success("Master Operations Console Authenticated", {
          description: "Welcome back, Operations Director.",
        });
        onSuccess();
      } else {
        setError(res.error || "Invalid Master Credentials.");
        toast.error("Authentication Failed", {
          description: "Please check your master admin credentials.",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail("admin01@oneworldsolutionsusa.com");
    setPassword("Priyanka@OneWorld1028");
    setError("");
    toast.info("Demo Master Credentials Loaded", {
      description: "Click 'Sign in to Master Console' to enter.",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Ambient Decorative Backdrop Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Main Glassmorphic Login Card */}
        <div className="surface-card rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-7 sm:p-9 space-y-6 backdrop-blur-xl relative animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header Rectangular Logo & Master Badge */}
          <div className="text-center space-y-3">
            <div className="bg-white rounded-2xl p-3 inline-block shadow-md border border-slate-200/20">
              <img
                src="/logo-rect.webp"
                alt="One World Solutions Logo"
                className="h-9 w-auto object-contain mx-auto"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline" className="bg-blue-950/80 text-blue-400 border-blue-800/80 font-mono text-[10px] tracking-wider uppercase font-bold py-0.5">
                  <ShieldCheck className="h-3 w-3 mr-1 text-blue-400" /> SECURED MASTER ENDPOINT
                </Badge>
              </div>

              <h1 className="text-xl font-extrabold font-display text-white tracking-tight pt-1">
                Master Operations Console
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Authorized Super Admin &amp; Enterprise Lead Operations Center
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-900/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-300 min-w-0">
              <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
              <div className="truncate">
                <p className="font-bold text-[11px] text-blue-200">1-Click Auto-Fill</p>
                <p className="text-[10px] text-blue-400/90 truncate font-mono">admin01@oneworldsolutionsusa.com</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleFillDemoCredentials}
              className="h-7 text-[10px] font-extrabold bg-blue-600/20 hover:bg-blue-600 hover:text-white border-blue-500/40 text-blue-300 shrink-0 cursor-pointer transition-all"
            >
              Autofill Demo
            </Button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="font-bold text-slate-300 flex items-center gap-1.5 text-xs">
                <Mail className="h-3.5 w-3.5 text-blue-400" /> Master Admin Email / Login ID *
              </Label>
              <div className="relative">
                <Input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="admin01@oneworldsolutionsusa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-600 font-mono text-xs pl-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="admin-password" className="font-bold text-slate-300 flex items-center gap-1.5 text-xs">
                  <Lock className="h-3.5 w-3.5 text-blue-400" /> Master Security Password *
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-600 font-mono text-xs pl-3.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer p-0.5"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold animate-in fade-in duration-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 cursor-pointer transition-all gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Authenticating Console...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Sign in to Master Console
                </>
              )}
            </Button>
          </form>

          {/* Restricted Staff Login Link */}
          <div className="pt-2 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Employee or Lead Specialist?{" "}
              <a
                href="/employee-portal"
                className="font-bold text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 ml-0.5"
              >
                Access Employee Portal →
              </a>
            </p>
          </div>
        </div>

        {/* Navigation & Security Telemetry Footer */}
        <div className="space-y-3 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Public Website
          </Link>

          <p className="text-[10px] text-slate-500 font-mono">
            🔒 256-Bit SSL Encrypted Session • Chicago HQ Operations Center
          </p>
        </div>
      </div>
    </main>
  );
}
