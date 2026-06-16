# Deployment Hardening Labs

## Lab 1: Dependency Inventory

Ask Code Puppy to summarize generated metadata and dependency order.

## Lab 2: Validation Deploy

Run a validation deployment before promoting to a shared org.

```bash
sf project deploy validate --source-dir force-app --target-org acme-trial
```

## Lab 3: Demo Definition of Done

Before a demo build is called complete:

- Apex tests pass where applicable.
- Metadata deploys with zero errors.
- Agent preview handles the core utterances.
- Any Agentforce test suite runs if present.
