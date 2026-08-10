import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const FAQS = [
  {
    q: "How fast can you process an urgent Indian passport renewal?",
    a: "With our 24-Hour Emergency Rush intake, your application is double-verified by our specialists on the same day and submitted via emergency hand-carry channels to avoid standard 5–7 week government delays.",
    pillar: "Passport & Visa",
  },
  {
    q: "Do I get full source code ownership for custom web & software development?",
    a: "Yes, 100%! Upon project completion, all intellectual property, source code repositories, design assets, and cloud deployment credentials are fully transferred to your company with zero lock-in.",
    pillar: "Software & UI/UX",
  },
  {
    q: "How do you track and report digital marketing & PPC ROI?",
    a: "We provide a live dashboard and monthly performance reports tracking keyword rankings, conversion rate optimization metrics, and cost-per-acquisition across Google Ads and Meta campaign channels.",
    pillar: "Digital Marketing",
  },
  {
    q: "Can I walk into your Chicago HQ office without an appointment?",
    a: "Walk-ins are always welcome during our regular office hours (Monday – Friday, 9:00 AM – 6:00 PM CST). However, scheduling a 30-minute consultation ensures dedicated specialist time for your case.",
    pillar: "General Intake",
  },
  {
    q: "How and when is pricing finalized for my application or software project?",
    a: "We do not list fixed prices online because every case is unique. Service quotes and pricing are reviewed and finalized during your 1-on-1 scoping consultation meeting after our team reviews your specific intake form and documents.",
    pillar: "Pricing & Quotes",
  },
  {
    q: "How does your secure document vault protect sensitive passport paperwork?",
    a: "All documents submitted through our intake forms are stored with 256-bit AES end-to-end encryption in compliance with US and international privacy standards.",
    pillar: "Security & Vault",
  },
];

export function FaqSection() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="outline" className="glass-pill text-xs font-semibold text-primary border-primary/30 px-3.5 py-1">
          FREQUENTLY ASKED QUESTIONS
        </Badge>
        <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm text-muted-foreground font-normal leading-relaxed">
          Clear answers about our expedited passport timelines, custom software delivery, and marketing growth plans.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-glass">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={faq.q}
              value={`item-${idx}`}
              className="glass-card px-5 py-2 rounded-2xl border border-white/80 bg-white/70 shadow-2xs"
            >
              <AccordionTrigger className="text-sm font-bold text-foreground hover:text-primary transition-colors text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-xs leading-relaxed text-muted-foreground pt-2 pb-3 font-normal">
                {faq.a}
                <div className="mt-2 text-[10px] font-semibold text-primary">
                  Category: {faq.pillar}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
