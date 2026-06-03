# 03 Build the Operations Foundation

Prompt: build the operations data foundation.

```text
Build the Salesforce operations foundation in the target org.

Use these installed Salesforce skill workflows in order:
1. generating-custom-object for custom objects.
2. generating-custom-field for custom fields.
3. generating-permission-set for object and field access.
4. deploying-metadata for dry-run and deploy.
5. handling-sf-data for seed records.

Create:
- Partner__c with MC_Number__c, DOT_Number__c, Status__c, Safety_Rating__c, and On_Time_Percentage__c.
- Delivery__c with a lookup to Partner__c plus Origin__c, Destination__c, Status__c, Scheduled_Delivery__c, Actual_Delivery__c, and Weight_lbs__c.
- Standard Case custom fields: Partner__c lookup, Delivery__c lookup, Issue_Type__c picklist (Shortage, Damage, Delay, Billing Dispute), and Operations_Priority__c picklist (Low, Medium, High, Critical).
- Update the active Case page layout so the four operations fields are visible in a Operations Details section. Preserve existing Case layout sections and fields, and report the exact layout file/name you changed.
- A permission set named Headless_Workshop_Access with object and field access for the generated metadata and standard Case fields.

Deploy safely:
- Run a dry-run first.
- Deploy only the needed metadata after the dry-run succeeds.
- Assign the permission set to the current user if possible.

Seed synthetic records:
- 5 partners with varied status and safety ratings.
- 8 deliveries linked to partners.
- 4 Cases linked to partners/deliveries, including at least one high-priority shortage.

Stop after validation. Report files created, Case layout updated, deployment result, record counts, and cleanup guidance.
```

Validation:

```bash
sf data query --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Partner__c','Delivery__c','Case')" --json
sf data query --query "SELECT Name, Status__c, Safety_Rating__c FROM Partner__c LIMIT 5" --json
sf data query --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" --json
```
