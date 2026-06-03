# 02 Connect coding agent to Salesforce

Prompt: configure Salesforce MCP from the new local Salesforce project.

```text
Configure Salesforce MCP for coding agent in this local project.

Use the local Salesforce CLI auth and DEFAULT_TARGET_ORG so the MCP server follows whichever org we set as default.

Create or update:
1. A local MCP server config file with a salesforce-dx stdio server:
   - command: npx
   - args: -y @salesforce/mcp@latest --orgs DEFAULT_TARGET_ORG --toolsets orgs,metadata,data,users --tools run_apex_test --allow-non-ga-tools
   - timeout: 120
2. A local agent binding so the coding agent auto-starts salesforce-dx.

Then verify the connection by listing connected Salesforce orgs, the current target org, and available Salesforce MCP tools.

Explain that this runs locally, uses Salesforce CLI auth, and does not grant arbitrary production access beyond the authenticated org.
```

Expected evidence:

- coding agent starts `salesforce-dx`.
- The current Salesforce target org appears.
- Toolsets include orgs, metadata, data, users, and Apex test execution.
