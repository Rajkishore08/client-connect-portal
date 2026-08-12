import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChatMessage } from "@/lib/backend-stubs";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const PILLAR_QUICK_REPLIES = {
  web: [
    "Build a Custom Web App / SaaS",
    "AI Agents & RAG Engine Scoping",
    "Tech Stack & Development Cost",
    "UI/UX Redesign & MVP Launch",
  ],
  marketing: [
    "Request Free Technical SEO Audit",
    "High-ROI Google & Meta PPC Ads",
    "Conversion Rate Optimization (CRO)",
    "Monthly ROI & Lead Analytics",
  ],
  passport: [
    "24-Hour Emergency Rush Intake",
    "Expedited Passport Renewal Checklist",
    "OCI Application Requirements",
    "Track Active Filing Status",
  ],
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hello! I am the One World Solutions AI Concierge. Select a division below (Web Development, Digital Marketing, or Passport Services) or ask any question for an instant in-depth technical analysis.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<"web" | "marketing" | "passport">("web");
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const history = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const reply = await sendChatMessage(trimmed, history);
    setTyping(false);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", text: reply }]);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Chat Trigger — Positioned cleanly on bottom-right to prevent mobile metric card overlap */}
      <div
        className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] ${
          open ? "opacity-0 pointer-events-none scale-75 translate-y-4" : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        }`}
      >
        {/* Top Speech Bubble Callout — Desktop Only (hidden on small mobile to avoid metric card overlap) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden sm:flex relative items-center gap-2.5 rounded-2xl border border-slate-800 bg-slate-950/95 px-3.5 py-2 text-left shadow-2xl hover:bg-slate-900 transition-all hover:scale-[1.02] cursor-pointer group backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="leading-tight">
            <p className="font-bold text-xs text-white">How can One World AI</p>
            <p className="text-[10px] text-blue-300 font-medium flex items-center gap-1">
              assist you today? <Sparkles className="h-3 w-3 text-blue-400 inline shrink-0" />
            </p>
          </div>
          <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-r border-b border-slate-800 bg-slate-950/95" />
        </button>

        {/* Compact Circle Button with Official Company Logo Symbol */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open One World AI Assistant"
          className="group relative flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full bg-white p-2 sm:p-2.5 border-2 border-primary shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <img
            src="/logo-symbol.webp"
            alt="One World AI"
            className="h-full w-full object-contain transition-transform group-hover:scale-110"
          />
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      </div>

      {/* Solid Opaque Chat Screen Dialog */}
      <div
        className={`fixed z-50 flex flex-col bg-white overflow-hidden text-slate-900 font-sans transition-all duration-550 ease-[cubic-bezier(0.34,1.25,0.64,1)] origin-bottom-right ${
          open
            ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[580px] sm:max-h-[85vh] sm:w-[390px] sm:rounded-3xl border border-slate-200 shadow-2xl scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "bottom-6 right-6 h-[580px] w-[390px] rounded-3xl border border-slate-200 shadow-2xl scale-0 opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 rounded-2xl bg-primary-soft p-1.5 border border-primary/20 grid place-items-center">
              <img src="/logo-symbol.webp" alt="One World AI" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">One World Solutions AI</p>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Online • Instant Reply
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Minimize chat"
            onClick={() => setOpen(false)}
            className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X className="h-4.5 w-4.5" />
          </Button>
        </div>

        {/* Messages Body */}
        <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto bg-slate-50/80 px-4 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-white font-medium shadow-xs"
                    : "bg-white text-slate-800 font-normal border border-slate-200/90 shadow-2xs"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-xs text-slate-500 italic shadow-2xs flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary animate-spin" />
                One World AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions & Input Bar */}
        <div className="space-y-3 border-t border-slate-100 bg-white p-3.5">
          <a
            href="https://wa.me/14175690711"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-sm group"
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp Business</span>
            </span>
            <span className="text-[10px] bg-emerald-800/60 px-2 py-0.5 rounded-md font-mono">+1 (417) 569-0711</span>
          </a>

          {/* Division Selector Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-100 pb-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActivePillar("web")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activePillar === "web"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🌐 Web Dev &amp; AI
            </button>
            <button
              type="button"
              onClick={() => setActivePillar("marketing")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activePillar === "marketing"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              📈 Marketing &amp; SEO
            </button>
            <button
              type="button"
              onClick={() => setActivePillar("passport")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activePillar === "passport"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🛂 Passport &amp; Visa
            </button>
          </div>

          {/* Dynamic Quick Prompt Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {PILLAR_QUICK_REPLIES[activePillar].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about passport, web dev, or marketing..."
              className="h-10 text-xs rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-primary"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || typing} className="h-10 w-10 shrink-0 rounded-xl font-bold bg-primary text-white hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
