# Salesforce Headless Workshop Project Rules

This project is a fictional Acme Logistics workshop that builds Salesforce metadata and an Agentforce assistant through a local coding agent.

## Workshop Definition of Done

For each milestone:

1. Read the relevant prompt under `prompts/`.
2. Use Salesforce MCP or the Salesforce CLI against the default target org.
3. Produce the artifact listed in the workshop app.
4. Run the validation command in the app or `scripts/`.
5. Report the output and any blocker before moving to the next milestone.

## Salesforce Build Rules

- Use the default target org unless the prompt explicitly names a different org.
- Keep generated metadata under `force-app/main/default/`.
- Prefer deployable metadata over browser-only configuration when practical.
- If a live step is blocked, document the exact blocker and use the fallback path.
- Preserve the artifact chain: org -> context -> objects/data -> UI -> agent -> stretch labs.

## Agentforce Demo Build Guardrail

Do not call the demo complete unless deployment and validation succeed. If Agentforce activation cannot be completed live, stop at a clear generated artifact and route the remaining work to `labs/agentforce-extensions.md`.
