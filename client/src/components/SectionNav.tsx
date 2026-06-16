import React from "react";
import { colors } from "../theme";

interface SectionNavProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
  labels: string[];
}

export function SectionNav({ total, current, onNavigate, labels }: SectionNavProps) {
  return (
    <nav
      aria-label="Workshop sections"
      style={{
        position: "fixed",
        right: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 100,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={labels[i]}
          title={labels[i]}
          onClick={() => onNavigate(i)}
          style={{
            width: "8px",
            height: i === current ? "26px" : "8px",
            borderRadius: "999px",
            border: `1px solid ${i === current ? colors.brandPrimary : colors.borderStrong}`,
            cursor: "pointer",
            background: i === current ? colors.brandPrimary : i < current ? "#C8D7EA" : colors.surface,
            boxShadow: i === current ? "0 0 0 4px rgba(0, 83, 226, 0.12)" : "none",
            transition: "all 0.2s ease",
            padding: 0,
          }}
        />
      ))}
    </nav>
  );
}
