import React, { useMemo, useState } from "react";
import { liveWorkshopMinutes, milestones } from "../content/exercises";
import { headlessStrategyMap } from "../content/headlessStrategy";
import type { MilestoneStatusMap } from "../content/workshopStatus";
import { statusLabel, statusTone } from "../content/workshopStatus";
import { colors, layout } from "../theme";

interface LandingProps {
  onStart: () => void;
  onNavigate: (index: number) => void;
  statuses: MilestoneStatusMap;
}

export function Landing({ onStart, onNavigate, statuses }: LandingProps) {
  const [query, setQuery] = useState("");
  const verifiedCount = milestones.filter((milestone) => statuses[milestone.id] === "verified").length;
  const blockedCount = milestones.filter((milestone) => statuses[milestone.id] === "blocked").length;
  const filteredMilestones = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return milestones;
    return milestones.filter((milestone) =>
      [
        milestone.phase,
        milestone.title,
        milestone.objective,
        milestone.producedArtifacts.join(" "),
        milestone.requiredInputs.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        padding: "44px 32px",
        boxSizing: "border-box",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 58%, #EEF5FF 100%)",
      }}
    >
      <div style={{ maxWidth: layout.appMaxWidth, margin: "0 auto" }}>
        <section className="landing-hero">
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "22px",
                padding: "7px 11px",
                borderRadius: "999px",
                background: colors.surfaceBlue,
                border: "1px solid #B2DDFF",
                color: colors.brandBlue,
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: 0,
              }}
            >
              One-hour live build
            </div>

            <h1
              className="landing-title"
              style={{
                margin: "0 0 18px",
                color: colors.ink,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: 0,
                maxWidth: "840px",
              }}
            >
              Copy prompts. Build Salesforce with coding agent.
            </h1>

            <p
              style={{
                margin: "0 0 28px",
                fontSize: "18px",
                color: colors.text,
                lineHeight: 1.6,
                maxWidth: "680px",
              }}
            >
              Use this as the shared control surface for the live build: copy each prompt into coding agent,
              set up a Developer Edition org, create a local Salesforce project, connect Salesforce MCP, and validate
              each artifact before moving on.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={onStart}
                style={{
                  padding: "13px 20px",
                  background: colors.brandBlue,
                  border: "none",
                  borderRadius: layout.radiusSm,
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 900,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 14px 30px rgba(0, 83, 226, 0.22)",
                }}
              >
                Let's Begin
              </button>
            </div>
          </div>

          <div style={summaryCardStyle}>
            <div style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0 }}>
              What they take away
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px", marginTop: "14px" }}>
              {[
                { value: milestones.length, label: "Milestones" },
                { value: liveWorkshopMinutes, label: "Live minutes" },
                { value: verifiedCount, label: "Verified" },
                { value: blockedCount, label: "Blocked" },
              ].map((stat) => (
                <div key={stat.label} style={statStyle}>
                  <div style={{ color: colors.ink, fontSize: "30px", fontWeight: 900, lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800, marginTop: "5px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "13px 14px",
                borderRadius: layout.radiusSm,
                background: colors.greenBg,
                color: colors.green,
                fontSize: "13px",
                lineHeight: 1.55,
                fontWeight: 700,
              }}
            >
              Every milestone centers on one prompt to paste into coding agent, one artifact to produce, and one
              validation gate before the room moves forward.
            </div>
          </div>
        </section>

        <section style={{ marginTop: "28px" }}>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ color: colors.ink, fontSize: "18px", fontWeight: 900 }}>Headless strategy map</div>
            <div style={{ color: colors.textMuted, fontSize: "13px", marginTop: "3px" }}>
              The hands-on build follows the same operating model customers can reuse for real Salesforce delivery.
            </div>
          </div>
          <div className="strategy-map-grid">
            {headlessStrategyMap.map((node, index) => (
              <div key={node.title} style={strategyNodeStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={strategyNumberStyle}>{index + 1}</span>
                  <strong style={{ color: colors.ink, fontSize: "14px" }}>{node.title}</strong>
                </div>
                <p style={{ margin: 0, color: colors.text, fontSize: "13px", lineHeight: 1.55 }}>
                  {node.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ color: colors.ink, fontSize: "18px", fontWeight: 900 }}>Run of show</div>
              <div style={{ color: colors.textMuted, fontSize: "13px", marginTop: "3px" }}>
                Filter milestones by artifact, phase, or build goal.
              </div>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search milestones"
              aria-label="Search milestones"
              style={{
                width: "min(100%, 300px)",
                padding: "10px 12px",
                borderRadius: layout.radiusSm,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                color: colors.ink,
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                outlineColor: colors.brandBlue,
              }}
            />
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {filteredMilestones.length === 0 && (
              <div
                style={{
                  padding: "18px",
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: layout.radius,
                  color: colors.textMuted,
                  fontSize: "14px",
                }}
              >
                No milestones match that search.
              </div>
            )}
            {filteredMilestones.map((milestone) => {
              const index = milestones.findIndex((item) => item.id === milestone.id);
              const tone = statusTone(statuses[milestone.id] || "not-started");
              return (
                <button
                  key={milestone.id}
                  className="landing-milestone-row"
                  onClick={() => onNavigate(index)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px minmax(0, 1fr) minmax(120px, auto)",
                    gap: "14px",
                    alignItems: "center",
                    padding: "14px 16px",
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: layout.radius,
                    boxShadow: layout.shadowSm,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: index === 0 ? colors.brandBlue : colors.surfaceBlue,
                      color: index === 0 ? "#FFFFFF" : colors.brandBlue,
                      fontWeight: 900,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {milestone.number}
                  </span>
                  <div>
                    <div style={{ color: colors.ink, fontWeight: 900, fontSize: "15px" }}>{milestone.title}</div>
                    <div style={{ color: colors.textMuted, fontSize: "13px", marginTop: "4px" }}>
                      Produces: {milestone.producedArtifacts[0]}
                    </div>
                  </div>
                  <div
                    className="landing-status-cell"
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}
                  >
                    <span style={{ color: colors.textMuted, fontSize: "12px", fontWeight: 800 }}>
                      {milestone.duration} min
                    </span>
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
                      {statusLabel(statuses[milestone.id] || "not-started")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <style>{`
        .landing-title {
          font-size: 72px;
        }

        .landing-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(300px, 420px);
          gap: 28px;
          align-items: center;
        }

        .strategy-map-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        @media (max-width: 900px) {
          .landing-hero {
            grid-template-columns: 1fr;
          }
          .strategy-map-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 760px) {
          .landing-title {
            font-size: 44px;
          }
          .strategy-map-grid {
            grid-template-columns: 1fr !important;
          }
          .landing-milestone-row {
            grid-template-columns: 44px minmax(0, 1fr) !important;
          }
          .landing-status-cell {
            grid-column: 2;
            align-items: flex-start !important;
            flex-direction: row !important;
          }
        }
      `}</style>
    </div>
  );
}

const summaryCardStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radius,
  boxShadow: layout.shadow,
  padding: "20px",
};

const statStyle: React.CSSProperties = {
  padding: "14px",
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radiusSm,
};

const strategyNodeStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radius,
  boxShadow: layout.shadowSm,
  padding: "14px",
};

const strategyNumberStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "999px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.surfaceBlue,
  color: colors.brandBlue,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  fontWeight: 900,
  flexShrink: 0,
};
