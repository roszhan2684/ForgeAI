"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/store/project-store";
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar";
import { WorkspaceTopbar } from "@/components/layout/workspace-topbar";
import { OverviewSection } from "@/components/sections/overview-section";
import { PersonasSection } from "@/components/sections/personas-section";
import { ScopeSection } from "@/components/sections/scope-section";
import { FlowsSection } from "@/components/sections/flows-section";
import { WireframesSection } from "@/components/sections/wireframes-section";
import { StackSection } from "@/components/sections/stack-section";
import { LaunchSection } from "@/components/sections/launch-section";
import { LandingCopySection } from "@/components/sections/landing-copy-section";
import { SectionEmptyState } from "@/components/sections/section-empty-state";
import { SectionType, ProjectSection } from "@/types/project";
import { AIRole } from "@/lib/ai/types";
import { ROLE_LABELS, ROLE_COLORS } from "@/lib/ai/router";
import {
  RefreshCw,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Cpu,
} from "lucide-react";

const SECTION_META: Record<SectionType, { label: string; description: string; emptyDesc: string }> = {
  overview: {
    label: "Overview",
    description: "High-level product definition and strategic framing.",
    emptyDesc: "Generate a product summary, problem statement, value proposition, and success metrics.",
  },
  personas: {
    label: "User Personas",
    description: "Representative users and their core needs.",
    emptyDesc: "Generate user personas with goals, frustrations, behaviors, and primary use cases.",
  },
  scope: {
    label: "Feature Scope",
    description: "Prioritized product scope from core MVP to future roadmap.",
    emptyDesc: "Generate a prioritized feature list with MVP, nice-to-have, and future items.",
  },
  flows: {
    label: "User Flows",
    description: "Key paths through the product experience.",
    emptyDesc: "Generate primary, onboarding, and core action flows with edge cases.",
  },
  wireframes: {
    label: "Screen Wireframes",
    description: "Screen-by-screen UI and UX guidance.",
    emptyDesc: "Generate screen layouts, key components, CTAs, and UX notes for each screen.",
  },
  stack: {
    label: "Tech Stack",
    description: "Recommended implementation stack and tradeoffs.",
    emptyDesc: "Generate frontend, backend, database, auth, and infrastructure recommendations.",
  },
  launch: {
    label: "Launch Plan",
    description: "Validation, beta acquisition, and go-to-market strategy.",
    emptyDesc: "Generate a validation plan, launch channels, and 30-day action plan.",
  },
  landingCopy: {
    label: "Landing Copy",
    description: "Market-ready copy for your product website.",
    emptyDesc: "Generate headlines, subheadlines, feature copy, FAQs, and CTAs.",
  },
  buildMode: {
    label: "Build Mode",
    description: "Implementation-ready artifacts.",
    emptyDesc: "",
  },
};

function SectionContent({ sectionType, content }: { sectionType: SectionType; content: unknown }) {
  switch (sectionType) {
    case "overview": return <OverviewSection content={content as any} />;
    case "personas": return <PersonasSection content={content as any} />;
    case "scope": return <ScopeSection content={content as any} />;
    case "flows": return <FlowsSection content={content as any} />;
    case "wireframes": return <WireframesSection content={content as any} />;
    case "stack": return <StackSection content={content as any} />;
    case "launch": return <LaunchSection content={content as any} />;
    case "landingCopy": return <LandingCopySection content={content as any} />;
    default: return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { bg: string; color: string; icon: React.ElementType; label: string }> = {
    generated: { bg: "#f0fdf4", color: "#16a34a", icon: CheckCircle2, label: "Generated" },
    edited: { bg: "#fffbeb", color: "#d97706", icon: Edit3, label: "Edited" },
    generating: { bg: "var(--forge-blue-light)", color: "var(--forge-blue)", icon: RefreshCw, label: "Generating…" },
    idle: { bg: "#f3f4f6", color: "#6b7280", icon: Clock, label: "Not generated" },
    error: { bg: "#fef2f2", color: "#dc2626", icon: AlertCircle, label: "Error" },
  };
  const cfg = configs[status] ?? configs.idle;
  const Icon = cfg.icon;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: cfg.bg, color: cfg.color, borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      <Icon size={11} style={{ animation: status === "generating" ? "spin 1s linear infinite" : "none" }} />
      {cfg.label}
    </span>
  );
}

