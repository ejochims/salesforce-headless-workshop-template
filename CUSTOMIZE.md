# Customizing This Workshop for Your Scenario

This repo ships an "Acme Transport" reference scenario — a generic logistics example with carriers, shipments, and exception cases. It's deliberately built to be forked and rebranded for whatever customer or vertical you're walking into.

The fastest path is to keep the app structure (8 milestones, presenter UI, validation gates, recovery rungs) and replace only the customer-specific story. Don't refactor into a fully config-driven framework until you've adapted it for two or three different scenarios and the repeating change points are obvious.

## Fork or light edit

Use a **fork or new repo** when:

- The customer, industry, data model, or live-build flow changes.
- A specific account team will maintain its own copy.
- You need different branding assets, Heroku app metadata, auth defaults, or generated Salesforce artifact names.
- The workshop will be shared externally or with a different customer team.

Use a **light edit on a branch** when:

- You're tuning talk track or timing for the same Acme Transport scenario.
- The Salesforce objects, app names, prompts, and validation scripts stay the same.
- You're preparing a short-lived internal variant.

## Discovery inputs

Collect these before asking a coding agent to adapt the workshop:

| Input | Example |
|---|---|
| Customer | Procter and Gamble |
| Account team owner | AE, SE, DSE, or specialist driving the session |
| Business unit | Oral care, supply chain, advertising, contact center |
| Primary workflow | Field visit prep, carrier support, case deflection, retail execution |
| Agentic coding tool | Code Puppy, Cursor, Claude Code, Codex, internal harness |
| Salesforce products | Platform, Sales Cloud, Service Cloud, Data Cloud, Agentforce |
| Primary data model | Accounts, dentists, visits, products, cases |
| Live-build artifacts | Objects, fields, list views, LWC, Flow, custom React UI, operations dashboard |
| Branding | Customer logo, Salesforce logo, partner/harness logo, color notes |
| Production-readiness angle | Governance, identity, audit, workflow, compliance, deployment |
| Deploy target | Local only, Heroku, internal static host, customer demo environment |
| Credentials policy | Whether production auth is needed and who owns env vars |

## Coding-agent adaptation prompt

Paste this into the coding agent that will adapt the workshop:

```text
You are adapting this Salesforce Headless Workshop repo for a new customer scenario. The current scenario is Acme Transport (carriers, shipments, exception cases).

First, inspect the repo before editing. Identify every scenario-specific reference to Acme Transport, Carrier__c, Shipment__c, Acme_Transport_Workshop_Access, the acme-trial org alias, and related brand cues.

Use these new workshop inputs:
- Customer:
- Account team owner:
- Business unit:
- Primary workflow:
- Agentic coding tool or neutral term:
- Salesforce products in scope:
- Primary data model:
- Live-build artifacts:
- Branding assets and colors:
- Production-readiness angle:
- Deploy target:

Keep the app structure (8 milestones with the same modes: prework, live, bonus). Keep the dry-run guardrail and recovery-rung patterns in each prompt. Do not introduce a new framework or config system unless the current repo already supports it.

Update:
- App title, landing copy, header subtitle, metadata, and auth/login copy.
- Milestone titles, objectives, prompts, validation commands, recovery paths, artifacts, and takeaway text.
- Reference drawer copy and diagrams.
- Prompt files in prompts/.
- Continuation labs in labs/.
- Validation scripts in scripts/.
- Brand assets in public/assets/brand/.
- Heroku/app metadata and production auth defaults if needed.

Use Salesforce deployable metadata patterns and preserve the milestone validation style. If a live step is blocked, keep the fallback path explicit.

Before finishing:
- Run rg for old customer, old workflow, old objects, old app names, old permission set names, and any leftover Acme references.
- Run npm run build.
- Inspect the landing page, milestone flow, reference drawer, and wrap-up locally.
- Confirm no credentials, private notes, or customer-confidential artifacts are committed.

Report the files changed, validation output, remaining scenario-specific terms if any, and recommended next review steps.
```

