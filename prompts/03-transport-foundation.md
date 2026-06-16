# 03 Build the Transportation Foundation

Prompt: build the transportation data foundation.

```text
Build the Salesforce transportation foundation in the target org.

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
- For dry-run validation, run `sf project deploy start --dry-run` directly. Do not use a deploy wrapper unless it exposes a true checkOnly/dry-run option.
- After the dry-run succeeds, deploy only the needed metadata.
- Assign the permission set to the current user if possible.

Seed synthetic records (use a consistent prefix like "ACME " on Names so they can be cleaned up later):
- 5 carriers with varied Status__c and Safety_Rating__c values.
- 8 shipments linked to carriers with varied Status__c values — include at least 3 In Transit, 1 Exception, 1 Scheduled, and 1 Delivered so the dashboard and automation module have data to work with.
- 4 Cases linked to carriers/shipments, including at least one high-priority shortage.

Stop after validation. Validate that the seeded shipment status distribution matches the requested minimums. Report files created, page layouts deployed, deployment result, record counts, and cleanup guidance.
```

Validation:

```bash
sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Carrier__c','Shipment__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Carrier__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json
```
