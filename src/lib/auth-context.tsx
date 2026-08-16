import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { signInWithEmail, signInWithGoogle, signOutUser, signUpWithEmail, supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "email";
  createdAt: string;
}

export interface SavedApplication {
  id: string;
  serviceTitle: string;
  serviceCategory: string;
  trackingId: string;
  status: "In Preparation" | "Submitted to Embassy" | "VFS Verified" | "FedEx Dispatched" | "Completed";
  progressPercent: number;
  submittedAt: string;
  lastUpdated: string;
  applicantName: string;
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning";
  applicationId?: string;
}

const DEFAULT_MOCK_APPLICATIONS: SavedApplication[] = [
  {
    id: "app-101",
    serviceTitle: "US Passport Renewal (Expedited 5-Day)",
    serviceCategory: "Passport Services",
    trackingId: "OWS-2026-88912",
    status: "FedEx Dispatched",
    progressPercent: 85,
    submittedAt: "2026-08-01",
    lastUpdated: "Today at 2:15 PM",
    applicantName: "Raj",
    details: "Expedited State Dept Processing • Waybill #7890241829",
  },
  {
    id: "app-102",
    serviceTitle: "OCI Card Application (Adult Naturalized)",
    serviceCategory: "OCI Services",
    trackingId: "OWS-2026-44021",
    status: "VFS Verified",
    progressPercent: 60,
    submittedAt: "2026-07-20",
    lastUpdated: "Yesterday at 11:30 AM",
    applicantName: "Raj",
    details: "VFS Chicago Consulate Desk • Match Code #CHI-9921",
  },
  {
    id: "app-103",
    serviceTitle: "Emergency Certificate (One-Way India Return)",
    serviceCategory: "Passport Services",
    trackingId: "OWS-2026-11093",
    status: "Completed",
    progressPercent: 100,
    submittedAt: "2026-06-15",
    lastUpdated: "2026-06-18",
    applicantName: "Raj",
    details: "Issued by CGI Chicago • Travel Clearance Approved",
  },
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "FedEx Tracking Number Generated",
    message: "Your expedited passport renewal document package has been picked up by FedEx. Tracking #7890241829.",
    timestamp: "2 hours ago",
    read: false,
    type: "success",
    applicationId: "app-101",
  },
  {
    id: "notif-2",
    title: "VFS Match Code Approved",
    message: "Chicago Consulate completed document audit for your OCI application OWS-2026-44021.",
    timestamp: "1 day ago",
    read: false,
    type: "info",
    applicationId: "app-102",
  },
  {
    id: "notif-3",
    title: "Emergency Certificate Delivered",
    message: "Your single-journey Emergency Travel Pass was successfully issued.",
    timestamp: "2 weeks ago",
    read: true,
    type: "success",
    applicationId: "app-103",
  },
];

interface AuthContextType {
  user: UserProfile | null;
  applications: SavedApplication[];
  notifications: NotificationItem[];
  unreadCount: number;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginAsGuest: () => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  markNotificationRead: (id: string) => void;
  addApplication: (app: Omit<SavedApplication, "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = "ows_portal_user";
const STORAGE_KEY_APPS = "ows_portal_apps";
const STORAGE_KEY_NOTIFS = "ows_portal_notifs";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [applications, setApplications] = useState<SavedApplication[]>(() => {
    if (typeof window === "undefined") return DEFAULT_MOCK_APPLICATIONS;
    const stored = localStorage.getItem(STORAGE_KEY_APPS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return DEFAULT_MOCK_APPLICATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
    const stored = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return DEFAULT_NOTIFICATIONS;
  });

  // Clear obsolete demo user key if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored && stored.includes("usr-demo-01")) {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
  }, []);

  // Listen for Supabase Auth state changes (OAuth redirect back, email login, logout)
  useEffect(() => {
    // Check initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const meta = (u.user_metadata || {}) as Record<string, any>;
        setUser({
          id: u.id,
          name: meta["full_name"] || u.email?.split("@")[0] || "Client User",
          email: u.email || "",
          avatar: meta["avatar_url"] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
          provider: u.app_metadata?.provider === "google" ? "google" : "email",
          createdAt: u.created_at ? new Date(u.created_at).toISOString().split("T")[0]! : new Date().toISOString().split("T")[0]!,
        });
      } else {
        setUser(null);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const meta = (u.user_metadata || {}) as Record<string, any>;
        setUser({
          id: u.id,
          name: meta["full_name"] || u.email?.split("@")[0] || "Client User",
          email: u.email || "",
          avatar: meta["avatar_url"] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
          provider: u.app_metadata?.provider === "google" ? "google" : "email",
          createdAt: u.created_at ? new Date(u.created_at).toISOString().split("T")[0]! : new Date().toISOString().split("T")[0]!,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await signInWithEmail(email, pass);
      if (res.user) {
        toast.success(`Welcome back, ${res.user.email?.split("@")[0]}!`);
        return true;
      }
      return false;
    } catch (e: any) {
      toast.error(e.message || "Invalid login credentials.");
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signInWithGoogle();
      return true;
    } catch (e: any) {
      toast.error(e.message || "Could not connect to Google OAuth.");
      return false;
    }
  };

  const loginAsGuest = async (): Promise<boolean> => {
    setUser({
      id: "usr-guest-101",
      name: "Guest Client User",
      email: "guest.client@oneworldsolutions.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      provider: "email",
      createdAt: new Date().toISOString().split("T")[0]!,
    });
    toast.success("Signed in as Guest Client!");
    return true;
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await signUpWithEmail(email, pass, name);
      if (res.user) {
        toast.success(`Account registered! Please check your email to confirm registration.`);
        return true;
      }
      return false;
    } catch (e: any) {
      toast.error(e.message || "Registration failed.");
      return false;
    }
  };

  const logout = () => {
    signOutUser().catch(() => {});
    setUser(null);
    toast.info("Signed out of session.");
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addApplication = (app: Omit<SavedApplication, "id">) => {
    const newApp: SavedApplication = {
      ...app,
      id: `app-${Date.now()}`,
    };
    setApplications((prev) => [newApp, ...prev]);

    // Also push a notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "New Application Intake Submitted",
      message: `Your intake for "${app.serviceTitle}" (${app.trackingId}) was successfully recorded.`,
      timestamp: "Just now",
      read: false,
      type: "success",
      applicationId: newApp.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        applications,
        notifications,
        unreadCount,
        login,
        loginWithGoogle,
        loginAsGuest,
        signup,
        logout,
        markNotificationRead,
        addApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
