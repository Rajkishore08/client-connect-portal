import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

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
    applicantName: "Rajesh Kumar",
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
    applicantName: "Rajesh Kumar",
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
    applicantName: "Rajesh Kumar",
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
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    // Default demo logged-in user so the user can immediately test sessions if desired
    return {
      id: "usr-demo-01",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      provider: "google",
      createdAt: "2026-01-15",
    };
  });

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

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0] || "User",
      email,
      provider: "email",
      createdAt: new Date().toISOString().split("T")[0]!,
    };
    setUser(newUser);
    toast.success(`Welcome back, ${newUser.name}!`);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const googleUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      provider: "google",
      createdAt: new Date().toISOString().split("T")[0]!,
    };
    setUser(googleUser);
    toast.success("Successfully signed in with Google Account!");
    return true;
  };

  const signup = async (name: string, email: string, _pass: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      provider: "email",
      createdAt: new Date().toISOString().split("T")[0]!,
    };
    setUser(newUser);
    toast.success(`Account created for ${name}!`);
    return true;
  };

  const logout = () => {
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
