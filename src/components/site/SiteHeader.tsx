import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Code,
  FileText,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  Phone,
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
            <span className="hidden md:inline">{OFFICE_LOCATION.hours}</span>
            <a
              href={`tel:${OFFICE_LOCATION.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1 font-bold hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              {OFFICE_LOCATION.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-black leading-tight tracking-tight text-foreground">
              One World Solutions
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">
              Client Services &amp; Expedited Intake
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            activeProps={{ className: "bg-primary-soft text-primary font-bold" }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          {/* Accordion / Accordion Gallery Dropdown Menu for Services */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                Services <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 p-2">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground">
                POPULAR PASSPORT &amp; VISA
              </DropdownMenuLabel>
              <div className="space-y-1">
                {PASSPORT_SERVICES.slice(0, 4).map((s) => (
                  <DropdownMenuItem key={s.slug} asChild>
                    <Link
                      to="/passport/$service"
                      params={{ service: s.slug }}
                      className="cursor-pointer text-xs pl-3 py-1.5 font-medium"
                    >
                      {s.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/passport" className="cursor-pointer text-xs pl-3 py-1.5 font-bold text-primary">
                    View All 6 Passport Services →
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
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
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
