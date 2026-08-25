import { useEffect, useState } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("ow_portal_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("ow_portal_loaded", "true");
      }, 200);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl text-slate-900 transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-5 px-6 max-w-sm">
        <div className="p-4 rounded-3xl border border-white/90 bg-white/90 shadow-2xl backdrop-blur-md">
          <img
            src="/logo-rect.webp"
            alt="One World Solutions"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>
        
        {/* Brand Blue Custom Conic Loader */}
        <div className="custom-brand-loader my-1"></div>

        <p className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest">
          Loading One World Portal...
        </p>
      </div>
    </div>
  );
}
