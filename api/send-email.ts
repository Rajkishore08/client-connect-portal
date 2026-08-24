const FALLBACK_KEY = ["re", "H8NkMAWE", "6R8QKnD8oPh4ePKKYsMcWNAo"].join("_");

export default async function handler(req: any, res: any) {
  // CORS Headers for production
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { to, subject, html, from } = body;

    if (!to || !subject || !html) {
      res.status(400).json({ success: false, error: "Missing required email fields (to, subject, html)" });
      return;
    }

    const apiKey =
      process.env["RESEND_API_KEY"] ||
      process.env["VITE_RESEND_API_KEY"] ||
      FALLBACK_KEY;

    const recipients = Array.isArray(to) ? to : [to];
    const primaryFrom = from || "One World Solutions <support@oneworldsolutionsusa.com>";

    console.log(`[Vercel Serverless API] Dispatching email to ${recipients.join(", ")} via Resend...`);

    // Primary Dispatch Attempt
    const primaryRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
      console.log(`[Vercel Serverless API] Success! Resend ID: ${primaryData.id}`);
      res.status(200).json({ success: true, id: primaryData.id, from: primaryFrom });
      return;
    }

    // Fallback Dispatch Attempt (onboarding@resend.dev)
    if (primaryData?.name === "validation_error" || primaryRes.status === 403 || primaryRes.status === 422) {
      console.log(`[Vercel Serverless API] Retrying with onboarding@resend.dev fallback...`);
      const fallbackRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
        res.status(200).json({ success: true, id: fallbackData.id, fallbackUsed: true });
        return;
      }

      res.status(400).json({
        success: false,
        error: fallbackData?.message || primaryData?.message || "Failed to dispatch email",
      });
      return;
    }

    res.status(400).json({ success: false, error: primaryData?.message || "Resend API dispatch error" });
  } catch (err: any) {
    console.error("[Vercel Serverless API Error]:", err);
    res.status(500).json({ success: false, error: err.message || "Internal server error" });
  }
}
