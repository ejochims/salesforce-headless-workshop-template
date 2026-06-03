import React, { useEffect, useState } from "react";
import type { Milestone, WorkshopStep } from "../content/exercises";
import { getMilestoneStrategy } from "../content/headlessStrategy";
import type { MilestoneStatus, MilestoneStatusMap } from "../content/workshopStatus";
import { statusLabel, statusOptions, statusTone } from "../content/workshopStatus";
import { CodeBlock } from "./CodeBlock";
import { TerminalReplay } from "./TerminalReplay";
import { colors, layout } from "../theme";

interface ExerciseCardProps {
  milestone: Milestone;
  milestones: Milestone[];
  milestoneIndex: number;
  onNavigate: (index: number) => void;
  statuses: MilestoneStatusMap;
  onStatusChange: (milestoneId: string, status: MilestoneStatus) => void;
}

export function ExerciseCard({
  milestone,
  milestones,
  milestoneIndex,
  onNavigate,
  statuses,
  onStatusChange,
}: ExerciseCardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStatus = statuses[milestone.id] || "not-started";
  const currentTone = statusTone(currentStatus);
  const strategy = getMilestoneStrategy(milestone.id);

  useEffect(() => {
    setActiveStep(0);
  }, [milestone.id]);

  const step = milestone.steps[activeStep] || milestone.steps[0];

  return (
    <div className="workbench-grid">
      <aside style={panelStyle}>
        <div style={railHeaderStyle}>Build Chain</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {milestones.map((item, index) => {
            const itemStatus = statuses[item.id] || "not-started";
            const itemTone = statusTone(itemStatus);
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(index + 1)}
                style={{
                  border: `1px solid ${index === milestoneIndex ? colors.brandBlue : colors.border}`,
                  borderRadius: layout.radiusSm,
                  background: index === milestoneIndex ? colors.surfaceBlue : colors.surface,
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "left",
                  boxShadow: index === milestoneIndex ? "0 0 0 3px rgba(0, 83, 226, 0.10)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: index === milestoneIndex ? colors.brandBlue : itemTone.background,
                      color: index === milestoneIndex ? "#FFFFFF" : itemTone.color,
                      fontSize: "11px",
                      fontWeight: 800,
                      fontFamily: "'JetBrains Mono', monospace",
                      flexShrink: 0,
                    }}
                  >
                    {item.number}
                  </span>
                  <span style={{ color: colors.textMuted, fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                    {item.phase}
                  </span>
                </div>
                <div style={{ color: colors.ink, fontSize: "13px", fontWeight: 800, lineHeight: 1.25 }}>
                  {item.title}
                </div>
                <div style={{ color: colors.textMuted, fontSize: "11px", marginTop: "5px" }}>
                  {item.duration} min / {item.driver}
                </div>
                {itemStatus !== "not-started" && (
                  <div style={{ color: itemTone.color, fontSize: "11px", fontWeight: 900, marginTop: "6px" }}>
                    {statusLabel(itemStatus)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <main style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}>
        <section style={{ ...panelStyle, padding: "22px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "12px" }}>
            <span style={pillStyle(colors.brandBlue, colors.surfaceBlue)}>
              Milestone {milestone.number}
            </span>
            <span
              style={{
                color: currentTone.color,
                background: currentTone.background,
                border: `1px solid ${currentTone.border}`,
                borderRadius: "999px",
                padding: "5px 10px",
                fontSize: "12px",
                fontWeight: 900,
              }}
            >
              {statusLabel(currentStatus)}
            </span>
          </div>
          <h1
            className="milestone-title"
            style={{
              margin: "0 0 10px",
              color: colors.ink,
              lineHeight: 1.05,
              letterSpacing: 0,
            }}
          >
            {milestone.title}
          </h1>
          <p style={{ margin: 0, color: colors.text, fontSize: "15px", lineHeight: 1.6, maxWidth: "760px" }}>
            {milestone.objective}
          </p>
        </section>

        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <div style={eyebrowStyle}>{step.kind === "prompt" ? "Prompt" : "Active Step"}</div>
              <h2 style={sectionTitleStyle}>{step.title}</h2>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              {milestone.steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  aria-label={`Show step ${index + 1}`}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    border: `1px solid ${index === activeStep ? colors.brandBlue : colors.border}`,
                    background: index === activeStep ? colors.brandBlue : colors.surface,
                    color: index === activeStep ? "#FFFFFF" : colors.textMuted,
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: "0 18px 18px" }}>
            <StepBody step={step} />
            <div
              style={{
                marginTop: "14px",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                gap: "12px",
              }}
              className="step-evidence-grid"
            >
              <EvidenceCard title="Expected output" body={step.expected} />
              {step.produces && <EvidenceCard title="Produces" body={step.produces} tone="blue" />}
            </div>
          </div>
        </section>

        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <div style={eyebrowStyle}>Validation Gate</div>
              <h2 style={sectionTitleStyle}>{milestone.validation.label}</h2>
            </div>
          </div>
          <div style={{ padding: "0 18px 18px" }}>
            <CodeBlock
              code={milestone.validation.code}
              lang={milestone.validation.language || "bash"}
              title={milestone.validation.label}
            />
            <Checklist title="Expected evidence" items={milestone.expectedOutput} />
            <div style={dependencyStyle}>
              <strong style={{ color: colors.ink }}>Next dependency:</strong> {milestone.nextDependency}
            </div>
          </div>
        </section>
      </main>

      <aside style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}>
        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <div style={eyebrowStyle}>Workshop State</div>
              <h2 style={sectionTitleStyle}>Milestone status</h2>
            </div>
          </div>
          <div style={{ padding: "0 18px 18px" }}>
            <div className="status-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
              {statusOptions.map((option) => {
                const selected = option.id === currentStatus;
                const tone = statusTone(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => onStatusChange(milestone.id, option.id)}
                    aria-pressed={selected}
                    style={{
                      minHeight: "38px",
                      borderRadius: layout.radiusSm,
                      border: `1px solid ${selected ? tone.border : colors.border}`,
                      background: selected ? tone.background : colors.surface,
                      color: selected ? tone.color : colors.text,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 900,
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p style={{ margin: "12px 0 0", color: colors.textMuted, fontSize: "12px", lineHeight: 1.5 }}>
              Status is saved in this browser and rolls into the wrap-up summary.
            </p>
          </div>
        </section>
        <InfoPanel title="Required inputs" items={milestone.requiredInputs} />
        <InfoPanel title="Produced artifacts" items={milestone.producedArtifacts} tone="blue" />
        {strategy && (
          <section style={panelStyle}>
            <div style={sectionHeaderStyle}>
              <div>
                <div style={{ ...eyebrowStyle, color: colors.brandBlue }}>Headless Lesson</div>
                <h2 style={sectionTitleStyle}>{strategy.principle}</h2>
              </div>
            </div>
            <div style={{ padding: "0 18px 18px" }}>
              <p style={{ margin: 0, color: colors.text, fontSize: "13px", lineHeight: 1.6 }}>
                {strategy.lesson}
              </p>
              <div
                style={{
                  marginTop: "12px",
                  padding: "12px",
                  borderRadius: layout.radiusSm,
                  border: "1px solid #B2DDFF",
                  background: colors.surfaceBlue,
                  color: colors.text,
                  fontSize: "13px",
                  lineHeight: 1.55,
                }}
              >
                <strong style={{ color: colors.ink }}>Customer takeaway:</strong> {strategy.customerTakeaway}
              </div>
            </div>
          </section>
        )}
        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <div style={eyebrowStyle}>Checkpoint</div>
              <h2 style={sectionTitleStyle}>Go / no-go</h2>
            </div>
          </div>
          <div style={{ padding: "0 18px 18px" }}>
            <div
              style={{
                padding: "12px 14px",
                background: colors.greenBg,
                border: "1px solid #ABEFC6",
                borderRadius: layout.radiusSm,
                color: colors.green,
                fontSize: "13px",
                lineHeight: 1.55,
                fontWeight: 700,
              }}
            >
              {milestone.checkpoint}
            </div>
          </div>
        </section>
        <InfoPanel title="Recovery path" items={milestone.recovery} tone="yellow" />
        <InfoPanel title="Takeaway files" items={milestone.takeawayFiles} tone="neutral" />
      </aside>

      <style>{`
        .workbench-grid {
          display: grid;
          grid-template-columns: minmax(210px, 260px) minmax(0, 1.4fr) minmax(280px, 360px);
          gap: 18px;
          max-width: ${layout.appMaxWidth};
          margin: 0 auto;
        }

        .milestone-title {
          font-size: 38px;
        }

        @media (max-width: 1120px) {
          .workbench-grid {
            grid-template-columns: minmax(190px, 240px) minmax(0, 1fr);
          }
          .workbench-grid > aside:last-of-type {
            grid-column: 1 / -1;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .workbench-grid,
          .step-evidence-grid,
          .workbench-grid > aside:last-of-type {
            grid-template-columns: 1fr !important;
          }
          .workbench-grid > main {
            order: 1;
          }
          .workbench-grid > aside:first-of-type {
            order: 2;
          }
          .workbench-grid > aside:last-of-type {
            order: 3;
          }
          .milestone-title {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}

function StepBody({ step }: { step: WorkshopStep }) {
  if (step.kind === "prompt") {
    return <TerminalReplay prompt={step.body} label="Copy prompt" />;
  }

  return (
    <CodeBlock
      code={step.body}
      lang={step.language || (step.kind === "manual" ? "bash" : "text")}
      title={step.kind === "manual" ? "Manual step" : step.kind}
    />
  );
}

function InfoPanel({
  title,
  items,
  tone = "green",
}: {
  title: string;
  items: string[];
  tone?: "green" | "blue" | "yellow" | "neutral";
}) {
  const accent =
    tone === "blue" ? colors.brandBlue : tone === "yellow" ? colors.yellow : tone === "neutral" ? colors.textMuted : colors.green;
  return (
    <section style={panelStyle}>
      <div style={sectionHeaderStyle}>
        <div>
          <div style={{ ...eyebrowStyle, color: accent }}>{title}</div>
        </div>
      </div>
      <ul style={{ margin: 0, padding: "0 18px 18px 36px", color: colors.text, fontSize: "13px", lineHeight: 1.55 }}>
        {items.map((item) => (
          <li key={item} style={{ marginBottom: "7px" }}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ marginTop: "14px" }}>
      <div style={eyebrowStyle}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: "9px", color: colors.text, fontSize: "13px", lineHeight: 1.5 }}>
            <span style={{ color: colors.green, fontWeight: 900 }}>OK</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceCard({ title, body, tone = "green" }: { title: string; body: string; tone?: "green" | "blue" }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: layout.radiusSm,
        border: `1px solid ${tone === "blue" ? "#B2DDFF" : "#ABEFC6"}`,
        background: tone === "blue" ? colors.surfaceBlue : colors.greenBg,
      }}
    >
      <div style={{ ...eyebrowStyle, color: tone === "blue" ? colors.brandBlue : colors.green }}>{title}</div>
      <p style={{ margin: "6px 0 0", color: colors.text, fontSize: "13px", lineHeight: 1.55 }}>
        {body}
      </p>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radius,
  boxShadow: layout.shadowSm,
  overflow: "hidden",
};

const sectionHeaderStyle: React.CSSProperties = {
  padding: "16px 18px 12px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
};

const railHeaderStyle: React.CSSProperties = {
  color: colors.ink,
  fontSize: "13px",
  fontWeight: 900,
  padding: "14px 14px 10px",
  textTransform: "uppercase",
  letterSpacing: 0,
};

const eyebrowStyle: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "11px",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 0,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "5px 0 0",
  color: colors.ink,
  fontSize: "18px",
  lineHeight: 1.2,
  letterSpacing: 0,
};

const dependencyStyle: React.CSSProperties = {
  marginTop: "14px",
  padding: "12px 14px",
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radiusSm,
  color: colors.text,
  fontSize: "13px",
  lineHeight: 1.55,
};

function pillStyle(color: string, background: string): React.CSSProperties {
  return {
    color,
    background,
    border: `1px solid ${color}22`,
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: 800,
  };
}
