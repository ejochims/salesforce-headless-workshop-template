# Customizing This Workshop for Another Account Team

This repo is a working fictional Acme Logistics example, not a fully generic template. Use it as a reference implementation, then adapt the customer, use case, branding, prompts, validation, and Salesforce artifacts for the next account team.

The fastest path is to keep the app structure and replace the customer-specific story. Do not refactor the app into a full config-driven framework until a few account teams have reused it and the repeatable change points are clear.

## Fork or Light Edit

Use a **fork or new repo** when:

- The customer, industry, data model, or live-build flow changes.
- The account team will maintain its own copy.
- You need different branding assets, Heroku app metadata, auth defaults, or generated Salesforce artifact names.
- The workshop may be shared externally or with a different customer team.

Use a **light edit on a branch** when:

- You are only tuning talk track or timing for this same fictional workshop.
- The Salesforce objects, app names, prompts, and validation scripts stay the same.
- You are preparing a short-lived internal variant.

## Discovery Inputs

Collect these before asking a coding agent to adapt the workshop:

| Input | Example |
|---|---|
| Customer | Procter and Gamble |
| Account team owner | AE, SE, DSE, or specialist driving the session |
| Business unit | Oral care, supply chain, advertising, contact center |
| Primary workflow | Field visit prep, partner support, case deflection, retail execution |
| Agentic coding tool | Cursor, Claude Code, Codex, internal harness, or neutral "coding agent" |
| Salesforce products | Platform, Sales Cloud, Service Cloud, Data Cloud, Agentforce |
| Primary data model | Accounts, dentists, visits, products, cases |
| Live-build artifacts | Objects, fields, list views, LWC, Flow, Agentforce spec |
| Branding | Customer logo, Salesforce logo, partner/harness logo, color notes |
| Production-readiness angle | Governance, identity, audit, workflow, compliance, deployment |
| Deploy target | Local only, Heroku, internal static host, customer demo environment |
| Credentials policy | Whether production auth is needed and who owns env vars |

## Coding-Agent Adaptation Prompt

Paste this into the coding agent that will adapt the workshop:

```text
You are adapting this Salesforce Headless Workshop repo for a new customer workshop.

First, inspect the repo before editing. Identify every scenario-specific reference to Acme Logistics, operations, coding agent, Partner, Delivery, Operations Support Assistant, Headless_Workshop_Access, and related brand assets.

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

Keep the app structure. Do not introduce a new framework or config system unless the current repo already supports it.

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
- Run rg for old customer, old workflow, old objects, old app names, old permission set names, and old assistant names.
- Run npm run build.
- Inspect the landing page, milestone flow, reference drawer, and wrap-up locally.
- Confirm no credentials, private notes, or customer-confidential artifacts are committed.

Report the files changed, validation output, remaining customer-specific terms if any, and recommended next review steps.
```

## Find and Replace Map

Use this as a planning map, not a blind global replacement. Review every change in context.

| Current Acme Logistics term | Replace with |
|---|---|
| Acme Logistics | New customer name |
| Acme Logistics operations | Customer business unit or workshop audience |
| coding agent | Customer coding harness, or neutral "coding agent" |
| Headless 360 Workshop | New workshop name |
| Operations Workshop | New Salesforce app name |
| Operations Console | New Lightning app page name |
| Partner__c | New primary custom object |
| Delivery__c | New secondary custom object |
| Operations Support Assistant | New Agentforce assistant name |
| Operations_Support_Assistant | New assistant API name |
| Headless_Workshop_Access | New permission set API name |
| salesforce-headless-workshop | New local Salesforce project folder |
| partner / delivery / operations case | New domain nouns |

## Files to Update

### App Content

- `client/src/content/exercises.ts`: milestone definitions, prompts, validation, recovery, artifacts, drivers, and timing.
- `client/src/content/talking-points.ts`: presenter notes by section.
- `client/src/content/headlessStrategy.ts`: strategy map and customer takeaways.
- `client/src/content/diagrams.ts`: ERD, architecture, and agent diagrams.
- `client/src/content/evidenceReport.ts`: exported evidence report title and closing guidance.

### App Shell and Reference Panels

- `client/src/components/BrandHeader.tsx`: logos, header title, subtitle.
- `client/src/sections/00-Landing.tsx`: hero title, shared control surface copy, summary language.
- `client/src/sections/05-WrapUp.tsx`: handoff copy, artifact names, next modules.
- `client/src/reference/*`: MCP, customer infrastructure, Headless 360, skills, and setup explanations.
- `client/index.html`: page title and social metadata.

### Prompt and Continuation Material

- `prompts/`: milestone prompt source files.
- `labs/`: post-workshop continuation modules.
- `scripts/validate-*.sh`: validation commands and object/permission names.

### Branding, Server, and Deploy

- `public/assets/brand/`: customer and harness logos.
- `server/index.ts`: login page title, logo pairing, default `SITE_USER` if needed.
- `app.json`: app name and description.
- `Procfile`: normally unchanged.
- `README.md`: overview, workshop flow, and customer-specific notes.
- `AGENTS.md`: project-specific build rules.

## Validation Checklist

Before presenting the adapted workshop:

- Run targeted searches:

```bash
rg -n "Acme Logistics|Operations|coding agent|Partner|Delivery|Operations Support Assistant|Headless_Workshop_Access|salesforce-headless-workshop" .
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
  - All milestone cards
  - Prompt copy buttons
  - Reference drawer tabs
  - Wrap-up and evidence export
  - Mobile layout for header and drawer

- Confirm the generated Salesforce artifact names are valid API names.
- Confirm validation scripts match the new object and permission names.
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

Do not start there unless the customization work repeats. The current priority is a reusable, understandable example that another account team can adapt quickly.
