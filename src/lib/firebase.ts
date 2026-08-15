import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const env = import.meta.env as Record<string, string | undefined>;

const firebaseConfig = {
  apiKey: env["VITE_FIREBASE_API_KEY"] || "AIzaSyDvsUFQuzsEJtxhL1zcz1rvkuaHvzy8g-Q",
  authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] || "one-world-solutions.firebaseapp.com",
  projectId: env["VITE_FIREBASE_PROJECT_ID"] || "one-world-solutions",
  storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] || "one-world-solutions.firebasestorage.app",
  messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "902974343640",
  appId: env["VITE_FIREBASE_APP_ID"] || "1:902974343640:web:b5d76f3dbb88ea4e3d4aad",
  measurementId: env["VITE_FIREBASE_MEASUREMENT_ID"] || "G-KK2W57HSKV",
};

// Initialize Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (browser supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebaseApp);
      console.info("[Firebase] Analytics initialized successfully with measurement ID G-KK2W57HSKV");
    }
  });
}
