# 07 Automate Exception Case Creation

Use this module after the Transportation Operations dashboard is visible. It introduces the `generating-flow` skill and produces a live automation that attendees can trigger on stage.

## Prompt: Automate Exception Case Creation

```text
Add a record-triggered Flow automation to the Transportation Workshop project. Target the acme-trial org (the same trial where the React Transport Hub was deployed in Module 7) so the Flow runs against the same data the Lightning dashboard and React app already render. Pass --target-org acme-trial on every sf command.

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
- For dry-run validation, run `sf project deploy start --dry-run --target-org acme-trial` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the new and changed metadata required for this milestone — the queue, the Flow, and any Shipment page or layout changes.

After deployment, smoke test the automation: find a Shipment without an open Case, flip its Status to Exception, and confirm a new Case is created and owned by the Transportation Exceptions queue. Then flip the same Shipment to Exception again and confirm no second Case is created. Refreshing the Acme Transport Hub from Module 7 should show the new Case context immediately.

Stop after a successful smoke test or the first blocker. Report the queue deployment result, flow file path and activation state, Shipment page changes, smoke test Shipment, created Case Id, and any blockers.
```

## Validation

```bash
sf data query --query "SELECT ApiName, Label, IsActive, TriggerType FROM FlowDefinitionView WHERE ApiName='Shipment_Exception_To_Case'" --target-org acme-trial --json
sf data update record --sobject Shipment__c --where "Status__c='In Transit'" --values "Status__c='Exception'" --target-org acme-trial
sf data query --query "SELECT CaseNumber, Subject, Priority, Issue_Type__c, Transportation_Priority__c, Owner.Name, Owner.Type, Shipment__c, Carrier__c FROM Case ORDER BY CreatedDate DESC LIMIT 3" --target-org acme-trial --json
```

The final query confirms `Owner.Type = 'Queue'` and `Owner.Name = 'Transportation Exceptions'`. The `shipmentTracker` dashboard KPI for high-priority transportation Cases increments.

## Expected files

- `force-app/main/default/queues/Transportation_Exceptions.queue-meta.xml`
- `force-app/main/default/flows/Shipment_Exception_To_Case.flow-meta.xml`

No permission-set change is required. Record-triggered Flows run in system context, and the Case transportation fields are already covered by `Acme_Transport_Workshop_Access`.

## Success criteria

- `FlowDefinitionView` query returns `IsActive = true` for `Shipment_Exception_To_Case`.
- Flipping a `Shipment__c` record to `Status__c = Exception` creates a new `Case` automatically.
- The new Case has `Priority = High`, `Issue_Type__c = Delay`, `Transportation_Priority__c = Critical`.
- `Owner.Name = 'Transportation Exceptions'` and `Owner.Type = 'Queue'`.
- The `shipmentTracker` dashboard exception and high-priority Case KPIs reflect the change.

---

## Fallback prompt

Use this prompt only if the main prompt hits a blocker. Work through the rungs in order and stop as soon as one succeeds.

```text
The exception automation encountered a blocker. Preserve all metadata already created and work through these recovery rungs in order. Stop at the first rung that succeeds and report which rung resolved it.

Rung 1 — Queue deploy fails (username mismatch or member error):
Remove the <queueMembers> block from Transportation_Exceptions.queue-meta.xml so the queue has no explicit members, then redeploy the queue. Queue membership is only needed for list-view visibility; the Flow's OwnerId assignment works without it.

Rung 2 — Flow Get Records / OwnerId step fails:
Remove the Get_Queue Get Records step and the OwnerId assignment from the Create_Exception_Case step. Create the Case without setting OwnerId (it defaults to the running user context). Update the Flow and redeploy.

Rung 3 — Flow will not activate:
Deploy the Flow with status Inactive. Report the exact activation command:
  sf data update record --sobject Flow --where "DeveloperName='Shipment_Exception_To_Case'" --values "Status='Active'" --target-org acme-trial
and the manual path: Setup > Flows > Shipment_Exception_To_Case > Activate.

Rung 4 — Record-triggered Flow is blocked in this org:
Do not create Apex as a replacement. Stop here and report the exact error, the org limitation, and the next command to resume when unblocked.

After each rung, report: which rung was used, what was preserved, the exact error and offending file or step, and the next command to resume.
```
