export type MilestoneMode = "prework" | "live" | "stretch";
export type MilestoneDriver = "Facilitator" | "Customer team" | "Everyone";
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
  heroImage?: { src: string; alt: string; caption?: string };
  banner?: {
    tone: "blue" | "yellow" | "green";
    text: string;
    cta?: { label: string; href: string };
  };
}

export const milestones: Milestone[] = [
  {
    id: "step-zero",
    number: 0,
    phase: "Access",
    title: "Install Code Puppy and Connect a Salesforce Org",
    duration: 6,
    mode: "prework",
    driver: "Everyone",
    objective:
      "Confirm Code Puppy is available and identify the Salesforce org the workshop will use before the readiness checks begin.",
    requiredInputs: [
      "Internet access for Code Puppy install or launch",
      "Salesforce org access; Developer Edition is recommended for this workshop",
      "Browser access for Salesforce signup or login",
    ],
    producedArtifacts: [
      "Code Puppy installed or confirmed",
      "Salesforce org selected for the workshop",
      "Developer Edition signup completed if needed",
    ],
    validation: {
      label: "Confirm access prerequisites",
      language: "text",
      code: `Code Puppy opens successfully.
Salesforce org is available.
Developer Edition login works if using the workshop default org type.`,
    },
    expectedOutput: [
      "Code Puppy launches on the participant machine.",
      "The participant has a Salesforce org they are allowed to use.",
      "For the default workshop path, the participant can log in to a free Developer Edition org.",
      "If using a sandbox or production org, permissions and deployment guardrails are already approved.",
    ],
    nextDependency:
      "Milestone 1 uses Salesforce CLI authentication, so participants need Code Puppy and an org before local readiness checks begin.",
    steps: [
      {
        title: "Confirm or Install Code Puppy",
        kind: "manual",
        language: "text",
        body: `Open Code Puppy once and confirm it launches.

If you do not have Code Puppy installed, open:
https://github.com/mpfaffenberger/code_puppy

macOS / Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh
uvx code-puppy

Windows PowerShell:
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uvx code-puppy`,
        expected: "Code Puppy opens locally.",
        produces: "Local Code Puppy access for the workshop.",
      },
      {
        title: "Create or Identify the Salesforce Org",
        kind: "manual",
        language: "text",
        body: `For this workshop, use a free Salesforce Developer Edition org:
https://developer.salesforce.com/form/signup/freetrial.jsp

Code Puppy can connect to any Salesforce org supported by Salesforce CLI authentication. Developer Edition is the workshop default because it is free, isolated, and purpose-built for building and testing Salesforce capabilities.

The same pattern can target a sandbox or production org when the team has the right permissions, release process, and deployment guardrails.`,
        expected: "Participant knows which Salesforce org they will use.",
        produces: "Workshop org selected before CLI authentication.",
      },
    ],
    checkpoint:
      "Code Puppy launches and the participant has a Salesforce org ready for authentication.",
    recovery: [
      "If Code Puppy is missing: install it from `https://github.com/mpfaffenberger/code_puppy`, then run `uvx code-puppy`.",
      "If GitHub access is blocked: ask the facilitator for the approved Code Puppy install path.",
      "If Developer Edition signup is blocked: use a pre-provisioned org for follow-along.",
      "If using sandbox or production: confirm permissions, target-org policy, and deployment guardrails before continuing.",
    ],
    takeawayFiles: ["Code Puppy GitHub Repo", "Salesforce org login"],
  },
  {
    id: "preflight",
    number: 1,
    phase: "Readiness",
    title: "Set Up Salesforce Environment",
    duration: 8,
    mode: "prework",
    driver: "Everyone",
    objective:
      "Validate the Step 0 prerequisites, install local Salesforce tooling, and authenticate the Salesforce org Code Puppy will use for the workshop.",
    requiredInputs: [
      "Step 0 complete: Code Puppy installed or confirmed",
      "Internet access for installs and browser login",
      "Salesforce org available; Developer Edition is recommended for this workshop",
    ],
    producedArtifacts: [
      "Node 22+ and npm installed",
      "Salesforce CLI v2.130.7+ installed and on PATH",
      "Salesforce skills installed or confirmed in Code Puppy",
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
      "Node 22+ and npm print versions.",
      "Salesforce CLI v2.130.7+ prints a version.",
      "Code Puppy confirms the Salesforce skill workflows are installed or synced.",
      "`sf org list --all` shows an authenticated Developer Edition org.",
      "`sf config get target-org` returns the workshop org.",
      "If Code Puppy times out during Node/npm or Salesforce CLI install, the same install commands can be run directly in the terminal and re-verified before the live session.",
    ],
    nextDependency:
      "The Salesforce MCP server uses Salesforce CLI auth, so org access must work before Code Puppy can build.",
    steps: [
      {
        title: "Prompt: Prepare the Salesforce Workstation",
        kind: "prompt",
        language: "text",
        body: `Set up this machine for Salesforce development. Check each prerequisite and fix anything that is missing. Ask me before running interactive commands like browser logins.

1. Node/npm: Run node --version and npm --version. Node must be 22+ (the React-on-Salesforce milestone requires it). If missing or too old, install Node 22 with the appropriate method for this OS (brew install node on macOS, or nvm install 22) and verify.
2. Salesforce CLI: Run sf --version. The version must be 2.130.7 or newer (this includes the UI Bundle plugin used in the React milestone). If missing, install with npm install -g @salesforce/cli. If present but older, run sf update. Then verify.
3. Salesforce skills: Check whether the Salesforce skills are installed and available to this Code Puppy workspace. I need these skill workflows available before the workshop build starts:
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
   - building-ui-bundle-app
   - building-ui-bundle-frontend
   - generating-ui-bundle-metadata
   - using-ui-bundle-salesforce-data
   - deploying-ui-bundle
   If any are missing, install or sync the Salesforce skills from https://github.com/forcedotcom/sf-skills by running npx skills add forcedotcom/sf-skills, then re-check and report the final installed list.
4. Salesforce Developer account and auth: Run sf org list --all. If no orgs appear, tell me to sign up for a free Salesforce Developer Edition at https://developer.salesforce.com/form/signup/freetrial.jsp, then run sf org login web so I can authenticate in the browser.
5. Target org: Run sf config get target-org --json. If no target org is set, set my authenticated org as the default with sf config set target-org=<my-username> and create an alias with sf alias set acme-trial=<my-username>.

After each fix, re-verify before moving to the next step. When everything passes, confirm this machine is ready to build on Salesforce.`,
        expected:
          "Code Puppy walks through each prerequisite, fixes what's missing, and confirms readiness.",
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
      "If Code Puppy is missing: install it from `https://github.com/mpfaffenberger/code_puppy`, then run `uvx code-puppy`.",
      "If Node/npm is missing or older than v22: `brew install node` (macOS) or `nvm install 22 && nvm use 22` (any OS).",
      "If Salesforce CLI is missing: `npm install -g @salesforce/cli` then verify with `sf --version`. If present but older than 2.130.7, run `sf update`.",
      "If Code Puppy times out while installing or upgrading Node/npm or Salesforce CLI, switch to the terminal, run the same install command directly, then return here and re-run the validation commands.",
      "If Salesforce skills are missing: run `npx skills add forcedotcom/sf-skills`, then ask Code Puppy to report the installed skill list.",
      "If no Developer Edition org exists: sign up at developer.salesforce.com/form/signup/freetrial.jsp (free, 2 minutes).",
      "If no orgs are authenticated: `sf org login web` (opens browser for login).",
      "If target org is not set: `sf config set target-org=<your-username>` and `sf alias set acme-trial=<your-username>`.",
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
    mode: "prework",
    driver: "Customer team",
    objective:
      "Create a new participant-owned Salesforce project and make it the folder Code Puppy will build inside.",
    requiredInputs: [
      "Readiness check passed",
      "Code Puppy can open a local folder",
      "Salesforce CLI project generator is available",
    ],
    producedArtifacts: [
      "`~/Desktop/acme-transport-workshop/`",
      "`sfdx-project.json`",
      "`force-app/main/default/`",
      "Project instruction file for Code Puppy",
    ],
    validation: {
      label: "Inspect the new project",
      language: "bash",
      code: `cd ~/Desktop/acme-transport-workshop
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
      "All generated metadata, validation scripts, and dashboard artifacts should land in this project.",
    steps: [
      {
        title: "Prompt: Create the Local Project",
        kind: "prompt",
        language: "text",
        body: `Create a new local Salesforce project for the Acme Transport workshop.

Use this path:
~/Desktop/acme-transport-workshop

Steps:
1. Move to the Desktop with cd ~/Desktop.
2. Create the Salesforce project with sf project generate --name acme-transport-workshop.
3. Move into the new project folder with cd acme-transport-workshop.
4. Confirm sfdx-project.json exists.
5. Confirm force-app/main/default exists.
6. Create a root AGENTS.md file with concise project instructions:
   - Use the default Salesforce target org unless a prompt says otherwise.
   - Keep generated metadata under force-app/main/default.
   - Use the installed Salesforce skills for custom objects, fields, permission sets, LWC, data operations, and deployment.
   - Validate each milestone before moving on.
   - If a live step is blocked, report the exact blocker and preserve generated artifacts.

Stop after the project and AGENTS.md exist. Show me the files you created and the validation commands you ran.`,
        expected:
          "Code Puppy creates a fresh SFDX project and a small project instruction file.",
        produces: "Participant-owned local build workspace.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `cd ~/Desktop/acme-transport-workshop
test -f sfdx-project.json
test -d force-app/main/default
test -f AGENTS.md`,
        expected:
          "The project folder contains Salesforce project metadata and Code Puppy project instructions.",
        produces: "A local project Code Puppy can continue building in.",
      },
    ],
    checkpoint:
      "The participant has a new Salesforce project open in Code Puppy.",
    recovery: [
      "If project generation fails: `mkdir -p ~/Desktop/acme-transport-workshop && cd ~/Desktop/acme-transport-workshop && sf project generate --name . --template standard`.",
      "If the folder already exists: `rm -rf ~/Desktop/acme-transport-workshop && sf project generate --name acme-transport-workshop --output-dir ~/Desktop`.",
      "If Code Puppy is not in the project folder: close and reopen Code Puppy from `cd ~/Desktop/acme-transport-workshop`.",
      "If AGENTS.md was not created: paste the project instructions directly into Code Puppy's next prompt.",
    ],
    takeawayFiles: ["~/Desktop/acme-transport-workshop", "sfdx-project.json", "AGENTS.md"],
  },
  {
    id: "connect-harness",
    number: 3,
    phase: "Harness",
    title: "Connect Code Puppy to Salesforce",
    duration: 6,
    mode: "prework",
    driver: "Facilitator",
    objective:
      "Configure Salesforce MCP so Code Puppy can inspect orgs, deploy metadata, query data, and run validation commands through local Salesforce CLI auth.",
    requiredInputs: [
      "Local Salesforce project open in Code Puppy",
      "Salesforce CLI authenticated",
      "`~/.code_puppy/` writable",
    ],
    producedArtifacts: [
      "`~/.code_puppy/mcp_servers.json`",
      "`~/.code_puppy/mcp_agent_bindings.json`",
      "Confirmed Salesforce MCP tool access",
    ],
    validation: {
      label: "Ask Code Puppy to prove the MCP connection",
      language: "text",
      code: `List the connected Salesforce orgs, the current target org, and the Salesforce MCP tools available to this project.`,
    },
    expectedOutput: [
      "Code Puppy starts the `salesforce-dx` MCP server.",
      "The response lists authorized Salesforce orgs and current target org state.",
      "The available toolsets include orgs, metadata, data, users, and Apex test execution.",
    ],
    nextDependency:
      "All later build prompts depend on Code Puppy reaching Salesforce MCP tools.",
    steps: [
      {
        title: "Prompt: Configure Salesforce MCP",
        kind: "prompt",
        language: "text",
        body: `Configure Salesforce MCP for Code Puppy in this local project.

Use the local Salesforce CLI auth and DEFAULT_TARGET_ORG so the MCP server follows whichever org we set as default.

Create or update:
1. ~/.code_puppy/mcp_servers.json with a salesforce-dx stdio server:
   - command: npx
   - args: -y @salesforce/mcp@latest --orgs DEFAULT_TARGET_ORG --toolsets orgs,metadata,data,users --tools run_apex_test --allow-non-ga-tools
   - timeout: 120
2. ~/.code_puppy/mcp_agent_bindings.json so the code-puppy agent auto-starts salesforce-dx.

Then verify the connection by listing connected Salesforce orgs, the current target org, and available Salesforce MCP tools.

Explain that this runs locally, uses Salesforce CLI auth, and does not grant arbitrary production access beyond the authenticated org.`,
        expected:
          "Code Puppy creates MCP config files and reports Salesforce tool availability.",
        produces: "Local Salesforce MCP bridge for Code Puppy.",
      },
      {
        title: "Validate Before Continuing",
        kind: "prompt",
        language: "text",
        body: `List the connected Salesforce orgs, the current target org, and the Salesforce MCP tools available to this project.`,
        expected:
          "The response confirms Code Puppy can see org and metadata/data/user tools through Salesforce MCP.",
        produces: "Proof that the coding harness can reach Salesforce.",
      },
    ],
    checkpoint:
      "Code Puppy can list Salesforce orgs and MCP toolsets from the local project.",
    recovery: [
      "If MCP startup times out: the first `npx @salesforce/mcp` run downloads packages. Wait 60s and retry the prompt. Run `npx -y @salesforce/mcp@latest --help` in a terminal to pre-cache.",
      "If no org is listed: `sf org login web` then `sf config set target-org=<your-username>`.",
      "If `sf` is not found inside Code Puppy: run `which sf` in terminal to get the path, then relaunch Code Puppy from that same terminal so PATH is inherited.",
      "If `mcp_servers.json` was not created: manually create it with `mkdir -p ~/.code_puppy && cat > ~/.code_puppy/mcp_servers.json` and paste the JSON from the prompt.",
    ],
    takeawayFiles: ["~/.code_puppy/mcp_servers.json", "~/.code_puppy/mcp_agent_bindings.json"],
  },
  {
    id: "transport-foundation",
    number: 4,
    phase: "Foundation",
    title: "Build the Transportation Foundation",
    duration: 13,
    mode: "live",
    driver: "Facilitator",
    objective:
      "Use installed Salesforce skills to create Carrier and Shipment metadata, extend standard Case, deploy, assign access, and seed realistic records.",
    requiredInputs: [
      "Default target org set",
      "Local SFDX project",
      "Metadata tool access through MCP",
    ],
    producedArtifacts: [
      "`Carrier__c` object and fields",
      "`Shipment__c` object and fields",
      "Standard `Case` fields for transportation exceptions",
      "`Carrier Layout` page layout with all carrier fields",
      "`Shipment Layout` page layout with fields in two sections",
      "Case page layout section for transportation fields",
      "Workshop permission set",
      "Sample carriers, shipments, and exception cases",
    ],
    validation: {
      label: "Verify metadata and seed data",
      language: "bash",
      code: `sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Carrier__c','Shipment__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Carrier__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json`,
    },
    expectedOutput: [
      "Carrier__c, Shipment__c, and standard Case are visible.",
      "Carrier records include multiple safety ratings and active/inactive statuses.",
      "Shipment records use a lookup to carriers and sample Cases reference transportation context.",
      "The Case page layout shows the transportation fields in a dedicated section.",
    ],
    nextDependency:
      "The app shell, dashboard, and optional Agentforce lab use the same records and standard Case work object.",
    steps: [
      {
        title: "Prompt: Build the Transportation Data Foundation",
        kind: "prompt",
        language: "text",
        body: `Build the Salesforce transportation foundation in the target org.

Use the installed Salesforce skills for custom objects, fields, page layouts, permission sets, deployment, and data seeding as appropriate. Keep generated metadata under force-app/main/default. If metadata already exists from a previous run, update it idempotently — preserve existing user-created fields, layouts, and permission entries.

Create:
- Carrier__c with MC_Number__c (text), DOT_Number__c (text), Status__c (picklist: Active, Inactive), Safety_Rating__c (picklist: Satisfactory, Conditional, Unsatisfactory), and On_Time_Percentage__c (percent).
- Shipment__c with a lookup to Carrier__c plus Origin__c (text), Destination__c (text), Status__c (picklist: Scheduled, In Transit, Exception, Delivered), Scheduled_Delivery__c (date), Actual_Delivery__c (date), and Weight_lbs__c (number).
- Standard Case custom fields: Carrier__c lookup, Shipment__c lookup, Issue_Type__c picklist (Shortage, Damage, Delay, Billing Dispute), and Transportation_Priority__c picklist (Low, Medium, High, Critical).
- A page layout for Carrier__c named Carrier Layout with all carrier fields visible in a Carrier Details section (MC_Number__c, DOT_Number__c, Status__c, Safety_Rating__c, On_Time_Percentage__c).
- A page layout for Shipment__c named Shipment Layout with fields in two sections: Shipment Details (Carrier__c, Origin__c, Destination__c, Status__c) and Delivery Information (Scheduled_Delivery__c, Actual_Delivery__c, Weight_lbs__c).
- Update the active Case page layout so the four transportation fields are visible in a Transportation Details section. Retrieve the existing Case layout before modifying it. Preserve existing Case layout sections and fields, and report the exact layout file/name you changed.
- A permission set named Acme_Transport_Workshop_Access with object and field access for the generated metadata and standard Case fields.

Deploy safely:
- For dry-run validation, run \`sf project deploy start --dry-run\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the needed metadata.
- Assign the permission set to the current user if possible.

Seed synthetic records (use a consistent prefix like "ACME " on Names so they can be cleaned up later):
- 5 carriers with varied Status__c and Safety_Rating__c values.
- 8 shipments linked to carriers with varied Status__c values — include at least 3 In Transit, 1 Exception, 1 Scheduled, and 1 Delivered so the dashboard and automation module have data to work with.
- 4 Cases linked to carriers/shipments, including at least one high-priority shortage.

Stop after validation. Validate that the seeded shipment status distribution matches the requested minimums. Report files created, Case layout updated, deployment result, record counts, and cleanup guidance.`,
        expected:
          "Code Puppy phases schema, permissions, deployment, and data through the right Salesforce skills.",
        produces: "Transportation data foundation.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Carrier__c','Shipment__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Carrier__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json`,
        expected:
          "Queries return generated objects, seeded carriers, and standard Case transportation records.",
        produces: "Evidence that the next UI and dashboard steps have data.",
      },
    ],
    checkpoint:
      "Metadata is deployed, access exists, and sample records are queryable.",
    recovery: [
      "If deploy fails on the Carrier lookup: confirm Carrier__c deployed, then rerun the Shipment__c field deploy.",
      "If Case field deploy fails: `sf project deploy start --source-dir force-app/main/default/objects/Case` separately, then `sf project deploy start --source-dir force-app/main/default/permissionsets`.",
      "If Case layout deploy fails: retrieve the current Case layout first, add only the Transportation Details section, then deploy that layout file separately.",
      "If permission set assignment fails: `sf org assign permset --name Acme_Transport_Workshop_Access`.",
      "If seed data fails on field errors: `sf sobject describe --sobject Carrier__c --json` to check createable fields, then retry insert with valid fields only.",
      "To verify deployment status: `sf project deploy report --json`.",
    ],
    takeawayFiles: ["force-app/main/default/objects/", "force-app/main/default/layouts/Carrier__c-Carrier Layout.layout-meta.xml", "force-app/main/default/layouts/Shipment__c-Shipment Layout.layout-meta.xml", "force-app/main/default/permissionsets/"],
  },
  {
    id: "salesforce-experience",
    number: 5,
    phase: "Experience",
    title: "Customize the Salesforce Experience",
    duration: 10,
    mode: "live",
    driver: "Customer team",
    objective:
      "Create a dedicated Transportation Workshop Lightning app that makes the generated transportation data visible through app navigation and list views.",
    requiredInputs: [
      "Transportation objects deployed",
      "Seeded Carrier, Shipment, and Case records",
      "Lightning Experience enabled",
    ],
    producedArtifacts: [
      "`Transportation Workshop` Lightning app",
      "`Carrier__c` and `Shipment__c` tabs",
      "Carrier, Shipment, and Case list views",
      "Updated workshop permission set access",
    ],
    validation: {
      label: "Open and inspect the org",
      language: "bash",
      code: `sf org open`,
    },
    expectedOutput: [
      "Users can open App Launcher and find the Transportation Workshop app.",
      "Carriers, Shipments, and Cases are visible in the app navigation.",
      "Carrier, Shipment, and Case list views are reachable from the app tabs.",
      "The app shell is visible and usable before moving to the dashboard module.",
    ],
    nextDependency:
      "The operations dashboard builds on this app shell, navigation, and seeded transportation data.",
    steps: [
      {
        title: "Prompt A: Create the App Shell",
        kind: "prompt",
        language: "text",
        body: `Create the Transportation Workshop app shell for the transportation foundation.

Use these installed Salesforce skill workflows in order:
1. generating-custom-tab for Carrier__c and Shipment__c tabs.
2. generating-list-view for Carrier__c, Shipment__c, and Case list views.
3. generating-lightning-app for the Transportation Workshop app.
4. generating-permission-set for app, tab, object, and field access.
5. deploying-metadata for validation and deploy.

Important safety rules:
- Inspect existing source metadata first.
- Do not create or modify objects or fields in this milestone.
- Use only fields that already exist in the project or target org.
- Prefer deployable, conservative metadata over richer UI metadata that might fail validation.

Build:
- Custom tabs for Carrier__c and Shipment__c.
- Useful list views for Carrier__c, Shipment__c, and Case.
- For list views, use simple AND filters with confirmed fields — avoid OR or complex filter logic.
- For Case list views, do not guess standard list view column metadata names. Inspect or retrieve an existing Case list view first; if valid Case columns cannot be confirmed, omit explicit Case columns and use safe filters only.
- Include a Case list view for open transportation Cases where Issue_Type__c is populated.
- A Lightning app named Transportation Workshop that is active and visible to the current workshop user.
- App navigation items for Carriers, Shipments, and Cases.
- Update Acme_Transport_Workshop_Access so the current user can open the app, see the tabs, access Carrier__c and Shipment__c, and access the Case transportation fields.

Deploy safely:
- For dry-run validation, run \`sf project deploy start --dry-run\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- Keep the deploy scope targeted to only the app shell metadata, and deploy only the required metadata after the dry-run succeeds.
- Assign Acme_Transport_Workshop_Access to the current/default user if possible.
- Treat an existing permission set assignment as success/already assigned.

Stop after deployment or the first blocker. Report app name, tabs created, list views created, permission set assignment result, files deployed, and how to open the app from App Launcher.

Do not stop at deployed metadata; make the app visible and usable by the current workshop user.`,
        expected:
          "Code Puppy creates a discoverable Lightning app shell with tabs, list views, permissions, and current-user access.",
        produces: "Transportation Workshop app shell.",
      },
    ],
    checkpoint:
      "What you now have: a Developer Edition org, a local Salesforce project, generated transportation metadata, seeded records, app navigation, and list views the customer can inspect.",
    recovery: [
      "If list view metadata fails, keep the app and tabs deployed as live proof, then report the exact list view blocker.",
      "If permission assignment fails, report the exact command and error, then provide the permission set name the admin should assign manually.",
      "To open the org and inspect: `sf org open`.",
    ],
    takeawayFiles: [
      "force-app/main/default/applications/Transportation_Workshop.app-meta.xml",
      "force-app/main/default/tabs/",
      "force-app/main/default/objects/*/listViews/",
      "force-app/main/default/permissionsets/Acme_Transport_Workshop_Access.permissionset-meta.xml",
    ],
  },
  {
    id: "operations-dashboard",
    number: 6,
    phase: "Dashboard",
    title: "Add the Operations Dashboard",
    duration: 10,
    mode: "live",
    driver: "Customer team",
    objective:
      "Add a branded Transportation Operations app page with a shipment tracker Lightning Web Component that makes seeded operational data inspectable.",
    requiredInputs: [
      "Transportation Workshop app shell deployed",
      "Seeded Carrier, Shipment, and Case records",
      "Lightning App Builder metadata support in the target org",
    ],
    producedArtifacts: [
      "`shipmentTracker` operations dashboard LWC",
      "`Transportation Operations` Lightning App Page",
      "Transportation Operations first in app navigation",
      "Optional cacheable Apex controller only if needed",
      "Updated workshop permission set access if Apex is created",
    ],
    validation: {
      label: "Open and inspect the dashboard",
      language: "bash",
      code: `sf org open`,
    },
    expectedOutput: [
      "Transportation Operations appears first in the Transportation Workshop app navigation.",
      "`shipmentTracker` renders seeded shipment and Case data.",
      "Dashboard statuses are readable without relying on color alone.",
      "Code Puppy reports whether it used LDS/UI API or Apex and why.",
    ],
    nextDependency:
      "The continuation module uses this dashboard as the visible handoff into deeper UI, data, permission, deployment, and Agentforce lab work.",
    steps: [
      {
        title: "Prompt: Add the Operations Dashboard",
        kind: "prompt",
        language: "text",
        body: `Enhance the existing Transportation Workshop app with an operations dashboard.

Use these installed Salesforce skill workflows in order:
1. generating-lwc-components for the shipmentTracker dashboard component.
2. generating-apex only if the LWC needs a cacheable, with-sharing controller.
3. generating-flexipage for the Transportation Operations app page; do not hand-author FlexiPage XML.
4. generating-lightning-app to add the Transportation Operations page as the first navigation item in the existing Transportation Workshop app.
5. generating-permission-set for Apex access if a controller is created.
6. deploying-metadata for validation and deploy.

Build:
- An LWC named shipmentTracker.
- A Lightning App Page named Transportation Operations.
- Place shipmentTracker on the Transportation Operations app page.
- Add Transportation Operations as the first navigation item in the existing Transportation Workshop app.
- If Apex is created, update Acme_Transport_Workshop_Access so the current user can run the controller.

Make shipmentTracker a small operations dashboard:
- Show KPI cards for total shipments, in transit shipments, exception shipments, and high-priority transportation Cases.
- Show recent or exception Shipment__c records with Carrier__r.Name, Origin__c, Destination__c, Status__c, Scheduled_Delivery__c, and related Case context when available.
- Make Shipment, Carrier, and related Case names clickable so users can navigate to the underlying record. Use Lightning's standard navigation, not hardcoded URLs.
- Use status badges: Delivered green, In Transit amber, Exception red, Scheduled gray.
- Keep the component readable without relying on color alone.
- Use a clean logistics brand: Salesforce blue (#0176D3) primary, neutral accent, and a system font stack (Inter, system-ui).
- Prefer LDS or UI API/wire-friendly patterns when possible. Use Apex only if relationship or aggregate data is not practical through LDS/UI API in this org.

Deploy safely:
- For dry-run validation, run \`sf project deploy start --dry-run\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- Deploy only the required metadata after the dry-run succeeds.

Stop after deployment or the first blocker. Report app page created, component data access pattern, permission set assignment result if applicable, files deployed, and how to open the Transportation Operations page.`,
        expected:
          "Code Puppy adds the dashboard only after the app shell is visible.",
        produces: "Transportation Operations dashboard enhancement.",
      },
    ],
    checkpoint:
      "What you now have: a Developer Edition org, a local Salesforce project, generated transportation metadata, seeded records, app navigation, list views, and an operations dashboard the customer can inspect.",
    recovery: [
      "If LWC deploy fails: `sf project deploy start --source-dir force-app/main/default/lwc/shipmentTracker --json` to see the exact error.",
      "If FlexiPage/App Page deployment fails, keep the app, tabs, list views, and LWC deployed; report the exact blocker and provide the manual App Builder placement path.",
      "If the dashboard LWC runs long, preserve any files already created, keep the app shell as live proof, and report the exact next command to resume.",
      "If permission assignment fails, report the exact command and error, then provide the permission set name the admin should assign manually.",
      "If the component shows no data: `sf data query --query \"SELECT Id, Name, Status__c FROM Shipment__c LIMIT 5\" --json` to confirm records exist. Re-seed if empty.",
      "To open the org and inspect: `sf org open`.",
    ],
    takeawayFiles: [
      "force-app/main/default/flexipages/Transportation_Operations.flexipage-meta.xml",
      "force-app/main/default/lwc/shipmentTracker/",
      "force-app/main/default/permissionsets/Acme_Transport_Workshop_Access.permissionset-meta.xml",
      "Optional Apex only if needed under force-app/main/default/classes/",
    ],
  },
  {
    id: "react-transport-hub",
    number: 7,
    phase: "Custom UI",
    title: "Acme Transport Hub — React on Live Salesforce Data",
    duration: 7,
    mode: "stretch",
    driver: "Facilitator",
    objective:
      "Generate a fully custom, cleanly branded React experience that reads and updates the same Carrier__c and Shipment__c data live from Salesforce — proving a custom UI layer can sit directly on the system of record without JSON, CSV, or middleware.",
    banner: {
      tone: "yellow",
      text:
        "The Salesforce Multi-Framework capability that powers React on Salesforce is in beta until GA on July 9, 2026. Today it runs in Platform trial orgs and sandboxes — native Developer Edition support arrives on the GA date. Sign up for a free Platform trial below, capture your username and password from the activation email, then run the bootstrap prompt to auth the trial, enable Multi-Framework in Setup, deploy the workshop project, and reseed the data.",
      cta: {
        label: "Sign up for a Salesforce Platform trial →",
        href: "https://www.salesforce.com/form/signup/freetrial-platform/?noskip=true",
      },
    },
    requiredInputs: [
      "Carrier__c and Shipment__c metadata deployed and seeded (Milestones 4–6)",
      "A free Salesforce Platform trial org (sign up at salesforce.com/form/signup/freetrial-platform/?noskip=true) — Developer Edition orgs receive Multi-Framework on the Summer 2026 GA date, July 9",
      "A simple brand direction (e.g., Salesforce blue #0176D3 primary, deeper blue accent, Inter / system-ui type stack) so Code Puppy has consistent visual cues",
    ],
    producedArtifacts: [
      "cleanly branded React app (Transport Hub) deployed to the org",
      "KPI tiles, Recent Shipments list, and Carrier Performance views reading live Salesforce data",
      "A reusable prompt the team can rerun against any custom Salesforce data model",
    ],
    validation: {
      label: "Confirm the React app reads live Salesforce records",
      language: "bash",
      code: `# Open the deployed React app
sf org open --path /lightning/n/Transport_Hub --target-org acme-trial

# Pick any non-Delayed shipment and flip it to Delayed, then refresh the React app
sf data query --query "SELECT Name FROM Shipment__c WHERE Status__c != 'Delivered' AND Status__c != 'Delayed' LIMIT 1" --target-org acme-trial --json
# Use the Name from the result above:
sf data update record --sobject Shipment__c --where "Name='<that-name>'" --values "Status__c='Delayed'" --target-org acme-trial`,
    },
    expectedOutput: [
      "Header carries a simple logistics icon and the product name; nav shows Dashboard / Shipments / Carriers.",
      "KPI tiles, recent-shipments table, and carrier performance cards all populate from Carrier__c and Shipment__c records.",
      "Editing a Shipment record in Salesforce and refreshing the React app reflects the change immediately.",
      "No JSON or CSV files are powering the UI — every value rendered comes from a real Salesforce record at the time of render.",
    ],
    nextDependency:
      "The exception automation in Milestone 8 fires against the same Shipment__c records this React experience displays.",
    steps: [
      {
        title: "Prompt: Auth the Trial, Enable Multi-Framework, Deploy, and Seed",
        kind: "prompt",
        language: "text",
        body: `Get my Salesforce Platform trial org set up for the Multi-Framework React beta and deploy this workshop project into it.

Pre-checks (run these and stop if any fail):
- sf --version must be 2.130.7 or newer. If older, run sf update first.
- node --version must be v22 or newer.
- The Multi-Framework CLI plugin must be installed. Run: sf plugins inspect @salesforce/plugin-ui-bundle-dev || sf plugins install @salesforce/plugin-ui-bundle-dev

Step 1 — Auth the Platform trial.
Run sf org login web -a acme-trial -r https://test.salesforce.com -d. The -d flag sets it as my default. Use the test.salesforce.com instance — Platform trial orgs are technically sandboxes, so login.salesforce.com will reject the credentials. Use the credentials from my activation email.

Step 2 — Verify auth.
Run sf org display --target-org acme-trial. Capture and report the username, instance URL, and edition.

Step 3 — Punch me to the React Development setup page (this is the manual enable step).
Run sf org open --path "/lightning/setup/SetupOneHome/home?setupSearch=Salesforce%20Multi-Framework" --target-org acme-trial. On the React Development setup page (or in the Setup search results if it does not auto-open), tell me to:
  a. Click "React Development with Salesforce Multi-Framework" if I am on a search results page.
  b. Click Enable Domain, then Enable to confirm. (This cannot be reversed.)
  c. Then go to Setup → My Domain → Routing and Policies → Edit, and confirm "Require first-party use of Salesforce cookies" is unchecked. Save if you change it.
  d. Come back to Code Puppy and say "done."

Step 4 — Deploy the workshop project into the trial org.
Before the first dry-run, sanitize force-app/main/default/layouts/Case-Case Layout.layout-meta.xml for the fresh trial: remove any layoutItems referencing Case custom fields outside the workshop allowlist {Carrier__c, Shipment__c, Issue_Type__c, Transportation_Priority__c} and any layoutItems referencing custom links, buttons, or actions not present in the local source (check force-app/main/default/objects/Case/webLinks/ and force-app/main/default/quickActions/ for what is actually included). Do not remove standard fields or the four allowed workshop fields.

Then for dry-run validation, run \`sf project deploy start --dry-run --source-dir force-app --target-org acme-trial\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option. If the dry-run still fails with additional missing-metadata references on the Case layout, remove only the offending layoutItem and retry. Once the dry-run succeeds, run sf project deploy start --source-dir force-app --target-org acme-trial. Stop and report any deploy errors verbatim — do not skip metadata.

Step 5 — Assign the permission set.
Run sf org assign permset --name Acme_Transport_Workshop_Access --target-org acme-trial. Assign before seeding so the running user has FLS access to the new fields.

Step 6 — Re-seed the data.
Re-seed using the same approach Module 4 used (sf data create record or an Apex script — whichever the prior run produced). Pass --target-org acme-trial on every command so Carrier__c, Shipment__c, and Case records exist in the trial with varied statuses.

Step 7 — Verify.
Run sf data query --query "SELECT COUNT() FROM Shipment__c" --target-org acme-trial and confirm at least 8 records exist.

Stop and report: the trial username, deploy result, record counts, and any blockers along the way.`,
        expected:
          "Code Puppy authenticates the trial, walks the user through enabling Multi-Framework in Setup, deploys the workshop project, and re-seeds the data.",
        produces: "A Platform trial org (acme-trial) with Multi-Framework enabled, the workshop project deployed, and seed data ready for the React build.",
      },
      {
        title: "Prompt: Generate the Acme Transport Hub React App",
        kind: "prompt",
        language: "text",
        body: `Build a clean React experience called "Acme Transport Hub" that reads live data from this org's Carrier__c and Shipment__c objects. All deploys and queries should target acme-trial (already my default org from the previous prompt).

Before scaffolding, follow both of these as hard requirements:

1. Activate the installed Salesforce UI bundle skills from forcedotcom/sf-skills (preflighted in Module 0): building-ui-bundle-app, generating-ui-bundle-metadata, using-ui-bundle-salesforce-data, building-ui-bundle-frontend, and deploying-ui-bundle. These cover general scaffolding, metadata shape, and deployment. If any are missing, install them with \`npx skills add forcedotcom/sf-skills\` before continuing.

2. Fetch and follow the sf-multiframework skill at https://github.com/dylandersen/sf-multiframework/blob/main/SKILL.md along with its references/activation-checklist.md, references/project-structure.md, references/data-sdk.md, and references/ci-deploy.md. This skill is written specifically for the Multi-Framework React beta — its 11 non-negotiable rules and activation checklist take precedence over general UI bundle patterns where they conflict.

Use a clean logistics brand: Salesforce blue (#0176D3) primary, a deeper blue (#1B5C9C) accent, and Inter / system-ui as the type stack. Keep it minimal and modern.

The app must include:
- A top bar with a simple logistics icon (an inline SVG truck/box icon, or a free icon from Lucide/Heroicons — bundled as a static asset, not hotlinked) and the product name "Acme Transport Hub". Tabs for Dashboard, Shipments, and Carriers.
- A Dashboard view with four KPI tiles: In transit count, Delayed count, Delivered count, and Avg on-time %. Avg on-time % is the average of Carrier__c.On_Time_Percentage__c across all carriers (or computed from Shipment__c records — your call, but document the calculation in code).
- A Recent Shipments table showing the latest five shipments with shipment name, route (Origin__c → Destination__c), carrier name, and status — status rendered as a colored pill.
- A Carrier Performance section showing each Carrier__c with on-time % and a safety rating, rendered as a card with a colored progress bar.
- A Shipments view (full list with status filtering) and a Carriers view (full list).

Data integrity rules:
- Every value rendered in the UI must come from a real Salesforce record at the time of render. No mock data, no JSON files, no CSV files, no hardcoded shipment names.
- Use @salesforce/sdk-data with the GraphQL UI API as the data layer — that is the idiomatic path for a Multi-Framework React app per the sf-multiframework skill. Do not use raw fetch or axios against Salesforce REST.
- If examples in the external sf-multiframework skill conflict with the installed @salesforce/sdk-data TypeScript definitions, follow the installed package types and report the mismatch.
- If a field referenced in the UI (e.g. On_Time_Percentage__c, Safety_Rating__c on Carrier__c) does not exist yet, add it via deploying-metadata before building the UI.
- Respect field-level security and the running user's profile.

Scaffold via sf template generate ui-bundle (per the sf-multiframework skill) so the project structure, ui-bundle.json, and .uibundle-meta.xml are correct from the start.

Deploy safely:
- For dry-run validation, run \`sf project deploy start --dry-run\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the required metadata.

After deployment, smoke test as follows: query for any Shipment__c record whose Status__c is not already Delayed, capture its Name, then update its Status__c to Delayed via sf data update record. Reload the React app and confirm that shipment now appears with the Delayed status. Report which shipment Name was used.

Stop after a successful smoke test or the first blocker. Report the deployed app's URL path, the Carrier__c fields you added or used, the shipment Name used for the smoke test, and the result.`,
        expected:
          "Code Puppy generates and deploys a cleanly branded React app that renders live Carrier__c and Shipment__c data and survives a record-edit smoke test.",
        produces: "Acme Transport Hub React app on live Salesforce data.",
      },
    ],
    checkpoint:
      "What you now have: a fully custom React experience deployed to Salesforce, reading and reflecting Carrier__c and Shipment__c records live. The same data model that powers your Lightning dashboard now powers a fully custom UI — proving Salesforce can be the system of record under any branded experience your team wants to ship.",
    recovery: [
      "Enabling Multi-Framework is a one-time Setup UI toggle on the trial org — there is no Metadata API or CLI equivalent. Code Puppy punches you to the right Setup search with `sf org open --path \"/lightning/setup/SetupOneHome/home?setupSearch=Salesforce%20Multi-Framework\"`.",
      "The 'Enable Domain' toggle on the React Development page cannot be disabled afterwards — that's expected.",
      "If the React app loads but shows no data, confirm 'Require first-party use of Salesforce cookies' is unchecked in My Domain → Routing and Policies. The React beta breaks when this is on.",
      "If brand inference produces something garish or off-tone: pass Salesforce blue (#0176D3) and a deeper blue (#1B5C9C) explicitly in the prompt and ask Code Puppy to use Inter or system-ui as the type stack.",
      "If a referenced field (on-time %, safety rating) is missing on Carrier__c: ask Code Puppy to add it via deploying-metadata before generating the UI, not after.",
      "If the React app deploys but renders empty: `sf data query --query \"SELECT Id, Name, Status__c FROM Shipment__c LIMIT 5\" --target-org acme-trial --json` to confirm seed data exists. If empty, rerun the seeding step from Milestone 4 against acme-trial.",
      "If the trial signup link is rate-limited or rejects your email, try a different work email — Salesforce throttles repeat trial signups from the same address.",
      "If `sf org login web` fails with 'invalid_grant' or rejects your trial credentials: you logged in via login.salesforce.com instead of test.salesforce.com. Platform trial orgs are sandboxes and only accept logins via test.salesforce.com. Re-run with `-r https://test.salesforce.com`.",
    ],
    takeawayFiles: [
      "force-app/main/default/lwc/transportHub/ (or framework-equivalent React app folder)",
      "Reusable React-on-Salesforce prompt the team can adapt to other custom data models",
    ],
  },
  {
    id: "exception-automation",
    number: 8,
    phase: "Automation",
    title: "Automate Exception Case Creation",
    duration: 10,
    mode: "stretch",
    driver: "Facilitator",
    objective:
      "Use the generating-flow skill to build a record-triggered Flow that auto-creates a high-priority transportation Case when a Shipment flips to Exception, owned by a dedicated queue, and watch the shipmentTracker KPI update live.",
    requiredInputs: [
      "Module 7 bootstrap complete — acme-trial has Modules 4-6 metadata deployed and seeded",
      "Acme_Transport_Workshop_Access permission set assigned in acme-trial",
      "At least one Shipment__c record in acme-trial with Status__c = In Transit",
    ],
    producedArtifacts: [
      "`Transportation Exceptions` queue (`Transportation_Exceptions`)",
      "`Shipment_Exception_To_Case` active record-triggered Flow",
    ],
    validation: {
      label: "Verify the Flow is active and triggers a Case",
      language: "bash",
      code: `sf data query --query "SELECT ApiName, Label, IsActive, TriggerType FROM FlowDefinitionView WHERE ApiName='Shipment_Exception_To_Case'" --target-org acme-trial --json
sf data update record --sobject Shipment__c --where "Status__c='In Transit'" --values "Status__c='Exception'" --target-org acme-trial
sf data query --query "SELECT CaseNumber, Subject, Priority, Issue_Type__c, Transportation_Priority__c, Owner.Name, Owner.Type, Shipment__c, Carrier__c FROM Case ORDER BY CreatedDate DESC LIMIT 3" --target-org acme-trial --json`,
    },
    expectedOutput: [
      "`FlowDefinitionView` returns `IsActive = true` for `Shipment_Exception_To_Case`.",
      "Flipping a Shipment to Exception creates a new Case automatically.",
      "Case has `Priority = High`, `Issue_Type__c = Delay`, `Transportation_Priority__c = Critical`.",
      "`Owner.Name = 'Transportation Exceptions'` and `Owner.Type = 'Queue'`.",
      "The `shipmentTracker` high-priority Case KPI increments.",
    ],
    nextDependency:
      "The continue-building module uses this automation as one of the suggested continuation paths.",
    steps: [
      {
        title: "Prompt: Automate Exception Case Creation",
        kind: "prompt",
        language: "text",
        body: `Add a record-triggered Flow automation to the Transportation Workshop project. Target the acme-trial org (the same trial where the React Transport Hub was deployed in Module 7) so the Flow runs against the same data the Lightning dashboard and React app already render. Pass --target-org acme-trial on every sf command.

Use the installed Salesforce skills for deploying-metadata and generating-flow as appropriate.

Before building anything, inspect the org and local project metadata to confirm the correct API names for Shipment__c fields and the valid picklist values for Status__c. Use Exception as the trigger value if it exists. If Exception is not a valid Status__c value, stop and report the blocker instead of guessing.

First, run sf org display --target-org acme-trial --json and create a Case-supporting queue named Transportation Exceptions (developer name Transportation_Exceptions). Add the current user as a queue member so Cases routed to it are visible in their queue list views. Deploy the queue before building the Flow.

Then build an active, record-triggered after-save Flow named Shipment_Exception_To_Case on Shipment__c that fires when Status__c changes to Exception.

The Flow should:
- Check whether a Case where Status != 'Closed' already exists for the triggering Shipment before creating anything — if one exists, stop. This keeps the demo clean across repeated runs.
- Look up the Transportation Exceptions queue by querying Group where DeveloperName = 'Transportation_Exceptions' and Type = 'Queue', so no org Id is hardcoded.
- Create a new Case owned by that queue, linked to the triggering Shipment and its Carrier, with Priority = High, Issue_Type__c = Delay, Transportation_Priority__c = Critical, Status = New, and a subject that includes the shipment name, Origin__c, and Destination__c.

Also make sure the Shipment record page is usable for testing. It should show Status__c, Carrier__c, Origin__c, Destination__c, Scheduled_Delivery__c, Actual_Delivery__c, and Weight_lbs__c, and make related Cases easy to see. Update the Shipment page layout if sufficient, or create a Shipment Lightning Record Page if not.

Deploy safely:
- For dry-run validation, run \`sf project deploy start --dry-run --target-org acme-trial\` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the new and changed metadata required for this milestone — the queue, the Flow, and any Shipment page or layout changes.

After deployment, smoke test the automation: find a Shipment without an open Case, flip its Status to Exception, and confirm a new Case is created and owned by the Transportation Exceptions queue. Then flip the same Shipment to Exception again and confirm no second Case is created. Refreshing the Acme Transport Hub from Module 7 should show the new Case context immediately.

Stop after a successful smoke test or the first blocker. Report the queue deployment result, flow file path and activation state, Shipment page changes, smoke test Shipment, created Case Id, and any blockers.`,
        expected:
          "Code Puppy creates the queue, builds the Flow via generating-flow, and deploys both as active metadata.",
        produces: "Transportation Exceptions queue and Shipment_Exception_To_Case Flow.",
      },
      {
        title: "Validate Before Continuing",
        kind: "verify",
        language: "bash",
        body: `sf data query --query "SELECT ApiName, Label, IsActive, TriggerType FROM FlowDefinitionView WHERE ApiName='Shipment_Exception_To_Case'" --target-org acme-trial --json
sf data update record --sobject Shipment__c --where "Status__c='In Transit'" --values "Status__c='Exception'" --target-org acme-trial
sf data query --query "SELECT CaseNumber, Subject, Priority, Issue_Type__c, Transportation_Priority__c, Owner.Name, Owner.Type, Shipment__c, Carrier__c FROM Case ORDER BY CreatedDate DESC LIMIT 3" --target-org acme-trial --json`,
        expected:
          "Flow is active, a new Case is created with Priority High, owner is the Transportation Exceptions queue.",
        produces: "Live automation evidence that ticks the dashboard KPI.",
      },
    ],
    checkpoint:
      "What you now have: an active record-triggered Flow that auto-creates a high-priority Case owned by the Transportation Exceptions queue whenever a Shipment flips to Exception. One Salesforce write now propagates to two surfaces — the Lightning shipmentTracker dashboard from Module 6 and the Acme Transport Hub React app from Module 7 — without any middleware.",
    recovery: [
      "If the queue deploy fails on username mismatch: remove the <queueMembers> block from Transportation_Exceptions.queue-meta.xml and redeploy — membership is not required for OwnerId assignment.",
      "If the Flow's Get Records / OwnerId step fails: remove the Get_Queue step and OwnerId assignment so the Case defaults to the running user, then redeploy.",
      "If the Flow will not activate: deploy Inactive, then activate with `sf data update record --sobject Flow --where \"DeveloperName='Shipment_Exception_To_Case'\" --values \"Status='Active'\" --target-org acme-trial`.",
      "If record-triggered Flow is blocked in this org: stop and report the exact error — do not substitute Apex.",
      "To open the org and verify the queue: `sf org open --target-org acme-trial` then navigate to Setup > Queues.",
    ],
    takeawayFiles: [
      "force-app/main/default/queues/Transportation_Exceptions.queue-meta.xml",
      "force-app/main/default/flows/Shipment_Exception_To_Case.flow-meta.xml",
    ],
  },
  {
    id: "continue-building",
    number: 9,
    phase: "Bonus",
    title: "Keep Building",
    duration: 5,
    mode: "stretch",
    driver: "Everyone",
    objective:
      "Ask Code Puppy to inspect what was built and suggest what to build next — returning ready-to-paste prompts for each idea so participants can keep going immediately.",
    requiredInputs: [
      "Participant-owned local project",
      "Generated metadata and dashboard evidence",
      "Developer Edition org or documented blocker",
    ],
    producedArtifacts: [
      "Next Code Puppy prompts",
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
      "Participants know which Code Puppy prompt to run next.",
      "Participants can describe what they built and what they should continue after the call.",
    ],
    nextDependency:
      "This is the handoff into POC work against real-world transportation use cases.",
    steps: [
      {
        title: "Prompt: What Should We Keep Building?",
        kind: "prompt",
        language: "text",
        body: `Look at this local Salesforce project and tell me what else we could build using the installed Salesforce skills.

Review the files in force-app/main/default and the current org state, then suggest three or four ideas that would make this Transportation Workshop project more useful or impressive. For each idea, name the skill you'd use and give me a ready-to-paste prompt I can run right now to start it.

The skills available are:
- generating-lwc-components and generating-flexipage for new dashboard views or record pages.
- generating-flow for additional automation — alerts, escalations, or status transitions.
- handling-sf-data for richer seed data or domain-realistic workflow examples.
- generating-permission-set for tightening access.
- running-apex-tests and running-code-analyzer for quality checks if Apex was created.
- developing-agentforce for an AI agent that can answer questions about shipments and exceptions.

Pick the ideas that would have the most visible impact and feel natural as next steps from what's already built. Return each idea as: what it does, which skill builds it, and a prompt I can paste directly into Code Puppy to start.`,
        expected:
          "Code Puppy inspects the project and returns 3–4 ideas with copy-paste prompts, each grounded in the skills and what's already deployed.",
        produces: "A personal build menu with ready-to-run prompts.",
      },
      {
        title: "Validate Before Closing",
        kind: "manual",
        language: "bash",
        body: `find force-app/main/default -maxdepth 3 -type f | sort
git status --short`,
        expected:
          "Participants can see generated files in their own local project.",
        produces: "Durable participant-owned workspace.",
      },
    ],
    checkpoint:
      "Code Puppy has inspected the project and returned a personal build menu — 3–4 ideas grounded in what's already deployed, each with a copy-paste prompt ready to run. Participants leave with a project they own, a working org, and their next build already scoped.",
    recovery: [
      "To see what was built: `find force-app/main/default -maxdepth 3 -type f | sort` shows all generated metadata files.",
      "To check org state: `sf org display --json` and `sf data query --query \"SELECT QualifiedApiName FROM EntityDefinition WHERE QualifiedApiName LIKE '%__c'\" --json`.",
      "For Agentforce, use labs/agentforce-extensions.md after the workshop instead of adding agent build work to the live chain.",
      "If time ran out: the hosted app at the workshop URL remains the prompt reference. Their local project and org persist indefinitely.",
    ],
    takeawayFiles: ["force-app/main/default/", "AGENTS.md", "labs/"],
  },
];

export const totalWorkshopMinutes = milestones.reduce((sum, milestone) => sum + milestone.duration, 0);
export const liveWorkshopMinutes = milestones
  .filter((milestone) => milestone.mode === "live")
  .reduce((sum, milestone) => sum + milestone.duration, 0);
