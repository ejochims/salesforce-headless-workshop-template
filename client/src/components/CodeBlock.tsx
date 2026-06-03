import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { colors, layout } from "../theme";

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
}

export function CodeBlock({ code, lang = "bash", title }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code.trim(), { lang, theme: "github-light" }).then((nextHtml) => {
      if (!cancelled) setHtml(nextHtml);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  const copy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: layout.radiusSm,
        border: `1px solid ${colors.border}`,
        overflow: "hidden",
        background: colors.surface,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          minHeight: "36px",
          padding: "8px 12px",
          background: colors.surfaceSoft,
          borderBottom: `1px solid ${colors.border}`,
          color: colors.textMuted,
          fontSize: "12px",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontWeight: 600 }}>{title || lang}</span>
        <button onClick={copy} style={copyBtnStyle(copied)}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {html ? (
        <div
          className="code-block-html"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ margin: 0, overflowX: "auto" }}
        />
      ) : (
        <pre
          style={{
            margin: 0,
            padding: "14px",
            background: "#FFFFFF",
            color: colors.ink,
            overflowX: "auto",
            lineHeight: 1.6,
          }}
        >
          <code>{code.trim()}</code>
        </pre>
      )}
      <style>{`
        .code-block-html pre {
          margin: 0 !important;
          padding: 14px !important;
          overflow-x: auto !important;
          line-height: 1.6 !important;
          background: #ffffff !important;
        }
      `}</style>
    </div>
  );
}

function copyBtnStyle(copied: boolean): React.CSSProperties {
  return {
    background: copied ? colors.greenBg : colors.surface,
    border: `1px solid ${copied ? "#ABEFC6" : colors.border}`,
    borderRadius: "999px",
    cursor: "pointer",
    color: copied ? colors.green : colors.text,
    fontSize: "12px",
    padding: "4px 10px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    transition: "all 0.15s ease",
    flexShrink: 0,
  };
}
