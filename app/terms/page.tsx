import Link from "next/link";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { MarketingFooter } from "@/components/layout/marketing-footer";

export const metadata = {
  title: "Terms of Service — FORGE AI",
  description: "The terms governing your use of FORGE AI.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f1117", letterSpacing: "-0.02em", marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div style={{ background: "white", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif" }}>
      <MarketingNav />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "120px 24px 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 8 }}>Last updated: April 21, 2026</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#0f1117", letterSpacing: "-0.045em", lineHeight: 1.1, marginBottom: 16 }}>Terms of Service</h1>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7 }}>
            Please read these Terms of Service carefully before using FORGE AI. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 40 }}>
          <Section title="1. Acceptance of Terms">
            <p>By creating an account or using the FORGE AI service ("Service") at forgeai.app, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the Service. These terms apply to all users, including visitors, registered users, and paying subscribers.</p>
          </Section>

          <Section title="2. Description of Service">
            <p style={{ marginBottom: 12 }}>FORGE AI is an AI-powered product planning tool that generates structured product specifications, user personas, feature scopes, user flows, wireframes, tech stack recommendations, launch plans, and implementation guides from user-provided product ideas.</p>
            <p>The Service uses Google's Gemini AI to generate content. AI-generated content is provided for informational and planning purposes only and does not constitute professional business, legal, financial, or technical advice.</p>
          </Section>

          <Section title="3. Your Account">
            <p style={{ marginBottom: 12 }}>You are responsible for maintaining the security of your account and all activity that occurs under it. You must not share your credentials or use the Service on behalf of others without authorization.</p>
            <p>You must provide accurate information when creating your account. We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.</p>
          </Section>

          <Section title="4. Acceptable Use">
            <p style={{ marginBottom: 12 }}>You agree not to use FORGE AI to:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Generate content that is illegal, harmful, threatening, abusive, or discriminatory</li>
              <li>Violate any applicable law or regulation</li>
              <li>Attempt to reverse-engineer, scrape, or extract data from the Service at scale</li>
              <li>Use automated systems (bots) to access the Service beyond normal usage</li>
              <li>Resell or sublicense access to the Service without our written permission</li>
              <li>Upload or submit any malware, viruses, or harmful code</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p style={{ marginBottom: 12 }}><strong>Your content:</strong> The product ideas, descriptions, and inputs you provide remain yours. You grant us a limited license to process your inputs to provide the Service.</p>
            <p style={{ marginBottom: 12 }}><strong>Generated content:</strong> AI-generated output (plans, personas, etc.) is yours to use for any lawful purpose, including commercial use. We do not claim ownership of output generated for you.</p>
            <p><strong>Our platform:</strong> The FORGE AI platform, branding, code, and design are owned by FORGE AI and protected by intellectual property law. You may not copy, modify, or distribute our platform without written permission.</p>
          </Section>

          <Section title="6. Payments and Subscriptions">
            <p style={{ marginBottom: 12 }}>Paid plans are billed monthly or annually as selected. All fees are non-refundable except as required by law or as stated in our refund policy.</p>
            <p style={{ marginBottom: 12 }}>We reserve the right to change our pricing with 30 days' notice. Continued use after a price change constitutes acceptance of the new pricing.</p>
            <p>Payments are processed by Stripe. By providing payment information, you authorize us to charge your payment method for the applicable fees.</p>
          </Section>

          <Section title="7. Cancellation and Termination">
            <p style={{ marginBottom: 12 }}>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until the period ends.</p>
            <p>We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or for any other reason at our sole discretion with or without notice.</p>
          </Section>

          <Section title="8. Disclaimers">
            <p style={{ marginBottom: 12 }}>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT AI-GENERATED CONTENT WILL BE ACCURATE OR COMPLETE.</p>
            <p>AI-generated content may contain errors, inaccuracies, or outdated information. Always review AI output critically and consult qualified professionals for business, legal, or technical decisions.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, FORGE AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>We may update these Terms at any time. We will provide notice of material changes by email or via a notice in the Service. Your continued use after the effective date of changes constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction, as determined by FORGE AI.</p>
          </Section>

          <Section title="12. Contact">
            <p>
              For questions about these Terms, contact us at:{" "}
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
