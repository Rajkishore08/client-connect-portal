import {
  LEADS,
  getDefaultMilestonesForCategory,
  type Lead,
  type LeadStatus,
  type Milestone,
  type TrackStatus,
} from "@/data/mock-data";
import { supabase } from "@/lib/supabase";

/** Helper to map raw Supabase row to typed Lead interface */
function mapSupabaseRowToLead(row: Record<string, any>): Lead {
  const category = row["category"] || "General Enquiry";
  const rawStatus = row["status"] || "New";

  // Map legacy status strings to active pipeline status
  let status: LeadStatus = "New";
  if (rawStatus === "Contacted") status = "In Contact";
  else if (rawStatus === "Closed") status = "Completed";
  else status = rawStatus as LeadStatus;

  const milestones: Milestone[] = Array.isArray(row["milestones"]) && row["milestones"].length > 0
    ? row["milestones"]
    : getDefaultMilestonesForCategory(category);

  const notesText = row["notes"] || "";
  const isSpecial = notesText.includes("SPECIAL ENGAGEMENT REQUEST") || row["priority"] === "High";

  return {
    id: String(row["id"]),
    reference: row["reference"] || `OWS-${Date.now()}`,
    date: row["date"] || new Date().toISOString().split("T")[0]!,
    name: row["name"] || "Client",
    email: row["email"] || "",
    phone: row["phone"] || "",
    category: category,
    service: row["service"] || "Service Intake",
    source: (row["source"] as any) || "Form",
    status: status,
    priority: isSpecial ? "High" : "Normal",
    isSpecialRequest: isSpecial,
    engagementModel: row["engagement_model"] || (notesText.match(/SPECIAL ENGAGEMENT REQUEST: \[(.*?)\]/)?.[1] || ""),
    progressPercent: typeof row["progress_percent"] === "number" ? row["progress_percent"] : 45,
    notes: notesText,
    documents: Array.isArray(row["documents"]) ? row["documents"] : [],
    milestones: milestones,
    tracking: {
      governmentForm: {
        status: (row["gov_form_status"] as TrackStatus) || "Not Started",
        ref: row["gov_form_ref"] || "",
      },
      vfs: {
        status: (row["vfs_status"] as TrackStatus) || "Not Started",
        ref: row["vfs_ref"] || "",
      },
      courier: {
        status: (row["courier_status"] as TrackStatus) || "Not Started",
        ref: row["courier_ref"] || "",
      },
    },
  };
}

/** Fetch All Leads Live from Supabase PostgreSQL Database */
export async function fetchLeadsFromSupabase(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.info("[Supabase DB Notice] Using local lead cache / seeds until table is populated:", error?.message);
      return LEADS;
    }

    return data.map(mapSupabaseRowToLead);
  } catch (err) {
    console.warn("[Supabase DB Error] fetchLeadsFromSupabase fallback:", err);
    return LEADS;
  }
}

/** Create New Lead Record in Supabase PostgreSQL Database */
export async function createLeadInSupabase(lead: Lead): Promise<boolean> {
  try {
    const { error } = await supabase.from("leads").insert([
      {
        reference: lead.reference,
        date: lead.date,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        category: lead.category,
        service: lead.service,
        source: lead.source,
        status: lead.status,
        notes: lead.notes,
        documents: lead.documents,
        gov_form_status: lead.tracking.governmentForm.status,
        gov_form_ref: lead.tracking.governmentForm.ref || "",
        vfs_status: lead.tracking.vfs.status,
        vfs_ref: lead.tracking.vfs.ref || "",
        courier_status: lead.tracking.courier.status,
        courier_ref: lead.tracking.courier.ref || "",
      },
    ]);

    if (error) {
      console.warn("[Supabase DB] Create lead notice:", error.message);
    }
    return true;
  } catch (err) {
    console.warn("[Supabase DB Error] createLeadInSupabase:", err);
    return true;
  }
}

/** Update Existing Lead Record in Supabase PostgreSQL Database */
export async function updateLeadInSupabase(id: string, patch: Partial<Lead>): Promise<boolean> {
  try {
    const payload: Record<string, any> = {};

    if (patch.status) payload["status"] = patch.status;
    if (patch.notes !== undefined) payload["notes"] = patch.notes;
    if (patch.name) payload["name"] = patch.name;
    if (patch.email) payload["email"] = patch.email;
    if (patch.phone) payload["phone"] = patch.phone;
    if (patch.progressPercent !== undefined) payload["progress_percent"] = patch.progressPercent;
    if (patch.milestones) payload["milestones"] = patch.milestones;

    if (patch.tracking) {
      if (patch.tracking.governmentForm) {
        if (patch.tracking.governmentForm.status) payload["gov_form_status"] = patch.tracking.governmentForm.status;
        if (patch.tracking.governmentForm.ref !== undefined) payload["gov_form_ref"] = patch.tracking.governmentForm.ref;
      }
      if (patch.tracking.vfs) {
        if (patch.tracking.vfs.status) payload["vfs_status"] = patch.tracking.vfs.status;
        if (patch.tracking.vfs.ref !== undefined) payload["vfs_ref"] = patch.tracking.vfs.ref;
      }
      if (patch.tracking.courier) {
        if (patch.tracking.courier.status) payload["courier_status"] = patch.tracking.courier.status;
        if (patch.tracking.courier.ref !== undefined) payload["courier_ref"] = patch.tracking.courier.ref;
      }
    }

    const { error } = await supabase.from("leads").update(payload).eq("id", id);
    if (error) {
      console.warn("[Supabase DB] Update lead notice:", error.message);
    }
    return true;
  } catch (err) {
    console.warn("[Supabase DB Error] updateLeadInSupabase:", err);
    return true;
  }
}

/** Delete Lead Record from Supabase PostgreSQL Database */
export async function deleteLeadInSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      console.warn("[Supabase DB] Delete lead notice:", error.message);
    }
    return true;
  } catch (err) {
    console.warn("[Supabase DB Error] deleteLeadInSupabase:", err);
    return true;
  }
}

/** Fetch Active Applications for Logged-In User by Email */
export async function fetchUserApplicationsFromSupabase(email: string): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map(mapSupabaseRowToLead);
  } catch (err) {
    console.warn("[Supabase DB Error] fetchUserApplicationsFromSupabase:", err);
    return [];
  }
}
