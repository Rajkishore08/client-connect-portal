import { useState } from "react";
import { Link, useNavigate, createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  LogOut,
  PackageCheck,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Applications & Session Notifications | One World Solutions" },
      { name: "description", content: "View your saved passport, OCI, e-visa intake history and session notifications." },
    ],
  }),
  component: AccountDashboardPage,
});

function AccountDashboardPage() {
  const navigate = useNavigate();
  const { user, isLoading, applications, notifications, unreadCount, logout, markNotificationRead } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-md" />
          <p className="text-xs font-extrabold text-slate-600 tracking-wide">
            Verifying Secure Client Session...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="surface-card p-8 rounded-3xl border border-border/80 text-center max-w-md w-full space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <User className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Authentication Required</h1>
          <p className="text-sm text-muted-foreground">
            Please sign in to view your previous applications and session notifications.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <Button asChild className="h-11 font-bold">
              <Link to="/auth/login">Sign In Now</Link>
            </Button>
            <Button asChild variant="outline" className="h-11">
              <Link to="/auth/signup">Create New Account</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const filteredApps = applications.filter(
    (app) =>
      app.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 sm:pt-32 pb-12 sm:pb-16 sm:px-6 space-y-8">
      {/* Account Profile Header */}
      <header className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-primary/20 shadow-xs"
            />
          ) : (
            <div className="h-16 w-16 rounded-2xl bg-primary-soft text-primary font-bold text-2xl grid place-items-center border-2 border-primary/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-foreground">{user.name}</h1>
              <Badge variant="secondary" className="gap-1 text-[11px] font-bold">
                {user.provider === "google" ? (
                  <>
                    <svg className="h-3 w-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                    </svg>
                    Google Account
                  </>
                ) : (
                  "Verified Email"
                )}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            <p className="text-[11px] text-muted-foreground/80 mt-1">
              Member since {user.createdAt} • Chicago Client Session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="gap-2 text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/30"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Main Account Tabs */}
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-2xl h-12 inline-flex">
          <TabsTrigger value="applications" className="rounded-xl px-4 py-2 text-xs font-bold gap-2">
            <FileText className="h-4 w-4" /> Previous Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-4 py-2 text-xs font-bold gap-2 relative">
            <Bell className="h-4 w-4" /> Session Alerts
            {unreadCount > 0 && (
              <span className="h-5 min-w-[20px] px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full grid place-items-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Previous Applications */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracking ID or service title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs sm:text-sm"
              />
            </div>
            <Button asChild className="h-10 text-xs font-bold gap-1.5">
              <Link to="/passport">
                Start New Intake <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {filteredApps.length === 0 ? (
            <div className="surface-card p-12 text-center rounded-3xl border border-border/80">
              <PackageCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-bold text-foreground">No Applications Found</h3>
              <p className="text-xs text-muted-foreground mt-1">
                You haven't submitted any intake applications under this email yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="surface-card p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-primary">
                        {app.trackingId}
                      </span>
                      <Badge
                        variant={
                          app.status === "Completed"
                            ? "default"
                            : app.status === "FedEx Dispatched"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-[10px] font-bold px-2 py-0.5"
                      >
                        {app.status}
                      </Badge>
                    </div>

                    <h3 className="text-sm font-extrabold text-foreground leading-snug">
                      {app.serviceTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{app.details}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                        <span>Preparation Progress</span>
                        <span>{app.progressPercent}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${app.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Submitted: {app.submittedAt}</span>
                      <Link
                        to="/track"
                        className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Track <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: Session Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="surface-card p-6 rounded-3xl border border-border/80 bg-card space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Session Alerts &amp; Consular Notifications
            </h2>

            <div className="divide-y divide-border/60">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`py-4 flex items-start justify-between gap-4 transition-colors ${
                    !notif.read ? "bg-primary-soft/30 -mx-4 px-4 rounded-xl" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {notif.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-foreground">{notif.title}</h4>
                        {!notif.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                      <span className="text-[10px] text-muted-foreground/80 font-mono mt-1 block">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>

                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markNotificationRead(notif.id)}
                      className="text-[11px] font-semibold text-primary hover:bg-primary-soft h-7 px-2.5"
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
