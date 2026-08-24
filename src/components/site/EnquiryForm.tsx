import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitServiceRequest } from "@/lib/backend-stubs";

/** Lightweight enquiry form used by Digital Marketing and Website Development. */
export function EnquiryForm({
  category,
  service,
  briefLabel = "Project brief",
  onDone,
}: {
  category: string;
  service: string;
  briefLabel?: string;
  onDone?: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", brief: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [reference, setReference] = useState("");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await submitServiceRequest({
        category,
        service,
        applicantName: form.name,
        applicantEmail: form.email,
        phoneUsa: form.phone,
        fields: form,
      });
      setReference(res.reference);
      setStatus("done");
      onDone?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-xl border border-border bg-success/5 p-5 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
        <p className="mt-3 font-semibold">Enquiry received</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reference <strong>{reference}</strong>. Detailed quotes are provided after a scoping call —
          we'll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${service}-name`}>Full Name</Label>
        <Input
          id={`${service}-name`}
          required
          className="h-11"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${service}-email`}>Email</Label>
          <Input
            id={`${service}-email`}
            type="email"
            required
            className="h-11"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${service}-phone`}>Phone</Label>
          <Input
            id={`${service}-phone`}
            type="tel"
            required
            className="h-11"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${service}-brief`}>{briefLabel}</Label>
        <Textarea
          id={`${service}-brief`}
          rows={4}
          required
          value={form.brief}
          onChange={(e) => update("brief", e.target.value)}
          placeholder="A few lines about what you need"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" className="h-12 w-full text-base" disabled={status === "saving"}>
        {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send enquiry
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No pricing shown here — detailed quotes provided after a scoping call.
      </p>
    </form>
  );
}
