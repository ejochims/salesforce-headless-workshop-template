import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { colors, layout } from "../theme";
import { Intro, ReferenceStack } from "./WhatIsMCP";

const setupScript = `# Install prerequisites
npm install -g @salesforce/cli

# Sign up at https://developer.salesforce.com/form/signup/freetrial.jsp
# Then authenticate:
sf org login web

# Set as default target org
sf config set target-org=<your-username>
sf alias set acme-trial=<your-username>

# Create local project
sf project generate --name acme-transport-workshop
cd acme-transport-workshop`;

const codePuppyMacLinux = `# Install uv if needed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Start Code Puppy
uvx code-puppy`;

const codePuppyWindows = `# Install uv if needed
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Start Code Puppy
uvx code-puppy`;

export function ScratchOrgSetup() {
  return (
    <ReferenceStack>
      <Intro
        title="Salesforce Setup Basics"
        body="Step 0 confirms Code Puppy is available and a Salesforce org exists before the build starts. This workshop uses a free Developer Edition org, but Code Puppy can connect to any org supported by Salesforce CLI authentication when the team has the right permissions and deployment guardrails."
      />

      <CodeBlock code={`https://github.com/mpfaffenberger/code_puppy`} lang="text" title="Code Puppy GitHub Repo" />
      <CodeBlock code={codePuppyMacLinux} lang="bash" title="Install Code Puppy on macOS / Linux" />
      <CodeBlock code={codePuppyWindows} lang="powershell" title="Install Code Puppy on Windows" />
      <CodeBlock code={`https://developer.salesforce.com/form/signup/freetrial.jsp`} lang="text" title="Sign up for a free Salesforce Developer Edition org" />
      <CodeBlock code={setupScript} lang="bash" title="Developer Edition setup commands" />

      <div style={{ display: "grid", gap: "10px" }}>
        {[
          ["Code Puppy", "The local coding harness used for the workshop. If you do not have it installed, get it from https://github.com/mpfaffenberger/code_puppy."],
          ["Salesforce CLI", "The local command-line tool Code Puppy uses to authenticate, deploy metadata, and query data."],
          ["Developer Edition", "A free, permanent Salesforce org for building and testing. Sign up at https://developer.salesforce.com/form/signup/freetrial.jsp."],
          ["Target org", "The default org that CLI and Salesforce MCP commands operate against."],
          ["Metadata", "Files under force-app/main/default that define objects, fields, permissions, LWC, and app pages."],
          ["Permission set", "The deployable access artifact that makes generated fields, objects, and app assets usable."],
          ["Operations dashboard", "The Lightning app page and LWC that make the generated transportation records visible in the org."],
        ].map(([label, desc]) => (
          <div
            key={label}
            style={{
              padding: "12px 14px",
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: layout.radiusSm,
              fontSize: "13px",
              color: colors.text,
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: colors.ink }}>{label}:</strong> {desc}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "14px 16px",
          background: colors.yellowBg,
          border: "1px solid #FEDF89",
          borderRadius: layout.radiusSm,
          fontSize: "13px",
          color: colors.text,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: colors.yellow }}>Live decision:</strong> The primary path uses a free Developer Edition org.
        No Dev Hub or scratch org required. Code Puppy can also target a sandbox or production org through Salesforce CLI
        auth when release controls are in place. If org signup is blocked by network policy, have participants share one
        pre-provisioned org for follow-along.
      </div>
    </ReferenceStack>
  );
}
