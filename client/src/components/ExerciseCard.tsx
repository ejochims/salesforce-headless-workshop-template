import React, { useEffect, useState } from "react";
import type { Milestone, MilestoneMode, WorkshopStep } from "../content/exercises";
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
  const isStepZero = milestone.id === "step-zero";

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
            const modeTone = getModeTone(item.mode);
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(index + 1)}
                style={{
                  border: `1px solid ${index === milestoneIndex ? colors.brandPrimary : colors.border}`,
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
                      background: index === milestoneIndex ? colors.brandPrimary : itemTone.background,
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
                <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", marginTop: "6px" }}>
                  <span
                    style={{
                      color: modeTone.color,
                      background: modeTone.background,
                      border: `1px solid ${modeTone.border}`,
                      borderRadius: "999px",
                      padding: "2px 6px",
                      fontSize: "10px",
                      fontWeight: 900,
                    }}
                  >
                    {getModeLabel(item.mode)}
                  </span>
                  <span style={{ color: colors.textMuted, fontSize: "11px" }}>
                    {item.duration} min / {item.driver}
                  </span>
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
            <span style={pillStyle(colors.brandPrimary, colors.surfaceBlue)}>
              {milestone.number === 0 ? "Step 0" : `Milestone ${milestone.number}`}
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
          {milestone.banner && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 14px",
                borderRadius: layout.radiusSm,
                border: `1px solid ${bannerBorder(milestone.banner.tone)}`,
                background: bannerBackground(milestone.banner.tone),
                color: colors.text,
                fontSize: "13px",
                lineHeight: 1.55,
              }}
            >
              <div>{milestone.banner.text}</div>
              {milestone.banner.cta && (
                <a
                  href={milestone.banner.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    marginTop: "10px",
                    padding: "8px 12px",
                    borderRadius: layout.radiusSm,
                    background: colors.brandPrimary,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {milestone.banner.cta.label}
                </a>
              )}
            </div>
          )}
          {milestone.heroImage && (
            <figure style={{ margin: "20px 0 0" }}>
              <img
                src={milestone.heroImage.src}
                alt={milestone.heroImage.alt}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: layout.radiusSm,
                  border: `1px solid ${colors.border}`,
                  boxShadow: layout.shadowSm,
                  display: "block",
                }}
              />
              {milestone.heroImage.caption && (
                <figcaption
                  style={{
                    marginTop: "8px",
                    color: colors.textMuted,
                    fontSize: "12px",
                    fontStyle: "italic",
                  }}
                >
                  {milestone.heroImage.caption}
                </figcaption>
              )}
            </figure>
          )}
        </section>

        {isStepZero ? (
          <StepZeroInstructions />
        ) : (
          <>
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
                        border: `1px solid ${index === activeStep ? colors.brandPrimary : colors.border}`,
                        background: index === activeStep ? colors.brandPrimary : colors.surface,
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
                <div style={checkpointInlineStyle}>
                  <strong style={{ color: colors.green }}>Go / no-go:</strong> {milestone.checkpoint}
                </div>
                <div style={dependencyStyle}>
                  <strong style={{ color: colors.ink }}>Next dependency:</strong> {milestone.nextDependency}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <aside style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}>
        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <div style={eyebrowStyle}>Workshop State</div>
              <h2 style={sectionTitleStyle}>{isStepZero ? "Step status" : "Milestone status"}</h2>
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
        {!isStepZero && milestone.recovery.length > 0 && (
          <CollapsibleInfoPanel title="If you get stuck" items={milestone.recovery} tone="yellow" />
        )}
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

function getModeLabel(mode: MilestoneMode) {
  if (mode === "prework") return "Pre-work";
  if (mode === "live") return "Live";
  return "Bonus";
}

function bannerBackground(tone: "blue" | "yellow" | "green") {
  if (tone === "blue") return colors.surfaceBlue;
  if (tone === "yellow") return colors.yellowBg;
  return colors.greenBg;
}

function bannerBorder(tone: "blue" | "yellow" | "green") {
  if (tone === "blue") return "#B2DDFF";
  if (tone === "yellow") return "#FEDF89";
  return "#ABEFC6";
}

function getModeTone(mode: MilestoneMode) {
  if (mode === "prework") {
    return { color: colors.brandPrimary, background: colors.surfaceBlue, border: "#B2DDFF" };
  }
  if (mode === "live") {
    return { color: colors.green, background: colors.greenBg, border: "#ABEFC6" };
  }
  return { color: colors.yellow, background: colors.yellowBg, border: "#FEDF89" };
}

function StepZeroInstructions() {
  return (
    <section style={panelStyle}>
      <div style={sectionHeaderStyle}>
        <div>
          <div style={eyebrowStyle}>Pre-work Instructions</div>
          <h2 style={sectionTitleStyle}>Complete these before Milestone 1</h2>
        </div>
      </div>
      <div style={{ padding: "0 18px 18px", display: "grid", gap: "12px" }}>
        <InstructionCard
          number="1"
          title="Open or install Code Puppy"
          body="Open Code Puppy once and confirm it launches. If you do not have Code Puppy installed, use the GitHub repo below to get it."
          linkLabel="Code Puppy GitHub Repo"
          href="https://github.com/mpfaffenberger/code_puppy"
          code={`macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
uvx code-puppy

Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
uvx code-puppy`}
        />
        <InstructionCard
          number="2"
          title="Create the workshop Developer Edition org"
          body="For this workshop, use a free Salesforce Developer Edition org. It is isolated and purpose-built for building and testing Salesforce capabilities."
          linkLabel="Salesforce Developer Edition signup"
          href="https://developer.salesforce.com/form/signup/freetrial.jsp"
        />
        <InstructionCard
          number="3"
          title="Know what org Code Puppy will target"
          body="Code Puppy can connect to any Salesforce org supported by Salesforce CLI authentication. The same pattern can target a sandbox or production org when the team has the right permissions, release process, and deployment guardrails."
        />
        <div style={dependencyStyle}>
          <strong style={{ color: colors.ink }}>Next dependency:</strong> Milestone 1 authenticates Salesforce CLI to
          this org, so complete this access setup first.
        </div>
      </div>
    </section>
  );
}

function InstructionCard({
  number,
  title,
  body,
  linkLabel,
  href,
  code,
}: {
  number: string;
  title: string;
  body: string;
  linkLabel?: string;
  href?: string;
  code?: string;
}) {
  return (
    <div style={instructionCardStyle}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <span style={instructionNumberStyle}>{number}</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ margin: 0, color: colors.ink, fontSize: "16px", lineHeight: 1.25 }}>{title}</h3>
          <p style={{ margin: "7px 0 0", color: colors.text, fontSize: "13px", lineHeight: 1.6 }}>{body}</p>
          {href && linkLabel && (
            <a href={href} target="_blank" rel="noreferrer" style={instructionLinkStyle}>
              {linkLabel}
            </a>
          )}
          {code && (
            <pre style={instructionCodeStyle}>
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
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
    tone === "blue" ? colors.brandPrimary : tone === "yellow" ? colors.yellow : tone === "neutral" ? colors.textMuted : colors.green;
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

function CollapsibleInfoPanel({
  title,
  items,
  tone = "yellow",
}: {
  title: string;
  items: string[];
  tone?: "green" | "blue" | "yellow" | "neutral";
}) {
  const accent =
    tone === "blue" ? colors.brandPrimary : tone === "yellow" ? colors.yellow : tone === "neutral" ? colors.textMuted : colors.green;
  return (
    <section style={panelStyle}>
      <details style={{ width: "100%" }}>
        <summary
          style={{
            cursor: "pointer",
            listStyle: "none",
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            color: accent,
            fontSize: "11px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 0,
          }}
        >
          <span>{title}</span>
          <span style={{ color: colors.textMuted, fontSize: "11px", fontWeight: 700 }}>Show</span>
        </summary>
        <ul style={{ margin: 0, padding: "0 18px 18px 36px", color: colors.text, fontSize: "13px", lineHeight: 1.55 }}>
          {items.map((item) => (
            <li key={item} style={{ marginBottom: "7px" }}>
              {item}
            </li>
          ))}
        </ul>
      </details>
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
      <div style={{ ...eyebrowStyle, color: tone === "blue" ? colors.brandPrimary : colors.green }}>{title}</div>
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

const instructionCardStyle: React.CSSProperties = {
  padding: "14px",
  background: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  borderRadius: layout.radiusSm,
};

const instructionNumberStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  background: colors.brandPrimary,
  color: "#FFFFFF",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  fontWeight: 900,
  flexShrink: 0,
};

const instructionLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  marginTop: "10px",
  padding: "8px 11px",
  borderRadius: layout.radiusSm,
  background: colors.brandPrimary,
  color: "#FFFFFF",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: 900,
};

const instructionCodeStyle: React.CSSProperties = {
  margin: "10px 0 0",
  padding: "11px",
  borderRadius: layout.radiusSm,
  background: "#101828",
  color: "#F9FAFB",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  lineHeight: 1.55,
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

const checkpointInlineStyle: React.CSSProperties = {
  marginTop: "14px",
  padding: "12px 14px",
  background: colors.greenBg,
  border: "1px solid #ABEFC6",
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
