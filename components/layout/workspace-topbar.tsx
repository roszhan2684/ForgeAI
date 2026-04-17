"use client";

import Link from "next/link";
import { Sparkles, Download, RefreshCw, Hammer } from "lucide-react";

interface Props {
  projectTitle: string;
  projectId: string;
  onExport?: () => void;
  onGenerateAll?: () => void;
  isGenerating?: boolean;
}

export function WorkspaceTopbar({
  projectTitle,
  projectId,
  onExport,
  onGenerateAll,
  isGenerating,
}: Props) {
  return (
    <div
      style={{
        height: 56,
        background: "white",
        borderBottom: "1px solid var(--forge-border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
        <div
          style={{
            width: 26,
            height: 26,
            background: "var(--forge-blue)",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={13} color="white" />
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--forge-text)",
          }}
        >
          FORGE
        </span>
      </Link>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 20,
          background: "var(--forge-border)",
        }}
      />

      {/* Project title */}
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--forge-text)",
          letterSpacing: "-0.01em",
          maxWidth: 240,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {projectTitle}
      </span>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onGenerateAll && (
          <button
            onClick={onGenerateAll}
            disabled={isGenerating}
            className="forge-btn-secondary"
            style={{ padding: "6px 14px", fontSize: 13, gap: 6 }}
          >
            <RefreshCw size={13} style={{ animation: isGenerating ? "spin 1s linear infinite" : "none" }} />
            {isGenerating ? "Generating..." : "Generate All"}
          </button>
        )}

        <Link href={`/projects/${projectId}/build-mode`}>
          <button
            className="forge-btn-secondary"
            style={{ padding: "6px 14px", fontSize: 13, gap: 6, color: "#7c3aed", borderColor: "#ede9fe" }}
          >
            <Hammer size={13} />
            Build Mode
          </button>
        </Link>

        {onExport && (
          <button
            onClick={onExport}
            className="forge-btn-primary"
            style={{ padding: "6px 14px", fontSize: 13, gap: 6 }}
          >
            <Download size={13} />
            Export
          </button>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
