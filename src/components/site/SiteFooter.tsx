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
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold">One World Solutions</span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {OFFICE_LOCATION.address}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Hotline: {OFFICE_LOCATION.phone}
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
              {TRUST_COPY.disclaimer}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/passport" className="hover:text-foreground">
                  Passport &amp; Visa
                </Link>
              </li>
              <li>
                <Link to="/digital-marketing" className="hover:text-foreground">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/web-development" className="hover:text-foreground">
                  Website Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/track" className="hover:text-foreground">
                  Track My Application
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-foreground">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-foreground">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal &amp; Policy</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} One World Solutions. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
