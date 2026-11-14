export type WindowTheme = "default" | "alt" | "mint";

/** Pixel icon shown at the start of a project badge */
export type BadgeIcon = "medalBronze" | "medalSilver" | "star" | "dot";

export interface PortfolioProject {
  /** Window element id, also used by data-open */
  id: string;
  /** Label for the taskbar button */
  taskTitle: string;
  /** Text in the window's title bar */
  barLabel: string;
  closeLabel: string;
  theme: WindowTheme;
  heading: string;
  meta: string;
  badge: { icon: BadgeIcon; text: string; link?: { href: string; label: string } };
  bullets: string[];
  chips: string[];
  /** Tile in the projects/ folder window */
  folder: { name: string; lines: [string, string] };
  /** Row in the phone home screen's "recent projects" widget */
  recent: { name: string; summary: string };
}

export const projects: PortfolioProject[] = [
  {
    id: "p-clickdee",
    taskTitle: "clickdee",
    barLabel: "clickdee.app",
    closeLabel: "close clickdee",
    theme: "default",
    heading: "Clickdee — AI marketing platform",
    meta: "Full-Stack Developer · SIT Innoventure 2026 · May–Aug 2026 · team of 5",
    badge: { icon: "medalBronze", text: "3rd of 14 teams" },
    bullets: [
      "Full-stack AI marketing MVP for SMEs in ~3 months: AI campaign creation, click-through analytics dashboards, AI business-advice chat.",
      "Backend services and REST endpoints with Hono, Prisma and PostgreSQL, plus the React + Tailwind dashboard and onboarding (designed in Figma).",
      "Gemini and Groq generate campaign copy tailored to tone, region and weather; containerised with Docker.",
    ],
    chips: ["Hono", "Prisma", "PostgreSQL", "React", "Tailwind", "Docker"],
    folder: { name: "Clickdee", lines: ["AI marketing · 3rd/14", "Hono · Prisma · React"] },
    recent: { name: "Clickdee", summary: "AI marketing · Hono, Prisma, React · 3rd/14" },
  },
  {
    id: "p-nfc",
    taskTitle: "nfc",
    barLabel: "nfc-attendance.app",
    closeLabel: "close nfc attendance",
    theme: "mint",
    heading: "NFC Attendance Tracking",
    meta: "Database & Frontend Developer · KMUTT IoT Hackathon · Jan 2026 · team of 3",
    badge: { icon: "medalSilver", text: "2nd of ~10 teams" },
    bullets: [
      "NFC attendance for high-traffic events, delivered in a 3-day hackathon sprint.",
      "Express REST backend; Prisma schema on Neon PostgreSQL for user credentials and NFC card profiles.",
      "Secure authentication flows and responsive React interfaces.",
    ],
    chips: ["Express", "Prisma", "Neon", "React"],
    folder: { name: "NFC Attend", lines: ["Hackathon · 2nd/~10", "Express · Prisma · Neon"] },
    recent: { name: "NFC Attendance", summary: "Express, Prisma, Neon · 2nd/~10" },
  },
  {
    id: "p-smart",
    taskTitle: "smart city",
    barLabel: "smart-city-hub.app",
    closeLabel: "close smart city hub",
    theme: "alt",
    heading: "Smart City Hub — Apartment Listings",
    meta: "Team Lead, Full-Stack · KMUTT Integrated Project · Aug–Dec 2025",
    badge: { icon: "star", text: "Team lead in a 50+ dev project" },
    bullets: [
      "Led a 3-person team: listings, real-time availability, 5-star reviews, amenities map.",
      "Geospatial and price-range filters; booking payments via another team's internal payment APIs.",
      "WebSockets for instant availability; database transactions to prevent double-booking.",
    ],
    chips: ["WebSockets", "Transactions", "Geospatial", "REST"],
    folder: { name: "Smart City", lines: ["Team lead · 50+ devs", "WebSockets · transactions"] },
    recent: { name: "Smart City Hub", summary: "Team lead · WebSockets, transactions" },
  },
  {
    id: "p-tick",
    taskTitle: "ticktask",
    barLabel: "ticktask.app",
    closeLabel: "close ticktask",
    theme: "default",
    heading: "TickTask — Pomodoro productivity",
    meta: "Backend & Database Developer · Personal project · Mar 2025–Apr 2026 · team of 3",
    badge: {
      icon: "dot",
      text: "live at ",
      link: { href: "https://ticktask.space", label: "ticktask.space" },
    },
    bullets: [
      "Backend and database for a customisable Pomodoro app with React and Hono; Cloudinary for images.",
      "Docker on NorthFlank, Cloudflare for CDN/SSL, API documented with Swagger.",
    ],
    chips: ["Hono", "React", "Docker", "NorthFlank", "Cloudflare"],
    folder: { name: "TickTask", lines: ["Live · ticktask.space", "Hono · Docker · Cloudflare"] },
    recent: { name: "TickTask", summary: "Hono, Docker, Cloudflare · live" },
  },
];
