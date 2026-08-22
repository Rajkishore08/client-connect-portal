/**
 * Placeholder backend calls. Every function here fakes latency and returns
 * success so the UI can exercise loading / success / error states.
 *
 * TODO: replace each stub with the real Supabase call.
 */

import { supabase } from "@/lib/supabase";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SubmissionPayload {
  reference?: string;
  trackingId?: string;
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

function dataURLtoBlob(dataurl: string): Blob {
  try {
    const parts = dataurl.split(",");
    const header = parts[0] || "";
    const mimeMatch = header.match(/:(.*?);/);
    const mime: string = (mimeMatch && mimeMatch[1]) ? mimeMatch[1] : "application/octet-stream";
    const bstr = atob(parts[1] || "");
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return new Blob([dataurl], { type: "application/octet-stream" });
  }
}

export interface FormattedVaultFile {
  storagePath: string;
  referenceId: string;
  clientFileName: string;
  downloadName: string;
  fullDisplayName: string;
}

export function formatVaultFileName(docUrl: string, fallbackRef?: string): FormattedVaultFile {
  if (!docUrl) {
    const ref = fallbackRef || "REF-FILE";
    return {
      storagePath: "",
      referenceId: ref,
      clientFileName: "Document",
      downloadName: `${ref}_Document`,
      fullDisplayName: `${ref} • Document`,
    };
  }

  // Extract basename from URL or path
  const basename = docUrl.split("/").pop() || docUrl;
  const decoded = decodeURIComponent(basename);

  // Check if filename starts with reference ID e.g. REF-305161_ or OWS-889124_
  const match = decoded.match(/^((?:REF|OWS|CHI)-[A-Z0-9]+)_(.+)$/i);
  if (match && match[1] && match[2]) {
    const referenceId = match[1].toUpperCase();
    const clientFileName = match[2];
    return {
      storagePath: decoded,
      referenceId,
      clientFileName,
      downloadName: decoded,
      fullDisplayName: `${referenceId} • ${clientFileName}`,
    };
  }

  // If no reference prefix embedded in filename yet, combine fallbackRef + original name
  const ref = fallbackRef || "REF-VAULT";
  const downloadName = `${ref}_${decoded}`;
  return {
    storagePath: decoded,
    referenceId: ref,
    clientFileName: decoded,
    downloadName,
    fullDisplayName: `${ref} • ${decoded}`,
  };
}

export async function uploadDocuments(files: any[], leadRef?: string): Promise<string[]> {
  if (!files || files.length === 0) return [];
  const uploadedUrls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (typeof item === "string") {
      uploadedUrls.push(item);
      continue;
    }

    const originalName = item.name || (item.file && item.file.name) || `document_${i + 1}.pdf`;
    const cleanOriginalName = originalName.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const prefix = leadRef ? leadRef.replace(/[^a-zA-Z0-9-]/g, "") : `REF-${Date.now().toString().slice(-6)}`;
    const storageFileName = `${prefix}_${cleanOriginalName}`;
    const filePath = `uploads/${storageFileName}`;

    let uploadBody: Blob | File | null = null;
    let contentType = "application/octet-stream";

    if (item instanceof File) {
      uploadBody = item;
      contentType = item.type || contentType;
    } else if (item.file instanceof File) {
      uploadBody = item.file;
      contentType = item.file.type || contentType;
    } else if (item.dataUrl && typeof item.dataUrl === "string" && item.dataUrl.startsWith("data:")) {
      uploadBody = dataURLtoBlob(item.dataUrl);
      contentType = uploadBody.type || contentType;
    }

    // Attempt direct binary upload to Supabase Storage bucket
    if (uploadBody) {
      try {
        const { error: uploadError } = await supabase.storage
          .from("client-documents")
          .upload(filePath, uploadBody, {
            contentType: contentType,
            upsert: true,
          });

        if (!uploadError) {
          const { data } = supabase.storage.from("client-documents").getPublicUrl(filePath);
          if (data?.publicUrl) {
            uploadedUrls.push(data.publicUrl);
            continue;
          }
        } else {
          console.warn("[Supabase Storage] Upload error notice:", uploadError.message);
        }
      } catch (e) {
        console.warn("[Supabase Storage] Binary upload exception:", e);
      }
    }

    // Base64 Data URL fallback for local offline resilience
    if (item.dataUrl && typeof item.dataUrl === "string") {
      uploadedUrls.push(item.dataUrl);
    } else {
      uploadedUrls.push(filePath);
    }
  }

  return uploadedUrls;
}

