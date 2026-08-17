/**
 * Placeholder backend calls. Every function here fakes latency and returns
 * success so the UI can exercise loading / success / error states.
 *
 * TODO: replace each stub with the real Supabase call.
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SubmissionPayload {
  category?: string;
  service?: string;
  serviceSlug?: string;
  serviceTitle?: string;
  applicantName?: string;
  applicantEmail?: string;
  phoneUsa?: string;
  speedTierId?: string;
  shippingOptionId?: string;
  fileUrls?: string[];
  fields?: Record<string, string | undefined>;
  fileNames?: string[];
}

export async function submitServiceRequest(payload: SubmissionPayload) {
  // TODO: replace with Supabase insert into `leads`
  console.info("[stub] submitServiceRequest", payload);
  await delay(1100);
  return { ok: true as const, reference: `REF-${Math.floor(100000 + Math.random() * 899999)}` };
}

export async function uploadDocuments(files: any[]): Promise<string[]> {
  // TODO: replace with Supabase Storage upload
  console.info("[stub] uploadDocuments", files.map((f) => f.name));
  await delay(600);
  return files.map(
    (f, i) => f.dataUrl || `https://storage.oneworldsolutions.com/uploads/${Date.now()}-${i}-${f.name || "document"}`
  );
}

export async function adminSignIn(email: string, password: string) {
  // TODO: replace with Supabase auth signInWithPassword
  console.info("[stub] adminSignIn", email);
  await delay(800);
  if (!email.includes("@") || password.length < 4) {
    return { ok: false as const, error: "Invalid email or password. Try admin@portal.com / demo1234" };
  }
  return { ok: true as const };
}

export async function confirmBooking(payload: Record<string, string>) {
  // TODO: replace with Supabase insert into `bookings`
  console.info("[stub] confirmBooking", payload);
  await delay(900);
  return { ok: true as const };
}

export async function lookupApplication(query: string) {
  // TODO: replace with Supabase select from `leads` by reference/email
  console.info("[stub] lookupApplication", query);
  await delay(700);
  return { ok: true as const };
}

export async function exportLeadsToExcel() {
  // TODO: replace with real XLSX export / edge function
  console.info("[stub] exportLeadsToExcel");
  await delay(900);
  return { ok: true as const };
}

/**
 * The single place where the real LLM call will live.
 * TODO: replace with a streaming call to the AI gateway.
 */
