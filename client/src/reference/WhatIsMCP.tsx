import React from "react";
import { Diagram } from "../components/Diagram";
import { diagrams } from "../content/diagrams";
import { colors, layout } from "../theme";

export function WhatIsMCP() {
  return (
    <ReferenceStack>
      <Intro
        title="Model Context Protocol"
        body="MCP is the local tool bridge between coding agent and Salesforce. In this workshop, the harness calls org, metadata, data, users, and test tools without making developers use Salesforce setup pages first."
      />

      <Diagram definition={diagrams.headless360} title="coding agent to MCP to Salesforce" />

      <KeyValueList
        items={[
          { label: "@salesforce/mcp", desc: "The Salesforce MCP server used by the coding harness." },
          { label: "Toolsets", desc: "orgs, metadata, data, and users are exposed intentionally." },
          { label: "Local execution", desc: "The MCP server runs on the developer machine." },
          { label: "Workshop proof", desc: "Every build step validates that coding agent can operate the org." },
        ]}
      />
    </ReferenceStack>
  );
}

export function ReferenceStack({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>{children}</div>;
}

export function Intro({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", color: colors.ink, fontSize: "20px", fontWeight: 900, letterSpacing: 0 }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: colors.text, fontSize: "14px", lineHeight: 1.65 }}>
        {body}
      </p>
    </div>
  );
}

export function KeyValueList({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            padding: "12px 14px",
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: layout.radiusSm,
            display: "grid",
            gridTemplateColumns: "132px minmax(0, 1fr)",
            gap: "12px",
            alignItems: "baseline",
          }}
        >
          <span style={{ color: colors.ink, fontSize: "12px", fontWeight: 900, fontFamily: "'JetBrains Mono', monospace" }}>{item.label}</span>
          <span style={{ color: colors.text, fontSize: "13px", lineHeight: 1.5 }}>{item.desc}</span>
        </div>
      ))}
    </div>
  );
}
