import React from "react";
import { Diagram } from "../components/Diagram";
import { diagrams } from "../content/diagrams";
import { colors, layout } from "../theme";
import { Intro, KeyValueList, ReferenceStack } from "./WhatIsMCP";

const productionConsiderations = [
  {
    label: "Access",
    question: "Align users, records, fields, and responsibilities as the workflow expands.",
    examples: "Profiles, permission sets, sharing, field-level security, row-level security.",
  },
  {
    label: "Experience",
    question: "Tailor screens, fields, and actions for each operational role.",
    examples: "Page layouts, Lightning pages, list views, role-specific actions.",
  },
  {
    label: "Identity and trust",
    question: "Connect identity, auditability, compliance posture, and uptime expectations.",
    examples: "SSO, auditability, compliance posture, SOC 2, uptime.",
  },
  {
    label: "Operations",
    question: "Keep workflow, case history, validation, and change control close to the operational record.",
    examples: "Cases, workflow, deployment metadata, validation, change control.",
  },
];

export function CustomerInfra() {
  return (
    <ReferenceStack>
      <Intro
        title="Salesforce as Customer Infrastructure"
        body="The workshop is not just creating screens. It is showing how a coding agent can shape an operations experience on top of trusted Salesforce services for data, access, workflow, and agents."
      />

      <Diagram definition={diagrams.customerInfra} title="Platform layers" />

      <KeyValueList
        items={[
          { label: "Context", desc: "Objects, fields, relationships, sharing, and permissions." },
          { label: "Work", desc: "Cases, approvals, flows, audit trails, and operational state." },
          { label: "Engagement", desc: "Lightning pages, list views, components, and portals." },
          { label: "Agency", desc: "Agentforce over the same governed CRM data." },
        ]}
      />

      <section
        style={{
          padding: "16px",
          background: colors.surfaceSoft,
          border: `1px solid ${colors.border}`,
          borderRadius: layout.radiusSm,
        }}
      >
        <div style={{ color: colors.brandBlue, fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0 }}>
          Prototype to enterprise app
        </div>
        <h4 style={{ margin: "6px 0 8px", color: colors.ink, fontSize: "16px", lineHeight: 1.25 }}>
          Fast iteration, grounded in the platform.
        </h4>
        <p style={{ margin: "0 0 14px", color: colors.text, fontSize: "13px", lineHeight: 1.6 }}>
          The fast build is possible because the workflow lands on a platform already designed for enterprise
          operations. As the app moves toward production, these Salesforce capabilities help it scale beyond a
          prototype while the team stays focused on the operations experience.
        </p>

        <div style={{ display: "grid", gap: "10px" }}>
          {productionConsiderations.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "12px",
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: layout.radiusSm,
              }}
            >
              <div style={{ color: colors.ink, fontSize: "13px", fontWeight: 900 }}>{item.label}</div>
              <div style={{ marginTop: "4px", color: colors.text, fontSize: "13px", lineHeight: 1.5 }}>
                {item.question}
              </div>
              <div style={{ marginTop: "6px", color: colors.textMuted, fontSize: "12px", lineHeight: 1.45 }}>
                {item.examples}
              </div>
            </div>
          ))}
        </div>
      </section>

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
        <strong style={{ color: colors.yellow }}>Platform connection:</strong> The coding agent can stay focused on the
        operations workflow while Salesforce provides the governed data, access, identity, and workflow
        foundation.
      </div>
    </ReferenceStack>
  );
}
