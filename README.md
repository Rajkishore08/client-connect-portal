# Client Connect Portal

Lovable.dev Build Prompt — Client Services Intake Portal

Copy everything below the line into Lovable's project prompt box.

PROJECT OVERVIEW

Build a modern, trust-focused Client Services Intake Portal for a consultancy offering three service categories: Passport/Visa Services, Digital Marketing, and Website Development. This replaces a single flat Google Form with a guided, two-level (Category → Service) selection flow. The product must feel simple, fast, mobile-first, and trustworthy — most users are NRIs applying for passport/visa services from their phones and need to feel confident they're not on a scam site.

Design direction: Clean, professional, light theme only (no dark mode). Think a hybrid of a modern SaaS onboarding flow and a government-services portal, but warmer and less bureaucratic — soft neutral backgrounds, high-contrast text, one confident accent color, generous whitespace, rounded cards, subtle shadows. Use Tailwind + shadcn/ui components. Fully responsive, mobile-first breakpoints.

SCOPE NOTE — READ BEFORE BUILDING

Build the complete frontend UI/UX only, using local component state and realistic mock/seed data everywhere data would normally come from a database. Do not set up Supabase tables, auth, or file storage — I will wire those in myself afterward. To make that handoff clean:

Structure all data (services, leads, bookings, tracking statuses) as typed objects/arrays in a single mock-data.ts-style file, so I can swap it for real queries later.

For any action that would normally hit a backend (form submit, file upload, admin login, booking confirmation, export), implement the full UI/UX and interaction state (loading, success, error states) but stub the actual call with a clearly labeled placeholder function, e.g. // TODO: replace with Supabase insert.

Build a file-upload UI component (drag-and-drop + file list + remove) that manages files in local state only — don't attempt real storage upload.

Build an admin login screen UI (email/password form, error states) but don't implement real auth — just gate the admin routes behind a simple local "logged in" boolean for now.

Keep components modular and cleanly named so backend wiring later is a drop-in job, not a rewrite.

GLOBAL COMPONENTS (used across the app)

Header/Nav — logo placeholder, links to Home, the three categories, Book a Consultation, Track My Application. Sticky on scroll.

"Request any service in 3 easy steps" banner — a reusable horizontal 3-step visual component: (1) Choose Category → (2) Select Service → (3) Submit (or Chat / Book Meeting). Show this prominently on the Home page and near the top of every category/service page.

Trust & Transparency footer/banner — must appear on every page (footer is fine on most pages, but repeat as an inline banner on all form pages). Use this exact copy:

"We are a private service-based company. We are not affiliated with, or acting on behalf of, any government department, embassy, consulate, or VFS."

"We assist you with documentation, form preparation, and process guidance. Official government fees are paid separately by you."

Persistent AI Chat widget — floating action button bottom-right on all pages, opens a chat panel (light-themed, rounded, mobile-friendly full-screen on small viewports). Build full conversational UI (message bubbles, typing indicator, input box, suggested quick-reply chips like "Track my application", "I lost my passport", "Book a consultation") with mock canned responses for now — leave a single clearly marked function where I'll plug in the real LLM API call.

"Book a Consultation" calendar widget — reusable component: month/date picker → available time slots → contact details form (name, email, phone, brief reason) → confirmation screen. Use mock available slots.

PAGES & FLOWS

1. Home / Landing

Hero section: value proposition headline + subheadline, primary CTA "Request a Service", secondary CTA "Book a Consultation"

The 3-Easy-Steps banner

Trust badges row + the non-government disclaimer prominently visible (not buried)

Three category cards (Passport Services / Digital Marketing / Website Development) — clicking expands or navigates to that category

AI chat widget accessible

2. Category → Service Selector

Implement as a 2-level accordion / expandable menu, not a multi-step wizard: clicking a category card expands its sub-services inline (smooth expand/collapse animation); clicking a sub-service navigates to that service's dedicated page. Never nest more than 2 levels deep.

Passport Services — 6 sub-services:

Passport Renewal

OCI

Renunciation / Passport Surrender

Emergency Certificate

E-Visa

Lost / Damaged Passport

Digital Marketing — show as a category card that expands to a "Sub-services coming soon — tell us what you need" state with a short generic enquiry form (name, email, phone, brief description) since the client hasn't finalized this catalog yet.

Website Development — 9 sub-services, grouped into two visual sections:

Websites & Digital Experiences: Static Landing Page, Stunning Portfolio, Dynamic Site / Web App, Highly Animated Site

Custom Software & Enterprise: Custom ERP & SaaS Platforms, Startup MVP Build, Custom SaaS Platform, Internal Enterprise Tool, API & Legacy Integrations

