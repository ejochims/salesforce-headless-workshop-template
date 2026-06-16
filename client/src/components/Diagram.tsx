import React, { useEffect, useRef } from "react";
import { colors, layout } from "../theme";

interface DiagramProps {
  definition: string;
  title?: string;
}

export function Diagram({ definition, title }: DiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: colors.surfaceBlue,
          primaryTextColor: colors.ink,
          primaryBorderColor: "#B2DDFF",
          lineColor: colors.textMuted,
          secondaryColor: colors.surfaceSoft,
          tertiaryColor: "#FFFAEB",
          background: colors.surface,
          mainBkg: colors.surface,
          nodeBorder: colors.borderStrong,
          clusterBkg: colors.surfaceSoft,
          titleColor: colors.ink,
          edgeLabelBackground: colors.surface,
          fontFamily: "Inter, system-ui, sans-serif",
        },
      });

      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      mermaid
        .render(id, definition)
        .then(({ svg }) => {
          if (!cancelled && ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.warn("Mermaid render error:", err);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [definition]);

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: layout.radiusSm,
        padding: "18px",
        overflow: "auto",
      }}
    >
      {title && (
        <div
          style={{
            color: colors.brandPrimary,
            fontSize: "11px",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: 0,
            fontWeight: 900,
            marginBottom: "14px",
          }}
        >
          {title}
        </div>
      )}
      <div ref={ref} style={{ display: "flex", justifyContent: "center" }} />
    </div>
  );
}
