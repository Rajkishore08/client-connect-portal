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

      {/* Strategic Services Overview */}
      <section className="space-y-6 pt-4">
        <div className="space-y-2">
          <Badge className="bg-slate-900 text-white font-bold text-xs">WHAT WE DO</Badge>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Core Service Offerings
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            We provide specialized solutions tailored for individuals needing urgent consular processing as well as businesses expanding their digital software capabilities.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Service 1 */}
          <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center border border-blue-100">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Passport &amp; Consular Services</h3>
                <p className="text-xs font-semibold text-blue-600">Expedited Consular Filing &amp; Intake</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                End-to-end processing for Indian Passport Renewals, OCI Cards, Consular Surrender Certificates, Emergency Certificates, and Miscellaneous Consular Attestations with guaranteed document verification.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full text-xs font-bold justify-between">
              <Link to="/passport">
                Explore Consular Services &rarr;
              </Link>
            </Button>
          </div>

          {/* Service 2 */}
          <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-700 grid place-items-center border border-indigo-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Custom Software &amp; AI Agents</h3>
                <p className="text-xs font-semibold text-indigo-600">Enterprise Web &amp; SaaS Platforms</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                Full-stack web application development, React/Next.js architectures, automated CRM workflows, WhatsApp AI integration tools, and autonomous AI agents designed to scale business operations.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full text-xs font-bold justify-between">
              <Link to="/web-development">
                Explore Software Engineering &rarr;
              </Link>
            </Button>
          </div>

          {/* Service 3 */}
          <div className="surface-card p-6 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center border border-emerald-100">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Digital Marketing &amp; SEO</h3>
                <p className="text-xs font-semibold text-emerald-600">Data-Driven Business Growth</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                Technical search engine optimization (SEO), Generative Engine Optimization (GEO), high-intent Google/Meta paid advertising campaigns, and performance lead generation systems.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full text-xs font-bold justify-between">
              <Link to="/digital-marketing">
                Explore Marketing Services &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TrustBanner />
    </main>
  );
}
