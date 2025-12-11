import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrolling } from "@/components/providers/smooth-scrolling";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danieloriazowan.com"),
  title: {
    default: "Daniel Oriazowan | Senior Frontend Engineer & Solutions Architect",
    template: "%s | Daniel Oriazowan",
  },
  description:
    "Award-winning Senior Frontend Engineer with 15+ years of experience architecting high-performance React, Next.js, and TypeScript applications. Specializing in scalable frontend architecture, performance optimization, and modern UI/UX development.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Expert",
    "TypeScript",
    "Frontend Architecture",
    "UI/UX Development",
    "Performance Optimization",
  ],
  authors: [{ name: "Daniel Oriazowan", url: "https://danieloriazowan.com" }],
  creator: "Daniel Oriazowan",
  publisher: "Daniel Oriazowan",
  icons: {
    icon: '/favicon-logo.png',
    shortcut: '/favicon-logo.png',
    apple: '/favicon-logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danieloriazowan.com",
    title: "Daniel Oriazowan | Senior Frontend Engineer",
    description: "Building decade-defining digital experiences.",
    siteName: "Daniel Oriazowan Portfolio",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Oriazowan | Senior Frontend Engineer",
    description: "15+ years architecting high-performance frontend applications.",
    images: ["/og-image.jpg"],
    creator: "@danieloriazowan",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daniel Oriazowan",
    jobTitle: "Senior Frontend Engineer",
    url: "https://danieloriazowan.com",
    sameAs: [
      "https://linkedin.com/in/daniel-oriazowan",
      "https://github.com/danieloriazowan",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
      >
        <div className="fixed-bg" />
        <div className="noise-overlay" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingProvider>
            <SmoothScrolling>
              {children}
              <Analytics />
              <SpeedInsights />
            </SmoothScrolling>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
