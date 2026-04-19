"use client";

import { useState } from "react";
import { WireframesContent, Screen } from "@/types/project";
import { ChevronLeft, ChevronRight, MousePointer2, Lightbulb } from "lucide-react";

// Map component names to visual block properties
function getBlockStyle(comp: string, index: number): { bg: string; height: number; flex?: number; label: string } {
  const c = comp.toLowerCase();
  if (/nav|header|topbar|toolbar/.test(c)) return { bg: "#e5e7eb", height: 44, label: comp };
  if (/sidebar|panel|drawer|menu/.test(c)) return { bg: "#f3f4f6", height: 0, flex: 1, label: comp };
  if (/hero|banner|splash|jumbotron/.test(c)) return { bg: "#dbeafe", height: 100, label: comp };
  if (/cta|button|action|submit/.test(c)) return { bg: "#2563eb", height: 36, label: comp };
  if (/form|input|field|search/.test(c)) return { bg: "#f9fafb", height: 72, label: comp };
  if (/card|item|list|feed/.test(c)) return { bg: "#f3f4f6", height: 56, label: comp };
  if (/modal|dialog|popup/.test(c)) return { bg: "#faf5ff", height: 80, label: comp };
  if (/footer/.test(c)) return { bg: "#e5e7eb", height: 48, label: comp };
  if (/image|photo|avatar|thumbnail/.test(c)) return { bg: "#ede9fe", height: 80, label: comp };
  if (/chart|graph|stat|metric/.test(c)) return { bg: "#d1fae5", height: 80, label: comp };
  // Default: alternate shades
  const shades = ["#f9fafb", "#f3f4f6", "#ede9fe", "#dbeafe", "#d1fae5"];
  return { bg: shades[index % shades.length], height: 52, label: comp };
}

