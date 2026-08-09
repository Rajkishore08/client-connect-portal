import { useEffect, useState } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if loader was already shown in this browser session
    const hasLoaded = sessionStorage.getItem("ow_portal_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Instant 150ms micro-flash loading timer
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("ow_portal_loaded", "true");
      }, 150);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFBFD] text-slate-900 transition-opacity duration-200 backdrop-blur-2xl ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-6 max-w-sm">
        <div className="glass-panel p-4 rounded-3xl border border-white/90 bg-white shadow-glass animate-pulse">
          <img
            src="/logo-square.webp"
            alt="One World Solutions"
            className="h-20 sm:h-28 w-auto object-contain"
          />
        </div>
        <p className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">
          Loading One World Portal...
        </p>
      </div>
    </div>
  );
}
