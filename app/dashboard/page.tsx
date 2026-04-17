"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProjectStore } from "@/lib/store/project-store";
import { Project } from "@/types/project";
import {
  Plus,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  Layers,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

const platformLabels: Record<string, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  "cross-platform": "Cross-platform",
  unsure: "Unsure",
};

const goalLabels: Record<string, string> = {
  startup: "Startup",
  portfolio: "Portfolio",
  hackathon: "Hackathon",
  "internal-tool": "Internal Tool",
  "class-project": "Class Project",
};

const PROMPTS = [
  "A subscription app for local farmers markets...",
  "An AI writing assistant for non-native English speakers...",
  "A booking platform for independent fitness trainers...",
  "A habit tracker that connects with friends...",
];

function ProjectCard({ project }: { project: Project }) {
  const sections = useProjectStore((s) => s.getSections(project.id));
  const generatedCount = sections.filter((s) => s.status === "generated" || s.status === "edited").length;

  return (
    <Link href={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="forge-card"
        style={{
          padding: "24px",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "var(--forge-blue-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers size={20} color="var(--forge-blue)" />
          </div>
          <div className="forge-badge forge-badge-green">
            {generatedCount}/9 sections
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--forge-text)",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {project.title}
        </div>

        <p
          style={{
            fontSize: 13.5,
            color: "var(--forge-text-muted)",
            lineHeight: 1.55,
            marginBottom: 20,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.rawIdea}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {project.goal && (
            <span className="section-chip">
              <Target size={11} />
              {goalLabels[project.goal] ?? project.goal}
            </span>
          )}
          {project.preferredPlatform && (
            <span className="section-chip">
              <LayoutGrid size={11} />
              {platformLabels[project.preferredPlatform] ?? project.preferredPlatform}
            </span>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--forge-border)",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            <Clock size={12} />
            {new Date(project.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--forge-blue)",
            }}
          >
            Open
            <ChevronRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-surface)" }}>
      {/* Top Nav */}
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid var(--forge-border)",
          height: 60,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: 16,
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "var(--forge-blue)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={14} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--forge-text)" }}>
            FORGE AI
          </span>
        </Link>

        <div style={{ flex: 1 }} />

        <Link href="/projects/new">
          <button className="forge-btn-primary" style={{ padding: "7px 16px", fontSize: 13 }}>
            <Plus size={14} />
            New Project
          </button>
        </Link>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "var(--forge-text)",
              marginBottom: 8,
            }}
          >
            Your Projects
          </h1>
          <p style={{ fontSize: 15, color: "var(--forge-text-muted)" }}>
            {projects.length} project{projects.length !== 1 ? "s" : ""} — select one to continue building or start fresh.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              padding: "96px 32px",
              background: "white",
              borderRadius: 24,
              border: "1px solid var(--forge-border)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: "var(--forge-blue-light)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Sparkles size={32} color="var(--forge-blue)" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--forge-text)", marginBottom: 12 }}>
              No projects yet
            </h2>
            <p style={{ fontSize: 15, color: "var(--forge-text-muted)", marginBottom: 32, maxWidth: 360, margin: "0 auto 32px" }}>
              Start with a product idea — FORGE AI will turn it into a complete, structured product plan.
            </p>
            <div style={{ marginBottom: 40 }}>
              <Link href="/projects/new">
                <button className="forge-btn-primary" style={{ padding: "12px 28px", fontSize: 15 }}>
                  Create Your First Project
                  <ArrowRight size={15} />
                </button>
              </Link>
            </div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>Try one of these prompts:</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
              {PROMPTS.map((p) => (
                <div
                  key={p}
                  className="forge-card-sm"
                  style={{ padding: "8px 14px", fontSize: 13, color: "var(--forge-text-secondary)", cursor: "pointer" }}
                >
                  "{p}"
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div>
            {/* New project card + projects */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {/* New project card */}
              <Link href="/projects/new" style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    border: "2px dashed var(--forge-border)",
                    borderRadius: 20,
                    padding: 24,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    minHeight: 200,
                    background: "transparent",
                    transition: "border-color 0.15s",
                  }}
                  onHoverStart={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--forge-blue)";
                  }}
                  onHoverEnd={(e) => {
                    (e.target as HTMLElement).style.borderColor = "var(--forge-border)";
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: "var(--forge-blue-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={22} color="var(--forge-blue)" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--forge-text)", marginBottom: 6 }}>
                      New Project
                    </div>
                    <div style={{ fontSize: 13, color: "var(--forge-text-muted)" }}>
                      Start with a product idea
                    </div>
                  </div>
                </motion.div>
              </Link>

              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
