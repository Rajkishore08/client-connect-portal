import { useState } from "react";
import { format, addDays } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  FileCheck,
  FileText,
  Flame,
  Globe2,
  Loader2,
  Lock,
  MessageSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserCheck,
  X,
  Zap,
} from "lucide-react";

import { FileUploader, type LocalFile } from "@/components/site/FileUploader";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitServiceRequest, uploadDocuments } from "@/lib/backend-stubs";
import { sendIntakeConfirmationEmail } from "@/lib/email-service";

interface WizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
  defaultService?: string;
}

const CATEGORIES = [
  {
    id: "passport",
    title: "Passport & Visa Concierge",
    icon: ShieldCheck,
    color: "emerald",
    desc: "24H Expediting, OCI, Surrender & VFS Documentation Audit",
  },
  {
    id: "software",
    title: "Custom Software & SaaS",
    icon: Code2,
    color: "blue",
    desc: "Web Apps, ERP Systems, MVP Builds & API Integrations",
  },
  {
    id: "marketing",
    title: "Digital Growth & Marketing",
    icon: TrendingUp,
    color: "purple",
    desc: "SEO, Performance Ads, Brand Positioning & Conversion Scaling",
  },
];

const SUB_SERVICES: Record<string, { id: string; name: string; desc: string }[]> = {
  passport: [
    { id: "renovation", name: "Passport Renewal", desc: "Expedited USA NRI renewal assistance" },
    { id: "oci", name: "OCI Application", desc: "New OCI or reissue guidance" },
    { id: "renunciation", name: "Renunciation / Surrender", desc: "Indian passport surrender certificate" },
    { id: "damaged", name: "Lost / Damaged Passport", desc: "Urgent 24H replacement intake" },
    { id: "evisa", name: "E-Visa Assistance", desc: "Rush electronic visa processing" },
  ],
  software: [
    { id: "web-app", name: "Dynamic Web App / Portal", desc: "Full-stack SaaS, accounts & database" },
    { id: "landing", name: "High-Converting Landing Page", desc: "Fast animated marketing experience" },
    { id: "mvp", name: "Startup MVP Build", desc: "Rapid 4-week prototype launch" },
    { id: "erp", name: "Custom ERP / Workflow Tool", desc: "Enterprise operational software" },
  ],
  marketing: [
    { id: "seo", name: "SEO & Content Authority", desc: "Rank #1 for high-intent business terms" },
    { id: "ads", name: "Paid Ads & Growth Sprints", desc: "High-ROI Google & Meta campaigns" },
    { id: "branding", name: "Brand Identity & Positioning", desc: "Fortune 500 visual identity redesign" },
  ],
};

const TIME_SLOTS = [
  { time: "9:00 AM CST", label: "Morning" },
  { time: "11:30 AM CST", label: "Midday" },
  { time: "2:00 PM CST", label: "Afternoon" },
  { time: "4:30 PM CST", label: "Late Afternoon" },
  { time: "6:00 PM CST", label: "Evening" },
];

