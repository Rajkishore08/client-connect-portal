import { Check, Clock, Flame, ShieldAlert, Truck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SHIPPING_OPTIONS, SPEED_TIERS, SpeedTier } from "@/data/mock-data";

const defaultTier: SpeedTier = SPEED_TIERS[1] ?? {
  id: "express",
  name: "2–4 Day Expedited",
  turnaround: "2 to 4 Days",
  serviceFee: 249,
  govFee: 209.50,
  popular: true,
  description: "Fast-track processing for travel within the next 1–2 weeks.",
};

const defaultShipping = SHIPPING_OPTIONS[0] ?? {
  id: "fedex-overnight",
  name: "FedEx Priority Overnight (Return)",
  fee: 39,
  estimatedTime: "Next Morning Delivery",
};

export function TurnaroundEstimator() {
  const [selectedTier, setSelectedTier] = useState<SpeedTier>(defaultTier);
  const [shippingId, setShippingId] = useState<string>("fedex-overnight");

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shippingId) ?? defaultShipping;
  const shippingFee = selectedShipping.fee;
  const totalCost = selectedTier.serviceFee + selectedTier.govFee + shippingFee;

  // Calculate estimated completion date
  const getEstimatedDate = (turnaroundDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + turnaroundDays);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const turnaroundDaysMap: Record<string, number> = {
    "same-day": 1,
    express: 3,
    "fast-track": 6,
    "standard-expedited": 10,
  };

  const estimatedDelivery = getEstimatedDate(turnaroundDaysMap[selectedTier.id] || 3);

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-lift)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">
            <Flame className="h-3.5 w-3.5 text-accent" /> Expedited Speed Calculator
          </span>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Turnaround &amp; Fee Estimator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Compare processing speed tiers vs standard 5–7 weeks government delays.
          </p>
        </div>

        <div className="rounded-2xl bg-muted/60 p-3 text-right">
          <p className="text-xs text-muted-foreground">Estimated Delivery Date</p>
          <p className="text-lg font-extrabold text-primary">{estimatedDelivery}</p>
        </div>
      </div>

      {/* Speed Tiers Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SPEED_TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier)}
              className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary-soft/50 ring-2 ring-primary/20 shadow-md"
                  : "border-border bg-background hover:border-muted-foreground/40"
              }`}
            >
              {tier.emergency && (
                <span className="absolute -top-2.5 left-4 rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground uppercase tracking-wide">
                  24-Hour Emergency
                </span>
              )}
              {tier.popular && (
                <span className="absolute -top-2.5 left-4 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
                  {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-foreground">${tier.serviceFee}</span>
                  <span className="text-xs text-muted-foreground">service fee</span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mt-4 border-t border-border/60 pt-3 text-xs">
                <span className="font-semibold text-foreground">Turnaround:</span>{" "}
                <span className="text-primary font-bold">{tier.turnaround}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Shipping Option & Live Price Summary */}
      <div className="mt-8 rounded-2xl bg-muted/40 p-5 grid gap-6 md:grid-cols-[1.5fr_1fr] items-center">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <Truck className="inline h-3.5 w-3.5 mr-1" /> Return Delivery &amp; Courier Option
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            {SHIPPING_OPTIONS.map((ship) => (
              <button
                key={ship.id}
                type="button"
                onClick={() => setShippingId(ship.id)}
                className={`rounded-xl border p-2.5 text-left text-xs transition-all ${
                  shippingId === ship.id
                    ? "border-primary bg-card font-semibold shadow-xs"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-bold text-foreground">{ship.name}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">${ship.fee} • {ship.estimatedTime}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border p-4 text-center sm:text-right">
          <p className="text-xs text-muted-foreground">Total Estimated Cost (Service + Govt + Shipping)</p>
          <p className="text-3xl font-black text-foreground mt-1">${totalCost.toFixed(2)}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Includes ${selectedTier.serviceFee} service + ${selectedTier.govFee} govt fee + ${shippingFee} shipping
          </p>
        </div>
      </div>
    </section>
  );
}
