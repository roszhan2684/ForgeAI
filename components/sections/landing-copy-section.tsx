"use client";

import { LandingCopyContent } from "@/types/project";
import { Type, Zap, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  content: LandingCopyContent;
}

export function LandingCopySection({ content }: Props) {
  if (!content) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Hero copy preview */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          borderRadius: 20,
          padding: "36px 40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}
        >
          Hero Section Preview
        </div>
        <h2
          style={{
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {content.headline}
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 28, maxWidth: 520 }}>
          {content.subheadline}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <span
            style={{
              padding: "10px 22px",
              background: "white",
              color: "#0f172a",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {content.primaryCTA} →
          </span>
          <span
            style={{
              padding: "10px 22px",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {content.secondaryCTA}
          </span>
        </div>
      </div>

      {/* Problem + Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="forge-card" style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            Problem Section
          </div>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{content.problemSection}</p>
        </div>
        <div className="forge-card" style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            Solution Section
          </div>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{content.solutionSection}</p>
        </div>
      </div>

      {/* Features */}
      <div className="forge-card" style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <Zap size={15} color="var(--forge-blue)" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)" }}>Feature Copy</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {content.features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "#f9fafb",
                border: "1px solid var(--forge-border)",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                <CheckCircle2 size={13} color="var(--forge-blue)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)" }}>{feature.title}</span>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="forge-card" style={{ padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <HelpCircle size={15} color="#7c3aed" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--forge-text)" }}>FAQ Copy</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {content.faq.map((item) => (
            <div key={item.question} style={{ borderBottom: "1px solid var(--forge-border)", paddingBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--forge-text)", marginBottom: 7 }}>
                {item.question}
              </div>
              <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div
        className="forge-card"
        style={{
          padding: "20px 24px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--forge-blue)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Final CTA
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#1e40af" }}>{content.finalCTA}</p>
        </div>
        <ArrowRight size={20} color="var(--forge-blue)" />
      </div>
    </div>
  );
}
