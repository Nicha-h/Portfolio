// Public base URL of the deployed site, used for canonical URLs, Open Graph and the sitemap.
// Read at build time, so set SITE_URL when building (see the root Dockerfile).
export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const profile = {
  name: "Nicha Hongsrimuang",
  shortName: "Nicha",
  role: "Backend / Full-Stack Developer",
  title: "Nicha Hongsrimuang — Backend / Full-Stack Developer",
  description:
    "Nicha Hongsrimuang — Computer Science student at KMUTT building backend and full-stack web apps. Open to backend / full-stack internships.",
  ogDescription:
    "CS student at KMUTT. Hono, Express, Prisma, PostgreSQL, React, Docker. Open to internships.",
  email: "nichahongsri@gmail.com",
  github: { url: "https://github.com/Nicha-h", label: "github.com/Nicha-h" },
  linkedin: { url: "https://linkedin.com/in/nicha-h", label: "linkedin.com/in/nicha-h" },
  university: "King Mongkut's University of Technology Thonburi",
  universityShort: "KMUTT",
  city: "Bangkok",
  country: "Thailand",
  resumePdf: "/CV_Nicha.pdf",
  themeColor: "#c9c2ff",
} as const;
