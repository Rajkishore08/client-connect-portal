import { Eye, Mail, Send, CheckCircle2, RefreshCw, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getEmailLogs, sendIntakeConfirmationEmail, type EmailLog } from "@/lib/email-service";

export function EmailAutomationManager() {
  const [logs, setLogs] = useState<EmailLog[]>(() => getEmailLogs());
  const [autoIntakeEnabled, setAutoIntakeEnabled] = useState(true);
  const [autoStatusEnabled, setAutoStatusEnabled] = useState(true);
  const [testEmail, setTestEmail] = useState("client.test@example.com");
  const [previewLog, setPreviewLog] = useState<EmailLog | null>(null);

  const refreshLogs = () => {
    setLogs(getEmailLogs());
    toast.info("Email logs refreshed.");
  };

  const handleTestDispatch = async () => {
    if (!testEmail) return;
    toast.loading(`Dispatching test email to ${testEmail}...`, { id: "test-mail-dispatch" });
    try {
      const res = await sendIntakeConfirmationEmail({
        name: "Test Client",
        email: testEmail,
        service: "US Passport Renewal (Expedited)",
        reference: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
        consultationSlot: "Tomorrow at 10:00 AM CST",
      });
      if (res?.success) {
        toast.success(`Test email dispatched successfully to ${testEmail}!`, { id: "test-mail-dispatch" });
      } else {
        const errNotice = (res as { error?: string } | undefined)?.error || "Check API Key connection";
        toast.error(`Email dispatch notice: ${errNotice}`, { id: "test-mail-dispatch" });
      }
    } catch (err: any) {
      toast.error(`Dispatch error: ${err.message || String(err)}`, { id: "test-mail-dispatch" });
    }
    setLogs(getEmailLogs());
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Banner */}
      <div className="surface-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
                <Mail className="h-4 w-4" />
              </span>
              <h2 className="text-xl font-bold font-display text-foreground">Automated Mailing Engine</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure automatic client emails triggered on intake submission, appointment booking, and status updates.
            </p>
          </div>

          <Button onClick={refreshLogs} variant="outline" size="sm" className="font-semibold gap-1.5 cursor-pointer">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh Logs
          </Button>
        </div>

        {/* Automation Toggles */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Auto Intake Confirmation Email</p>
              <p className="text-[11px] text-muted-foreground">Dispatches intake reference &amp; consultation slot instantly</p>
            </div>
            <Switch
              checked={autoIntakeEnabled}
              onCheckedChange={(v) => {
                setAutoIntakeEnabled(v);
                toast.success(`Intake Auto-Email ${v ? "Enabled" : "Disabled"}`);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Auto Stage Update Email</p>
              <p className="text-[11px] text-muted-foreground">Notifies client when VFS queue or FedEx status changes</p>
            </div>
            <Switch
              checked={autoStatusEnabled}
              onCheckedChange={(v) => {
                setAutoStatusEnabled(v);
                toast.success(`Stage Update Auto-Email ${v ? "Enabled" : "Disabled"}`);
              }}
            />
          </div>
        </div>

        {/* Test Email Dispatch Sandbox */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
          <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Test Dispatch Sandbox
          </p>
          <div className="flex items-center gap-3">
            <Input
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter recipient email address"
              className="h-10 text-xs bg-card"
            />
            <Button onClick={handleTestDispatch} className="h-10 px-5 font-bold text-xs bg-primary text-white cursor-pointer shrink-0">
              <Send className="h-3.5 w-3.5 mr-1.5" /> Send Test Email
            </Button>
          </div>
        </div>
      </div>

      {/* Email Dispatch Logs Table */}
      <div className="surface-card overflow-hidden rounded-3xl border border-border">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Recent Email Logs ({logs.length})</h3>
          <Badge variant="outline" className="text-[10px] font-mono">Real-time Stream</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 text-left text-muted-foreground font-semibold">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Template</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">HTML Preview</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-border/60 hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{log.sentAt}</td>
                  <td className="px-4 py-3 font-semibold">{log.recipient}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-[10px] font-bold">{log.template || "Intake Auto"}</Badge>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-foreground">{log.subject}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                      <CheckCircle2 className="h-3 w-3" /> {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewLog(log)}
                      className="h-7 text-xs font-bold text-primary hover:bg-primary-soft cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> Preview HTML
                    </Button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No email dispatches logged yet. Submit an intake form or run a test dispatch above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HTML Email Preview Modal */}
      <Dialog open={!!previewLog} onOpenChange={() => setPreviewLog(null)}>
        <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden border border-slate-200 bg-white rounded-3xl">
          <DialogHeader className="p-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
            <DialogTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" /> HTML Email Template Preview — {previewLog?.subject}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-slate-100 max-h-[75vh] overflow-y-auto">
            <iframe
              title="Email Preview"
              srcDoc={
                (previewLog as any)?.htmlContent ||
                `
                <!DOCTYPE html>
                <html>
                <head><meta charset="utf-8"></head>
                <body style="font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
                  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <div style="background: #ffffff; padding: 28px; text-align: center; border-bottom: 1px solid #e2e8f0;">
                      <img src="/logo-rect.webp" alt="ONE WORLD SOLUTIONS" style="height: 38px; width: auto; display: block; margin: 0 auto 10px auto;" />
                      <div style="display: inline-block; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase;">
                        Transaction Log Preview
                      </div>
                    </div>
                    <div style="padding: 32px 28px;">
                      <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">${previewLog?.subject || "Official Email Alert"}</h2>
                      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                        Dispatched to: <strong>${previewLog?.recipient || "client.test@example.com"}</strong>
                      </p>
                      <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #cbd5e1;">
                        <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; font-family: monospace;">LOG TELEMETRY</p>
                        <div style="font-family: monospace; font-size: 18px; font-weight: 800; color: #2563eb;">${previewLog?.id || "LOG-2026-001"}</div>
                        <p style="margin: 12px 0 0 0; font-size: 13px; color: #475569;">Status: ${previewLog?.status || "Delivered"} • Dispatched via Resend API</p>
                      </div>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0;"><strong>One World Solutions (Chicago, IL 60613 • E-Verified)</strong></p>
                    </div>
                  </div>
                </body>
                </html>
              `
              }
              className="w-full h-[520px] rounded-2xl border border-slate-300 shadow-md bg-white"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
