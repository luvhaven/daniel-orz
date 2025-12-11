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
    "Award-winning Senior Frontend Engineer with 15+ years of experience architecting high-performance React, Next.js, and TypeScript applications. Specializing in scalable frontend architecture, performance optimization, and modern UI/UX development. Available for senior engineering roles at top-tier companies.",
  keywords: [
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Expert",
    "TypeScript",
    "JavaScript",
    "Frontend Architecture",
    "UI/UX Development",
    "Performance Optimization",
    "Web Development",
    "Software Engineer",
    "Tech Lead",
    "Full Stack Developer",
    "Nigeria",
    "Lagos",
    "Remote Work",
  ],
  authors: [{ name: "Daniel Oriazowan", url: "https://danieloriazowan.com" }],
  creator: "Daniel Oriazowan",
  publisher: "Daniel Oriazowan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danieloriazowan.com",
    title: "Daniel Oriazowan | Senior Frontend Engineer & Solutions Architect",
    description:
      "Award-winning Senior Frontend Engineer with 15+ years building high-performance web applications. Expert in React, Next.js, TypeScript, and modern frontend architecture.",
    siteName: "Daniel Oriazowan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Oriazowan - Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Oriazowan | Senior Frontend Engineer",
    description:
      "15+ years architecting high-performance frontend applications. React, Next.js & TypeScript expert.",
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
  alternates: {
    canonical: "https://danieloriazowan.com",
  },
  category: "technology",
  classification: "Portfolio",
  verification: {
    google: "google-site-verification-code",
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
    description:
      "Senior Frontend Engineer with 15+ years of experience in building high-performance web applications",
    image: "/daniel-oriazowan.jpg",
    email: "doriazowan@gmail.com",
    telephone: "+234-802-638-1777",
    url: "https://danieloriazowan.com",
    sameAs: [
      "https://linkedin.com/in/daniel-oriazowan",
      "https://github.com/danieloriazowan",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "Nigeria",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Computer Science Graduate",
    },
    worksFor: {
      "@type": "Organization",
      name: "Big Web Digital",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Frontend Architecture",
      "Performance Optimization",
      "UI/UX Development",
      "Web Development",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
          enableSystem
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
