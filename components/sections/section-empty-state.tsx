"use client";

import { RefreshCw, Sparkles } from "lucide-react";

interface Props {
  sectionName: string;
  description: string;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export function SectionEmptyState({ sectionName, description, onGenerate, isGenerating }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 32px",
        textAlign: "center",
        background: "white",
        borderRadius: 20,
        border: "2px dashed var(--forge-border)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "var(--forge-blue-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Sparkles size={24} color="var(--forge-blue)" />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--forge-text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
        {sectionName} not generated yet
      </h3>
      <p style={{ fontSize: 14, color: "var(--forge-text-muted)", marginBottom: 28, maxWidth: 340, lineHeight: 1.6 }}>
        {description}
      </p>
      {onGenerate && (
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="forge-btn-primary"
          style={{ padding: "10px 22px", fontSize: 14 }}
        >
          {isGenerating ? (
            <>
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw size={14} />
              Generate {sectionName}
            </>
          )}
        </button>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
