"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";

// ── Scene definitions ────────────────────────────────────────────────────────

const SCENES = [
  {
    id: "intro",
    duration: 4000,
    narration: "Meet FORGE AI — the fastest way to turn a product idea into a build-ready plan.",
    bgFrom: "#0f1117", bgTo: "#1e1b4b",
  },
  {
    id: "idea",
    duration: 5500,
    narration: "Start with just one sentence. Describe your idea, your target user, and your skill level.",
    bgFrom: "#0f1117", bgTo: "#0c1445",
  },
  {
    id: "generating",
    duration: 5000,
    narration: "Specialized AI agents get to work — strategist, UX designer, architect, and copywriter — simultaneously.",
    bgFrom: "#0a0f2e", bgTo: "#1a0a3e",
  },
  {
    id: "overview",
    duration: 5000,
    narration: "In seconds, you get a complete product overview — one-liner, problem statement, value proposition, and success metrics.",
    bgFrom: "#0f1117", bgTo: "#0d1f3c",
  },
  {
    id: "personas",
    duration: 5000,
    narration: "User personas are crafted with real depth — goals, frustrations, behaviors, and a verbatim user quote.",
    bgFrom: "#130a2e", bgTo: "#1e0f3c",
  },
  {
    id: "scope",
    duration: 5000,
    narration: "Features are ruthlessly prioritized into MVP, nice-to-have, and future scope — with no guesswork.",
    bgFrom: "#0a1f12", bgTo: "#0d2a1a",
  },
  {
    id: "buildmode",
    duration: 5500,
    narration: "Build Mode generates implementation-ready tickets, an API plan, data model, and a Claude Code prompt to scaffold your entire MVP.",
    bgFrom: "#1a0f2e", bgTo: "#2a1060",
  },
  {
    id: "export",
    duration: 4000,
    narration: "Export everything as Markdown — or paste the Claude Code prompt directly into your IDE and start building.",
    bgFrom: "#0f1117", bgTo: "#1e1b4b",
  },
] as const;

type SceneId = typeof SCENES[number]["id"];

// ── Sub-components for each scene ────────────────────────────────────────────

