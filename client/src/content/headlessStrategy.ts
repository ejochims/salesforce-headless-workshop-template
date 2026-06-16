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
    title: "Code Puppy harness",
    body: "Code Puppy coordinates prompts, files, tools, and validation without hiding the implementation path.",
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
    title: "Experience and operations",
    body: "Lightning UI, app pages, and generated components compose on shared Salesforce data, access, and workflow services.",
  },
  {
    title: "Customer-owned delivery",
    body: "The output is a durable project with evidence, next prompts, and a path to production hardening.",
  },
];

export const milestoneStrategyLessons: Record<string, MilestoneStrategyLesson> = {
  "step-zero": {
    principle: "Access before automation",
    lesson:
      "The workshop starts by confirming the coding harness and Salesforce org target are available before any local setup or deployment work begins.",
    customerTakeaway:
      "Developer Edition is the default target for isolated build-and-test work, but the same Code Puppy and Salesforce CLI pattern can target sandboxes or production with the right controls.",
  },
  preflight: {
    principle: "Pre-work control plane",
    lesson:
      "Headless starts with tools and auth the customer controls locally, and those setup checks are best completed before the live room starts.",
    customerTakeaway:
      `If Code Puppy times out, run the fallback commands in Terminal:
- node --version
- npm --version
- brew install node
- nvm install 20 && nvm use 20
- npm install -g @salesforce/cli
- sf --version
- sf org login web
- sf org list --all
- sf config set target-org=<your-username>`,
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
      "Code Puppy is useful because it can call approved Salesforce tools through MCP, not because it has unrestricted access.",
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
      "The same governed foundation can surface through a Lightning app shell, tabs, and list views before custom UI is added.",
    customerTakeaway:
      "Participants can inspect Salesforce assets generated from prompts before moving to richer dashboard composition.",
  },
  "operations-dashboard": {
    principle: "Inspectable operations layer",
    lesson:
      "The dashboard turns the generated transportation records into a visible operational surface without changing the underlying data model.",
    customerTakeaway:
      "The live workshop lands on a branded Lightning outcome the room can inspect, then later POC work can deepen UI, data, automation, and Agentforce.",
  },
  "exception-automation": {
    principle: "Automation as visible proof",
    lesson:
      "A record-triggered Flow turns a passive data model into a live operations handoff — the room watches a Case appear the moment a Shipment flips to Exception.",
    customerTakeaway:
      "The same pattern — trigger on a status change, route to a queue, create a work item — applies to any operational escalation in a real-world transportation workflow.",
  },
  "continue-building": {
    principle: "Code Puppy as build advisor",
    lesson:
      "At the end of the session, Code Puppy inspects what was actually built and generates a personal menu of next ideas — each with a copy-paste prompt ready to run.",
    customerTakeaway:
      "Participants leave with a project they own, a working org, and the next prompt already written. The session ends but the build doesn't have to.",
  },
};

export function getMilestoneStrategy(milestoneId: string) {
  return milestoneStrategyLessons[milestoneId];
}
