import { Link } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminSignIn } from "@/lib/backend-stubs";

/** UI-only login. TODO: replace with real Supabase auth. */
export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await adminSignIn(email, password);
    setLoading(false);
    if (res.ok) onSuccess();
    else setError(res.error);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-sm">
        <div className="surface-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white shadow-md">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                SECURED MASTER ENDPOINT
              </span>
              <h1 className="text-lg font-black text-white">Master Admin Access</h1>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Authorized portal administration &amp; enterprise lead management control center.
          </p>

          <form onSubmit={submit} className="mt-4 space-y-4 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="font-bold text-slate-300">Admin Email / Master ID *</Label>
              <Input
                id="admin-email"
                type="email"
                required
                className="h-11 bg-slate-950 border-slate-800 text-white focus:border-blue-500 font-mono text-xs"
                placeholder="admin01@oneworldsolutionsusa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="font-bold text-slate-300">Master Password *</Label>
              <Input
                id="admin-password"
                type="password"
                required
                className="h-11 bg-slate-950 border-slate-800 text-white focus:border-blue-500 text-xs font-mono"
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to the portal
          </Link>
        </p>
      </div>
    </main>
  );
}
