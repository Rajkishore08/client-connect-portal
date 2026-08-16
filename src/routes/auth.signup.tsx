import { Link, useNavigate, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Megaphone,
  Plane,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Client Portal | One World Solutions" },
      { name: "description", content: "Create an account to manage your passport, visa, web development, and digital marketing intakes." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle, loginAsGuest, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    navigate({ to: "/account" });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    try {
      const ok = await signup(name, email, password);
      if (ok) navigate({ to: "/account" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      navigate({ to: "/account" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestSignIn = async () => {
    setIsSubmitting(true);
    try {
      await loginAsGuest();
      navigate({ to: "/account" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid lg:grid-cols-2">
      {/* Left Column: Light Theme Company Showcase & Services List */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 text-slate-900 p-8 lg:p-14 flex flex-col justify-between hidden lg:flex border-r border-slate-200">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0F52FF_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none opacity-[0.04]" />

        {/* Top Branding Logo Header */}
        <div className="relative z-10 space-y-3">
          <Link to="/" className="inline-block group">
            <picture>
              <source srcSet="/logo-rect.webp" type="image/webp" />
              <img
                src="/logo-rect.png"
                alt="One World Solutions"
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </picture>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 font-extrabold text-[11px] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Chicago HQ • Global Agency v2.5
          </div>
        </div>

        {/* Middle Main Headline & Services List */}
        <div className="relative z-10 space-y-8 my-8">
          <div className="space-y-3 max-w-xl">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-display leading-tight text-slate-900">
              Create Your Account, <br />
              <span className="text-blue-600">Track Intakes &amp; Projects</span> <br />
              <span className="text-blue-800">In Real Time.</span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-600 leading-relaxed font-medium">
              Register to submit new intake forms, upload compliance documents to the vault, and receive instant WhatsApp/SMS milestones.
            </p>
          </div>

          {/* 3 Metric Pills */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left space-y-0.5">
              <p className="text-base font-extrabold text-slate-900 font-display">2,500+</p>
              <p className="text-[10px] text-slate-500 font-medium">Happy Clients</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left space-y-0.5">
              <p className="text-base font-extrabold text-slate-900 font-display">35+ States</p>
              <p className="text-[10px] text-slate-500 font-medium">Nationwide</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left space-y-0.5">
              <p className="text-base font-extrabold text-emerald-600 font-display">98.6%</p>
              <p className="text-[10px] text-slate-500 font-medium">Success Rate</p>
            </div>
          </div>

          {/* 3 Core Services Showcase */}
          <div className="space-y-3 max-w-lg">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 font-bold grid place-items-center shrink-0">
                <Plane className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Passport &amp; Consular Concierge</p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  End-to-end international passport renewals, visa processing, and 24-hour rush intake.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 font-bold grid place-items-center shrink-0">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Custom Software &amp; SaaS Platforms</p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Bespoke React/Next.js web applications, ERP dashboards, and API infrastructure.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 font-bold grid place-items-center shrink-0">
                <Megaphone className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Digital Growth &amp; PPC Marketing</p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  High-converting Google Ads PPC campaigns, technical SEO, and lead acquisition funnels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <p>© 2026 One World Solutions. All rights reserved.</p>
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
          </span>
        </div>
      </div>

      {/* Right Column: Complete Light Theme Sign Up Card */}
      <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-slate-50">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>

          {/* Mobile Logo View (< 1024px) */}
          <div className="lg:hidden">
            <picture>
              <source srcSet="/logo-rect.webp" type="image/webp" />
              <img src="/logo-rect.png" alt="One World Solutions" className="h-7 w-auto object-contain" />
            </picture>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="my-auto py-8 max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 shadow-2xs">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Join One World Solutions to manage intakes &amp; track active cases.
            </p>
          </div>

          {/* Main Light Theme Sign Up Form */}
          <div className="surface-card p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            {/* 1. TOP: Google One-Click OAuth Button */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="h-11 w-full font-bold text-xs border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs cursor-pointer"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign Up with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                <span className="bg-white px-2">or sign up with email</span>
              </div>
            </div>

            {/* 2. MIDDLE: Name, Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="signup-name" className="font-bold text-xs text-slate-700">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    className="h-11 pl-10 text-xs bg-slate-50/80 border-slate-200 focus:bg-white"
                    placeholder="Rajesh Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signup-email" className="font-bold text-xs text-slate-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    className="h-11 pl-10 text-xs bg-slate-50/80 border-slate-200 focus:bg-white"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="signup-pass" className="font-bold text-xs text-slate-700">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-pass"
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-11 pl-10 pr-10 text-xs bg-slate-50/80 border-slate-200 focus:bg-white font-mono"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Create Account <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                <span className="bg-white px-2">Instant Demo Access</span>
              </div>
            </div>

            {/* 3. BOTTOM: 1-Click Guest Login Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGuestSignIn}
              disabled={isSubmitting}
              className="h-11 w-full font-bold text-xs border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
            >
              <UserCheck className="h-4 w-4 mr-2 text-emerald-600" /> Continue as Guest Client
            </Button>
          </div>

          {/* Quick Sign In Link */}
          <div className="text-center space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
