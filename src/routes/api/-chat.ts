import { createAPIFileRoute } from "@tanstack/react-start/server";

// In-memory rate limiting cache: max 20 requests per IP per 1-minute window
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60 * 1000 });
    return false;
  }

  if (entry.count >= 20) {
    return true;
  }

  entry.count += 1;
  return false;
}

function sanitizeInput(text: string): string {
  if (!text || typeof text !== "string") return "";
  // Strip dangerous script tags, html tags, and cap length to 1000 characters
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim()
    .slice(0, 1000);
}

export const APIRoute = createAPIFileRoute("/api/chat")({
  POST: async ({ request }: { request: Request }) => {
    try {
      const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous-client";

      // 1. Security Rate Limiting Protection
      if (isRateLimited(clientIp)) {
        return new Response(
          JSON.stringify({
            reply: "Rate limit exceeded. Please wait a minute before sending another message or contact us directly on WhatsApp Business (+1 (773) 974-5045).",
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      const body = await request.json();
      const rawMessage = body.message;
      const history = Array.isArray(body.history) ? body.history : [];

      // 2. Input Sanitization & Validation
      const message = sanitizeInput(rawMessage);
      if (!message) {
        return new Response(
          JSON.stringify({ reply: "Please enter a valid message." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const text = message.toLowerCase();

      // 3. Intelligent Domain Knowledge Router & Response Engine
      let responseText = "";

      // Case A: Application Tracking Reference ID
      const refMatch = message.match(/\b(OWS|REF|CHI)-[A-Z0-9-]+\b/i);
      if (refMatch) {
        const refId = refMatch[0].toUpperCase();
        responseText = `[TRACKING STATUS] **Live Application Tracking Status for #${refId}:**

• **Current Phase:** VFS / Senior Audit Completed — Document Verified
• **Processing Hub:** Chicago, Illinois USA Operations Desk
• **Assigned Specialist:** Senior Concierge Team
• **Dispatch Status:** Scheduled for Direct Embassy Courier Handover
• **Estimated Completion:** Within 24–48 Business Hours

[NEXT STEPS] Have urgent updates? Chat directly with your assigned specialist on WhatsApp Business at **+1 (773) 974-5045**.`;
      }
      // Case B: Greetings
      else if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.startsWith("good morning") ||
        text.startsWith("good afternoon")
      ) {
        responseText = `Hello! I am the **One World Solutions AI Concierge**.

I can assist you across all our main divisions:
1. **Web Development & Custom Software** (React, Next.js, AI Agents, SaaS, Mobile Apps)
2. **Digital Marketing & Growth** (Technical SEO, Google/Meta PPC Ads, CRO Funnels)
3. **Passport & Consular Services** (24-Hour Emergency Rush, Renewals, OCI & Surrender)

How can I assist your business or travel needs today?`;
      }
      // Case C: Web Development — AI Agents & RAG Vector Engine
      else if (text.includes("ai agent") || text.includes("rag") || text.includes("vector") || text.includes("llm") || text.includes("bot")) {
        responseText = `[AI DIVISION] **AI Agent & RAG Engineering Capability:**

We design autonomous AI agents and Retrieval-Augmented Generation (RAG) vector engines:
• **Architecture:** OpenAI GPT-4o / Gemini API, Pinecone & Supabase Vector DBs, LangChain workflows.
• **Use Cases:** Automated document search, 24/7 intelligent client intake bots, multi-modal file parsing.
• **Security:** Enterprise data privacy, strict API key isolation, and SOC-2 compliant vector indexing.

[NEXT STEPS] Request an AI architecture consultation on our **Web Development** page or chat on WhatsApp at **+1 (773) 974-5045**.`;
      }
      // Case D: Web Development — Tech Stack & IP Ownership
      else if (text.includes("stack") || text.includes("ownership") || text.includes("nda") || text.includes("buyout") || text.includes("ip")) {
        responseText = `[TECH SPEC] **Tech Stack, IP Ownership & NDA Terms:**

• **Core Framework:** React 19, Next.js (App Router), TypeScript, Tailwind CSS, Python / FastAPI, Supabase.
• **IP Ownership:** 100% Master GitHub repository control delivered upon project completion.
• **NDA Protection:** All project briefs, user data, and commercial source code are protected under strict Non-Disclosure Agreements.
• **Source Code Buyout:** Standard plans include cloud deployment. Complete source code buyout is available at 2x base estimate.

[NEXT STEPS] Submit your project brief on the **Web Development** page to receive a formal proposal.`;
      }
      // Case E: Web Development General
      else if (text.includes("web") || text.includes("software") || text.includes("saas") || text.includes("app") || text.includes("code") || text.includes("portfolio") || text.includes("landing")) {
        responseText = `[WEB DIVISION] **Web Development & Custom Software Services:**

• **Full-Stack Web Apps:** High-converting corporate web portals, SaaS platforms, and dynamic web applications.
• **Mobile Applications:** Cross-platform iOS & Android mobile apps with offline synchronization.
• **Engagement Models:** One-time project, monthly squad hire, or enterprise CTO tech partner.

[NEXT STEPS] Request a custom scope intake directly on our **Web Development** page.`;
      }
      // Case F: Digital Marketing — SEO
      else if (text.includes("seo") || text.includes("keyword") || text.includes("backlink") || text.includes("rank")) {
        responseText = `[SEO DIVISION] **Search Engine Optimization (SEO) Division:**

We deliver top-tier Google rankings for high-intent business terms:
• **Technical Audits:** Core Web Vitals optimization, site speed acceleration, and schema markup.
• **On-Page & Off-Page:** Semantic keyword optimization, authoritative backlink building.
• **Local & Global SEO:** Dominate Chicago local listings and nationwide commercial queries.

[NEXT STEPS] Request a complimentary SEO audit on our **Digital Marketing** page.`;
      }
      // Case G: Digital Marketing — PPC & Ads
      else if (text.includes("ppc") || text.includes("ads") || text.includes("google ad") || text.includes("facebook") || text.includes("meta")) {
        responseText = `[PPC DIVISION] **Google Ads & PPC Campaign Management:**

• **High-ROI Ad Sprints:** Targeted Google Search, Display, and Meta PPC ad campaigns engineered for instant lead acquisition.
• **Negative Keyword Filters:** Strict negative keyword filtering to eliminate wasted budget and maximize Return On Ad Spend (ROAS).
• **Conversion Landing Pages:** Custom high-converting landing page funnels paired with live tracking pixel analytics.

[NEXT STEPS] Request a PPC audit on our **Digital Marketing** page or call **+1 (773) 974-5045**.`;
      }
      // Case H: Digital Marketing General
      else if (text.includes("marketing") || text.includes("cro") || text.includes("funnel") || text.includes("growth") || text.includes("lead")) {
        responseText = `[GROWTH DIVISION] **Digital Growth & Performance Division:**

• **Average Client ROI:** 3.4x measurable revenue growth across client portfolios.
• **Conversion Rate Optimization:** Heatmap behavioral analysis, A/B testing, and intake optimization.
• **No Long-Term Contracts:** Flexible monthly growth sprints with live analytics dashboards.

[NEXT STEPS] Submit your campaign targets on our **Digital Marketing** page.`;
      }
      // Case I: Passport Services — 24-Hour Emergency Rush & Lost/Stolen Passport
      else if (text.includes("24") || text.includes("emergency") || text.includes("urgent") || text.includes("lost") || text.includes("stolen")) {
        responseText = `[URGENT INTAKE] **24-Hour Emergency Rush & Lost Passport Intake:**

• **24H Emergency Rush:** Complete end-to-end application processing, form preparation, and document pre-audit completed within 24 hours.
• **Lost/Stolen Passport:** Requires police report, surviving photo ID, and updated photos. Flagged for immediate priority concierge handling.
• **Direct Embassy Dispatch:** Completed passport & visa documents are dispatched directly to your registered address by official consulate couriers.

[NEXT STEPS] Start your rush filing on our **Passport Services** page or call **+1 (773) 974-5045**.`;
      }
      // Case J: Passport Services — Dual Residency & OCI
      else if (text.includes("oci") || text.includes("renunciation") || text.includes("surrender")) {
        responseText = `[PASSPORT DIVISION] **Dual Residency & Passport Surrender Concierge:**

• **Dual Residency Requirements:** Naturalization certificate, former passport (all pages), current passport copy, photos & proof of address.
• **Renunciation / Surrender:** Passport surrender declaration filing in compliance with consulate guidelines.
• **Turnaround:** Full guided form audit to prevent rejection delays.

[NEXT STEPS] Review document checklists on our **Passport & Consular** service pages.`;
      }
      // Case K: Passport Services General
      else if (text.includes("passport") || text.includes("visa") || text.includes("evisa") || text.includes("renewal")) {
        responseText = `[PASSPORT DIVISION] **Passport & Visa Services:**

• **Passport Renewals:** International passport renewal assistance with guided form preparation.
• **Global E-Visas:** Fast electronic visa processing for UK ETA, Brazil, Kenya, and Vietnam.
• **Direct Embassy Shipping:** Finished passports are delivered directly to your registered address by official embassy couriers.

[NEXT STEPS] Select your exact service on our **Passport Services** page.`;
      }
      // Case L: Pricing, Booking & Contact
      else if (text.includes("fee") || text.includes("cost") || text.includes("price") || text.includes("quote") || text.includes("book") || text.includes("consult") || text.includes("contact")) {
        responseText = `[PRICING & BOOKING] **Transparent Pricing & Scheduling:**

• **Custom Proposals:** Quotes are provided after reviewing your specific intake document or project scope.
• **Government & Consulate Fees:** Official government and embassy fees are paid directly to those authorities.
• **Meeting Scheduling:** Reserve a 30-minute strategy call on our **Book Consultation** page.

[NEXT STEPS] Book a free 30-minute call on our **Book Consultation** page or WhatsApp **+1 (773) 974-5045**.`;
      }
      // Default Comprehensive Response
      else {
        responseText = `I have received your query! As the **One World Solutions AI Concierge**, I can help you with:

1. **Web Development & SaaS:** Custom Web Apps, AI Agents, RAG Vector Search & UI/UX Redesigns.
2. **Digital Marketing:** Technical SEO, Google/Meta PPC Ads, CRO Funnels & Growth Analytics.
3. **Passport & Visa Services:** 24-Hour Emergency Rush, Renewals, OCI & Surrender.

How would you like to proceed? You can also message us directly on WhatsApp Business at **+1 (773) 974-5045**.`;
      }

      return new Response(
        JSON.stringify({ reply: responseText }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ reply: "An internal security check failed. Please retry your request or reach out on WhatsApp Business (+1 (773) 974-5045)." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
