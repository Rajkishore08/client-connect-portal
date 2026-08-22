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

/** 1. Send Intake Confirmation Email to Client */
export async function sendClientIntakeEmail(payload: IntakeEmailPayload) {
  if (!resendApiKey || !resend) {
    console.info("[Email Service] Resend API Key pending. Logged payload:", payload);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [payload.clientEmail],
      subject: `Intake Confirmed: ${payload.serviceTitle} (${payload.trackingId})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
            .badge { display: inline-block; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; }
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
              <h1>ONE WORLD SOLUTIONS</h1>
              <div class="badge">Intake Application Received</div>
            </div>
            <div class="content">
              <h2>Hello ${payload.clientName},</h2>
              <p>Thank you for submitting your intake application with <strong>One World Solutions</strong>. Our Chicago consular & software team has received your request and is pre-auditing your details.</p>
              
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
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("[Email Service] Client intake email error:", error);
    return { success: false, error: error.message };
  }
}

/** 2. Send Admin New Intake Alert Email */
export async function sendAdminIntakeAlert(payload: IntakeEmailPayload) {
  if (!resendApiKey || !resend) {
    console.info("[Email Service] Admin alert skipped (no API key). Payload:", payload);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `🚨 NEW INTAKE SUBMITTED: ${payload.serviceTitle} (${payload.trackingId})`,
      html: `
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
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("[Email Service] Admin alert email error:", error);
    return { success: false, error: error.message };
  }
}

/** 3. Send Application Status Update Email to Client */
export async function sendStatusUpdateEmail(payload: StatusUpdateEmailPayload) {
  if (!resendApiKey || !resend) {
    console.info("[Email Service] Status update email skipped. Payload:", payload);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [payload.clientEmail],
      subject: `Status Update (${payload.newStatus}): ${payload.serviceTitle}`,
      html: `
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
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("[Email Service] Status update email error:", error);
    return { success: false, error: error.message };
  }
}

/** 4. Send Strategy Call Booking Confirmation Email */
export async function sendBookingConfirmationEmail(payload: BookingEmailPayload) {
  if (!resendApiKey || !resend) {
    console.info("[Email Service] Booking confirmation email skipped. Payload:", payload);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [payload.clientEmail],
      subject: `Consultation Confirmed: ${payload.bookingDate} at ${payload.bookingTime}`,
      html: `
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
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("[Email Service] Booking email error:", error);
    return { success: false, error: error.message };
  }
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

export function getEmailLogs() {
  return [
    {
      id: "log-1",
      recipient: "client@example.com",
      subject: "Intake Confirmed: Expedited Passport Renewal",
      status: "Delivered",
      sentAt: "Today at 2:15 PM",
      provider: "Resend",
    },
    {
      id: "log-2",
      recipient: "support@oneworldsolutionsusa.com",
      subject: "🚨 NEW INTAKE SUBMITTED: OCI Application",
      status: "Delivered",
      sentAt: "Yesterday at 11:30 AM",
      provider: "Resend",
    },
  ];
}

export const resendConfig = {
  domain: "oneworldsolutionsusa.com",
  sender: SENDER_EMAIL,
  admin: ADMIN_EMAIL,
};

