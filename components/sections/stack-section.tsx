"use client";

import { StackContent } from "@/types/project";
import { Monitor, Server, Database, Lock, Cloud, BarChart2, ArrowDown, Zap, Scale } from "lucide-react";

const LAYERS = [
  {
    id: "client",
    label: "Client Layer",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    nodes: [{ key: "frontend" as const, label: "Frontend", icon: Monitor }],
  },
  {
    id: "api",
    label: "API Layer",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#e9d5ff",
    nodes: [{ key: "backend" as const, label: "Backend", icon: Server }],
  },
  {
    id: "data",
    label: "Data Layer",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    nodes: [
      { key: "database" as const, label: "Database", icon: Database },
      { key: "auth" as const, label: "Auth", icon: Lock },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    nodes: [
      { key: "infra" as const, label: "Infrastructure", icon: Cloud },
      { key: "analytics" as const, label: "Analytics", icon: BarChart2 },
    ],
  },
] as const;

function TechNode({
  icon: Icon, label, value, color, bg,
}: {
  icon: React.ElementType; label: string; value: string; color: string; bg: string;
}) {
  return (
    <div style={{
      background: "white",
      border: `1.5px solid ${color}22`,
      borderRadius: 14,
      padding: "16px 18px",
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} color={color} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {label}
        </span>
      </div>
      <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.5, fontWeight: 500 }}>{value}</p>
    </div>
  );
}

function LayerConnector({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0", position: "relative" }}>
      <div style={{ width: 1.5, height: 28, background: `linear-gradient(to bottom, ${color}60, ${color}20)` }} />
      <ArrowDown size={14} color={`${color}60`} style={{ position: "absolute", bottom: 0 }} />
    </div>
  );
}

function normalizeStack(raw: unknown): StackContent | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  // Direct flat structure
  if (typeof obj.frontend === "string") return obj as unknown as StackContent;
  // Gemini sometimes wraps under a nested key — find the first object value that has "frontend"
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object" && typeof (val as Record<string, unknown>).frontend === "string") {
      return val as unknown as StackContent;
    }
  }
  return obj as unknown as StackContent;
}

export function StackSection({ content }: { content: StackContent }) {
  const normalized = normalizeStack(content);
  if (!normalized) return null;
  const c = normalized;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Architecture diagram */}
      <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 20, padding: "28px 28px 22px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 22 }}>
          System Architecture
        </div>

        {LAYERS.map((layer, li) => (
          <div key={layer.id}>
            {/* Layer */}
            <div style={{
              background: layer.bg,
              border: `1px solid ${layer.border}`,
              borderRadius: 14,
              padding: "16px 18px",
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: layer.color,
                textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 12,
              }}>
                {layer.label}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {layer.nodes.map(node => (
                  <TechNode
                    key={node.key}
                    icon={node.icon}
                    label={node.label}
                    value={String(c[node.key] ?? "—")}
                    color={layer.color}
                    bg="white"
                  />
                ))}
              </div>
            </div>

            {/* Connector to next layer */}
            {li < LAYERS.length - 1 && <LayerConnector color={LAYERS[li + 1].color} />}
          </div>
        ))}
      </div>

      {/* Tradeoffs */}
      {(c.tradeoffs?.length ?? 0) > 0 && (
        <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 16, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Scale size={14} color="var(--forge-blue)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--forge-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Tradeoffs
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {c.tradeoffs.map((t, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                padding: "9px 12px", background: "var(--forge-surface)",
                borderRadius: 10, border: "1px solid var(--forge-border)",
              }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--forge-blue-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "var(--forge-blue)" }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.5, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {c.beginnerVersion && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Zap size={13} color="#16a34a" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Beginner Stack
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: "#166534", lineHeight: 1.6 }}>{c.beginnerVersion}</p>
          </div>
        )}
        {c.scalableVersion && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 16, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Scale size={13} color="var(--forge-blue)" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Scalable Stack
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: "#1e40af", lineHeight: 1.6 }}>{c.scalableVersion}</p>
          </div>
        )}
      </div>
    </div>
  );
}
