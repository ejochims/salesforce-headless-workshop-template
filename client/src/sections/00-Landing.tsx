import React, { useMemo, useState } from "react";
import { liveWorkshopMinutes, milestones, type MilestoneMode } from "../content/exercises";
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
                color: colors.brandPrimary,
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: 0,
              }}
            >
              Code Puppy + Salesforce · One hour
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
              From idea to deployed Salesforce app in an hour.
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
              Your engineers, your brand, your data — built with the tooling your teams already use.
              Code Puppy on the keyboard, Salesforce as the system of record, a custom branded experience on top.
              You leave with a deployed app, a local project you own, and the prompts to do it again.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={onStart}
                style={{
                  padding: "13px 20px",
                  background: colors.brandPrimary,
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
              Two takeaways: (1) Code Puppy builds natively on Salesforce, (2) a custom-branded React UI sits on live
              Salesforce data. Every milestone is one prompt, one artifact, one validation gate.
            </div>
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
                outlineColor: colors.brandPrimary,
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "12px",
              padding: "12px 14px",
              borderRadius: layout.radiusSm,
              border: `1px solid ${colors.border}`,
              background: colors.surfaceBlue,
              color: colors.text,
              fontSize: "13px",
              lineHeight: 1.55,
              fontWeight: 700,
            }}
          >
            Complete Step 0 and modules 1-3 before the live session when possible; they cover access, local tooling,
            project setup, and Salesforce MCP connection.
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
                      background: index === 0 ? colors.brandPrimary : colors.surfaceBlue,
                      color: index === 0 ? "#FFFFFF" : colors.brandPrimary,
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
                    <ModePill mode={milestone.mode} />
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

        @media (max-width: 900px) {
          .landing-hero {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .landing-title {
            font-size: 44px;
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

function ModePill({ mode }: { mode: MilestoneMode }) {
  const tone = modeTone(mode);
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
      {modeLabel(mode)}
    </span>
  );
}

function modeLabel(mode: MilestoneMode) {
  if (mode === "prework") return "Pre-work";
  if (mode === "live") return "Live path";
  return "Bonus";
}

function modeTone(mode: MilestoneMode) {
  if (mode === "prework") {
    return { color: colors.brandPrimary, background: colors.surfaceBlue, border: "#B2DDFF" };
  }
  if (mode === "live") {
    return { color: colors.green, background: colors.greenBg, border: "#ABEFC6" };
  }
  return { color: colors.yellow, background: colors.yellowBg, border: "#FEDF89" };
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