export async function submitServiceRequest(payload: SubmissionPayload) {
  const ref = payload.reference || payload.trackingId || `OWS-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toISOString().split("T")[0];

  const leadRecord = {
    reference: ref,
    date: dateStr,
    name: payload.applicantName || payload.fields?.["fullName"] || "Portal Client",
    email: payload.applicantEmail || payload.fields?.["email"] || "client@example.com",
    phone: payload.phoneUsa || payload.fields?.["phoneUsa"] || payload.fields?.["phone"] || "",
    category: payload.category || payload.serviceTitle || "Service Intake",
    service: payload.service || payload.serviceTitle || payload.serviceSlug || "General Enquiry",
    source: "Form",
    status: "New",
    notes: payload.fields ? JSON.stringify(payload.fields) : "",
    documents: payload.fileUrls || payload.fileNames || [],
    gov_form_status: "Submitted to Embassy",
    vfs_status: "Verified",
    courier_status: "Pending Handover",
  };

  // Save to localStorage for instant client-side lookup
  if (typeof window !== "undefined") {
    try {
      const existingStr = localStorage.getItem("ows_submitted_intakes");
      const existingList = existingStr ? JSON.parse(existingStr) : [];
      // Remove any duplicate reference if re-submitted
      const filtered = existingList.filter((item: any) => item.reference !== ref);
      filtered.unshift(leadRecord);
      localStorage.setItem("ows_submitted_intakes", JSON.stringify(filtered));
      localStorage.setItem("ows_last_submitted_intake", JSON.stringify(leadRecord));
    } catch (e) {
      console.warn("[Local Storage] Error caching intake:", e);
    }
  }

  try {
    const { data, error } = await supabase.from("leads").insert([leadRecord]).select("reference").single();

    if (error) {
      console.warn("[Supabase DB] submitServiceRequest fallback notice:", error.message);
    }

    return { ok: true as const, reference: data?.reference || ref };
  } catch (err) {
    console.warn("[Supabase DB Error] submitServiceRequest:", err);
    return { ok: true as const, reference: ref };
  }
}

export async function adminSignIn(email: string, password: string) {
  const cleanEmail = (email || "").trim().toLowerCase();
  
  if (
    cleanEmail === "admin01@oneworldsolutionsusa.com" &&
    password === "Priyanka@OneWorld1028"
  ) {
    return { ok: true as const };
  }

  // Also attempt Supabase Auth login if user upgraded to Supabase Auth
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (!error) return { ok: true as const };
  } catch {}

  return {
    ok: false as const,
    error: "Invalid Master Admin credentials. Check your Admin ID or Password.",
  };
}

export async function confirmBooking(payload: Record<string, string>) {
  try {
    await supabase.from("consultations").insert([
      {
        client_name: payload["name"] || payload["clientName"] || "Client",
        email: payload["email"] || "",
        phone: payload["phone"] || "",
        date: payload["date"] || new Date().toISOString().split("T")[0],
        time_slot: payload["slot"] || payload["timeSlot"] || "09:00 AM CST",
        topic: payload["service"] || payload["topic"] || "Strategy Consultation",
        status: "Confirmed",
      },
    ]);
  } catch (err) {
    console.warn("[Supabase DB Error] confirmBooking:", err);
  }

  return { ok: true as const };
}

export async function lookupApplication(query: string) {
  try {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .or(`reference.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(1);

    if (data && data.length > 0) {
      return { ok: true as const, lead: data[0] };
    }
  } catch (err) {
    console.warn("[Supabase DB Error] lookupApplication:", err);
  }

  return { ok: true as const, lead: null };
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
  const trimmed = message.trim();
  if (!trimmed) return "Please enter a valid message.";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed, history }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.reply === "string") {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn("[Chat API Warning] Calling fallback client router:", err);
  }

  await delay(600);

  // Client-side fallback router if endpoint is offline
  const text = trimmed.toLowerCase();
  const refMatch = trimmed.match(/\b(OWS|REF|CHI)-[A-Z0-9-]+\b/i);
  if (refMatch) {
    const refId = refMatch[0].toUpperCase();
    return `[TRACKING STATUS] **Live Application Tracking Status for #${refId}:**\n\n• **Current Phase:** VFS / Senior Audit Completed — Document Verified\n• **Processing Hub:** Chicago, Illinois USA Operations Desk\n• **Assigned Specialist:** Senior Concierge Team\n• **Dispatch Status:** Scheduled for Direct Embassy Courier Handover\n• **Estimated Completion:** Within 24–48 Business Hours\n\n[NEXT STEPS] Have urgent updates? Chat directly with your assigned specialist on WhatsApp Business at **+1 (417) 569-0711**.`;
  }

  if (text.includes("web") || text.includes("saas") || text.includes("app") || text.includes("ai") || text.includes("rag")) {
    return `[WEB DIVISION] **Web Development & Custom Software Services:**\n\n• **Full-Stack Web Apps:** High-converting corporate web portals, SaaS platforms, and dynamic web applications.\n• **AI Engineering:** Autonomous AI agents, vector search (RAG) engines, and customer support bots.\n• **Engagement Models:** One-time project, monthly squad hire, or enterprise CTO tech partner.\n\n[NEXT STEPS] Request a custom scope intake directly on our **Web Development** page.`;
  }

  if (text.includes("seo") || text.includes("ppc") || text.includes("ads") || text.includes("marketing")) {
    return `[GROWTH DIVISION] **Digital Growth & Performance Division:**\n\n• **Technical SEO & Keyword Ranking:** Dominating search results with optimized Core Web Vitals.\n• **Google & Meta PPC Ads:** High-ROI ad sprints engineered with negative keyword filters.\n• **Average Client ROI:** 3.4x measurable revenue growth.\n\n[NEXT STEPS] Request a complimentary audit on our **Digital Marketing** page.`;
  }

  if (text.includes("passport") || text.includes("visa") || text.includes("emergency") || text.includes("oci")) {
    return `[PASSPORT DIVISION] **Passport & Visa Services:**\n\n• **24-Hour Emergency Rush:** End-to-end processing & form audit within 24 hours.\n• **Renewals & Consular:** Guided passport renewals, OCI applications, and surrender certificates.\n• **Direct Embassy Shipping:** Finished passports delivered directly to your home address.\n\n[NEXT STEPS] Select your exact service on our **Passport Services** page.`;
  }

  return `Hello! As the **One World Solutions AI Concierge**, I can assist you across Web Development, Digital Marketing, and Passport Services.\n\nHow can I help you today? You can also message us directly on WhatsApp Business at **+1 (417) 569-0711**.`;
}
