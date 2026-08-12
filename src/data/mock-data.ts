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
    description: "Renew an expiring or expired Indian passport with guided form preparation.",
    checklist: [
      "Current passport (original + copy)",
      "Passport-size photographs (white background)",
      "Proof of address in the USA",
      "Copies of old passports (if renewed before)",
    ],
    extraFields: [
      { name: "passportNumber", label: "Current Passport Number", type: "text", required: true },
      { name: "passportIssueDate", label: "Passport Issue Date", type: "date", required: true },
      { name: "passportExpiryDate", label: "Passport Expiry Date", type: "date", required: true },
    ],
  },
  {
    slug: "oci",
    title: "OCI",
    description: "Overseas Citizen of India registration, re-issue and miscellaneous services.",
    // Note P1: add a short adult/minor/naturalized/spouse branch here later.
    checklist: [
      "Naturalized citizenship certificate",
      "Old Indian passport (all pages)",
      "US passport copy",
      "Passport-size photographs",
      "Proof of address",
    ],
    extraFields: [
      { name: "countryOfOrigin", label: "Country of Origin", type: "select", options: ["India"], required: true },
      {
        name: "relationshipBasis",
        label: "Relationship Basis",
        type: "select",
        options: ["Self", "Spouse", "Parent"],
        required: true,
      },
      { name: "naturalizationDate", label: "US Naturalization Date", type: "date" },
    ],
  },
  {
    slug: "renunciation",
    title: "Renunciation / Passport Surrender",
    description: "Surrender your Indian passport after acquiring foreign citizenship.",
    checklist: [
      "Indian passport (original + copy)",
      "Foreign naturalization certificate",
      "Passport-size photographs",
      "Form XXII",
    ],
    extraFields: [
      { name: "reason", label: "Reason for Renunciation", type: "textarea", required: true },
      { name: "foreignCitizenshipDate", label: "Foreign Citizenship Acquisition Date", type: "date", required: true },
    ],
  },
  {
    slug: "emergency-certificate",
    title: "Emergency Certificate",
    description: "One-way travel document for urgent return to India.",
    checklist: [
      "Proof of lost / damaged / expired passport",
      "Passport-size photographs",
      "Travel itinerary (if available)",
    ],
    extraFields: [
      { name: "emergencyReason", label: "Reason / Emergency Description", type: "textarea", required: true },
      { name: "travelDate", label: "Travel Date (if known)", type: "date" },
    ],
  },
  {
    slug: "e-visa",
    title: "E-Visa",
    description: "Electronic visa application preparation and document review.",
    checklist: [
      "Passport bio page",
      "Recent photograph",
      "Travel itinerary",
      "Proof of accommodation",
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
    description: "Replacement guidance for a lost, stolen or damaged passport.",
    urgent: true,
    checklist: [
      "Police report copy",
      "Passport-size photographs",
      "Any surviving ID proof",
      "Old passport photocopy (if available)",
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
    slug: "api-legacy-integrations",
    title: "API & Legacy Integrations",
    description: "Connect databases, webhooks, and third-party APIs into synchronized workflows",
    group: "software",
  },
];

/* ------------------------------- Leads ---------------------------------- */

export type LeadStatus = "New" | "In Progress" | "Contacted" | "Closed";
export type LeadSource = "Form" | "Chat" | "Calendar";
export type TrackStatus = "Not Started" | "In Progress" | "Completed";

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
  notes: string;
  documents: string[];
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
    status: "Contacted",
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
    status: "Closed",
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
    notes: "Travel to India in October.",
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
    status: "Contacted",
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
    status: "Contacted",
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
    status: "Closed",
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
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export const TRUST_COPY = {
  disclaimer:
    "We are a private service-based company. We are not affiliated with, or acting on behalf of, any government department, embassy, consulate, or VFS.",
  fees:
    "We assist you with documentation, form preparation, and process guidance. Official government fees are paid separately by you.",
};

export const CONFIRMATION_COPY =
  "Thank you. We have received your request. Our team will review it and contact you shortly with next steps and the exact documents to prepare. Official government / VFS fees are paid by you directly to the respective authorities.";

export interface SpeedTier {
  id: string;
  name: string;
  turnaround: string;
  serviceFee: number;
  govFee: number;
  popular?: boolean;
  emergency?: boolean;
  description: string;
}

export const SPEED_TIERS: SpeedTier[] = [
  {
    id: "same-day",
    name: "24-Hour Emergency Rush",
    turnaround: "1 Business Day",
    serviceFee: 349,
    govFee: 209.50,
    emergency: true,
    description: "End-to-end application processing and form filling within 24 hrs. Direct priority concierge handler.",
  },
  {
    id: "express",
    name: "2–4 Day Expedited",
    turnaround: "2 to 4 Days",
    serviceFee: 249,
    govFee: 209.50,
    popular: true,
    description: "Fast-track processing for travel within the next 1–2 weeks.",
  },
  {
    id: "fast-track",
    name: "5–7 Day Fast-Track",
    turnaround: "5 to 7 Days",
    serviceFee: 179,
    govFee: 209.50,
    description: "Accelerated review with full pre-verification of all documents.",
  },
  {
    id: "standard-expedited",
    name: "8–14 Day Standard Expedited",
    turnaround: "8 to 14 Days",
    serviceFee: 119,
    govFee: 209.50,
    description: "Standard guided processing, guaranteed zero-rejection submission.",
  },
];

export interface ShippingOption {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "fedex-overnight", name: "FedEx Priority Overnight (Return)", fee: 39, estimatedTime: "Next Morning Delivery" },
  { id: "fedex-2day", name: "FedEx 2-Day Express", fee: 25, estimatedTime: "2 Business Days" },
  { id: "office-pickup", name: "In-Office Pickup (Chicago HQ)", fee: 0, estimatedTime: "Same Day Ready" },
];

export const OFFICE_LOCATION = {
  address: "180 N LaSalle St #106, Chicago, IL 60601, USA",
  phone: "+1 (417) 569-0711",
  whatsapp: "+1 (417) 569-0711",
  whatsappLink: "https://wa.me/14175690711",
  email: "support@oneworldsolutions.com",
  hours: "Mon-Fri: 8:30 AM - 5:00 PM | Sat: 10:00 AM - 2:00 PM",
  walkInStatus: "Walk-Ins Welcome — No Appointment Required",
};

export const QUICK_SERVICE_OPTIONS = [
  { group: "Passport Services", slug: "passport-renewal", title: "Passport Renewal" },
  { group: "Passport Services", slug: "new-passport", title: "New US Passport" },
  { group: "Passport Services", slug: "child-passport", title: "Child Passport" },
  { group: "Passport Services", slug: "lost-damaged-passport", title: "Lost or Damaged Passport" },
  { group: "Passport Services", slug: "oci", title: "OCI (Overseas Citizen of India)" },
  { group: "Passport Services", slug: "renunciation", title: "Renunciation / Surrender" },
  { group: "Passport Services", slug: "emergency-certificate", title: "Emergency Certificate" },
  { group: "Visa Services", slug: "e-visa", title: "India E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "Brazil E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "Kenya E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "Vietnam E-Visa" },
  { group: "Visa Services", slug: "e-visa", title: "China Business / Tourist Visa" },
  { group: "Visa Services", slug: "e-visa", title: "UK ETA Visa" },
];

