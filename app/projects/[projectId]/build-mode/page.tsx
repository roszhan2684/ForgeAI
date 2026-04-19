"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useProjectStore } from "@/lib/store/project-store";
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar";
import { WorkspaceTopbar } from "@/components/layout/workspace-topbar";
import type { BuildModeContent } from "@/types/project";
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
  ChevronDown,
  RefreshCw,
} from "lucide-react";

// ─── React Flow Node Types (must be defined at module level) ──────────────────

function EntityNode({ data }: { data: { name: string; fields: string[] } }) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #7c3aed",
        borderRadius: 12,
        minWidth: 160,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(124,58,237,0.12)",
        fontSize: 12,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#7c3aed", width: 10, height: 10 }} />
      <Handle type="source" position={Position.Right} style={{ background: "#7c3aed", width: 10, height: 10 }} />
      <div style={{ background: "#7c3aed", padding: "8px 14px" }}>
        <span style={{ color: "white", fontWeight: 700, fontFamily: "monospace" }}>{data.name}</span>
      </div>
      <div style={{ padding: "6px 0" }}>
        {data.fields.map((field) => (
          <div
            key={field}
            style={{
              padding: "3px 14px",
              fontFamily: "monospace",
              color: "#374151",
              fontSize: 11.5,
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            {field}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompNode({ data }: { data: { name: string; states: string[] } }) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #7c3aed",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 150,
        boxShadow: "0 2px 10px rgba(124,58,237,0.1)",
      }}
    >
      <Handle type="source" position={Position.Right} style={{ background: "#7c3aed" }} />
      <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: "#7c3aed", marginBottom: 6 }}>
        {"<"}
        {data.name}
        {">"}
      </div>
      {data.states.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {data.states.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 10,
                background: "#faf5ff",
                color: "#7c3aed",
                padding: "1px 6px",
                borderRadius: 20,
                border: "1px solid #e9d5ff",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenDotNode({ data }: { data: { name: string } }) {
  return (
    <div
      style={{
        background: "#eff6ff",
        border: "2px solid #2563eb",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 130,
        boxShadow: "0 2px 8px rgba(37,99,235,0.1)",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#2563eb" }} />
      <div style={{ fontWeight: 700, fontSize: 13, color: "#2563eb" }}>{data.name}</div>
    </div>
  );
}

const entityNodeTypes = { entity: EntityNode };
const compNodeTypes = { comp: CompNode, screen: ScreenDotNode };

// ─── Screen helpers ───────────────────────────────────────────────────────────

function inferRoute(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("home") || lower.includes("landing")) return "/";
  if (lower.includes("dashboard") || lower.includes("overview")) return "/dashboard";
  if (lower.includes("login") || lower.includes("sign in")) return "/login";
  if (lower.includes("sign up") || lower.includes("register") || lower.includes("onboard")) return "/register";
  if (lower.includes("profile")) return "/profile";
  if (lower.includes("settings") || lower.includes("config")) return "/settings";
  if (lower.includes("detail") || lower.includes("view")) return "/view/:id";
  if (lower.includes("list") || lower.includes("browse")) return "/list";
  if (lower.includes("create") || lower.includes("new") || lower.includes("add")) return "/new";
  return "/" + lower.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function inferBlocks(name: string): Array<{ flex: number; bg: string; label?: string }> {
  const lower = name.toLowerCase();
  if (lower.includes("dashboard") || lower.includes("home") || lower.includes("overview")) {
    return [
      { flex: 0.14, bg: "#1e293b", label: "nav" },
      { flex: 0.22, bg: "#2563eb22", label: "stats" },
      { flex: 0.64, bg: "#f8fafc", label: "content" },
    ];
  }
  if (lower.includes("login") || lower.includes("sign")) {
    return [
      { flex: 0.25, bg: "transparent" },
      { flex: 0.5, bg: "#f8fafc", label: "form" },
      { flex: 0.25, bg: "transparent" },
    ];
  }
  if (lower.includes("profile")) {
    return [
      { flex: 0.14, bg: "#1e293b", label: "nav" },
      { flex: 0.26, bg: "#2563eb22", label: "header" },
      { flex: 0.6, bg: "#f8fafc", label: "info" },
    ];
  }
  if (lower.includes("list") || lower.includes("browse") || lower.includes("feed")) {
    return [
      { flex: 0.14, bg: "#1e293b", label: "nav" },
      { flex: 0.1, bg: "#f3f4f6", label: "filters" },
      { flex: 0.76, bg: "#f8fafc", label: "items" },
    ];
  }
  if (lower.includes("detail") || lower.includes("view")) {
    return [
      { flex: 0.14, bg: "#1e293b", label: "nav" },
      { flex: 0.3, bg: "#2563eb22", label: "hero" },
      { flex: 0.56, bg: "#f8fafc", label: "details" },
    ];
  }
  return [
    { flex: 0.14, bg: "#1e293b", label: "nav" },
    { flex: 0.86, bg: "#f8fafc", label: "content" },
  ];
}

// ─── Tab Components ───────────────────────────────────────────────────────────

function ScreensTab({ content }: { content: BuildModeContent }) {
  const [selected, setSelected] = useState(0);
  const screen = content.screens[selected];

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
          flex: 1,
          alignContent: "start",
        }}
      >
        {content.screens.map((s, i) => {
          const blocks = inferBlocks(s.name);
          const isSelected = i === selected;
          return (
            <button
              key={s.name}
              onClick={() => setSelected(i)}
              style={{
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                borderRadius: 12,
                outline: isSelected ? "2px solid #2563eb" : "none",
                outlineOffset: 2,
              }}
            >
              <div
                style={{
                  border: "1px solid var(--forge-border)",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: isSelected ? "0 0 0 3px #2563eb22" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.15s",
                }}
              >
                <div
                  style={{
                    background: "#f3f4f6",
                    padding: "5px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    borderBottom: "1px solid var(--forge-border)",
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
                  <div
                    style={{
                      flex: 1,
                      background: "white",
                      borderRadius: 4,
                      padding: "1px 6px",
                      fontSize: 8,
                      color: "#9ca3af",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginLeft: 4,
                    }}
                  >
                    {inferRoute(s.name)}
                  </div>
                </div>
                <div style={{ height: 110, display: "flex", flexDirection: "column", background: "white" }}>
                  {blocks.map((block, bi) => (
                    <div
                      key={bi}
                      style={{
                        flex: block.flex,
                        background: block.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 7,
                        fontWeight: 600,
                        color: block.bg === "#1e293b" ? "rgba(255,255,255,0.4)" : "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {block.label}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  marginTop: 7,
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 600,
                  color: isSelected ? "#2563eb" : "var(--forge-text)",
                  textAlign: "center",
                  padding: "0 2px",
                }}
              >
                {String(i + 1).padStart(2, "0")} {s.name}
              </div>
            </button>
          );
        })}
      </div>

      {screen && (
        <div style={{ width: 260, flexShrink: 0, position: "sticky", top: 0, alignSelf: "flex-start" }}>
          <div className="forge-card" style={{ padding: "20px 22px" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              Screen {String(selected + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--forge-text)",
                letterSpacing: "-0.02em",
                marginBottom: 6,
              }}
            >
              {screen.name}
            </div>
            <code
              style={{
                fontSize: 11,
                color: "#2563eb",
                background: "#eff6ff",
                padding: "2px 8px",
                borderRadius: 6,
                display: "inline-block",
                marginBottom: 14,
              }}
            >
              {inferRoute(screen.name)}
            </code>
            <p style={{ fontSize: 13, color: "var(--forge-text-muted)", lineHeight: 1.6 }}>{screen.purpose}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentsTab({ content }: { content: BuildModeContent }) {
  const { nodes, edges, height } = useMemo(() => {
    const screenSet = new Set<string>();
    content.components.forEach((comp) => comp.usedIn.forEach((s) => screenSet.add(s)));
    const screens = Array.from(screenSet);

    const nodes: Node[] = [
      ...content.components.map((comp, i) => ({
        id: `comp-${comp.name}`,
        type: "comp" as const,
        position: { x: 20, y: i * 110 + 20 },
        data: { name: comp.name, states: comp.states },
      })),
      ...screens.map((name, i) => ({
        id: `screen-${name}`,
        type: "screen" as const,
        position: { x: 380, y: i * 90 + 40 },
        data: { name },
      })),
    ];

    const edges: Edge[] = [];
    content.components.forEach((comp) => {
      comp.usedIn.forEach((screen) => {
        edges.push({
          id: `${comp.name}-${screen}`,
          source: `comp-${comp.name}`,
          target: `screen-${screen}`,
          markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed" },
          style: { stroke: "#a78bfa", strokeWidth: 1.5 },
          type: "smoothstep",
        });
      });
    });

    const height = Math.max(content.components.length * 110 + 60, screens.length * 90 + 80, 320);
    return { nodes, edges, height };
  }, [content.components]);

  return (
    <div
      style={{
        height,
        border: "1px solid var(--forge-border)",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={compNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#e5e7eb" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

const KANBAN_COLS = [
  { id: "Low", label: "Low Complexity", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { id: "Medium", label: "Medium Complexity", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { id: "High", label: "High Complexity", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
] as const;

function TicketsTab({ content }: { content: BuildModeContent }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const byComplexity = useMemo(() => {
    const map: Record<string, typeof content.tickets> = { Low: [], Medium: [], High: [] };
    content.tickets.forEach((t) => {
      const key = t.complexity in map ? t.complexity : "Medium";
      map[key].push(t);
    });
    return map;
  }, [content.tickets]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {KANBAN_COLS.map((col) => (
        <div key={col.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
              padding: "8px 12px",
              background: col.bg,
              borderRadius: 10,
              border: `1px solid ${col.border}`,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: col.color }}>{col.label}</span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                fontWeight: 700,
                color: col.color,
                background: "white",
                padding: "1px 7px",
                borderRadius: 20,
              }}
            >
              {byComplexity[col.id]?.length ?? 0}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(byComplexity[col.id] ?? []).map((ticket) => {
              const isOpen = expanded === ticket.id;
              return (
                <div
                  key={ticket.id}
                  className="forge-card"
                  style={{ overflow: "hidden", borderLeft: `3px solid ${col.color}` }}
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : ticket.id)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", fontFamily: "monospace" }}>
                        {ticket.id}
                      </span>
                      <ChevronDown
                        size={13}
                        color="#9ca3af"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
                      />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)", marginTop: 4, lineHeight: 1.4 }}>
                      {ticket.title}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--forge-text-muted)", marginTop: 4 }}>
                      {ticket.acceptanceCriteria.length} criteria · {ticket.dependencies.length} deps
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
                        <div style={{ padding: "0 14px 14px", borderTop: "1px solid var(--forge-border)" }}>
                          <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.6, margin: "12px 0" }}>
                            {ticket.description}
                          </p>
                          <div style={{ marginBottom: 10 }}>
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#9ca3af",
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                marginBottom: 6,
                              }}
                            >
                              Acceptance
                            </div>
                            {ticket.acceptanceCriteria.map((c) => (
                              <div key={c} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                                <CheckCircle2 size={11} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{c}</span>
                              </div>
                            ))}
                          </div>
                          {ticket.dependencies.length > 0 && (
                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                              {ticket.dependencies.map((dep) => (
                                <span
                                  key={dep}
                                  style={{
                                    fontSize: 11,
                                    color: "#d97706",
                                    background: "#fffbeb",
                                    padding: "2px 8px",
                                    borderRadius: 20,
                                    border: "1px solid #fde68a",
                                  }}
                                >
                                  {dep}
                                </span>
                              ))}
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
        </div>
      ))}
    </div>
  );
}

const METHOD_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  GET: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  POST: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  PATCH: { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  PUT: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  DELETE: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
};

function ApisTab({ content }: { content: BuildModeContent }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {content.apiPlan.map((api) => {
        const method = METHOD_COLORS[api.method] ?? METHOD_COLORS.GET;
        const isOpen = expanded === api.name;
        return (
          <div
            key={api.name}
            className="forge-card"
            style={{ overflow: "hidden", borderLeft: `3px solid ${method.color}` }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : api.name)}
              style={{
                width: "100%",
                padding: "14px 20px",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: method.color,
                  background: method.bg,
                  border: `1px solid ${method.border}`,
                  padding: "3px 10px",
                  borderRadius: 7,
                  letterSpacing: "0.04em",
                  fontFamily: "monospace",
                  flexShrink: 0,
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
                  flex: 1,
                }}
              >
                {api.path}
              </code>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--forge-text-muted)",
                  flexShrink: 0,
                }}
              >
                {api.name}
              </span>
              <ChevronDown
                size={14}
                color="#9ca3af"
                style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
              />
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
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid var(--forge-border)" }}>
                    <p style={{ fontSize: 13, color: "#6b7280", margin: "14px 0", lineHeight: 1.55 }}>{api.purpose}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {(
                        [
                          { label: "Request", shape: api.requestShape },
                          { label: "Response", shape: api.responseShape },
                        ] as const
                      ).map(({ label, shape }) => (
                        <div
                          key={label}
                          style={{
                            background: "#0f172a",
                            borderRadius: 10,
                            padding: "12px 14px",
                            border: "1px solid #1e293b",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: "#64748b",
                              marginBottom: 8,
                              textTransform: "uppercase",
                              letterSpacing: "0.07em",
                            }}
                          >
                            {label}
                          </div>
                          <pre
                            style={{
                              fontSize: 11,
                              color: "#94a3b8",
                              fontFamily: "monospace",
                              margin: 0,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {JSON.stringify(shape, null, 2).substring(0, 200)}
                          </pre>
                        </div>
                      ))}
                    </div>
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

function SchemaTab({ content }: { content: BuildModeContent }) {
  const { nodes, edges, height } = useMemo(() => {
    const entityNames = new Set(content.dataModel.map((e) => e.name));
    const COLS = 3;

    const nodes: Node[] = content.dataModel.map((entity, i) => ({
      id: entity.name,
      type: "entity" as const,
      position: { x: (i % COLS) * 260, y: Math.floor(i / COLS) * 250 },
      data: { name: entity.name, fields: entity.fields },
    }));

    const seenEdges = new Set<string>();
    const edges: Edge[] = [];

    content.dataModel.forEach((entity) => {
      entity.relationships.forEach((rel) => {
        const colonIdx = rel.indexOf(":");
        if (colonIdx < 0) return;
        const relType = rel.substring(0, colonIdx).trim();
        const targetName = rel.substring(colonIdx + 1).trim().split(/\s+/)[0];
        if (!entityNames.has(targetName) || targetName === entity.name) return;
        const edgeId = `${entity.name}-${targetName}-${relType}`;
        if (seenEdges.has(edgeId)) return;
        seenEdges.add(edgeId);
        edges.push({
          id: edgeId,
          source: entity.name,
          target: targetName,
          label: relType,
          labelStyle: { fontSize: 10, fontWeight: 600, fill: "#7c3aed" },
          labelBgStyle: { fill: "white", fillOpacity: 0.9 },
          labelBgPadding: [4, 6] as [number, number],
          labelBgBorderRadius: 4,
          markerEnd: { type: MarkerType.ArrowClosed, color: "#7c3aed" },
          style: { stroke: "#a78bfa", strokeDasharray: "4 2" },
          type: "smoothstep",
        });
      });
    });

    const rows = Math.ceil(content.dataModel.length / COLS);
    const height = Math.max(rows * 250 + 80, 360);
    return { nodes, edges, height };
  }, [content.dataModel]);

  return (
    <div
      style={{
        height,
        border: "1px solid var(--forge-border)",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={entityNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e7eb" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

const SPRINT_COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2"];

function RoadmapTab({ content }: { content: BuildModeContent }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 32,
          overflowX: "auto",
          padding: "20px 4px 8px",
        }}
      >
        {content.roadmap.map((item, i) => {
          const color = SPRINT_COLORS[i % SPRINT_COLORS.length];
          const isLast = i === content.roadmap.length - 1;
          return (
            <div key={item.week} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "white",
                  boxShadow: `0 4px 12px ${color}44`,
                }}
              >
                W{item.week}
              </div>
              {!isLast && (
                <div
                  style={{
                    width: 60,
                    height: 2,
                    background: `linear-gradient(90deg, ${color}, ${SPRINT_COLORS[(i + 1) % SPRINT_COLORS.length]})`,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {content.roadmap.map((item, i) => {
          const color = SPRINT_COLORS[i % SPRINT_COLORS.length];
          return (
            <div key={item.week} className="forge-card" style={{ overflow: "hidden", borderTop: `3px solid ${color}` }}>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 800,
                      color,
                    }}
                  >
                    {item.week}
                  </div>
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.07em" }}
                  >
                    Week {item.week}
                  </span>
                </div>
                <p style={{ fontSize: 13.5, color: "var(--forge-text)", lineHeight: 1.65, margin: 0 }}>
                  {item.focus}
                </p>
              </div>
            </div>
          );
        })}
      </div>
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

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "screens", label: "Screens", icon: Monitor },
  { id: "components", label: "Components", icon: Layers },
  { id: "tickets", label: "Tickets", icon: Ticket },
  { id: "apis", label: "APIs", icon: Globe },
  { id: "schema", label: "Schema", icon: Database },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "prompt", label: "Claude Prompt", icon: Sparkles },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BuildModePage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [activeTab, setActiveTab] = useState<TabId>("screens");
  const [isGenerating, setIsGenerating] = useState(false);

  const project = useProjectStore((s) => s.getProject(projectId));
  const buildSection = useProjectStore((s) => s.getSection(projectId, "buildMode"));
  const updateSection = useProjectStore((s) => s.updateSection);
  const setSectionStatus = useProjectStore((s) => s.setSectionStatus);

  const handleGenerate = useCallback(async (regenerate = false) => {
    setIsGenerating(true);
    setSectionStatus(projectId, "buildMode", "generating");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sectionType: "buildMode", regenerate }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      updateSection(projectId, "buildMode", {
        content: data.section.content,
        status: "generated",
        version: data.section.version ?? 1,
        lastGeneratedAt: data.section.lastGeneratedAt,
        ...(data.metadata ? { metadata: data.metadata } : {}),
      });
    } catch (err) {
      console.error("Build mode generation error:", err);
      setSectionStatus(projectId, "buildMode", "error");
    } finally {
      setIsGenerating(false);
    }
  }, [projectId, setSectionStatus, updateSection]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--forge-text-muted)" }}>Project not found</p>
      </div>
    );
  }

  const buildContent = buildSection?.content as BuildModeContent | undefined;
  const isGeneratingSection = buildSection?.status === "generating";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--forge-surface)" }}>
      <WorkspaceTopbar projectTitle={project.title} projectId={projectId} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <WorkspaceSidebar projectId={projectId} projectTitle={project.title} activeSection="buildMode" />

        <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
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
            {buildContent && (
              <button
                className="forge-btn-secondary"
                style={{ padding: "7px 14px", fontSize: 13, gap: 6, flexShrink: 0 }}
                onClick={() => handleGenerate(true)}
                disabled={isGenerating || isGeneratingSection}
              >
                <RefreshCw size={13} style={{ animation: (isGenerating || isGeneratingSection) ? "spin 1s linear infinite" : "none" }} />
                Regenerate
              </button>
            )}
          </div>

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

          {isGeneratingSection ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#faf5ff", borderRadius: 12, border: "1px solid #e9d5ff" }}>
                <RefreshCw size={14} color="#7c3aed" style={{ animation: "spin 1s linear infinite" }} />
                <span style={{ fontSize: 13, color: "#7c3aed", fontWeight: 600 }}>FORGE AI is generating Build Mode artifacts…</span>
              </div>
              {[140, 90, 110, 80].map((h, i) => (
                <div key={i} className="shimmer" style={{ height: h, borderRadius: 16 }} />
              ))}
            </div>
          ) : !buildContent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Sparkles size={24} color="#7c3aed" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--forge-text)", marginBottom: 8 }}>Build Mode not generated yet</h3>
              <p style={{ fontSize: 14, color: "var(--forge-text-muted)", marginBottom: 24, maxWidth: 360 }}>
                Generate implementation-ready artifacts — screens, components, tickets, API plan, data model, and a Claude Code prompt — tailored to your project.
              </p>
              <button
                className="forge-btn-primary"
                style={{ padding: "10px 24px", fontSize: 14, gap: 8 }}
                onClick={() => handleGenerate(false)}
                disabled={isGenerating}
              >
                <Sparkles size={14} />
                Generate Build Mode
              </button>
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
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
