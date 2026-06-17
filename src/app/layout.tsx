import type { Metadata } from "next";
import { Outfit, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"]
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://beeceemedicallaboratory.com'),
  title: "BeeCee Medical Laboratory Services - Accurate Diagnostics",
  description: "To support excellence in patient care and safety by providing accurate and timely laboratory information and services to improve the health of individuals and communities.",
  icons: {
    icon: "/beecee-lab-favicon.ico",
    shortcut: "/beecee-lab-favicon.ico",
    apple: "/beecee-lab-favicon.ico",
  },
  openGraph: {
    title: "BeeCee Medical Laboratory Services - Accurate Diagnostics",
    description: "Professional medical screening services delivered directly to your organization or facility for convenience and efficiency.",
    url: "https://beeceemedicallaboratory.com",
    siteName: "BeeCee Medical Laboratory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeeCee Medical Laboratory Services - Accurate Diagnostics",
    description: "Professional medical screening services delivered directly to your organization or facility for convenience and efficiency.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${lato.variable} bg-background text-on-background font-body-md antialiased mesh-gradient-bg min-h-screen`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
