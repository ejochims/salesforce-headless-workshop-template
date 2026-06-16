# Case Study: Shipping This Workshop to a Fortune 1 Retailer

## Context

In June 2026, this workshop was developed and live-validated for a Fortune 1 retailer's engineering organization that runs an internal agentic coding harness backed by Anthropic models. The customer's senior engineering leadership wanted concrete proof that Salesforce could serve as the system of record under any custom UI their teams want to ship — without bolting in middleware or accepting cloud lock-in for their front-end runtime.

The session was scoped tight: an hour of live build, no slides, against a real org. Most of the heavy lifting needed to happen in pre-work so the live room could focus on the part that actually demos.

## Outcome

- An end-to-end build path rebuilt and hardened against live agent runs.
- A working React-on-Salesforce experience using the Multi-Framework beta, reading live `Carrier__c` and `Shipment__c` records via `@salesforce/sdk-data` and the GraphQL UI API.
- A record-triggered Flow that propagates one Salesforce write to two surfaces (Lightning dashboard + custom React app) with no middleware.
- A reusable prompt library that survived solo testing end to end and is now ready for an enterprise audience.

## What I iterated on

**Scratch-org → Platform trial pivot.** The original plan was to run the React milestone against a scratch org. The Multi-Framework beta isn't available there yet — Developer Edition support arrives at Summer '26 GA (July 9, 2026). Rather than waiting, I rewrote the milestone around a free Salesforce Platform trial org. That meant teaching the workshop to handle the `test.salesforce.com` auth pattern (Platform trials are technically sandboxes, so `login.salesforce.com` rejects them) and adding a Setup-UI punch URL for the one-time Multi-Framework enablement toggle.

**`UIBundleSettings.webAppOptIn` casing.** When the React app rendered empty after deploy, the recovery path turned out to be a casing detail in the `UIBundleSettings` metadata combined with the "Require first-party use of Salesforce cookies" My Domain toggle. I documented both as recovery rungs in the prompt rather than burying them in a runbook somewhere — the workshop has to survive its first re-runner.

**Layout sanitization for repeat builders.** Repeat workshop runs against fresh trial orgs failed dry-run on `Case-Case Layout.layout-meta.xml` because earlier runs left layoutItems referencing custom links and quick actions that don't exist on a clean org. I added a layoutItem allowlist into the bootstrap prompt — the agent now sanitizes the layout against `{Carrier__c, Shipment__c, Issue_Type__c, Transportation_Priority__c}` plus the standard Case fields before the first dry-run.

**FLS-before-seed ordering.** The seeding step was failing intermittently with "field not writeable" errors because the permission set was getting assigned after the seed Apex/CLI calls. Reordering so `sf org assign permset` runs immediately after deploy and before any record creation made the seed step deterministic.

**SDK-doc TypeScript drift.** The external Multi-Framework skill's example code drifted slightly from the installed `@salesforce/sdk-data` TypeScript definitions during the beta. I added an explicit rule to the prompt — when external docs and installed types disagree, follow the installed types and report the mismatch — so the agent doesn't regenerate broken code based on stale examples.

**Prompt-as-test-harness.** Each milestone's prompt now ends with an explicit smoke-test step (e.g., "find any non-Delayed Shipment, flip its Status, refresh the React app, confirm propagation"). The validation isn't an afterthought — it's the last instruction in the prompt itself. That kept the workshop honest as I iterated.

## Tech stack

- Salesforce Multi-Framework React (beta), `@salesforce/sdk-data` + GraphQL UI API
- Code Puppy (open-source agent harness, [`mpfaffenberger/code_puppy`](https://github.com/mpfaffenberger/code_puppy))
- [`forcedotcom/sf-skills`](https://github.com/forcedotcom/sf-skills) — the official Salesforce skill library covering objects, fields, list views, LWC, FlexiPage, Flow, deploy, and data
- [`dylandersen/sf-multiframework`](https://github.com/dylandersen/sf-multiframework) — React-beta-specific skill with the 11 non-negotiable rules and activation checklist
- React 18 + Vite + TypeScript microsite for the workshop itself, served via Express on any Node host

## What I'd do differently

- **Vendor the `dylandersen/sf-multiframework` skill into the repo.** Today the prompt fetches it from GitHub at run time. That's fine for stable network but adds a dependency I'd rather control — especially behind enterprise proxies.
- **Add a Cases tab to the React app.** The Flow milestone produces a Case as the headline artifact, but the React app only renders Carriers and Shipments. Closing that loop visually would tighten the demo by another 30 seconds.
- **Cache the Multi-Framework CLI plugin install.** The `sf plugins install @salesforce/plugin-ui-bundle-dev` step is the slowest part of the bootstrap. Pre-baking it into a workshop Docker image (or detecting it earlier in preflight) would cut a minute off the live cold-start.

---

[**Try the live demo →**](https://salesforce-headless-workshop-17750d05ecdb.herokuapp.com/) · [Back to README](./README.md)
