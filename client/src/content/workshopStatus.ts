import { colors } from "../theme";

export type MilestoneStatus = "not-started" | "in-progress" | "verified" | "blocked";

export type MilestoneStatusMap = Record<string, MilestoneStatus>;

export const statusOptions: { id: MilestoneStatus; label: string }[] = [
  { id: "not-started", label: "Not started" },
  { id: "in-progress", label: "In progress" },
  { id: "verified", label: "Verified" },
  { id: "blocked", label: "Blocked" },
];

export function statusLabel(status: MilestoneStatus) {
  return statusOptions.find((option) => option.id === status)?.label || "Not started";
}

export function statusTone(status: MilestoneStatus) {
  switch (status) {
    case "verified":
      return { color: colors.green, background: colors.greenBg, border: "#ABEFC6" };
    case "in-progress":
      return { color: colors.brandPrimary, background: colors.surfaceBlue, border: "#B2DDFF" };
    case "blocked":
      return { color: colors.red, background: colors.redBg, border: "#FECDCA" };
    default:
      return { color: colors.textMuted, background: colors.surfaceSoft, border: colors.border };
  }
}
