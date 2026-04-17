"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SectionType } from "@/types/project";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  GitBranch,
  Monitor,
  Code2,
  Rocket,
  FileText,
  Hammer,
  ChevronLeft,
} from "lucide-react";

const SECTIONS: {
  type: SectionType | "buildMode";
  label: string;
  icon: React.ElementType;
  special?: boolean;
}[] = [
  { type: "overview", label: "Overview", icon: LayoutDashboard },
  { type: "personas", label: "Personas", icon: Users },
  { type: "scope", label: "Feature Scope", icon: CheckSquare },
  { type: "flows", label: "User Flows", icon: GitBranch },
  { type: "wireframes", label: "Wireframes", icon: Monitor },
  { type: "stack", label: "Tech Stack", icon: Code2 },
  { type: "launch", label: "Launch Plan", icon: Rocket },
  { type: "landingCopy", label: "Landing Copy", icon: FileText },
  { type: "buildMode", label: "Build Mode", icon: Hammer, special: true },
];

interface Props {
  projectId: string;
  projectTitle: string;
  activeSection?: string;
}

export function WorkspaceSidebar({ projectId, projectTitle, activeSection }: Props) {
  const pathname = usePathname();
  const isBuildMode = pathname.includes("/build-mode");

  return (
    <aside
      style={{
        width: 220,
        borderRight: "1px solid var(--forge-border)",
        background: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {/* Back link */}
      <Link
        href="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: "#9ca3af",
          textDecoration: "none",
          marginBottom: 20,
          padding: "4px 6px",
          borderRadius: 7,
          transition: "color 0.15s",
        }}
      >
        <ChevronLeft size={13} />
        Dashboard
      </Link>

      {/* Project name */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#374151",
          letterSpacing: "-0.01em",
          marginBottom: 20,
          padding: "0 8px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.4,
        }}
      >
        {projectTitle}
      </div>

      {/* Section nav */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {SECTIONS.map((section) => {
          const href =
            section.type === "buildMode"
              ? `/projects/${projectId}/build-mode`
              : `/projects/${projectId}?section=${section.type}`;

          const isActive =
            section.type === "buildMode"
              ? isBuildMode
              : !isBuildMode && activeSection === section.type;

          return (
            <Link
              key={section.type}
              href={href}
              className="forge-sidebar-item"
              style={{
                color: isActive
                  ? "var(--forge-blue)"
                  : section.special
                  ? "#7c3aed"
                  : undefined,
                background: isActive ? "var(--forge-blue-light)" : undefined,
                borderLeft: isActive ? "2px solid var(--forge-blue)" : "2px solid transparent",
              }}
            >
              <section.icon size={15} />
              {section.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
