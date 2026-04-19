"use client";

import { LaunchContent } from "@/types/project";
import { ClipboardList, Users, Radio, TrendingUp, MessageSquare, BarChart2, Check } from "lucide-react";

const PHASES = [
  {
    id: "pre",
    label: "Pre-Launch",
    sublabel: "Validate & prepare",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
  },
  {
    id: "beta",
    label: "Beta",
    sublabel: "Early adopters",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    id: "launch",
    label: "Launch",
    sublabel: "Go live",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  {
    id: "post",
    label: "Post-Launch",
    sublabel: "Grow & iterate",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
  },
] as const;

function MilestoneItem({ text, color }: { text: string; color: string }) {
  return (
    <div style={{
      display: "flex", gap: 9, alignItems: "flex-start",
      padding: "8px 0",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        background: `${color}18`, border: `1.5px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 1,
      }}>
        <Check size={10} color={color} strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

export function LaunchSection({ content }: { content: LaunchContent }) {
  if (!content) return null;
  const phasedItems = [
    content.validationPlan ?? [],
    [...(content.betaUserProfile ? [content.betaUserProfile] : []), ...(content.feedbackLoop ?? [])],
    [...(content.preLaunchChecklist ?? []), ...(content.launchChannels ?? [])],
    [...(content.first30Days ?? []), ...(content.analyticsGoals ?? [])],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Phase track header */}
      <div style={{
        background: "white",
        border: "1px solid var(--forge-border)",
        borderRadius: 16,
        padding: "20px 24px",
        overflowX: "auto",
      }}>
        <div style={{ position: "relative", minWidth: 500 }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute",
            top: 20, left: "12.5%", right: "12.5%", height: 2,
            background: "linear-gradient(90deg, #7c3aed, #2563eb, #059669, #ea580c)",
            opacity: 0.3,
          }} />
          {/* Phase dots */}
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {PHASES.map((phase, i) => (
              <div key={phase.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: phase.bg,
                  border: `2px solid ${phase.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10, zIndex: 1,
                  boxShadow: `0 0 0 4px white`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: phase.color }}>
                    {i + 1}
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)", letterSpacing: "-0.01em", textAlign: "center" }}>
                  {phase.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--forge-text-muted)", marginTop: 2 }}>
                  {phase.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {PHASES.map((phase, i) => {
          const items = phasedItems[i];
          return (
            <div key={phase.id} style={{
              background: phase.bg,
              border: `1px solid ${phase.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}>
              <div style={{
                padding: "14px 16px 12px",
                borderBottom: `1px solid ${phase.border}`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: phase.color }}>{phase.label}</span>
              </div>
              <div style={{ padding: "12px 16px" }}>
                {items.map((item, j) => (
                  <MilestoneItem key={j} text={item} color={phase.color} />
                ))}
                {items.length === 0 && (
                  <p style={{ fontSize: 12, color: phase.color, opacity: 0.5, textAlign: "center", padding: "16px 0" }}>
                    —
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Launch channels */}
      {content.launchChannels?.length > 0 && (
        <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Radio size={14} color="#ea580c" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--forge-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Launch Channels
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {content.launchChannels.map((channel, i) => (
              <span key={i} style={{
                fontSize: 13, fontWeight: 600,
                padding: "6px 14px", borderRadius: 20,
                background: "#fff7ed", color: "#ea580c",
                border: "1px solid #fed7aa",
              }}>
                {channel}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Analytics goals */}
      {content.analyticsGoals?.length > 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <BarChart2 size={14} color="#16a34a" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Analytics Goals
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {content.analyticsGoals.map((goal, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 500, padding: "5px 12px",
                background: "white", border: "1px solid #bbf7d0",
                borderRadius: 20, color: "#166534",
              }}>
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
