import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  FileCheck,
  HelpCircle,
  Layers,
  Lock,
  MessageCircle,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { UniversalServiceIntakeForm } from "@/components/site/UniversalServiceIntakeForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { EngagementModels } from "@/components/web-dev/EngagementModels";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/whatsapp-automation-tool")({
  head: () => ({
    meta: [
      { title: "WhatsApp Automation Tool | Enterprise AI Workflow & CRM Integration — One World Solutions" },
      {
        name: "description",
        content:
          "Enterprise WhatsApp Workflow Automation & AI Agents. Automate lead qualification, ticket routing, payment links, and CRM sync from a single conversation.",
      },
      {
        name: "keywords",
        content:
          "whatsapp automation tool, whatsapp workflow automation, AI whatsapp agents, whatsapp CRM integration, enterprise whatsapp automation, whatsapp sales bot",
      },
      { property: "og:title", content: "WhatsApp Automation Tool | Intelligent AI Workflow Engine" },
      {
        property: "og:description",
        content:
          "WhatsApp is no longer just a chat channel. Transform it into your primary workflow interface for CRM sync, lead qualification, and instant deal closing.",
      },
    ],
  }),
  component: WhatsAppAutomationPage,
});

const DEMO_CHAT_MESSAGES = [
  { role: "ai", text: "Hello! I'm your AI assistant. How can I assist you today?" },
  { role: "user", text: "What are your pricing plans?" },
  { role: "ai", text: "We offer Starter at $29/mo, Growth at $79/mo, and Enterprise plans. Which fits your needs?" },
  { role: "user", text: "Tell me more about Growth." },
  { role: "ai", text: "Growth includes unlimited agents, CRM integration, and priority support for up to 10k interactions/month." },
];

const USE_CASE_CATEGORIES = [
  {
    category: "SALES & REVENUE OPERATIONS",
    items: [
      {
        title: "Lead Qualification & Routing",
        desc: "Capture inbound WhatsApp leads, qualify using AI, and automatically route them to the right sales rep in CRM.",
      },
      {
        title: "Deal Updates & Follow-Ups",
        desc: "Send real-time deal updates, automate follow-ups, and sync conversations with opportunity records.",
      },
      {
        title: "Quote & Proposal Sharing",
        desc: "Deliver quotes and proposals securely and trigger approval workflows directly from WhatsApp.",
      },
    ],
  },
  {
    category: "CUSTOMER SUPPORT & SERVICE",
    items: [
      {
        title: "Ticket Creation & Case Management",
        desc: "Create support cases directly from WhatsApp and sync conversation context with Service Cloud or ticketing platforms.",
      },
      {
        title: "First-Level Support Automation",
        desc: "Handle FAQs and common issues with AI before escalating to human agents — reducing ticket volume significantly.",
      },
      {
        title: "Case Status & Resolution Updates",
        desc: "Provide real-time case status and resolution confirmations directly through WhatsApp.",
      },
    ],
  },
  {
    category: "OPERATIONS & FIELD SERVICE",
    items: [
      {
        title: "Appointment Scheduling & Dispatch",
        desc: "Book, confirm, and reschedule service appointments via WhatsApp and sync with field service systems.",
      },
      {
        title: "Technician Updates & Proof of Service",
        desc: "Collect job photos, signatures, and completion updates that sync to backend systems automatically.",
      },
    ],
  },
  {
    category: "FINANCE & PROCUREMENT",
    items: [
      {
        title: "Invoice & Payment Communication",
        desc: "Send invoices, payment links, and reminders through WhatsApp with system-backed status updates.",
      },
      {
        title: "Approval Workflows",
        desc: "Enable managers to approve or reject requests directly from WhatsApp, triggering backend actions instantly.",
      },
    ],
  },
  {
    category: "SUPPLY CHAIN & PARTNER COMMUNICATION",
    items: [
      {
        title: "Order & Shipment Updates",
        desc: "Share order confirmations, shipment tracking, and exception alerts with partners and customers.",
      },
      {
        title: "Vendor Coordination",
        desc: "Confirm POs, delivery schedules, and handle exceptions with suppliers directly via WhatsApp.",
      },
    ],
  },
];

const VALUE_PROPOSITIONS = [
  {
    title: "Intelligent Intent Understanding",
    desc: "AI interprets user intent beyond simple keywords, enabling natural conversations tied to real business processes.",
  },
  {
    title: "Real-Time System Integration",
    desc: "Secure API connections to CRM, ERP, FSM, finance, and custom systems to read and write business data.",
  },
  {
    title: "Automated Workflow Execution",
    desc: "Trigger actions such as case creation, order updates, approvals, scheduling, and data updates.",
  },
  {
    title: "Closed-Loop Responses",
    desc: "Users receive confirmations, statuses, and next steps directly in WhatsApp, keeping everything in one channel.",
  },
  {
    title: "Enterprise-Grade Security & Control",
    desc: "Webhook validation, role-based access, audit trails, and governance built into every workflow.",
  },
];

