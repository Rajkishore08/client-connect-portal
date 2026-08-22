import { useState } from "react";
import { format, addDays } from "date-fns";
import { sendAdminIntakeAlert, sendClientIntakeEmail } from "@/lib/email-service";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  FileCheck2,
  FileText,
  Flame,
  Globe,
  Loader2,
  Lock,
  Mail,
  Megaphone,
  MessageSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserCheck,
  Zap,
} from "lucide-react";

import { FileUploader, type LocalFile } from "@/components/site/FileUploader";
import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitServiceRequest, uploadDocuments } from "@/lib/backend-stubs";
import { sendIntakeConfirmationEmail } from "@/lib/email-service";
import { saveIntakeToSupabase } from "@/lib/supabase";

export interface UniversalServiceIntakeProps {
  category: "web-development" | "digital-marketing" | "passport";
  defaultService?: string;
  onSuccess?: () => void;
}

const SERVICE_CATALOG = {
  "web-development": {
    title: "Web Development & Custom Software Intake",
    subtitle: "Submit your project requirements for an instant scope analysis & free technical strategy consultation.",
    badge: "SOFTWARE & UI/UX DIVISION",
    options: [
      { id: "custom-web-app", name: "Custom Web Application (Full-Stack)", desc: "React, Next.js, Node, Real-time Database & Authentication" },
      { id: "saas-platform", name: "Enterprise SaaS & Portal System", desc: "Multi-tenant accounts, subscription billing & cloud infrastructure" },
      { id: "ai-agent-rag", name: "AI Agent & RAG Vector Engine", desc: "Custom LLM workflows, automated intake bots & document search" },
      { id: "ui-ux-website", name: "UI/UX Website & Brand Design", desc: "High-converting corporate website, animations & mobile responsiveness" },
      { id: "api-microservices", name: "API Engineering & Microservices", desc: "REST/GraphQL endpoints, payment gateway & ERP integrations" },
      { id: "mobile-app", name: "Mobile Application (iOS/Android)", desc: "Cross-platform React Native / Flutter apps with offline sync" },
    ],
    scopeOptions: ["New Project / MVP Launch", "Redesign & Replatform", "Feature Expansion", "Enterprise Scale Support"],
    budgetTiers: ["$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+ Enterprise"],
    timelines: ["1–2 Weeks (Rush Sprint)", "2–4 Weeks (Standard Launch)", "1–2 Months (Full Build)", "Flexible Managed Retainer"],
  },
  "digital-marketing": {
    title: "Digital Marketing & Growth Campaign Intake",
    subtitle: "Request a custom SEO audit, Google Ads PPC roadmap, or conversion-focused growth plan.",
    badge: "DIGITAL GROWTH DIVISION",
    options: [
      { id: "seo-authority", name: "Search Engine Optimization (SEO)", desc: "Technical audit, high-intent keyword ranking & backlink engine" },
      { id: "google-meta-ppc", name: "Google & Meta Paid Ads (PPC)", desc: "High-ROI ad copy, audience targeting & landing page funnels" },
      { id: "cro-funnels", name: "Conversion Rate Optimization (CRO)", desc: "Behavioral heatmaps, A/B testing & intake funnel optimization" },
      { id: "social-branding", name: "Social Media & Brand Positioning", desc: "Strategic content creation, multi-platform brand management" },
      { id: "full-growth-package", name: "360° Omnichannel Growth Sprint", desc: "Combined SEO + PPC + Content strategy for rapid customer acquisition" },
    ],
    scopeOptions: ["Local USA Market", "National B2B Lead Gen", "E-Commerce / Consumer", "Global Expansion"],
    budgetTiers: ["$1,000 – $2,500 / month", "$2,500 – $5,000 / month", "$5,000 – $10,000 / month", "$10,000+ / month"],
    timelines: ["Immediate Start (Next 48 Hours)", "Next 2 Weeks", "Next Month", "Quarterly Planning"],
  },
  passport: {
    title: "Expedited Passport & Visa Intake",
    subtitle: "Fast-track passport renewal, dual residency cards, surrender declarations, or emergency visas.",
    badge: "PASSPORT & VISA CONCIERGE",
    options: [
      { id: "passport-renewal", name: "Passport Renewal", desc: "Expedited passport renewal & replacement guidance" },
      { id: "oci-card", name: "OCI Application", desc: "Overseas Citizenship of India registration & renewal" },
      { id: "renunciation", name: "Renunciation / Surrender", desc: "Passport surrender declaration filing" },
      { id: "emergency-24h", name: "24-Hour Emergency Rush", desc: "Same-day priority dispatch & urgent booking" },
      { id: "evisa", name: "Global E-Visa Permit", desc: "UK ETA, Brazil, Kenya & Global permit filing" },
    ],
    scopeOptions: ["Standard Adult", "Minor (Under 18)", "Spouse / Naturalized", "Emergency Hand Carry"],
    budgetTiers: ["Standard Expedited", "2–4 Day Expedited", "24H Emergency Rush (Custom Quote)"],
    timelines: ["24–48 Hours", "3–5 Days", "1–2 Weeks", "Standard Processing"],
  },
};

