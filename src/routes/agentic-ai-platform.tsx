import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Brain,
  Building,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  FileCheck,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  MessageSquare,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { TrustBanner } from "@/components/site/SiteFooter";
import { UniversalServiceIntakeForm } from "@/components/site/UniversalServiceIntakeForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { EngagementModels } from "@/components/web-dev/EngagementModels";

export const Route = createFileRoute("/agentic-ai-platform")({
  head: () => ({
    meta: [
      { title: "Agentic AI Platform | Build & Deploy Autonomous AI Agents — One World Solutions" },
      {
        name: "description",
        content:
          "Deploy autonomous AI agents that plan, reason, execute multi-step workflows, and deliver measurable results. Model-agnostic, SOC 2 certified, live in 60 minutes.",
      },
      {
        name: "keywords",
        content:
          "agentic ai platform, autonomous ai agents, multi agent orchestration, enterprise ai platform, ai model builder, ai workflow automation",
      },
      { property: "og:title", content: "Agentic AI Platform | Autonomous AI Agents for Enterprise" },
      {
        property: "og:description",
        content:
          "Deploy autonomous AI agents that plan, reason, execute multi-step workflows, and deliver measurable business outcomes.",
      },
    ],
  }),
  component: AgenticAIPlatformPage,
});

const LIVE_AGENTS_WORKSPACE = [
  { name: "Research Agent", action: "Scanning 320 competitor pages...", progress: 100, status: "Done", icon: Sparkles },
  { name: "Data Pipeline Agent", action: "Processed 24,810 rows · 2.8s avg", progress: 100, status: "Done", icon: Database },
  { name: "Report Generation Agent", action: "Drafting Q3 executive summary", progress: 100, status: "Done", icon: FileCheck },
  { name: "Compliance Audit Agent", action: "Scheduled · 14:30 IST today", progress: 100, status: "Done", icon: ShieldCheck },
];

const AGENTIC_VS_TRADITIONAL = [
  { dimension: "Mode", traditional: "Reactive", agentic: "Proactive & autonomous" },
  { dimension: "Task Scope", traditional: "Single-step only", agentic: "Multi-step workflows" },
  { dimension: "Human Input", traditional: "Every response", agentic: "Goal-setting only" },
  { dimension: "Tool Usage", traditional: "None", agentic: "APIs, DBs, apps, web" },
  { dimension: "Self-Correction", traditional: "None", agentic: "Real-time adaptation" },
  { dimension: "Deployment", traditional: "Months of ML work", agentic: "No-code · 60 minutes" },
  { dimension: "Security", traditional: "Varies", agentic: "SOC 2 · AES-256 · RBAC" },
];

const FOUR_STEP_WORKFLOW = [
  { step: "1", title: "CONNECT", sub: "Link Your Data Sources", desc: "Connect databases, documents, SharePoint, ERP systems, and APIs. Ingest and unify your data instantly." },
  { step: "2", title: "DEFINE", sub: "Set Your Goal", desc: "Describe what you need in plain language. Set permissions, output format, guardrails, and model choice using the no-code builder." },
  { step: "3", title: "EXECUTE", sub: "Agent Plans & Acts", desc: "Your agent breaks the goal into tasks, selects tools, executes autonomously, and self-corrects in real time with full audit logging." },
  { step: "4", title: "DELIVER", sub: "Results Where You Need", desc: "Outputs land in Slack, dashboards, email, databases, or any connected system, solving real business problems." },
];

const ADMIN_HUB_FEATURES = [
  { title: "No-code Agent Builder", desc: "Drag, drop, and describe — build AI agents without coding on a powerful agentic AI platform." },
  { title: "Role-Based Access Control", desc: "Granular permissions ensure secure access with agentic AI for secure enterprise workflows." },
  { title: "Full Audit Logging", desc: "Every agent decision, action, and output is logged — complete enterprise accountability." },
  { title: "Multi-Agent Orchestration", desc: "Deploy fleets of specialised agents using advanced AI agent orchestration across workflows." },
];