const SMARTER_OPERATIONS = [
  {
    title: "24/7 Customer Support on WhatsApp",
    desc: "Provide instant customer assistance and automated WhatsApp support workflows that keep conversations active around the clock.",
  },
  {
    title: "Faster Business Process Automation",
    desc: "Improve response times and streamline daily operations with WhatsApp workflow automation integrated across your business systems.",
  },
  {
    title: "Scalable WhatsApp Automation Solutions",
    desc: "Manage high-volume customer interactions, notifications, and service requests with reliable and scalable WhatsApp automation.",
  },
  {
    title: "Seamless CRM & System Integration",
    desc: "Connect WhatsApp with CRM, ERP, helpdesk, and backend platforms to automate workflows and improve operational efficiency.",
  },
];

const IMPLEMENTATION_STEPS = [
  { num: "01", title: "Use Case & Workflow Discovery" },
  { num: "02", title: "Conversational Flow & AI Design" },
  { num: "03", title: "API & Backend System Integration" },
  { num: "04", title: "Security, Validation & Governance Setup" },
  { num: "05", title: "Testing, UAT & Performance Tuning" },
  { num: "06", title: "Go-Live & Monitoring" },
  { num: "07", title: "Ongoing Optimization & Support" },
];

const WHY_US_FEATURES = [
  "Deep experience in enterprise system integration — connect WhatsApp with CRMs, ERPs, support platforms, and internal tools without disrupting existing operations.",
  "AI-driven intent detection and workflow automation — automatically route conversations, trigger actions, and streamline customer interactions with minimal manual effort.",
  "Secure webhook orchestration and validation — ensure reliable data exchange with protected endpoints, request verification, and controlled access across systems.",
  "Custom business logic tailored to your processes — build workflows around your approval cycles, customer journeys, and operational requirements instead of generic templates.",
  "Scalable architecture for high message volumes — handle growing customer conversations and peak traffic efficiently with stable and responsive infrastructure.",
  "Governance, auditability, and compliance-ready design — maintain visibility, tracking, and structured controls to support security standards and business compliance requirements.",
];

const INTEGRATION_TOOLS = ["CRM", "ERP", "HelpDesk", "FieldService", "Notion", "Gmail", "Stripe", "Jira"];

const FAQS = [
  {
    q: "01. What is WhatsApp workflow automation?",
    a: "WhatsApp workflow automation lets businesses send, receive, and manage messages automatically based on triggers like purchases, leads, or support requests — without manual effort.",
  },
  {
    q: "02. Can your AI Agents integrate with my existing tools?",
    a: "Yes. Our AI Agents integrate seamlessly with CRMs (Salesforce, HubSpot), ERPs (SAP, NetSuite), HelpDesks (Zendesk, Freshdesk), payment gateways (Stripe), and custom databases.",
  },
  {
    q: "03. Is any coding required to use your platform?",
    a: "No coding is required for your team. We handle the complete end-to-end API setup, conversational flow design, and system integration for your business.",
  },
  {
    q: "04. Are the AI Agents secure and compliant?",
    a: "Yes. All workflows implement enterprise-grade webhook validation, encrypted payload storage, role-based access control, and full compliance with Meta WhatsApp Business API guidelines.",
  },
];