const TIME_SLOTS = [
  "08:30 AM CST",
  "09:00 AM CST",
  "09:30 AM CST",
  "10:00 AM CST",
  "10:30 AM CST",
  "11:00 AM CST",
  "11:30 AM CST",
  "12:00 PM CST",
  "12:30 PM CST",
  "01:00 PM CST",
  "01:30 PM CST",
  "02:00 PM CST",
  "02:30 PM CST",
  "03:00 PM CST",
  "03:30 PM CST",
  "04:00 PM CST",
  "04:30 PM CST",
  "05:00 PM CST",
  "05:30 PM CST",
  "06:00 PM CST",
  "06:30 PM CST",
];

export function UniversalServiceIntakeForm({
  category,
  defaultService,
  onSuccess,
}: UniversalServiceIntakeProps) {
  const config = SERVICE_CATALOG[category];

  const [selectedService, setSelectedService] = useState<string>(
    defaultService || config.options[0]?.id || ""
  );
  const [scopeType, setScopeType] = useState<string>(config.scopeOptions[0] || "");
  const [budget, setBudget] = useState<string>(config.budgetTiers[0] || "");
  const [timeline, setTimeline] = useState<string>(config.timelines[0] || "");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);

  const [files, setFiles] = useState<LocalFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    serviceName: string;
  } | null>(null);

  const activeServiceObj =
    config.options.find((opt) => opt.id === selectedService) || config.options[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedFileUrls: string[] = [];
      if (files.length > 0) {
        uploadedFileUrls = await uploadDocuments(files);
      }

      const referenceId = `REF-${Math.floor(100000 + Math.random() * 900000)}`;

      // Detect if user selected a special Engagement Partnership Model
      const hashStr = window.location.hash || "";
      let engagementModel = "";
      if (hashStr.includes("One-Time+Project") || hashStr.includes("One-Time")) {
        engagementModel = "One-Time Project (Fixed Scope & Timeline)";
      } else if (hashStr.includes("Dedicated+Developer+Team") || hashStr.includes("Developer")) {
        engagementModel = "Dedicated Developer Team (Monthly Squad Hire)";
      } else if (hashStr.includes("Enterprise+Tech+Partner") || hashStr.includes("Enterprise")) {
        engagementModel = "Enterprise Tech Partner (Long-Term Collaboration)";
      }

      const isSpecialRequest = !!engagementModel;
      const priority = isSpecialRequest ? "High" : "Normal";
      const serviceName = activeServiceObj?.name || "Custom Service Request";

      const formattedNotes = engagementModel
        ? `🔥 SPECIAL ENGAGEMENT REQUEST: [${engagementModel}]\n\nDetails: ${projectDetails || "No additional notes provided."}`
        : projectDetails;

      await submitServiceRequest({
        serviceSlug: selectedService,
        serviceTitle: `${config.badge} — ${serviceName}${engagementModel ? ` [${engagementModel}]` : ""}`,
        applicantName: fullName,
        applicantEmail: email,
        phoneUsa: phone,
        fields: {
          companyName: companyName || "",
          scopeType: scopeType || "",
          budget: budget || "",
          timeline: timeline || "",
          projectDetails: formattedNotes,
          preferredConsultationDate: preferredDate || "",
          preferredConsultationSlot: preferredSlot || "",
        },
        speedTierId: timeline || "standard",
        shippingOptionId: "digital-delivery",
        fileUrls: uploadedFileUrls,
      });

      // Persist to Supabase PostgreSQL Database with priority & engagementModel flag
      await saveIntakeToSupabase({
        category: category,
        serviceTitle: serviceName,
        applicantName: fullName,
        email: email,
        phone: phone,
        notes: formattedNotes,
        trackingId: referenceId,
        priority: priority,
        isSpecialRequest: isSpecialRequest,
        engagementModel: engagementModel,
      });

      // Dispatch automated Resend transactional email to client and admin
      const emailPayload = {
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        serviceTitle: serviceName,
        serviceCategory: config.badge,
        trackingId: referenceId,
        details: formattedNotes,
      };
      sendClientIntakeEmail(emailPayload).catch(() => {});
      sendAdminIntakeAlert(emailPayload).catch(() => {});

      setSubmittedData({
        referenceId,
        serviceName,
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Intake submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-12 text-center space-y-6 shadow-lg">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <Badge className="bg-emerald-600 text-white font-extrabold px-3 py-1 text-xs">
            REQUEST CONFIRMED
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Intake Request Submitted Successfully!
          </h3>
          <p className="text-sm text-slate-600">
            Thank you, <strong className="text-slate-900">{fullName}</strong>. We have received your project details for{" "}
            <strong className="text-blue-600">{submittedData.serviceName}</strong>. A confirmation email has been dispatched to{" "}
            <strong className="text-slate-900">{email}</strong>.
          </p>
        </div>

        <div className="inline-block rounded-2xl bg-white border border-emerald-200/90 p-5 text-left max-w-md w-full space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
            <span className="text-slate-500 font-medium">Reference Tracking ID</span>
            <span className="font-mono font-bold text-blue-600 text-sm">{submittedData.referenceId}</span>
          </div>
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
            <span className="text-slate-500 font-medium">Division</span>
            <span className="font-semibold text-slate-800">{config.badge}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Strategy Call Window</span>
            <span className="font-semibold text-slate-800">
              {preferredDate ? `${preferredDate} @ ${preferredSlot}` : "Scheduled within 2 hours"}
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button
            type="button"
            onClick={() => {
              setSubmittedData(null);
              setFullName("");
              setEmail("");
              setPhone("");
              setProjectDetails("");
              setFiles([]);
            }}
            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5"
          >
            Submit Another Intake Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            {config.badge}
          </Badge>
          <Badge variant="secondary" className="text-xs font-bold gap-1">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Free 30-Min Strategy Call Included
          </Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {config.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
          {config.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Select Specific Service Offering */}
        <div className="space-y-3">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            1. Select Required Service <span className="text-red-500">*</span>
          </Label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.options.map((opt) => {
              const isSelected = selectedService === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedService(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20"
                      : "border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${isSelected ? "text-blue-700" : "text-slate-900"}`}>
                      {opt.name}
                    </span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Scope, Budget & Timeline Requirements */}
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Project Type / Market Scope</Label>
            <Select value={scopeType} onValueChange={setScopeType}>
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs font-semibold">
                <SelectValue placeholder="Select Scope" />
              </SelectTrigger>
              <SelectContent>
                {config.scopeOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Estimated Budget Range</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs font-semibold">
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                {config.budgetTiers.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Target Launch Timeline</Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs font-semibold">
                <SelectValue placeholder="Select Timeline" />
              </SelectTrigger>
              <SelectContent>
                {config.timelines.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Step 3: Contact & Business Information */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            2. Contact &amp; Business Details
          </Label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-bold text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-slate-700">
                Work Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-bold text-slate-700">
                Phone Number (USA / Int) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-xs font-bold text-slate-700">
                Company / Organization Name
              </Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp / Brand Name"
                className="h-11 rounded-xl bg-slate-50 border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="projectDetails" className="text-xs font-bold text-slate-700">
              Project Description &amp; Specific Goals
            </Label>
            <Textarea
              id="projectDetails"
              rows={3}
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Describe your current challenge, target deliverables, key features, or reference websites..."
              className="rounded-xl bg-slate-50 border-slate-200 text-xs"
            />
          </div>
        </div>

        {/* Step 4: Attachment Uploader */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <Label className="text-xs font-bold text-slate-700">
            Upload PRD, Design Briefs, or Reference Files (Optional)
          </Label>
          <FileUploader files={files} onChange={setFiles} />
        </div>

        {/* Step 5: Preferred Strategy Call Date & Time Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <Label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            3. Schedule Free 1-on-1 Strategy Consultation Call
          </Label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Preferred Date</Label>
              <DatePicker
                value={preferredDate}
                onChange={setPreferredDate}
                placeholder="Select Consultation Date"
                disablePastDates={true}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Preferred Time Slot (CST)</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredSlot(slot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      preferredSlot === slot
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span>Strict NDA Protection &amp; 100% Confidential File Handling</span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full sm:w-auto rounded-full bg-[#0F52FF] hover:bg-blue-700 text-white font-extrabold text-xs px-8 py-3.5 shadow-lg shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting Request...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Submit Intake Request &amp; Book Call <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
