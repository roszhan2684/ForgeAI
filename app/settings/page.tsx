"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, User, Bell, Shield, CreditCard, Download, Trash2, ChevronRight, CheckCircle2, ExternalLink } from "lucide-react";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "privacy", label: "Privacy & Data", icon: Shield },
] as const;

type TabId = typeof TABS[number]["id"];

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", border: "1px solid var(--forge-border)", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--forge-text)", marginBottom: 4 }}>{title}</h3>
        {desc && <p style={{ fontSize: 13, color: "var(--forge-text-muted)" }}>{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, placeholder, type = "text", value }: { label: string; placeholder: string; type?: string; value?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--forge-text-secondary)", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 14,
          border: "1.5px solid var(--forge-border)", background: "var(--forge-surface)",
          color: "var(--forge-text)", outline: "none", boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

function Toggle({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--forge-border)" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--forge-text)", marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 12.5, color: "var(--forge-text-muted)" }}>{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        style={{
          width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
          background: on ? "var(--forge-blue)" : "#d1d5db",
          transition: "background 0.2s", position: "relative", flexShrink: 0,
        }}
      >
        <div style={{
          width: 18, height: 18, borderRadius: "50%", background: "white",
          position: "absolute", top: 3, left: on ? 23 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("account");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--forge-surface)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "white", borderBottom: "1px solid var(--forge-border)", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={12} color="white" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--forge-text)", letterSpacing: "-0.02em" }}>FORGE AI</span>
          </Link>
          <span style={{ color: "var(--forge-border)", fontSize: 16 }}>/</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--forge-text-muted)" }}>Settings</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: 13, color: "var(--forge-text-muted)", textDecoration: "none" }}>← Back to Dashboard</Link>
      </div>

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--forge-text)", letterSpacing: "-0.03em", marginBottom: 4 }}>Settings</h1>
          <p style={{ fontSize: 14, color: "var(--forge-text-muted)" }}>Manage your account, preferences, and billing.</p>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {/* Sidebar tabs */}
          <div style={{ width: 188, flexShrink: 0 }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 9,
                    padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                    background: active ? "var(--forge-blue-light)" : "transparent",
                    color: active ? "var(--forge-blue)" : "var(--forge-text-muted)",
                    fontFamily: "inherit", fontSize: 13.5, fontWeight: active ? 700 : 500,
                    marginBottom: 2, textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeTab === "account" && (
              <>
                <SectionCard title="Profile" desc="Your public-facing name and contact information.">
                  <Field label="Display name" placeholder="Your name" value="" />
                  <Field label="Email address" placeholder="you@example.com" type="email" value="" />
                  <button onClick={handleSave} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: saved ? "#059669" : "var(--forge-blue)", color: "white",
                    fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", transition: "background 0.2s",
                  }}>
                    {saved ? <><CheckCircle2 size={14} /> Saved!</> : "Save changes"}
                  </button>
                </SectionCard>

                <SectionCard title="Password" desc="Update your password to keep your account secure.">
                  <Field label="Current password" placeholder="••••••••" type="password" />
                  <Field label="New password" placeholder="••••••••" type="password" />
                  <Field label="Confirm new password" placeholder="••••••••" type="password" />
                  <button style={{ padding: "8px 18px", borderRadius: 8, border: "1.5px solid var(--forge-border)", background: "white", cursor: "pointer", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit", color: "var(--forge-text)" }}>
                    Update password
                  </button>
                </SectionCard>

                <SectionCard title="Danger Zone" desc="Irreversible actions. Proceed with caution.">
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "8px 18px", borderRadius: 8, border: "1.5px solid #fecaca",
                    background: "#fef2f2", cursor: "pointer", fontSize: 13.5, fontWeight: 600,
                    fontFamily: "inherit", color: "#dc2626",
                  }}>
                    <Trash2 size={14} /> Delete account
                  </button>
                  <p style={{ fontSize: 12, color: "var(--forge-text-muted)", marginTop: 10 }}>
                    This permanently deletes your account and all projects. This action cannot be undone.
                  </p>
                </SectionCard>
              </>
            )}

            {activeTab === "notifications" && (
              <SectionCard title="Email Notifications" desc="Choose what updates you want to receive.">
                <Toggle label="Product updates" desc="New features, improvements, and announcements." defaultOn={true} />
                <Toggle label="Generation complete" desc="Email when a long-running generation finishes." defaultOn={false} />
                <Toggle label="Weekly digest" desc="A summary of your projects and activity each week." defaultOn={false} />
                <Toggle label="Tips & tutorials" desc="Helpful guides to get more out of FORGE AI." defaultOn={true} />
                <div style={{ marginTop: 20 }}>
                  <button onClick={handleSave} style={{
                    padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                    background: saved ? "#059669" : "var(--forge-blue)", color: "white",
                    fontSize: 13.5, fontWeight: 700, fontFamily: "inherit", transition: "background 0.2s",
                  }}>
                    {saved ? "Saved!" : "Save preferences"}
                  </button>
                </div>
              </SectionCard>
            )}

            {activeTab === "billing" && (
              <>
                <SectionCard title="Current Plan" desc="You are on the Free plan.">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "var(--forge-surface)", borderRadius: 12, border: "1px solid var(--forge-border)", marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "var(--forge-text)", marginBottom: 2 }}>Free</p>
                      <p style={{ fontSize: 13, color: "var(--forge-text-muted)" }}>3 projects · All 8 AI sections</p>
                    </div>
                    <Link href="/pricing" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "8px 16px", borderRadius: 8, fontSize: 13.5, fontWeight: 700,
                      textDecoration: "none", color: "white",
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    }}>
                      Upgrade to Pro <ChevronRight size={13} />
                    </Link>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--forge-text-muted)" }}>
                    Upgrade to Pro for unlimited projects and priority generation.{" "}
                    <Link href="/pricing" style={{ color: "var(--forge-blue)", textDecoration: "none" }}>See all plans →</Link>
                  </p>
                </SectionCard>

                <SectionCard title="Billing History" desc="No invoices yet.">
                  <div style={{ padding: "32px 0", textAlign: "center" }}>
                    <CreditCard size={28} color="var(--forge-text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
                    <p style={{ fontSize: 14, color: "var(--forge-text-muted)" }}>No billing history yet. Upgrade to Pro to start.</p>
                  </div>
                </SectionCard>
              </>
            )}

            {activeTab === "privacy" && (
              <>
                <SectionCard title="Your Data" desc="Manage how your data is stored and used.">
                  <Toggle label="Analytics" desc="Help improve FORGE AI by sharing anonymous usage data." defaultOn={true} />
                  <Toggle label="AI training opt-out" desc="Exclude your project data from AI model training." defaultOn={false} />
                  <div style={{ paddingTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--forge-border)",
                      background: "white", cursor: "pointer", fontSize: 13, fontWeight: 600,
                      fontFamily: "inherit", color: "var(--forge-text)",
                    }}>
                      <Download size={13} /> Export my data
                    </button>
                  </div>
                </SectionCard>

                <SectionCard title="Legal">
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { label: "Privacy Policy", href: "/privacy" },
                      { label: "Terms of Service", href: "/terms" },
                    ].map(link => (
                      <Link key={link.href} href={link.href} target="_blank" style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "12px 0", borderBottom: "1px solid var(--forge-border)",
                        textDecoration: "none", color: "var(--forge-text)", fontSize: 14,
                      }}>
                        {link.label}
                        <ExternalLink size={13} color="var(--forge-text-muted)" />
                      </Link>
                    ))}
                  </div>
                </SectionCard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
