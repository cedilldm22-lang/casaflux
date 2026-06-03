import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CasaFlux — AI Home Inspection Intelligence",
  description: "Upload any home inspection PDF. CasaFlux reads every finding, estimates repair costs, flags safety hazards, and delivers a clean report to your inbox in under 60 seconds.",
  keywords: "home inspection, AI, real estate, inspection report, repair costs, realtors",
  openGraph: {
    title: "CasaFlux — AI Home Inspection Intelligence",
    description: "Turn any inspection PDF into a clean, actionable report in 60 seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
