/**
 * Single source of mock/seed data for the Client Services Intake Portal.
 *
 * TODO: replace every export in this file with real Supabase queries.
 * Types are intentionally explicit so swapping the data source is a drop-in job.
 */

export type CategorySlug = "passport" | "digital-marketing" | "web-development";

export type FieldType = "text" | "email" | "tel" | "date" | "textarea" | "select";

export interface ServiceField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface ServiceConfig {
  slug: string;
  title: string;
  description: string;
  urgent?: boolean;
  checklist: string[];
  extraFields: ServiceField[];
}

export interface WebService {
  slug: string;
  title: string;
  description: string;
  group: "experiences" | "software";
}

export interface Category {
  slug: CategorySlug;
  title: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "passport",
    title: "Passport & Visa Services",
    blurb: "Renewals, OCI, surrender, emergency certificates, e-visas and lost passports.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    blurb: "Growth, campaigns and brand presence. Catalog coming soon.",
  },
  {
    slug: "web-development",
    title: "Website Development",
    blurb: "Landing pages, portfolios, web apps, SaaS platforms and integrations.",
  },
];

/** Applicant fields shared by all passport services. */
export const SHARED_APPLICANT_FIELDS: ServiceField[] = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "As per passport", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
  { name: "phoneUsa", label: "Phone (USA)", type: "tel", placeholder: "+1 (555) 000-0000", required: true },
  { name: "phoneHome", label: "Phone (Home Country)", type: "tel", placeholder: "+91 00000 00000" },
  { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
  { name: "placeOfBirth", label: "Place of Birth", type: "text", placeholder: "City, Country", required: true },
];

export const PASSPORT_SERVICES: ServiceConfig[] = [
  {
    slug: "passport-renewal",
    title: "Passport Renewal",
    description: "Renew an expiring or expired passport with guided form preparation and document pre-audit.",
    checklist: [
      "Original expiring or expired passport + Color copy of bio page & last page",
      "Proof of legal US status (Green Card / Visa / Work Permit / I-797)",
      "Proof of US address (Driver's License / Utility Bill / State ID / Lease)",
      "2 Recent Passport-size Photographs (2x2 inches, white background)",
      "Annexure E / Change of Details Declaration Form (if applicable)",
      "Copies of old passports (if renewed previously)",
    ],
    extraFields: [
      { name: "passportNumber", label: "Current Passport Number", type: "text", required: true },
      { name: "passportIssueDate", label: "Passport Issue Date", type: "date", required: true },
      { name: "passportExpiryDate", label: "Passport Expiry Date", type: "date", required: true },
    ],
  },
  {
    slug: "oci",
    title: "OCI Application",
    description: "Overseas Citizenship of India (OCI) card registration, renewal & consular guidance.",
    checklist: [
      "Current valid US/Foreign Passport (Original + Color Copy)",
      "Original Naturalization Certificate or Foreign Citizenship Certificate",
      "Copy of surrendered Indian Passport with official Surrender Certificate",
      "Proof of Indian Origin (Self / Parent / Grandparent Indian passport or Nativity Cert)",
      "2 Recent OCI Specification Photographs (2x2 inches, light background)",
      "Proof of US Address (Driver's License / State ID / Utility Bill)",
      "Marriage Certificate (if applying on spouse's Indian origin status)",
    ],
    extraFields: [
      { name: "countryOfOrigin", label: "Country of Origin", type: "text", required: true },
      {
        name: "relationshipBasis",
        label: "Relationship Basis",
        type: "select",
        options: ["Self", "Spouse", "Parent"],
        required: true,
      },
      { name: "naturalizationDate", label: "Naturalization Date", type: "date" },
    ],
  },
  {
    slug: "renunciation",
    title: "Renunciation / Passport Surrender",
    description: "Surrender your former passport after acquiring new citizenship.",
    checklist: [
      "Original Indian Passport to be surrendered + Color Copy",
      "Original Naturalization Certificate + Color Copy",
      "Current US/Foreign Passport bio page color copy",
      "Official Renunciation / Surrender Declaration Form (Signed)",
      "2 Recent Passport Photos (2x2 inches, white background)",
      "Proof of US Address (Driver's License / State ID / Utility Bill)",
    ],
    extraFields: [
      { name: "reason", label: "Reason for Renunciation", type: "textarea", required: true },
      { name: "foreignCitizenshipDate", label: "New Citizenship Acquisition Date", type: "date", required: true },
    ],
  },
  {
    slug: "emergency-certificate",
    title: "Emergency Certificate",
    description: "One-way travel document for urgent international return travel.",
    checklist: [
      "Confirmed flight ticket / urgent travel itinerary",
      "Photocopy of expired/lost Indian passport or official photo ID proof",
      "Annexure L Emergency Pass Declaration Form (Signed)",
      "3 Passport-size Photographs (2x2 inches, white background)",
      "Proof of current address in the USA (Driver's License / Lease / Utility Bill)",
    ],
    extraFields: [
      { name: "emergencyReason", label: "Reason / Emergency Description", type: "textarea", required: true },
      { name: "travelDate", label: "Travel Date (if known)", type: "date" },
    ],
  },
  {
    slug: "e-visa",
    title: "E-Visa",
    description: "Electronic visa application preparation, document review & expedited submission.",
    checklist: [
      "Scanned color copy of Passport Bio Page (valid at least 6 months)",
      "Recent digital passport photo (JPEG/PNG format, white background)",
      "Round-trip flight itinerary & accommodation booking confirmation",
      "Destination specific entry declaration (for UK ETA, Brazil, Kenya, Vietnam, China)",
    ],
    extraFields: [
      { name: "destinationCountry", label: "Destination Country", type: "text", required: true },
      { name: "travelDates", label: "Travel Dates", type: "text", placeholder: "e.g. 12 Sep – 30 Sep", required: true },
      {
        name: "purpose",
        label: "Purpose of Travel",
        type: "select",
        options: ["Tourism", "Business", "Medical", "Conference", "Other"],
        required: true,
      },
    ],
  },
  {
    slug: "lost-damaged-passport",
    title: "Lost / Damaged Passport",
    description: "Urgent replacement guidance for a lost, stolen or damaged passport.",
    urgent: true,
    checklist: [
      "Original Police Report of Lost Passport (with passport number & date)",
      "Notarized Affidavit for Lost/Damaged Passport (Form Annexure F)",
      "Copy of lost passport (if available) or government photo ID (Driver's License)",
      "Proof of US Residence Address & Legal US Status (Visa / Green Card)",
      "4 Passport-size Photographs (2x2 inches, white background)",
    ],
    extraFields: [
      { name: "policeReportNumber", label: "Police Report Number", type: "text", required: true },
      { name: "policeReportDate", label: "Police Report Date", type: "date", required: true },
      { name: "lossCircumstances", label: "Date / Circumstances of Loss", type: "textarea", required: true },
    ],
  },
];

