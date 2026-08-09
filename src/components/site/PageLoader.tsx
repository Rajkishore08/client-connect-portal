import { useEffect, useState } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth 3-second timer progress (3000ms total)
    const startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFBFD]/98 text-slate-900 transition-opacity duration-500 backdrop-blur-2xl ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Light Radial Background Glow Orbs */}
      <div className="absolute h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-500/12 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute h-[350px] w-[350px] rounded-full bg-red-500/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6 max-w-sm">
        {/* Light Glass Panel Card with Square Logo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-blue-500/15 blur-xl animate-ping" style={{ animationDuration: "3s" }} />
          <div className="glass-panel p-6 rounded-3xl border border-white/90 bg-white/85 shadow-glass">
            <img
              src="/logo-square.webp"
              alt="One World Solutions"
              className="h-28 sm:h-36 w-auto object-contain transition-transform duration-300"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-1">
          <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest">
            ONE WORLD SOLUTIONS
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Travel Confidently • Build Digitally • Grow Globally
          </p>
        </div>

        {/* 3-Second Smooth Light Progress Bar */}
        <div className="w-64 space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden p-0.5 border border-white/90 shadow-2xs">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-primary to-accent transition-all duration-75 ease-out shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span className="font-semibold text-slate-700">Loading Client Portal...</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
