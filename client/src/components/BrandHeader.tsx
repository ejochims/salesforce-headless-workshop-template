import React from "react";
import { colors } from "../theme";

const brandAssets = {
  salesforce: "/assets/brand/salesforce-logo.jpg",
  codePuppy: "/assets/brand/code-puppy-transparent.png",
};

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
          gap: "18px",
          minWidth: 0,
        }}
      >
        <BrandLogo
          label="Code Puppy"
          src={brandAssets.codePuppy}
          width={116}
        />
        <Divider />
        <BrandLogo
          label="Salesforce"
          src={brandAssets.salesforce}
          width={132}
          height={38}
          className="brand-logo-salesforce"
        />
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
            Salesforce Headless Workshop
          </span>
          <span style={{ color: colors.textMuted, fontSize: "11px", fontWeight: 600 }}>
            Build path for the Acme Transport scenario
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
          .brand-logo img {
            width: auto !important;
            max-width: 96px !important;
            height: 24px !important;
          }
          .brand-divider {
            height: 22px !important;
          }
          .brand-logo-salesforce {
            margin-left: -2px !important;
          }
        }
        .brand-logo-salesforce {
          margin-left: -8px;
        }
      `}</style>
    </header>
  );
}

function BrandLogo({
  src,
  label,
  width,
  height = 30,
  extra,
  fit = "contain",
  className,
}: {
  src: string;
  label: string;
  width: number;
  height?: number;
  extra?: React.ReactNode;
  fit?: React.CSSProperties["objectFit"];
  className?: string;
}) {
  return (
    <div className={`brand-logo ${className ?? ""}`} style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
      {extra}
      <img
        src={src}
        alt={`${label} logo`}
        style={{
          display: "block",
          width,
          height,
          objectFit: fit,
          borderRadius: fit === "cover" ? "4px" : 0,
        }}
      />
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
    background: active ? colors.brandPrimary : colors.surface,
    border: `1px solid ${active ? colors.brandPrimary : colors.border}`,
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
