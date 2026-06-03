export interface HeadlessStrategyNode {
  title: string;
  body: string;
}

export interface MilestoneStrategyLesson {
  principle: string;
  lesson: string;
  customerTakeaway: string;
}

export const headlessStrategyMap: HeadlessStrategyNode[] = [
  {
    title: "Customer laptop",
    body: "The build starts in a local workspace the customer can inspect, keep, and rerun.",
  },
  {
    title: "coding agent harness",
    body: "The coding agent coordinates prompts, files, tools, and validation without hiding the implementation path.",
  },
  {
    title: "Salesforce CLI and MCP",
    body: "The harness acts through explicit Salesforce auth, metadata, data, and test boundaries.",
  },
  {
    title: "Metadata and data",
    body: "The work lands as deployable Salesforce assets and records on a governed CRM foundation.",
  },
  {
    title: "Experience and Agentforce",
    body: "UI and agent layers compose on shared Salesforce data, access, and workflow services.",
  },
  {
    title: "Customer-owned delivery",
    body: "The output is a durable project with evidence, next prompts, and a path to production hardening.",
  },
];

export const milestoneStrategyLessons: Record<string, MilestoneStrategyLesson> = {
  preflight: {
    principle: "Local control plane",
    lesson:
      "Headless starts with tools and auth the customer controls locally, so automation has a trusted route into Salesforce.",
    customerTakeaway:
      "The customer can rerun or inspect the same path after the workshop without depending on a hidden environment.",
  },
  "project-bootstrap": {
    principle: "Portable delivery",
    lesson:
      "A local Salesforce project turns the session into source-controlled metadata instead of transient clicks.",
    customerTakeaway:
      "Every generated asset can be reviewed, versioned, deployed, or discarded through normal engineering practices.",
  },
  "connect-harness": {
    principle: "Tool-bounded agency",
    lesson:
      "The coding agent is useful because it can call approved Salesforce tools through MCP, not because it has unrestricted access.",
    customerTakeaway:
      "The harness can accelerate work while Salesforce auth, org scope, and tool selection remain explicit.",
  },
  "transport-foundation": {
    principle: "Salesforce as system of record",
    lesson:
      "Objects, fields, permissions, and seed data establish the durable operational model before the experience layer arrives.",
    customerTakeaway:
      "When this moves from prototype to production, the hard questions are access, identity, governance, and operational history.",
  },
  "salesforce-experience": {
    principle: "Composable experience layer",
    lesson:
      "The same governed foundation can surface through Lightning UI, list views, and generated components.",
    customerTakeaway:
      "The agent can focus on the operations experience because the enterprise foundation is already in place.",
  },
  "core-agent": {
    principle: "Agent as orchestration layer",
    lesson:
      "Agentforce should be grounded in real actions, data, and validation evidence before activation.",
    customerTakeaway:
      "The assistant becomes a governed workflow entry point, not a disconnected chatbot.",
  },
  "continue-building": {
    principle: "Evidence-led continuation",
    lesson:
      "The workshop closes with artifacts, validation commands, and next prompts that support real POC work.",
    customerTakeaway:
      "The fast build is visible on screen; production readiness comes from the governed platform underneath it.",
  },
};

export function getMilestoneStrategy(milestoneId: string) {
  return milestoneStrategyLessons[milestoneId];
}
