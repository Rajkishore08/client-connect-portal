import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Clock3,
  FileCheck2,
  FileText,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LEADS, type Lead, type TrackStatus } from "@/data/mock-data";
import { lookupApplication } from "@/lib/backend-stubs";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track My Intake & Project Status — One World Solutions Agency" },
      {
        name: "description",
        content:
          "Enter your reference number or email to follow your passport renewal, web software milestone, or digital marketing campaign in real time.",
      },
      { property: "og:title", content: "Track My Application & Project Status | One World Solutions" },
      {
        property: "og:description",
        content: "Live status tracking for passport, web dev, and digital marketing intakes.",
      },
    ],
  }),
  component: TrackPage,
});

const STAGES = [
  {
    stage: 1,
    title: "1. Intake Received & Logged",
    desc: "Application & uploaded documents logged into encrypted vault.",
    icon: FileText,
  },
  {
    stage: 2,
    title: "2. Senior Specialist Audit",
    desc: "VFS photo compliance, DS-82/Form XXII verification & queue prep.",
    icon: FileCheck2,
  },
  {
    stage: 3,
    title: "3. Government / VFS Queue Filing",
    desc: "Submitted via emergency hand-carry channels or direct API pipeline.",
    icon: Building2,
  },
  {
    stage: 4,
    title: "4. Final Handover & Dispatch",
    desc: "Tracking number issued via FedEx Priority or digital asset transfer.",
    icon: Truck,
  },
];

function TrackPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [lead, setLead] = useState<Lead | null>(null);

  const search = async (e: React.FormEvent, customRef?: string) => {
    if (e) e.preventDefault();
    const searchQuery = customRef || query;
    if (!searchQuery.trim()) return;

    setStatus("loading");
    await lookupApplication(searchQuery);
    const q = searchQuery.trim().toLowerCase();
    const match = LEADS.find(
      (l) => l.reference.toLowerCase() === q || l.email.toLowerCase() === q,
    );
    setLead(match ?? null);
    setStatus(match ? "found" : "notfound");
  };

  const simulateSmsAlert = (stageName: string, ref: string) => {
    toast.custom((t) => (
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-2xl space-y-2 max-w-sm">
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-600 text-white text-[10px] uppercase font-bold flex items-center gap-1">
            <MessageSquare className="h-3 w-3" /> Live SMS Simulator
          </Badge>
          <span className="text-[10px] text-slate-400">Just now</span>
        </div>
        <p className="text-xs font-bold text-slate-100">One World Notification for #{ref}</p>
        <p className="text-xs text-slate-300">
          Your case status has advanced to: <strong className="text-blue-400">{stageName}</strong>. Our senior consultant will review your file on your consultation slot.
        </p>
      </div>
    ));
  };

  const simulateEmailAlert = (stageName: string, ref: string) => {
    toast.custom((t) => (
      <div className="bg-white text-slate-900 p-4 rounded-2xl border border-blue-200 shadow-2xl space-y-2 max-w-sm">
        <div className="flex items-center justify-between">
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] uppercase font-bold flex items-center gap-1">
            <Mail className="h-3 w-3" /> Email Alert Dispatch
          </Badge>
          <span className="text-[10px] text-slate-400">Just now</span>
        </div>
        <p className="text-xs font-bold text-slate-900">Official Case Update — #{ref}</p>
        <p className="text-xs text-slate-600">
          Stage verified: <strong className="text-emerald-700">{stageName}</strong>. Document verification report generated.
        </p>
      </div>
    ));
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="glass-pill text-xs font-semibold text-primary border-primary/30 px-3.5 py-1">
          REAL-TIME INTAKE &amp; PROJECT TRACKER
        </Badge>
        <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 font-display">
          Track Your Intake Status
        </h1>
        <p className="text-sm text-slate-600 font-normal leading-relaxed">
          Enter your reference number (e.g. <button type="button" onClick={(e) => { setQuery("REF-100241"); search(e, "REF-100241"); }} className="text-primary font-bold hover:underline cursor-pointer">REF-100241</button> or <button type="button" onClick={(e) => { setQuery("REF-849201"); search(e, "REF-849201"); }} className="text-primary font-bold hover:underline cursor-pointer">REF-849201</button>) or email address to view stage progress.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={(e) => search(e)} className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xl space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="track-query" className="text-xs font-bold text-slate-700">Reference Number or Email Address</Label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="track-query"
              required
              className="h-12 text-sm pl-11 bg-slate-50 border-slate-200"
              placeholder="e.g. REF-100241 or rahul@example.com"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Quick Samples:</span>
            <button
              type="button"
              onClick={(e) => { setQuery("REF-100241"); search(e, "REF-100241"); }}
              className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              REF-100241
            </button>
            <button
              type="button"
              onClick={(e) => { setQuery("REF-849201"); search(e, "REF-849201"); }}
              className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              REF-849201
            </button>
          </div>

          <Button type="submit" className="h-11 px-7 font-bold bg-primary hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer ml-auto" disabled={status === "loading"}>
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Track Case Progress
          </Button>
        </div>
      </form>

      {/* Result Cards */}
      {status === "notfound" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-xs sm:text-sm text-red-800 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-red-600" /> Reference Not Found
          </p>
          <p>
            We couldn't find an application matching <strong className="text-slate-900">"{query}"</strong>. Double-check your reference number or use our AI assistant for instant lookup.
          </p>
        </div>
      )}

      {status === "found" && lead && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Top Summary Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{lead.category}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-0.5">{lead.service}</h2>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>Applicant: <strong>{lead.name}</strong></span>
                <span>•</span>
                <span className="font-mono text-slate-700 font-bold">#{lead.reference}</span>
              </p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-300 text-xs px-3.5 py-1.5 font-bold uppercase tracking-wider">
              {lead.status}
            </Badge>
          </div>

          {/* Interactive 4-Stage Horizontal Progress Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Application Stage Progression</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {STAGES.map((s) => {
                const Icon = s.icon;
                const completed = s.stage <= (lead.status === "Closed" ? 4 : lead.status === "In Progress" ? 2 : 1);
                const active = s.stage === (lead.status === "Closed" ? 4 : lead.status === "In Progress" ? 2 : 1);
                return (
                  <div
                    key={s.stage}
                    className={`p-4 rounded-2xl border transition-all ${
                      active
                        ? "bg-blue-50/90 border-primary shadow-sm ring-2 ring-primary/30"
                        : completed
                        ? "bg-slate-50 border-slate-200 text-slate-800"
                        : "bg-white border-slate-100 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`h-8 w-8 rounded-xl grid place-items-center ${active ? "bg-primary text-white" : completed ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {completed ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">Stage 0{s.stage}</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-bold text-slate-900">{s.title}</p>
                      <p className="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Tracking Details */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Detailed Module Verification</h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-bold text-slate-900">Government Form Preparation</p>
                    <p className="text-[11px] text-slate-500">Form DS-82 / Form XXII Audit</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 font-bold">
                  {lead.tracking.governmentForm.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-bold text-slate-900">VFS / Embassy Filing Queue</p>
                    <p className="text-[11px] text-slate-500">Tracking Ref: {lead.tracking.vfs.ref || "Pending Intake Call"}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 font-bold">
                  {lead.tracking.vfs.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-bold text-slate-900">Courier / Expedited Handover</p>
                    <p className="text-[11px] text-slate-500">Tracking Ref: {lead.tracking.courier.ref || "Dispatched upon verification"}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 font-bold">
                  {lead.tracking.courier.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* SMS / Email Notification Simulator Actions */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="h-4 w-4" /> Live Notification Simulator
              </p>
              <span className="text-[10px] text-slate-500 font-medium">Test Instant Client Alerts</span>
            </div>
            <p className="text-xs text-slate-600">
              Test how clients receive SMS and email status updates when milestones advance:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => simulateSmsAlert("Senior Specialist Audit Completed", lead.reference)}
                className="bg-white text-xs font-bold text-slate-800 hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-blue-600" /> Simulate SMS Update
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => simulateEmailAlert("VFS Queue Filing Verified", lead.reference)}
                className="bg-white text-xs font-bold text-slate-800 hover:bg-emerald-600 hover:text-white cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5 mr-1.5 text-emerald-600" /> Simulate Email Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}

      {status === "idle" && (
        <div className="p-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
          <Clock className="h-8 w-8 text-primary mx-auto opacity-80" />
          <h3 className="text-sm font-bold text-slate-900">Ready to Track Your Intake</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Enter your reference number or email above to view real-time stage progress, document verification statuses, and courier tracking details.
          </p>
        </div>
      )}

      <TrustBanner />
    </main>
  );
}
