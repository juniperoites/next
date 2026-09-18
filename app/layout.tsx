import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { SITE_CONFIG, generateLocalBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: "Al-Safwa Technical Services & Facility Management UAE | 24/7 Rapid Dispatch",
    template: "%s | Al-Safwa UAE",
  },
  description:
    "Premier UAE technical services, DEWA-certified electrical maintenance, 24/7 emergency AC repair, thermal leak detection, luxury villa painting, and Annual Maintenance Contracts across Dubai & Abu Dhabi.",
  keywords: [
    "AC repair Dubai",
    "Emergency plumber Dubai",
    "DEWA approved electrician",
    "Villa maintenance AMC UAE",
    "AC duct cleaning Palm Jumeirah",
    "Italian marble crystallization Dubai",
    "Property maintenance Abu Dhabi",
  ],
  authors: [{ name: "Al-Safwa Technical Services L.L.C." }],
  creator: "Al-Safwa Technical Services",
  publisher: "Al-Safwa Technical Services",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Al-Safwa Technical Services & Facility Management UAE",
    description:
      "24/7 Emergency Technical Services, DEWA Licensed Master Engineers, 30-min Rapid Response in Dubai, Abu Dhabi & Sharjah.",
    url: SITE_CONFIG.domain,
    siteName: "Al-Safwa Technical Services",
    locale: "en_AE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Global JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-gold-500 selection:text-slate-950">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
