import {
  Edit3,
  Search,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Save,
  Download,
  FileText,
  DollarSign,
  Tag,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ManagedService } from "@/data/mock-data";
import {
  getManagedServices,
  updateManagedService,
  deleteManagedService,
  saveManagedServices,
} from "@/lib/services-store";

export function ServicesManager() {
  const [rows, setRows] = useState<ManagedService[]>(() => getManagedServices());
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "hidden">("all");

  // Edit Modal State
  const [editingRow, setEditingRow] = useState<ManagedService | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editLive, setEditLive] = useState(true);

  const existingCategories = Array.from(new Set(rows.map((r) => r.category)));

  const handleOpenEdit = (row: ManagedService) => {
    setEditingRow(row);
    setEditTitle(row.service);
    setEditCategory(row.category);
    setEditPrice(row.displayPrice);
    setEditDesc(row.description);
    setEditLive(row.live);
  };

  const handleSaveEdit = () => {
    if (!editingRow) return;
    if (!editTitle.trim()) {
      toast.error("Service title cannot be empty.");
      return;
    }

    const updated = updateManagedService(editingRow.id, {
      service: editTitle.trim(),
      category: editCategory.trim() || editingRow.category,
      displayPrice: editPrice.trim() || "Quote on request",
      description: editDesc.trim(),
      live: editLive,
    });

    setRows(updated);
    setEditingRow(null);
    toast.success(`Updated Service: "${editTitle.trim()}"`, {
      description: "Changes saved to catalog store.",
    });
  };

  const handleToggleLive = (id: string, currentLive: boolean) => {
    const updated = updateManagedService(id, { live: !currentLive });
    setRows(updated);
    toast.info(`Service ${!currentLive ? "Published Live" : "Hidden from Public Catalog"}`);
  };

  const handleUpdateRow = (id: string, patch: Partial<ManagedService>) => {
    const updated = updateManagedService(id, patch);
    setRows(updated);
  };

  const handleDelete = (id: string, serviceTitle: string) => {
    if (confirm(`Are you sure you want to delete service "${serviceTitle}"?`)) {
      const updated = deleteManagedService(id);
      setRows(updated);
      toast.success(`Deleted service "${serviceTitle}"`);
    }
  };

  const handleSaveAll = () => {
    saveManagedServices(rows);
    toast.success("Service Catalog Saved", {
      description: `Synced ${rows.length} total services across intake forms and calculator.`,
    });
  };

  const handleExportCatalog = () => {
    const jsonStr = JSON.stringify(rows, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `OWS_Services_Catalog_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success("Services Catalog Exported to JSON");
  };

  // Filter Rows
  const filteredRows = rows.filter((r) => {
    const matchesSearch =
      r.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "all" || r.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || (statusFilter === "live" ? r.live : !r.live);
    return matchesSearch && matchesCat && matchesStatus;
  });

  const categoriesToRender =
    categoryFilter === "all"
      ? Array.from(new Set(filteredRows.map((r) => r.category)))
      : [categoryFilter];

  return (
    <div className="space-y-6">
      {/* Header Banner & Global Actions */}
      <div className="surface-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
                <Layers className="h-4 w-4" />
              </span>
              <h2 className="text-xl font-bold font-display text-foreground">Service Catalog Editor</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Edit existing services, update pricing structures, descriptions, and toggle live catalog visibility.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleSaveAll} variant="outline" size="sm" className="h-10 font-bold text-xs cursor-pointer rounded-xl">
              <Save className="h-3.5 w-3.5 mr-1.5 text-primary" /> Save Catalog
            </Button>
            <Button onClick={handleExportCatalog} variant="outline" size="sm" className="h-10 font-bold text-xs cursor-pointer rounded-xl">
              <Download className="h-3.5 w-3.5 mr-1.5" /> Export JSON
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by service title, category, or description..."
              className="pl-9 h-10 text-xs bg-background text-foreground rounded-xl"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-10 text-xs bg-background text-foreground rounded-xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories ({existingCategories.length})</SelectItem>
              {existingCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="h-10 text-xs bg-background text-foreground rounded-xl">
              <SelectValue placeholder="All Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses ({rows.length})</SelectItem>
              <SelectItem value="live">Live Only ({rows.filter((r) => r.live).length})</SelectItem>
              <SelectItem value="hidden">Hidden Only ({rows.filter((r) => !r.live).length})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grouped Service Cards List */}
      {categoriesToRender.map((category) => {
        const catRows = filteredRows.filter((r) => r.category === category);
        if (catRows.length === 0) return null;

        return (
          <div key={category} className="surface-card overflow-hidden rounded-3xl border border-border">
            <div className="bg-muted/40 px-6 py-3.5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-bold bg-background text-foreground">
                  {category}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">({catRows.length} services)</span>
              </div>
              <Badge variant="secondary" className="text-[10px] font-mono">
                {catRows.filter((r) => r.live).length} Live
              </Badge>
            </div>

            <div className="divide-y divide-border">
              {catRows.map((row) => (
                <div
                  key={row.id}
                  className="p-5 transition-colors hover:bg-muted/20 grid gap-4 lg:grid-cols-[1.4fr_1.8fr_1.2fr_auto] items-center"
                >
                  {/* Service Title & Category Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-foreground truncate">{row.service}</p>
                      {row.live ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                          <Eye className="h-3 w-3 mr-1" /> Live
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-[10px] font-bold">
                          <EyeOff className="h-3 w-3 mr-1" /> Hidden
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{row.category}</p>
                  </div>

                  {/* Inline Description Input */}
                  <div className="space-y-1">
                    <Label className="text-[11px] font-bold text-muted-foreground">Catalog Description</Label>
                    <Input
                      className="h-9 text-xs bg-background text-foreground rounded-xl"
                      value={row.description}
                      onChange={(e) => handleUpdateRow(row.id, { description: e.target.value })}
                    />
                  </div>

                  {/* Display Price Input */}
                  <div className="space-y-1">
                    <Label className="text-[11px] font-bold text-muted-foreground">Price &amp; Fee Label</Label>
                    <Input
                      className="h-9 text-xs bg-background text-foreground font-mono font-semibold rounded-xl"
                      value={row.displayPrice}
                      onChange={(e) => handleUpdateRow(row.id, { displayPrice: e.target.value })}
                    />
                  </div>

                  {/* Actions: Edit Modal Button, Switch & Delete */}
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(row)}
                      className="h-9 font-bold text-xs gap-1.5 cursor-pointer rounded-xl"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-primary" /> Edit
                    </Button>

                    <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-xl border border-border">
                      <Switch
                        checked={row.live}
                        onCheckedChange={() => handleToggleLive(row.id, row.live)}
                      />
                      <span className="text-xs font-semibold text-muted-foreground min-w-[3rem]">
                        {row.live ? "Visible" : "Draft"}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(row.id, row.service)}
                      className="h-9 w-9 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 cursor-pointer rounded-xl"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filteredRows.length === 0 && (
        <div className="surface-card p-12 text-center space-y-3 rounded-3xl border border-border">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="text-base font-bold text-foreground">No services matched your search filter.</p>
          <p className="text-xs text-muted-foreground">Try clearing your search query above.</p>
        </div>
      )}

      {/* EDIT EXISTING SERVICE MODAL DIALOG — Ultra Neat Executive Styling */}
      <Dialog open={!!editingRow} onOpenChange={() => setEditingRow(null)}>
        <DialogContent className="max-w-xl w-[95vw] p-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-background shadow-2xl">
          {/* Executive Header Banner */}
          <div className="p-6 bg-slate-900 text-white border-b border-slate-800 relative">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30">
                <Edit3 className="h-5 w-5" />
              </span>
              <div>
                <DialogTitle className="text-lg font-bold font-display text-white">Edit Catalog Service</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 mt-0.5">
                  Update service title, pricing structure, category, and public catalog visibility.
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Clean Form Body */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Service Title */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary" /> Service Title *
              </Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. Passport Renewal"
                className="h-11 text-xs bg-background text-foreground font-semibold rounded-xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Category & Pricing Structure Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-primary" /> Service Category
                </Label>
                <Input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Category Name"
                  className="h-11 text-xs bg-background text-foreground rounded-xl border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> Pricing Structure
                </Label>
                <Input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="e.g. Quote on request"
                  className="h-11 text-xs font-mono font-semibold bg-background text-foreground rounded-xl border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" /> Catalog Description &amp; Overview
              </Label>
              <Textarea
                rows={3}
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Describe what the service provides..."
                className="text-xs bg-background text-foreground font-normal rounded-xl border-slate-200 dark:border-slate-800 leading-relaxed resize-none"
              />
            </div>

            {/* Live Visibility Switch Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">Publish Live on Site Catalog</p>
                <p className="text-[11px] text-muted-foreground">Toggle visibility across public intake forms and wizards</p>
              </div>
              <Switch checked={editLive} onCheckedChange={setEditLive} />
            </div>
          </div>

          {/* Neat Dialog Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingRow(null)}
              className="h-10 px-5 font-bold text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEdit}
              className="h-10 px-6 font-bold text-xs bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 rounded-xl cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4 mr-1.5" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
