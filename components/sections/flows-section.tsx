"use client";

import { useState, useMemo } from "react";
import { FlowsContent, FlowStep } from "@/types/project";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AlertCircle, Monitor, CornerDownRight } from "lucide-react";

const FLOWS = [
  { key: "primaryFlow" as const, label: "Primary Flow", color: "#2563eb", bg: "#eff6ff" },
  { key: "onboardingFlow" as const, label: "Onboarding", color: "#7c3aed", bg: "#faf5ff" },
  { key: "coreActionFlow" as const, label: "Core Action", color: "#059669", bg: "#ecfdf5" },
] as const;

function StepNode({ data }: { data: { actor: string; action: string; result: string; color: string; isFirst: boolean; isLast: boolean } }) {
  return (
    <div style={{
      background: "white",
      border: `1.5px solid ${data.color}30`,
      borderRadius: 12,
      padding: "14px 18px",
      width: 280,
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
    }}>
      {!data.isFirst && (
        <Handle type="target" position={Position.Top}
          style={{ background: data.color, border: "none", width: 8, height: 8, top: -4 }} />
      )}
      <div style={{ fontSize: 10, fontWeight: 700, color: data.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
        {data.actor}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1117", marginBottom: 5, lineHeight: 1.3 }}>
        {data.action}
      </div>
      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.45 }}>
        {data.result}
      </div>
      {!data.isLast && (
        <Handle type="source" position={Position.Bottom}
          style={{ background: data.color, border: "none", width: 8, height: 8, bottom: -4 }} />
      )}
    </div>
  );
}

function TerminalNode({ data }: { data: { label: string; color: string; isStart: boolean } }) {
  return (
    <div style={{
      background: data.color,
      color: "white",
      borderRadius: 100,
      padding: "8px 24px",
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      boxShadow: `0 4px 14px ${data.color}44`,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
    }}>
      {data.isStart
        ? <Handle type="source" position={Position.Bottom}
            style={{ background: "rgba(255,255,255,0.8)", border: "none", width: 8, height: 8, bottom: -4 }} />
        : <Handle type="target" position={Position.Top}
            style={{ background: "rgba(255,255,255,0.8)", border: "none", width: 8, height: 8, top: -4 }} />
      }
      {data.label}
    </div>
  );
}

const nodeTypes = { step: StepNode, terminal: TerminalNode };

function buildGraph(steps: FlowStep[], color: string): { nodes: Node[]; edges: Edge[] } {
  if (!steps.length) return { nodes: [], edges: [] };

  const Y_GAP = 155;
  const CENTER_X = 10;

  const nodes: Node[] = [
    { id: "start", type: "terminal", position: { x: CENTER_X, y: 0 }, data: { label: "Start", color, isStart: true } },
    ...steps.map((step, i) => ({
      id: `s${i}`,
      type: "step",
      position: { x: CENTER_X, y: 72 + i * Y_GAP },
      data: { actor: step.actor, action: step.action, result: step.result, color, isFirst: i === 0, isLast: i === steps.length - 1 },
    })),
    { id: "end", type: "terminal", position: { x: CENTER_X, y: 72 + steps.length * Y_GAP + 10 }, data: { label: "Done", color, isStart: false } },
  ];

  const edgeStyle = { stroke: color, strokeWidth: 2 };
  const marker = { type: MarkerType.ArrowClosed, color, width: 14, height: 14 };

  const edges: Edge[] = [
    { id: "e-start", source: "start", target: "s0", type: "smoothstep", style: edgeStyle, markerEnd: marker },
    ...steps.slice(0, -1).map((_, i) => ({
      id: `e${i}`, source: `s${i}`, target: `s${i + 1}`,
      type: "smoothstep", style: edgeStyle, markerEnd: marker,
    })),
    { id: "e-end", source: `s${steps.length - 1}`, target: "end", type: "smoothstep", style: edgeStyle, markerEnd: marker },
  ];

  return { nodes, edges };
}

export function FlowsSection({ content }: { content: FlowsContent }) {
  const [active, setActive] = useState<typeof FLOWS[number]["key"]>("primaryFlow");
  const flow = FLOWS.find(f => f.key === active)!;
  const steps = content[active] ?? [];
  const { nodes, edges } = useMemo(() => buildGraph(steps, flow.color), [steps, flow.color]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Tab switcher */}
      <div style={{ display: "flex", gap: 8 }}>
        {FLOWS.map(f => {
          const count = (content[f.key] ?? []).length;
          if (!count) return null;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                padding: "7px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                cursor: "pointer", border: "1.5px solid",
                borderColor: active === f.key ? f.color : "var(--forge-border)",
                background: active === f.key ? f.bg : "white",
                color: active === f.key ? f.color : "var(--forge-text-muted)",
                transition: "all 0.15s",
              }}
            >
              {f.label}
              <span style={{
                marginLeft: 6, fontSize: 11, fontWeight: 700,
                background: active === f.key ? f.color : "#f3f4f6",
                color: active === f.key ? "white" : "#9ca3af",
                padding: "1px 7px", borderRadius: 20,
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Flow diagram */}
      {steps.length > 0 ? (
        <div style={{
          background: "white", border: "1px solid var(--forge-border)",
          borderRadius: 20, overflow: "hidden", height: 520,
        }}>
          <ReactFlow
            key={active}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e7ed" />
            <Controls showInteractive={false} style={{ bottom: 16, right: 16, left: "auto", top: "auto" }} />
          </ReactFlow>
        </div>
      ) : (
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "white", border: "1px solid var(--forge-border)", borderRadius: 20 }}>
          <p style={{ color: "var(--forge-text-muted)", fontSize: 14 }}>No steps for this flow</p>
        </div>
      )}

      {/* Edge cases + empty states */}
      {(content.edgeCases.length > 0 || content.emptyStates.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {content.edgeCases.length > 0 && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 16, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <AlertCircle size={13} color="#d97706" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.06em" }}>Edge Cases</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {content.edgeCases.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CornerDownRight size={11} color="#d97706" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: "#78350f", lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {content.emptyStates.length > 0 && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <Monitor size={13} color="#16a34a" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.06em" }}>Empty States</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {content.emptyStates.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CornerDownRight size={11} color="#16a34a" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: "#166534", lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
