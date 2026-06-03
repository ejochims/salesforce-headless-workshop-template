import React from "react";
import { colors } from "../theme";

interface BrandHeaderProps {
  onHome: () => void;
  referenceActive: boolean;
  onToggleReference: () => void;
}

export function BrandHeader({ onHome, referenceActive, onToggleReference }: BrandHeaderProps) {
  return (
    <header
      className="brand-header"
      style={{
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "0 28px",
        borderBottom: `1px solid ${colors.border}`,
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(12px)",
        flexShrink: 0,
        position: "relative",
        zIndex: 20,
        flexWrap: "wrap",
      }}
    >
      <div
        className="brand-lockup"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          minWidth: 0,
        }}
      >
        <TextMark title="Agentic Workshop" subtitle="Coding harness" />
        <Divider />
        <TextMark title="Salesforce" subtitle="Enterprise platform" accent />
      </div>

      <div
        className="brand-title"
        style={{
          marginLeft: "auto",
          display: "grid",
          gridTemplateColumns: "minmax(180px, auto) auto auto",
          alignItems: "center",
          gap: "14px",
          minWidth: "180px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
          <span
            style={{
              color: colors.ink,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            Headless 360 Workshop
          </span>
          <span style={{ color: colors.textMuted, fontSize: "11px", fontWeight: 600 }}>
            Salesforce build path for Acme Logistics
          </span>
        </div>
        <button onClick={onToggleReference} style={referenceButtonStyle(referenceActive)}>
          Reference
        </button>
        <button onClick={onHome} style={headerButtonStyle}>
          Home
        </button>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .brand-header {
            padding: 8px 12px !important;
            gap: 6px !important;
          }
          .brand-lockup {
            width: 100%;
            gap: 8px !important;
          }
          .brand-title {
            margin-left: 0 !important;
            align-items: flex-start !important;
            min-width: 0 !important;
            grid-template-columns: 1fr auto auto !important;
            width: 100%;
          }
          .brand-title div span:last-child {
            display: none;
          }
          .text-mark {
            min-width: 0 !important;
          }
          .text-mark-title {
            font-size: 13px !important;
          }
          .text-mark-subtitle {
            display: none !important;
          }
          .brand-divider {
            height: 22px !important;
          }
        }
      `}</style>
    </header>
  );
}

function TextMark({ title, subtitle, accent = false }: { title: string; subtitle: string; accent?: boolean }) {
  return (
    <div className="text-mark" style={{ display: "grid", gap: "1px", minWidth: "118px" }}>
      <span
        className="text-mark-title"
        style={{
          color: accent ? colors.salesforceBlue : colors.ink,
          fontSize: "15px",
          fontWeight: 900,
          letterSpacing: 0,
          lineHeight: 1.05,
        }}
      >
        {title}
      </span>
      <span
        className="text-mark-subtitle"
        style={{
          color: colors.textMuted,
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: 0,
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <span
      className="brand-divider"
      aria-hidden="true"
      style={{
        display: "block",
        width: "1px",
        height: "28px",
        background: colors.border,
      }}
    />
  );
}

function referenceButtonStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? colors.brandBlue : colors.surface,
    border: `1px solid ${active ? colors.brandBlue : colors.border}`,
    borderRadius: "999px",
    color: active ? "#FFFFFF" : colors.text,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 800,
    padding: "7px 11px",
    boxShadow: "0 10px 24px rgba(16, 24, 40, 0.10)",
  };
}

const headerButtonStyle: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "999px",
  color: colors.text,
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 800,
  padding: "7px 11px",
  boxShadow: "0 10px 24px rgba(16, 24, 40, 0.10)",
};
