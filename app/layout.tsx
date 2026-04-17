import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORGE AI — Turn ideas into buildable products",
  description:
    "FORGE AI helps founders and builders transform rough product ideas into structured plans, wireframes, launch strategies, and build-ready handoffs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
