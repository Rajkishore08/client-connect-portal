import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
} from "lucide-react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OFFICE_LOCATION } from "@/data/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Leadership Team | One World Solutions" },
      {
        name: "description",
        content:
          "Meet the leadership and consular engineering specialists behind One World Solutions (ABHIPRIYA GROUPS LLC). Headquartered in Chicago, IL.",
      },
      { property: "og:title", content: "About Us & Leadership Team | One World Solutions" },
      { property: "og:description", content: "Operating under ABHIPRIYA GROUPS LLC (E-Verified Entity). Chicago HQ." },
      { property: "og:url", content: "https://www.oneworldsolutionsusa.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.oneworldsolutionsusa.com/about" }],
  }),
  component: AboutPage,
});

const TEAM_MEMBERS = [
  {
    name: "Elena Rostova",
    role: "Senior Consular & Visa Operations Specialist",
    credentials: "12+ Years Experience • Former Embassy Document Auditor",
    bio: "Specializes in complex international passport renewals, OCI applications, and urgent consular surrender filings with guaranteed zero-rejection accuracy.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
  },
  {
    name: "Alex Rivera",
    role: "Lead Full-Stack & SaaS Architect",
    credentials: "B.S. Computer Science (Northwestern) • Ex-Enterprise Software Lead",
    bio: "Architects scalable React/Next.js platforms, Supabase real-time databases, and custom AI agent integrations for enterprise clients nationwide.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Digital Growth & PPC Strategy",
    credentials: "Google Ads Certified Professional • Meta Blueprint Specialist",
    bio: "Drives high-intent lead generation campaigns, conversion rate optimization, and multi-channel attribution for service businesses nationwide.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
  },
];

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 pt-24 sm:pt-32 pb-16 sm:px-6">
      {/* Header Banner */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <Badge variant="outline" className="text-xs font-bold text-blue-700 border-blue-300">
            OUR STORY &amp; LEADERSHIP
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> ABHIPRIYA GROUPS LLC • E-Verified
          </span>
        </div>

        <h1 className="text-3xl font-black sm:text-5xl text-foreground tracking-tight">
          Connecting People. <br className="hidden sm:inline" />
          <span className="text-primary underline decoration-primary/30 underline-offset-4">
            Powering Businesses.
          </span>
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          One World Solutions operates as a specialized division under <strong>ABHIPRIYA GROUPS LLC</strong>, a registered United States entity. We combine expedited consular paperwork handling, custom web software engineering, and high-ROI digital marketing into one transparent client portal.
        </p>
      </header>

      {/* Trust & Entity Highlights */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-blue-100 text-blue-700 grid place-items-center mb-3">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">E-Verified Entity</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Operating under legal entity <strong>ABHIPRIYA GROUPS LLC</strong>. Fully compliant with US federal and state standards.
          </p>
        </div>

        <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 grid place-items-center mb-3">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Chicago Headquarters</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Address: <strong>{OFFICE_LOCATION.address}</strong><br />
            Phone: <strong>{OFFICE_LOCATION.phone}</strong>
          </p>
        </div>

        <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-indigo-100 text-indigo-700 grid place-items-center mb-3">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">2,500+ Intakes Handled</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Maintaining a 98.6% first-pass approval rating across passport, software, and PPC client accounts.
          </p>
        </div>
      </div>

      {/* Leadership Team Section */}
      <section className="space-y-6 pt-4">
        <div className="space-y-2">
          <Badge className="bg-slate-900 text-white font-bold text-xs">LEADERSHIP &amp; SPECIALISTS</Badge>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Accountable Professionals Behind Your Intake
          </h2>
          <p className="text-sm text-slate-600">
            Our team brings over 25 years of combined experience in consular compliance, software engineering, and digital growth.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm mx-auto sm:mx-0">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-bold text-blue-600">{member.role}</p>
                  <p className="text-[11px] font-mono text-slate-500 pt-0.5">{member.credentials}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustBanner />
    </main>
  );
}
