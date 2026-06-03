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
      "By the end of this hour: a local Salesforce project, a Developer Edition org, metadata, sample data, and a visible path to Agentforce.",
    ],
  },
  {
    section: "connect",
    points: [
      "Your developers never open a browser. MCP means their coding agent is the UI.",
      "Zero telemetry — the coding agent and Salesforce MCP run locally. Your prompts don't leave your machine.",
      "Salesforce avoids creating an AWS dependency; target hosting and region can be validated for the POC.",
      "MCP follows Salesforce CLI auth and the default target org.",
    ],
  },
  {
    section: "data-model",
    points: [
      "Remember 'Fix It'? The internal CRM that stalled on roles and permissions complexity? We are extending standard Case management.",
      "The fast part is visible on screen. The production part is deciding who can see which records, fields, actions, and history.",
      "Natural language → metadata → deployed. The agent called 6 MCP tools you didn't have to learn.",
      "This is why the prompt can stay focused on the operations model while Salesforce provides the shared enterprise services around it.",
    ],
  },
  {
    section: "lwc",
    points: [
      "The Account team is driving now. This is the handoff. You wrote one prompt.",
      "The component prompt names the right Salesforce skill workflow, so the coding agent follows LWC patterns instead of generic React habits.",
      "SLDS 2 keeps the experience aligned with Salesforce patterns while the data, access, and operational history stay in the same system.",
      "Deployed to the org in under 18 minutes from a natural language description.",
    ],
  },
  {
    section: "agent",
    points: [
      "The live-safe Agentforce win is the Agent Spec: purpose, actions, prerequisites, validation, and preview plan.",
      "If the org has Agentforce capability, the coding agent can generate the authoring bundle and preview with live actions.",
      "The assistant starts with partner support deflection and turns operational work into standard Cases.",
      "Agent Script is a source artifact. Your team can version-control, review, and extend it.",
    ],
  },
  {
    section: "wrap-up",
    points: [
      "The punch line is ownership: their local project, their Developer Edition org, their generated Salesforce artifacts.",
      "The coding agent accelerates configuration and iteration because it is landing work on an enterprise platform designed for production operations.",
      "Continuous innovation: you get Salesforce's entire roadmap — Data Cloud, Agentforce, everything — without owning 100% of the development.",
      "Next: POC against the real case management use case — inbound/outbound logistics at scale.",
    ],
  },
];
