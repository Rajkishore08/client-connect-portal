import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Menu, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OFFICE_LOCATION } from "@/data/mock-data";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/passport", label: "Passport & Visa" },
  { to: "/digital-marketing", label: "Digital Marketing" },
  { to: "/web-development", label: "Website Development" },
  { to: "/track", label: "Track My Application" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Top Location & Hotline Bar */}
      <div className="bg-primary px-4 py-2 text-primary-foreground text-xs sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
              WALK-INS WELCOME
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 opacity-80" />
              {OFFICE_LOCATION.address}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden md:inline-flex items-center gap-1 opacity-90">
              <Clock className="h-3.5 w-3.5" />
              {OFFICE_LOCATION.hours}
            </span>
            <a
              href={`tel:${OFFICE_LOCATION.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 font-bold hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              {OFFICE_LOCATION.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight">
              One World Solutions
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Client Services &amp; Expedited Intake
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link to="/book">Book a Consultation</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm">
            <div className="mt-8 flex flex-col gap-1">
              <div className="mb-4 rounded-lg bg-muted p-3 text-xs">
                <p className="font-bold text-foreground">{OFFICE_LOCATION.walkInStatus}</p>
                <p className="mt-1 text-muted-foreground">{OFFICE_LOCATION.address}</p>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-3 h-12 text-base">
                <Link to="/book" onClick={() => setOpen(false)}>
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
