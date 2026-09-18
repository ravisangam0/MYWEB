import { workflow } from "@/data/workflow";

export function WorkflowTimeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
      {workflow.map((item) => (
        <li
          key={item.step}
          className="group bg-background p-6 transition-colors hover:bg-surface md:p-7"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-primary">{item.step}</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
