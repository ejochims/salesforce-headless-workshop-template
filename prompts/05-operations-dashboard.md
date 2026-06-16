# 05 Add the Operations Dashboard

Use this module after the Transportation Workshop app shell is visible in App Launcher.

## Prompt: Add the Transportation Operations Dashboard

```text
Enhance the existing Transportation Workshop app with an operations dashboard.

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
- For dry-run validation, run `sf project deploy start --dry-run` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- Deploy only the required metadata after the dry-run succeeds.

Stop after deployment or the first blocker. Report app page created, component data access pattern, permission set assignment result if applicable, files deployed, and how to open the Transportation Operations page.
```

Validation:

```bash
sf org open
```

Then open Transportation Workshop, confirm Transportation Operations is the first navigation item, and confirm `shipmentTracker` renders seeded shipment and Case data.

Expected files:

- `force-app/main/default/flexipages/Transportation_Operations.flexipage-meta.xml`
- `force-app/main/default/lwc/shipmentTracker/shipmentTracker.html`
- `force-app/main/default/lwc/shipmentTracker/shipmentTracker.js`
- `force-app/main/default/lwc/shipmentTracker/shipmentTracker.css`
- `force-app/main/default/lwc/shipmentTracker/shipmentTracker.js-meta.xml`
- `force-app/main/default/permissionsets/Acme_Transport_Workshop_Access.permissionset-meta.xml`
- Optional Apex only if needed under `force-app/main/default/classes/`

Success criteria:

- Transportation Operations appears first in the app navigation.
- `shipmentTracker` is placed on the Transportation Operations app page.
- `shipmentTracker` renders seeded shipment and Case data.
- Statuses are visually distinct and still readable without color alone.
- Code Puppy reports whether it used LDS/wire or Apex and why.

If Code Puppy asks whether to create Apex, answer:

```text
Prefer LDS or UI API/wire patterns if they can safely retrieve the needed Shipment__c data. Use Apex only if the query requires relationship handling that is not practical through LDS/UI API in this org.
```

Fallback prompt:

```text
The dashboard LWC or FlexiPage path is taking too long. Preserve any files already created. Keep the Transportation Workshop app shell, Carrier__c and Shipment__c tabs, and Carrier__c, Shipment__c, and Case list views as the live visual proof. Report the component or app page blocker, the permission set assignment result if applicable, and the exact next command or manual App Builder placement path to resume later.
```
