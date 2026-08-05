import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { QUICK_SERVICE_OPTIONS } from "@/data/mock-data";

export function QuickServiceSelector() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<"Passport Services" | "Visa Services">("Passport Services");
  const [selectedSlug, setSelectedSlug] = useState<string>("passport-renewal");

  const filteredOptions = QUICK_SERVICE_OPTIONS.filter((opt) => opt.group === selectedGroup);

  const handleStart = () => {
    navigate({
      to: "/passport/$service",
      params: { service: selectedSlug },
    });
  };

  return (
    <div className="surface-card rounded-2xl p-4 sm:p-6 shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-accent fill-accent" />
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Quick Service Intake Selector
        </span>
      </div>

      {/* Group Toggles */}
      <div className="flex rounded-xl bg-muted/70 p-1 mb-4 gap-1">
        <button
          type="button"
          onClick={() => {
            setSelectedGroup("Passport Services");
            setSelectedSlug("passport-renewal");
          }}
          className={`flex-1 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold transition-all ${
            selectedGroup === "Passport Services"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          US Passport Services
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedGroup("Visa Services");
            setSelectedSlug("e-visa");
          }}
          className={`flex-1 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-semibold transition-all ${
            selectedGroup === "Visa Services"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Visa &amp; E-Visa Services
        </button>
      </div>

      {/* Dynamic Dropdown Select + Go Action */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="flex-1 h-12 rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20"
        >
          {filteredOptions.map((opt) => (
            <option key={opt.title} value={opt.slug}>
              {opt.title}
            </option>
          ))}
        </select>

        <Button onClick={handleStart} size="lg" className="h-12 px-6 text-sm font-bold sm:w-auto">
          Get Started <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
