"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Users,
  GitBranch,
  Zap,
  BarChart2,
  FileText,
  Code2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Product Overview",
    description:
      "Crystallize your idea into a clear problem statement, value proposition, and success metrics.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "User Personas",
    description:
      "AI-crafted user personas with goals, frustrations, behaviors, and primary use cases.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: CheckCircle2,
    title: "Feature Scope",
    description:
      "Ruthlessly prioritized MVP, nice-to-haves, and a future roadmap — with clear rationale.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: GitBranch,
    title: "User Flows",
    description:
      "Step-by-step primary, onboarding, and core action flows with edge cases mapped out.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: FileText,
    title: "Screen Wireframes",
    description:
      "Every screen defined with layout notes, key components, CTAs, and UX guidance.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Code2,
    title: "Build Mode",
    description:
      "Tickets, API endpoints, data schema, and a Claude prompt — ready for engineering execution.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: BarChart2,
    title: "Launch Plan",
    description:
      "Validation strategy, beta user profile, channels, and a 30-day action plan.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Zap,
    title: "Landing Copy",
    description:
      "Market-ready headlines, feature copy, FAQs, and CTAs for your product website.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const workflow = [
  {
    step: "01",
    title: "Drop your idea",
    description:
      "Enter a rough product concept — a few sentences is enough. FORGE AI does the rest.",
  },
  {
    step: "02",
    title: "Generate your plan",
    description:
      "AI transforms your idea into a structured product workspace with 8+ planning sections.",
  },
  {
    step: "03",
    title: "Refine and own it",
    description:
      "Edit any section, regenerate individual outputs, and shape the plan to match your vision.",
  },
  {
    step: "04",
    title: "Build with clarity",
    description:
      "Export a Claude Code handoff prompt, markdown doc, or JSON — and start building immediately.",
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: "var(--forge-surface)", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav
        style={{
          background: "rgba(248,248,249,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--forge-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--forge-blue)",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={16} color="white" />
            </div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--forge-text)",
              }}
            >
              FORGE AI
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/dashboard">
              <button className="forge-btn-secondary" style={{ padding: "7px 16px", fontSize: 13 }}>
                Dashboard
              </button>
            </Link>
            <Link href="/projects/new">
              <button className="forge-btn-primary" style={{ padding: "7px 16px", fontSize: 13 }}>
                Start Building
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: "96px 32px 80px",
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 13px",
              background: "var(--forge-blue-light)",
              border: "1px solid #bfdbfe",
              borderRadius: 20,
              marginBottom: 32,
            }}
          >
            <Sparkles size={12} color="var(--forge-blue)" />
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "var(--forge-blue)" }}
            >
              AI-powered product planning workspace
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 68px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              maxWidth: 780,
              margin: "0 auto 24px",
              color: "var(--forge-text)",
            }}
          >
            Turn rough ideas into{" "}
            <span className="gradient-text">buildable products</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "var(--forge-text-muted)",
              maxWidth: 560,
              margin: "0 auto 48px",
              lineHeight: 1.65,
            }}
          >
            FORGE AI transforms your product idea into a structured workspace —
            complete with personas, scope, flows, wireframes, launch plans, and
            a build-ready engineering handoff.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link href="/projects/new">
              <button
                className="forge-btn-primary"
                style={{ padding: "12px 28px", fontSize: 15, fontWeight: 700 }}
              >
                Start Building Free
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/projects/demo-focusforge">
              <button
                className="forge-btn-secondary"
                style={{ padding: "12px 28px", fontSize: 15 }}
              >
                View Demo Project
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Hero preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 72 }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 24,
              border: "1px solid var(--forge-border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(37,99,235,0.06)",
              overflow: "hidden",
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {/* Browser chrome */}
            <div
              style={{
                background: "#f9fafb",
                borderBottom: "1px solid var(--forge-border)",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#ffbc2e", "#28c840"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "white",
                  border: "1px solid var(--forge-border)",
                  borderRadius: 7,
                  padding: "5px 14px",
                  fontSize: 12,
                  color: "#9ca3af",
                  maxWidth: 340,
                  margin: "0 auto",
                }}
              >
                forgeai.app/projects/focusforge
              </div>
            </div>

            {/* App preview */}
            <div style={{ display: "flex", height: 460 }}>
              {/* Sidebar */}
              <div
                style={{
                  width: 200,
                  borderRight: "1px solid var(--forge-border)",
                  background: "white",
                  padding: "20px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                    paddingLeft: 12,
                  }}
                >
                  FocusForge
                </div>
                {[
                  { label: "Overview", active: true },
                  { label: "Personas" },
                  { label: "Feature Scope" },
                  { label: "User Flows" },
                  { label: "Wireframes" },
                  { label: "Tech Stack" },
                  { label: "Launch Plan" },
                  { label: "Landing Copy" },
                  { label: "Build Mode", special: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "7px 12px",
                      borderRadius: 9,
                      fontSize: 13,
                      fontWeight: item.active ? 600 : 500,
                      color: item.active
                        ? "var(--forge-blue)"
                        : item.special
                        ? "#7c3aed"
                        : "#6b7280",
                      background: item.active
                        ? "var(--forge-blue-light)"
                        : "transparent",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div
                style={{
                  flex: 1,
                  background: "var(--forge-surface)",
                  padding: 28,
                  overflowY: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--forge-text)",
                    marginBottom: 6,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Product Overview
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--forge-text-muted)",
                    marginBottom: 24,
                  }}
                >
                  High-level product definition and strategic framing.
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {[
                    {
                      label: "One-Line Summary",
                      value:
                        "A student accountability app for finding focused study partners.",
                    },
                    {
                      label: "Target Audience",
                      value:
                        "College students who want structure and accountability.",
                    },
                    {
                      label: "Value Proposition",
                      value:
                        "Partner matching, session scheduling, and streak-based accountability.",
                    },
                    {
                      label: "Why Now",
                      value:
                        "Students increasingly study independently post-pandemic.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "white",
                        border: "1px solid var(--forge-border)",
                        borderRadius: 14,
                        padding: "16px 18px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          marginBottom: 7,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--forge-text-secondary)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What FORGE generates */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="forge-badge forge-badge-blue" style={{ marginBottom: 16 }}>
            What gets generated
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--forge-text)",
              marginBottom: 16,
            }}
          >
            Everything you need to go from idea to execution
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--forge-text-muted)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            FORGE AI generates 8 structured planning sections from a single idea input —
            all in seconds.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div
                className="forge-card"
                style={{ padding: "24px", height: "100%" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    background: f.bg,
                  }}
                  className={f.color}
                >
                  <f.icon size={20} />
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--forge-text)",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.title}
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--forge-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        style={{
          padding: "80px 32px",
          background: "white",
          borderTop: "1px solid var(--forge-border)",
          borderBottom: "1px solid var(--forge-border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="forge-badge forge-badge-blue" style={{ marginBottom: 16 }}>
              How it works
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--forge-text)",
              }}
            >
              Idea to execution in four steps
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {workflow.map((w, i) => (
              <motion.div
                key={w.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--forge-blue)",
                    letterSpacing: "0.08em",
                    marginBottom: 12,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {w.step}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--forge-text)",
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {w.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--forge-text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {w.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Mode highlight */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
            borderRadius: 28,
            padding: "56px 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 13px",
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: 20,
                marginBottom: 24,
              }}
            >
              <Code2 size={12} color="#a78bfa" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa" }}>
                Build Mode
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "white",
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              From plan to implementation — instantly
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 32,
                lineHeight: 1.65,
                maxWidth: 460,
              }}
            >
              Build Mode transforms your product plan into engineering artifacts —
              screens, components, tickets, API endpoints, data schema, and a
              Claude Code handoff prompt ready for immediate execution.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["Dev-ready ticket breakdown", "API endpoint design", "Data model & schema", "Claude Code export prompt"].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <CheckCircle2 size={16} color="#34d399" />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>

            <Link href="/projects/demo-focusforge/build-mode">
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 24px",
                  background: "white",
                  color: "#0f172a",
                  border: "none",
                  borderRadius: 11,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Explore Build Mode
                <ChevronRight size={15} />
              </button>
            </Link>
          </div>

          {/* Build mode preview */}
          <div
            style={{
              flex: 1,
              minWidth: 280,
              maxWidth: 440,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  padding: "14px 18px",
                  display: "flex",
                  gap: 6,
                }}
              >
                {["Screens", "Tickets", "APIs", "Schema", "Roadmap"].map(
                  (tab, i) => (
                    <div
                      key={tab}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 7,
                        fontSize: 12,
                        fontWeight: 600,
                        background: i === 1 ? "rgba(124,58,237,0.3)" : "transparent",
                        color: i === 1 ? "#a78bfa" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {tab}
                    </div>
                  )
                )}
              </div>
              <div style={{ padding: 18 }}>
                {[
                  { id: "T-001", title: "Implement user authentication", complexity: "Low", color: "#34d399" },
                  { id: "T-002", title: "Build onboarding flow", complexity: "Medium", color: "#fbbf24" },
                  { id: "T-003", title: "Partner matching algorithm", complexity: "High", color: "#f87171" },
                ].map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "12px 14px",
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>
                        {ticket.id}
                      </div>
                      <div style={{ fontSize: 13, color: "white", fontWeight: 500 }}>
                        {ticket.title}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: ticket.color,
                        background: `${ticket.color}18`,
                        padding: "3px 9px",
                        borderRadius: 20,
                      }}
                    >
                      {ticket.complexity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 32px 100px",
          textAlign: "center",
          background: "white",
          borderTop: "1px solid var(--forge-border)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "var(--forge-text)",
              marginBottom: 16,
            }}
          >
            Ready to forge your product?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--forge-text-muted)",
              marginBottom: 40,
              maxWidth: 460,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            Start with a rough idea. Leave with a structured plan you can actually build.
          </p>
          <Link href="/projects/new">
            <button
              className="forge-btn-primary"
              style={{ padding: "14px 32px", fontSize: 16, fontWeight: 700 }}
            >
              Start Building — It's Free
              <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "32px",
          borderTop: "1px solid var(--forge-border)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: "var(--forge-blue)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={11} color="white" />
          </div>
          <span
            style={{ fontSize: 14, fontWeight: 700, color: "var(--forge-text)" }}
          >
            FORGE AI
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          Turn ideas into buildable products.
        </p>
      </footer>
    </div>
  );
}