const CHAT_HUB_FEATURES = [
  { title: "Persistent Memory", desc: "Agents remember past conversations and context, getting smarter with every interaction." },
  { title: "Multi-turn Reasoning", desc: "Follow-up questions refine and deepen agent responses — like a conversation with an expert analyst." },
  { title: "File & Data Aware", desc: "Upload documents, paste data, or reference any connected system — agents work with real inputs." },
  { title: "Multilingual Support", desc: "Agents communicate in the language your team works in — supporting global enterprise teams." },
];

const ENTERPRISE_SECURITY = [
  { title: "AES-256 Encryption", desc: "All data encrypted at rest and in transit. Your enterprise data never leaves your control." },
  { title: "Role-Based Access Control", desc: "Granular RBAC ensures every team member, agent, and integration operates within precisely defined permissions." },
  { title: "Full Audit Logging", desc: "Every agent decision, data access, and action is logged with timestamps and actor identity." },
  { title: "Private Deployment", desc: "Deploy entirely within your own infrastructure — on-premise or dedicated cloud with zero external data exposure." },
  { title: "NVIDIA NeMo Guardrails", desc: "Industry-leading LLM guardrails prevent hallucinations, restrict out-of-scope behaviour, and enforce quality." },
  { title: "GDPR & ISO 27001", desc: "Fully GDPR compliant and ISO 27001 aligned — trusted across financial services, healthcare, and government." },
];

const TARGET_ROLES = [
  { role: "LEADERSHIP", title: "Decision Makers", desc: "Real-time intelligence for faster, higher-conviction decisions without waiting on analyst reports." },
  { role: "OPERATIONS", title: "Operations Heads", desc: "Automate complex multi-step operational workflows and eliminate manual coordination bottlenecks." },
  { role: "SUPPLY CHAIN", title: "Procurement Teams", desc: "AI agents that monitor supplier performance, flag risks, and surface opportunities across your supply chain." },
  { role: "PRODUCTION", title: "Factory Heads", desc: "Autonomous agents that diagnose equipment issues, optimise scheduling, and reduce downtime proactively." },
  { role: "COMPLIANCE", title: "Safety & Compliance", desc: "Automated audit agents that continuously monitor regulatory compliance and generate documentation instantly." },
  { role: "REVENUE", title: "Sales & Marketing", desc: "AI agents that research prospects, personalise outreach, analyse campaigns, and surface pipeline insights." },
  { role: "MANAGEMENT", title: "Middle Managers", desc: "Agents that summarise team performance, surface blockers, and prepare briefings automatically every morning." },
  { role: "FRONTLINE", title: "Workforce Teams", desc: "Intelligent assistants that answer operational questions, surface SOPs, and guide daily tasks in real time." },
];

const METRICS = [
  { val: "18hrs", label: "Saved per week using our agentic AI platform. Agents handle grunt work, people handle strategy." },
  { val: "3×", label: "Faster decisions enterprise-wide. From weeks to hours, across every business function." },
  { val: "60%", label: "Lower reporting costs on average. Agents replace manual data extraction and report assembly." },
  { val: "94%", label: "Customer satisfaction score across all agentic AI deployments globally." },
];

const PLATFORM_COMPARISON = [
  { feature: "No-code Agent Builder", other: "Developer-only or limited", meii: "Full no-code · Any user" },
  { feature: "Multi-Agent Orchestration", other: "Single agent only", meii: "Unlimited parallel agents" },
  { feature: "Private Deployment", other: "Cloud-only", meii: "On-premise or dedicated cloud" },
  { feature: "Persistent Agent Memory", other: "Session-only", meii: "Long-term cross-session memory" },
  { feature: "Model Flexibility", other: "Locked to one model", meii: "7+ models · Switch anytime (GPT-4, Llama, Gemma, DeepSeek)" },
  { feature: "Enterprise Security", other: "Basic", meii: "SOC 2 · RBAC · AES-256 · Audit logs" },
  { feature: "Deployment Time", other: "Weeks to months", meii: "Under 60 minutes" },
  { feature: "Free Tier Available", other: "Rarely", meii: "Yes · 3 agents · No card needed" },
];

