import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function PageLoader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPending = useRouterState({ select: (s) => s.status === "pending" || s.isLoading });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPending) {
      setVisible(true);
    } else {
      timer = setTimeout(() => {
        setVisible(false);
      }, 120);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPending, pathname]);

  if (!visible && !isPending) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/85 backdrop-blur-xl text-slate-900 transition-opacity duration-150 pointer-events-none ${
        isPending ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-6 max-w-sm animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3.5 rounded-3xl border border-white/90 bg-white/90 shadow-2xl backdrop-blur-md">
          <img
            src="/logo-rect.webp"
            alt="One World Solutions"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </div>

        {/* Brand Blue Custom Conic Loader */}
        <div className="custom-brand-loader my-1"></div>

        <p className="text-[11px] font-mono font-extrabold text-blue-600 uppercase tracking-widest">
          Loading Page...
        </p>
      </div>
    </div>
  );
}
