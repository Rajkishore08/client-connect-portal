import { Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Code2,
  FileText,
  Globe,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  PhoneCall,
  Plane,
  ShieldCheck,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-40 w-full max-w-[1440px] mx-auto px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Glass Capsule Navbar */}
      <div className="pointer-events-auto w-full rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-blue-950/5 px-4 sm:px-6 py-2 transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Rectangular Logo */}
          <Link to="/" className="flex items-center gap-2 group py-0.5 shrink-0">
            <img
              src="/logo-rect.webp"
              alt="One World Solutions"
              className="h-7 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              preload="intent"
              activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
              className="rounded-full px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
            >
              Home
            </Link>

            <Link
              to="/passport"
              preload="intent"
              activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap flex items-center gap-1.5"
            >
              <Plane className="h-3.5 w-3.5 text-blue-600" /> Passport Services
            </Link>

            <Link
              to="/web-development"
              preload="intent"
              activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap flex items-center gap-1.5"
            >
              <Code2 className="h-3.5 w-3.5 text-blue-600" /> Custom Software &amp; Web
            </Link>

            <Link
              to="/digital-marketing"
              preload="intent"
              activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap flex items-center gap-1.5"
            >
              <TrendingUp className="h-3.5 w-3.5 text-blue-600" /> Digital Marketing
            </Link>

            <Link
              to="/track"
              preload="intent"
              activeProps={{ className: "bg-blue-50 text-blue-600 font-bold" }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
            >
              Track Application
            </Link>
          </nav>

          {/* Right Header Desktop Controls */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 text-xs font-bold text-slate-900 hover:bg-slate-50 cursor-pointer shadow-2xs">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-lg object-cover" />
                    ) : (
                      <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 font-bold grid place-items-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 bg-white z-[9999]">
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-xs font-extrabold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" preload="intent" className="cursor-pointer text-xs py-2 font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" /> My Applications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-xs py-2 font-semibold text-red-600 flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1.5">
                <Button asChild variant="ghost" size="sm" className="font-bold text-xs">
                  <Link to="/auth/login" preload="intent">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs">
                  <Link to="/auth/signup" preload="intent">Sign Up</Link>
                </Button>
              </div>
            )}

            <Button asChild size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 shadow-sm ml-1 cursor-pointer">
              <Link to="/book" preload="intent">Book Call</Link>
            </Button>
          </div>

          {/* Mobile Right Bar Hamburger Menu Button (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border border-slate-200 bg-white font-bold text-xs gap-1.5 px-3 py-2 text-slate-900 shadow-2xs hover:bg-slate-100 cursor-pointer"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5 text-slate-900" />
                  <span className="font-extrabold text-xs">Menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto bg-white p-6 z-[9999]">
                <div className="flex flex-col gap-4 mt-4">
                  {/* User Profile or Auth Buttons in Drawer */}
                  {user ? (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 font-bold grid place-items-center">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{user.name}</p>
                          <p className="text-[10px] text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={logout} className="text-xs text-red-600">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="w-full font-bold text-xs">
                        <Link to="/auth/login" onClick={() => setOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                        <Link to="/auth/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}

                  {/* Navigation Accordion & Links */}
                  <div className="space-y-1 border-t border-slate-100 pt-3">
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100"
                    >
                      Home
                    </Link>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="services-mobile" className="border-none">
                        <AccordionTrigger className="px-3.5 py-2.5 text-sm font-bold text-slate-900 hover:no-underline">
                          Services Catalog
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 space-y-1 pt-1 pb-2">
                          <Link
                            to="/passport"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Passport &amp; Consular Services
                          </Link>
                          <Link
                            to="/web-development"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Website &amp; Web App Dev
                          </Link>
                          <Link
                            to="/digital-marketing"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Digital Growth &amp; PPC Marketing
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Link
                      to="/blog"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100"
                    >
                      Blog &amp; Consular Guides
                    </Link>

                    <Link
                      to="/track"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100"
                    >
                      Track Active Intake
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <Button asChild className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl">
                      <Link to="/book" onClick={() => setOpen(false)}>
                        Schedule Visit / Call
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
