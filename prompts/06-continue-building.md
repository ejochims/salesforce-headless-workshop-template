# 06 Keep Building

Use this module at the end of the session once milestones 4–6 (and optionally 7) are visible in the org.

## What participants now have

- Developer Edition org connected to Salesforce CLI.
- Local Salesforce project with generated metadata under `force-app/main/default`.
- Transportation custom objects, standard Case transportation fields, permissions, and sample records.
- Transportation Workshop app shell, tabs, list views, and operations dashboard.
- Optionally: `Transportation Exceptions` queue and `Shipment_Exception_To_Case` record-triggered Flow.

## What they could build next

- Additional dashboard views or role-specific LWC pages.
- Additional automation — escalation flows, notification triggers, or status transitions.
- Richer seed data or domain-realistic transportation workflow examples.
- Permission hardening and sharing checks.
- Apex tests and code analyzer runs if Apex was created.
- An Agentforce agent that answers questions about shipments and exceptions (`labs/agentforce-extensions.md`).

## Prompt: What Should We Keep Building?

```text
Look at this local Salesforce project and tell me what else we could build using the installed Salesforce skills.

Review the files in force-app/main/default and the current org state, then suggest three or four ideas that would make this Transportation Workshop project more useful or impressive. For each idea, name the skill you'd use and give me a ready-to-paste prompt I can run right now to start it.

The skills available are:
- generating-lwc-components and generating-flexipage for new dashboard views or record pages.
- generating-flow for additional automation — alerts, escalations, or status transitions.
- handling-sf-data for richer seed data or domain-realistic workflow examples.
- generating-permission-set for tightening access.
- running-apex-tests and running-code-analyzer for quality checks if Apex was created.
- developing-agentforce for an AI agent that can answer questions about shipments and exceptions.

Pick the ideas that would have the most visible impact and feel natural as next steps from what's already built. Return each idea as: what it does, which skill builds it, and a prompt I can paste directly into Code Puppy to start.
```
