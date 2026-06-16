# 04 Customize the Salesforce Experience

Run this milestone before the dashboard module. Validate the app shell before moving on.

## Prompt: Create the Transportation Workshop App Shell

```text
Create the Transportation Workshop app shell for the transportation foundation.

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
- For dry-run validation, run `sf project deploy start --dry-run` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- Keep the deploy scope targeted to only the app shell metadata, and deploy only the required metadata after the dry-run succeeds.
- Assign Acme_Transport_Workshop_Access to the current/default user if possible.
- Treat an existing permission set assignment as success/already assigned.

Stop after deployment or the first blocker. Report app name, tabs created, list views created, permission set assignment result, files deployed, and how to open the app from App Launcher.

Do not stop at deployed metadata; make the app visible and usable by the current workshop user.
```

Validation after Prompt A:

```bash
sf org open
```

Then open App Launcher, search Transportation Workshop, and confirm Carriers, Shipments, and Cases are visible in the app navigation with useful list views.

Live-call checkpoint:

```text
What you now have: a Developer Edition org, a local Salesforce project, generated transportation metadata, seeded records, app navigation, and list views the customer can inspect.
```

If list view metadata runs long, deploy the app and tabs as live proof, then preserve list view files as stretch work.

Expected files:

- `force-app/main/default/applications/Transportation_Workshop.app-meta.xml`
- `force-app/main/default/tabs/Carrier__c.tab-meta.xml`
- `force-app/main/default/tabs/Shipment__c.tab-meta.xml`
- `force-app/main/default/objects/*/listViews/*.listView-meta.xml`
- `force-app/main/default/permissionsets/Acme_Transport_Workshop_Access.permissionset-meta.xml`

Success criteria:

- Transportation Workshop appears in App Launcher for the current user.
- Carriers, Shipments, and Cases are visible in the app navigation.
- Carrier, Shipment, and Case list views deploy and are reachable from the app tabs.

Fallback prompt:

```text
The app shell or list view path is taking too long. Preserve any files already created. Keep the Transportation Workshop app shell and Carrier__c and Shipment__c tabs as the live visual proof. Report the list view or permission blocker, the permission set assignment result if applicable, and the exact next command to resume later.
```
