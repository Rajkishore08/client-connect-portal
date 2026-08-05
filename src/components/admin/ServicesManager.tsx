import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MANAGED_SERVICES, type ManagedService } from "@/data/mock-data";

export function ServicesManager() {
  const [rows, setRows] = useState<ManagedService[]>(MANAGED_SERVICES);

  const update = (id: string, patch: Partial<ManagedService>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const save = () => {
    // TODO: replace with Supabase upsert into `services`
    console.info("[stub] saveServices", rows);
    toast.success("Catalog saved", { description: "Changes stored locally for now." });
  };

  const grouped = Array.from(new Set(rows.map((r) => r.category)));

  return (
    <div className="space-y-6">
      {grouped.map((category) => (
        <div key={category} className="surface-card overflow-hidden">
          <h2 className="border-b border-border bg-muted/50 px-4 py-3 text-sm font-semibold">
            {category}
          </h2>
          <div className="divide-y divide-border">
            {rows
              .filter((r) => r.category === category)
              .map((row) => (
                <div key={row.id} className="grid gap-3 p-4 lg:grid-cols-[1.1fr_1.6fr_12rem_auto]">
                  <div className="min-w-0 self-center">
                    <p className="truncate font-medium">{row.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {row.live ? "Live" : "Hidden"} on the public site
                    </p>
                  </div>
                  <Input
                    className="h-10"
                    value={row.description}
                    aria-label={`${row.service} description`}
                    onChange={(e) => update(row.id, { description: e.target.value })}
                  />
                  <Input
                    className="h-10"
                    value={row.displayPrice}
                    aria-label={`${row.service} display price`}
                    onChange={(e) => update(row.id, { displayPrice: e.target.value })}
                  />
                  <div className="flex items-center gap-2 self-center">
                    <Switch
                      checked={row.live}
                      aria-label={`Toggle ${row.service}`}
                      onCheckedChange={(v) => update(row.id, { live: v })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {row.live ? "Live" : "Hidden"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <Button onClick={save}>Save catalog</Button>
    </div>
  );
}
