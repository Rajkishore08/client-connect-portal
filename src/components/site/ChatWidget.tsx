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

const QUICK_REPLIES = [
  "Track my application",
  "I lost my passport",
  "Book a consultation",
  "What are the fees?",
];

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hi! I'm the One World Solutions AI assistant. I can help with document checklists, application tracking, custom software intake, or booking a consultation. How can I assist you today?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
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
      {/* Sleek Floating Chat Trigger Badge (Vertical Stack with Top Callout Bubble) */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] ${
          open ? "opacity-0 pointer-events-none scale-75 translate-y-4" : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        }`}
      >
        {/* Top 2-Line Crisp Speech Bubble Callout */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex items-center gap-2.5 rounded-2xl border border-slate-800 bg-slate-950/95 px-3.5 py-2 text-left shadow-2xl hover:bg-slate-900 transition-all hover:scale-[1.02] cursor-pointer group backdrop-blur-md"
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
          {/* Speech Bubble Tail Pointing Down to Circle Button */}
          <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-r border-b border-slate-800 bg-slate-950/95" />
        </button>

        {/* Simple Circle Button with Official Company Logo Symbol */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open One World AI Assistant"
          className="group relative flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white p-2.5 border-2 border-primary shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <img
            src="/logo-symbol.webp"
            alt="One World AI"
            className="h-full w-full object-contain transition-transform group-hover:scale-110"
          />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      </div>

      {/* Solid Opaque Chat Screen Dialog with Ultra-Smooth Spring Motion */}
      <div
        className={`fixed z-50 flex flex-col bg-white overflow-hidden text-slate-900 font-sans transition-all duration-550 ease-[cubic-bezier(0.34,1.25,0.64,1)] origin-bottom-right ${
          open
            ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[580px] sm:max-h-[85vh] sm:w-[390px] sm:rounded-3xl border border-slate-200 shadow-2xl scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "bottom-6 right-6 h-[580px] w-[390px] rounded-3xl border border-slate-200 shadow-2xl scale-0 opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        {/* Solid Header */}
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

        {/* Solid Opaque Messages Body (Zero Text Leakage) */}
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
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-primary/50 hover:bg-primary-soft hover:text-primary transition-all"
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
