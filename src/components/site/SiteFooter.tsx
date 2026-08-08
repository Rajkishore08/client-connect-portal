import { Link } from "@tanstack/react-router";
import { Info, ShieldCheck } from "lucide-react";

import { OFFICE_LOCATION, TRUST_COPY } from "@/data/mock-data";

/** Inline disclaimer banner — repeat on every form page. */
export function TrustBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-border bg-primary-soft/70 p-4 text-sm leading-relaxed text-accent-foreground ${className}`}
    >
      <div className="flex gap-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="min-w-0 space-y-2">
          <p className="font-medium">{TRUST_COPY.disclaimer}</p>
          <p className="text-muted-foreground">{TRUST_COPY.fees}</p>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="min-w-0 space-y-3">
            <Link to="/" className="inline-block">
              <img src="/logo-rect.png" alt="One World Solutions" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-xs font-semibold text-primary">
              Connecting People. Powering Businesses.
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {OFFICE_LOCATION.address}
            </p>
            <p className="text-xs font-semibold text-foreground">
              Direct Hotline: {OFFICE_LOCATION.phone} (Available Today)
            </p>
            <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground">
              {TRUST_COPY.disclaimer}
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
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-foreground text-muted-foreground/70">
                  Admin Portal Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} One World Solutions. All rights reserved.</p>
          <p className="text-[11px]">Chicago HQ Office • Expedited Intake &amp; Digital Agency</p>
        </div>
      </div>
    </footer>
  );
}
