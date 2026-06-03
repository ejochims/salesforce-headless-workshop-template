import React, { useState } from "react";
import { colors, layout } from "../theme";

interface TerminalReplayProps {
  prompt: string;
  label?: string;
}

export function TerminalReplay({ prompt, label = "coding agent prompt" }: TerminalReplayProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const didCopy = await copyText(prompt.trim());
    if (!didCopy) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      style={{
        borderRadius: layout.radiusSm,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#F0FBFA",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <span
          style={{
            color: "#176B68",
            fontSize: "12px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
          }}
        >
          {label}
        </span>
        <button
          onClick={copy}
          style={{
            background: copied ? colors.greenBg : colors.surface,
            border: `1px solid ${copied ? "#ABEFC6" : colors.border}`,
            borderRadius: "999px",
            color: copied ? colors.green : colors.text,
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            padding: "4px 10px",
          }}
        >
          {copied ? "Copied" : "Copy Prompt"}
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          background: "#FFFFFF",
          padding: "14px 16px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12.5px",
          color: colors.ink,
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
          overflowX: "auto",
        }}
      >
        {prompt.trim()}
      </pre>
    </div>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
