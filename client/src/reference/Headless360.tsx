import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { Intro, KeyValueList, ReferenceStack } from "./WhatIsMCP";

export function Headless360() {
  return (
    <ReferenceStack>
      <Intro
        title="Headless 360"
        body="Salesforce becomes an addressable platform from the tools Acme Logistics engineers already use. coding agent is the local coding harness; Salesforce MCP is the bridge; the Developer Edition org is the build target."
      />

      <KeyValueList
        items={[
          { label: "Developers", desc: "Build metadata, data, UI, and agent assets from coding agent." },
          { label: "Business tools", desc: "The same idea extends to governed access from chat and collaboration surfaces." },
          { label: "Agent-to-agent", desc: "Agentforce can later connect with internal systems such as The Brain." },
          { label: "No AWS lock-in", desc: "The workshop keeps the Acme Logistics GCP constraint explicit." },
        ]}
      />

      <CodeBlock code={`npx -y @salesforce/mcp@latest --help`} lang="bash" title="Inspect the Salesforce MCP server" />
    </ReferenceStack>
  );
}
