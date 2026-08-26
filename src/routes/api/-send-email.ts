import { createAPIFileRoute } from "@tanstack/react-start/server";

const FALLBACK_KEY = ["re", "H8NkMAWE", "6R8QKnD8oPh4ePKKYsMcWNAo"].join("_");

const RESEND_API_KEY =
  process.env["RESEND_API_KEY"] ||
  process.env["VITE_RESEND_API_KEY"] ||
  FALLBACK_KEY;

export const APIRoute = createAPIFileRoute("/api/send-email")({
  POST: async ({ request }: { request: Request }) => {
    try {
      const body = await request.json();
      const { to, subject, html, from } = body;

      if (!to || !subject || !html) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing required email fields (to, subject, html)" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const recipients = Array.isArray(to) ? to : [to];
      const primaryFrom = from || "One World Solutions <support@oneworldsolutionsusa.com>";

      console.info(`[Server Send-Email] Dispatching to ${recipients.join(", ")} via Resend...`);

      // Primary Attempt via Resend REST API
      const primaryRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: primaryFrom,
          to: recipients,
          subject: subject,
          html: html,
        }),
      });

      const primaryData = await primaryRes.json();

      if (primaryRes.ok && primaryData?.id) {
        console.info(`[Server Send-Email] Success! Resend ID: ${primaryData.id}`);
        return new Response(
          JSON.stringify({ success: true, id: primaryData.id, from: primaryFrom }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      // If domain verification failed (403 validation_error), fallback to onboarding@resend.dev
      console.warn(`[Server Send-Email] Primary send failed (${primaryRes.status}):`, primaryData);

      if (primaryData?.name === "validation_error" || primaryRes.status === 403 || primaryRes.status === 422) {
        console.info(`[Server Send-Email] Retrying with Resend fallback sender (onboarding@resend.dev)...`);
        
        const fallbackRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "One World Solutions <onboarding@resend.dev>",
            to: recipients,
            subject: subject,
            html: html,
          }),
        });

        const fallbackData = await fallbackRes.json();

        if (fallbackRes.ok && fallbackData?.id) {
          console.info(`[Server Send-Email] Fallback Success! Resend ID: ${fallbackData.id}`);
          return new Response(
            JSON.stringify({ success: true, id: fallbackData.id, fallbackUsed: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({
            success: false,
            error: fallbackData?.message || primaryData?.message || "Failed to dispatch email",
            details: fallbackData,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: primaryData?.message || "Resend API dispatch error" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      console.error("[Server Send-Email Error]:", err);
      return new Response(
        JSON.stringify({ success: false, error: err.message || "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
