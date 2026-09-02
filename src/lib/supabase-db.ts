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

/** Fetch All Leads Live from Supabase PostgreSQL Database + Local Submitted Intakes */
export async function fetchLeadsFromSupabase(): Promise<Lead[]> {
  try {
    let result: Lead[] = [];

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (!error && data && data.length > 0) {
      result = data.map(mapSupabaseRowToLead);
    }

    // Merge locally submitted intakes from client forms (ows_submitted_intakes)
    if (typeof window !== "undefined") {
      try {
        const storedStr = localStorage.getItem("ows_submitted_intakes");
        if (storedStr) {
          const submittedList: any[] = JSON.parse(storedStr);
          if (Array.isArray(submittedList) && submittedList.length > 0) {
            const formattedSubmitted: Lead[] = submittedList.map((item: any) => ({
              id: item.id || item.reference || `sub-${Date.now()}`,
              reference: item.reference || item.trackingId || "REF-000000",
              date: item.date || new Date().toISOString().split("T")[0]!,
              name: item.name || item.applicantName || "Client",
              email: item.email || item.applicantEmail || "",
              phone: item.phone || item.phoneUsa || "",
              category: item.category || "General Intake",
              service: item.service || item.serviceTitle || "General Service",
              source: item.source || "Form",
              status: item.status || "New",
              notes: item.notes || "",
              documents: item.documents || item.fileUrls || [],
              progressPercent: item.progressPercent !== undefined ? item.progressPercent : 0,
              tracking: item.tracking || {
                governmentForm: { status: item.gov_form_status || "Not Started", ref: item.gov_form_ref || "" },
                vfs: { status: item.vfs_status || "Not Started", ref: item.vfs_ref || "" },
                courier: { status: item.courier_status || "Not Started", ref: item.courier_ref || "" },
              },
            }));

            // Prepend submitted intakes not already present in result
            const existingRefs = new Set(result.map((l) => l.reference));
            const newSubmitted = formattedSubmitted.filter((l) => !existingRefs.has(l.reference));
            result = [...newSubmitted, ...result];
          }
        }
      } catch (e) {
        console.warn("[DB Merge] Submitted intakes parse notice:", e);
      }
    }

    // If both DB and submitted intakes are empty, fall back to initial seed LEADS
    if (result.length === 0) {
      result = LEADS;
    }

    // Apply local admin lead overrides if present
    if (typeof window !== "undefined") {
      try {
        const overridesStr = localStorage.getItem("ows_admin_lead_overrides");
        if (overridesStr) {
          const overrides: Record<string, Partial<Lead>> = JSON.parse(overridesStr);
          result = result.map((l) => {
            const patch = overrides[l.id] || overrides[l.reference] || overrides[l.reference.replace("#", "")];
            if (patch) {
              return { ...l, ...patch };
            }
            return l;
          });
        }
      } catch (e) {
        console.warn("[Vault] Overrides parse notice:", e);
      }
    }

    return result;
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
        priority: lead.priority || "Normal",
        is_special_request: lead.isSpecialRequest || false,
        engagement_model: lead.engagementModel || "",
        progress_percent: lead.progressPercent || 25,
        milestones: lead.milestones || [],
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
    // 1. Sync in-memory LEADS seed objects immediately
    const targetInMock = LEADS.find((l) => l.id === id || l.reference === id || (patch.reference && l.reference === patch.reference));
    if (targetInMock) {
      if (patch.status) targetInMock.status = patch.status;
      if (patch.progressPercent !== undefined) targetInMock.progressPercent = patch.progressPercent;
      if (patch.milestones) targetInMock.milestones = patch.milestones;
      if (patch.notes !== undefined) targetInMock.notes = patch.notes;
      if (patch.documents) targetInMock.documents = patch.documents;
    }

    // 2. Persist to localStorage ows_admin_lead_overrides
    if (typeof window !== "undefined") {
      try {
        const overridesStr = localStorage.getItem("ows_admin_lead_overrides") || "{}";
        const overrides: Record<string, Partial<Lead>> = JSON.parse(overridesStr);
        const targetKey = id || patch.reference || (targetInMock ? targetInMock.reference : "");
        if (targetKey) {
          const cleanKey = targetKey.replace("#", "");
          overrides[cleanKey] = {
            ...(overrides[cleanKey] || {}),
            ...patch,
          };
          localStorage.setItem("ows_admin_lead_overrides", JSON.stringify(overrides));
        }

        // 3. Sync updates to localStorage cached intakes so /track and /account see immediate changes
        const storedStr = localStorage.getItem("ows_submitted_intakes");
        if (storedStr) {
          const list: any[] = JSON.parse(storedStr);
          const updatedList = list.map((item) => {
            const matchesId =
              item.id === id ||
              item.reference === id ||
              (patch.reference && item.reference === patch.reference);
            if (matchesId) {
              return {
                ...item,
                status: patch.status || item.status,
                progressPercent: patch.progressPercent !== undefined ? patch.progressPercent : item.progressPercent,
                milestones: patch.milestones || item.milestones,
                notes: patch.notes !== undefined ? patch.notes : item.notes,
                name: patch.name || item.name,
                email: patch.email || item.email,
                phone: patch.phone || item.phone,
              };
            }
            return item;
          });
          localStorage.setItem("ows_submitted_intakes", JSON.stringify(updatedList));
        }

        const lastStr = localStorage.getItem("ows_last_submitted_intake");
        if (lastStr) {
          const lastObj = JSON.parse(lastStr);
          if (lastObj.id === id || lastObj.reference === id || (patch.reference && lastObj.reference === patch.reference)) {
            const updatedLast = {
              ...lastObj,
              status: patch.status || lastObj.status,
              progressPercent: patch.progressPercent !== undefined ? patch.progressPercent : lastObj.progressPercent,
              milestones: patch.milestones || lastObj.milestones,
              notes: patch.notes !== undefined ? patch.notes : lastObj.notes,
            };
            localStorage.setItem("ows_last_submitted_intake", JSON.stringify(updatedLast));
          }
        }

        // Notify active tracking pages of live update
        window.dispatchEvent(new Event("ows_lead_updated"));
      } catch (e) {
        console.warn("[Local Storage Sync Error] updateLeadInSupabase:", e);
      }
    }

    const payload: Record<string, any> = {};
    if (patch.status) payload["status"] = patch.status;
    if (patch.notes !== undefined) payload["notes"] = patch.notes;
    if (patch.name) payload["name"] = patch.name;
    if (patch.email) payload["email"] = patch.email;
    if (patch.phone) payload["phone"] = patch.phone;
    if (patch.priority) payload["priority"] = patch.priority;
    if (patch.isSpecialRequest !== undefined) payload["is_special_request"] = patch.isSpecialRequest;
    if (patch.engagementModel !== undefined) payload["engagement_model"] = patch.engagementModel;
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
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];
    return data.map(mapSupabaseRowToLead);
  } catch (err) {
    console.warn("[Supabase DB Error] fetchUserApplicationsFromSupabase:", err);
    return [];
  }
}
