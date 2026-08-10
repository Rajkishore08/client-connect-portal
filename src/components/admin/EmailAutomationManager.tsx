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

  const handleTestDispatch = () => {
    if (!testEmail) return;
    sendIntakeConfirmationEmail({
      name: "Test Client",
      email: testEmail,
      service: "US Passport Renewal (Expedited)",
      reference: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      consultationSlot: "Tomorrow at 10:00 AM CST",
    });
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
                  <td className="px-4 py-3 font-semibold">{log.recipientName} &lt;{log.recipientEmail}&gt;</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-[10px] font-bold">{log.template}</Badge>
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
          <DialogHeader className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <DialogTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" /> HTML Email Template Preview — {previewLog?.subject}
            </DialogTitle>
          </DialogHeader>
          {previewLog?.htmlContent && (
            <div className="p-4 bg-slate-100 max-h-[75vh] overflow-y-auto">
              <iframe
                title="Email Preview"
                srcDoc={previewLog.htmlContent}
                className="w-full h-[520px] rounded-2xl border border-slate-300 shadow-md bg-white"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
