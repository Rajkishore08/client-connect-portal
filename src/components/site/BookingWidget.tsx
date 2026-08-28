import { format } from "date-fns";
import { CalendarCheck, CheckCircle2, Clock, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BOOKING_SLOTS } from "@/data/mock-data";
import { confirmBooking } from "@/lib/backend-stubs";
import { sendBookingConfirmationEmail, sendAdminIntakeAlert } from "@/lib/email-service";
import { saveConsultationToSupabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export function BookingWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) {
      setStatus("error");
      return;
    }
    setStatus("saving");
    const res = await confirmBooking({ ...form, date: date.toISOString(), slot });

    const formattedDate = date.toISOString().split("T")[0]!;

    await saveConsultationToSupabase({
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: formattedDate,
      timeSlot: slot,
      topic: form.reason || "Consultation Call",
    });

    await sendBookingConfirmationEmail({
      clientName: form.name,
      clientEmail: form.email,
      clientPhone: form.phone,
      bookingDate: formattedDate,
      bookingTime: slot,
      serviceInterested: form.reason || "Consular & Software Strategy Consultation",
    });

    await sendAdminIntakeAlert({
      clientName: form.name,
      clientEmail: form.email,
      clientPhone: form.phone,
      serviceTitle: `Strategy Call: ${slot}`,
      serviceCategory: "Virtual Strategy Consultation",
      trackingId: `BOOK-${Date.now().toString().slice(-6)}`,
      details: `Scheduled Date: ${formattedDate} at ${slot} | Reason: ${form.reason || "General Scoping"}`,
    }).catch(() => {});

    setStatus(res.ok ? "done" : "error");
  };

  if (status === "done") {
    return (
      <div className="surface-card p-6 text-center sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </span>
        <h3 className="mt-5 text-xl font-bold">Consultation booked</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {date ? format(date, "EEEE, d MMMM yyyy") : ""} at {slot}
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-xl bg-muted/60 p-4 text-left text-sm">
          <p className="font-medium">{form.name}</p>
          <p className="text-muted-foreground">{form.email}</p>
          <p className="text-muted-foreground">{form.phone}</p>
          {form.reason && <p className="mt-2 text-muted-foreground">{form.reason}</p>}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          A calendar invite &amp; Google Meeting confirmation from <strong className="text-slate-800">oneworldsolutions20@gmail.com</strong> has been sent to your email. For general enquiries, contact us at <strong className="text-slate-800">support@oneworldsolutionsusa.com</strong>.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setSlot(null);
            setForm({ name: "", email: "", phone: "", reason: "" });
          }}
        >
          Book another slot
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold shrink-0">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-extrabold text-slate-900 text-sm">Need Urgent Assistance?</p>
            <p className="text-slate-600">Chat directly with our team on WhatsApp Business for instant document guidance.</p>
          </div>
        </div>
        <a
          href="https://wa.me/17739745045"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 font-bold text-xs shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          WhatsApp: +1 (773) 974-5045
        </a>
      </div>
      <div className="surface-card p-4 sm:p-6">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <CalendarCheck className="h-4.5 w-4.5 text-primary" /> Pick a date
        </h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            setSlot(null);
          }}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          className={cn("mt-3 w-full pointer-events-auto")}
        />

        <h3 className="mt-5 flex items-center gap-2 text-base font-semibold">
          <Clock className="h-4.5 w-4.5 text-primary" /> Available slots
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BOOKING_SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                slot === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card p-4 sm:p-6">
        <h3 className="text-base font-semibold">Your details</h3>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="b-name">Full Name</Label>
            <Input
              id="b-name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b-email">Email</Label>
            <Input
              id="b-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b-phone">Phone</Label>
            <Input
              id="b-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b-reason">Brief reason</Label>
            <Textarea
              id="b-reason"
              rows={4}
              value={form.reason}
              onChange={(e) => update("reason", e.target.value)}
              placeholder="Tell us what you'd like to discuss"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Please pick a date and time slot, then check your details.
          </p>
        )}

        <div className="mt-5 rounded-lg bg-muted/60 px-3 py-2.5 text-sm">
          {date && slot ? (
            <span>
              Selected: <strong>{format(date, "d MMM yyyy")}</strong> at <strong>{slot}</strong>
            </span>
          ) : (
            <span className="text-muted-foreground">No slot selected yet.</span>
          )}
        </div>

        <Button type="submit" className="mt-5 h-12 w-full text-base" disabled={status === "saving"}>
          {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
          Confirm booking
        </Button>
      </div>
    </form>
  );
}
