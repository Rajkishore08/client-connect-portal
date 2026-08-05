import { Link, createFileRoute } from "@tanstack/react-router";
import { LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Meridian Client Services" },
      { name: "description", content: "Internal dashboard for leads, services and exports." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  // Local-only gate. TODO: replace with real Supabase auth session.
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <AdminLogin onSuccess={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-bold">Admin Portal</p>
              <p className="hidden text-xs text-muted-foreground sm:block">admin@portal.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/">View site</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLoggedIn(false)}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="dashboard">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Enquiries &amp; Leads</TabsTrigger>
            <TabsTrigger value="services">Services &amp; Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-6">
            <AdminDashboard />
          </TabsContent>
          <TabsContent value="leads" className="mt-6">
            <LeadsTable />
          </TabsContent>
          <TabsContent value="services" className="mt-6">
            <ServicesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
