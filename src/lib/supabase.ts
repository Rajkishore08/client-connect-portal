import { createClient } from "@supabase/supabase-js";

const env = import.meta.env as Record<string, string | undefined>;

const supabaseUrl =
  env["VITE_SUPABASE_URL"] ||
  env["NEXT_PUBLIC_SUPABASE_URL"] ||
  "https://bpldaxxwbbcdgsbjbaki.supabase.co";

const supabaseAnonKey =
  env["VITE_SUPABASE_ANON_KEY"] ||
  env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
  env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] ||
  "sb_publishable_neWJgg-i95e6JSxp_1UMzw_h3jNk3Ga";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Supabase Google OAuth Authentication */
export async function signInWithGoogle() {
  const currentOrigin =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://oneworldsolutionsusa.com";
      
  const redirectUrl = `${currentOrigin}/account`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("[Supabase Auth] Google OAuth Error:", error.message);
    throw error;
  }
  return data;
}

/** Supabase Email & Password Sign Up */
export async function signUpWithEmail(email: string, pass: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error("[Supabase Auth] Sign Up Error:", error.message);
    throw error;
  }
  return data;
}

/** Supabase Email & Password Sign In */
export async function signInWithEmail(email: string, pass: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    console.error("[Supabase Auth] Sign In Error:", error.message);
    throw error;
  }
  return data;
}

/** Supabase Sign Out */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Supabase Auth] Sign Out Error:", error.message);
    throw error;
  }
}

/** Get Current Active Supabase User */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/** Save Intake Application to Supabase PostgreSQL Database */
export async function saveIntakeToSupabase(payload: Record<string, any>) {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase.from("intakes").insert([
      {
        user_id: user?.id || null,
        user_email: user?.email || payload["email"] || null,
        service_category: payload["category"] || "general",
        service_title: payload["serviceTitle"] || payload["serviceType"] || "Intake Service",
        applicant_name: payload["applicantName"] || payload["fullName"] || "Client",
        phone: payload["phone"] || null,
        details: payload["notes"] || payload["details"] || "",
        documents: payload["documents"] || payload["fileUrls"] || [],
        tracking_id: payload["trackingId"] || `OWS-${Date.now()}`,
        status: "Submitted to Embassy",
        created_at: new Date().toISOString(),
      },
    ]).select();

    if (error) {
      console.warn("[Supabase DB] Table 'intakes' not provisioned yet or offline:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn("[Supabase DB] Intake insert notice:", err);
    return null;
  }
}

/** Save Strategy Call Consultation Booking to Supabase PostgreSQL Database */
export async function saveConsultationToSupabase(booking: Record<string, any>) {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase.from("consultations").insert([
      {
        user_id: user?.id || null,
        client_name: booking["name"] || "Client",
        email: booking["email"] || user?.email || null,
        phone: booking["phone"] || null,
        date: booking["date"] || null,
        time_slot: booking["timeSlot"] || null,
        topic: booking["topic"] || "Consultation Call",
        status: "Confirmed",
        created_at: new Date().toISOString(),
      },
    ]).select();

    if (error) {
      console.warn("[Supabase DB] Table 'consultations' not provisioned yet or offline:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn("[Supabase DB] Consultation insert notice:", err);
    return null;
  }
}
