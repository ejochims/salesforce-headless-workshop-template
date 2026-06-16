import { milestones } from "./exercises";
import { headlessStrategyMap, getMilestoneStrategy } from "./headlessStrategy";
import type { MilestoneStatusMap } from "./workshopStatus";
import { statusLabel } from "./workshopStatus";

export function buildWorkshopEvidenceReport(statuses: MilestoneStatusMap) {
  const generatedAt = new Date().toLocaleString();
  const verified = milestones.filter((milestone) => statuses[milestone.id] === "verified").length;
  const blocked = milestones.filter((milestone) => statuses[milestone.id] === "blocked").length;
  const inProgress = milestones.filter((milestone) => statuses[milestone.id] === "in-progress").length;

  const lines: string[] = [
    "# Salesforce Headless Workshop Evidence",
    "",
    `Generated: ${generatedAt}`,
    "",
    "## Summary",
    "",
    `- Milestones: ${milestones.length}`,
    `- Verified: ${verified}`,
    `- In progress: ${inProgress}`,
    `- Blocked: ${blocked}`,
    `- Ready for handoff: ${verified === milestones.length ? "Yes" : "No"}`,
    "",
    "## Headless Strategy Map",
    "",
    ...headlessStrategyMap.flatMap((node, index) => [
      `${index + 1}. ${node.title}`,
      `   - ${node.body}`,
    ]),
    "",
    "## Milestone Evidence",
    "",
  ];

  milestones.forEach((milestone) => {
    const status = statuses[milestone.id] || "not-started";
    const strategy = getMilestoneStrategy(milestone.id);

    lines.push(`### ${milestone.number}. ${milestone.title}`);
    lines.push("");
    lines.push(`- Phase: ${milestone.phase}`);
    lines.push(`- Status: ${statusLabel(status)}`);
    lines.push(`- Driver: ${milestone.driver}`);
    lines.push(`- Duration: ${milestone.duration} min`);
    lines.push(`- Objective: ${milestone.objective}`);
    if (strategy) {
      lines.push(`- Headless principle: ${strategy.principle}`);
      lines.push(`- Customer takeaway: ${strategy.customerTakeaway}`);
    }
    lines.push("- Produced artifacts:");
    milestone.producedArtifacts.forEach((artifact) => lines.push(`  - ${artifact}`));
    lines.push("- Validation command or prompt:");
    lines.push("```");
    lines.push(milestone.validation.code);
    lines.push("```");
    lines.push("- Expected evidence:");
    milestone.expectedOutput.forEach((item) => lines.push(`  - ${item}`));
    if (status === "blocked") {
      lines.push("- Recovery guidance:");
      milestone.recovery.forEach((item) => lines.push(`  - ${item}`));
    }
    lines.push("");
  });

  lines.push("## Continuation Path");
  lines.push("");
  lines.push("- Keep the generated Salesforce project as the durable build artifact.");
  lines.push("- Use the validation commands above before moving from demo work into POC hardening.");
  lines.push("- Carry unresolved blockers into the extension labs before adding UI, data, deployment, testing, or Agentforce work.");
  lines.push("");

  return lines.join("\n");
}
