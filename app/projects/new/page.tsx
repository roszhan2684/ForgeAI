"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/lib/store/project-store";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Wand2,
  ChevronDown,
} from "lucide-react";

const PLATFORMS = ["Web", "iOS", "Android", "Cross-platform", "Unsure"];
const GOALS = ["Startup", "Portfolio", "Hackathon", "Internal Tool", "Class Project"];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const IDEA_EXAMPLES = [
  "An app for finding accountability partners for studying",
  "A subscription box discovery platform for niche hobbies",
  "An AI writing coach for non-native English speakers",
  "A local fitness trainer booking marketplace",
];

export default function NewProjectPage() {
  const router = useRouter();
  const addProject = useProjectStore((s) => s.addProject);

  const [form, setForm] = useState({
    title: "",
    rawIdea: "",
    targetUser: "",
    preferredPlatform: "",
    goal: "",
    skillLevel: "",
    preferredStack: "",
    brandTone: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rawIdea.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim() || undefined,
          rawIdea: form.rawIdea,
          targetUser: form.targetUser || undefined,
          preferredPlatform: form.preferredPlatform?.toLowerCase() || undefined,
          goal: form.goal?.toLowerCase().replace(" ", "-") || undefined,
          skillLevel: form.skillLevel?.toLowerCase() || undefined,
          preferredStack: form.preferredStack || undefined,
          brandTone: form.brandTone || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const { project } = await res.json();
      addProject({
        id: project.id,
        title: project.title,
        rawIdea: project.rawIdea,
        targetUser: project.targetUser ?? null,
        preferredPlatform: project.preferredPlatform ?? null,
        goal: project.goal ?? null,
        skillLevel: project.skillLevel ?? null,
        preferredStack: project.preferredStack ?? null,
        brandTone: project.brandTone ?? null,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      });
      router.push(`/projects/${project.id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-surface)" }}>
      {/* Nav */}
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid var(--forge-border)",
          height: 60,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "var(--forge-blue)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={14} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--forge-text)" }}>
            FORGE AI
          </span>
        </Link>
        <div style={{ flex: 1 }} />
        <Link href="/dashboard" className="forge-btn-secondary" style={{ padding: "6px 14px", fontSize: 13 }}>
          <ArrowLeft size={13} />
          Dashboard
        </Link>
      </nav>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "64px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: "var(--forge-blue-light)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Wand2 size={24} color="var(--forge-blue)" />
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "var(--forge-text)",
                marginBottom: 10,
              }}
            >
              What are you building?
            </h1>
            <p style={{ fontSize: 16, color: "var(--forge-text-muted)", lineHeight: 1.6 }}>
              Describe your product idea. FORGE AI will generate a complete planning workspace in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="forge-card" style={{ padding: 32, marginBottom: 16 }}>
              {/* Main idea */}
              <div style={{ marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--forge-text)",
                    marginBottom: 10,
                  }}
                >
                  Your product idea{" "}
                  <span style={{ color: "var(--forge-blue)" }}>*</span>
                </label>
                <textarea
                  value={form.rawIdea}
                  onChange={(e) => set("rawIdea", e.target.value)}
                  placeholder="Describe what you want to build. Be as rough or detailed as you like..."
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `2px solid ${form.rawIdea ? "var(--forge-blue)" : "var(--forge-border)"}`,
                    borderRadius: 14,
                    fontSize: 15,
                    color: "var(--forge-text)",
                    background: "white",
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--forge-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = form.rawIdea ? "var(--forge-blue)" : "var(--forge-border)")}
                />
                {/* Examples */}
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {IDEA_EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => set("rawIdea", ex)}
                      style={{
                        padding: "4px 12px",
                        background: "var(--forge-blue-light)",
                        border: "1px solid #bfdbfe",
                        borderRadius: 20,
                        fontSize: 12,
                        color: "var(--forge-blue)",
                        cursor: "pointer",
                        fontWeight: 500,
                        fontFamily: "inherit",
                      }}
                    >
                      {ex.slice(0, 36)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Project title */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                  Project title{" "}
                  <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional — AI will suggest one)</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. FocusForge, StudyBuddy..."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid var(--forge-border)",
                    borderRadius: 11,
                    fontSize: 14,
                    color: "var(--forge-text)",
                    background: "white",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--forge-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--forge-border)")}
                />
              </div>

              {/* Target user */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                  Who is this for?{" "}
                  <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.targetUser}
                  onChange={(e) => set("targetUser", e.target.value)}
                  placeholder="e.g. college students, freelance designers, small business owners..."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid var(--forge-border)",
                    borderRadius: 11,
                    fontSize: 14,
                    color: "var(--forge-text)",
                    background: "white",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--forge-blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--forge-border)")}
                />
              </div>

              {/* Platform + Goal */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                    Platform
                  </label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set("preferredPlatform", form.preferredPlatform === p ? "" : p)}
                        style={{
                          padding: "6px 13px",
                          border: `1.5px solid ${form.preferredPlatform === p ? "var(--forge-blue)" : "var(--forge-border)"}`,
                          borderRadius: 9,
                          fontSize: 13,
                          color: form.preferredPlatform === p ? "var(--forge-blue)" : "var(--forge-text-muted)",
                          background: form.preferredPlatform === p ? "var(--forge-blue-light)" : "white",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontWeight: form.preferredPlatform === p ? 600 : 400,
                          transition: "all 0.12s",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                    Goal
                  </label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {GOALS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => set("goal", form.goal === g ? "" : g)}
                        style={{
                          padding: "6px 13px",
                          border: `1.5px solid ${form.goal === g ? "var(--forge-blue)" : "var(--forge-border)"}`,
                          borderRadius: 9,
                          fontSize: 13,
                          color: form.goal === g ? "var(--forge-blue)" : "var(--forge-text-muted)",
                          background: form.goal === g ? "var(--forge-blue-light)" : "white",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontWeight: form.goal === g ? 600 : 400,
                          transition: "all 0.12s",
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skill level */}
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                  Your skill level
                </label>
                <div style={{ display: "flex", gap: 6 }}>
                  {SKILL_LEVELS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("skillLevel", form.skillLevel === s ? "" : s)}
                      style={{
                        padding: "7px 18px",
                        border: `1.5px solid ${form.skillLevel === s ? "var(--forge-blue)" : "var(--forge-border)"}`,
                        borderRadius: 9,
                        fontSize: 13,
                        color: form.skillLevel === s ? "var(--forge-blue)" : "var(--forge-text-muted)",
                        background: form.skillLevel === s ? "var(--forge-blue-light)" : "white",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: form.skillLevel === s ? 600 : 400,
                        transition: "all 0.12s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced */}
            <div style={{ marginBottom: 24 }}>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--forge-text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  fontFamily: "inherit",
                }}
              >
                <ChevronDown
                  size={15}
                  style={{
                    transform: showAdvanced ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                />
                Advanced options (stack, brand tone)
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="forge-card" style={{ padding: 24, marginTop: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                            Preferred stack
                          </label>
                          <input
                            type="text"
                            value={form.preferredStack}
                            onChange={(e) => set("preferredStack", e.target.value)}
                            placeholder="e.g. Next.js, React Native..."
                            style={{
                              width: "100%",
                              padding: "10px 13px",
                              border: "1px solid var(--forge-border)",
                              borderRadius: 10,
                              fontSize: 13,
                              color: "var(--forge-text)",
                              background: "white",
                              outline: "none",
                              fontFamily: "inherit",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--forge-blue)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--forge-border)")}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text)", marginBottom: 8 }}>
                            Brand / tone vibe
                          </label>
                          <input
                            type="text"
                            value={form.brandTone}
                            onChange={(e) => set("brandTone", e.target.value)}
                            placeholder="e.g. minimal premium, playful, serious..."
                            style={{
                              width: "100%",
                              padding: "10px 13px",
                              border: "1px solid var(--forge-border)",
                              borderRadius: 10,
                              fontSize: 13,
                              color: "var(--forge-text)",
                              background: "white",
                              outline: "none",
                              fontFamily: "inherit",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--forge-blue)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--forge-border)")}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!form.rawIdea.trim() || isSubmitting}
              className="forge-btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                fontSize: 15,
                fontWeight: 700,
                opacity: !form.rawIdea.trim() ? 0.5 : 1,
                cursor: !form.rawIdea.trim() ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Creating workspace...
                </>
              ) : (
                <>
                  Generate Product Plan
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
