import type { Metadata } from "next";
import { StoreHydration } from "@/components/store-hydration";
import "./globals.css";

const SITE_URL = "https://forge-ai-nine-zeta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FORGE AI — Turn ideas into build-ready products",
    template: "%s — FORGE AI",
  },
  description:
    "FORGE AI transforms rough product ideas into complete, structured plans — personas, wireframes, tech stack, launch strategy, and Build Mode artifacts. Powered by Gemini AI.",
  keywords: [
    "product planning", "AI product spec", "startup planning tool",
    "MVP generator", "product manager AI", "build plan", "SaaS planning",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FORGE AI",
    title: "FORGE AI — Turn ideas into build-ready products",
    description: "Generate a complete product plan from one sentence. Powered by Gemini AI.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FORGE AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORGE AI — Turn ideas into build-ready products",
    description: "Generate a complete product plan from one sentence. Powered by Gemini AI.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <StoreHydration />
        {children}
      </body>
    </html>
  );
}
