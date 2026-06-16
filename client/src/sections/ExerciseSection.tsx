import React from "react";
import type { Milestone, MilestoneMode } from "../content/exercises";
import type { MilestoneStatus, MilestoneStatusMap } from "../content/workshopStatus";
import { ExerciseCard } from "../components/ExerciseCard";
import { colors } from "../theme";

interface ExerciseSectionProps {
  milestone: Milestone;
  milestones: Milestone[];
  milestoneIndex: number;
  onNavigate: (index: number) => void;
  statuses: MilestoneStatusMap;
  onStatusChange: (milestoneId: string, status: MilestoneStatus) => void;
}

export function ExerciseSection({
  milestone,
  milestones,
  milestoneIndex,
  onNavigate,
  statuses,
  onStatusChange,
}: ExerciseSectionProps) {
  const modeTone = getModeTone(milestone.mode);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: colors.bg,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 32px",
          borderBottom: `1px solid ${colors.border}`,
          flexShrink: 0,
          gap: "12px",
          background: colors.surface,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: colors.textMuted,
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          {milestone.phase} / {getModeLabel(milestone.mode)}
        </span>
        <span style={{ color: colors.borderStrong, fontSize: "12px" }}>/</span>
        <span style={{ color: colors.text, fontSize: "13px", fontWeight: 700 }}>
          {milestone.duration} min
        </span>
        <span
          style={{
            color: modeTone.color,
            background: modeTone.background,
            border: `1px solid ${modeTone.border}`,
            borderRadius: "999px",
            padding: "4px 9px",
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          {getModeLabel(milestone.mode)}
        </span>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "24px 32px 32px" }}>
        <ExerciseCard
          milestone={milestone}
          milestones={milestones}
          milestoneIndex={milestoneIndex}
          onNavigate={onNavigate}
          statuses={statuses}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
}

function getModeLabel(mode: MilestoneMode) {
  if (mode === "prework") return "Pre-work";
  if (mode === "live") return "Live path";
  return "Bonus";
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
