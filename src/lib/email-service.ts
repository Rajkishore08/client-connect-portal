import { toast } from "sonner";

export interface EmailLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  body: string;
  htmlContent: string;
  sentAt: string;
  status: "Delivered" | "Queued" | "Simulated";
  template: "Intake Confirmation" | "Status Update" | "Auto Reply" | "Document Request";
}

const STORAGE_KEY_LOGS = "ows_portal_email_logs";

export function getEmailLogs(): EmailLog[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY_LOGS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveEmailLog(log: Omit<EmailLog, "id" | "sentAt">) {
  const newLog: EmailLog = {
    ...log,
    id: `email-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sentAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };

  const logs = getEmailLogs();
  const updated = [newLog, ...logs];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated.slice(0, 50)));
  }

  // Live Toast Dispatch Alert
  toast.success(`Branded HTML Email Dispatched to ${log.recipientName}`, {
    description: `Subject: "${log.subject}"`,
  });

  return newLog;
}

/** Rich Branded HTML Email Template Generator */
export function generateBrandedHtmlEmail(options: {
  headline: string;
  recipientName: string;
  referenceNumber?: string;
  serviceTitle?: string;
  detailsHtml: string;
  ctaText?: string;
  ctaLink?: string;
}): string {
  const origin = typeof window !== "undefined" && window.location?.origin ? window.location.origin : "";
  const logoPngUrl = origin ? `${origin}/logo-rect.png` : "/logo-rect.png";
  const logoWebpUrl = origin ? `${origin}/logo-rect.webp` : "/logo-rect.webp";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.headline}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6fb; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header Banner with Official Company Rectangular Logo (Bright High-Contrast Background) -->
          <tr>
            <td style="background-color: #ffffff; padding: 24px 32px; text-align: left; border-bottom: 1px solid #e2e8f0;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <a href="${origin || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <picture>
                        <source srcset="${logoWebpUrl}" type="image/webp" />
                        <img 
                          src="${logoPngUrl}" 
                          alt="One World Solutions" 
                          height="40"
                          style="height: 40px; width: auto; max-width: 240px; display: block; border: 0; outline: none; text-decoration: none; object-fit: contain;" 
                        />
                      </picture>
                    </a>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; letter-spacing: 0.5px;">
                      Chicago HQ
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Accent Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #0F52FF 0%, #2563eb 100%); padding: 14px 32px; text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 800; letter-spacing: -0.2px;">
                ${options.headline}
              </h1>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 32px; text-align: left; color: #1e293b; font-size: 14px; line-height: 1.6;">
              <p style="margin-top: 0; font-size: 15px; font-weight: 700; color: #0f172a;">
                Dear ${options.recipientName},
              </p>
              
              ${options.detailsHtml}

              ${
                options.ctaText && options.ctaLink
                  ? `<div style="margin-top: 28px; text-align: center;">
                      <a href="${options.ctaLink}" style="display: inline-block; background-color: #0F52FF; color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none; padding: 13px 26px; border-radius: 12px; box-shadow: 0 4px 14px rgba(15,82,255,0.3);">
                        ${options.ctaText} &rarr;
                      </a>
                    </div>`
                  : ""
              }
            </td>
          </tr>

          <!-- Bank Security Badge Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px;">
                <tr>
                  <td width="22" style="vertical-align: middle;">
                    <span style="color: #0F52FF; font-size: 14px;">&#128737;</span>
                  </td>
                  <td style="font-size: 11px; color: #64748b; font-weight: 500; padding-left: 8px;">
                    Bank-grade 256-bit encryption on all client documents. One World Solutions operates out of Chicago, IL.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0B1527; padding: 24px 32px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.5; border-top: 1px solid #1e293b;">
              <p style="margin: 0; font-weight: 700; color: #cbd5e1;">One World Solutions Agency &amp; Concierge Services</p>
              <p style="margin: 4px 0 0 0; color: #64748b;">Chicago HQ Office • USA Nationwide Processing</p>
              <p style="margin: 8px 0 0 0; font-size: 10px; color: #475569;">
                &copy; 2026 One World Solutions. All rights reserved. Private service provider. Not affiliated with government agencies.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** 1. Automated Intake Confirmation Email */
export function sendIntakeConfirmationEmail(params: {
  name: string;
  email: string;
  service: string;
  reference: string;
  consultationSlot?: string;
}) {
  const subject = `Confirmed: One World Solutions Intake #${params.reference}`;
  const plainText = `Dear ${params.name},\n\nWe have received your intake request for ${params.service} (Ref: ${params.reference}).\n\nConsultation Scheduled: ${params.consultationSlot || "Tomorrow at 9:00 AM CST"}`;

  const detailsHtml = `
    <p>Thank you for submitting your intake request. Our senior specialist team has received your application details and attached files.</p>
    
    <div style="background-color: #f1f5f9; border-left: 4px solid #0F52FF; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Service Requested</div>
      <div style="font-size: 16px; font-weight: 800; color: #0F52FF;">${params.service}</div>
      <div style="font-size: 12px; font-weight: 600; color: #334155; margin-top: 6px;">Reference Number: <span style="font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">#${params.reference}</span></div>
      <div style="font-size: 12px; font-weight: 600; color: #334155; margin-top: 4px;">Reserved Consultation: <strong>${params.consultationSlot || "Tomorrow at 9:00 AM CST"}</strong></div>
    </div>

    <p style="font-weight: 700; color: #0f172a; margin-top: 20px;">What Happens Next?</p>
    <ol style="margin-top: 8px; padding-left: 20px; color: #334155;">
      <li style="margin-bottom: 6px;">Our document specialist audits your submitted forms for zero-error compliance.</li>
      <li style="margin-bottom: 6px;">We review your file during your reserved 1-on-1 consultation call.</li>
      <li style="margin-bottom: 6px;">Final custom pricing is confirmed and filing is dispatched.</li>
    </ol>
  `;

  const htmlContent = generateBrandedHtmlEmail({
    headline: `Intake Confirmed — Ref #${params.reference}`,
    recipientName: params.name,
    referenceNumber: params.reference,
    serviceTitle: params.service,
    detailsHtml,
    ctaText: "Track Case Status",
    ctaLink: `http://localhost:3000/track?ref=${params.reference}`,
  });

  return saveEmailLog({
    recipientEmail: params.email,
    recipientName: params.name,
    subject,
    body: plainText,
    htmlContent,
    status: "Delivered",
    template: "Intake Confirmation",
  });
}

/** 2. Automated Status Update Notification Email */
export function sendStatusUpdateEmail(params: {
  name: string;
  email: string;
  service: string;
  reference: string;
  newStatus: string;
}) {
  const subject = `Status Update on Case #${params.reference} — ${params.newStatus}`;
  const plainText = `Dear ${params.name},\n\nYour application #${params.reference} for ${params.service} has advanced to: ${params.newStatus}.`;

  const detailsHtml = `
    <p>Your ongoing case has progressed to a new milestone stage.</p>
    
    <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">Milestone Status Update</div>
      <div style="font-size: 18px; font-weight: 800; color: #065f46;">${params.newStatus}</div>
      <div style="font-size: 12px; font-weight: 600; color: #334155; margin-top: 6px;">Case Reference: <strong>#${params.reference}</strong> (${params.service})</div>
    </div>

    <p style="color: #334155;">You can view detailed verification notes and courier waybills on your live client portal.</p>
  `;

  const htmlContent = generateBrandedHtmlEmail({
    headline: `Case Milestone Advanced — #${params.reference}`,
    recipientName: params.name,
    referenceNumber: params.reference,
    serviceTitle: params.service,
    detailsHtml,
    ctaText: "View Live Stage Progress",
    ctaLink: `http://localhost:3000/track?ref=${params.reference}`,
  });

  return saveEmailLog({
    recipientEmail: params.email,
    recipientName: params.name,
    subject,
    body: plainText,
    htmlContent,
    status: "Delivered",
    template: "Status Update",
  });
}

/** 3. Automated Auto-Reply for Chat/Enquiry */
export function sendAutomatedReplyEmail(params: {
  name: string;
  email: string;
  queryTopic: string;
}) {
  const subject = `We received your message regarding ${params.queryTopic}`;
  const plainText = `Dear ${params.name},\n\nThank you for contacting One World Solutions. A specialist has been assigned to your query regarding "${params.queryTopic}".`;

  const detailsHtml = `
    <p>Thank you for reaching out to One World Solutions Concierge Team.</p>
    
    <div style="background-color: #f1f5f9; border-left: 4px solid #0F52FF; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Query Topic</div>
      <div style="font-size: 15px; font-weight: 800; color: #0F52FF;">${params.queryTopic}</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Assigned Specialist: Chicago HQ Concierge Desk</div>
    </div>

    <p style="color: #334155;">A team member will reply directly to this email thread within 2 business hours.</p>
  `;

  const htmlContent = generateBrandedHtmlEmail({
    headline: `We Received Your Enquiry`,
    recipientName: params.name,
    detailsHtml,
    ctaText: "Visit Portal Home",
    ctaLink: "http://localhost:3000/",
  });

  return saveEmailLog({
    recipientEmail: params.email,
    recipientName: params.name,
    subject,
    body: plainText,
    htmlContent,
    status: "Delivered",
    template: "Auto Reply",
  });
}
