import type { Metadata, Viewport } from "next";
import { DM_Sans, Pixelify_Sans } from "next/font/google";
import { profile, siteUrl } from "@/models/profile";
import "./globals.css";

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.title,
  description: profile.description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    "backend developer",
    "full-stack developer",
    "software engineering internship",
    "KMUTT",
    "Computer Science",
    "Bangkok",
    "Node.js",
    "Hono",
    "Express",
    "Prisma",
    "PostgreSQL",
    "React",
    "Docker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: profile.title,
    description: profile.ogDescription,
    locale: "en_US",
    firstName: "Nicha",
    lastName: "Hongsrimuang",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.title,
    description: profile.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: profile.themeColor,
};

// Without JavaScript the desktop can't open windows, so show every window as a readable page instead
const noScriptCss = `
  body { overflow: auto; height: auto; }
  .desktop { position: static; padding: 16px; display: grid; gap: 18px; max-width: 720px; margin: 0 auto 70px; }
  .icons, .widget, .titlebar .btns, .tasks, .dock, .statusbar { display: none !important; }
  #skill-list { display: flex !important; height: auto !important; content-visibility: visible !important; }
  #skill-logos, .view-toggle { display: none !important; }
  .win { display: flex !important; position: static !important; width: auto !important; max-width: none !important; max-height: none !important; }
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pixelify.variable} ${dmSans.variable}`}>
      <head>
        <noscript dangerouslySetInnerHTML={{ __html: `<style>${noScriptCss}</style>` }} />
      </head>
      {/* browser extensions (e.g. Grammarly) add attributes to body before React hydrates */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
