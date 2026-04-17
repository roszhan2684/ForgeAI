"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/store/project-store";
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar";
import { WorkspaceTopbar } from "@/components/layout/workspace-topbar";
import { BuildModeContent } from "@/types/project";
import {
  Monitor,
  Layers,
  Ticket,
  Globe,
  Database,
  Map,
  Sparkles,
  Copy,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const TABS = [
  { id: "screens", label: "Screens", icon: Monitor },
  { id: "components", label: "Components", icon: Layers },
  { id: "tickets", label: "Tickets", icon: Ticket },
  { id: "apis", label: "APIs", icon: Globe },
  { id: "schema", label: "Schema", icon: Database },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "prompt", label: "Claude Prompt", icon: Sparkles },
] as const;

type TabId = typeof TABS[number]["id"];

const COMPLEXITY_COLORS: Record<string, { bg: string; color: string }> = {
  Low: { bg: "#f0fdf4", color: "#16a34a" },
  Medium: { bg: "#fffbeb", color: "#d97706" },
  High: { bg: "#fef2f2", color: "#dc2626" },
};

const METHOD_COLORS: Record<string, { bg: string; color: string }> = {
  GET: { bg: "#eff6ff", color: "#2563eb" },
  POST: { bg: "#f0fdf4", color: "#16a34a" },
  PATCH: { bg: "#fffbeb", color: "#d97706" },
  PUT: { bg: "#fff7ed", color: "#ea580c" },
  DELETE: { bg: "#fef2f2", color: "#dc2626" },
};

function ScreensTab({ content }: { content: BuildModeContent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
      {content.screens.map((screen, i) => (
        <div key={screen.name} className="forge-card" style={{ padding: "18px 20px" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--forge-blue-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--forge-blue)",
              marginBottom: 12,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--forge-text)", marginBottom: 7, letterSpacing: "-0.01em" }}>
            {screen.name}
          </div>
          <p style={{ fontSize: 13, color: "var(--forge-text-muted)", lineHeight: 1.55 }}>{screen.purpose}</p>
        </div>
      ))}
    </div>
  );
}

