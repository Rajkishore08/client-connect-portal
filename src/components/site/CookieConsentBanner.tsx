"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("ows_cookie_consent");
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ows_cookie_consent", "accepted");
    setAccepted(true);
  };

  const handleDecline = () => {
    localStorage.setItem("ows_cookie_consent", "declined");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-[120] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 grid place-items-center shrink-0 border border-blue-200/60">
              <Cookie className="h-4 w-4" />
            </div>
            <span className="text-xs font-extrabold text-slate-900">
              Privacy &amp; Cookie Preferences
            </span>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
          We use essential cookies and anonymous analytics to improve your intake experience. Read our{" "}
          <Link to="/privacy" className="text-blue-600 underline font-semibold">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 h-8 text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs cursor-pointer"
          >
            Accept &amp; Continue
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDecline}
            className="h-8 text-xs font-bold text-slate-700 border-slate-200 rounded-xl cursor-pointer"
          >
            Essential Only
          </Button>
        </div>
      </div>
    </div>
  );
}
