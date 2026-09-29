import { createAPIFileRoute } from "@tanstack/react-start/server";
import { supabase } from "@/lib/supabase";

/**
 * Supabase Keep-Alive Endpoint
 * Performs a light ping to the Supabase database every 5 days via cron / HTTP ping
 * to prevent auto-pausing on Supabase Free Tier projects.
 */
export const APIRoute = createAPIFileRoute("/api/keep-alive")({
  GET: async () => {
    try {
      const startTime = Date.now();

      // Ping Supabase leads table with a lightweight query (limit 1)
      const { data, error } = await supabase
        .from("leads")
        .select("id, created_at")
        .limit(1);

      const durationMs = Date.now() - startTime;

      if (error) {
        console.error("[Keep-Alive Cron] Supabase Ping Error:", error);
        return new Response(
          JSON.stringify({
            success: false,
            status: "error",
            message: `Supabase ping failed: ${error.message}`,
            durationMs,
            timestamp: new Date().toISOString(),
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      console.info(`[Keep-Alive Cron] Supabase active ping successful! (${durationMs}ms)`);

      return new Response(
        JSON.stringify({
          success: true,
          status: "active",
          message: "Supabase database keep-alive ping successful. Project active.",
          rowsChecked: data?.length || 0,
          durationMs,
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      console.error("[Keep-Alive Cron] Unexpected Exception:", err);
      return new Response(
        JSON.stringify({
          success: false,
          status: "exception",
          message: err?.message || "Internal Keep-Alive Error",
          timestamp: new Date().toISOString(),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
  POST: async () => {
    // Standard handler proxying to GET for webhook convenience
    return (APIRoute as any).GET();
  },
});
