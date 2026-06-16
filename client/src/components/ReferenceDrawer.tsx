import React from "react";
import { WhatIsMCP } from "../reference/WhatIsMCP";
import { CustomerInfra } from "../reference/CustomerInfra";
import { Headless360 } from "../reference/Headless360";
import { SFSkillsLibrary } from "../reference/SFSkillsLibrary";
import { ScratchOrgSetup } from "../reference/ScratchOrgSetup";
import { colors, layout } from "../theme";

export type ReferencePanel =
  | "what-is-mcp"
  | "customer-infra"
  | "headless360"
  | "sf-skills"
  | "scratch-org"
  | null;

const panels: { id: Exclude<ReferencePanel, null>; label: string; key: string }[] = [
  { id: "what-is-mcp", label: "What is MCP?", key: "1" },
  { id: "customer-infra", label: "Customer Infrastructure", key: "2" },
  { id: "headless360", label: "Headless 360", key: "3" },
  { id: "sf-skills", label: "SF Skills", key: "4" },
  { id: "scratch-org", label: "Salesforce Setup", key: "5" },
];

interface ReferenceDrawerProps {
  panel: ReferencePanel;
  onClose: () => void;
  onSwitch: (p: ReferencePanel) => void;
}

export function ReferenceDrawer({ panel, onClose, onSwitch }: ReferenceDrawerProps) {
  if (!panel) return null;

  return (
    <>
      <button
        aria-label="Close reference drawer"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(24, 34, 48, 0.28)", zIndex: 200, border: "none" }}
      />

      <aside
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "min(560px, 100vw)",
          background: colors.surface,
          borderLeft: `1px solid ${colors.border}`,
          zIndex: 201,
          transform: "translateX(0)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "-22px 0 48px rgba(16, 24, 40, 0.16)",
        }}
      >
        <div
          style={{
            padding: "0 18px",
            height: "60px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: colors.surface,
          }}
        >
          <div>
            <div style={{ color: colors.brandPrimary, fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0 }}>
              Reference
            </div>
            <div style={{ color: colors.textMuted, fontSize: "12px", marginTop: "2px" }}>
              Workshop context
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: colors.surfaceSoft,
              border: `1px solid ${colors.border}`,
              borderRadius: "999px",
              cursor: "pointer",
              color: colors.ink,
              fontSize: "18px",
              width: "32px",
              height: "32px",
              lineHeight: 1,
            }}
          >
            x
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 14px",
            borderBottom: `1px solid ${colors.border}`,
            flexShrink: 0,
            overflowX: "auto",
            background: colors.surfaceSoft,
          }}
        >
          {panels.map((p) => (
            <button
              key={p.id}
              onClick={() => onSwitch(p.id)}
              style={{
                padding: "8px 10px",
                background: panel === p.id ? colors.brandPrimary : colors.surface,
                border: `1px solid ${panel === p.id ? colors.brandPrimary : colors.border}`,
                borderRadius: layout.radiusSm,
                cursor: "pointer",
                color: panel === p.id ? "#FFFFFF" : colors.text,
                fontSize: "12px",
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ opacity: 0.65, marginRight: "5px", fontFamily: "'JetBrains Mono', monospace" }}>{p.key}</span>
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {panel === "what-is-mcp" && <WhatIsMCP />}
          {panel === "customer-infra" && <CustomerInfra />}
          {panel === "headless360" && <Headless360 />}
          {panel === "sf-skills" && <SFSkillsLibrary />}
          {panel === "scratch-org" && <ScratchOrgSetup />}
        </div>
      </aside>
    </>
  );
}
