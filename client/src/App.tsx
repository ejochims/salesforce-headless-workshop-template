import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BrandHeader } from "./components/BrandHeader";
import { SectionNav } from "./components/SectionNav";
import { ReferenceDrawer, type ReferencePanel } from "./components/ReferenceDrawer";
import { Landing } from "./sections/00-Landing";
import { ExerciseSection } from "./sections/ExerciseSection";
import { WrapUp } from "./sections/05-WrapUp";
import { milestones } from "./content/exercises";
import type { MilestoneStatus, MilestoneStatusMap } from "./content/workshopStatus";
import { colors } from "./theme";

const STORAGE_KEY = "workshop-section";
const STATUS_STORAGE_KEY = "workshop-status";
const TOTAL_SECTIONS = milestones.length + 2;

function loadStatuses(): MilestoneStatusMap {
  try {
    const parsed = JSON.parse(localStorage.getItem(STATUS_STORAGE_KEY) || "{}") as MilestoneStatusMap;
    return milestones.reduce<MilestoneStatusMap>((acc, milestone) => {
      const status = parsed[milestone.id];
      acc[milestone.id] =
        status === "in-progress" || status === "verified" || status === "blocked" ? status : "not-started";
      return acc;
    }, {});
  } catch {
    return milestones.reduce<MilestoneStatusMap>((acc, milestone) => {
      acc[milestone.id] = "not-started";
      return acc;
    }, {});
  }
}

export default function App() {
  const [section, setSection] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? parseInt(saved, 10) : 0;
    return Number.isFinite(parsed) ? Math.max(0, Math.min(TOTAL_SECTIONS - 1, parsed)) : 0;
  });
  const [referencePanel, setReferencePanel] = useState<ReferencePanel>(null);
  const [statuses, setStatuses] = useState<MilestoneStatusMap>(loadStatuses);

  const labels = useMemo(
    () => ["Start", ...milestones.map((milestone) => milestone.phase), "Wrap Up"],
    [],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(section));
  }, [section]);

  useEffect(() => {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(statuses));
  }, [statuses]);

  const navigate = useCallback((dir: 1 | -1) => {
    setSection((s) => Math.max(0, Math.min(TOTAL_SECTIONS - 1, s + dir)));
  }, []);

  const updateStatus = useCallback((milestoneId: string, status: MilestoneStatus) => {
    setStatuses((current) => ({ ...current, [milestoneId]: status }));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "j":
          navigate(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "k":
          navigate(-1);
          break;
        case "r":
          setReferencePanel((p) => (p ? null : "what-is-mcp"));
          break;
        case "1":
          setReferencePanel("what-is-mcp");
          break;
        case "2":
          setReferencePanel("customer-infra");
          break;
        case "3":
          setReferencePanel("headless360");
          break;
        case "4":
          setReferencePanel("sf-skills");
          break;
        case "5":
          setReferencePanel("scratch-org");
          break;
        case "Escape":
          setReferencePanel(null);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  const renderSection = () => {
    if (section === 0) {
      return (
        <Landing
          onStart={() => setSection(1)}
          onNavigate={(index) => setSection(index + 1)}
          statuses={statuses}
        />
      );
    }
    if (section >= 1 && section <= milestones.length) {
      const milestoneIndex = section - 1;
      return (
        <ExerciseSection
          milestone={milestones[milestoneIndex]}
          milestones={milestones}
          milestoneIndex={milestoneIndex}
          onNavigate={setSection}
          statuses={statuses}
          onStatusChange={updateStatus}
        />
      );
    }
    return <WrapUp statuses={statuses} />;
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: colors.bg,
        color: colors.ink,
      }}
    >
      <BrandHeader
        onHome={() => {
          setReferencePanel(null);
          setSection(0);
        }}
        referenceActive={Boolean(referencePanel)}
        onToggleReference={() => setReferencePanel((p) => (p ? null : "scratch-org"))}
      />

      <div style={{ height: "3px", background: "#E8EEF6", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            width: `${(section / (TOTAL_SECTIONS - 1)) * 100}%`,
            background: `linear-gradient(90deg, ${colors.brandPrimary}, ${colors.salesforceBlue})`,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{renderSection()}</div>

      <SectionNav total={TOTAL_SECTIONS} current={section} onNavigate={setSection} labels={labels} />

      <ReferenceDrawer
        panel={referencePanel}
        onClose={() => setReferencePanel(null)}
        onSwitch={setReferencePanel}
      />
    </div>
  );
}
