# 01 Create a Local Salesforce Project

Prompt: create the local project.

```text
Create a new local Salesforce project for the Acme Logistics workshop.

Use this path:
~/Desktop/salesforce-headless-workshop

Steps:
1. Move to the Desktop with cd ~/Desktop.
2. Create the Salesforce project with sf project generate --name salesforce-headless-workshop.
3. Move into the new project folder with cd salesforce-headless-workshop.
4. Confirm sfdx-project.json exists.
5. Confirm force-app/main/default exists.
6. Create a root AGENTS.md file with concise project instructions:
   - Use the default Salesforce target org unless a prompt says otherwise.
   - Keep generated metadata under force-app/main/default.
   - Use the installed Salesforce skills for custom objects, fields, permission sets, LWC, data operations, deployment, and Agentforce.
   - Validate each milestone before moving on.
   - If a live step is blocked, report the exact blocker and preserve generated artifacts.

Stop after the project and AGENTS.md exist. Show me the files you created and the validation commands you ran.
```

Validation:

```bash
cd ~/Desktop/salesforce-headless-workshop
test -f sfdx-project.json
test -d force-app/main/default
test -f AGENTS.md
```