Each Website Development sub-service should be a card with a short one-line description (use the descriptions below) and a "Request a Quote" CTA opening a lightweight enquiry form (name, email, phone, project brief) — no pricing displayed (pricing removed per client's latest revision), just "Detailed quotes provided after a scoping call."

Descriptions to use:

Static Landing Page: "Lightning-fast single-page or simple marketing pages optimized for conversions"

Stunning Portfolio: "Showcase personal or corporate achievements with a visually unique, premium identity"

Dynamic Site / Web App: "Full-stack portals, dashboards, user accounts, and database integrations"

Highly Animated Site: "Creative WebGL, custom cursor animations, noise overlays, proximity text layouts"

Custom ERP & SaaS Platforms: "Enterprise workflow automation, invoice generators, client dashboards, advanced analytics"

Startup MVP Build: "Validate assumptions quickly with a scalable Minimum Viable Product"

Custom SaaS Platform: "Multi-tenant software, customer billing, payment modules, license dashboards"

Internal Enterprise Tool: "Secure CRM, ERP systems, internal databases, automated back-office tools"

API & Legacy Integrations: "Connect databases, webhooks, and third-party APIs into synchronized workflows"

3. Passport Service Detail Pages (one per sub-service, shared template + service-specific config)

Critical UX rule: the document checklist appears above/beside the personal-data form fields, so applicants see what they need before typing anything.

Page layout:

Service title + short description + urgency flag styling if applicable (e.g., Lost/Damaged gets an "Urgent" badge/treatment)

"Documents You'll Need" panel/card — checklist with icons, shown first

Below that: the intake form

Shared applicant fields (all 6 services): Full Name, Email, Phone (USA), Phone (Home Country), Date of Birth, Place of Birth

Service-specific additions (build the config-driven form so each service only shows its relevant extra fields; use these as sensible starting defaults since the PRD leaves exact document lists open — make them easy for me to edit later):

Passport Renewal — extra fields: Current Passport Number, Passport Issue Date, Passport Expiry Date. Checklist: current passport, passport-size photos, proof of address, old passport copies (if renewed before).

OCI — extra fields: Country of Origin (India), Relationship basis (self/spouse/parent), US Naturalization Date. Checklist: naturalized citizenship certificate, old Indian passport, US passport copy, photos, proof of address. (Note P1: add a short 1–2 question branch for adult/minor/naturalized/spouse OCI types later.)

Renunciation / Passport Surrender — extra fields: Reason for renunciation, Foreign citizenship acquisition date. Checklist: Indian passport, foreign naturalization certificate, photos, Form XXII.

Emergency Certificate — extra fields: Reason/emergency description, Travel date (if known). Checklist: proof of lost/damaged/expired passport, photos, travel itinerary if available.

E-Visa — extra fields: Destination country, Travel dates, Purpose of travel. Checklist: passport bio page, photo, travel itinerary, proof of accommodation.

Lost / Damaged Passport — mark as urgent styling. Extra fields: Police report number, Police report date, Date/circumstances of loss. Checklist: police report copy, photos, any surviving ID proof, old passport photocopy if available.

Document upload UI component (drag-and-drop, multi-file, per-checklist-item or general upload zone — your call on best UX) — local state only, stubbed backend call

Submit button → confirmation screen: "Thank you. We have received your request. Our team will review it and contact you shortly with next steps and the exact documents to prepare. Official government / VFS fees are paid by you directly to the respective authorities." Also show this as a confirmation email preview mock.

4. Application Status Tracking Page

Applicant enters a reference number/email to view a 3-step tracker (visual stepper component): (1) Government Form Status, (2) VFS Tracking, (3) FedEx/Courier Tracking. Each step shows a status badge (e.g., Not Started / In Progress / Completed) and any tracking number, using mock data.

5. Admin Portal (separate route, e.g. /admin)

Gate behind the simple local login stub mentioned above.

Dashboard: snapshot cards — new leads today/this week, breakdown by category (mock counts + a simple chart)

Enquiries & Leads table: columns — Date, Name, Email, Phone, Category, Service, Source (Form/Chat/Calendar), Status, Notes, Uploaded Documents. Include filtering, search, pagination, and a status workflow dropdown (New → In Progress → Contacted → Closed). Row expand/detail view shows the 3-step tracking fields as editable inputs.

Services & Pricing Management: table/list of all categories and sub-services with a Live/Hidden toggle and editable display price + short description fields

Export bar: "Export to Excel" button (UI + stub function) and a "Google Sheets Sync" status indicator (UI only)

RESPONSIVE / MOBILE-FIRST

Design mobile-first throughout — the chat widget, calendar booking, accordion navigation, and forms must all work cleanly on small viewports (single-column forms, full-screen modals instead of small popovers on mobile, large tap targets).

WHAT NOT TO BUILD YET

No real Supabase/database calls

No real authentication (local boolean gate only for admin)

No real file storage/upload (local state only)

No real LLM API call for chat (mock canned responses)

No real Excel export or Google Sheets sync (stub buttons with success toast)

Please build this as a cohesive, polished, ready-to-demo app with all pages/routes navigable and all mock interactions fully functional end-to-end (just not persisted to a real backend).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f503b2af-430f-4cc7-9ef1-7878aa3acde1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
