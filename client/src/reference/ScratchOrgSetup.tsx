import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { colors, layout } from "../theme";
import { Intro, ReferenceStack } from "./WhatIsMCP";

const setupScript = `# Install prerequisites
npm install -g @salesforce/cli

# Sign up at https://developer.salesforce.com/signup
# Then authenticate:
sf org login web

# Set as default target org
sf config set target-org=<your-username>
sf alias set workshop-org=<your-username>

# Create local project
sf project generate --name salesforce-headless-workshop
cd salesforce-headless-workshop`;

export function ScratchOrgSetup() {
  return (
    <ReferenceStack>
      <Intro
        title="Salesforce Setup Basics"
        body="Participants start from a free Salesforce Developer Edition org. coding agent drives the CLI and MCP flow, but the key Salesforce concepts are the project folder, target org, metadata, permission set, and Agentforce preview capability."
      />

      <CodeBlock code={`https://developer.salesforce.com/signup`} lang="text" title="Sign up for a free Salesforce Developer Edition org" />
      <CodeBlock code={setupScript} lang="bash" title="Developer Edition setup commands" />

      <div style={{ display: "grid", gap: "10px" }}>
        {[
          ["Salesforce CLI", "The local command-line tool coding agent uses to authenticate, deploy metadata, and query data."],
          ["Developer Edition", "A free, permanent Salesforce org for building and testing. Sign up at https://developer.salesforce.com/signup."],
          ["Target org", "The default org that CLI and Salesforce MCP commands operate against."],
          ["Metadata", "Files under force-app/main/default that define objects, fields, permissions, LWC, and Agentforce assets."],
          ["Permission set", "The deployable access artifact that makes generated fields, objects, and agents usable."],
          ["Agentforce preview", "The validation path for an Agent Script authoring bundle before publish or activation."],
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
        No Dev Hub or scratch org required. If org signup is blocked by network policy, have participants share one pre-provisioned org for follow-along.
      </div>
    </ReferenceStack>
  );
}
