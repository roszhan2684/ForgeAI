"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import {
  Layers, Users, GitBranch, FileText, Code2, Sparkles,
  CheckCircle2, ArrowRight, Zap, Brain, Rocket, Star, Play,
} from "lucide-react";

const FEATURES = [
  { icon: Sparkles, color: "#2563eb", bg: "#eff6ff", title: "Product Overview", desc: "Crystallize your idea into a clear problem statement, value proposition, and success metrics." },
  { icon: Users, color: "#7c3aed", bg: "#faf5ff", title: "User Personas", desc: "AI-crafted personas with goals, frustrations, behaviors, and primary use cases." },
  { icon: CheckCircle2, color: "#059669", bg: "#ecfdf5", title: "Feature Scope", desc: "Ruthlessly prioritized MVP, nice-to-haves, and a future roadmap — with clear rationale." },
  { icon: GitBranch, color: "#d97706", bg: "#fffbeb", title: "User Flows", desc: "Step-by-step primary, onboarding, and core action flows with edge cases mapped out." },
  { icon: FileText, color: "#dc2626", bg: "#fef2f2", title: "Screen Wireframes", desc: "Every screen defined with layout notes, key components, CTAs, and UX guidance." },
  { icon: Layers, color: "#0891b2", bg: "#ecfeff", title: "Tech Stack", desc: "Tailored frontend, backend, database, auth, and infra recommendations for your skill level." },
  { icon: Rocket, color: "#7c3aed", bg: "#faf5ff", title: "Launch Plan", desc: "Validation approach, beta acquisition strategy, and a 30-day go-to-market action plan." },
  { icon: Code2, color: "#059669", bg: "#ecfdf5", title: "Build Mode", desc: "Implementation-ready tickets, API plan, data model, and a Claude Code prompt to scaffold the MVP." },
];

const HOW_IT_WORKS = [
  { icon: FileText, color: "#2563eb", bg: "#eff6ff", step: "01", title: "Describe your idea", desc: "Type your product idea in plain English — a sentence is enough. Tell us your target user and skill level." },
  { icon: Brain, color: "#7c3aed", bg: "#faf5ff", step: "02", title: "AI builds your plan", desc: "FORGE AI's specialized agents generate 8 structured sections: personas, flows, wireframes, stack, and more." },
  { icon: Rocket, color: "#059669", bg: "#ecfdf5", step: "03", title: "Export & build", desc: "Download your full plan as Markdown or copy the Claude Code prompt to start scaffolding immediately." },
];

const TESTIMONIALS = [
  { quote: "I went from 'vague idea' to a complete product spec in under 10 minutes. This is what I used to pay consultants $5k for.", name: "Alex R.", role: "Indie Hacker" },
  { quote: "The tech stack recommendations alone saved me a week of research. And the Claude Code prompt actually worked on the first try.", name: "Priya S.", role: "Founding Engineer" },
  { quote: "Finally a tool that understands I'm building, not just planning. The Build Mode output is genuinely usable.", name: "Marcus T.", role: "Solo Founder" },
];

const PRICING = [
  {
    name: "Free", price: "$0", period: "forever",
    desc: "Perfect for exploring your first idea.",
    features: ["3 projects", "All 8 AI sections", "Export to Markdown", "Gemini AI generation"],
    cta: "Start free", href: "/projects/new", highlight: false,
  },
  {
    name: "Pro", price: "$19", period: "per month",
    desc: "For builders who ship regularly.",
    features: ["Unlimited projects", "All 8 AI sections", "Priority generation", "Export to Markdown", "Regenerate any section", "Email support"],
    cta: "Get Pro", href: "/projects/new", highlight: true, badge: "Most popular",
  },
  {
    name: "Team", price: "$49", period: "per month",
    desc: "For teams building together.",
    features: ["Everything in Pro", "Up to 5 team members", "Shared project workspace", "Priority support"],
    cta: "Contact us", href: "mailto:hello@forgeai.app", highlight: false,
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
  };
}

