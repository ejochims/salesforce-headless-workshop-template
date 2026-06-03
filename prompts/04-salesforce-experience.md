# 04 Customize the Salesforce Experience

Run this milestone in two passes. Paste Prompt A first, validate the app shell, then paste Prompt B only after the Operations Workshop app is visible.

## Prompt A: Create the Operations Workshop App Shell

```text
Create the Operations Workshop app shell for the operations foundation.

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

Do not stop at deployed metadata; make the app visible and usable by the current workshop user.
```

Validation after Prompt A:

```bash
sf org open
```

Then open App Launcher, search Operations Workshop, and confirm Partners, Deliverys, and Cases are visible in the app navigation with useful list views.

## Prompt B: Add the Operations Dashboard

Paste this only after Prompt A validates:

```text
Enhance the existing Operations Workshop app with an operations dashboard.

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

Stop after deployment or the first blocker. Report app page created, component data access pattern, permission set assignment result if applicable, files deployed, and how to open the Operations Console page.
```

Validation after Prompt B:

```bash
sf org open
```

Then open Operations Workshop, confirm Operations Console is the first navigation item, and confirm deliveryTracker renders seeded delivery and Case data.

Live-call checkpoint:

```text
What you now have: a Developer Edition org, a local Salesforce project, generated operations metadata, seeded records, app navigation, list views, and an operations dashboard the customer can inspect.

For a one-hour call, this is the primary live win. The Agentforce module can remain a next-step preview if time is tight.
```

If the dashboard LWC runs long, deploy the app, tabs, and list views as live proof, then preserve LWC files as stretch work.

Expected files:

- `force-app/main/default/applications/Operations_Workshop.app-meta.xml`
- `force-app/main/default/flexipages/Operations_Operations.flexipage-meta.xml`
- `force-app/main/default/tabs/Partner__c.tab-meta.xml`
- `force-app/main/default/tabs/Delivery__c.tab-meta.xml`
- `force-app/main/default/lwc/deliveryTracker/deliveryTracker.html`
- `force-app/main/default/lwc/deliveryTracker/deliveryTracker.js`
- `force-app/main/default/lwc/deliveryTracker/deliveryTracker.css`
- `force-app/main/default/lwc/deliveryTracker/deliveryTracker.js-meta.xml`
- `force-app/main/default/objects/*/listViews/*.listView-meta.xml`
- `force-app/main/default/permissionsets/Headless_Workshop_Access.permissionset-meta.xml`
- Optional Apex only if needed under `force-app/main/default/classes/`

Success criteria:

- Operations Workshop appears in App Launcher for the current user.
- Partners, Deliverys, and Cases are visible in the app navigation after Prompt A.
- Partner, Delivery, and Case list views deploy and are reachable from the app tabs.
- Operations Console appears first in the app navigation after Prompt B.
- `deliveryTracker` is placed on the Operations Console app page after Prompt B.
- Statuses are visually distinct and still readable without color alone.
- coding agent reports whether it used LDS/wire or Apex and why.

If coding agent asks whether to create Apex, answer:

```text
Prefer LDS or UI API/wire patterns if they can safely retrieve the needed Delivery__c data. Use Apex only if the query requires relationship handling that is not practical through LDS/UI API in this org.
```

Fallback prompt:

```text
The dashboard LWC or FlexiPage path is taking too long. Preserve any files already created. Keep the Operations Workshop app shell, Partner__c and Delivery__c tabs, and Partner__c, Delivery__c, and Case list views as the live visual proof. Report the component or app page blocker, the permission set assignment result if applicable, and the exact next command or manual App Builder placement path to resume later.
```
