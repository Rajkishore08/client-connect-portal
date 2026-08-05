import { FileCheck2, LayoutGrid, SendHorizonal } from "lucide-react";

const STEPS = [
  {
    icon: LayoutGrid,
    title: "Choose Category",
    body: "Passport & Visa, Digital Marketing or Website Development.",
  },
  {
    icon: FileCheck2,
    title: "Select Service",
    body: "See the document checklist before you type anything.",
  },
  {
    icon: SendHorizonal,
    title: "Submit, Chat or Book",
    body: "Send the form, ask our assistant, or book a consultation.",
  },
];

export function StepsBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-label="Request any service in 3 easy steps"
      className="surface-card overflow-hidden"
    >
      <div className={compact ? "p-5" : "p-6 sm:p-8"}>
        <h2 className={compact ? "text-base font-semibold" : "text-xl font-bold sm:text-2xl"}>
          Request any service in 3 easy steps
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-xl bg-muted/60 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <step.icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Step {i + 1}
                  </span>
                  <span className="block truncate font-semibold">{step.title}</span>
                </span>
              </div>
              {!compact && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