function ComponentsTab({ content }: { content: BuildModeContent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {content.components.map((comp) => (
        <div key={comp.name} className="forge-card" style={{ padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
            <div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#7c3aed",
                  background: "#faf5ff",
                  padding: "3px 10px",
                  borderRadius: 20,
                  display: "inline-block",
                  marginBottom: 6,
                  fontFamily: "monospace",
                }}
              >
                {"<"}{comp.name}{">"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>
                Used In
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {comp.usedIn.map((screen) => (
                  <span key={screen} className="section-chip">{screen}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>
                States
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {comp.states.map((state) => (
                  <span key={state} className="forge-badge forge-badge-blue">{state}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TicketsTab({ content }: { content: BuildModeContent }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {content.tickets.map((ticket) => {
        const complexity = COMPLEXITY_COLORS[ticket.complexity] ?? COMPLEXITY_COLORS.Medium;
        const isOpen = expanded === ticket.id;

        return (
          <div key={ticket.id} className="forge-card" style={{ overflow: "hidden" }}>
            <button
              onClick={() => setExpanded(isOpen ? null : ticket.id)}
              style={{
                width: "100%",
                padding: "16px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", fontFamily: "monospace" }}>
                  {ticket.id}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--forge-text)", letterSpacing: "-0.01em" }}>
                  {ticket.title}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: complexity.color,
                    background: complexity.bg,
                    padding: "2px 9px",
                    borderRadius: 20,
                  }}
                >
                  {ticket.complexity}
                </span>
                <ArrowRight
                  size={14}
                  color="#9ca3af"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s" }}
                />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 22px 20px", borderTop: "1px solid var(--forge-border)" }}>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, margin: "16px 0 16px" }}>
                      {ticket.description}
                    </p>

                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 9 }}>
                        Acceptance Criteria
                      </div>
                      {ticket.acceptanceCriteria.map((c) => (
                        <div key={c} style={{ display: "flex", gap: 8, padding: "4px 0" }}>
                          <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{c}</span>
                        </div>
                      ))}
                    </div>

                    {ticket.dependencies.length > 0 && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                          Dependencies
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          {ticket.dependencies.map((dep) => (
                            <span key={dep} style={{ fontSize: 12, fontWeight: 600, color: "#d97706", background: "#fffbeb", padding: "2px 9px", borderRadius: 20 }}>
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ApisTab({ content }: { content: BuildModeContent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {content.apiPlan.map((api) => {
        const method = METHOD_COLORS[api.method] ?? METHOD_COLORS.GET;
        return (
          <div key={api.name} className="forge-card" style={{ padding: "18px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: method.color,
                  background: method.bg,
                  padding: "3px 10px",
                  borderRadius: 7,
                  letterSpacing: "0.04em",
                  fontFamily: "monospace",
                }}
              >
                {api.method}
              </span>
              <code
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--forge-text)",
                  fontFamily: "monospace",
                  background: "#f3f4f6",
                  padding: "3px 10px",
                  borderRadius: 7,
                }}
              >
                {api.path}
              </code>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--forge-text-muted)", marginLeft: "auto" }}>
                {api.name}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12, lineHeight: 1.5 }}>{api.purpose}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "#f9fafb", borderRadius: 9, padding: "10px 12px", border: "1px solid var(--forge-border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Request
                </div>
                <code style={{ fontSize: 12, color: "#374151", fontFamily: "monospace" }}>
                  {JSON.stringify(api.requestShape, null, 1).slice(0, 100)}
                </code>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 9, padding: "10px 12px", border: "1px solid var(--forge-border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Response
                </div>
                <code style={{ fontSize: 12, color: "#374151", fontFamily: "monospace" }}>
                  {JSON.stringify(api.responseShape, null, 1).slice(0, 100)}
                </code>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SchemaTab({ content }: { content: BuildModeContent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
      {content.dataModel.map((entity) => (
        <div key={entity.name} className="forge-card" style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Database size={15} color="#7c3aed" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--forge-text)", letterSpacing: "-0.01em", fontFamily: "monospace" }}>
              {entity.name}
            </span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Fields
            </div>
            {entity.fields.map((field) => (
              <div
                key={field}
                style={{
                  fontSize: 12.5,
                  color: "#374151",
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: "#f9fafb",
                  marginBottom: 4,
                  fontFamily: "monospace",
                  border: "1px solid var(--forge-border)",
                  display: "inline-block",
                  marginRight: 6,
                }}
              >
                {field}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Relationships
            </div>
            {entity.relationships.map((rel) => (
              <div key={rel} style={{ fontSize: 12.5, color: "#7c3aed", display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}>
                <ArrowRight size={11} />
                {rel}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoadmapTab({ content }: { content: BuildModeContent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {content.roadmap.map((item, i) => (
        <div
          key={item.week}
          style={{ display: "flex", gap: 0 }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: i === 0 ? "var(--forge-blue)" : "white",
                border: `2px solid ${i === 0 ? "var(--forge-blue)" : "var(--forge-border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: i === 0 ? "white" : "var(--forge-text-muted)",
              }}
            >
              {item.week}
            </div>
            {i < content.roadmap.length - 1 && (
              <div style={{ width: 2, flex: 1, background: "var(--forge-border)", minHeight: 32 }} />
            )}
          </div>

          <div style={{ flex: 1, paddingLeft: 16, paddingBottom: i < content.roadmap.length - 1 ? 24 : 0, paddingTop: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--forge-blue)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Week {item.week}
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid var(--forge-border)",
                borderRadius: 12,
                padding: "14px 18px",
                fontSize: 14,
                color: "var(--forge-text-secondary)",
                lineHeight: 1.55,
              }}
            >
              {item.focus}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PromptTab({ content }: { content: BuildModeContent }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(content.claudePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div
        style={{
          background: "#0f172a",
          borderRadius: 20,
          padding: "28px",
          border: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={16} color="#a78bfa" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Claude Code Build Prompt</span>
          </div>
          <button
            onClick={copy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              background: copied ? "#065f46" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 9,
              fontSize: 13,
              color: copied ? "#6ee7b7" : "rgba(255,255,255,0.8)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre
          style={{
            fontSize: 13,
            color: "#e2e8f0",
            fontFamily: "monospace",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: 0,
          }}
        >
          {content.claudePrompt}
        </pre>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "18px 22px",
          background: "var(--forge-blue-light)",
          borderRadius: 14,
          border: "1px solid #bfdbfe",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-blue)", marginBottom: 8 }}>
          How to use this prompt
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            "Copy the prompt above",
            "Open Claude Code in your terminal (claude) or IDE",
            "Paste the prompt and press Enter",
            "Claude Code will scaffold and build your MVP",
          ].map((step, i) => (
            <li key={step} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 13, color: "#1e40af" }}>
              <span style={{ fontWeight: 700 }}>{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function BuildModePage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [activeTab, setActiveTab] = useState<TabId>("screens");

  const project = useProjectStore((s) => s.getProject(projectId));
  const buildSection = useProjectStore((s) => s.getSection(projectId, "buildMode"));

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--forge-text-muted)" }}>Project not found</p>
      </div>
    );
  }

  const buildContent = buildSection?.content as BuildModeContent | undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--forge-surface)" }}>
      <WorkspaceTopbar
        projectTitle={project.title}
        projectId={projectId}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <WorkspaceSidebar
          projectId={projectId}
          projectTitle={project.title}
          activeSection="buildMode"
        />

        <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#faf5ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={18} color="#7c3aed" />
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--forge-text)" }}>
                Build Mode
              </h1>
              <span className="forge-badge" style={{ background: "#faf5ff", color: "#7c3aed" }}>
                Implementation Ready
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--forge-text-muted)" }}>
              Engineering artifacts ready for execution — screens, tickets, APIs, schema, and a Claude Code prompt.
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 2,
              background: "#f3f4f6",
              borderRadius: 12,
              padding: 4,
              marginBottom: 28,
              overflowX: "auto",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 16px",
                    borderRadius: 9,
                    border: "none",
                    background: isActive ? "white" : "transparent",
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--forge-text)" : "var(--forge-text-muted)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          {!buildContent ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <Sparkles size={32} color="var(--forge-text-muted)" style={{ margin: "0 auto 16px" }} />
              <p style={{ color: "var(--forge-text-muted)", fontSize: 15 }}>Build Mode not generated yet</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "screens" && <ScreensTab content={buildContent} />}
                {activeTab === "components" && <ComponentsTab content={buildContent} />}
                {activeTab === "tickets" && <TicketsTab content={buildContent} />}
                {activeTab === "apis" && <ApisTab content={buildContent} />}
                {activeTab === "schema" && <SchemaTab content={buildContent} />}
                {activeTab === "roadmap" && <RoadmapTab content={buildContent} />}
                {activeTab === "prompt" && <PromptTab content={buildContent} />}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
