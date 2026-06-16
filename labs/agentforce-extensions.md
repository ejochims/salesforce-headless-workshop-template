# Agentforce Extension Labs

Use these modules after the live hour from the participant-owned local Salesforce project. Agentforce work should continue from the approved Carrier Support Assistant Agent Spec.

## Lab 1: Build the Approved Authoring Bundle

Prompt:

```text
Build the approved Carrier Support Assistant Agent Spec.

Use the developing-agentforce workflow:
1. Confirm target org with sf config get target-org --json.
2. Validate Agentforce prerequisites for the selected agent type.
3. Generate the authoring bundle with sf agent generate authoring-bundle --json --no-spec --name "Carrier Support Assistant" --api-name Carrier_Support_Assistant.
4. Edit the generated .agent file only after reading the generated bundle.
5. Generate or reuse backing logic for carrier lookup, shipment lookup, and Case creation.
6. Validate with sf agent validate authoring-bundle --json --api-name Carrier_Support_Assistant.
7. Preview with --use-live-actions and report trace-based evidence.

Do not publish or activate unless explicitly approved.
```

Validation:

- `sf agent validate authoring-bundle --json --api-name Carrier_Support_Assistant` succeeds.
- Live preview routes to the intended subagent.
- Trace evidence confirms the expected action behavior.

## Lab 2: Add Tests

Prompt:

```text
Create an Agentforce test suite for Carrier Support Assistant. Include happy path carrier lookup, shipment shortage, missing data, no matching carrier, off-topic handling, and Case creation recommendation examples.
```

Validation:

- Test spec deploys.
- Results show routing and answer quality.

## Lab 3: Harden Access

Prompt:

```text
Create or update a permission set for workshop users with access to Carrier__c, Shipment__c, standard Case transportation fields, shipmentTracker, and any Agentforce Employee Agent access needed for preview.
```

Validation:

- Permission set deploys.
- Assigned user can see records and run the agent preview.

## Lab 4: Package the POC

Prompt:

```text
Create a deployment plan that promotes the generated metadata from this project to a shared sandbox. Include validation commands, permission set assignment, data seeding strategy, Agentforce publish/activate gates, and rollback notes.
```

Validation:

- Metadata is grouped by dependency order.
- Deploy commands and test commands are explicit.
