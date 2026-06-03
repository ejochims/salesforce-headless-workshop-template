# 05 Preview the Operations Support Assistant

Use this as an optional Agentforce preview after the Operations Workshop app is visible. The workshop still succeeds if this module stops at a reviewable Agent Spec or an exact org capability blocker.

Prompt A: design the Agent Spec.

```text
Design an Agentforce Agent Script agent for this workshop. Do not write or deploy the agent yet.

Agent name: Operations Support Assistant
API name: Operations_Support_Assistant

Purpose:
Help an Acme Logistics operations user answer partner or driver support questions, look up partner and delivery context, and create a standard Salesforce Case when a support question becomes operational work.

Use the developing-agentforce workflow:
1. Scan this project for existing objects, Apex, flows, prompt templates, and Agentforce bundles.
2. Recommend Employee Agent for live preview. Note Service Agent as stretch if Experience Cloud/partner portal setup is available.
3. Create an Agent Spec first with purpose, behavioral intent, subagents, actions/backing logic, variables, gating logic, environment prerequisites, and preview plan.
4. Include actions for partner lookup, delivery lookup, and Case preparation/creation. Mark backing logic as EXISTS or NEEDS STUB.
5. Include the proof utterance: "A delivery from Denver to Phoenix arrived short. Find the partner, check related delivery context, and prepare a high-priority shortage case."

Stop after the Agent Spec and ask for approval before generating or editing Agentforce files. Do not publish or activate anything.
```

Proof utterance:

```text
A delivery from Denver to Phoenix arrived short. Find the partner, check related delivery context, and prepare a high-priority shortage case.
```

Prompt B: build the Agentforce preview, only after Agent Spec approval, Agentforce prerequisite validation, and enough remaining room time.

```text
Build the approved Operations Support Assistant Agent Spec.

Follow the Agentforce Agent Script workflow:
1. Confirm target org with sf config get target-org --json.
2. Validate Agentforce prerequisites for the selected agent type.
3. Generate the authoring bundle with sf agent generate authoring-bundle --json --no-spec --name "Operations Support Assistant" --api-name Operations_Support_Assistant.
4. Edit the generated .agent file only after reading the generated bundle.
5. Generate or reuse backing logic for partner lookup, delivery lookup, and Case creation.
6. Validate with sf agent validate authoring-bundle --json --api-name Operations_Support_Assistant.
7. Deploy only the required metadata.
8. Start preview with sf agent preview start --json --use-live-actions --authoring-bundle Operations_Support_Assistant.
9. Send the proof utterance and report trace-based evidence of routing and action behavior.

Do not publish or activate unless explicitly approved.
```

Expected files or artifacts:

- Agent Spec in markdown or the generated Agentforce spec location coding agent chooses.
- If stretch generation is approved: files under `force-app/main/default/aiAuthoringBundles/` or the generated Agent Script bundle path.
- Any backing Apex/Flow/Prompt Template files explicitly marked as `EXISTS`, `CREATED`, or `NEEDS STUB`.

Success criteria:

- Agent Spec exists before bundle generation.
- The selected agent type and preview path are justified.
- The proof utterance is included.
- The workshop can stop here without publishing, activating, or deploying an agent.
- Publish and activation remain gated behind explicit human approval.

If coding agent asks which agent type to use, answer:

```text
Use Employee Agent for the live workshop preview. Note Service Agent or external partner portal setup as a stretch path only.
```

Fallback prompt:

```text
Agentforce capability is blocked in this org. Stop before generating bundle files. Preserve the Agent Spec, name the exact missing capability or CLI error, and route the remaining work to labs/agentforce-extensions.md.
```