function WhatsAppAutomationPage() {
  const [tab, setTab] = useState<"b2b" | "b2c">("b2b");
  const [interactiveMessages, setInteractiveMessages] = useState(DEMO_CHAT_MESSAGES);
  const [inputVal, setInputVal] = useState("");

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setInputVal("");

    setInteractiveMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      {
        role: "ai",
        text: `Thank you for your interest! Our team will configure custom WhatsApp AI workflows for your request: "${userMsg}". Book a strategy call or submit an intake below to get started.`,
      },
    ]);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-700">
          <MessageCircle className="h-4 w-4 fill-blue-600 text-white" />
          ENTERPRISE WHATSAPP AUTOMATION SOFTWARE
        </div>

        <h1 className="text-4xl font-black sm:text-6xl text-slate-900 tracking-tight leading-none">
          WhatsApp Automation Tool —{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
            AI Workflows &amp; Instant CRM Sync
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
          WhatsApp is no longer just a chat channel. With AI and smart integrations, it becomes your primary interface for triggering workflows, closing deals, and completing transactions from one conversation.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#intake-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-transform active:scale-95"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-transform active:scale-95"
          >
            Book Strategy Call ↗
          </Link>
        </div>
      </section>

      {/* 1.5 Partnership & Flexible Engagement Models */}
      <section className="pt-4">
        <EngagementModels />
      </section>

      {/* 2. AI Chat Interactive Demo Section */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1 font-mono text-xs uppercase">
            AI CHAT DEMO
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-white">Driving Innovation Through Intelligent AI-Powered Solutions</h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Experience the power of AI-driven conversations that understand context, resolve issues instantly, and adapt to customer needs in real-time.
          </p>

          <div className="flex justify-center items-center gap-6 pt-2 text-xs font-bold text-blue-400">
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-blue-400" /> Real-time chat</span>
            <span className="flex items-center gap-1.5"><Bot className="h-4 w-4 text-blue-400" /> Human-like flow</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-blue-400" /> Analytics</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-4 shadow-inner">
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {interactiveMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="h-7 w-7 rounded-full bg-blue-600 text-white grid place-items-center shrink-0 font-bold text-xs">
                    AI
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm max-w-[85%] ${
                    msg.role === "user" ? "bg-blue-600 text-white font-medium" : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="h-7 w-7 rounded-full bg-slate-700 text-white grid place-items-center shrink-0 font-bold text-xs">
                    U
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleDemoSubmit} className="flex gap-2 pt-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* 3. Use Cases Section */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1">
            USE CASES
          </Badge>
          <h2 className="text-3xl font-black sm:text-5xl text-slate-900 tracking-tight">
            WhatsApp Automation for Every Business
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            From lead qualification to invoice delivery — explore what's possible when WhatsApp meets AI automation.
          </p>

          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 pt-1 mt-3">
            <button
              type="button"
              onClick={() => setTab("b2b")}
              className={`px-5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                tab === "b2b" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              B2B Use Cases
            </button>
            <button
              type="button"
              onClick={() => setTab("b2c")}
              className={`px-5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                tab === "b2c" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              B2C Use Cases
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {USE_CASE_CATEGORIES.map((cat) => (
            <div key={cat.category} className="space-y-4">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-xl inline-block">
                {cat.category}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-2 group"
                  >
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8 border border-slate-800 shadow-xl">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1 font-mono text-xs uppercase">
            WHY CHOOSE US
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-white">What This Enables for Your Business</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPOSITIONS.map((vp, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 hover:border-blue-400 transition-colors">
              <div className="h-8 w-8 rounded-lg bg-blue-600/20 text-blue-400 grid place-items-center font-mono font-bold text-xs mb-3">
                0{idx + 1}
              </div>
              <h4 className="text-base font-bold text-white">{vp.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{vp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Smarter Business Operations */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1">
            SMARTER BUSINESS OPERATIONS
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">
            Intelligent WhatsApp Workflow Automation for Modern Businesses
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SMARTER_OPERATIONS.map((op) => (
            <div key={op.title} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-extrabold text-slate-900">{op.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{op.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Process Roadmap */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1">
            PROCESS
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">How We Deliver Solutions</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Our implementation process ensures secure integration, efficient workflows, and seamless communication across your business systems.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {IMPLEMENTATION_STEPS.map((step) => (
            <div key={step.num} className="p-4 rounded-2xl bg-white border border-slate-200/90 text-center space-y-2 shadow-2xs hover:border-blue-400 transition-colors">
              <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                {step.num}
              </span>
              <p className="text-xs font-extrabold text-slate-900 leading-snug">{step.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Why W2S Solutions Enterprise Features */}
      <section className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 space-y-8 border border-slate-800 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1 font-mono text-xs uppercase">
            WHY W2S SOLUTIONS &amp; ONE WORLD
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-white">Built for Enterprise-Grade WhatsApp Automation</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            We don’t just connect WhatsApp. We engineer enterprise-grade, AI-driven workflows behind every conversation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_US_FEATURES.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium">
              <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Integration Tools */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1">
            OUR INTEGRATION TOOLS
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">Smarter Conversations. Connected Workflows.</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Streamline customer interactions and business operations with WhatsApp-powered automation that connects seamlessly with your existing systems and workflows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {INTEGRATION_TOOLS.map((tool) => (
            <div key={tool} className="px-5 py-3 rounded-2xl bg-white border border-slate-200/90 text-slate-900 font-extrabold text-xs shadow-xs hover:border-blue-400 transition-colors">
              {tool}
            </div>
          ))}
        </div>

        <div className="pt-2">
          <a
            href="#intake-form"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
          >
            Connect Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 9. FAQs */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3 py-1">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Everything You Want to Know Explained Clearly</h2>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-b border-slate-100 last:border-none pb-3">
                <AccordionTrigger className="text-left font-extrabold text-slate-900 hover:text-blue-600 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. Intake Form */}
      <section id="intake-form" className="scroll-mt-24">
        <UniversalServiceIntakeForm category="web-development" />
      </section>

      <TrustBanner />
    </main>
  );
}
