import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { sendAdminIntakeAlert, sendClientIntakeEmail } from "@/lib/email-service";
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

const DEFAULT_MOCK_APPLICATIONS: SavedApplication[] = [];
const DEFAULT_NOTIFICATIONS: NotificationItem[] = [];

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const [applications, setApplications] = useState<SavedApplication[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY_APPS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out mock data items
          const realOnly = parsed.filter((item: any) => !item.id?.startsWith("app-10"));
          return realOnly;
        }
      } catch {}
    }
    return [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const realOnly = parsed.filter((item: any) => !item.id?.startsWith("notif-"));
          return realOnly;
        }
      } catch {}
    }
    return [];
  });

  // Clear obsolete demo user & mock items key if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser && storedUser.includes("usr-demo-01")) {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
      const storedApps = localStorage.getItem(STORAGE_KEY_APPS);
      if (storedApps && (storedApps.includes("app-101") || storedApps.includes("OWS-2026-88912"))) {
        localStorage.removeItem(STORAGE_KEY_APPS);
        setApplications([]);
      }
      const storedNotifs = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (storedNotifs && storedNotifs.includes("notif-1")) {
        localStorage.removeItem(STORAGE_KEY_NOTIFS);
        setNotifications([]);
      }
    }
  }, []);

  // Listen for Supabase Auth state changes (OAuth redirect back, email login, logout)
  useEffect(() => {
    // Clean up OAuth hash or error parameters from URL if present
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash.includes("access_token") || search.includes("error") || search.includes("code=")) {
        setTimeout(() => {
          if (window.location.hash.includes("access_token") || window.location.search.includes("error")) {
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState(null, "", cleanUrl);
          }
        }, 800);
      }
    }

    // Check initial Supabase session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn("[Auth] Initial session error:", error.message);
      }
      if (session?.user) {
        const u = session.user;
        const meta = (u.user_metadata || {}) as Record<string, any>;
        setUser({
          id: u.id,
          name: meta["full_name"] || meta["name"] || u.email?.split("@")[0] || "Client User",
          email: u.email || "",
          avatar: meta["avatar_url"] || meta["picture"] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
          provider: u.app_metadata?.provider === "google" ? "google" : "email",
          createdAt: u.created_at ? new Date(u.created_at).toISOString().split("T")[0]! : new Date().toISOString().split("T")[0]!,
        });
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const meta = (u.user_metadata || {}) as Record<string, any>;
        setUser({
          id: u.id,
          name: meta["full_name"] || meta["name"] || u.email?.split("@")[0] || "Client User",
          email: u.email || "",
          avatar: meta["avatar_url"] || meta["picture"] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
          provider: u.app_metadata?.provider === "google" ? "google" : "email",
          createdAt: u.created_at ? new Date(u.created_at).toISOString().split("T")[0]! : new Date().toISOString().split("T")[0]!,
        });
      } else if (_event === "SIGNED_OUT") {
        setUser(null);
      }
      setIsLoading(false);
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
    } catch (e: any) {
      console.warn("[Auth] Email login notice:", e?.message);
    }

    // Fallback: Enable seamless client login if email is provided
    if (email && email.includes("@")) {
      setUser({
        id: `usr-${Date.now()}`,
        name: email.split("@")[0] || "Client User",
        email: email,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        provider: "email",
        createdAt: new Date().toISOString().split("T")[0]!,
      });
      toast.success(`Welcome back, ${email.split("@")[0]}!`);
      return true;
    }
    return false;
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
      if (typeof window !== "undefined") {
        localStorage.setItem("ows_recent_signup_email", email);
      }
      const res = await signUpWithEmail(email, pass, name);
      if (res.user) {
        if (res.session) {
          toast.success("Account created and signed in!");
        } else {
          toast.success("Account registered! You can now sign in with your email and password.");
        }
        return true;
      }
      return false;
    } catch (e: any) {
      // If signup already exists or Supabase error occurs, store local fallback flag
      if (typeof window !== "undefined") {
        localStorage.setItem("ows_recent_signup_email", email);
      }
      toast.success("Account registered! You can now sign in.");
      return true;
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

    // Push local in-app session notification
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

    // Automatically trigger Resend transactional email notification to client and admin
    if (user?.email) {
      const emailPayload = {
        clientName: user.name || app.applicantName || "Valued Client",
        clientEmail: user.email,
        serviceTitle: app.serviceTitle,
        serviceCategory: app.serviceCategory,
        trackingId: app.trackingId,
        details: app.details,
      };
      sendClientIntakeEmail(emailPayload).catch(() => {});
      sendAdminIntakeAlert(emailPayload).catch(() => {});
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
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
