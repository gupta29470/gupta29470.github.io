import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gupta29470.github.io"),
  title: {
    default: "Aakash Gupta — Applied AI Engineer",
    template: "%s | Aakash Gupta",
  },
  description:
    "Applied AI engineer building agents, retrieval and real-time voice systems. Four years of production engineering behind the models, including consumer apps at 1.4M monthly active users.",
  keywords: [
    "applied AI engineer",
    "AI engineer",
    "real-time voice AI",
    "retrieval augmented generation",
    "LoRA fine-tuning",
    "function calling",
    "LLM latency",
    "Python",
    "FastAPI",
    "Flutter",
    "SwiftUI",
  ],
  authors: [{ name: "Aakash Gupta" }],
  creator: "Aakash Gupta",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "https://gupta29470.github.io",
    siteName: "Aakash Gupta",
    title: "Aakash Gupta — Applied AI Engineer",
    description:
      "Agents, retrieval and real-time voice systems, with the production instinct of four years shipping consumer software at scale.",
  },
  twitter: {
    card: "summary",
    title: "Aakash Gupta — Applied AI Engineer",
    description:
      "Agents, retrieval and real-time voice systems, with the production instinct of four years shipping consumer software at scale.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aakash Gupta",
  jobTitle: "Applied AI Engineer",
  email: "mailto:aa.1998.gupta@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: [
    "https://github.com/gupta29470",
    "https://www.linkedin.com/in/aakash98gupta/",
  ],
  knowsAbout: [
    "Applied AI",
    "Retrieval Augmented Generation",
    "Real-time voice agents",
    "Parameter-efficient fine-tuning",
    "Mobile engineering",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body className="grain min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
