import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { Intro, KeyValueList, ReferenceStack } from "./WhatIsMCP";

export function Headless360() {
  return (
    <ReferenceStack>
      <Intro
        title="Headless 360"
        body="Salesforce becomes an addressable platform from the tools your engineers already use. Code Puppy is the local coding harness; Salesforce MCP is the bridge; the Developer Edition org is the build target."
      />

      <KeyValueList
        items={[
          { label: "Developers", desc: "Build metadata, data, UI, and agent assets from Code Puppy." },
          { label: "Business tools", desc: "The same idea extends to governed access from chat and collaboration surfaces." },
          { label: "Agent-to-agent", desc: "Agentforce can later connect with internal systems such as The Brain." },
          { label: "Cloud-portable", desc: "The harness runs locally and the org is the only deployed surface — no specific cloud is required." },
        ]}
      />

      <CodeBlock code={`npx -y @salesforce/mcp@latest --help`} lang="bash" title="Inspect the Salesforce MCP server" />
    </ReferenceStack>
  );
}