## Find and replace map

Use this as a planning map, not a blind global replacement. Review every change in context.

| Current Acme Transport term | Replace with |
|---|---|
| Acme Transport | New customer or scenario name |
| Acme Transport Hub | New custom React app name |
| Salesforce Headless Workshop | New workshop name |
| Code Puppy | Customer coding harness, or neutral "coding agent" |
| Transportation Workshop | New Salesforce app name |
| Transportation Operations | New Lightning app page name |
| Carrier__c | New primary custom object |
| Shipment__c | New secondary custom object |
| Acme_Transport_Workshop_Access | New permission set API name |
| acme-transport-workshop | New local Salesforce project folder |
| acme-trial | New Platform trial org alias |
| Transportation_Exceptions | New queue developer name |
| Shipment_Exception_To_Case | New record-triggered Flow name |
| carrier / shipment / transportation case | New domain nouns |

## Files to update

### App content

- `client/src/content/exercises.ts` — milestone definitions, prompts, validation, recovery, artifacts, drivers, timing.
- `client/src/content/talking-points.ts` — presenter notes by section.
- `client/src/content/headlessStrategy.ts` — strategy map and customer takeaways.
- `client/src/content/diagrams.ts` — ERD, architecture, and agent diagrams.
- `client/src/content/evidenceReport.ts` — exported evidence report title and closing guidance.

### App shell and reference panels

- `client/src/components/BrandHeader.tsx` — logos, header title, subtitle.
- `client/src/sections/00-Landing.tsx` — hero title, shared control surface copy, summary language.
- `client/src/sections/05-WrapUp.tsx` — handoff copy, artifact names, next modules.
- `client/src/reference/*` — MCP, customer infrastructure, Headless 360, skills, and setup explanations.
- `client/src/theme.ts` — `brandPrimary` and `brandAccent` color tokens.
- `client/index.html` — page title and social metadata.

### Prompt and continuation material

- `prompts/` — milestone prompt source files (00 → 07, plus the React variant `06-react-transport-hub.md`).
- `labs/` — post-workshop continuation modules.
- `scripts/validate-*.sh` — validation commands and object/permission names.

### Branding, server, and deploy

- `public/assets/brand/` — customer and harness logos.
- `server/index.ts` — login page title, logo pairing, default `SITE_USER` if needed.
- `app.json` — app name and description.
- `Procfile` — normally unchanged.
- `README.md` — overview, workshop flow, customer-specific notes.
- `CASE_STUDY.md` — replace with your own outcome story.
- `AGENTS.md` — project-specific build rules.

## Validation checklist

Before presenting the adapted workshop:

- Run targeted searches:

```bash
rg -n "Acme|Transport|Carrier|Shipment|Acme_Transport_Workshop_Access|acme-trial" .
```

- Run the production build:

```bash
npm run build
```

- Inspect locally:

```bash
npm run dev
```

- In the browser, check:
  - Landing page
  - All eight milestone cards
  - Prompt copy buttons
  - Reference drawer tabs
  - Wrap-up and evidence export
  - Mobile layout for header and drawer

- Confirm the generated Salesforce artifact names are valid API names.
- Confirm validation scripts match the new object and permission names.
- Confirm the React milestone (Module 7) still references the right Platform trial signup link and `test.salesforce.com` auth pattern.
- Confirm no credentials, customer-private meeting notes, or internal-only URLs are committed.
- Confirm any customer logos or screenshots are approved for the intended audience.

## Recommended V2

After two or three customer variants, consider extracting a small `workshop.config.ts` for:

- Customer name and audience
- Harness name and logo
- Workshop title and subtitle
- Salesforce app/page/object/permission names
- Milestone timing
- Brand colors and assets

Don't start there unless the customization work repeats. The current priority is a reusable, understandable example that another account team can adapt quickly.
