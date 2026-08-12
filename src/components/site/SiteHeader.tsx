import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Clock,
  Code,
  Code2,
  FileText,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  Phone,
  PhoneCall,
  Plane,
  Search,
  ShieldCheck,
  TrendingUp,
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

import { motion } from "framer-motion";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, unreadCount, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 pointer-events-none">
      {/* Top Location & Hotline Bar */}
      <div
        className={`bg-slate-900 text-slate-200 px-2 text-xs sm:px-6 border-b border-slate-800 transition-all duration-300 overflow-hidden pointer-events-auto ${
          scrolled ? "max-h-0 opacity-0 py-0 border-none" : "max-h-12 opacity-100 py-1.5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 text-[10px] sm:text-xs px-1 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-white truncate">
              <MapPin className="h-3 w-3 text-primary shrink-0" /> Chicago, Illinois USA
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="https://wa.me/14175690711"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors text-[10px] sm:text-xs"
            >
              <MessageSquare className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>WhatsApp: +1 (417) 569-0711</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href={`tel:${OFFICE_LOCATION.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden sm:flex items-center gap-1 font-bold text-white hover:text-primary transition-colors text-[10px] sm:text-xs"
            >
              <PhoneCall className="h-3 w-3 text-primary shrink-0" />
              <span>{OFFICE_LOCATION.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Capsule Header Container with Smooth Spring Layout Animation */}
      <div className="px-3 sm:px-6 w-full flex justify-center">
        <motion.div
          layout
          initial={false}
          animate={{
            maxWidth: scrolled ? "1120px" : "1440px",
            borderRadius: scrolled ? "9999px" : "16px",
            paddingTop: scrolled ? "8px" : "12px",
            paddingBottom: scrolled ? "8px" : "12px",
            paddingLeft: scrolled ? "24px" : "24px",
            paddingRight: scrolled ? "24px" : "24px",
            marginTop: scrolled ? "6px" : "4px",
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.88)" : "rgba(255, 255, 255, 0.95)",
            boxShadow: scrolled
              ? "0 20px 30px -10px rgba(15, 23, 42, 0.12), 0 10px 15px -5px rgba(15, 23, 42, 0.08)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.7,
          }}
          className={`pointer-events-auto flex items-center justify-between w-full border backdrop-blur-xl ${
            scrolled ? "border-slate-200/90" : "border-slate-200/60"
          }`}
        >
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2 group py-0.5 shrink-0 max-w-[70%] sm:max-w-none">
            <img
              src="/logo-rect.webp"
              alt="One World Solutions"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] shrink-0 ${
                scrolled ? "h-6 sm:h-8" : "h-7 sm:h-10 lg:h-11 max-h-12"
              }`}
            />
          </Link>

        {/* Desktop Navigation — Matching Lovable Design Specs */}
        <nav className="hidden items-center gap-2 lg:flex shrink-0">
          <Link
            to="/"
            activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
            className="rounded-full px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
          >
            Home
          </Link>

          {/* Animated Services 3-Category Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full px-4 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-primary flex items-center gap-1 cursor-pointer whitespace-nowrap outline-none">
                <span>Services</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <DropdownMenuLabel className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                Our 3 Core Service Divisions
              </DropdownMenuLabel>
              
              {/* Category 1: Passport & Visa Services */}
              <DropdownMenuItem asChild className="rounded-xl p-2.5 cursor-pointer focus:bg-blue-50 focus:text-slate-900 hover:bg-blue-50 data-[highlighted]:bg-blue-50 transition-colors group">
                <Link to="/passport" className="flex items-start gap-3">
                  <span className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 grid place-items-center shrink-0 transition-transform group-hover:scale-105">
                    <Plane className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                      Passport &amp; Visa Concierge
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      Expedited renewals, OCI cards &amp; e-visas
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>

              {/* Category 2: Custom Software & SaaS */}
              <DropdownMenuItem asChild className="rounded-xl p-2.5 cursor-pointer focus:bg-blue-50 focus:text-slate-900 hover:bg-blue-50 data-[highlighted]:bg-blue-50 transition-colors group">
                <Link to="/web-development" className="flex items-start gap-3">
                  <span className="h-9 w-9 rounded-xl bg-slate-100 text-slate-800 grid place-items-center shrink-0 transition-transform group-hover:scale-105">
                    <Code2 className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                      Custom Software &amp; SaaS
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      Enterprise web apps, ERPs &amp; APIs
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>

              {/* Category 3: Digital Growth & Marketing */}
              <DropdownMenuItem asChild className="rounded-xl p-2.5 cursor-pointer focus:bg-blue-50 focus:text-slate-900 hover:bg-blue-50 data-[highlighted]:bg-blue-50 transition-colors group">
                <Link to="/digital-marketing" className="flex items-start gap-3">
                  <span className="h-9 w-9 rounded-xl bg-rose-100 text-rose-700 grid place-items-center shrink-0 transition-transform group-hover:scale-105">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                      Digital Growth &amp; Marketing
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      SEO, PPC ads &amp; brand growth campaigns
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/track"
            activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
            className="rounded-full px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
          >
            Track Application
          </Link>

          <Link
            to="/admin"
            activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
            className="rounded-full px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
          >
            Admin Portal
          </Link>

          {/* Right Header Book Consultation Pill Button */}
          <Button asChild size="sm" className="rounded-full bg-primary hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 shadow-md shadow-primary/20 transition-transform active:scale-95 ml-2 cursor-pointer">
            <Link to="/book">Book Consultation</Link>
          </Button>
        </nav>

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
      </motion.div>
    </div>
  </header>
);
}