function SceneIntro({ progress }: { progress: number }) {
  const show = progress > 0.1;
  const logoShow = progress > 0.05;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 24 }}>
      <div style={{
        width: 80, height: 80, borderRadius: 22,
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: logoShow ? 1 : 0, transform: logoShow ? "scale(1)" : "scale(0.6)",
        transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 0 60px rgba(99,102,241,0.5)",
      }}>
        <Sparkles size={36} color="white" />
      </div>
      <div style={{
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease", textAlign: "center",
      }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: "white", letterSpacing: "-0.05em", lineHeight: 1 }}>
          FORGE <span style={{ color: "#818cf8" }}>AI</span>
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginTop: 12, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          From idea to build-ready
        </div>
      </div>
      {/* Animated rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.15)",
          width: 80 + i * 120, height: 80 + i * 120,
          animation: `ring-pulse ${1.5 + i * 0.5}s ease-in-out infinite`,
          opacity: 0.5 / i,
        }} />
      ))}
    </div>
  );
}

function SceneIdea({ progress }: { progress: number }) {
  const text = "A SaaS tool for freelance developers to auto-generate invoices from GitHub commits";
  const charsToShow = Math.floor(progress * text.length * 1.3);
  const displayText = text.slice(0, Math.min(charsToShow, text.length));
  const formShow = progress > 0.05;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 48px", gap: 28 }}>
      <div style={{ opacity: formShow ? 1 : 0, transform: formShow ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s ease", width: "100%", maxWidth: 600 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, textAlign: "center" }}>
          STEP 1 — DESCRIBE YOUR IDEA
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 16, padding: "20px 24px", backdropFilter: "blur(10px)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your product idea</div>
          <div style={{ fontSize: 17, color: "white", lineHeight: 1.5, minHeight: 52, fontWeight: 400 }}>
            {displayText}
            <span style={{ display: "inline-block", width: 2, height: 18, background: "#818cf8", marginLeft: 2, animation: "blink 1s step-end infinite" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          {[["Target user", "Freelance developers"], ["Skill level", "Intermediate"]].map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
        {progress > 0.8 && (
          <div style={{
            marginTop: 16, background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            borderRadius: 10, padding: "12px 20px", textAlign: "center",
            fontSize: 14, fontWeight: 700, color: "white",
            opacity: progress > 0.8 ? 1 : 0, transition: "opacity 0.4s ease",
            boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
          }}>
            ✦ Generate Product Plan
          </div>
        )}
      </div>
    </div>
  );
}

const AGENTS = [
  { name: "FORGE Strategist", role: "Overview + Personas", color: "#3b82f6", delay: 0 },
  { name: "FORGE UX Designer", role: "Flows + Wireframes", color: "#8b5cf6", delay: 0.3 },
  { name: "FORGE Architect", role: "Stack + Build Mode", color: "#06b6d4", delay: 0.6 },
  { name: "FORGE Copywriter", role: "Landing Copy + Launch", color: "#10b981", delay: 0.9 },
];

function SceneGenerating({ progress }: { progress: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 48px", gap: 28 }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
          STEP 2 — AI AGENTS AT WORK
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>4 agents working simultaneously</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 480 }}>
        {AGENTS.map((agent, i) => {
          const show = progress > agent.delay;
          const agentProgress = show ? Math.min(1, (progress - agent.delay) * 2) : 0;
          return (
            <div key={agent.name} style={{
              background: "rgba(255,255,255,0.04)", border: `1px solid ${agent.color}33`,
              borderRadius: 12, padding: "14px 16px",
              opacity: show ? 1 : 0, transform: show ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.4s ease ${agent.delay * 0.5}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: agent.color }}>{agent.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{agent.role}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: agent.color, background: `${agent.color}18`, padding: "3px 10px", borderRadius: 20 }}>
                  {agentProgress >= 1 ? "✓ Done" : "Generating…"}
                </div>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", background: `linear-gradient(90deg, ${agent.color}, ${agent.color}88)`, width: `${agentProgress * 100}%`, transition: "width 0.3s ease", borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneOverview({ progress }: { progress: number }) {
  const cards = [
    { label: "One-liner", value: "Auto-invoice generation from GitHub commits for freelancers", color: "#3b82f6" },
    { label: "Problem", value: "Manual invoicing wastes 2–4 hours per week for freelancers", color: "#f97316" },
    { label: "Value Prop", value: "Zero-touch invoicing that syncs directly with your commit history", color: "#10b981" },
    { label: "Unique Angle", value: "First tool to bridge GitHub activity → client billing automatically", color: "#8b5cf6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 32px", gap: 20 }}>
      <div style={{ opacity: progress > 0.1 ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>SECTION 1 — PRODUCT OVERVIEW</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>AutoInvoice</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 560 }}>
        {cards.map((card, i) => {
          const show = progress > 0.15 + i * 0.15;
          return (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.05)", border: `1px solid ${card.color}30`,
              borderRadius: 12, padding: "14px 16px",
              borderLeft: `3px solid ${card.color}`,
              opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.5s ease`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: card.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{card.value}</div>
            </div>
          );
        })}
      </div>
      {progress > 0.75 && (
        <div style={{ display: "flex", gap: 8, opacity: progress > 0.75 ? 1 : 0, transition: "opacity 0.4s", flexWrap: "wrap", justifyContent: "center" }}>
          {["10 paying clients in 90 days", "$5k MRR in 6 months", "4.5★ avg rating"].map(m => (
            <div key={m} style={{ padding: "5px 12px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 20, fontSize: 11.5, color: "#6ee7b7", fontWeight: 600 }}>✓ {m}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScenePersonas({ progress }: { progress: number }) {
  const show = progress > 0.1;
  const bodyShow = progress > 0.3;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 32px", gap: 20 }}>
      <div style={{ opacity: show ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>SECTION 2 — USER PERSONAS</div>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: 16, padding: "20px", width: "100%", maxWidth: 500,
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "white", flexShrink: 0 }}>MK</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Marcus Kim</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>Senior Freelance Developer · 28–36</div>
            <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
              <span style={{ fontSize: 11, padding: "2px 8px", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, color: "#c4b5fd" }}>Tech: Expert</span>
              <span style={{ fontSize: 11, padding: "2px 8px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 20, color: "#93c5fd" }}>5+ clients</span>
            </div>
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "11px 14px", marginBottom: 14,
          opacity: bodyShow ? 1 : 0, transition: "opacity 0.5s ease 0.2s", fontStyle: "italic",
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>💬 QUOTE</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>"I spend Sunday nights catching up on invoices instead of coding. There has to be a better way."</div>
        </div>
        {bodyShow && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Goals", items: ["Automate billing", "Focus on code", "Get paid faster"], color: "#10b981" },
              { label: "Frustrations", items: ["Manual tracking", "Late payments", "Context switching"], color: "#f87171" },
            ].map(g => (
              <div key={g.label}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>{g.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {g.items.map(item => <span key={item} style={{ fontSize: 11, padding: "3px 8px", background: `${g.color}15`, border: `1px solid ${g.color}30`, borderRadius: 20, color: g.color }}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SceneScope({ progress }: { progress: number }) {
  const cols = [
    { label: "MVP", color: "#10b981", items: ["GitHub OAuth", "Invoice PDF gen", "Commit parser", "Stripe payments"] },
    { label: "Nice-to-have", color: "#3b82f6", items: ["Email reminders", "Custom templates", "Analytics dash"] },
    { label: "Future", color: "#8b5cf6", items: ["Multi-currency", "Team billing", "API access"] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 24px", gap: 18 }}>
      <div style={{ opacity: progress > 0.05 ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>SECTION 3 — FEATURE SCOPE</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>Prioritized to ship the right things first</div>
      </div>
      <div style={{ display: "flex", gap: 10, width: "100%", maxWidth: 580 }}>
        {cols.map((col, ci) => {
          const show = progress > 0.15 + ci * 0.2;
          return (
            <div key={col.label} style={{
              flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12,
              overflow: "hidden", borderTop: `3px solid ${col.color}`,
              opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease",
            }}>
              <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 11.5, fontWeight: 800, color: col.color }}>{col.label}</span>
              </div>
              <div style={{ padding: "8px 8px" }}>
                {col.items.map((item, ii) => {
                  const itemShow = show && progress > 0.2 + ci * 0.15 + ii * 0.07;
                  return (
                    <div key={item} style={{
                      fontSize: 11.5, color: "rgba(255,255,255,0.75)", padding: "7px 10px",
                      background: "rgba(255,255,255,0.04)", borderRadius: 8, marginBottom: 5,
                      display: "flex", alignItems: "center", gap: 6,
                      opacity: itemShow ? 1 : 0, transition: "opacity 0.3s ease",
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneBuildMode({ progress }: { progress: number }) {
  const tickets = [
    { id: "T-001", title: "GitHub OAuth integration", complexity: "Medium", color: "#f97316" },
    { id: "T-002", title: "Commit parser + time tracking", complexity: "High", color: "#ef4444" },
    { id: "T-003", title: "Invoice PDF generation", complexity: "Medium", color: "#f97316" },
  ];
  const apis = [
    { method: "POST", path: "/api/invoices/generate", desc: "Generate invoice from commits" },
    { method: "GET", path: "/api/invoices/:id", desc: "Fetch invoice by ID" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 24px", gap: 16 }}>
      <div style={{ opacity: progress > 0.05 ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>BUILD MODE</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>Implementation-ready artifacts</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 580 }}>
        <div style={{ opacity: progress > 0.2 ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>🎫 TICKETS</div>
          {tickets.map((t, i) => {
            const show = progress > 0.25 + i * 0.15;
            return (
              <div key={t.id} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 12px", marginBottom: 6,
                opacity: show ? 1 : 0, transition: "all 0.4s ease",
                transform: show ? "translateX(0)" : "translateX(-15px)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{t.id}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: t.color, padding: "1px 7px", background: `${t.color}18`, borderRadius: 20 }}>{t.complexity}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{t.title}</div>
              </div>
            );
          })}
        </div>
        <div style={{ opacity: progress > 0.4 ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>🔌 API PLAN</div>
          {apis.map((api, i) => {
            const show = progress > 0.45 + i * 0.15;
            return (
              <div key={api.path} style={{
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 12px", marginBottom: 6, fontFamily: "monospace",
                opacity: show ? 1 : 0, transition: "all 0.4s ease",
              }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: api.method === "POST" ? "#10b981" : "#3b82f6", padding: "1px 6px", background: api.method === "POST" ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.15)", borderRadius: 4 }}>{api.method}</span>
                  <span style={{ fontSize: 11, color: "#a78bfa" }}>{api.path}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "sans-serif" }}>{api.desc}</div>
              </div>
            );
          })}
          {progress > 0.7 && (
            <div style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 10, padding: "10px 12px", marginTop: 4, opacity: progress > 0.7 ? 1 : 0, transition: "opacity 0.4s" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", marginBottom: 4 }}>✦ CLAUDE CODE PROMPT</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Build AutoInvoice: Next.js + Prisma + GitHub OAuth, invoice generation from commit history…</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SceneExport({ progress }: { progress: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 48px", gap: 28 }}>
      <div style={{ opacity: progress > 0.1 ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>READY TO BUILD</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "white", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          Your complete plan,<br /><span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ready to ship.</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, opacity: progress > 0.45 ? 1 : 0, transition: "opacity 0.5s ease 0.1s", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #2563eb, #7c3aed)", fontSize: 14, fontWeight: 700, color: "white", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
          ↓ Export as Markdown
        </div>
        <div style={{ padding: "12px 24px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
          Copy Claude Prompt
        </div>
      </div>
      {progress > 0.65 && (
        <div style={{ opacity: progress > 0.65 ? 1 : 0, transition: "opacity 0.5s", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Try it free — no credit card required</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.04em" }}>
            forge-ai-nine-zeta.vercel.app
          </div>
        </div>
      )}
    </div>
  );
}

function renderScene(id: SceneId, progress: number) {
  switch (id) {
    case "intro": return <SceneIntro progress={progress} />;
    case "idea": return <SceneIdea progress={progress} />;
    case "generating": return <SceneGenerating progress={progress} />;
    case "overview": return <SceneOverview progress={progress} />;
    case "personas": return <ScenePersonas progress={progress} />;
    case "scope": return <SceneScope progress={progress} />;
    case "buildmode": return <SceneBuildMode progress={progress} />;
    case "export": return <SceneExport progress={progress} />;
    default: return null;
  }
}

// ── Ambient music engine (Web Audio API) ─────────────────────────────────────

function createAmbientMusic(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 3);
  master.connect(ctx.destination);

  // Soft reverb via delay network
  const delay = ctx.createDelay(0.5);
  delay.delayTime.value = 0.35;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.4;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(master);

  // Gentle pad — A minor chord tones
  const notes = [220, 261.63, 329.63, 440, 523.25];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0.015 / (i + 1);

    lfo.type = "sine";
    lfo.frequency.value = 0.08 + i * 0.03;
    lfoGain.gain.value = 0.007;

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(master);
    gain.connect(delay);

    osc.start();
    lfo.start();
  });

  return master;
}

// ── Main Demo Player ──────────────────────────────────────────────────────────

export default function DemoPage() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<AudioNode | null>(null);
  const sceneStartRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pausedAtRef = useRef<number>(0);

  const totalDuration = SCENES.reduce((s, sc) => s + sc.duration, 0);

  const speakScene = useCallback((index: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const scene = SCENES[index];
    const utterance = new SpeechSynthesisUtterance(scene.narration);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = muted ? 0 : 0.95;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes("Samantha") || v.name.includes("Karen") ||
      v.name.includes("Google UK English Female") || v.name.includes("Victoria") ||
      v.name.includes("Zira") || (v.lang === "en-US" && v.name.toLowerCase().includes("female"))
    ) || voices.find(v => v.lang.startsWith("en")) || voices[0];
    if (preferred) utterance.voice = preferred;
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [muted]);

  const tick = useCallback(() => {
    const now = performance.now();
    const elapsed = now - sceneStartRef.current;
    const scene = SCENES[sceneIndex];
    const progress = Math.min(elapsed / scene.duration, 1);
    setSceneProgress(progress);

    const doneMs = SCENES.slice(0, sceneIndex).reduce((s, sc) => s + sc.duration, 0);
    setTotalProgress((doneMs + elapsed) / totalDuration);

    if (progress >= 1) {
      if (sceneIndex < SCENES.length - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setSceneIndex(prev => prev + 1);
          sceneStartRef.current = performance.now();
          setSceneProgress(0);
          setTransitioning(false);
        }, 300);
      } else {
        setPlaying(false);
        setEnded(true);
        window.speechSynthesis?.cancel();
        return;
      }
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [sceneIndex, totalDuration]);

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, tick]);

  // Speak on scene change while playing
  useEffect(() => {
    if (playing && started) {
      speakScene(sceneIndex);
    }
  }, [sceneIndex, playing, started, speakScene]);

  // Mute/unmute speech
  useEffect(() => {
    if (speechRef.current) speechRef.current.volume = muted ? 0 : 0.95;
    if (audioCtxRef.current && masterGainRef.current) {
      const g = masterGainRef.current as GainNode;
      g.gain.setValueAtTime(g.gain.value, audioCtxRef.current.currentTime);
      g.gain.linearRampToValueAtTime(muted ? 0 : 0.07, audioCtxRef.current.currentTime + 0.5);
    }
  }, [muted]);

  function handleStart() {
    setStarted(true);
    setPlaying(true);
    setEnded(false);
    sceneStartRef.current = performance.now();

    // Init audio
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      masterGainRef.current = createAmbientMusic(ctx);
    } else if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    speakScene(0);
  }

  function handlePlayPause() {
    if (ended) {
      // Restart
      setSceneIndex(0);
      setSceneProgress(0);
      setTotalProgress(0);
      setEnded(false);
      sceneStartRef.current = performance.now();
      setPlaying(true);
      speakScene(0);
      return;
    }
    if (playing) {
      setPlaying(false);
      pausedAtRef.current = performance.now() - sceneStartRef.current;
      window.speechSynthesis?.pause();
    } else {
      sceneStartRef.current = performance.now() - pausedAtRef.current;
      setPlaying(true);
      window.speechSynthesis?.resume();
    }
  }

  const scene = SCENES[sceneIndex];
  const gradient = `linear-gradient(160deg, ${scene.bgFrom}, ${scene.bgTo})`;

  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#000",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
      overflow: "hidden",
    }}>
      {/* Back link */}
      <Link href="/" style={{
        position: "fixed", top: 20, left: 20, zIndex: 100,
        display: "flex", alignItems: "center", gap: 7,
        padding: "7px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, textDecoration: "none",
        backdropFilter: "blur(10px)",
      }}>
        <ArrowLeft size={14} /> Back
      </Link>

      {/* Video frame */}
      <div style={{
        width: "min(100vw, 960px)", aspectRatio: "16/9",
        position: "relative", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
      }}>
        {/* Scene background */}
        <div style={{
          position: "absolute", inset: 0,
          background: gradient,
          transition: "background 0.8s ease",
        }} />

        {/* Subtle noise texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.4, pointerEvents: "none",
        }} />

        {/* Scene content */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          {renderScene(scene.id, sceneProgress)}
        </div>

        {/* Narration caption */}
        {started && (
          <div style={{
            position: "absolute", bottom: 64, left: "50%", transform: "translateX(-50%)",
            width: "85%", textAlign: "center",
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, padding: "10px 18px",
            opacity: transitioning ? 0 : 1, transition: "opacity 0.3s",
          }}>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
              {scene.narration}
            </p>
          </div>
        )}

        {/* Progress bar */}
        {started && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.1)" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", width: `${totalProgress * 100}%`, transition: "width 0.1s linear" }} />
          </div>
        )}

        {/* Scene dots */}
        {started && (
          <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
            {SCENES.map((_, i) => (
              <div key={i} style={{ width: i === sceneIndex ? 18 : 6, height: 6, borderRadius: 3, background: i === sceneIndex ? "#818cf8" : i < sceneIndex ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)", transition: "all 0.3s ease" }} />
            ))}
          </div>
        )}

        {/* Controls overlay */}
        {started && (
          <div style={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 8 }}>
            <button onClick={() => setMuted(!muted)} style={{
              width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {muted ? <VolumeX size={14} color="rgba(255,255,255,0.6)" /> : <Volume2 size={14} color="rgba(255,255,255,0.6)" />}
            </button>
          </div>
        )}

        {/* Play/Pause center button (shown on pause or end) */}
        {started && (!playing || ended) && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)",
          }}>
            <button onClick={handlePlayPause} style={{
              width: 72, height: 72, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {ended ? <RotateCcw size={28} color="white" /> : <Play size={28} color="white" style={{ marginLeft: 4 }} />}
            </button>
            {ended && <div style={{ position: "absolute", bottom: 80, color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Demo complete</div>}
          </div>
        )}

        {/* Big start screen */}
        {!started && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 20,
            background: "linear-gradient(160deg, #0f1117, #1e1b4b)",
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 48px rgba(99,102,241,0.5)" }}>
              <Sparkles size={28} color="white" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.04em", marginBottom: 8 }}>FORGE AI Demo</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>2 minute walkthrough · AI narrated</div>
            </div>
            <button onClick={handleStart} style={{
              width: 72, height: 72, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(99,102,241,0.3)",
              transition: "transform 0.2s",
            }}>
              <Play size={30} color="white" style={{ marginLeft: 5 }} />
            </button>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>Requires audio · Best with headphones</p>
          </div>
        )}

        {/* Playing indicator (top left) */}
        {started && playing && (
          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: 8, border: "1px solid rgba(255,0,0,0.3)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "blink 1s step-end infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>LIVE DEMO</span>
          </div>
        )}

        {/* Play/pause click area */}
        {started && playing && (
          <button onClick={handlePlayPause} style={{
            position: "absolute", inset: 0, background: "transparent", border: "none", cursor: "pointer",
          }} />
        )}
      </div>

      {/* Bottom bar */}
      {started && (
        <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={handlePlayPause} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 18px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)", cursor: "pointer", color: "rgba(255,255,255,0.8)",
            fontSize: 13, fontWeight: 600, fontFamily: "inherit",
          }}>
            {playing ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Play</>}
          </button>
          <Link href="/projects/new" style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            textDecoration: "none", color: "white",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          }}>
            <Sparkles size={13} /> Start building free
          </Link>
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes ring-pulse { 0%,100% { opacity:0.3; transform:scale(1) } 50% { opacity:0.6; transform:scale(1.05) } }
      `}</style>
    </div>
  );
}
