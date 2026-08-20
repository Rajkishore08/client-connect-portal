import { Link } from "@tanstack/react-router";
import { Info, ShieldAlert, ShieldCheck } from "lucide-react";

import { OFFICE_LOCATION, TRUST_COPY } from "@/data/mock-data";

/** Inline disclaimer banner — prominently highlighted on every service page. */
export function TrustBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-blue-50/90 backdrop-blur-xl p-4 sm:p-5 text-sm leading-relaxed text-slate-900 shadow-md ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-700 grid place-items-center shrink-0 border border-amber-400/40 shadow-2xs">
          <ShieldAlert className="h-5 w-5 text-amber-700" />
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-md border border-amber-300">
              OFFICIAL DISCLAIMER
            </span>
          </div>
          <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
            {TRUST_COPY.disclaimer}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed font-medium pt-0.5">
            {TRUST_COPY.fees}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="min-w-0 space-y-2.5">
            <Link to="/" className="inline-block">
              <img src="/logo-rect.webp" alt="One World Solutions" className="h-8.5 w-auto object-contain" />
            </Link>
            <p className="text-xs font-bold text-primary">
              Connecting People. Powering Businesses.
            </p>
            <div className="pt-1">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 text-[11px] font-medium shadow-2xs">
                <span className="font-extrabold text-slate-900">A Division of ABHIPRIYA GROUPS LLC</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 font-bold text-blue-700">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" /> E-Verified Company
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {OFFICE_LOCATION.address}
            </p>
            <p className="text-xs font-semibold text-foreground">
              Direct Hotline: {OFFICE_LOCATION.phone} (Available Today)
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-wider">3 Core Pillars</h3>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-muted-foreground">
              <li>
                <Link to="/passport" className="hover:text-foreground">
                  01. Passport &amp; Visa Concierge
                </Link>
              </li>
              <li>
                <Link to="/web-development" className="hover:text-foreground">
                  02. Web &amp; Custom Software Dev
                </Link>
              </li>
              <li>
                <Link to="/digital-marketing" className="hover:text-foreground">
                  03. Digital Marketing &amp; SEO
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-wider">Client Portal</h3>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-muted-foreground">
              <li>
                <Link to="/account" className="hover:text-foreground font-semibold text-primary">
                  My Account &amp; Previous Applications
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-foreground">
                  Track Active Intake / Project
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-foreground">
                  Book 30-Min Strategy Call
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-foreground">
                  Sign In / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-wider">Legal &amp; Policy</h3>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-muted-foreground">
              <li>
                <Link to="/blog" className="hover:text-foreground font-semibold text-blue-600">
                  Blog &amp; Consular Guides
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} One World Solutions • Operating under <strong>ABHIPRIYA GROUPS LLC</strong> (E-Verified Entity). All rights reserved.</p>
          <p className="text-[11px]">Chicago, Illinois USA • Expedited Intake &amp; Digital Agency</p>
        </div>
      </div>
    </footer>
  );
}