export const WEB_SERVICES: WebService[] = [
  {
    slug: "static-landing-page",
    title: "Static Landing Page",
    description: "Lightning-fast single-page or simple marketing pages optimized for conversions",
    group: "experiences",
  },
  {
    slug: "stunning-portfolio",
    title: "Stunning Portfolio",
    description: "Showcase personal or corporate achievements with a visually unique, premium identity",
    group: "experiences",
  },
  {
    slug: "dynamic-site",
    title: "Dynamic Site / Web App",
    description: "Full-stack portals, dashboards, user accounts, and database integrations",
    group: "experiences",
  },
  {
    slug: "highly-animated-site",
    title: "Highly Animated Site",
    description: "Creative WebGL, custom cursor animations, noise overlays, proximity text layouts",
    group: "experiences",
  },
  {
    slug: "custom-erp-saas",
    title: "Custom ERP & SaaS Platforms",
    description: "Enterprise workflow automation, invoice generators, client dashboards, advanced analytics",
    group: "software",
  },
  {
    slug: "startup-mvp",
    title: "Startup MVP Build",
    description: "Validate assumptions quickly with a scalable Minimum Viable Product",
    group: "software",
  },
  {
    slug: "custom-saas-platform",
    title: "Custom SaaS Platform",
    description: "Multi-tenant software, customer billing, payment modules, license dashboards",
    group: "software",
  },
  {
    slug: "internal-enterprise-tool",
    title: "Internal Enterprise Tool",
    description: "Secure CRM, ERP systems, internal databases, automated back-office tools",
    group: "software",
  },
  {
    slug: "agentic-ai-platform",
    title: "Agentic AI Platform",
    description: "Build & deploy autonomous AI agents for reasoning, multi-step workflows, multi-agent orchestration, and SOC 2 security",
    group: "software",
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation Tool",
    description: "AI-driven WhatsApp workflow automation, CRM sync, instant lead qualification, and automated support",
    group: "software",
  },
  {
    slug: "api-legacy-integrations",
    title: "API & Legacy Integrations",
    description: "Connect databases, webhooks, and third-party APIs into synchronized workflows",
    group: "software",
  },
];

