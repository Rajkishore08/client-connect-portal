"use client";

import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarCheck,
  ChevronRight,
  Code2,
  FileText,
  HelpCircle,
  Megaphone,
  MessageSquare,
  PhoneCall,
  Plane,
  Search,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

/**
 * ONE Unified Glassmorphic Bottom Navigation Menu for Mobile
 * Combines Direct HQ Calling, WhatsApp, Intake Tracker, Services/Blogs, and Booking.
 */
export function BottomMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elementRef] = useMeasure();
  const [hiddenRef, hiddenBounds] = useMeasure();
  const [view, setView] = useState<"default" | "call" | "whatsapp" | "track" | "services" | "book">(
    "default"
  );
  const [trackInput, setTrackInput] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setView("default");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sharedHover =
    "group transition-all duration-75 px-3.5 py-2.5 text-[13px] font-bold text-slate-700 w-full text-left rounded-xl hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between cursor-pointer";

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return null;

      case "call":
        return (
          <div className="space-y-2 min-w-[260px] p-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <PhoneCall className="h-4 w-4 text-blue-600" /> Direct Office Hotline
              </span>
              <button
                type="button"
                onClick={() => setView("default")}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Speak directly with our Chicago consular specialists or tech project managers.
            </p>
            <a
              href="tel:+14175690711"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
            >
              <PhoneCall className="h-4 w-4" /> Call +1 (417) 569-0711
            </a>
          </div>
        );

      case "whatsapp":
        return (
          <div className="space-y-2 min-w-[260px] p-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-emerald-700">
                <MessageSquare className="h-4 w-4 text-emerald-600" /> WhatsApp Support Desk
              </span>
              <button
                type="button"
                onClick={() => setView("default")}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Instant 24-hour response for urgent passport renewals and project inquiries.
            </p>
            <a
              href="https://wa.me/14175690711"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        );

      case "track":
        return (
          <div className="space-y-2.5 min-w-[280px] p-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Search className="h-4 w-4 text-amber-500" /> Track Active Intake
              </span>
              <button
                type="button"
                onClick={() => setView("default")}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Intake Ref (e.g. OWS-889124)"
                className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
              />
            </div>
            <Link
              to="/track"
              onClick={() => setView("default")}
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-xs"
            >
              Open Live Tracker <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        );

      case "services":
        return (
          <div className="space-y-1 min-w-[260px] p-2 text-xs">
            <Link
              to="/passport"
              onClick={() => setView("default")}
              className={sharedHover}
            >
              <span className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-blue-600" /> Passport &amp; Consular
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              to="/web-development"
              onClick={() => setView("default")}
              className={sharedHover}
            >
              <span className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-slate-700" /> Web &amp; Software SaaS
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              to="/digital-marketing"
              onClick={() => setView("default")}
              className={sharedHover}
            >
              <span className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-rose-600" /> Digital Marketing &amp; PPC
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              to="/blog"
              onClick={() => setView("default")}
              className={sharedHover}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-500" /> SEO Blogs &amp; Guides
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        );

      case "book":
        return (
          <div className="space-y-2 min-w-[260px] p-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-blue-600" /> Schedule Visit / Call
              </span>
              <button
                type="button"
                onClick={() => setView("default")}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Book a 15-minute consultation at our Chicago office or online via video call.
            </p>
            <Link
              to="/book"
              onClick={() => setView("default")}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
            >
              <CalendarCheck className="h-4 w-4" /> Book Consultation
            </Link>
          </div>
        );

      default:
        return null;
    }
  }, [view, trackInput]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center select-none w-full max-w-sm")}
    >
      {/* Hidden container for size measurement */}
      <div
        ref={hiddenRef}
        className="absolute left-[-9999px] top-[-9999px] invisible pointer-events-none"
      >
        <div className="rounded-3xl bg-white/95 border border-slate-200 py-1">
          {content}
        </div>
      </div>

      {/* Animated Submenu Modal Card */}
      <AnimatePresence mode="wait">
        {view !== "default" && (
          <motion.div
            key="submenu"
            initial={{
              opacity: 0,
              scaleY: 0.9,
              scaleX: 0.95,
              height: 0,
              width: 0,
              originY: 1,
              originX: 0.5,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
              scaleX: 1,
              height: hiddenBounds.height || "auto",
              width: hiddenBounds.width || "auto",
              originY: 1,
              originX: 0.5,
            }}
            exit={{
              opacity: 0,
              scaleY: 0.9,
              scaleX: 0.95,
              height: 0,
              width: 0,
              originY: 1,
              originX: 0.5,
            }}
            transition={{
              duration: 0.25,
              ease: [0.45, 0, 0.25, 1],
            }}
            style={{
              transformOrigin: "bottom center",
            }}
            className="absolute bottom-[68px] overflow-hidden z-50 shadow-2xl"
          >
            <div
              ref={elementRef}
              className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={view}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(12px)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="py-1"
                >
                  {content}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ONE SINGLE UNIFIED LIGHT GLASSMORPHIC BAR (< 640px) */}
      <div className="flex items-center justify-between gap-1 w-full bg-white/85 backdrop-blur-xl border border-slate-200/90 rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10">
        {/* 1. Call HQ */}
        <button
          type="button"
          onClick={() => setView(view === "call" ? "default" : "call")}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all cursor-pointer ${
            view === "call"
              ? "bg-blue-50 text-blue-700 font-bold scale-105 border border-blue-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
          }`}
        >
          <PhoneCall className="h-4 w-4 text-blue-600 mb-0.5" />
          <span className="text-[9px] font-bold tracking-tight">Call HQ</span>
        </button>

        {/* 2. WhatsApp */}
        <button
          type="button"
          onClick={() => setView(view === "whatsapp" ? "default" : "whatsapp")}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all cursor-pointer ${
            view === "whatsapp"
              ? "bg-emerald-50 text-emerald-700 font-bold scale-105 border border-emerald-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
          }`}
        >
          <MessageSquare className="h-4 w-4 text-emerald-600 mb-0.5" />
          <span className="text-[9px] font-bold tracking-tight">WhatsApp</span>
        </button>

        {/* 3. Track */}
        <button
          type="button"
          onClick={() => setView(view === "track" ? "default" : "track")}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all cursor-pointer ${
            view === "track"
              ? "bg-amber-50 text-amber-800 font-bold scale-105 border border-amber-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
          }`}
        >
          <Search className="h-4 w-4 text-amber-600 mb-0.5" />
          <span className="text-[9px] font-bold tracking-tight">Track</span>
        </button>

        {/* 4. Services Catalog & Blogs */}
        <button
          type="button"
          onClick={() => setView(view === "services" ? "default" : "services")}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all cursor-pointer ${
            view === "services"
              ? "bg-blue-50 text-blue-700 font-bold scale-105 border border-blue-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
          }`}
        >
          <BookOpen className="h-4 w-4 text-blue-600 mb-0.5" />
          <span className="text-[9px] font-bold tracking-tight">Services</span>
        </button>

        {/* 5. Book Consultation */}
        <button
          type="button"
          onClick={() => setView(view === "book" ? "default" : "book")}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all cursor-pointer ${
            view === "book"
              ? "bg-blue-700 text-white font-extrabold scale-105 shadow-md shadow-blue-600/30"
              : "bg-blue-600 text-white hover:bg-blue-700 font-extrabold shadow-sm"
          }`}
        >
          <CalendarCheck className="h-4 w-4 mb-0.5" />
          <span className="text-[9px] font-extrabold tracking-tight">Book</span>
        </button>
      </div>
    </div>
  );
}

export default BottomMenu;
