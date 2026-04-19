"use client";

import { OverviewContent } from "@/types/project";
import { Sparkles, Target, Lightbulb, Users, TrendingUp, Zap, BarChart2 } from "lucide-react";

export function OverviewSection({ content }: { content: OverviewContent }) {
  if (!content) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Hero product snapshot */}
      <div style={{
        background: "linear-gradient(135deg, #0f1117 0%, #1e1b4b 60%, #312e81 100%)",
        borderRadius: 20,
        padding: "36px 40px",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Name chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", alignSelf: "center" }}>
            Name suggestions
          </span>
          {(content.productNameSuggestions ?? []).map(name => (
            <span key={name} style={{
              padding: "5px 14px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.01em",
            }}>
              {name}
            </span>
          ))}
        </div>

        {/* One-line summary */}
        <h2 style={{
          fontSize: "clamp(20px, 3vw, 30px)",
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.035em",
          lineHeight: 1.2,
          marginBottom: 18,
          maxWidth: 680,
        }}>
          {content.oneLineSummary}
        </h2>

        {/* Why now */}
        <div style={{
          display: "inline-flex", alignItems: "flex-start", gap: 10,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12, padding: "12px 16px",
          maxWidth: 600,
        }}>
          <Zap size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: 0 }}>
            <span style={{ color: "#fbbf24", fontWeight: 700 }}>Why now: </span>
            {content.whyNow}
          </p>
        </div>

        {/* Decorative gradient orb */}
        <div style={{
          position: "absolute", right: -60, top: -60,
          width: 280, height: 280,
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
      </div>

      {/* 2×2 value grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <ValueCard
          icon={Lightbulb} iconColor="#ea580c" iconBg="#fff7ed"
          label="Problem"
          value={content.problemStatement}
          accentLeft="#ea580c"
        />
        <ValueCard
          icon={Users} iconColor="#7c3aed" iconBg="#faf5ff"
          label="Target Audience"
          value={content.targetAudience}
          accentLeft="#7c3aed"
        />
        <ValueCard
          icon={Target} iconColor="#16a34a" iconBg="#f0fdf4"
          label="Value Proposition"
          value={content.valueProposition}
          accentLeft="#16a34a"
        />
        <ValueCard
          icon={TrendingUp} iconColor="#2563eb" iconBg="#eff6ff"
          label="Unique Angle"
          value={content.uniqueAngle}
          accentLeft="#2563eb"
        />
      </div>

      {/* Success metrics */}
      <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 16, padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <BarChart2 size={14} color="var(--forge-blue)" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--forge-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Success Metrics
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {(content.successMetrics ?? []).map((metric, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--forge-surface)", border: "1px solid var(--forge-border)",
              borderRadius: 10, padding: "8px 14px",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--forge-blue)", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--forge-text-secondary)", fontWeight: 500 }}>{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueCard({
  icon: Icon, iconColor, iconBg, label, value, accentLeft,
}: {
  icon: React.ElementType; iconColor: string; iconBg: string;
  label: string; value: string; accentLeft: string;
}) {
  return (
    <div style={{
      background: "white",
      border: "1px solid var(--forge-border)",
      borderRadius: 16,
      padding: "20px 22px",
      borderLeft: `3px solid ${accentLeft}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color={iconColor} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: 0 }}>{value}</p>
    </div>
  );
}
