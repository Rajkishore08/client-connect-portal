import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Clock,
  Code,
  FileText,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, unreadCount, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Top Location & Hotline Bar */}
      <div className="bg-slate-900 text-slate-200 px-2 py-1.5 text-xs sm:px-6 border-b border-slate-800">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 text-[10px] sm:text-xs px-1 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium truncate">
              <MapPin className="h-3 w-3 text-primary shrink-0" /> Chicago HQ
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> Open Today (9AM - 6PM)
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${OFFICE_LOCATION.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1 font-bold text-white hover:text-primary transition-colors text-[10px] sm:text-xs"
            >
              <PhoneCall className="h-3 w-3 text-primary shrink-0" />
              <span>{OFFICE_LOCATION.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-2.5 sm:px-6 lg:px-10 py-2.5 sm:py-3">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2 group py-0.5 shrink-0 max-w-[70%] sm:max-w-none">
          <img
            src="/logo-rect.webp"
            alt="One World Solutions"
            className="h-7 sm:h-10 lg:h-11 max-h-12 w-auto object-contain transition-transform group-hover:scale-[1.02] shrink-0"
          />
        </Link>

        {/* Desktop Navigation — Responsive Breakdown for lg and xl */}
        <nav className="hidden items-center gap-1 lg:flex shrink-0">
          <Link
            to="/"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
          >
            Home
          </Link>

          {/* Service 01: Passport & Visa */}
          <Link
            to="/passport"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Passport &amp; Visa</span>
          </Link>

          {/* Service 02: Software & Web Dev */}
          <Link
            to="/web-development"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
          >
            <Code className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Software &amp; Web Dev</span>
          </Link>

          {/* Service 03: Digital Marketing */}
          <Link
            to="/digital-marketing"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap"
          >
            <Megaphone className="h-3.5 w-3.5 text-accent shrink-0" />
            <span>Digital Marketing</span>
          </Link>

          {/* Accordion / Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground whitespace-nowrap">
                <span>Services</span> <ChevronDown className="h-3.5 w-3.5 opacity-70 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2 space-y-1 glass-panel">
              {/* Pillar 1: Passport & Visa */}
              <DropdownMenuLabel className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                01. PASSPORT &amp; VISA CONCIERGE
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/passport" className="cursor-pointer text-xs py-1.5 font-bold flex items-center justify-between">
                  <span>Explore Passport &amp; OCI Services</span>
                  <span className="text-[10px] text-muted-foreground font-normal">6 Services →</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Pillar 2: Web & Custom Software */}
              <DropdownMenuLabel className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                02. WEB &amp; CUSTOM SOFTWARE DEV
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/web-development" className="cursor-pointer text-xs py-1.5 font-bold flex items-center justify-between">
                  <span>Web Apps, SaaS &amp; UI/UX Design</span>
                  <span className="text-[10px] text-muted-foreground font-normal">Learn More →</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Pillar 3: Digital Marketing */}
              <DropdownMenuLabel className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                03. DIGITAL MARKETING &amp; GROWTH
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/digital-marketing" className="cursor-pointer text-xs py-1.5 font-bold flex items-center justify-between">
                  <span>SEO, PPC Ads &amp; Lead Growth</span>
                  <span className="text-[10px] text-muted-foreground font-normal">Learn More →</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/track"
            activeProps={{ className: "bg-primary text-primary-foreground font-bold shadow-xs" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft/80 border border-primary/20 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground shadow-2xs whitespace-nowrap shrink-0"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span>Track Application</span>
          </Link>

          {/* User Account / Sign In Controls */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-2 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card p-1.5 pr-3 text-xs font-bold text-foreground transition-all hover:bg-accent shadow-xs">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-lg object-cover" />
                  ) : (
                    <div className="h-7 w-7 rounded-lg bg-primary-soft text-primary font-bold grid place-items-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  {unreadCount > 0 && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-extrabold text-foreground">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer text-xs py-2 font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> My Previous Applications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer text-xs py-2 font-semibold flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" /> Session Alerts
                    {unreadCount > 0 && (
                      <Badge className="ml-auto text-[10px] h-4 px-1.5">{unreadCount}</Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-xs py-2 font-semibold text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="font-semibold text-xs">
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="font-bold text-xs shadow-xs">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <Button asChild size="sm" variant="outline" className="ml-2 font-bold text-xs border-primary/40 text-primary">
            <Link to="/book">Schedule Visit</Link>
          </Button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden rounded-xl border border-border/90 bg-card shadow-xs hover:bg-accent focus:ring-2 focus:ring-primary/30"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto">
            <div className="mt-6 flex flex-col gap-2">
              {/* User profile or sign in block in mobile */}
              {user ? (
                <div className="mb-2 rounded-2xl border border-border bg-card p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-xl object-cover" />
                    ) : (
                      <div className="h-9 w-9 rounded-xl bg-primary-soft text-primary font-bold grid place-items-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-xs text-destructive p-1.5 h-auto"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" size="sm" className="w-full text-xs font-bold">
                    <Link to="/auth/login" onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="w-full text-xs font-bold">
                    <Link to="/auth/signup" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}

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

              {user && (
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-bold text-primary hover:bg-muted flex items-center justify-between"
                >
                  <span>My Applications &amp; Alerts</span>
                  {unreadCount > 0 && <Badge className="text-[10px]">{unreadCount}</Badge>}
                </Link>
              )}

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
                      Website &amp; Web App Development
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

              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <Button asChild className="w-full h-11 text-base font-bold">
                  <Link to="/book" onClick={() => setOpen(false)}>
                    Schedule Visit / Call
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