export default function LandingPage() {
  return (
    <div style={{ background: "white", color: "#0f1117", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif" }}>
      <MarketingNav />

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg, #0f1117 0%, #1e1b4b 45%, #1e3a8a 100%)",
        padding: "120px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <motion.div {...fadeUp()} style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)", borderRadius: 100, marginBottom: 28 }}>
            <Zap size={12} color="#818cf8" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.04em" }}>Powered by Gemini AI</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 7vw, 76px)", fontWeight: 900, color: "white", letterSpacing: "-0.045em", lineHeight: 1.05, marginBottom: 24, maxWidth: 860 }}>
            Turn your idea into a{" "}
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              build-ready product
            </span>
            {" "}in minutes
          </h1>

          <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 600, margin: "0 auto 40px" }}>
            FORGE AI generates a complete product plan — personas, flows, wireframes, tech stack, and an implementation-ready Build Mode — from a single sentence.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/projects/new" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
              textDecoration: "none", color: "white",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              boxShadow: "0 4px 24px rgba(37,99,235,0.4)",
            }}>
              <Sparkles size={16} />
              Start building free
            </Link>
            <a href="#how-it-works" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 600,
              textDecoration: "none", color: "rgba(255,255,255,0.8)",
              border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)",
            }}>
              See how it works <ArrowRight size={15} />
            </a>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 20 }}>No credit card required · Free forever plan</p>
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative", zIndex: 1, marginTop: 64, width: "100%", maxWidth: 960 }}
        >
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "16px 16px 0", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              {["#ef4444","#f59e0b","#10b981"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />)}
              <div style={{ flex: 1, height: 24, background: "rgba(255,255,255,0.06)", borderRadius: 6, marginLeft: 8 }} />
            </div>
            <div style={{ borderRadius: "12px 12px 0 0", overflow: "hidden", background: "#f8fafc", height: 340, display: "flex" }}>
              <div style={{ width: 200, background: "white", borderRight: "1px solid #e5e7eb", padding: "16px 12px", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, paddingLeft: 8 }}>SECTIONS</div>
                {["Overview","User Personas","Feature Scope","User Flows","Wireframes","Tech Stack","Launch Plan","Landing Copy"].map((s, i) => (
                  <div key={s} style={{ padding: "8px 10px", borderRadius: 8, marginBottom: 2, fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#2563eb" : "#6b7280", background: i === 0 ? "#eff6ff" : "transparent" }}>{s}</div>
                ))}
              </div>
              <div style={{ flex: 1, padding: 24 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{ height: 22, width: 80, background: "#0f1117", borderRadius: 4 }} />
                  <div style={{ height: 22, width: 64, background: "#dcfce7", borderRadius: 4 }} />
                </div>
                <div style={{ height: 28, background: "#0f1117", borderRadius: 6, marginBottom: 8, width: "70%" }} />
                <div style={{ height: 14, background: "#e5e7eb", borderRadius: 4, marginBottom: 6, width: "90%" }} />
                <div style={{ height: 14, background: "#e5e7eb", borderRadius: 4, marginBottom: 24, width: "75%" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
                      <div style={{ height: 12, background: "#bfdbfe", borderRadius: 3, marginBottom: 8, width: "50%" }} />
                      <div style={{ height: 10, background: "#e5e7eb", borderRadius: 3, width: "80%" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "20px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          {[["8","AI-generated sections"],["< 2 min","Average generation time"],["100%","Free to start"],["1 idea","Is all you need"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f1117", letterSpacing: "-0.04em" }}>{v}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 100, marginBottom: 16 }}>
              <Brain size={12} color="#16a34a" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>How it works</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117", marginBottom: 16 }}>From idea to spec in 3 steps</h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>No lengthy forms. No complex setup. Just describe your idea and let FORGE AI do the heavy lifting.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }}>
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.step} {...fadeUp(i * 0.1)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 16, right: 20, fontSize: 52, fontWeight: 900, color: "#f3f4f6", letterSpacing: "-0.04em", lineHeight: 1 }}>{step.step}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon size={20} color={step.color} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f1117", marginBottom: 10, letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Demo video */}
          <motion.div {...fadeUp(0.1)} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "linear-gradient(160deg, #0f1117, #1e1b4b)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, cursor: "pointer", position: "relative" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
                <Play size={28} color="white" style={{ marginLeft: 4 }} />
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Watch the 2-minute demo</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>See a complete product plan generated in real time</p>
              <div style={{ position: "absolute", top: 20, left: 20, padding: "6px 12px", background: "rgba(37,99,235,0.3)", border: "1px solid rgba(37,99,235,0.5)", borderRadius: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd" }}>LIVE DEMO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, marginBottom: 16 }}>
              <Layers size={12} color="#2563eb" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#2563eb" }}>8 AI-generated sections</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117", marginBottom: 16 }}>Everything you need to build</h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>Each section is crafted by a specialized AI agent — strategist, UX designer, architect, and copywriter.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} {...fadeUp(i * 0.05)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "22px 20px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={18} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "#0f1117", marginBottom: 7, letterSpacing: "-0.015em" }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} color="#f59e0b" fill="#f59e0b" />)}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117" }}>Builders love FORGE AI</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.1)} style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} color="#f59e0b" fill="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</p>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1117" }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "100px 24px", background: "#f8fafc", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117", marginBottom: 12 }}>Simple, honest pricing</h2>
            <p style={{ fontSize: 17, color: "#6b7280" }}>Start free. Upgrade when you need more.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {PRICING.map((plan, i) => (
              <motion.div key={plan.name} {...fadeUp(i * 0.1)} style={{
                background: plan.highlight ? "linear-gradient(160deg, #1e1b4b, #1e3a8a)" : "white",
                border: plan.highlight ? "none" : "1px solid #e5e7eb",
                borderRadius: 20, padding: "32px 28px", position: "relative",
                boxShadow: plan.highlight ? "0 16px 48px rgba(37,99,235,0.25)" : "none",
              }}>
                {(plan as any).badge && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 100, fontSize: 11.5, fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>
                    {(plan as any).badge}
                  </div>
                )}
                <p style={{ fontSize: 13, fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.5)" : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{plan.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em", color: plan.highlight ? "white" : "#0f1117" }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: plan.highlight ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: 13.5, color: plan.highlight ? "rgba(255,255,255,0.55)" : "#6b7280", marginBottom: 24 }}>{plan.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <CheckCircle2 size={14} color={plan.highlight ? "#60a5fa" : "#059669"} />
                      <span style={{ fontSize: 13.5, color: plan.highlight ? "rgba(255,255,255,0.8)" : "#374151" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={plan.href} style={{
                  display: "block", textAlign: "center", padding: "11px 0", borderRadius: 10,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  background: plan.highlight ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "white",
                  color: plan.highlight ? "white" : "#0f1117",
                  border: plan.highlight ? "none" : "1.5px solid #e5e7eb",
                  boxShadow: plan.highlight ? "0 4px 16px rgba(59,130,246,0.4)" : "none",
                }}>{plan.cta}</Link>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 24 }}>
            All plans include access to Gemini AI generation.{" "}
            <Link href="/pricing" style={{ color: "#2563eb", textDecoration: "none" }}>See full pricing details →</Link>
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(160deg, #0f1117 0%, #1e1b4b 60%, #1e3a8a 100%)" }}>
        <motion.div {...fadeUp()}>
          <h2 style={{ fontSize: "clamp(30px, 6vw, 60px)", fontWeight: 900, color: "white", letterSpacing: "-0.045em", lineHeight: 1.1, marginBottom: 20, maxWidth: 720, margin: "0 auto 20px" }}>
            Your next product starts with one sentence
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 40 }}>No planning paralysis. No blank pages. Just build.</p>
          <Link href="/projects/new" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 40px", borderRadius: 14, fontSize: 17, fontWeight: 800,
            textDecoration: "none", color: "white",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            boxShadow: "0 6px 32px rgba(37,99,235,0.45)",
          }}>
            <Sparkles size={18} />
            Start building — it&apos;s free
            <ArrowRight size={16} />
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 18 }}>No credit card · 3 projects free · Upgrade anytime</p>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  );
}