/* ------------------------------- Leads ---------------------------------- */

export type LeadStatus = "New" | "In Contact" | "Proposal Sent" | "Payment Pending" | "In Progress" | "Completed" | "Archived";
export type LeadSource = "Form" | "Chat" | "Calendar";
export type TrackStatus = "Not Started" | "In Progress" | "Completed";

export interface Milestone {
  id: string;
  title: string;
  status: TrackStatus;
  ref?: string;
}

export function getDefaultMilestonesForCategory(category: string): Milestone[] {
  const cat = (category || "").toLowerCase();
  
  if (cat.includes("web") || cat.includes("software") || cat.includes("ui") || cat.includes("app") || cat.includes("tech")) {
    return [
      { id: "m-1", title: "PRD & Scope Architecture", status: "Completed", ref: "PRD-APPROVED" },
      { id: "m-2", title: "UI/UX Design & Prototype", status: "In Progress", ref: "FIGMA-V2" },
      { id: "m-3", title: "Code Sprint & AI Engine Build", status: "Not Started", ref: "" },
      { id: "m-4", title: "Cloud Staging & Production Launch", status: "Not Started", ref: "" },
    ];
  }

  if (cat.includes("marketing") || cat.includes("growth") || cat.includes("digital")) {
    return [
      { id: "m-1", title: "SEO / PPC Account Audit", status: "Completed", ref: "AUDIT-882" },
      { id: "m-2", title: "Campaign Setup & Negative Keywords", status: "In Progress", ref: "G-ADS-102" },
      { id: "m-3", title: "Ad Sprints & Heatmap Analytics", status: "Not Started", ref: "" },
      { id: "m-4", title: "Monthly ROI Performance Report", status: "Not Started", ref: "" },
    ];
  }

  // Default: Passport & Visa Services
  return [
    { id: "m-1", title: "Government / Consulate Form Filing", status: "Completed", ref: "GOV-88231" },
    { id: "m-2", title: "VFS / Consulate Document Audit", status: "In Progress", ref: "VFS-45120" },
    { id: "m-3", title: "FedEx / Embassy Courier Dispatch", status: "Not Started", ref: "" },
  ];
}

export interface Lead {
  id: string;
  reference: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  priority?: "High" | "Normal";
  isSpecialRequest?: boolean;
  engagementModel?: string;
  progressPercent?: number;
  notes: string;
  internalNotes?: string;
  documents: string[];
  milestones?: Milestone[];
  tracking: {
    governmentForm: { status: TrackStatus; ref?: string };
    vfs: { status: TrackStatus; ref?: string };
    courier: { status: TrackStatus; ref?: string };
  };
}

