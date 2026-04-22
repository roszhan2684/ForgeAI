"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CheckCircle2, X, Sparkles, Zap, Users, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to validate your first idea.",
    cta: "Get started free",
    href: "/projects/new",
    highlight: false,
    features: {
      "Projects": "3 projects",
      "AI sections": "All 8 sections",
      "AI provider": "Gemini AI",
      "Regeneration": "✓",
      "Export to Markdown": "✓",
      "Build Mode": "✓",
      "Priority generation": "—",
      "Email support": "—",
      "Team members": "—",
    },
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    desc: "For builders who ship one product at a time.",
    cta: "Start Pro",
    href: "/projects/new",
    highlight: true,
    badge: "Most popular",
    features: {
      "Projects": "Unlimited",
      "AI sections": "All 8 sections",
      "AI provider": "Gemini AI",
      "Regeneration": "✓",
      "Export to Markdown": "✓",
      "Build Mode": "✓",
      "Priority generation": "✓",
      "Email support": "✓",
      "Team members": "—",
    },
  },
  {
    name: "Team",
    price: "$49",
    period: "month",
    desc: "For teams building and iterating together.",
    cta: "Contact us",
    href: "mailto:hello@forgeai.app",
    highlight: false,
    features: {
      "Projects": "Unlimited",
      "AI sections": "All 8 sections",
      "AI provider": "Gemini AI",
      "Regeneration": "✓",
      "Export to Markdown": "✓",
      "Build Mode": "✓",
      "Priority generation": "✓",
      "Email support": "Priority",
      "Team members": "Up to 5",
    },
  },
];

const FAQS = [
  { q: "What counts as a project?", a: "Each product idea you create is one project. A project includes all 8 AI-generated sections — overview, personas, scope, flows, wireframes, stack, launch plan, and build mode." },
  { q: "Can I upgrade or downgrade later?", a: "Yes, you can upgrade, downgrade, or cancel at any time. Downgrading keeps your existing projects intact; you just cannot create new ones beyond the free limit." },
  { q: "What AI model is used?", a: "FORGE AI uses Google's Gemini 2.5 Flash for all generation. This gives you fast, high-quality output without requiring you to have your own API keys." },
  { q: "Is there a free trial for Pro?", a: "The Free plan gives you 3 full projects with no time limit — that's essentially a free trial. No credit card is required to start." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards via Stripe. Annual billing (2 months free) is available on request — email hello@forgeai.app." },
  { q: "Can I export my data?", a: "Yes. Every section can be exported as Markdown. Your data is always yours and we will not delete it even if you downgrade." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
  };
}

export default function PricingPage() {
  return (
    <div style={{ background: "white", color: "#0f1117", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif" }}>
      <MarketingNav />

      {/* Header */}
      <section style={{ padding: "120px 24px 80px", textAlign: "center", background: "linear-gradient(160deg, #0f1117 0%, #1e1b4b 100%)" }}>
        <motion.div {...fadeUp()}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, marginBottom: 20 }}>
            <Zap size={12} color="#818cf8" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#a5b4fc" }}>Simple pricing</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "white", letterSpacing: "-0.045em", marginBottom: 16 }}>
            Transparent pricing.<br />No surprises.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 460, margin: "0 auto" }}>
            Start free and upgrade when you&apos;re ready to build more.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name} {...fadeUp(i * 0.1)} style={{
              background: plan.highlight ? "linear-gradient(160deg, #1e1b4b, #1e3a8a)" : "white",
              border: plan.highlight ? "none" : "1px solid #e5e7eb",
              borderRadius: 24, padding: "36px 32px", position: "relative",
              boxShadow: plan.highlight ? "0 20px 60px rgba(37,99,235,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              {(plan as any).badge && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 100, fontSize: 11.5, fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>
                  {(plan as any).badge}
                </div>
              )}

              <p style={{ fontSize: 12, fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.45)" : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{plan.name}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.05em", color: plan.highlight ? "white" : "#0f1117" }}>{plan.price}</span>
                {plan.period !== "forever" && <span style={{ fontSize: 15, color: plan.highlight ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>/ {plan.period}</span>}
              </div>
              {plan.period === "forever" && <p style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.4)" : "#9ca3af", marginBottom: 4 }}>free forever</p>}
              <p style={{ fontSize: 14, color: plan.highlight ? "rgba(255,255,255,0.55)" : "#6b7280", marginBottom: 28, lineHeight: 1.5 }}>{plan.desc}</p>

              <Link href={plan.href} style={{
                display: "block", textAlign: "center", padding: "12px 0", borderRadius: 10,
                fontSize: 14.5, fontWeight: 700, textDecoration: "none", marginBottom: 28,
                background: plan.highlight ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "#f8fafc",
                color: plan.highlight ? "white" : "#0f1117",
                border: plan.highlight ? "none" : "1.5px solid #e5e7eb",
                boxShadow: plan.highlight ? "0 4px 20px rgba(59,130,246,0.4)" : "none",
              }}>{plan.cta}</Link>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(plan.features).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: `1px solid ${plan.highlight ? "rgba(255,255,255,0.08)" : "#f3f4f6"}` }}>
                    <span style={{ fontSize: 13.5, color: plan.highlight ? "rgba(255,255,255,0.55)" : "#6b7280" }}>{key}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: val === "—" ? (plan.highlight ? "rgba(255,255,255,0.2)" : "#d1d5db") : (plan.highlight ? "rgba(255,255,255,0.9)" : "#0f1117") }}>
                      {val === "✓" ? <CheckCircle2 size={15} color={plan.highlight ? "#60a5fa" : "#059669"} /> : val === "—" ? <X size={13} color={plan.highlight ? "rgba(255,255,255,0.2)" : "#d1d5db"} /> : val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px", background: "#f8fafc", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.div {...fadeUp()} style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117" }}>Frequently asked questions</h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FAQS.map((faq, i) => (
              <motion.div key={faq.q} {...fadeUp(i * 0.06)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 14, padding: "22px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f1117", marginBottom: 8, letterSpacing: "-0.01em" }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <motion.div {...fadeUp()}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0f1117", marginBottom: 12 }}>Still have questions?</h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>Email us at <a href="mailto:hello@forgeai.app" style={{ color: "#2563eb", textDecoration: "none" }}>hello@forgeai.app</a> and we&apos;ll get back to you within 24 hours.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/projects/new" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700,
              textDecoration: "none", color: "white",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            }}>
              <Sparkles size={15} /> Start free now
            </Link>
            <a href="mailto:hello@forgeai.app" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600,
              textDecoration: "none", color: "#374151", border: "1.5px solid #e5e7eb",
            }}>
              Contact sales <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  );
}
