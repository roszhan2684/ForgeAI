"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={15} color="white" />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: scrolled ? "#0f1117" : "white", letterSpacing: "-0.03em" }}>
            FORGE <span style={{ color: scrolled ? "#2563eb" : "rgba(255,255,255,0.7)" }}>AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {[
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Pricing", href: "/pricing" },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 14, fontWeight: 500, textDecoration: "none",
              color: scrolled ? "#374151" : "rgba(255,255,255,0.85)",
              transition: "color 0.15s",
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="nav-desktop">
          <Link href="/dashboard" style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 600,
            textDecoration: "none",
            color: scrolled ? "#374151" : "rgba(255,255,255,0.9)",
            border: scrolled ? "1.5px solid #e5e7eb" : "1.5px solid rgba(255,255,255,0.3)",
            background: "transparent",
            transition: "all 0.15s",
          }}>
            Sign in
          </Link>
          <Link href="/projects/new" style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 700,
            textDecoration: "none", color: "white",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
            transition: "opacity 0.15s",
          }}>
            Start free →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="nav-mobile-btn"
        >
          {menuOpen ? <X size={22} color={scrolled ? "#0f1117" : "white"} /> : <Menu size={22} color={scrolled ? "#0f1117" : "white"} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "white", borderTop: "1px solid #e5e7eb",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16,
        }}>
          {[
            { label: "Features", href: "/#features" },
            { label: "How it works", href: "/#how-it-works" },
            { label: "Pricing", href: "/pricing" },
            { label: "Sign in", href: "/dashboard" },
          ].map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: 15, fontWeight: 500, color: "#374151", textDecoration: "none",
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/projects/new" onClick={() => setMenuOpen(false)} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700,
            textDecoration: "none", color: "white",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          }}>
            Start free →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
