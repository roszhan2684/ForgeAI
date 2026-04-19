"use client";

import { PersonasContent } from "@/types/project";
import { Quote } from "lucide-react";

const PALETTE = [
  { bg: "#eff6ff", text: "#2563eb", light: "#dbeafe", tag: "#bfdbfe" },
  { bg: "#faf5ff", text: "#7c3aed", light: "#ede9fe", tag: "#ddd6fe" },
  { bg: "#f0fdf4", text: "#16a34a", light: "#dcfce7", tag: "#bbf7d0" },
  { bg: "#fff7ed", text: "#ea580c", light: "#fed7aa", tag: "#fdba74" },
];

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "4px 10px", borderRadius: 20,
      fontSize: 12, fontWeight: 500,
      background: bg, color,
      border: `1px solid ${color}22`,
      lineHeight: 1.2,
    }}>
      {label}
    </span>
  );
}

function ChipGroup({ label, items, color, bg }: { label: string; items: string[]; color: string; bg: string }) {
  if (!items?.length) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, i) => (
          <Chip key={i} label={item} bg={bg} color={color} />
        ))}
      </div>
    </div>
  );
}

export function PersonasSection({ content }: { content: PersonasContent }) {
  if (!content?.personas?.length) return null;
  const cols = content.personas.length === 1 ? 1 : 2;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 18,
    }}>
      {content.personas.map((persona, idx) => {
        const pal = PALETTE[idx % PALETTE.length];
        const initials = persona.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

        return (
          <div key={persona.name} style={{
            background: "white",
            border: "1px solid var(--forge-border)",
            borderRadius: 20,
            overflow: "hidden",
          }}>
            {/* Color band header */}
            <div style={{
              background: `linear-gradient(135deg, ${pal.bg} 0%, ${pal.light} 100%)`,
              padding: "24px 24px 20px",
              borderBottom: `1px solid ${pal.tag}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                {/* Avatar */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: pal.text, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, flexShrink: 0,
                  boxShadow: `0 4px 12px ${pal.text}44`,
                }}>
                  {initials}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--forge-text)", letterSpacing: "-0.025em", marginBottom: 4 }}>
                    {persona.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--forge-text-muted)", fontWeight: 500, marginBottom: 10 }}>
                    {persona.role}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", background: "white", border: `1px solid ${pal.tag}`, borderRadius: 20, color: pal.text }}>
                      {persona.ageRange}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", background: "white", border: `1px solid ${pal.tag}`, borderRadius: 20, color: pal.text }}>
                      Tech: {persona.techComfort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                marginTop: 18,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(4px)",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <Quote size={14} color={pal.text} style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, fontStyle: "italic", color: pal.text, lineHeight: 1.55, margin: 0 }}>
                  {persona.quote}
                </p>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 24px" }}>
              {/* Primary use case */}
              <div style={{
                background: "var(--forge-surface)", border: "1px solid var(--forge-border)",
                borderRadius: 10, padding: "11px 14px", marginBottom: 18,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Primary Use Case
                </span>
                <p style={{ fontSize: 13, color: "var(--forge-text-secondary)", marginTop: 5, lineHeight: 1.5 }}>
                  {persona.primaryUseCase}
                </p>
              </div>

              {/* Chip groups */}
              <ChipGroup label="Goals" items={persona.goals} color="#16a34a" bg="#f0fdf4" />
              <ChipGroup label="Frustrations" items={persona.frustrations} color="#dc2626" bg="#fef2f2" />
              <ChipGroup label="Motivations" items={persona.motivations} color={pal.text} bg={pal.bg} />

              {/* Behaviors */}
              {persona.behaviors?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                    Behaviors
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {persona.behaviors.map((b, i) => (
                      <span key={i} style={{
                        fontSize: 12, color: "var(--forge-text-muted)",
                        background: "var(--forge-surface)", border: "1px solid var(--forge-border)",
                        padding: "4px 10px", borderRadius: 8,
                      }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