export async function sendChatMessage(message: string, history: { role: string; text: string }[]) {
  console.info("[stub] sendChatMessage", message, history.length);
  await delay(700);

  const raw = message.trim();
  const text = raw.toLowerCase();

  // Edge Case 0: Reference Tracking ID match (e.g. OWS-WEB-10241, REF-99214, CHI-8821)
  const refMatch = raw.match(/\b(OWS|REF|CHI)-[A-Z0-9-]+\b/i);
  if (refMatch) {
    const refId = refMatch[0].toUpperCase();
    return `[TRACKING STATUS] **Live Application Tracking Status for #${refId}:**

• **Current Phase:** VFS / Senior Audit Completed — Document Verified
• **Processing Hub:** Chicago, Illinois USA Operations Desk
• **Assigned Specialist:** Senior Concierge Team
• **Dispatch Status:** Scheduled for Direct Embassy Courier Handover
• **Estimated Completion:** Within 24–48 Business Hours

[NEXT STEPS] Have urgent updates? Chat directly with your assigned specialist on WhatsApp Business at **+1 (417) 569-0711**.`;
  }

  // Edge Case 1: Greetings & Casual Conversational Inputs
  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.startsWith("good morning") ||
    text.startsWith("good afternoon") ||
    text.startsWith("who are you") ||
    text.startsWith("what can you do")
  ) {
    return `Hello! I am the **One World Solutions AI Concierge**. I can immediately assist you with:

1. **Web Development & SaaS Platforms** (React, Next.js, AI Agents, Vector Search, MVP Sprints)
2. **Digital Marketing & Growth** (Technical SEO, Google/Meta PPC Ads, CRO Funnels, Analytics)
3. **Passport & Visa Services** (24-Hour Emergency Intake, Renewals, OCI & Surrender)

How can I assist your business or travel needs today? You can also message us directly on WhatsApp Business at **+1 (417) 569-0711**.`;
  }

  // Edge Case 2: Thanks / Gratitude
  if (text.includes("thank") || text.includes("thanks") || text.includes("great") || text.includes("awesome")) {
    return "You are very welcome! If you need further assistance with your application or project scoping, feel free to ask or connect with us on WhatsApp at **+1 (417) 569-0711**.";
  }

  // Edge Case 3: Web Dev — AI Agents & RAG Vector Engine
  if (text.includes("ai agent") || text.includes("rag") || text.includes("vector") || text.includes("llm") || text.includes("bot")) {
    return `[AI DIVISION] **AI Agent & RAG Engineering Capability:**

We design autonomous AI agents and Retrieval-Augmented Generation (RAG) vector engines:

• **Architecture:** OpenAI GPT-4o / Gemini API, Pinecone & Supabase Vector DBs, LangChain / LlamaIndex workflows.
• **Use Cases:** Automated document search, 24/7 intelligent client intake bots, multi-modal file parsing, and customer support automation.
• **Security:** Enterprise data privacy, strict API key isolation, and SOC-2 compliant vector indexing.

[NEXT STEPS] Request an AI architecture consultation on our **Web Development** page or chat on WhatsApp at **+1 (417) 569-0711**.`;
  }

  // Edge Case 4: Web Dev — Tech Stack, IP & Source Code Buyout Policy
  if (text.includes("stack") || text.includes("ownership") || text.includes("nda") || text.includes("github") || text.includes("buyout") || text.includes("ip")) {
    return `[TECH SPEC] **Tech Stack, IP Ownership & NDA Terms:**

• **Core Framework:** React 19, Next.js (App Router), TypeScript, Tailwind CSS, Python / FastAPI, PostgreSQL & Supabase.
• **IP Ownership:** 100% Master GitHub repository control delivered upon project completion.
• **NDA Protection:** All project briefs, user data, and commercial source code are protected under strict Non-Disclosure Agreements.
• **Source Code Buyout:** Standard plans include cloud deployment. Complete source code buyout & IP transfer is available at **2x (double)** the project base estimate.

[NEXT STEPS] Submit your PRD or project brief on the **Web Development** page to receive a formal proposal.`;
  }

  // Edge Case 5: Web Dev General & App Building
  if (
    text.includes("web") ||
    text.includes("software") ||
    text.includes("saas") ||
    text.includes("app") ||
    text.includes("code") ||
    text.includes("mobile") ||
    text.includes("redesign")
  ) {
    return `[WEB DIVISION] **Web Development & Custom Software Services:**

• **Full-Stack Web Apps:** High-converting corporate web portals, SaaS platforms, and dynamic web applications.
• **Mobile Applications:** Cross-platform iOS & Android mobile apps with offline synchronization.
• **Rapid MVP Launch:** Prototype to production launch in 2–4 week sprints.

[NEXT STEPS] Request a custom scope intake directly on our **Web Development** page.`;
  }

  // Edge Case 6: Digital Marketing — Technical SEO & Keyword Ranking
  if (text.includes("seo") || text.includes("keyword") || text.includes("backlink") || text.includes("rank")) {
    return `[SEO DIVISION] **Search Engine Optimization (SEO) Division:**

We deliver top-tier Google rankings for high-intent business terms:

• **Technical Audits:** Core Web Vitals optimization, site speed acceleration, and schema markup structure.
• **On-Page & Off-Page:** Semantic keyword optimization, authoritative backlink building, and content velocity engines.
• **Local & Global SEO:** Dominate Chicago local listings and nationwide commercial queries.

[NEXT STEPS] Request a complimentary SEO audit on our **Digital Marketing** page.`;
  }

  // Edge Case 7: Digital Marketing — Paid Ads (PPC) & Google/Meta Campaigns
  if (text.includes("ppc") || text.includes("ads") || text.includes("google ad") || text.includes("facebook") || text.includes("meta")) {
    return `[PPC DIVISION] **Google Ads & PPC Campaign Management:**

• **High-ROI Ad Sprints:** Targeted Google Search, Display, and Meta PPC ad campaigns engineered for instant lead acquisition.
• **Negative Keyword Filters:** Strict negative keyword filtering to eliminate wasted budget and maximize Return On Ad Spend (ROAS).
• **Conversion Landing Pages:** Custom high-converting landing page funnels paired with live tracking pixel analytics.

[NEXT STEPS] Request a PPC audit on our **Digital Marketing** page or call **+1 (417) 569-0711**.`;
  }

  // Edge Case 8: Digital Marketing General & ROI Analytics
  if (text.includes("marketing") || text.includes("cro") || text.includes("funnel") || text.includes("growth") || text.includes("lead")) {
    return `[GROWTH DIVISION] **Digital Growth & Performance Division:**

• **Average Client ROI:** 3.4x measurable revenue growth across client portfolios.
• **Conversion Rate Optimization:** Heatmap behavioral analysis, A/B testing, and intake optimization.
• **No Long-Term Contracts:** Flexible monthly growth sprints with live analytics dashboards.

[NEXT STEPS] Submit your campaign targets on our **Digital Marketing** page.`;
  }

  // Edge Case 9: Passport — 24-Hour Emergency Rush & Lost/Stolen Passport
  if (text.includes("24") || text.includes("emergency") || text.includes("urgent") || text.includes("lost") || text.includes("stolen")) {
    return `[URGENT INTAKE] **24-Hour Emergency Rush & Lost Passport Intake:**

• **24H Emergency Rush:** Complete end-to-end application processing, form preparation, and document pre-audit completed within 24 hours.
• **Lost/Stolen Passport:** Requires police report, surviving photo ID, and updated photos. Flagged for immediate priority concierge handling.
• **Direct Embassy Dispatch:** Completed passport & visa documents are dispatched directly to your registered address by official consulate couriers.

[NEXT STEPS] Start your rush filing on our **Passport Services** page or call **+1 (417) 569-0711**.`;
  }

  // Edge Case 10: Passport — Dual Residency & Renunciation / Surrender Certificate
  if (text.includes("oci") || text.includes("renunciation") || text.includes("surrender")) {
    return `[PASSPORT DIVISION] **Dual Residency & Passport Surrender Concierge:**

• **Dual Residency Requirements:** Naturalization certificate, former passport (all pages), current passport copy, photos & proof of address.
• **Renunciation / Surrender:** Passport surrender declaration filing in compliance with consulate guidelines.
• **Turnaround:** Full guided form audit to prevent rejection delays.

[NEXT STEPS] Review document checklists on our **Passport & Consular** service pages.`;
  }

  // Edge Case 11: Passport & Visa General / E-Visas
  if (text.includes("passport") || text.includes("visa") || text.includes("evisa") || text.includes("renewal")) {
    return `[PASSPORT DIVISION] **Passport & Visa Services:**

• **Passport Renewals:** International passport renewal assistance with guided form preparation.
• **Global E-Visas:** Fast electronic visa processing for UK ETA, Brazil, Kenya, and Vietnam.
• **Direct Embassy Shipping:** Finished passports are delivered directly to your registered address by official embassy couriers.

[NEXT STEPS] Select your exact service on our **Passport Services** page.`;
  }

  // Edge Case 12: Pricing, Fees & Scoping Policy
  if (text.includes("fee") || text.includes("cost") || text.includes("price") || text.includes("quote")) {
    return `[PRICING POLICY] **Transparent Pricing & Fee Structure:**

• **Custom Proposals:** Quotes are provided after reviewing your specific intake document or project scope.
• **Government & Consulate Fees:** Official government and embassy fees are paid directly to those authorities.
• **No Hidden Fees:** 100% upfront quote guarantee before work begins.

[NEXT STEPS] Book a free 30-minute scoping call on our **Book Consultation** page or WhatsApp **+1 (417) 569-0711**.`;
  }

  // Edge Case 13: Location, Contact & Booking
  if (text.includes("book") || text.includes("consult") || text.includes("location") || text.includes("address") || text.includes("phone") || text.includes("whatsapp")) {
    return `[CONTACT INFO] **Office & Direct Contact Details:**

• **Location:** Chicago, Illinois USA.
• **WhatsApp Business:** **+1 (417) 569-0711** (Direct instant chat).
• **Phone Hotline:** **+1 (417) 569-0711**.
• **Appointment Policy:** All services are strictly by online intake or scheduled appointment only (no walk-ins).

[NEXT STEPS] Reserve a time slot on our **Book Consultation** page.`;
  }

  // Default Intelligent Fallback Response
  return `I have received your request! I am the **One World Solutions AI Concierge**. Here is how we can immediately assist you:

1. **Web Development & Custom Software:** Custom Web Apps, Enterprise SaaS, AI Agents, RAG Vector Search & UI/UX.
2. **Digital Marketing & Growth:** SEO Keyword Ranking, Google/Meta PPC Ads, CRO Funnels & 3.4x ROI Sprints.
3. **Passport & Visa Concierge:** 24-Hour Emergency Rush, Renewals, Dual Residency & Surrender.

How can I help you today? Feel free to ask a specific question or message us directly on WhatsApp Business at **+1 (417) 569-0711**.`;
}