const FAQS = [
  { q: "What is agentic AI?", a: "Agentic AI refers to artificial intelligence systems that autonomously plan, reason, make decisions, and execute multi-step tasks to achieve goals without requiring human approval at every single step." },
  { q: "How is our Agentic AI Platform different from other AI agent platforms?", a: "Unlike static chatbots or rigid prompt templates, our Agentic AI Platform features multi-agent orchestration, persistent cross-session memory, 7+ LLM choices, and full private on-premise deployment." },
  { q: "Can I build AI agents without coding?", a: "Yes! Our platform is 100% no-code. You can drag, drop, describe goals in natural language, and connect data sources in under 60 minutes." },
  { q: "What is multi-agent orchestration?", a: "Multi-agent orchestration allows specialized AI agents (e.g. Research, Data Processing, Compliance, Reporting) to work in parallel or sequence to solve complex enterprise workflows." },
  { q: "Does the platform support private / on-premise deployment?", a: "Yes. You can deploy the platform entirely inside your own private cloud or on-premise infrastructure so sensitive enterprise data never leaves your environment." },
];

function AgenticAIPlatformPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-16 sm:space-y-24">
      {/* 1. Hero Header */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-700">
          <Cpu className="h-4 w-4 text-blue-600" />
          AGENTIC AI PLATFORM — BUILD &amp; DEPLOY AUTONOMOUS AGENTS
        </div>

        <h1 className="text-4xl font-black sm:text-6xl text-slate-900 tracking-tight leading-none">
          Build &amp; Deploy Autonomous AI Agents —{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
            Live in 60 Minutes
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
          Deploy autonomous AI agents that plan, reason, execute multi-step workflows, and deliver measurable results. A powerful Agentic AI Platform built for real-world scale. No code. No ML team required.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#intake-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-transform active:scale-95"
          >
            Start For Free — No Credit Card <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-transform active:scale-95"
          >
            Book Strategy Call ↗
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
            <p className="text-xl font-black text-blue-600">60 min</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase">To First Live Agent</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
            <p className="text-xl font-black text-slate-900">100+</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Enterprise Teams</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
            <p className="text-xl font-black text-blue-600">SOC 2</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Certified Security</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center">
            <p className="text-xl font-black text-slate-900">99.9%</p>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Uptime SLA</p>
          </div>
        </div>
      </section>

      {/* 1.5 Flexible Partnership Engagement Models */}
      <section className="pt-4">
        <EngagementModels />
      </section>

      {/* 2. Interactive Workspace Simulator */}
      <section className="rounded-3xl border border-slate-200 bg-slate-950 text-white p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-mono font-bold text-slate-300">AGENTIC WORKSPACE — 4 AGENTS LIVE</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full border border-blue-700">
            MODEL-AGNOSTIC · NO LOCK-IN
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIVE_AGENTS_WORKSPACE.map((ag) => {
            const Icon = ag.icon;
            return (
              <div key={ag.name} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    ✓ {ag.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{ag.name}</h4>
                <p className="text-[11px] text-slate-400">{ag.action}</p>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${ag.progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-mono text-slate-400">
          <span>Supported LLMs:</span>
          {["GPT-4", "DeepSeek", "Google Gemma", "Meta Llama", "Mistral AI", "NVIDIA NIM", "Qwen"].map((m) => (
            <span key={m} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* 3. What is Agentic AI & At a Glance Comparison Table */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-blue-600 border-blue-300 px-3.5 py-1">
            WHAT IS AGENTIC AI?
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">
            Autonomous Planning, Reasoning &amp; Execution
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Agentic AI refers to artificial intelligence systems that autonomously plan, reason, make decisions, and execute multi-step tasks to achieve goals without requiring human approval at every single step. Unlike traditional AI assistants, this platform formulates plans, selects tools, executes workflows, and self-corrects in real time.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-x-auto">
          <h3 className="text-base font-extrabold text-slate-900 mb-4">Agentic AI vs. Traditional AI — At a Glance</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-extrabold text-slate-700">DIMENSION</th>
                <th className="p-3 font-extrabold text-slate-500">TRADITIONAL AI</th>
                <th className="p-3 font-black text-indigo-600 bg-indigo-50/50">✦ AGENTIC AI PLATFORM</th>
              </tr>
            </thead>
            <tbody>
              {AGENTIC_VS_TRADITIONAL.map((row) => (
                <tr key={row.dimension} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-900">{row.dimension}</td>
                  <td className="p-3 text-slate-500">{row.traditional}</td>
                  <td className="p-3 font-extrabold text-indigo-700 bg-indigo-50/20">{row.agentic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. How It Works — 4-Step Process */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-indigo-600 border-indigo-300 px-3.5 py-1">
            HOW IT WORKS
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">From Goal to Live Agent in Four Steps</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            No ML expertise needed. Deploy, test, and run your first AI agent in production in under one hour.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOUR_STEP_WORKFLOW.map((s) => (
            <div key={s.step} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-indigo-500 transition-colors">
              <span className="h-10 w-10 rounded-2xl bg-indigo-600 text-white grid place-items-center font-black font-mono text-sm">
                {s.step}
              </span>
              <p className="text-[10px] font-mono font-bold text-indigo-600 uppercase">{s.title}</p>
              <h4 className="text-base font-black text-slate-900">{s.sub}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Platform Capabilities: Admin Hub & Chat Hub */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Admin Hub */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 border border-slate-800 shadow-xl">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-extrabold uppercase text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800 inline-block">
              🗂️ ADMIN HUB
            </span>
            <h3 className="text-2xl font-black text-white">Build, Deploy &amp; Govern Agents — No Code</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Command centre for the entire agentic lifecycle. Configure agents, manage knowledge bases, set guardrails, and monitor every action.
            </p>
          </div>

          <div className="space-y-4">
            {ADMIN_HUB_FEATURES.map((f) => (
              <div key={f.title} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" /> {f.title}
                </h4>
                <p className="text-[11px] text-slate-300 pl-6">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Hub */}
        <div className="p-8 rounded-3xl bg-white text-slate-900 space-y-6 border border-slate-200 shadow-xl">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-extrabold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 inline-block">
              💬 CHAT HUB
            </span>
            <h3 className="text-2xl font-black text-slate-900">Talk to Your Agents in Plain English</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conversational interface to all agents. Ask questions, delegate tasks, review outputs, and guide agent behavior through natural conversation.
            </p>
          </div>

          <div className="space-y-4">
            {CHAT_HUB_FEATURES.map((f) => (
              <div key={f.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" /> {f.title}
                </h4>
                <p className="text-[11px] text-slate-600 pl-6">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Enterprise Security */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8 border border-slate-800 shadow-xl">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-3 py-1 font-mono text-xs uppercase">
            ENTERPRISE SECURITY
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-white">Enterprise-Grade AI Governance Built-In Day One</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ENTERPRISE_SECURITY.map((sec) => (
            <div key={sec.title} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-400" /> {sec.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 pt-4 text-xs font-extrabold text-indigo-300">
          <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">SOC 2 Type II</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">ISO 27001</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">GDPR Compliant</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">AES-256 Encrypted</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700">Private Deployment</span>
        </div>
      </section>

      {/* 7. Who It's Built For */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-indigo-600 border-indigo-300 px-3.5 py-1">
            WHO IT'S BUILT FOR
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">Every Role. One Platform.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TARGET_ROLES.map((r) => (
            <div key={r.role} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs hover:border-indigo-500 transition-colors">
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {r.role}
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">{r.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {METRICS.map((m) => (
            <div key={m.val} className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200 text-center space-y-1">
              <p className="text-3xl font-black text-indigo-600">{m.val}</p>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Platform Comparison Table */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-bold text-indigo-600 border-indigo-300 px-3.5 py-1">
            PLATFORM COMPARISON
          </Badge>
          <h2 className="text-3xl font-black sm:text-4xl text-slate-900">How Our Platform Compares</h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-extrabold text-slate-700">CAPABILITY</th>
                <th className="p-3 font-extrabold text-slate-500">OTHER AI PLATFORMS</th>
                <th className="p-3 font-black text-indigo-600 bg-indigo-50/50">✦ AGENTIC AI PLATFORM</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_COMPARISON.map((comp) => (
                <tr key={comp.feature} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-900">{comp.feature}</td>
                  <td className="p-3 text-slate-500">{comp.other}</td>
                  <td className="p-3 font-extrabold text-indigo-700 bg-indigo-50/20">{comp.meii}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. FAQs */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-xs font-bold text-indigo-600 border-indigo-300 px-3 py-1">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Everything You Need to Know About Agentic AI</h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-b border-slate-100 last:border-none pb-3">
                <AccordionTrigger className="text-left font-extrabold text-slate-900 hover:text-indigo-600 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0" />
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
