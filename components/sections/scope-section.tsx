"use client";

import { ScopeContent, Feature } from "@/types/project";
import { CheckCircle2, Circle, Clock, X, AlertTriangle, Minus } from "lucide-react";

const COLUMNS = [
  {
    key: "mvpFeatures" as const,
    label: "MVP",
    sublabel: "Must ship",
    icon: CheckCircle2,
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    headerBg: "#16a34a",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
  },
  {
    key: "niceToHaveFeatures" as const,
    label: "Nice-to-Have",
    sublabel: "Next phase",
    icon: Circle,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    headerBg: "#d97706",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
  },
  {
    key: "futureFeatures" as const,
    label: "Future",
    sublabel: "Roadmap",
    icon: Clock,
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
    headerBg: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeColor: "#5b21b6",
  },
  {
    key: "outOfScope" as const,
    label: "Out of Scope",
    sublabel: "Won't build",
    icon: X,
    color: "#9ca3af",
    bg: "#f9fafb",
    border: "#e5e7eb",
    headerBg: "#6b7280",
    badgeBg: "#f3f4f6",
    badgeColor: "#4b5563",
  },
] as const;

function FeatureCard({ feature, accentColor, accentBg }: { feature: Feature; accentColor: string; accentBg: string }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid var(--forge-border)",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)", lineHeight: 1.3, flex: 1 }}>
          {feature.name}
        </span>
        {feature.priority && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: accentColor, background: accentBg,
            padding: "2px 7px", borderRadius: 20, flexShrink: 0, alignSelf: "flex-start",
          }}>
            {feature.priority}
          </span>
        )}
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, marginBottom: feature.reason ? 7 : 0 }}>
        {feature.description}
      </p>
      {feature.reason && (
        <p style={{ fontSize: 11, color: "#9ca3af", fontStyle: "italic", lineHeight: 1.4 }}>
          {feature.reason}
        </p>
      )}
    </div>
  );
}

function OutOfScopeItem({ item }: { item: string }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid var(--forge-border)",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 8,
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
    }}>
      <Minus size={13} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.45 }}>{item}</span>
    </div>
  );
}

export function ScopeSection({ content }: { content: ScopeContent }) {
  if (!content) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Kanban board */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14,
        minWidth: 0,
        overflowX: "auto",
      }}>
        {COLUMNS.map(col => {
          const items = col.key === "outOfScope" ? content.outOfScope : content[col.key];
          const count = items?.length ?? 0;
          const Icon = col.icon;

          return (
            <div key={col.key} style={{
              background: col.bg,
              border: `1px solid ${col.border}`,
              borderRadius: 16,
              overflow: "hidden",
              minWidth: 230,
            }}>
              {/* Column header */}
              <div style={{
                padding: "14px 16px 12px",
                borderBottom: `1px solid ${col.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                  <Icon size={13} color={col.color} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: col.color, letterSpacing: "-0.01em" }}>
                    {col.label}
                  </span>
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 700,
                    background: col.badgeBg, color: col.badgeColor,
                    padding: "1px 8px", borderRadius: 20,
                  }}>
                    {count}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: col.color, opacity: 0.7 }}>{col.sublabel}</span>
              </div>

              {/* Cards */}
              <div style={{ padding: "12px 12px 4px" }}>
                {col.key === "outOfScope"
                  ? (content.outOfScope ?? []).map((item, i) => <OutOfScopeItem key={i} item={item} />)
                  : ((content[col.key] ?? []) as Feature[]).map((f, i) => (
                      <FeatureCard key={i} feature={f} accentColor={col.color} accentBg={col.badgeBg} />
                    ))
                }
                {count === 0 && (
                  <div style={{ padding: "20px 0", textAlign: "center", color: col.color, opacity: 0.4, fontSize: 12 }}>
                    Empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Risks */}
      {(content.risks?.length ?? 0) > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <AlertTriangle size={14} color="#d97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Risks to Watch
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(content.risks ?? []).map((risk, i) => (
              <span key={i} style={{
                fontSize: 12, color: "#92400e", background: "white",
                border: "1px solid #fde68a", borderRadius: 8,
                padding: "5px 12px", lineHeight: 1.4,
              }}>
                {risk}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
