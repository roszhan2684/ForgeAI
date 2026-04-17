"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, ProjectSection, SectionType } from "@/types/project";
import { DEMO_PROJECT, DEMO_SECTIONS } from "@/lib/seed-data";

interface ProjectStore {
  projects: Project[];
  sections: Record<string, ProjectSection[]>;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProject: (id: string) => Project | undefined;
  getSections: (projectId: string) => ProjectSection[];
  getSection: (projectId: string, sectionType: SectionType) => ProjectSection | undefined;
  updateSection: (projectId: string, sectionType: SectionType, updates: Partial<ProjectSection>) => void;
  setSectionStatus: (projectId: string, sectionType: SectionType, status: ProjectSection["status"]) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [DEMO_PROJECT],
      sections: { "demo-focusforge": DEMO_SECTIONS },

      addProject: (project) =>
        set((state) => ({
          projects: [project, ...state.projects],
          sections: { ...state.sections, [project.id]: [] },
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      getProject: (id) => get().projects.find((p) => p.id === id),

      getSections: (projectId) => get().sections[projectId] ?? [],

      getSection: (projectId, sectionType) =>
        (get().sections[projectId] ?? []).find(
          (s) => s.sectionType === sectionType
        ),

      updateSection: (projectId, sectionType, updates) =>
        set((state) => {
          const existing = state.sections[projectId] ?? [];
          const idx = existing.findIndex((s) => s.sectionType === sectionType);
          if (idx === -1) {
            return {
              sections: {
                ...state.sections,
                [projectId]: [
                  ...existing,
                  {
                    id: `sec-${sectionType}-${Date.now()}`,
                    projectId,
                    sectionType,
                    title: sectionType,
                    summary: "",
                    content: {},
                    status: "generated",
                    version: 1,
                    edited: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    ...updates,
                  } as ProjectSection,
                ],
              },
            };
          }
          const updated = [...existing];
          updated[idx] = {
            ...updated[idx],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          return { sections: { ...state.sections, [projectId]: updated } };
        }),

      setSectionStatus: (projectId, sectionType, status) =>
        get().updateSection(projectId, sectionType, { status }),
    }),
    { name: "forge-ai-store" }
  )
);
