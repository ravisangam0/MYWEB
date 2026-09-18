// EDITABLE WORKFLOW
export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export const workflow: WorkflowStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We listen first. What the business does, who it serves, what is not working today and what success would actually look like.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Scope, structure, content and timeline agreed in writing — so everyone knows what is being built before work begins.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Design and development in short review cycles. You see progress as it happens and give feedback while changes are still cheap.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Testing, performance checks, handover and documentation. After launch we stay reachable for changes and fixes.",
  },
];
