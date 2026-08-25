import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function PageLoader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPending = useRouterState({ select: (s) => s.status === "pending" || s.isLoading });

  const [active, setActive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setActive(true);
    setFadeOut(false);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setActive(false);
      }, 150);
    }, 280);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!active && !isPending) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-2xl text-slate-900 transition-opacity duration-200 ${
        fadeOut && !isPending ? "opacity-0 pointer-events-none" : "opacity-100"
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
