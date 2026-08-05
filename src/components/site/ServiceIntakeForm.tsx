import { CheckCircle2, ClipboardList, Loader2, Mail } from "lucide-react";
import { useState } from "react";

import { FileUploader, type LocalFile } from "@/components/site/FileUploader";
import { TrustBanner } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CONFIRMATION_COPY,
  SHARED_APPLICANT_FIELDS,
  type ServiceConfig,
  type ServiceField,
} from "@/data/mock-data";
import { submitServiceRequest, uploadDocuments } from "@/lib/backend-stubs";

function Field({
  field,
  value,
  onChange,
}: {
  field: ServiceField;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `field-${field.name}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {field.type === "textarea" ? (
        <Textarea
          id={id}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id} className="h-11 w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11"
        />
      )}
    </div>
  );
}

export function ServiceIntakeForm({ service }: { service: ServiceConfig }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [reference, setReference] = useState("");

  const set = (name: string, v: string) => setValues((prev) => ({ ...prev, [name]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      // TODO: replace with Supabase Storage upload + insert
      await uploadDocuments([]);
      const res = await submitServiceRequest({
        category: "Passport & Visa Services",
        service: service.title,
        fields: values,
        fileNames: files.map((f) => f.name),
      });
      setReference(res.reference);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="space-y-6">
        <div className="surface-card p-6 text-center sm:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10">
            <CheckCircle2 className="h-7 w-7 text-success" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">Request received</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {CONFIRMATION_COPY}
          </p>
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
            Reference {reference}
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground">
            <Mail className="h-4 w-4" /> Confirmation email preview
          </div>
          <div className="space-y-3 p-5 text-sm">
            <p className="text-muted-foreground">
              <strong className="text-foreground">To:</strong> {values['email'] || "you@example.com"}
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Subject:</strong> {service.title} request {reference}{" "}
              received
            </p>
            <div className="rounded-lg bg-muted/50 p-4 leading-relaxed text-muted-foreground">
              <p>Hi {values['fullName'] || "there"},</p>
              <p className="mt-3">{CONFIRMATION_COPY}</p>
              <p className="mt-3">— Meridian Client Services</p>
            </div>
          </div>
        </div>

        <TrustBanner />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <ClipboardList className="h-5 w-5 text-primary" /> Documents You'll Need
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Have these ready before you start filling in the form below.
        </p>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {service.checklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5 text-sm"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <TrustBanner />

      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-bold">Applicant details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SHARED_APPLICANT_FIELDS.map((f) => (
            <Field key={f.name} field={f} value={values[f.name] ?? ""} onChange={(v) => set(f.name, v)} />
          ))}
        </div>

        {service.extraFields.length > 0 && (
          <>
            <div className="mt-8 flex items-center gap-3">
              <h3 className="text-base font-semibold">{service.title} details</h3>
              {service.urgent && <Badge variant="destructive">Urgent</Badge>}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {service.extraFields.map((f) => (
                <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : undefined}>
                  <Field field={f} value={values[f.name] ?? ""} onChange={(v) => set(f.name, v)} />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8">
          <h3 className="text-base font-semibold">Upload supporting documents</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Optional now — we'll confirm the exact documents after reviewing your request.
          </p>
          <div className="mt-4">
            <FileUploader files={files} onChange={setFiles} />
          </div>
        </div>

        {status === "error" && (
          <p className="mt-5 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            We couldn't submit your request. Please try again.
          </p>
        )}

        <Button type="submit" className="mt-6 h-12 w-full text-base" disabled={status === "saving"}>
          {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit request
        </Button>
      </section>
    </form>
  );
}
