import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  Code,
  Compass,
  FileCheck,
  Globe,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  Plane,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OFFICE_LOCATION, PASSPORT_SERVICES } from "@/data/mock-data";

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

      {/* Main Clean Navigation Bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <span className="block truncate font-display text-base font-bold leading-tight text-foreground">
              One World Solutions
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Client Services &amp; Expedited Intake
            </span>
          </div>
        </Link>

        {/* Desktop Simplified Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          {/* Services Mega Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer outline-none"
              >
                <span>Services</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[320px] p-2 shadow-[var(--shadow-lift)]">
              <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                All Service Categories
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Passport & Visa Group */}
              <div className="py-1">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-primary">
                  <Plane className="h-3.5 w-3.5" /> Passport &amp; Visa Services
                </div>
                {PASSPORT_SERVICES.slice(0, 4).map((s) => (
                  <DropdownMenuItem key={s.slug} asChild>
                    <Link
                      to="/passport/$service"
                      params={{ service: s.slug }}
                      className="cursor-pointer text-xs pl-6 py-1.5"
                    >
                      {s.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/passport" className="cursor-pointer text-xs pl-6 font-semibold text-primary">
                    View All Passport &amp; Visa Services →
                  </Link>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              {/* Digital Marketing */}
              <DropdownMenuItem asChild>
                <Link to="/digital-marketing" className="cursor-pointer text-xs py-2 font-medium flex items-center gap-2">
                  <Megaphone className="h-3.5 w-3.5 text-accent" /> Digital Marketing Services
                </Link>
              </DropdownMenuItem>

              {/* Web Development */}
              <DropdownMenuItem asChild>
                <Link to="/web-development" className="cursor-pointer text-xs py-2 font-medium flex items-center gap-2">
                  <Code className="h-3.5 w-3.5 text-primary" /> Website &amp; Enterprise Development
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/track"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Track Application
          </Link>

          <Button asChild size="sm" className="ml-3 font-bold">
            <Link to="/book">Book a Consultation</Link>
          </Button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto">
            <div className="mt-6 flex flex-col gap-2">
              <div className="mb-2 rounded-xl bg-muted/60 p-3 text-xs">
                <p className="font-bold text-foreground">{OFFICE_LOCATION.walkInStatus}</p>
                <p className="mt-1 text-muted-foreground">{OFFICE_LOCATION.address}</p>
              </div>

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                Home
              </Link>

              {/* Mobile Accordion Menu */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="services-accordion" className="border-none">
                  <AccordionTrigger className="py-2.5 px-3 text-base font-medium text-foreground hover:no-underline hover:bg-muted rounded-lg">
                    <span>Services &amp; Categories</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 pt-1 space-y-1">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider py-1">
                      Passport &amp; Visa
                    </div>
                    {PASSPORT_SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to="/passport/$service"
                        params={{ service: s.slug }}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        {s.title}
                      </Link>
                    ))}

                    <div className="text-xs font-bold text-accent uppercase tracking-wider pt-3 py-1">
                      Digital &amp; Web
                    </div>
                    <Link
                      to="/digital-marketing"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Digital Marketing
                    </Link>
                    <Link
                      to="/web-development"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Website Development
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                to="/track"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                Track Application
              </Link>

              <Button asChild className="mt-4 h-12 text-base font-bold">
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
