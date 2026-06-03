import React from "react";
import { buildWorkshopEvidenceReport } from "../content/evidenceReport";
import { milestones } from "../content/exercises";
import type { MilestoneStatusMap } from "../content/workshopStatus";
import { statusLabel, statusTone } from "../content/workshopStatus";
import { colors, layout } from "../theme";

export function WrapUp({ statuses }: { statuses: MilestoneStatusMap }) {
  const verified = milestones.filter((milestone) => statuses[milestone.id] === "verified").length;
  const blocked = milestones.filter((milestone) => statuses[milestone.id] === "blocked").length;
  const inProgress = milestones.filter((milestone) => statuses[milestone.id] === "in-progress").length;
  const readyForHandoff = verified === milestones.length;
  const exportEvidence = () => {
    const report = buildWorkshopEvidenceReport(statuses);
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "salesforce-headless-workshop-template-evidence.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        padding: "42px 32px",
        boxSizing: "border-box",
        background: colors.bg,
      }}
    >
      <div style={{ maxWidth: layout.appMaxWidth, margin: "0 auto" }}>
        <section
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: layout.radius,
            boxShadow: layout.shadow,
            padding: "28px",
            marginBottom: "20px",
          }}
        >
          <div style={{ color: colors.brandBlue, fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0, marginBottom: "12px" }}>
            Handoff
          </div>
          <h1
            className="wrap-title"
            style={{
              margin: "0 0 14px",
              color: colors.ink,
              lineHeight: 1,
              letterSpacing: 0,
              maxWidth: "880px",
            }}
          >
            The workshop ends, but the build path keeps going.
          </h1>
          <p style={{ margin: 0, color: colors.text, fontSize: "17px", lineHeight: 1.6, maxWidth: "760px" }}>
            Participants now have their own local Salesforce project, a Developer Edition org, generated metadata,
            validation evidence, and next coding agent prompts for continuing toward a POC.
          </p>
          <div className="wrap-status-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "10px", marginTop: "20px" }}>
            {[
              { value: verified, label: "Verified" },
              { value: inProgress, label: "In progress" },
              { value: blocked, label: "Blocked" },
              { value: readyForHandoff ? "Yes" : "No", label: "Ready" },
            ].map((stat) => (
              <div key={stat.label} style={statusMetricStyle}>
                <div style={{ color: colors.ink, fontSize: "28px", fontWeight: 900, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800, marginTop: "5px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <button onClick={exportEvidence} style={exportButtonStyle}>
            Export evidence report
          </button>
        </section>

        <div className="wrap-grid">
          <section style={panelStyle}>
            <PanelHeader eyebrow="Live artifacts" title="What the hour produced" />
            <div style={{ display: "grid", gap: "10px", padding: "0 18px 18px" }}>
              {milestones
                .filter((milestone) => milestone.mode === "live")
                .map((milestone) => (
                  <div key={milestone.id} style={artifactStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                      <strong style={{ color: colors.ink }}>{milestone.phase}</strong>
                      <StatusPill status={statuses[milestone.id] || "not-started"} />
                    </div>
                    <span style={{ color: colors.textMuted }}>{milestone.producedArtifacts.join(", ")}</span>
                  </div>
                ))}
            </div>
          </section>

          <section style={panelStyle}>
            <PanelHeader eyebrow="Participant project" title="Files to keep building from" />
            <div style={{ padding: "0 18px 18px" }}>
              <div style={repoListStyle}>
                {[
                  "AGENTS.md",
                  "sfdx-project.json",
                  "force-app/main/default/",
                  "config/project-scratch-def.json",
                  "Agent Spec",
                ].map((item) => (
                  <code key={item} style={repoCodeStyle}>
                    {item}
                  </code>
                ))}
              </div>
              <p style={{ margin: "14px 0 0", color: colors.text, fontSize: "13px", lineHeight: 1.6 }}>
                The hosted app remains the prompt reference. Their local project is the durable artifact.
              </p>
            </div>
          </section>

          <section style={panelStyle}>
            <PanelHeader eyebrow="Stretch path" title="Next build modules" />
            <ul style={{ margin: 0, padding: "0 18px 18px 36px", color: colors.text, fontSize: "14px", lineHeight: 1.65 }}>
              <li>Generate and preview the Operations Support Assistant authoring bundle.</li>
              <li>Exception support flow that creates or updates standard Cases.</li>
              <li>Agent test suite and preview utterance coverage.</li>
              <li>Permission set and profile hardening.</li>
              <li>Deployment validation and scratch-to-sandbox promotion plan.</li>
              <li>Real Acme Logistics objects and workflow mapping.</li>
            </ul>
          </section>
        </div>

      </div>

      <style>{`
        .wrap-title {
          font-size: 56px;
        }

        .wrap-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 960px) {
          .wrap-grid {
            grid-template-columns: 1fr;
          }
          .wrap-status-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .wrap-title {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}

function StatusPill({ status }: { status: NonNullable<MilestoneStatusMap[string]> }) {
  const tone = statusTone(status);
  return (
    <span
      style={{
        color: tone.color,
        background: tone.background,
        border: `1px solid ${tone.border}`,
        borderRadius: "999px",
        padding: "4px 8px",
        fontSize: "11px",
        fontWeight: 900,
        whiteSpace: "nowrap",
      }}
    >
      {statusLabel(status)}
    </span>
  );
}

function PanelHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ padding: "18px 18px 12px" }}>
      <div style={{ color: colors.brandBlue, fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0 }}>
        {eyebrow}
      </div>
      <h2 style={{ margin: "5px 0 0", color: colors.ink, fontSize: "20px", letterSpacing: 0 }}>
        {title}
      </h2>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radius,
  boxShadow: layout.shadowSm,
};

const artifactStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "12px",
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radiusSm,
  fontSize: "13px",
  lineHeight: 1.45,
};

const statusMetricStyle: React.CSSProperties = {
  padding: "14px",
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radiusSm,
};

const exportButtonStyle: React.CSSProperties = {
  marginTop: "16px",
  padding: "12px 16px",
  background: colors.brandBlue,
  border: "none",
  borderRadius: layout.radiusSm,
  color: "#FFFFFF",
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 900,
  boxShadow: "0 14px 30px rgba(0, 83, 226, 0.18)",
};

const repoListStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const repoCodeStyle: React.CSSProperties = {
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: "999px",
  padding: "5px 9px",
  color: colors.ink,
  fontSize: "12px",
};
