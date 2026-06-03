import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { colors, layout } from "../theme";
import { Intro, ReferenceStack } from "./WhatIsMCP";

const skillGroups = [
  { label: "Data model", skills: ["generating-custom-object", "generating-custom-field", "generating-permission-set"] },
  { label: "UI", skills: ["generating-lwc-components", "generating-flexipage", "generating-list-view"] },
  { label: "Agentforce", skills: ["developing-agentforce", "testing-agentforce", "observing-agentforce"] },
  { label: "Validation", skills: ["deploying-metadata", "running-apex-tests", "running-code-analyzer"] },
];

export function SFSkillsLibrary() {
  return (
    <ReferenceStack>
      <Intro
        title="Salesforce Skills Library"
        body="The skills turn generic coding-agent behavior into Salesforce-specific authoring and validation patterns. Milestone 1 asks coding agent to confirm these skills are installed before the workshop build depends on them."
      />

      <CodeBlock
        code={`Check whether these Salesforce skills are installed in this coding agent workspace. If any are missing, install or sync them from https://github.com/forcedotcom/sf-skills by running npx skills add forcedotcom/sf-skills, then report the final installed list.`}
        lang="text"
        title="Readiness prompt"
      />
      <CodeBlock code={`npx skills add forcedotcom/sf-skills`} lang="bash" title="Install Salesforce skills" />
      <CodeBlock code={`Use the installed Salesforce skills for objects, fields, permission sets, LWC, data operations, deployment, and Agentforce.`} lang="text" title="Prompt convention" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {skillGroups.map((group) => (
          <div key={group.label}>
            <div style={{ color: colors.brandBlue, fontSize: "11px", textTransform: "uppercase", letterSpacing: 0, marginBottom: "8px", fontWeight: 900 }}>
              {group.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "6px 9px",
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: layout.radiusSm,
                    color: colors.ink,
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ReferenceStack>
  );
}
