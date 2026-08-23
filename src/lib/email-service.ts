import { Resend } from "resend";

const env = import.meta.env as Record<string, string | undefined>;

const resendApiKey =
  env["VITE_RESEND_API_KEY"] ||
  env["RESEND_API_KEY"] ||
  (typeof process !== "undefined" ? process.env["RESEND_API_KEY"] : "");

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const SENDER_EMAIL = "One World Solutions <support@oneworldsolutionsusa.com>";
export const ADMIN_EMAIL = "support@oneworldsolutionsusa.com";

export interface IntakeEmailPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceTitle: string;
  serviceCategory: string;
  trackingId: string;
  details?: string;
  speedTier?: string;
}

export interface StatusUpdateEmailPayload {
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  trackingId: string;
  newStatus: string;
  statusDetails?: string;
}

export interface BookingEmailPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  bookingDate: string;
  bookingTime: string;
  serviceInterested?: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  status: string;
  sentAt: string;
  provider: string;
  template?: string;
  htmlContent?: string;
}

/** Robust Helper to Send Emails via Resend with Automatic Sender Fallback */
async function safeSendResendEmail(params: {
  from?: string;
  to: string[];
  subject: string;
  html: string;
}) {
  if (!resendApiKey || !resend) {
    console.info("[Email Service] Resend API Key pending. Logged payload:", params.subject);
    return { success: true, simulated: true };
  }

  const primaryFrom = params.from || SENDER_EMAIL;
  try {
    const data = await resend.emails.send({
      from: primaryFrom,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    if ((data as any)?.error) {
      throw new Error((data as any).error.message || JSON.stringify((data as any).error));
    }
    console.info(`[Email Service] Email dispatched successfully via Resend to ${params.to.join(", ")}`);
    return { success: true, data };
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.warn(`[Email Service] Primary send attempt (${primaryFrom}) failed: ${errMsg}. Attempting fallback sender...`);

    if (primaryFrom !== "One World Solutions <onboarding@resend.dev>") {
      try {
        const fallbackData = await resend.emails.send({
          from: "One World Solutions <onboarding@resend.dev>",
          to: params.to,
          subject: params.subject,
          html: params.html,
        });
        console.info(`[Email Service] Email dispatched via Resend fallback sender to ${params.to.join(", ")}`);
        return { success: true, data: fallbackData };
      } catch (fallbackErr: any) {
        console.error("[Email Service] Resend fallback sender error:", fallbackErr);
        return { success: false, error: fallbackErr.message || String(fallbackErr) };
      }
    }

    return { success: false, error: errMsg };
  }
}

/** 1. Send Intake Confirmation Email to Client */
export async function sendClientIntakeEmail(payload: IntakeEmailPayload) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #ffffff; padding: 24px; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .badge { display: inline-block; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; }
        .content { padding: 32px 24px; }
        .card { background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #cbd5e1; }
        .tracking-id { font-family: monospace; font-size: 18px; font-weight: 800; color: #2563eb; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-t: 1px solid #e2e8f0; }
        .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="/logo-rect.webp" alt="ONE WORLD SOLUTIONS" style="height: 38px; width: auto; display: block; margin: 0 auto 10px auto;" />
          <div class="badge">Intake Application Received</div>
        </div>
        <div class="content">
          <h2>Hello ${payload.clientName},</h2>
          <p>Thank you for submitting your intake application with <strong>One World Solutions</strong>. Our Chicago consular &amp; software team has received your request and is pre-auditing your details.</p>
          
          <div class="card">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">Tracking ID</p>
            <div class="tracking-id">${payload.trackingId}</div>
            <p style="margin: 12px 0 4px 0; font-size: 14px; font-weight: 700;">${payload.serviceTitle}</p>
            <p style="margin: 0; font-size: 12px; color: #475569;">Category: ${payload.serviceCategory}</p>
            ${payload.details ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #475569;">${payload.details}</p>` : ""}
          </div>

          <p>You can track real-time processing milestones and view document requirements anytime using your tracking ID or by signing into your client dashboard.</p>

          <div style="text-align: center;">
            <a href="https://oneworldsolutionsusa.com/track?id=${payload.trackingId}" class="btn">Track Application Status</a>
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0 0 6px 0;"><strong>One World Solutions (A Division of ABHIPRIYA GROUPS LLC, E-Verified)</strong></p>
          <p style="margin: 0;">Chicago, IL 60613 • Direct Hotline: +1 (417) 569-0711 • support@oneworldsolutionsusa.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return safeSendResendEmail({
    to: [payload.clientEmail],
    subject: `Intake Confirmed: ${payload.serviceTitle} (${payload.trackingId})`,
    html,
  });
}

/** 2. Send Admin New Intake Alert Email */
export async function sendAdminIntakeAlert(payload: IntakeEmailPayload) {
  const html = `
    <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #cbd5e1; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0;">New Client Intake Received</h2>
      <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
        <tr><td style="padding: 6px; font-weight: bold;">Tracking ID:</td><td style="color: #2563eb; font-weight: bold;">${payload.trackingId}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Client Name:</td><td>${payload.clientName}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Client Email:</td><td>${payload.clientEmail}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Phone:</td><td>${payload.clientPhone || "N/A"}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Service:</td><td>${payload.serviceTitle}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Category:</td><td>${payload.serviceCategory}</td></tr>
      </table>
      <p style="margin-top: 20px;">
        <a href="https://oneworldsolutionsusa.com/admin-one-master-8820" style="background: #0f172a; color: #fff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold;">Open Ops Admin Dashboard</a>
      </p>
    </div>
  `;

  return safeSendResendEmail({
    to: [ADMIN_EMAIL],
    subject: `🚨 NEW INTAKE SUBMITTED: ${payload.serviceTitle} (${payload.trackingId})`,
    html,
  });
}

/** 3. Send Application Status Update Email to Client */
export async function sendStatusUpdateEmail(payload: StatusUpdateEmailPayload) {
  const html = `
    <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px;">
      <h2 style="color: #0f172a;">Application Status Updated</h2>
      <p>Hello ${payload.clientName},</p>
      <p>Your application <strong>${payload.trackingId}</strong> (${payload.serviceTitle}) has reached a new milestone:</p>
      <div style="background: #2563eb; color: #fff; padding: 14px 20px; border-radius: 10px; font-size: 16px; font-weight: bold; margin: 16px 0;">
        Current Status: ${payload.newStatus}
      </div>
      ${payload.statusDetails ? `<p style="color: #475569;">${payload.statusDetails}</p>` : ""}
      <p style="margin-top: 24px;">
        <a href="https://oneworldsolutionsusa.com/track?id=${payload.trackingId}" style="background: #0f172a; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: bold;">View Tracking Milestone</a>
      </p>
    </div>
  `;

  return safeSendResendEmail({
    to: [payload.clientEmail],
    subject: `Status Update (${payload.newStatus}): ${payload.serviceTitle}`,
    html,
  });
}

/** 4. Send Strategy Call Booking Confirmation Email */
export async function sendBookingConfirmationEmail(payload: BookingEmailPayload) {
  const html = `
    <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px;">
      <h2 style="color: #0f172a;">Strategy Consultation Confirmed</h2>
      <p>Hello ${payload.clientName},</p>
      <p>Your 1-on-1 virtual strategy consultation with One World Solutions has been scheduled.</p>
      <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; margin: 16px 0; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #0f172a;">📅 Date: ${payload.bookingDate}</p>
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #2563eb;">⏰ Time: ${payload.bookingTime}</p>
      </div>
      <p>Our senior specialist will call you directly at <strong>${payload.clientPhone || payload.clientEmail}</strong>.</p>
    </div>
  `;

  return safeSendResendEmail({
    to: [payload.clientEmail],
    subject: `Consultation Confirmed: ${payload.bookingDate} at ${payload.bookingTime}`,
    html,
  });
}

export async function sendIntakeConfirmationEmail(arg: any) {
  if (typeof arg === "object" && arg !== null) {
    const payload: IntakeEmailPayload = {
      clientName: arg.clientName || arg.name || "Valued Client",
      clientEmail: arg.clientEmail || arg.email || "",
      clientPhone: arg.clientPhone || arg.phone,
      serviceTitle: arg.serviceTitle || arg.service || "Consular / Software Service Intake",
      serviceCategory: arg.serviceCategory || "General Intake",
      trackingId: arg.trackingId || arg.reference || `OWS-${Date.now().toString().slice(-5)}`,
      details: arg.details || arg.consultationSlot,
    };
    const res = await sendClientIntakeEmail(payload);
    await sendAdminIntakeAlert(payload).catch(() => {});
    return res;
  }
  return { success: true };
}

export function getEmailLogs(): EmailLog[] {
  return [
    {
      id: "log-1",
      recipient: "client@example.com",
      subject: "Intake Confirmed: Expedited Passport Renewal",
      status: "Delivered",
      sentAt: "Today at 2:15 PM",
      provider: "Resend (re_H8NkMAWE_...)",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background: #ffffff; padding: 28px; text-align: center; border-bottom: 1px solid #e2e8f0;">
              <img src="/logo-rect.webp" alt="ONE WORLD SOLUTIONS" style="height: 38px; width: auto; display: block; margin: 0 auto 10px auto;" />
              <div style="display: inline-block; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase;">
                Intake Application Confirmed
              </div>
            </div>
            <div style="padding: 32px 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Hello Valued Client,</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                Thank you for submitting your intake application with <strong>One World Solutions</strong>. Our Chicago consular &amp; software team has received your request and is auditing your documentation.
              </p>
              
              <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #cbd5e1;">
                <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; font-family: monospace;">TRACKING ID</p>
                <div style="font-family: monospace; font-size: 20px; font-weight: 800; color: #2563eb;">REF-286014</div>
                <p style="margin: 14px 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Expedited Passport Renewal</p>
                <p style="margin: 0; font-size: 13px; color: #475569;">Category: Passport &amp; Consular Services</p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                You can track real-time processing milestones and view document verification status anytime using your tracking reference.
              </p>

              <div style="text-align: center; margin-top: 28px;">
                <a href="https://oneworldsolutionsusa.com/track?id=REF-286014" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">Track Application Status</a>
              </div>
            </div>
            <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px 0;"><strong>One World Solutions (A Division of ABHIPRIYA GROUPS LLC, E-Verified)</strong></p>
              <p style="margin: 0;">Chicago, IL 60613 • Direct Hotline: +1 (417) 569-0711 • support@oneworldsolutionsusa.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: "log-2",
      recipient: "support@oneworldsolutionsusa.com",
      subject: "🚨 NEW INTAKE SUBMITTED: OCI Application",
      status: "Delivered",
      sentAt: "Yesterday at 11:30 AM",
      provider: "Resend (re_H8NkMAWE_...)",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background: #ffffff; padding: 24px 28px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <img src="/logo-rect.webp" alt="ONE WORLD SOLUTIONS" style="height: 38px; width: auto; display: block; margin: 0 auto 10px auto;" />
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 6px; text-transform: uppercase;">NEW CLIENT INTAKE ALERT • RUSH PRIORITY</span>
              </div>
            </div>
            <div style="padding: 28px;">
              <h3 style="margin-top: 0; font-size: 16px; color: #0f172a;">OCI Application Received</h3>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-top: 16px;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Tracking ID:</td><td style="color: #2563eb; font-weight: bold; font-family: monospace; font-size: 15px;">REF-286014</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Applicant Name:</td><td style="font-weight: 700; color: #0f172a;">Valued Client</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Applicant Email:</td><td>client.test@example.com</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Direct Phone:</td><td>+1 (417) 569-0711</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service Category:</td><td>Passport &amp; Consular Services</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Assigned SLA:</td><td>Expedited Service Intake (3-5 Days)</td></tr>
              </table>
              <div style="margin-top: 28px; text-align: center;">
                <a href="https://oneworldsolutionsusa.com/admin-one-master-8820" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px;">Open Ops Admin Dashboard</a>
              </div>
            </div>
            <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              One World Solutions • Operational Alert Telemetry • Chicago HQ
            </div>
          </div>
        </body>
        </html>
      `,
    },
  ];
}

export const resendConfig = {
  domain: "oneworldsolutionsusa.com",
  sender: SENDER_EMAIL,
  admin: ADMIN_EMAIL,
  apiKeyActive: !!resendApiKey,
  maskedKey: resendApiKey ? `${resendApiKey.slice(0, 7)}...${resendApiKey.slice(-4)}` : "Not Configured",
};