export function ServiceIntakeWizardModal({
  open,
  onOpenChange,
  defaultCategory = "passport",
  defaultService = "",
}: WizardProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(defaultCategory);
  const [subService, setSubService] = useState(defaultService || SUB_SERVICES[defaultCategory]?.[0]?.id || "");
  const [speed, setSpeed] = useState("rush");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<LocalFile[]>([]);

  // Field Validation Errors
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});

  // Slot Booking (Interactive Calendar + Time Slot Grid)
  const [selectedDate, setSelectedDate] = useState<string>(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [selectedSlot, setSelectedSlot] = useState<string>("9:00 AM CST");

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const validateStep2 = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim() || digits.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const mockFileObjects = files.map((f) => new File([], f.name));
      if (mockFileObjects.length > 0) {
        await uploadDocuments(mockFileObjects);
      }

      const res = await submitServiceRequest({
        category: CATEGORIES.find((c) => c.id === category)?.title || category,
        service: SUB_SERVICES[category]?.find((s) => s.id === subService)?.name || subService,
        fields: {
          fullName,
          email,
          phone,
          speedTier: speed,
          notes,
          consultationSlot: `${selectedDate} at ${selectedSlot}`,
        },
        fileNames: files.map((f) => f.name),
      });

      setReferenceNumber(res.reference);

      // Automated Email Dispatch
      sendIntakeConfirmationEmail({
        name: fullName,
        email,
        service: SUB_SERVICES[category]?.find((s) => s.id === subService)?.name || subService,
        reference: res.reference,
        consultationSlot: `${selectedDate} at ${selectedSlot}`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setReferenceNumber(null);
      setFiles([]);
      setFullName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setErrors({});
    }, 300);
  };

  const progressPercent = referenceNumber ? 100 : step === 1 ? 33 : step === 2 ? 66 : 95;

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden border border-slate-200 bg-white shadow-2xl rounded-3xl">
        {/* Animated Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/logo-symbol.webp" alt="One World Symbol" className="h-7 w-auto object-contain" />
              <div>
                <DialogTitle className="text-base sm:text-lg font-extrabold text-white font-display">
                  Guided Intake Wizard
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">
                  {referenceNumber ? "Request Confirmed" : `Step ${step} of 3 — Express Client Onboarding`}
                </DialogDescription>
              </div>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 grid place-items-center transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-5 space-y-2 border-t border-slate-800 pt-4">
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-primary to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {!referenceNumber && (
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
                <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-blue-400" : "text-slate-500"}`}>
                  <span className={`h-4.5 w-4.5 rounded-full grid place-items-center text-[10px] font-bold ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                    {step > 1 ? <Check className="h-3 w-3" /> : "1"}
                  </span>
                  <span>1. Category</span>
                </div>
                <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-blue-400" : "text-slate-500"}`}>
                  <span className={`h-4.5 w-4.5 rounded-full grid place-items-center text-[10px] font-bold ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                    {step > 2 ? <Check className="h-3 w-3" /> : "2"}
                  </span>
                  <span>2. Applicant Details</span>
                </div>
                <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-blue-400" : "text-slate-500"}`}>
                  <span className={`h-4.5 w-4.5 rounded-full grid place-items-center text-[10px] font-bold ${step >= 3 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                    3
                  </span>
                  <span>3. Slot &amp; Confirm</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body with Smooth Slide-in Micro-Animations */}
        <div className="p-5 sm:p-6 max-h-[72vh] overflow-y-auto space-y-6">
          {referenceNumber ? (
            /* Success Screen */
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 grid place-items-center mx-auto shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 animate-bounce" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 font-mono text-xs px-3 py-1">
                  Reference: #{referenceNumber}
                </Badge>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">Intake Submitted Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Our senior consultant team has received your file. We will connect with you on <strong className="text-slate-900">{selectedDate} at {selectedSlot}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Service:</span>
                  <span className="font-semibold text-primary">{SUB_SERVICES[category]?.find((s) => s.id === subService)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Applicant:</span>
                  <span>{fullName} ({phone})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Consultation Reserved:</span>
                  <span className="text-emerald-700 font-semibold">{selectedDate} @ {selectedSlot}</span>
                </div>
              </div>

              <Button onClick={resetAndClose} className="w-full h-12 font-bold bg-primary text-white hover:bg-blue-700 cursor-pointer">
                Done &amp; Return to Portal
              </Button>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Select Category & Service */
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">1. Select Division</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const selected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id);
                          setSubService(SUB_SERVICES[cat.id]?.[0]?.id || "");
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                          selected
                            ? "bg-blue-50/90 border-primary shadow-sm ring-2 ring-primary/20"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`h-8 w-8 rounded-xl grid place-items-center ${selected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          {selected && <Check className="h-4 w-4 text-primary font-bold" />}
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-bold text-slate-900">{cat.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Service Selection Grid */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">2. Select Specific Service</Label>
                <div className="grid grid-cols-1 gap-2">
                  {SUB_SERVICES[category]?.map((sub) => {
                    const selected = subService === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSubService(sub.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selected
                            ? "bg-primary text-white border-primary shadow-2xs font-bold"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 font-medium"
                        }`}
                      >
                        <div className="text-xs">
                          <p className="font-bold">{sub.name}</p>
                          <p className={`text-[11px] ${selected ? "text-blue-100" : "text-slate-500"}`}>{sub.desc}</p>
                        </div>
                        {selected ? <Check className="h-4 w-4 text-white" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Speed Tier Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">3. Select Processing Speed</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSpeed("standard")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      speed === "standard" ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-800 border-slate-200"
                    }`}
                  >
                    <p className="text-xs font-bold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> Standard
                    </p>
                    <p className="text-[10px] text-slate-400">Regular processing timeline</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeed("rush")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      speed === "rush" ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs" : "bg-slate-50 text-slate-800 border-slate-200"
                    }`}
                  >
                    <p className="text-xs font-extrabold flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-red-600 fill-red-600" /> 24H Rush Expedite
                    </p>
                    <p className="text-[10px] opacity-80">Immediate queue priority</p>
                  </button>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Personal Details & Document Dropzone with Input Validation */
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="wiz-name" className="text-xs font-bold text-slate-700">Full Name *</Label>
                  <Input
                    id="wiz-name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(({ fullName: _, ...rest }) => rest);
                    }}
                    className={`h-10 text-xs transition-colors ${errors.fullName ? "border-red-500 focus-visible:ring-red-500 bg-red-50/30" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* USA Phone Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="wiz-phone" className="text-xs font-bold text-slate-700">USA Phone Number *</Label>
                  <Input
                    id="wiz-phone"
                    required
                    placeholder="+1 (312) 000-0000"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(({ phone: _, ...rest }) => rest);
                    }}
                    className={`h-10 text-xs transition-colors ${errors.phone ? "border-red-500 focus-visible:ring-red-500 bg-red-50/30" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <Label htmlFor="wiz-email" className="text-xs font-bold text-slate-700">Email Address *</Label>
                <Input
                  id="wiz-email"
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(({ email: _, ...rest }) => rest);
                  }}
                  className={`h-10 text-xs transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500 bg-red-50/30" : ""}`}
                />
                {errors.email && (
                  <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="wiz-notes" className="text-xs font-bold text-slate-700">Notes / Case Requirements (Optional)</Label>
                <Textarea
                  id="wiz-notes"
                  rows={2}
                  placeholder="Mention urgency, preferred passport dates, or custom software requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-xs resize-none"
                />
              </div>

              {/* Drag-and-Drop Document Uploader Component */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Upload Supporting Documents (Optional)</span>
                  <span className="text-[10px] text-muted-foreground">PDF, JPG, PNG</span>
                </Label>
                <FileUploader files={files} onChange={setFiles} />
              </div>
            </div>
          ) : (
            /* STEP 3: Consultation Slot & Confirmation Preview */
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarCheck className="h-4 w-4" /> Reserve Free 15-Min Scoping Slot
                  </p>
                  <p className="text-xs text-slate-600">
                    Select your preferred date and time slot for our team to review your documents.
                  </p>
                </div>

                {/* Calendar Date Picker */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Select Date</Label>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Pick consultation date"
                    className="bg-white"
                  />
                </div>

                {/* Interactive Visual Time Slot Selection Grid */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-bold text-slate-700">Select Time Slot (CST)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            active
                              ? "bg-primary text-white border-primary shadow-xs font-bold ring-2 ring-primary/30"
                              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 font-medium"
                          }`}
                        >
                          <p className="text-xs font-bold flex items-center gap-1">
                            <Clock className="h-3 w-3 shrink-0" /> {slot.time}
                          </p>
                          <p className={`text-[10px] ${active ? "text-blue-100" : "text-slate-500"}`}>{slot.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>Intake Summary</span>
                  <Badge variant="outline" className="bg-blue-50 text-primary border-primary/30 text-[10px]">
                    Ready to Submit
                  </Badge>
                </p>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{SUB_SERVICES[category]?.find((s) => s.id === subService)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span>{email} • {phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Documents Attached:</span>
                  <span className="font-bold text-primary">{files.length} File(s)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!referenceNumber && (
          <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="h-11 px-4 text-xs font-semibold text-slate-700 hover:bg-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
              </Button>
            ) : (
              <Button variant="ghost" onClick={resetAndClose} className="h-11 px-4 text-xs font-semibold text-slate-500 cursor-pointer">
                Cancel
              </Button>
            )}

            {step < 3 ? (
              <Button
                onClick={handleNextStep}
                className="h-11 px-6 text-xs font-bold bg-primary text-white hover:bg-blue-700 ml-auto shadow-md cursor-pointer"
              >
                Continue to Step {step + 1} <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="h-11 px-7 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 ml-auto shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting Intake...
                  </>
                ) : (
                  <>
                    Confirm &amp; Reserve Consultation <Check className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
