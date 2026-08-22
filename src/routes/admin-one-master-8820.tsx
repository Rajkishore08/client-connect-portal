import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AuditLogsManager } from "@/components/admin/AuditLogsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { ClientDocumentVault } from "@/components/admin/ClientDocumentVault";
import { EmailAutomationManager } from "@/components/admin/EmailAutomationManager";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { RegisteredUsersManager } from "@/components/admin/RegisteredUsersManager";

import { SaaSAdminLayout, type AdminTab } from "@/components/admin/SaaSAdminLayout";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { StaffCredentialsManager } from "@/components/admin/StaffCredentialsManager";

export const Route = createFileRoute("/admin-one-master-8820")({
  head: () => ({
    meta: [
      { title: "Admin Console — One World Solutions SaaS Suite" },
      { name: "description", content: "Executive operations suite for managing intakes, services, emails, and client accounts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  if (!loggedIn) return <AdminLogin onSuccess={() => setLoggedIn(true)} />;

  return (
    <SaaSAdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={() => setLoggedIn(false)}
      userRole="Super Admin"
      userName="Operations Director"
    >
      {activeTab === "dashboard" && <AdminDashboard />}
      {activeTab === "leads" && <LeadsTable />}
      {activeTab === "vault" && <ClientDocumentVault />}
      {activeTab === "services" && <ServicesManager />}
      {activeTab === "emails" && <EmailAutomationManager />}
      {activeTab === "blogs" && <BlogManager />}
      {activeTab === "users" && <RegisteredUsersManager />}
      {activeTab === "staff" && <StaffCredentialsManager />}
      {activeTab === "audit" && <AuditLogsManager />}
    </SaaSAdminLayout>
  );
}
