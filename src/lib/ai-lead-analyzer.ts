import type { Lead } from "@/data/mock-data";

export interface AILeadAnalysis {
  estimatedValueUsd: number;
  estimatedDays: number;
  priorityLevel: "Urgent (24H)" | "Standard" | "High Value";
  executiveSummary: string;
  recommendedChecklist: { item: string; required: boolean }[];
  suggestedClientResponse: string;
}

/**
 * AI Engine for analyzing incoming leads, calculating estimates,
 * and generating document checklists & response templates.
 */
export function analyzeLeadWithAI(lead: Lead): AILeadAnalysis {
  const category = (lead.category || "").toLowerCase();
  const service = (lead.service || "").toLowerCase();
  const notes = (lead.notes || "").toLowerCase();

  // 1. Passport & Visa Services
  if (category.includes("passport") || category.includes("visa")) {
    const isRush = notes.includes("urgent") || notes.includes("emergency") || service.includes("24h") || service.includes("expedited");
    const isOci = service.includes("oci");
    const isRenunciation = service.includes("renunciation") || service.includes("surrender");

    let val = 180;
    let days = 7;
    let priority: "Urgent (24H)" | "Standard" | "High Value" = "Standard";

    if (isRush) {
      val = 350;
      days = 1;
      priority = "Urgent (24H)";
    } else if (isOci) {
      val = 220;
      days = 21;
    } else if (isRenunciation) {
      val = 240;
      days = 14;
    }

    return {
      estimatedValueUsd: val,
      estimatedDays: days,
      priorityLevel: priority,
      executiveSummary: `AI Audit: Client requested ${lead.service}. ${
        isRush ? "URGENT 24H HAND-CARRY CHANNEL REQUIRED." : "Standard consulate queue processing."
      } Document compliance check needed before submission.`,
      recommendedChecklist: [
        { item: "Original US Passport (Valid > 6 Months)", required: true },
        { item: "Recent 2x2 Color Photo (Plain White Background)", required: true },
        { item: isOci ? "Naturalization Certificate & Surrender Cert" : "Proof of Chicago State Address", required: true },
        { item: "VFS / Government Consular Form Signature Page", required: true },
      ],
      suggestedClientResponse: `Hi ${lead.name}, thank you for contacting One World Solutions in Chicago regarding your ${lead.service} (Ref: ${lead.reference}). Our senior consular specialist has prepared your document checklist. Please verify your original passport is ready.`,
    };
  }

  // 2. Web Development & Software Engineering
  if (category.includes("web") || category.includes("software")) {
    const isAiSaaS = notes.includes("ai") || service.includes("ai") || notes.includes("rag");
    const isEnterprise = notes.includes("enterprise") || notes.includes("source code");

    let val = 2500;
    let days = 14;
    let priority: "Urgent (24H)" | "Standard" | "High Value" = "High Value";

    if (isAiSaaS || isEnterprise) {
      val = 5500;
      days = 30;
      priority = "High Value";
    }

    return {
      estimatedValueUsd: val,
      estimatedDays: days,
      priorityLevel: priority,
      executiveSummary: `AI Audit: High-value Software Engineering Lead (${lead.service}). Recommended technology stack: Next.js + React + Supabase PostgreSQL + OpenAI Vector Embeddings. PRD scoping call recommended.`,
      recommendedChecklist: [
        { item: "PRD / Feature Scoping Document", required: true },
        { item: "Figma UI/UX Wireframes or Brand Guide", required: false },
        { item: "Supabase DB & OpenAI API Key Credentials", required: true },
        { item: "Domain & Vercel / Cloud Deployment Access", required: true },
      ],
      suggestedClientResponse: `Dear ${lead.name},\n\nOur software engineering lead in Chicago has reviewed your project brief for ${lead.service} (Ref: ${lead.reference}). We have reserved a technical architecture consultation slot for your team.`,
    };
  }

  // 3. Digital Marketing & Growth
  let val = 1200;
  let days = 30;

  return {
    estimatedValueUsd: val,
    estimatedDays: days,
    priorityLevel: "Standard",
    executiveSummary: `AI Audit: Digital Marketing & PPC Campaign Lead (${lead.service}). Focus on high-intent lead generation, negative keyword filters, and landing page conversion optimization.`,
    recommendedChecklist: [
      { item: "Google Ads / Meta Business Manager Admin Access", required: true },
      { item: "Monthly Ad Budget & Target Location Specs", required: true },
      { item: "Google Analytics 4 (GA4) Tracking Pixel", required: true },
    ],
    suggestedClientResponse: `Hi ${lead.name}, our digital marketing team has analyzed your enquiry for ${lead.service} (Ref: ${lead.reference}). We have prepared your initial PPC account audit report.`,
  };
}