function ScreenFrame({ screen }: { screen: Screen }) {
  const hasSidebar = screen.keyComponents.some(c => /sidebar|panel|drawer/i.test(c));
  const navComp = screen.keyComponents.find(c => /nav|header|topbar/i.test(c));
  const footerComp = screen.keyComponents.find(c => /footer/i.test(c));
  const bodyComponents = screen.keyComponents.filter(c =>
    c !== navComp && c !== footerComp && !/sidebar|panel|drawer/i.test(c)
  );
  const sidebarComp = screen.keyComponents.find(c => /sidebar|panel|drawer/i.test(c));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Browser chrome */}
      <div style={{
        background: "white",
        border: "1.5px solid var(--forge-border)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}>
        {/* Browser bar */}
        <div style={{
          background: "#f3f4f6", padding: "10px 14px",
          borderBottom: "1px solid var(--forge-border)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, background: "white", borderRadius: 6,
            border: "1px solid #e5e7eb", padding: "4px 12px",
            fontSize: 11, color: "#9ca3af",
          }}>
            {screen.name}
          </div>
        </div>

        {/* Screen content */}
        <div style={{ background: "#fafafa", minHeight: 260, display: "flex", flexDirection: "column" }}>
          {/* Nav */}
          {navComp && (
            <div style={{
              background: "#e5e7eb", height: 44,
              display: "flex", alignItems: "center", padding: "0 14px",
              borderBottom: "1px solid #d1d5db",
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {navComp}
              </span>
            </div>
          )}

          {/* Body: sidebar + content */}
          <div style={{ display: "flex", flex: 1 }}>
            {/* Sidebar */}
            {sidebarComp && (
              <div style={{
                width: "28%", background: "#f3f4f6",
                borderRight: "1px solid #e5e7eb",
                padding: "12px 10px",
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  {sidebarComp}
                </div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ height: 24, background: "#e5e7eb", borderRadius: 5, marginBottom: 5 }} />
                ))}
              </div>
            )}

            {/* Main content */}
            <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {bodyComponents.map((comp, i) => {
                const block = getBlockStyle(comp, i);
                const isCTA = /cta|button|action|submit/i.test(comp);
                return (
                  <div key={i} style={{
                    background: block.bg,
                    height: block.flex ? undefined : block.height,
                    flex: block.flex,
                    borderRadius: 8,
                    display: "flex", alignItems: "center",
                    padding: "0 12px",
                    border: isCTA ? "none" : "1px solid rgba(0,0,0,0.06)",
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                      color: isCTA ? "white" : "#6b7280",
                      textTransform: "uppercase",
                    }}>
                      {comp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          {footerComp && (
            <div style={{
              background: "#e5e7eb", height: 40,
              display: "flex", alignItems: "center", padding: "0 14px",
              borderTop: "1px solid #d1d5db",
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {footerComp}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Primary CTA badge */}
      {screen.primaryCTA && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <MousePointer2 size={11} color="var(--forge-blue)" />
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: "var(--forge-blue)",
            background: "var(--forge-blue-light)",
            padding: "2px 10px", borderRadius: 20,
          }}>
            CTA: {screen.primaryCTA}
          </span>
        </div>
      )}
    </div>
  );
}

export function WireframesSection({ content }: { content: WireframesContent }) {
  const [active, setActive] = useState(0);
  if (!content?.screens?.length) return null;
  const screen = content.screens[active];
  if (!screen) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Screen selector tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {content.screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "7px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600,
              whiteSpace: "nowrap", cursor: "pointer", border: "1.5px solid",
              borderColor: active === i ? "var(--forge-blue)" : "var(--forge-border)",
              background: active === i ? "var(--forge-blue-light)" : "white",
              color: active === i ? "var(--forge-blue)" : "var(--forge-text-muted)",
              transition: "all 0.12s",
            }}
          >
            <span style={{ opacity: 0.6, marginRight: 4 }}>{String(i + 1).padStart(2, "0")}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Screen frame + notes side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
        <ScreenFrame screen={screen} />

        {/* Metadata panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Purpose
            </div>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{screen.purpose}</p>
          </div>

          {screen.secondaryCTAs?.length > 0 && (
            <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                Secondary CTAs
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {screen.secondaryCTAs.map((cta, i) => (
                  <span key={i} style={{ fontSize: 12, padding: "4px 10px", background: "var(--forge-surface)", border: "1px solid var(--forge-border)", borderRadius: 8, color: "var(--forge-text-muted)" }}>
                    {cta}
                  </span>
                ))}
              </div>
            </div>
          )}

          {screen.layoutNotes?.length > 0 && (
            <div style={{ background: "#f9fafb", border: "1px solid var(--forge-border)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                Layout Notes
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {screen.layoutNotes.map((note, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.45 }}>• {note}</div>
                ))}
              </div>
            </div>
          )}

          {screen.uxNotes?.length > 0 && (
            <div style={{ background: "var(--forge-blue-light)", border: "1px solid #bfdbfe", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <Lightbulb size={12} color="var(--forge-blue)" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--forge-blue)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  UX Notes
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {screen.uxNotes.map((note, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: "#1e40af", lineHeight: 1.45 }}>• {note}</div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              style={{ flex: 1, padding: "8px", borderRadius: 9, border: "1px solid var(--forge-border)", background: "white", cursor: active === 0 ? "not-allowed" : "pointer", opacity: active === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} color="var(--forge-text-muted)" style={{ margin: "0 auto", display: "block" }} />
            </button>
            <button
              onClick={() => setActive(Math.min(content.screens.length - 1, active + 1))}
              disabled={active === content.screens.length - 1}
              style={{ flex: 1, padding: "8px", borderRadius: 9, border: "1px solid var(--forge-border)", background: "white", cursor: active === content.screens.length - 1 ? "not-allowed" : "pointer", opacity: active === content.screens.length - 1 ? 0.4 : 1 }}
            >
              <ChevronRight size={16} color="var(--forge-text-muted)" style={{ margin: "0 auto", display: "block" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