function AgentBadge({ role }: { role: AIRole }) {
  const colors = ROLE_COLORS[role];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", background: colors.bg, color: colors.color, borderRadius: 20, fontSize: 11, fontWeight: 600, border: `1px solid ${colors.color}22` }}>
      <Cpu size={10} />
      {ROLE_LABELS[role]}
    </span>
  );
}

export default function ProjectWorkspacePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [activeSection, setActiveSection] = useState<SectionType>(
    (searchParams.get("section") as SectionType) ?? "overview"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingAll, setGeneratingAll] = useState(false);

  useEffect(() => {
    const sec = searchParams.get("section") as SectionType;
    if (sec) setActiveSection(sec);
  }, [searchParams]);

  const project = useProjectStore((s) => s.getProject(projectId));

  // Silently sync project to DB on mount — handles old localStorage-only projects
  useEffect(() => {
    if (!project) return;
    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) {
          fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: projectId,
              title: project.title,
              rawIdea: project.rawIdea,
              targetUser: project.targetUser ?? undefined,
              preferredPlatform: project.preferredPlatform ?? undefined,
              goal: project.goal ?? undefined,
              skillLevel: project.skillLevel ?? undefined,
              preferredStack: project.preferredStack ?? undefined,
              brandTone: project.brandTone ?? undefined,
            }),
          }).catch(() => {});
        }
      })
      .catch(() => {});
  }, [projectId, project]);
  const getSection = useProjectStore((s) => s.getSection);
  const updateSection = useProjectStore((s) => s.updateSection);
  const setSectionStatus = useProjectStore((s) => s.setSectionStatus);

  const currentSection = getSection(projectId, activeSection);
  const meta = SECTION_META[activeSection];

  // Call real API to generate a single section
  const handleGenerate = useCallback(
    async (sectionType: SectionType, regenerate = false) => {
      setIsGenerating(true);
      setSectionStatus(projectId, sectionType, "generating");

      try {
        const res = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, sectionType, regenerate }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Generation failed");
        }

        const data = await res.json();
        updateSection(projectId, sectionType, {
          content: data.section.content,
          status: "generated",
          version: data.section.version ?? 1,
          lastGeneratedAt: data.section.lastGeneratedAt,
          ...(data.metadata ? { metadata: data.metadata } : {}),
        });
      } catch (err) {
        console.error("Generation error:", err);
        setSectionStatus(projectId, sectionType, "error");
      } finally {
        setIsGenerating(false);
      }
    },
    [projectId, setSectionStatus, updateSection]
  );

  // Generate all sections sequentially
  const handleGenerateAll = useCallback(async () => {
    setGeneratingAll(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error("Failed to generate all sections");

      const data = await res.json();
      // Reload sections from API
      const projRes = await fetch(`/api/projects/${projectId}`);
      if (projRes.ok) {
        const { project: updatedProject } = await projRes.json();
        for (const s of updatedProject.sections) {
          updateSection(projectId, s.sectionType as SectionType, {
            content: s.contentJson,
            status: s.status,
          });
        }
      }
    } catch (err) {
      console.error("Generate all error:", err);
    } finally {
      setGeneratingAll(false);
    }
  }, [projectId, updateSection]);

  const handleExport = useCallback(async () => {
    // Try API first, fall back to client-side export
    try {
      const res = await fetch(`/api/projects/${projectId}/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exportType: "markdown" }),
      });

      if (res.ok) {
        const data = await res.json();
        download(data.content, `${project?.title ?? "forge"}-plan.md`, "text/markdown");
        return;
      }
    } catch { /* fall through to client-side */ }

    // Client-side fallback
    const store = useProjectStore.getState();
    const p = store.getProject(projectId);
    const sections = store.getSections(projectId);
    if (!p) return;

    let md = `# ${p.title}\n\n> ${p.rawIdea}\n\n---\n\n`;
    for (const s of sections) {
      md += `## ${s.title}\n\n_${s.summary}_\n\n\`\`\`json\n${JSON.stringify(s.content, null, 2)}\n\`\`\`\n\n`;
    }
    download(md, `${p.title.replace(/\s+/g, "-").toLowerCase()}-forge-plan.md`, "text/markdown");
  }, [projectId, project]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: "var(--forge-surface)" }}>
        <Sparkles size={32} color="var(--forge-blue)" />
        <p style={{ fontSize: 16, color: "var(--forge-text-muted)" }}>Project not found</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--forge-surface)" }}>
      <WorkspaceTopbar
        projectTitle={project.title}
        projectId={projectId}
        onExport={handleExport}
        onGenerateAll={handleGenerateAll}
        isGenerating={generatingAll}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <WorkspaceSidebar
          projectId={projectId}
          projectTitle={project.title}
          activeSection={activeSection}
        />

        <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {/* Section header */}
          <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--forge-text)" }}>
                  {meta.label}
                </h1>
                {currentSection && <StatusBadge status={currentSection.status} />}
                {currentSection?.status === "generated" && currentSection.metadata?.generatedByRole && (
                  <AgentBadge role={currentSection.metadata.generatedByRole} />
                )}
              </div>
              <p style={{ fontSize: 14, color: "var(--forge-text-muted)" }}>{meta.description}</p>
            </div>

            {currentSection && currentSection.status === "generated" && (
              <button
                className="forge-btn-secondary"
                style={{ padding: "7px 14px", fontSize: 13, gap: 6, flexShrink: 0 }}
                onClick={() => handleGenerate(activeSection, true)}
                disabled={isGenerating}
              >
                <RefreshCw size={13} style={{ animation: isGenerating ? "spin 1s linear infinite" : "none" }} />
                Regenerate
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {!currentSection || currentSection.status === "idle" ? (
                <SectionEmptyState
                  sectionName={meta.label}
                  description={meta.emptyDesc}
                  onGenerate={() => handleGenerate(activeSection)}
                  isGenerating={isGenerating}
                />
              ) : currentSection.status === "generating" ? (
                <GeneratingState />
              ) : currentSection.status === "error" ? (
                <ErrorState onRetry={() => handleGenerate(activeSection)} />
              ) : (
                <SectionContent sectionType={activeSection} content={currentSection.content} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function GeneratingState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "12px 16px", background: "var(--forge-blue-light)", borderRadius: 12, border: "1px solid #bfdbfe" }}>
        <RefreshCw size={14} color="var(--forge-blue)" style={{ animation: "spin 1s linear infinite" }} />
        <span style={{ fontSize: 13, color: "var(--forge-blue)", fontWeight: 600 }}>
          FORGE AI is generating this section…
        </span>
      </div>
      {[140, 90, 110, 80].map((h, i) => (
        <div key={i} className="shimmer" style={{ height: h, borderRadius: 16 }} />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "72px 0", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: 16, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <AlertCircle size={24} color="#dc2626" />
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--forge-text)", marginBottom: 8 }}>Generation failed</h3>
      <p style={{ fontSize: 14, color: "var(--forge-text-muted)", marginBottom: 24, maxWidth: 320 }}>
        Something went wrong. This might be a temporary issue — try again.
      </p>
      <button onClick={onRetry} className="forge-btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
        <RefreshCw size={13} />
        Try Again
      </button>
    </div>
  );
}

function download(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
