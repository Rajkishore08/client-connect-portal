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
  await delay(900);
  const text = message.toLowerCase();
  if (text.includes("track")) {
    return "You can track your application on the Track My Application page using your reference number (for example REF-100241) or the email you applied with.";
  }
  if (text.includes("lost") || text.includes("stolen")) {
    return "Sorry to hear that. For a lost passport you'll need a police report, photographs and any surviving ID. Start with our Lost / Damaged Passport service — it's flagged urgent and we prioritise those requests.";
  }
  if (text.includes("book") || text.includes("consult") || text.includes("meeting")) {
    return "Happy to help — head to Book a Consultation, pick a date and a time slot, and leave your contact details. We'll confirm by email.";
  }
  if (text.includes("oci")) {
    return "For OCI we'll need your naturalisation certificate, old Indian passport, US passport copy, photos and proof of address. Open the OCI service page to see the full checklist before you start filling anything in.";
  }
  if (text.includes("fee") || text.includes("cost") || text.includes("price")) {
    return "Our service fee is quoted after we review your case. Official government, embassy and VFS fees are always paid by you directly to those authorities — we never collect them.";
  }
  return "Thanks for your message. A team member will follow up, but I can help right away with tracking an application, document checklists, or booking a consultation.";
}