export const LEADS: Lead[] = [
  {
    id: "1",
    reference: "REF-100241",
    date: "2026-08-04",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+1 (415) 555-0132",
    category: "Passport & Visa Services",
    service: "Passport Renewal",
    source: "Form",
    status: "In Progress",
    notes: "Documents received, awaiting VFS appointment.",
    documents: ["passport-bio.pdf", "address-proof.png"],
    tracking: {
      governmentForm: { status: "Completed", ref: "GOV-88231" },
      vfs: { status: "In Progress", ref: "VFS-45120" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "2",
    reference: "REF-100242",
    date: "2026-08-04",
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+1 (206) 555-0188",
    category: "Passport & Visa Services",
    service: "OCI",
    source: "Chat",
    status: "New",
    notes: "Asked about spouse OCI eligibility.",
    documents: [],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "3",
    reference: "REF-100243",
    date: "2026-08-03",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+1 (312) 555-0110",
    category: "Passport & Visa Services",
    service: "Lost / Damaged Passport",
    source: "Form",
    status: "In Contact",
    notes: "Urgent — travel in 3 weeks.",
    documents: ["police-report.pdf"],
    tracking: {
      governmentForm: { status: "In Progress", ref: "GOV-88240" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "4",
    reference: "REF-100244",
    date: "2026-08-03",
    name: "Daniel Okafor",
    email: "daniel@brightlabs.co",
    phone: "+1 (646) 555-0179",
    category: "Website Development",
    service: "Startup MVP Build",
    source: "Form",
    status: "New",
    notes: "Wants scoping call next week.",
    documents: ["brief.pdf"],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "5",
    reference: "REF-100245",
    date: "2026-08-02",
    name: "Meera Iyer",
    email: "meera.iyer@example.com",
    phone: "+1 (972) 555-0164",
    category: "Passport & Visa Services",
    service: "Renunciation / Passport Surrender",
    source: "Calendar",
    status: "Completed",
    notes: "Completed and couriered.",
    documents: ["form-xxii.pdf", "naturalization.pdf"],
    tracking: {
      governmentForm: { status: "Completed", ref: "GOV-88190" },
      vfs: { status: "Completed", ref: "VFS-44980" },
      courier: { status: "Completed", ref: "FDX-772391045" },
    },
  },
  {
    id: "6",
    reference: "REF-100246",
    date: "2026-08-02",
    name: "Sanjay Gupta",
    email: "sanjay.g@example.com",
    phone: "+1 (408) 555-0121",
    category: "Digital Marketing",
    service: "General Enquiry",
    source: "Form",
    status: "New",
    notes: "Needs SEO + paid ads for clinic.",
    documents: [],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "7",
    reference: "REF-100247",
    date: "2026-08-01",
    name: "Lea Fontaine",
    email: "lea.f@example.com",
    phone: "+1 (718) 555-0155",
    category: "Passport & Visa Services",
    service: "E-Visa",
    source: "Chat",
    status: "In Progress",
    notes: "International travel in October.",
    documents: ["itinerary.pdf"],
    tracking: {
      governmentForm: { status: "In Progress", ref: "GOV-88255" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "8",
    reference: "REF-100248",
    date: "2026-08-01",
    name: "Arjun Patel",
    email: "arjun.patel@example.com",
    phone: "+1 (510) 555-0198",
    category: "Website Development",
    service: "Stunning Portfolio",
    source: "Form",
    status: "In Contact",
    notes: "Quote sent after scoping call.",
    documents: [],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "9",
    reference: "REF-100249",
    date: "2026-07-31",
    name: "Kavya Reddy",
    email: "kavya.r@example.com",
    phone: "+1 (832) 555-0143",
    category: "Passport & Visa Services",
    service: "Emergency Certificate",
    source: "Form",
    status: "In Progress",
    notes: "Family emergency, expedite.",
    documents: ["affidavit.pdf"],
    tracking: {
      governmentForm: { status: "Completed", ref: "GOV-88101" },
      vfs: { status: "In Progress", ref: "VFS-44877" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "10",
    reference: "REF-100250",
    date: "2026-07-31",
    name: "Thomas Weber",
    email: "t.weber@example.com",
    phone: "+1 (503) 555-0187",
    category: "Website Development",
    service: "API & Legacy Integrations",
    source: "Calendar",
    status: "New",
    notes: "Legacy ERP sync project.",
    documents: [],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "11",
    reference: "REF-100251",
    date: "2026-07-30",
    name: "Nisha Verma",
    email: "nisha.verma@example.com",
    phone: "+1 (917) 555-0122",
    category: "Passport & Visa Services",
    service: "OCI",
    source: "Form",
    status: "In Contact",
    notes: "Minor OCI for daughter.",
    documents: ["birth-certificate.pdf"],
    tracking: {
      governmentForm: { status: "In Progress", ref: "GOV-88260" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
  {
    id: "12",
    reference: "REF-100252",
    date: "2026-07-29",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+1 (669) 555-0170",
    category: "Digital Marketing",
    service: "General Enquiry",
    source: "Chat",
    status: "Archived",
    notes: "Out of budget for now.",
    documents: [],
    tracking: {
      governmentForm: { status: "Not Started" },
      vfs: { status: "Not Started" },
      courier: { status: "Not Started" },
    },
  },
];

export const DASHBOARD_STATS = {
  newToday: 2,
  newThisWeek: 8,
  inProgress: 4,
  closed: 2,
};

export const CATEGORY_BREAKDOWN = [
  { category: "Passport & Visa", leads: 7 },
  { category: "Website Dev", leads: 3 },
  { category: "Digital Marketing", leads: 2 },
];

/** Managed catalog rows for the admin Services management screen. */
export interface ManagedService {
  id: string;
  category: string;
  service: string;
  live: boolean;
  displayPrice: string;
  description: string;
}

export const MANAGED_SERVICES: ManagedService[] = [
  ...PASSPORT_SERVICES.map((s, i) => ({
    id: `p-${i}`,
    category: "Passport & Visa Services",
    service: s.title,
    live: true,
    displayPrice: "Quote on request",
    description: s.description,
  })),
  {
    id: "dm-0",
    category: "Digital Marketing",
    service: "General Enquiry",
    live: true,
    displayPrice: "Quote on request",
    description: "Catalog being finalised.",
  },
  ...WEB_SERVICES.map((s, i) => ({
    id: `w-${i}`,
    category: "Website Development",
    service: s.title,
    live: true,
    displayPrice: "Quote after scoping call",
    description: s.description,
  })),
];

/** Mock booking availability. */
export const BOOKING_SLOTS = [
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

export const TRUST_COPY = {
  parentCompany: "ABHIPRIYA GROUPS LLC",
  isEverified: true,
  disclaimer:
    "One World Solutions (a division of ABHIPRIYA GROUPS LLC, E-Verified) is an independent private consultancy. We are not affiliated with any government agency, embassy, or consulate.",
  fees:
    "Official government and consular processing fees are paid separately by the applicant.",
};

export const CONFIRMATION_COPY =
  "Thank you. We have received your request. Our team will review it and contact you shortly with next steps and the exact documents to prepare. Official government / VFS fees are paid by you directly to the respective authorities.";

export interface SpeedTier {
  id: string;
  name: string;
  turnaround: string;
  serviceFee?: number;
  govFee?: number;
  popular?: boolean;
  emergency?: boolean;
  description: string;
}

export const SPEED_TIERS: SpeedTier[] = [
  {
    id: "same-day",
    name: "24-Hour Emergency Rush",
    turnaround: "1 Business Day",
    emergency: true,
    description: "End-to-end application processing and form filling within 24 hrs. Direct priority concierge handler.",
  },
  {
    id: "express",
    name: "2–4 Day Expedited",
    turnaround: "2 to 4 Days",
    popular: true,
    description: "Fast-track processing for travel within the next 1–2 weeks.",
  },
  {
    id: "fast-track",
    name: "5–7 Day Fast-Track",
    turnaround: "5 to 7 Days",
    description: "Accelerated review with full pre-verification of all documents.",
  },
  {
    id: "standard-expedited",
    name: "8–14 Day Standard Expedited",
    turnaround: "8 to 14 Days",
    description: "Standard guided processing, guaranteed zero-rejection submission.",
  },
];

export interface ShippingOption {
  id: string;
  name: string;
  fee?: number;
  estimatedTime: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "fedex-overnight", name: "FedEx Priority Overnight (Return)", estimatedTime: "Next Morning Delivery" },
  { id: "fedex-2day", name: "FedEx 2-Day Express", estimatedTime: "2 Business Days" },
  { id: "secure-dispatch", name: "Priority Consular Courier Dispatch", estimatedTime: "Direct Handover" },
];

export const OFFICE_LOCATION = {
  address: "Chicago, IL 60613, USA",
  phone: "+1 (417) 569-0711",
  whatsapp: "+1 (417) 569-0711",
  whatsappLink: "https://wa.me/14175690711",
  email: "support@oneworldsolutionsusa.com",
  hours: "Mon-Fri: 8:30 AM - 5:00 PM | Sat: 10:00 AM - 2:00 PM",
  walkInStatus: "100% Online Intake & Virtual Consultation Only (No Physical Visits)",
};

export const QUICK_SERVICE_OPTIONS = [
  { group: "Passport Services", slug: "passport-renewal", title: "Passport Renewal" },
  { group: "Passport Services", slug: "new-passport", title: "New Passport Application" },
  { group: "Passport Services", slug: "child-passport", title: "Child Passport Renewal" },
  { group: "Passport Services", slug: "lost-damaged-passport", title: "Lost or Damaged Passport" },
  { group: "Passport Services", slug: "oci", title: "OCI Application" },
  { group: "Passport Services", slug: "renunciation", title: "Renunciation / Surrender" },
  { group: "Passport Services", slug: "emergency-certificate", title: "Emergency Certificate" },
  { group: "Visa Services", slug: "e-visa", title: "Global E-Visa Services" },
  { group: "Visa Services", slug: "e-visa", title: "Brazil E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "Kenya E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "Vietnam E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "China Business / Tourist Visa" },
  { group: "Visa Services", slug: "e-visa", title: "UK ETA Visa" },
];

