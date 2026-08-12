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
  await delay(800);
  const text = message.toLowerCase();

  // 1. Web Development & Custom Software Engineering
  if (
    text.includes("web") ||
    text.includes("software") ||
    text.includes("saas") ||
    text.includes("app") ||
    text.includes("tech") ||
    text.includes("ai") ||
    text.includes("rag") ||
    text.includes("code") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("stack")
  ) {
    return `🚀 **One World Software Division — Technical Overview:**

We build modern, high-performance web applications, enterprise SaaS platforms, AI Agents & RAG Vector engines, and cross-platform mobile apps:

• **Tech Stack:** React 19, Next.js, TypeScript, Tailwind CSS, Python / FastAPI, PostgreSQL, Supabase & Vector Search.
• **AI Agent & RAG Engineering:** We build intelligent document search, automated customer intake bots, and LLM-powered business workflows.
• **Delivery & Ownership:** 2-4 week rapid MVP sprints, strict NDA protection, full GitHub repository control, and complete commercial source code ownership.

👉 You can request a custom scope analysis and technical proposal directly on our **Web Development** page or WhatsApp us at **+1 (417) 569-0711**.`;
  }

  // 2. Digital Marketing & Performance Growth
  if (
    text.includes("marketing") ||
    text.includes("seo") ||
    text.includes("ppc") ||
    text.includes("ads") ||
    text.includes("google") ||
    text.includes("meta") ||
    text.includes("lead") ||
    text.includes("growth") ||
    text.includes("cro") ||
    text.includes("rank") ||
    text.includes("funnel") ||
    text.includes("traffic")
  ) {
    return `📈 **One World Digital Growth Division — Strategy Breakdown:**

We engineer data-driven marketing campaigns designed to scale revenue with an average **3.4x Client ROI**:

• **SEO & Keyword Dominance:** Full technical site audits, on-page optimization, content velocity, and high-authority link acquisition for top Google rankings.
• **High-ROI Paid Ads (PPC):** Targeted Google Search, Display, and Meta (Facebook/Instagram) ad campaigns with negative keyword filtering to maximize qualified lead volume.
• **Conversion Rate Optimization (CRO):** Behavioral heatmap analysis, A/B testing, and frictionless intake funnels that turn visitors into paying clients.
• **Reporting & Contracts:** Live transparent client analytics with monthly reporting and no long-term lock-in contracts.

👉 Request a free SEO & campaign audit on our **Digital Marketing** page or chat with our growth team on WhatsApp at **+1 (417) 569-0711**.`;
  }

  // 3. Passport, OCI & Visa Concierge
  if (
    text.includes("passport") ||
    text.includes("oci") ||
    text.includes("renunciation") ||
    text.includes("surrender") ||
    text.includes("visa") ||
    text.includes("evisa") ||
    text.includes("urgent") ||
    text.includes("emergency") ||
    text.includes("rush") ||
    text.includes("vfs")
  ) {
    return `🛂 **Passport & Visa Concierge Services:**

We provide expedited 24-Hour Emergency Rush intake, Indian & US Passport Renewals, OCI Card applications, Renunciation/Surrender certificates, and E-Visas:

• **24-Hour Emergency Intake:** End-to-end application processing, form filling, government fee guidance, and VFS document pre-audit within 24 hours.
• **Direct Embassy Dispatch:** Completed passport & visa documents are dispatched directly to your home address by official consulate couriers.
• **Requirements:** Original Passport, 2x2 US photo specs, proof of address, naturalization certificate (for OCI/Renunciation).

👉 Start your intake form on our **Passport Services** page or check your status on **Track Application**.`;
  }

  // 4. Application Tracking
  if (text.includes("track") || text.includes("status") || text.includes("ref")) {
    return "🔍 **Track Active Application:** You can check your live intake or filing status on the **Track Application** page using your Reference ID (e.g., OWS-WEB-10241) or registered email address.";
  }

  // 5. Lost / Damaged Passport Emergency
  if (text.includes("lost") || text.includes("damaged") || text.includes("stolen")) {
    return "🚨 **Lost or Damaged Passport Urgent Assistance:** We prioritize lost passport cases. You will need a police report, surviving government photo ID, and updated passport photos. Start your intake under the **Lost / Damaged Passport** service for 24-Hour priority handling.";
  }

  // 6. Pricing, Consultations & Contact
  if (
    text.includes("fee") ||
    text.includes("cost") ||
    text.includes("price") ||
    text.includes("book") ||
    text.includes("consult") ||
    text.includes("contact") ||
    text.includes("location") ||
    text.includes("phone")
  ) {
    return `💼 **Consultations & Scoping:**

• **Location:** Chicago, Illinois USA.
• **WhatsApp Business:** Chat instantly with our specialists at **+1 (417) 569-0711**.
• **Pricing Policy:** Transparent project proposals provided after reviewing your specific intake requirements. Government & embassy fees are always paid directly by you to those authorities.
• **1-on-1 Strategy Call:** Book a free 30-minute consultation on our **Book Consultation** page.`;
  }

  return `Hello! I am the **One World Solutions AI Concierge**. I provide in-depth assistance across our 3 core divisions:

1. 🌐 **Web Development & SaaS Platforms** (Custom Web Apps, AI Agents, RAG Engines, UI/UX)
2. 📈 **Digital Marketing & SEO Growth** (Google/Meta PPC Ads, Technical SEO, Lead Funnels)
3. 🛂 **Passport & Visa Services** (24-Hour Emergency Rush, Renewals, OCI & Surrender)

How can I help you today? Feel free to ask a specific question or message us on WhatsApp Business at **+1 (417) 569-0711**.`;
}
