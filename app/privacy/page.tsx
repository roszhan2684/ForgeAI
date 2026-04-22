import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export const metadata = {
  title: "Privacy Policy — FORGE AI",
  description: "How FORGE AI collects, uses, and protects your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f1117", letterSpacing: "-0.02em", marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ background: "white", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif" }}>
      <MarketingNav />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "120px 24px 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 8 }}>Last updated: April 21, 2026</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#0f1117", letterSpacing: "-0.045em", lineHeight: 1.1, marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7 }}>
            FORGE AI ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and services at forgeai.app.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 40 }}>
          <Section title="1. Information We Collect">
            <p style={{ marginBottom: 12 }}><strong>Information you provide:</strong> When you create an account or use our service, we may collect your email address, project names, and product ideas you enter into FORGE AI.</p>
            <p style={{ marginBottom: 12 }}><strong>Usage data:</strong> We automatically collect information about how you interact with our service, including pages visited, features used, and generation requests made.</p>
            <p><strong>Device data:</strong> We may collect basic technical information such as browser type, operating system, and IP address for security and performance purposes.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>To provide, maintain, and improve the FORGE AI service</li>
              <li>To generate AI-powered product plans based on your inputs</li>
              <li>To communicate with you about your account, updates, and support</li>
              <li>To detect and prevent fraudulent or abusive use</li>
              <li>To analyze usage patterns and improve the product experience</li>
            </ul>
          </Section>

          <Section title="3. AI Generation and Your Data">
            <p style={{ marginBottom: 12 }}>
              When you submit a product idea, that input is sent to Google's Gemini API to generate your plan. Please review{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Google's Privacy Policy</a>{" "}
              to understand how Google handles data sent to its API.
            </p>
            <p>We do not sell your product ideas or generated content to third parties. Your project data is stored securely in our database and is only accessible to you.</p>
          </Section>

          <Section title="4. Data Storage and Security">
            <p style={{ marginBottom: 12 }}>
              Your data is stored on servers hosted by Neon (PostgreSQL) and Vercel. We implement reasonable technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
            <p>While we take security seriously, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and to not share sensitive or confidential business information in your product ideas.</p>
          </Section>

          <Section title="5. Cookies and Local Storage">
            <p style={{ marginBottom: 12 }}>We use browser local storage to persist your project data across sessions on the same device. This is essential for the app to function properly.</p>
            <p>We may use cookies for authentication and session management. You can disable cookies in your browser settings, but this may affect the functionality of the service.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your account information and project data for as long as your account is active or as needed to provide you with the service. You may request deletion of your data at any time by contacting us at <a href="mailto:hello@forgeai.app" style={{ color: "#2563eb" }}>hello@forgeai.app</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="7. Third-Party Services">
            <p>We use the following third-party services to operate FORGE AI:</p>
            <ul style={{ paddingLeft: 20, marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><strong>Vercel</strong> — hosting and deployment</li>
              <li><strong>Neon</strong> — database storage</li>
              <li><strong>Google Gemini API</strong> — AI content generation</li>
              <li><strong>Stripe</strong> — payment processing (if applicable)</li>
            </ul>
          </Section>

          <Section title="8. Children's Privacy">
            <p>FORGE AI is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the service after changes constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              If you have questions about this Privacy Policy or how your data is handled, please contact us at:{" "}
              <a href="mailto:hello@forgeai.app" style={{ color: "#2563eb" }}>hello@forgeai.app</a>
            </p>
          </Section>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
          <Link href="/" style={{ fontSize: 14, color: "#2563eb", textDecoration: "none" }}>← Back to FORGE AI</Link>
        </div>
      </div>

      <MarketingFooter />
    </div>
  );
}
