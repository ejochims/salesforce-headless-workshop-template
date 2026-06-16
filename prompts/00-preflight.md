# 00 Set Up Salesforce Environment

If Code Puppy is not installed, get it from the Code Puppy GitHub repo:
https://github.com/mpfaffenberger/code_puppy

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
uvx code-puppy
```

```powershell
# Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uvx code-puppy
```

Prompt: prepare the Salesforce workstation.

```text
Set up this machine for Salesforce development. Check each prerequisite and fix anything that is missing. Ask me before running interactive commands like browser logins.

1. Node/npm: Run node --version and npm --version. Node must be 20+. If missing or too old, install Node 20 with the appropriate method for this OS (brew install node on macOS, or nvm install 20) and verify.
2. Salesforce CLI: Run sf --version. If missing, install with npm install -g @salesforce/cli, then verify.
3. Salesforce skills: Check whether the Salesforce skills are installed and available to this Code Puppy workspace. I need these skill workflows available before the workshop build starts:
   - generating-custom-object
   - generating-custom-field
   - generating-permission-set
   - generating-lwc-components
   - generating-flexipage
   - generating-list-view
   - deploying-metadata
   - handling-sf-data
   - running-apex-tests
   - running-code-analyzer
   - building-ui-bundle-app
   - building-ui-bundle-frontend
   - generating-ui-bundle-metadata
   - using-ui-bundle-salesforce-data
   - deploying-ui-bundle
   If any are missing, install or sync the Salesforce skills from https://github.com/forcedotcom/sf-skills by running npx skills add forcedotcom/sf-skills, then re-check and report the final installed list.
4. Salesforce Developer account and auth: Run sf org list --all. If no orgs appear, tell me to sign up for a free Salesforce Developer Edition at https://developer.salesforce.com/form/signup/freetrial.jsp, then run sf org login web so I can authenticate in the browser.
5. Target org: Run sf config get target-org --json. If no target org is set, set my authenticated org as the default with sf config set target-org=<my-username> and create an alias with sf alias set acme-trial=<my-username>.

After each fix, re-verify before moving to the next step. When everything passes, confirm this machine is ready to build on Salesforce.
```

Expected evidence:

- Node 20+ and npm print versions.
- Salesforce CLI prints a version.
- Code Puppy confirms the Salesforce skill workflows are installed or synced.
- At least one authenticated Developer Edition org is visible.
- Target org is set and ready for metadata deploys.
