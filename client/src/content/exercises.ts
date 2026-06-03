export type MilestoneMode = "live" | "stretch";
export type MilestoneDriver = "Evan" | "Account team" | "Everyone";
export type StepKind = "command" | "prompt" | "manual" | "verify";

export interface WorkshopStep {
  title: string;
  kind: StepKind;
  body: string;
  language?: string;
  expected: string;
  produces?: string;
}

export interface CommandBlock {
  label: string;
  code: string;
  language?: string;
}

export interface Milestone {
  id: string;
  number: number;
  phase: string;
  title: string;
  duration: number;
  mode: MilestoneMode;
  driver: MilestoneDriver;
  objective: string;
  requiredInputs: string[];
  producedArtifacts: string[];
  validation: CommandBlock;
  expectedOutput: string[];
  nextDependency: string;
  steps: WorkshopStep[];
  checkpoint: string;
  recovery: string[];
  takeawayFiles: string[];
}

export const milestones: Milestone[] = [
  {
    id: "preflight",
    number: 1,
    phase: "Readiness",
    title: "Set Up Salesforce Environment",
    duration: 8,
    mode: "live",
    driver: "Everyone",
    objective:
      "Install all prerequisites and authenticate a free Salesforce Developer Edition org so coding agent can build on the platform.",
    requiredInputs: [
      "coding agent already installed",
      "Internet access for installs and browser login",
      "Free Salesforce Developer Edition account, sign up at https://developer.salesforce.com/signup if needed",
    ],
    producedArtifacts: [
      "Node 20+ and npm installed",
      "Salesforce CLI installed and on PATH",
      "Salesforce skills installed or confirmed in coding agent",
      "Authenticated Developer Edition org",
      "Default target org configured",
    ],
    validation: {
      label: "Confirm Salesforce readiness",
      language: "bash",
      code: `node --version
npm --version
sf --version
sf org list --all
sf config get target-org --json`,
    },
    expectedOutput: [
      "Node 20+ and npm print versions.",
      "Salesforce CLI prints a version.",
      "coding agent confirms the Salesforce skill workflows are installed or synced.",
      "`sf org list --all` shows an authenticated Developer Edition org.",
      "`sf config get target-org` returns the workshop org.",
    ],
    nextDependency:
      "The Salesforce MCP server uses Salesforce CLI auth, so org access must work before coding agent can build.",
    steps: [
      {
        title: "Prompt: Prepare the Salesforce Workstation",
        kind: "prompt",
        language: "text",
        body: `Set up this machine for Salesforce development. Check each prerequisite and fix anything that is missing. Ask me before running interactive commands like browser logins.

1. Node/npm: Run node --version and npm --version. Node must be 20+. If missing or too old, install Node 20 with the appropriate method for this OS (brew install node on macOS, or nvm install 20) and verify.
2. Salesforce CLI: Run sf --version. If missing, install with npm install -g @salesforce/cli, then verify.
3. Salesforce skills: Check whether the Salesforce skills are installed and available to this coding agent workspace. I need these skill workflows available before the workshop build starts:
   - generating-custom-object
   - generating-custom-field
   - generating-permission-set
   - generating-lwc-components
   - generating-flexipage
   - generating-list-view
   - deploying-metadata
   - handling-sf-data
   - running-apex-tests
   - running-code-analyzer
   - developing-agentforce
   - testing-agentforce
   - observing-agentforce
   If any are missing, install or sync the Salesforce skills from https://github.com/forcedotcom/sf-skills by running npx skills add forcedotcom/sf-skills, then re-check and report the final installed list.
4. Salesforce Developer account and auth: Run sf org list --all. If no orgs appear, tell me to sign up for a free Salesforce Developer Edition at https://developer.salesforce.com/signup, then run sf org login web so I can authenticate in the browser.
5. Target org: Run sf config get target-org --json. If no target org is set, set my authenticated org as the default with sf config set target-org=<my-username> and create an alias with sf alias set workshop-org=<my-username>.

After each fix, re-verify before moving to the next step. When everything passes, confirm this machine is ready to build on Salesforce.`,
        expected:
          "coding agent walks through each prerequisite, fixes what's missing, and confirms readiness.",
        produces: "Fully configured local Salesforce development environment.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `node --version
npm --version
sf --version
sf org list --all
sf config get target-org --json`,
        expected:
          "All tools installed, org authenticated, and target org set.",
        produces: "Salesforce readiness evidence for the room.",
      },
    ],
    checkpoint:
      "Salesforce CLI is authenticated to a Developer Edition org and the machine is ready to build.",
    recovery: [
      "If Node/npm is missing: `brew install node` (macOS) or `nvm install 20 && nvm use 20` (any OS).",
      "If Salesforce CLI is missing: `npm install -g @salesforce/cli` then verify with `sf --version`.",
      "If Salesforce skills are missing: run `npx skills add forcedotcom/sf-skills`, then ask coding agent to report the installed skill list.",
      "If no Developer Edition org exists: sign up at developer.salesforce.com/signup (free, 2 minutes).",
      "If no orgs are authenticated: `sf org login web` (opens browser for login).",
      "If target org is not set: `sf config set target-org=<your-username>` and `sf alias set workshop-org=<your-username>`.",
      "If `sf org login web` fails: check browser pop-up blockers, or try `sf org login web --browser chrome`.",
    ],
    takeawayFiles: ["Local Salesforce CLI auth", "Target org evidence"],
  },
  {
    id: "project-bootstrap",
    number: 2,
    phase: "Project",
    title: "Create a Local Salesforce Project",
    duration: 6,
    mode: "live",
    driver: "Account team",
    objective:
      "Create a new participant-owned Salesforce project and make it the folder coding agent will build inside.",
    requiredInputs: [
      "Readiness check passed",
      "coding agent can open a local folder",
      "Salesforce CLI project generator is available",
    ],
    producedArtifacts: [
      "`~/Desktop/salesforce-headless-workshop/`",
      "`sfdx-project.json`",
      "`force-app/main/default/`",
      "Project instruction file for coding agent",
    ],
    validation: {
      label: "Inspect the new project",
      language: "bash",
      code: `cd ~/Desktop/salesforce-headless-workshop
pwd
ls
test -f sfdx-project.json
test -d force-app/main/default
test -f AGENTS.md`,
    },
    expectedOutput: [
      "The current directory is the new workshop project.",
      "`sfdx-project.json` exists.",
      "`force-app/main/default/` and `AGENTS.md` exist.",
    ],
    nextDependency:
      "All generated metadata, validation scripts, and Agentforce artifacts should land in this project.",
    steps: [
      {
        title: "Prompt: Create the Local Project",
        kind: "prompt",
        language: "text",
        body: `Create a new local Salesforce project for the Acme Logistics workshop.

Use this path:
~/Desktop/salesforce-headless-workshop

Steps:
1. Move to the Desktop with cd ~/Desktop.
2. Create the Salesforce project with sf project generate --name salesforce-headless-workshop.
3. Move into the new project folder with cd salesforce-headless-workshop.
4. Confirm sfdx-project.json exists.
5. Confirm force-app/main/default exists.
6. Create a root AGENTS.md file with concise project instructions:
   - Use the default Salesforce target org unless a prompt says otherwise.
   - Keep generated metadata under force-app/main/default.
   - Use the installed Salesforce skills for custom objects, fields, permission sets, LWC, data operations, deployment, and Agentforce.
   - Validate each milestone before moving on.
   - If a live step is blocked, report the exact blocker and preserve generated artifacts.

Stop after the project and AGENTS.md exist. Show me the files you created and the validation commands you ran.`,
        expected:
          "coding agent creates a fresh SFDX project and a small project instruction file.",
        produces: "Participant-owned local build workspace.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `cd ~/Desktop/salesforce-headless-workshop
test -f sfdx-project.json
test -d force-app/main/default
test -f AGENTS.md`,
        expected:
          "The project folder contains Salesforce project metadata and coding agent project instructions.",
        produces: "A local project coding agent can continue building in.",
      },
    ],
    checkpoint:
      "The participant has a new Salesforce project open in coding agent.",
    recovery: [
      "If project generation fails: `mkdir -p ~/Desktop/salesforce-headless-workshop && cd ~/Desktop/salesforce-headless-workshop && sf project generate --name . --template standard`.",
      "If the folder already exists: `rm -rf ~/Desktop/salesforce-headless-workshop && sf project generate --name salesforce-headless-workshop --output-dir ~/Desktop`.",
      "If coding agent is not in the project folder: close and reopen coding agent from `cd ~/Desktop/salesforce-headless-workshop`.",
      "If AGENTS.md was not created: paste the project instructions directly into coding agent's next prompt.",
    ],
    takeawayFiles: ["~/Desktop/salesforce-headless-workshop", "sfdx-project.json", "AGENTS.md"],
  },
  {
    id: "connect-harness",
    number: 3,
    phase: "Harness",
    title: "Connect coding agent to Salesforce",
    duration: 6,
    mode: "live",
    driver: "Evan",
    objective:
      "Configure Salesforce MCP so coding agent can inspect orgs, deploy metadata, query data, and run validation commands through local Salesforce CLI auth.",
    requiredInputs: [
      "Local Salesforce project open in coding agent",
      "Salesforce CLI authenticated",
      "Local MCP config path available",
    ],
    producedArtifacts: [
      "MCP server config",
      "Agent binding config",
      "Confirmed Salesforce MCP tool access",
    ],
    validation: {
      label: "Ask coding agent to prove the MCP connection",
      language: "text",
      code: `List the connected Salesforce orgs, the current target org, and the Salesforce MCP tools available to this project.`,
    },
    expectedOutput: [
      "coding agent starts the `salesforce-dx` MCP server.",
      "The response lists authorized Salesforce orgs and current target org state.",
      "The available toolsets include orgs, metadata, data, users, and Apex test execution.",
    ],
    nextDependency:
      "All later build prompts depend on coding agent reaching Salesforce MCP tools.",
    steps: [
      {
        title: "Prompt: Configure Salesforce MCP",
        kind: "prompt",
        language: "text",
        body: `Configure Salesforce MCP for coding agent in this local project.

Use the local Salesforce CLI auth and DEFAULT_TARGET_ORG so the MCP server follows whichever org we set as default.

Create or update:
1. A local MCP server config file with a salesforce-dx stdio server:
   - command: npx
   - args: -y @salesforce/mcp@latest --orgs DEFAULT_TARGET_ORG --toolsets orgs,metadata,data,users --tools run_apex_test --allow-non-ga-tools
   - timeout: 120
2. A local agent binding so the coding agent auto-starts salesforce-dx.

Then verify the connection by listing connected Salesforce orgs, the current target org, and available Salesforce MCP tools.

Explain that this runs locally, uses Salesforce CLI auth, and does not grant arbitrary production access beyond the authenticated org.`,
        expected:
          "coding agent creates MCP config files and reports Salesforce tool availability.",
        produces: "Local Salesforce MCP bridge for coding agent.",
      },
      {
        title: "Validate Before Continuing",
        kind: "prompt",
        language: "text",
        body: `List the connected Salesforce orgs, the current target org, and the Salesforce MCP tools available to this project.`,
        expected:
          "The response confirms coding agent can see org and metadata/data/user tools through Salesforce MCP.",
        produces: "Proof that the coding harness can reach Salesforce.",
      },
    ],
    checkpoint:
      "coding agent can list Salesforce orgs and MCP toolsets from the local project.",
    recovery: [
      "If MCP startup times out: the first `npx @salesforce/mcp` run downloads packages. Wait 60s and retry the prompt. Run `npx -y @salesforce/mcp@latest --help` in a terminal to pre-cache.",
      "If no org is listed: `sf org login web` then `sf config set target-org=<your-username>`.",
      "If `sf` is not found inside coding agent: run `which sf` in terminal to get the path, then relaunch coding agent from that same terminal so PATH is inherited.",
      "If `mcp_servers.json` was not created: create the config in the path your coding agent expects and paste the JSON from the prompt.",
    ],
    takeawayFiles: ["MCP server config", "Agent binding config"],
  },
  {
    id: "transport-foundation",
    number: 4,
    phase: "Foundation",
    title: "Build the Operations Foundation",
    duration: 13,
    mode: "live",
    driver: "Evan",
    objective:
      "Use installed Salesforce skills to create Partner and Delivery metadata, extend standard Case, deploy, assign access, and seed realistic records.",
    requiredInputs: [
      "Default target org set",
      "Local SFDX project",
      "Metadata tool access through MCP",
    ],
    producedArtifacts: [
      "`Partner__c` object and fields",
      "`Delivery__c` object and fields",
      "Standard `Case` fields for operations exceptions",
      "Case page layout section for operations fields",
      "Workshop permission set",
      "Sample partners, deliveries, and exception cases",
    ],
    validation: {
      label: "Verify metadata and seed data",
      language: "bash",
      code: `sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Partner__c','Delivery__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Partner__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json`,
    },
    expectedOutput: [
      "Partner__c, Delivery__c, and standard Case are visible.",
      "Partner records include multiple safety ratings and active/inactive statuses.",
      "Delivery records use a lookup to partners and sample Cases reference operations context.",
      "The Case page layout shows the operations fields in a dedicated section.",
    ],
    nextDependency:
      "The UI and optional agent use the same records and standard Case work object.",
    steps: [
      {
        title: "Prompt: Build the Operations Data Foundation",
        kind: "prompt",
        language: "text",
        body: `Build the Salesforce operations foundation in the target org.

Use these installed Salesforce skill workflows in order:
1. generating-custom-object for custom objects.
2. generating-custom-field for custom fields.
3. generating-permission-set for object and field access.
4. deploying-metadata for dry-run and deploy.
5. handling-sf-data for seed records.

Create:
- Partner__c with MC_Number__c, DOT_Number__c, Status__c, Safety_Rating__c, and On_Time_Percentage__c.
- Delivery__c with a lookup to Partner__c plus Origin__c, Destination__c, Status__c, Scheduled_Delivery__c, Actual_Delivery__c, and Weight_lbs__c.
- Standard Case custom fields: Partner__c lookup, Delivery__c lookup, Issue_Type__c picklist (Shortage, Damage, Delay, Billing Dispute), and Operations_Priority__c picklist (Low, Medium, High, Critical).
- Update the active Case page layout so the four operations fields are visible in a Operations Details section. Preserve existing Case layout sections and fields, and report the exact layout file/name you changed.
- A permission set named Headless_Workshop_Access with object and field access for the generated metadata and standard Case fields.

Deploy safely:
- Run a dry-run first.
- Deploy only the needed metadata after the dry-run succeeds.
- Assign the permission set to the current user if possible.

Seed synthetic records:
- 5 partners with varied status and safety ratings.
- 8 deliveries linked to partners.
- 4 Cases linked to partners/deliveries, including at least one high-priority shortage.

Stop after validation. Report files created, Case layout updated, deployment result, record counts, and cleanup guidance.`,
        expected:
          "coding agent phases schema, permissions, deployment, and data through the right Salesforce skills.",
        produces: "Operations data foundation.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Partner__c','Delivery__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Partner__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json`,
        expected:
          "Queries return generated objects, seeded partners, and standard Case operations records.",
        produces: "Evidence that the next UI and agent steps have data.",
      },
    ],
    checkpoint:
      "Metadata is deployed, access exists, and sample records are queryable.",
    recovery: [
      "If deploy fails on the Partner lookup: confirm Partner__c deployed, then rerun the Delivery__c field deploy.",
      "If Case field deploy fails: `sf project deploy start --source-dir force-app/main/default/objects/Case` separately, then `sf project deploy start --source-dir force-app/main/default/permissionsets`.",
      "If Case layout deploy fails: retrieve the current Case layout first, add only the Operations Details section, then deploy that layout file separately.",
      "If permission set assignment fails: `sf org assign permset --name Headless_Workshop_Access`.",
      "If seed data fails on field errors: `sf sobject describe --sobject Partner__c --json` to check createable fields, then retry insert with valid fields only.",
      "To verify deployment status: `sf project deploy report --json`.",
    ],
    takeawayFiles: ["force-app/main/default/objects/", "force-app/main/default/layouts/", "force-app/main/default/permissionsets/"],
  },
  {
    id: "salesforce-experience",
    number: 5,
    phase: "Experience",
    title: "Customize the Salesforce Experience",
    duration: 10,
    mode: "live",
    driver: "Account team",
    objective:
      "Create a dedicated Operations Workshop Lightning app that makes the generated operations data visible through app navigation, list views, and an operations dashboard.",
    requiredInputs: [
      "Operations objects deployed",
      "Seeded Partner, Delivery, and Case records",
      "Lightning Experience enabled",
    ],
    producedArtifacts: [
      "`Operations Workshop` Lightning app",
      "`Operations Console` Lightning App Page",
      "`Partner__c` and `Delivery__c` tabs",
      "Partner, Delivery, and Case list views",
      "`deliveryTracker` operations dashboard LWC",
      "Updated workshop permission set access",
    ],
    validation: {
      label: "Open and inspect the org",
      language: "bash",
      code: `sf org open`,
    },
    expectedOutput: [
      "Users can open App Launcher and find the Operations Workshop app.",
      "Partners, Deliverys, and Cases are visible in the app navigation after the app shell prompt.",
      "`deliveryTracker` renders seeded delivery and Case data after the dashboard enhancement prompt.",
      "For a one-hour call, this is the primary live win: participants can inspect real Salesforce assets that coding agent generated.",
    ],
    nextDependency:
      "The agent preview uses the same operational records the UI just made visible, but it can remain a follow-on path if time is tight.",
    steps: [
      {
        title: "Prompt A: Create the App Shell",
        kind: "prompt",
        language: "text",
        body: `Create the Operations Workshop app shell for the operations foundation.

Use these installed Salesforce skill workflows in order:
1. generating-custom-tab for Partner__c and Delivery__c tabs.
2. generating-list-view for Partner__c, Delivery__c, and Case list views.
3. generating-lightning-app for the Operations Workshop app.
4. generating-permission-set for app, tab, object, and field access.
5. deploying-metadata for validation and deploy.

Important safety rules:
- Inspect existing source metadata first.
- Do not create or modify objects or fields in this milestone.
- Use only fields that already exist in the project or target org.
- Prefer deployable, conservative metadata over richer UI metadata that might fail validation.

Build:
- Custom tabs for Partner__c and Delivery__c.
- Useful list views for Partner__c, Delivery__c, and Case.
- For list views, use simple filters and only confirmed fields.
- For Case list views, do not guess standard list view column metadata names. Inspect or retrieve an existing Case list view first; if valid Case columns cannot be confirmed, omit explicit Case columns and use safe filters only.
- Include a Case list view for open operations Cases where Issue_Type__c is populated.
- A Lightning app named Operations Workshop that is active and visible to the current workshop user.
- App navigation items for Partners, Deliverys, and Cases.
- Update Headless_Workshop_Access so the current user can open the app, see the tabs, access Partner__c and Delivery__c, and access the Case operations fields.

Deploy safely:
- Run a dry-run first.
- Keep the deploy scope targeted to only the app shell metadata, and deploy only the required metadata after the dry-run succeeds.
- Assign Headless_Workshop_Access to the current/default user if possible.
- Treat an existing permission set assignment as success/already assigned.

Stop after deployment or the first blocker. Report app name, tabs created, list views created, permission set assignment result, files deployed, and how to open the app from App Launcher.

Do not stop at deployed metadata; make the app visible and usable by the current workshop user.`,
        expected:
          "coding agent creates a discoverable Lightning app shell with tabs, list views, permissions, and current-user access.",
        produces: "Operations Workshop app shell.",
      },
      {
        title: "Prompt B: Add the Operations Dashboard",
        kind: "prompt",
        language: "text",
        body: `Enhance the existing Operations Workshop app with an operations dashboard.

Use these installed Salesforce skill workflows in order:
1. generating-lwc-components for the deliveryTracker dashboard component.
2. generating-apex only if the LWC needs a cacheable, with-sharing controller.
3. generating-flexipage for the Operations Console app page; do not hand-author FlexiPage XML.
4. generating-lightning-app to add the Operations Console page as the first navigation item in the existing Operations Workshop app.
5. generating-permission-set for Apex access if a controller is created.
6. deploying-metadata for validation and deploy.

Build:
- An LWC named deliveryTracker.
- A Lightning App Page named Operations Console.
- Place deliveryTracker on the Operations Console app page.
- Add Operations Console as the first navigation item in the existing Operations Workshop app.
- If Apex is created, update Headless_Workshop_Access so the current user can run the controller.

Make deliveryTracker a small operations dashboard:
- Show KPI cards for total deliveries, in transit deliveries, exception deliveries, and high-priority operations Cases.
- Show recent or exception Delivery__c records with Partner__r.Name, Origin__c, Destination__c, Status__c, Scheduled_Delivery__c, and related Case context when available.
- Use status badges: Delivered green, In Transit amber, Exception red, Scheduled gray.
- Keep the component readable without relying on color alone.
- Prefer LDS or UI API/wire-friendly patterns when possible. Use Apex only if relationship or aggregate data is not practical through LDS/UI API in this org.

Deploy safely:
- Run a dry-run first.
- Deploy only the required metadata after the dry-run succeeds.

Stop after deployment or the first blocker. Report app page created, component data access pattern, permission set assignment result if applicable, files deployed, and how to open the Operations Console page.`,
        expected:
          "coding agent adds the dashboard only after the app shell is visible.",
        produces: "Operations Console dashboard enhancement.",
      },
    ],
    checkpoint:
      "What you now have: a Developer Edition org, a local Salesforce project, generated operations metadata, seeded records, app navigation, list views, and an operations dashboard the customer can inspect.",
    recovery: [
      "If LWC deploy fails: `sf project deploy start --source-dir force-app/main/default/lwc/deliveryTracker --json` to see the exact error.",
      "If FlexiPage/App Page deployment fails, keep the app, tabs, list views, and LWC deployed; report the exact blocker and provide the manual App Builder placement path.",
      "If the dashboard LWC runs long, deploy the app, tabs, and list views as live proof, then preserve LWC files as stretch work.",
      "If permission assignment fails, report the exact command and error, then provide the permission set name the admin should assign manually.",
      "If the component shows no data: `sf data query --query \"SELECT Id, Name, Status__c FROM Delivery__c LIMIT 5\" --json` to confirm records exist. Re-seed if empty.",
      "To open the org and inspect: `sf org open`.",
    ],
    takeawayFiles: [
      "force-app/main/default/applications/Operations_Workshop.app-meta.xml",
      "force-app/main/default/flexipages/Operations_Operations.flexipage-meta.xml",
      "force-app/main/default/tabs/",
      "force-app/main/default/lwc/deliveryTracker/",
      "force-app/main/default/objects/*/listViews/",
      "force-app/main/default/permissionsets/Headless_Workshop_Access.permissionset-meta.xml",
    ],
  },
  {
    id: "core-agent",
    number: 6,
    phase: "Agent Preview",
    title: "Preview the Operations Support Assistant",
    duration: 4,
    mode: "stretch",
    driver: "Account team",
    objective:
      "Use Agentforce as the next-step preview: create a reviewable Agent Spec, and only generate an agent bundle if prerequisites and time allow.",
    requiredInputs: [
      "Operations objects and seed data",
      "Target org access",
      "Agentforce-capable org (Developer Edition includes Einstein features)",
    ],
    producedArtifacts: [
      "Operations Support Assistant Agent Spec",
      "Agentforce prerequisite report",
      "Optional authoring bundle if the org supports it and the room has time",
      "Preview plan and proof utterance",
    ],
    validation: {
      label: "Agentforce proof utterance",
      language: "text",
      code: `A delivery from Denver to Phoenix arrived short. Find the partner, check related delivery context, and prepare a high-priority shortage case.`,
    },
    expectedOutput: [
      "coding agent creates an Agent Spec before editing Agentforce files.",
      "The selected path uses Employee Agent preview for live workshop safety.",
      "If org capability blocks Agentforce, the Agent Spec and exact blocker are preserved.",
      "The workshop still succeeds if this module stops at the Agent Spec.",
    ],
    nextDependency:
      "Stretch work can generate the authoring bundle, live-actions preview, tests, publish, and activation.",
    steps: [
      {
        title: "Prompt A: Design the Agent Spec",
        kind: "prompt",
        language: "text",
        body: `Design an Agentforce Agent Script agent for this workshop. Do not write or deploy the agent yet.

Agent name: Operations Support Assistant
API name: Operations_Support_Assistant

Purpose:
Help an Acme Logistics operations user answer partner or driver support questions, look up partner and delivery context, and create a standard Salesforce Case when a support question becomes operational work.

Use the developing-agentforce workflow:
1. Scan this project for existing objects, Apex, flows, prompt templates, and Agentforce bundles.
2. Recommend Employee Agent for live preview. Note Service Agent as stretch if Experience Cloud/partner portal setup is available.
3. Create an Agent Spec first with purpose, behavioral intent, subagents, actions/backing logic, variables, gating logic, environment prerequisites, and preview plan.
4. Include actions for partner lookup, delivery lookup, and Case preparation/creation. Mark backing logic as EXISTS or NEEDS STUB.
5. Include the proof utterance: "A delivery from Denver to Phoenix arrived short. Find the partner, check related delivery context, and prepare a high-priority shortage case."

Stop after the Agent Spec and ask for approval before generating or editing Agentforce files. Do not publish or activate anything.`,
        expected:
          "coding agent produces a reviewable Agent Spec and prerequisite assessment, then stops.",
        produces: "Agentforce design artifact or precise org capability blocker.",
      },
      {
        title: "Prompt B: Build the Agent Preview",
        kind: "prompt",
        language: "text",
        body: `Build the approved Operations Support Assistant Agent Spec.

Follow the Agentforce Agent Script workflow:
1. Confirm target org with sf config get target-org --json.
2. Validate Agentforce prerequisites for the selected agent type.
3. Generate the authoring bundle with sf agent generate authoring-bundle --json --no-spec --name "Operations Support Assistant" --api-name Operations_Support_Assistant.
4. Edit the generated .agent file only after reading the generated bundle.
5. Generate or reuse backing logic for partner lookup, delivery lookup, and Case creation.
6. Validate with sf agent validate authoring-bundle --json --api-name Operations_Support_Assistant.
7. Deploy only the required metadata.
8. Start preview with sf agent preview start --json --use-live-actions --authoring-bundle Operations_Support_Assistant.
9. Send the proof utterance and report trace-based evidence of routing and action behavior.

Do not publish or activate unless explicitly approved.`,
        expected:
          "Use this only if Agentforce prerequisites are present and the room has time.",
        produces: "Optional authoring bundle and preview evidence.",
      },
    ],
    checkpoint:
      "Optional Agentforce preview complete: an Agent Spec exists, or the exact Agentforce org blocker is documented. Do not let this replace the Module 5 live win.",
    recovery: [
      "If Agentforce is not available in this org: keep the Agent Spec as a design artifact. Skip bundle generation entirely — the spec is still a valid deliverable.",
      "To check Agentforce capability: `sf org display --json` and look for Einstein or Agentforce features in the org info.",
      "If bundle generation fails: `sf agent generate authoring-bundle --json --no-spec --name \"Operations Support Assistant\" --api-name Operations_Support_Assistant` — check the error message for missing prerequisites.",
      "If preview fails: `sf agent preview start --json --use-live-actions --authoring-bundle Operations_Support_Assistant` — inspect the trace output for routing errors.",
    ],
    takeawayFiles: ["Agent Spec", "force-app/main/default/aiAuthoringBundles/"],
  },
  {
    id: "continue-building",
    number: 7,
    phase: "Takeaway",
    title: "Continue Building After the Hour",
    duration: 5,
    mode: "stretch",
    driver: "Everyone",
    objective:
      "Leave participants with the next coding agent prompts for their own local Salesforce project.",
    requiredInputs: [
      "Participant-owned local project",
      "Generated metadata or Agent Spec",
      "Developer Edition org or documented blocker",
    ],
    producedArtifacts: [
      "Next coding agent prompts",
      "Validation checklist",
      "Known continuation path",
    ],
    validation: {
      label: "Inspect the participant project",
      language: "bash",
      code: `find force-app/main/default -maxdepth 3 -type f | sort
git status --short`,
    },
    expectedOutput: [
      "Generated Salesforce metadata is visible under `force-app/main/default`.",
      "Participants know which coding agent prompt to run next.",
      "Participants can describe what they built and what they should continue after the call.",
    ],
    nextDependency:
      "This is the handoff into POC work against real Acme Logistics use cases.",
    steps: [
      {
        title: "Prompt: Plan the Continuation Path",
        kind: "prompt",
        language: "text",
        body: `Review this local Salesforce project and propose the next three implementation steps.

Use the right installed Salesforce skills for each step:
- developing-agentforce for Agent Script authoring.
- testing-agentforce for Agentforce test specs and runs.
- generating-permission-set for access hardening.
- deploying-metadata for deploy validation and promotion.
- handling-sf-data for additional seed data or cleanup.

Base the recommendations on the files that exist in force-app/main/default and the current target org state.
Do not make changes yet. Return a prioritized next-step plan with validation commands.`,
        expected:
          "coding agent proposes a skill-aligned continuation path for the participant project.",
        produces: "Post-workshop build plan.",
      },
      {
        title: "Validate Before Closing",
        kind: "manual",
        language: "bash",
        body: `find force-app/main/default -maxdepth 3 -type f | sort
git status --short`,
        expected:
          "Participants can see generated files in their own local project.",
        produces: "Durable customer-owned workspace.",
      },
    ],
    checkpoint:
      "Final takeaway: the Account team has a customer-owned local Salesforce project, generated metadata, visible app assets, validation evidence, and copyable prompts for dashboard, Agentforce, permissions, tests, and production hardening.",
    recovery: [
      "To see what was built: `find force-app/main/default -maxdepth 3 -type f | sort` shows all generated metadata files.",
      "To check org state: `sf org display --json` and `sf data query --query \"SELECT QualifiedApiName FROM EntityDefinition WHERE QualifiedApiName LIKE '%__c'\" --json`.",
      "If Agentforce was not reached: the Agent Spec and the labs/ folder have continuation prompts for UI, data, permissions, and agent work.",
      "If time ran out: the hosted app at the workshop URL remains the prompt reference. Their local project and org persist indefinitely.",
    ],
    takeawayFiles: ["force-app/main/default/", "AGENTS.md", "Generated Agent Spec"],
  },
];

export const totalWorkshopMinutes = milestones.reduce((sum, milestone) => sum + milestone.duration, 0);
export const liveWorkshopMinutes = milestones
  .filter((milestone) => milestone.mode === "live")
  .reduce((sum, milestone) => sum + milestone.duration, 0);
