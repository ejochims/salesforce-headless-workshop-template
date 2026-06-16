# 06 Acme Transport Hub — React on Live Salesforce Data

Use this module after the Transportation Operations dashboard is deployed and seeded with Carrier__c and Shipment__c records.

> **Note on availability.** This milestone uses the Salesforce Multi-Framework capability that allows custom React experiences to deploy directly to a Salesforce org. As of June 2026 the beta runs in **Platform trial orgs** (Enterprise, Unlimited, and Developer editions in production); native Developer Edition workshop orgs receive it on the Summer '26 GA on **July 9, 2026**. For Thursday, sign up for a free Platform trial and enable Multi-Framework there. Prereqs: **Salesforce CLI v2.130.7+** (`sf update` if older) and **Node.js v22+**.

## Step 1 — Sign up for a Platform trial (manual, one time)

Sign up at **https://www.salesforce.com/form/signup/freetrial-platform/?noskip=true** and follow the activation email to set your password. Capture the username and password — you'll auth to it from Code Puppy in the next step.

The official setup reference is here: https://developer.salesforce.com/docs/platform/code-builder/guide/reactdev-setup.html

## Bootstrap prompt — auth, enable Multi-Framework, deploy, seed

```text
Get my Salesforce Platform trial org set up for the Multi-Framework React beta and deploy this workshop project into it.

Pre-checks (run these and stop if any fail):
- sf --version must be 2.130.7 or newer. If older, run sf update first.
- node --version must be v22 or newer.
- The Multi-Framework CLI plugin must be installed. Run: sf plugins inspect @salesforce/plugin-ui-bundle-dev || sf plugins install @salesforce/plugin-ui-bundle-dev

Step 1 — Auth the Platform trial.
Run sf org login web -a acme-trial -r https://test.salesforce.com -d. The -d flag sets it as my default. Use the test.salesforce.com instance — Platform trial orgs are technically sandboxes, so login.salesforce.com will reject the credentials. Use the credentials from my activation email.

(The "acme-trial" alias is just a friendly local name for the org — name it however you like.)

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

Then for dry-run validation, run `sf project deploy start --dry-run --source-dir force-app --target-org acme-trial` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option. If the dry-run still fails with additional missing-metadata references on the Case layout, remove only the offending layoutItem and retry. Once the dry-run succeeds, run `sf project deploy start --source-dir force-app --target-org acme-trial`. Stop and report any deploy errors verbatim — do not skip metadata.

Step 5 — Assign the permission set.
Run `sf org assign permset --name Acme_Transport_Workshop_Access --target-org acme-trial`. Assign before seeding so the running user has FLS access to the new fields.

Step 6 — Re-seed the data.
Re-seed using the same approach Module 4 used (sf data create record or an Apex script — whichever the prior run produced). Pass --target-org acme-trial on every command so Carrier__c, Shipment__c, and Case records exist in the trial with varied statuses.

Step 7 — Verify.
Run `sf data query --query "SELECT COUNT() FROM Shipment__c" --target-org acme-trial` and confirm at least 8 records exist.

Stop and report: the trial username, deploy result, record counts, and any blockers along the way.
```

## Confirm the trial is ready

```bash
sf org list --all --json
sf data query --query "SELECT COUNT() FROM Shipment__c" --target-org acme-trial --json
sf data query --query "SELECT COUNT() FROM Carrier__c" --target-org acme-trial --json
```

## Main prompt — generate the Acme Transport Hub React app

```text
Build a clean React experience called "Acme Transport Hub" that reads live data from this org's Carrier__c and Shipment__c objects. All deploys and queries should target acme-trial (already my default org from the previous prompt).

Before scaffolding, follow both of these as hard requirements:

1. Activate the installed Salesforce UI bundle skills from forcedotcom/sf-skills (preflighted in Module 0): building-ui-bundle-app, generating-ui-bundle-metadata, using-ui-bundle-salesforce-data, building-ui-bundle-frontend, and deploying-ui-bundle. These cover general scaffolding, metadata shape, and deployment. If any are missing, install them with `npx skills add forcedotcom/sf-skills` before continuing.

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
- For dry-run validation, run `sf project deploy start --dry-run` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the required metadata.

After deployment, smoke test as follows: query for any Shipment__c record whose Status__c is not already Delayed, capture its Name, then update its Status__c to Delayed via sf data update record. Reload the React app and confirm that shipment now appears with the Delayed status. Report which shipment Name was used.

Stop after a successful smoke test or the first blocker. Report the deployed app's URL path, the Carrier__c fields you added or used, the shipment Name used for the smoke test, and the result.
```

## Validate the live-data refresh

```bash
sf org open --path /lightning/n/Transport_Hub --target-org acme-trial

# In a second terminal — pick any non-Delayed shipment and flip it to Delayed:
sf data query --query "SELECT Name FROM Shipment__c WHERE Status__c != 'Delivered' AND Status__c != 'Delayed' LIMIT 1" --target-org acme-trial --json
sf data update record --sobject Shipment__c --where "Name='<name-from-above>'" --values "Status__c='Delayed'" --target-org acme-trial

# Refresh the React app and confirm that shipment now shows the Delayed status.
```

## Recovery

- Enabling Multi-Framework is a one-time Setup UI toggle on the trial org — there is no Metadata API or CLI equivalent. Code Puppy punches you to the right Setup search with `sf org open --path "/lightning/setup/SetupOneHome/home?setupSearch=Salesforce%20Multi-Framework"`.
- The "Enable Domain" toggle on the React Development page **cannot be disabled afterwards** — that's expected.
- If the React app loads but shows no data, confirm "Require first-party use of Salesforce cookies" is unchecked in My Domain → Routing and Policies. The React beta breaks when this is on.
- If brand inference produces something garish or off-tone: pass Salesforce blue (#0176D3) and a deeper blue (#1B5C9C) explicitly in the prompt and ask Code Puppy to use Inter or system-ui as the type stack.
- If a referenced field (on-time %, safety rating) is missing on Carrier__c: ask Code Puppy to add it via deploying-metadata before generating the UI, not after.
- If the React app deploys but renders empty: `sf data query --query "SELECT Id, Name, Status__c FROM Shipment__c LIMIT 5" --target-org acme-trial --json` to confirm seed data exists. If empty, rerun the seeding step from Milestone 4 against acme-trial.
- If the trial signup link is rate-limited or rejects your email, try a different work email; Salesforce throttles repeat trial signups from the same address.
- If `sf org login web` fails with "invalid_grant" or rejects your trial credentials: you logged in via login.salesforce.com instead of test.salesforce.com. Platform trial orgs are sandboxes and only accept logins via test.salesforce.com. Re-run with `-r https://test.salesforce.com`.
