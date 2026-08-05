import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Megaphone,
  MonitorSmartphone,
  Passport,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PASSPORT_SERVICES, WEB_SERVICES } from "@/data/mock-data";

/* ------------------------- Passport sub-services ------------------------- */

export function PassportList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PASSPORT_SERVICES.map((service) => (
        <Link
          key={service.slug}
          to="/passport/$service"
          params={{ service: service.slug }}
          className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-[var(--shadow-card)]"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
            <Passport className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{service.title}</span>
              {service.urgent && (
                <Badge variant="destructive" className="text-[10px]">
                  Urgent
                </Badge>
              )}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </span>
          </span>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>
      ))}
    </div>
  );
}

/* ---------------------------- Digital Marketing -------------------------- */

export function MarketingPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-xl border border-dashed border-input bg-muted/40 p-5">
        <Badge variant="secondary" className="mb-3">
          <Sparkles className="mr-1 h-3 w-3" /> Coming soon
        </Badge>
        <h3 className="text-lg font-bold">Sub-services coming soon — tell us what you need</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We're finalising our digital marketing catalog. Send us a short note and we'll come back
          with a tailored recommendation for your goals and budget.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <EnquiryForm
          category="Digital Marketing"
          service="General Enquiry"
          briefLabel="Brief description"
        />
      </div>
    </div>
  );
}

/* --------------------------- Website Development ------------------------- */

function WebServiceCard({ slug, title, description }: { slug: string; title: string; description: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-[var(--shadow-card)]">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
            Request a Quote
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Detailed quotes provided after a scoping call. Tell us about the project.
            </DialogDescription>
          </DialogHeader>
          <EnquiryForm category="Website Development" service={title} />
          <input type="hidden" value={slug} readOnly />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function WebServiceGrid() {
  const experiences = WEB_SERVICES.filter((s) => s.group === "experiences");
  const software = WEB_SERVICES.filter((s) => s.group === "software");

  return (
    <div className="space-y-8">
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Globe2 className="h-4 w-4" /> Websites &amp; Digital Experiences
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {experiences.map((s) => (
            <WebServiceCard key={s.slug} {...s} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <MonitorSmartphone className="h-4 w-4" /> Custom Software &amp; Enterprise
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {software.map((s) => (
            <WebServiceCard key={s.slug} {...s} />
          ))}
        </div>
      </section>
      <p className="text-sm text-muted-foreground">
        No pricing is listed — detailed quotes provided after a scoping call.
      </p>
    </div>
  );
}

/* ------------------------ Two-level category explorer -------------------- */

const CATEGORY_UI = [
  {
    slug: "passport" as const,
    title: "Passport & Visa Services",
    blurb: "6 services — renewals, OCI, surrender, emergency, e-visa, lost passports.",
    icon: Passport,
    render: () => <PassportList />,
    href: "/passport" as const,
  },
  {
    slug: "digital-marketing" as const,
    title: "Digital Marketing",
    blurb: "Catalog being finalised — tell us what you need.",
    icon: Megaphone,
    render: () => <MarketingPanel />,
    href: "/digital-marketing" as const,
  },
  {
    slug: "web-development" as const,
    title: "Website Development",
    blurb: "9 services across digital experiences and custom software.",
    icon: MonitorSmartphone,
    render: () => <WebServiceGrid />,
    href: "/web-development" as const,
  },
];

export function CategoryExplorer() {
  const [open, setOpen] = useState<string | null>("passport");

  return (
    <div className="space-y-4">
      {CATEGORY_UI.map((cat) => {
        const isOpen = open === cat.slug;
        return (
          <div key={cat.slug} className="surface-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : cat.slug)}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5 text-left transition-colors hover:bg-muted/50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <cat.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-base font-bold sm:text-lg">
                  {cat.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{cat.blurb}</span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border p-5">
                  {cat.render()}
                  <div className="mt-5">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={cat.href}>
                        Open full {cat.title} page <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
