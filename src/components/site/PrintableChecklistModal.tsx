import React, { useState } from "react";
import { CheckCircle2, FileText, MapPin, Phone, Printer, ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OFFICE_LOCATION } from "@/data/mock-data";

interface PrintableChecklistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceTitle: string;
  checklistItems: string[];
  applicantInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    speedTier?: string;
  };
}

export function PrintableChecklistModal({
  open,
  onOpenChange,
  serviceTitle,
  checklistItems,
  applicantInfo,
}: PrintableChecklistModalProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsHtml = checklistItems
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; width: 40px; text-align: center;">
            <div style="width: 20px; height: 20px; border: 2px solid #0F52FF; border-radius: 4px; display: inline-block;"></div>
          </td>
          <td style="padding: 12px 16px; font-size: 14px; color: #1e293b; font-weight: 500;">
            ${item}
          </td>
          <td style="padding: 12px 16px; font-size: 12px; color: #64748b; text-align: right;">
            [ Verified ]
          </td>
        </tr>`
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>One World Solutions — Official Intake Checklist Form (${serviceTitle})</title>
          <style>
            @page { margin: 15mm; size: A4; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #0F52FF; padding-bottom: 16px; margin-bottom: 24px; }
            .logo-text { font-size: 22px; font-weight: 900; color: #0F52FF; letter-spacing: -0.5px; }
            .sub-logo { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; font-weight: 700; }
            .office-info { font-size: 11px; text-align: right; color: #475569; line-height: 1.5; }
            .form-title { text-align: center; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; margin-bottom: 20px; }
            .form-title h1 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; }
            .form-title p { margin: 4px 0 0 0; font-size: 12px; color: #475569; }
            .section { margin-bottom: 24px; }
            .section-header { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0F52FF; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .field-box { border: 1px solid #cbd5e1; padding: 10px 14px; border-radius: 6px; background: #fafafa; }
            .field-label { font-size: 10px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; }
            .field-val { font-size: 13px; font-weight: 700; color: #0f172a; min-height: 18px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .footer-notes { margin-top: 30px; border-top: 2px solid #e2e8f0; pt-16px; padding-top: 16px; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6; }
            .disclaimer { font-size: 10px; color: #94a3b8; margin-top: 16px; text-align: justify; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo-text">ONE WORLD SOLUTIONS</div>
              <div class="sub-logo">Travel Concierge • Build Digitally • Grow Globally</div>
            </div>
            <div class="office-info">
              <strong>Chicago HQ Desk:</strong> ${OFFICE_LOCATION.address}<br />
              <strong>Direct Phone:</strong> ${OFFICE_LOCATION.phone}<br />
              <strong>Email:</strong> ${OFFICE_LOCATION.email}
            </div>
          </div>

          <div class="form-title">
            <h1>Official Consular Intake &amp; Document Checklist</h1>
            <p>Target Service: <strong>${serviceTitle}</strong> | Office Zip Code: <strong>60613</strong></p>
          </div>

          <div class="section">
            <div class="section-header">1. Applicant &amp; Filing Details</div>
            <div class="grid">
              <div class="field-box">
                <div class="field-label">Applicant Full Name</div>
                <div class="field-val">${applicantInfo?.name || "____________________________________"}</div>
              </div>
              <div class="field-box">
                <div class="field-label">Email Address</div>
                <div class="field-val">${applicantInfo?.email || "____________________________________"}</div>
              </div>
              <div class="field-box">
                <div class="field-label">Phone Number</div>
                <div class="field-val">${applicantInfo?.phone || "____________________________________"}</div>
              </div>
              <div class="field-box">
                <div class="field-label">Filing Speed Tier</div>
                <div class="field-val">${applicantInfo?.speedTier || "2–4 Day Expedited"}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">2. Mandatory Physical Document Requirements</div>
            <p style="font-size: 12px; color: #475569; margin: 0 0 10px 0;">
              Check off each item below before handing over or mailing your physical document package to our Chicago HQ desk.
            </p>
            <table>
              ${itemsHtml}
            </table>
          </div>

          <div class="section">
            <div class="section-header">3. Document Submission &amp; Courier Instructions</div>
            <div style="font-size: 12px; color: #334155; line-height: 1.6; background: #f8fafc; border: 1px dashed #94a3b8; padding: 12px; border-radius: 8px;">
              • <strong>100% Online Digital Upload:</strong> Upload scanned document copies directly through your online client portal intake.<br />
              • <strong>Mail-In Courier Dispatch:</strong> Include a copy of this checklist inside your prepaid FedEx/UPS priority envelope addressed to One World Solutions Chicago Desk (Chicago, IL 60613, USA).<br />
              • <strong>Document Security Audit:</strong> All documents undergo AES-256 SSL encrypted digital logging and pre-consular audit prior to embassy filing.
            </div>
          </div>

          <div class="footer-notes">
            One World Solutions — E-Verified Private Service-Based Agency • Chicago, IL 60613, USA<br />
            For Support or Live Status Updates, call <strong>${OFFICE_LOCATION.phone}</strong> or visit <strong>https://oneworldsolutionsusa.com/track</strong>
          </div>

          <div class="disclaimer">
            OFFICIAL DISCLAIMER: One World Solutions is a private service-based company operating under ABHIPRIYA GROUPS LLC. We assist with form preparation, consular auditing, and expedited filing. We are not affiliated with, or acting on behalf of, any government department, embassy, or VFS. Official government fees are separate.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[95vw] p-0 overflow-hidden border border-slate-200 bg-white shadow-2xl rounded-3xl z-[200]">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-600/20 text-blue-400 grid place-items-center shrink-0 border border-blue-500/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-extrabold text-white font-display">
                Official Document Checklist &amp; Form
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 font-medium">
                {serviceTitle} • Chicago HQ 60613 Desk
              </DialogDescription>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 grid place-items-center cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Printable Form Content Preview */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Header Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-extrabold text-slate-900 text-sm">{serviceTitle}</p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-blue-600" /> Chicago HQ Desk (Zip: <strong>60613</strong>)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
              Official Consular Form
            </span>
          </div>

          {/* Documents Checklist Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-extrabold uppercase tracking-wider text-[11px] text-slate-500">
                Required Physical Documents Checklist
              </p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {checklistItems.length} Items Mandatory
              </span>
            </div>

            <div className="space-y-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="h-5 w-5 rounded border-2 border-blue-600 grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 leading-tight">{item}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Physical document copy required for consular pre-audit.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Instructions */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-700 space-y-1.5">
            <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Submission &amp; Storage Notice
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All documents uploaded through our online intake system are protected with <strong>AES-256 SSL secure storage &amp; consular pre-audit</strong>. You can bring or mail this form to our Chicago desk (<strong>Chicago, IL 60613, USA</strong>).
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 px-4 text-xs font-semibold text-slate-700 hover:bg-white cursor-pointer"
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={handlePrint}
            className="h-11 px-6 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer ml-auto"
          >
            <Printer className="h-4 w-4 mr-2" /> Print Official Form &amp; Checklist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
