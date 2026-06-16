export interface TalkingPoint {
  section: string;
  points: string[];
}

export const talkingPoints: TalkingPoint[] = [
  {
    section: "landing",
    points: [
      "This isn't a demo — it's a working session. Same org, same tools you'd use Monday.",
      "The ask was no slides, just building. This is that.",
      "Modules 1 through 3 are pre-work where possible, so the live room can focus on building the Salesforce foundation, app shell, and operations dashboard.",
    ],
  },
  {
    section: "connect",
    points: [
      "Your developers never open a browser. MCP means their coding agent is the UI.",
      "Zero telemetry — Code Puppy + Salesforce MCP runs locally. Your prompts don't leave your machine.",
      "Salesforce runs as managed infrastructure; target hosting and region can be validated for the POC.",
      "MCP follows Salesforce CLI auth and the default target org.",
    ],
  },
  {
    section: "data-model",
    points: [
      "We are not rebuilding Case management. The fast part is visible on screen; the production-grade part is letting Salesforce keep doing what it already does well.",
      "The fast part is visible on screen. The production part is deciding who can see which records, fields, actions, and history.",
      "Natural language to metadata to deployed. Code Puppy called Salesforce tools you didn't have to learn during the room.",
      "This is why the prompt can stay focused on the transportation model while Salesforce provides the shared enterprise services around it.",
    ],
  },
  {
    section: "lwc",
    points: [
      "The customer team is driving now. This is the handoff. You wrote one prompt.",
      "The component prompt names the right Salesforce skill workflow, so Code Puppy follows LWC patterns instead of generic React habits.",
      "The dashboard prompt adds simple brand guidance while keeping the component SLDS-compatible and accessible.",
      "The live win is a branded Lightning operations dashboard backed by the same Salesforce records and permissions.",
    ],
  },
  {
    section: "dashboard",
    points: [
      "The app shell proves Salesforce navigation and visibility first; the dashboard then gives the room something operational to inspect.",
      "Status badges need text and shape, not color alone, because the component has to work as an enterprise UI.",
      "If the LWC or FlexiPage path runs long, the app shell remains valid live proof and the exact blocker becomes the continuation point.",
      "Agentforce remains a lab path after the hour, not a dependency for workshop success.",
    ],
  },
  {
    section: "wrap-up",
    points: [
      "The punch line is ownership: their local project, their Developer Edition org, their generated Salesforce artifacts.",
      "Code Puppy accelerates configuration and iteration because it is landing work on an enterprise platform designed for production operations.",
      "Continuous innovation: you get Salesforce's roadmap, including Data Cloud and Agentforce, without forcing all of it into this workshop hour.",
      "Next: POC against the real case management use case — inbound/outbound logistics at scale.",
    ],
  },
];
