import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, Circle, FileText, Loader2, Search, Truck } from "lucide-react";
import { useState } from "react";

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
      { title: "Track My Application — Meridian Client Services" },
      {
        name: "description",
        content:
          "Enter your reference number or email to follow your application through government form preparation, VFS processing and courier delivery.",
      },
      { property: "og:title", content: "Track My Application" },
      {
        property: "og:description",
        content: "Live three-step status for your passport or visa application.",
      },
    ],
  }),
  component: TrackPage,
});

const STATUS_STYLES: Record<TrackStatus, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning-foreground",
  Completed: "bg-success/15 text-success",
};

function StepRow({
  icon: Icon,
  title,
  status,
  reference,
  last,
}: {
  icon: typeof FileText;
  title: string;
  status: TrackStatus;
  reference?: string | undefined;
  last?: boolean | undefined;
}) {
  const done = status === "Completed";
  return (
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4 pb-8 last:pb-0">
      {!last && <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-border" />}
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
          done ? "border-success bg-success/10 text-success" : "border-border bg-card text-muted-foreground"
        }`}
      >
        {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4.5 w-4.5" />}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
            {status}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {reference ? (
            <>
              Tracking reference: <strong className="text-foreground">{reference}</strong>
            </>
          ) : (
            "No tracking reference yet."
          )}
        </p>
      </div>
    </li>
  );
}

function TrackPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [lead, setLead] = useState<Lead | null>(null);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: replace with Supabase select by reference or email
    await lookupApplication(query);
    const q = query.trim().toLowerCase();
    const match = LEADS.find(
      (l) => l.reference.toLowerCase() === q || l.email.toLowerCase() === q,
    );
    setLead(match ?? null);
    setStatus(match ? "found" : "notfound");
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-extrabold sm:text-4xl">Track My Application</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Enter your reference number or the email you applied with. Try{" "}
          <strong className="text-foreground">REF-100241</strong>.
        </p>
      </header>

      <form onSubmit={search} className="surface-card space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="track-query">Reference number or email</Label>
          <Input
            id="track-query"
            required
            className="h-12"
            placeholder="REF-100241"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="h-12 w-full text-base" disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Find my application
        </Button>
      </form>

      {status === "notfound" && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">
          We couldn't find an application matching that reference or email. Double-check the details
          or ask our assistant for help.
        </div>
      )}

      {status === "found" && lead && (
        <div className="surface-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{lead.service}</p>
              <h2 className="truncate text-xl font-bold">{lead.reference}</h2>
            </div>
            <Badge variant="secondary">{lead.status}</Badge>
          </div>
          <ol className="mt-6">
            <StepRow
              icon={FileText}
              title="Government Form Status"
              status={lead.tracking.governmentForm.status}
              reference={lead.tracking.governmentForm.ref}
            />
            <StepRow
              icon={Building2}
              title="VFS Tracking"
              status={lead.tracking.vfs.status}
              reference={lead.tracking.vfs.ref}
            />
            <StepRow
              icon={Truck}
              title="FedEx / Courier Tracking"
              status={lead.tracking.courier.status}
              reference={lead.tracking.courier.ref}
              last
            />
          </ol>
        </div>
      )}

      {status === "idle" && (
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-input bg-muted/40 p-5 text-sm text-muted-foreground">
          <Circle className="h-4 w-4 shrink-0" />
          Your three-step status appears here once we find your application.
        </div>
      )}

      <TrustBanner />
    </main>
  );
}
