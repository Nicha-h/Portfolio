import type { ReactNode } from "react";
import { profile } from "@/models/profile";
import PixelIcon from "../components/PixelIcon";
import Window from "../components/Window";
import { Bullets, WindowHeading } from "../components/ui";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-pixel font-semibold text-[14px] tracking-[.04em] uppercase mt-[18px] mb-2 pb-[3px] border-b-2 border-edge">
      {children}
    </h3>
  );
}

function Entry({ role, org, meta, bullets }: { role: ReactNode; org: ReactNode; meta: string; bullets?: string[] }) {
  return (
    <div className="mb-3">
      <h4 className="text-[15px] font-bold leading-[1.35]">
        {role} <span className="font-medium">· {org}</span>
      </h4>
      <p className="text-soft text-[13px] mt-px">{meta}</p>
      {bullets && <Bullets className="mt-1.5" items={bullets} />}
    </div>
  );
}

const technicalSkills: [string, string][] = [
  ["Languages", "JavaScript (ES6+), TypeScript, Java, SQL · Python (coursework)"],
  ["Frontend", "React, Tailwind CSS"],
  ["Backend & Data", "Node.js, Hono, Express, Prisma, PostgreSQL, SQLite, REST APIs, WebSockets"],
  ["Testing & CI", "Postman, GitHub Actions"],
  ["Tools & Platforms", "Docker, Git, Linux CLI, OpenAPI / Swagger, Cloudflare, NorthFlank, Cloudinary, Figma"],
];

export default function ResumeWindow() {
  return (
    <Window
      id="resume"
      taskTitle="resume"
      barLabel="resume.pdf"
      closeLabel="close resume"
      widthClassName="w-[580px]"
      contentClassName="overscroll-contain"
    >
      <div className="flex justify-between items-start gap-3 pb-2.5 border-b-2 border-dashed border-dash phone:flex-col-reverse">
        <div>
          <WindowHeading className="text-[24px] mb-0.5">{profile.name}</WindowHeading>
          <p className="text-soft text-[13px] [&_a]:text-link [&_a]:font-medium">
            <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
            <a href={profile.linkedin.url} target="_blank" rel="noopener">
              {profile.linkedin.label}
            </a>{" "}
            ·{" "}
            <a href={profile.github.url} target="_blank" rel="noopener">
              {profile.github.label}
            </a>{" "}
            · {profile.city}, {profile.country}
          </p>
        </div>
        <a
          href={profile.resumePdf}
          target="_blank"
          rel="noopener"
          className="flex-none no-underline font-pixel text-[13px] text-ink bg-cream border-2 border-edge rounded-[6px] px-2.5 py-[3px] shadow-2 hover:bg-white"
        >
          <PixelIcon name="download" className="mr-1 align-[-3px]" />PDF
        </a>
      </div>

      <SectionTitle>Professional summary</SectionTitle>
      <p>
        Computer Science student at {profile.universityShort} (graduating May 2028) seeking a backend / full-stack
        software engineering internship. Builds web features end to end, from <b>Prisma</b> and <b>PostgreSQL</b> schema
        design to REST APIs and responsive <b>React</b> interfaces, in <b>JavaScript/TypeScript</b>, <b>Node.js</b>,{" "}
        <b>Hono</b> and <b>Express</b>. Deploys with <b>Docker</b> and Git, using Postman for API testing and GitHub
        Actions for CI.
      </p>

      <SectionTitle>Experience</SectionTitle>
      <Entry
        role="Programming Mentor, Java"
        org="KMUTT: Programming in Java"
        meta="Course Mentorship · August 2026 – Present"
        bullets={[
          "Teach first-year CS students Java, focusing on object-oriented programming and UML.",
          "Set practice quizzes and give feedback where students get stuck, guiding them toward the upcoming exams.",
        ]}
      />

      <SectionTitle>Projects &amp; competitions</SectionTitle>
      <Entry
        role="Full-Stack Developer"
        org="CLICKDEE: AI-Powered Marketing Platform"
        meta="SIT Innoventure 2026 · 3rd of 14 teams · May – August 2026 · Team of 5"
        bullets={[
          "Built a full-stack AI marketing MVP for SMEs over ~3 months, covering AI-assisted campaign creation, click-through analytics dashboards and an AI business-advice chat.",
          "Developed backend services and REST endpoints with Hono, Prisma and PostgreSQL, plus the React and Tailwind CSS dashboard and onboarding flow, designed in Figma.",
          "Integrated Google Gemini and Groq to generate campaign copy tailored to tone, region and weather, and containerised the app with Docker.",
        ]}
      />
      <Entry
        role="Database & Frontend Developer"
        org="NFC-Based Attendance Tracking System"
        meta="KMUTT IoT Hackathon · 2nd of ~10 teams · January 2026 · Team of 3"
        bullets={[
          "Co-built an NFC attendance system for high-traffic events, delivering it in a 3-day hackathon sprint with a REST backend in Express and a Prisma schema on a Neon PostgreSQL database for user credentials and NFC card profiles.",
          "Built secure authentication flows and responsive interfaces with React.",
        ]}
      />
      <Entry
        role="Team Lead, Full-Stack Developer"
        org="Smart City Hub: Apartment Listing Module"
        meta="KMUTT Integrated Project · August – December 2025 · 50+ developers, team of 3"
        bullets={[
          "Led the 3-person apartment-listing team in a 50+ developer smart-city app, building listings, real-time availability, a 5-star review system and an amenities map.",
          "Built geospatial and price-range filters, and integrated booking payments through a separate team's internal payment APIs.",
          "Implemented WebSockets for instant availability updates, using database transactions to keep bookings consistent and prevent double-booking.",
        ]}
      />
      <Entry
        role="Backend & Database Developer"
        org={
          <>
            TickTask: Productivity Web App (
            <a href="https://ticktask.space" target="_blank" rel="noopener">
              ticktask.space
            </a>
            )
          </>
        }
        meta="Personal Project · March 2025 – April 2026 · Team of 3"
        bullets={[
          "Built the backend and database for a full-stack productivity app with a customisable Pomodoro timer, using React and Hono, with Cloudinary for image hosting.",
          "Deployed with Docker and NorthFlank, configured Cloudflare for CDN/SSL, and documented the API with Swagger.",
        ]}
      />

      <SectionTitle>Education</SectionTitle>
      <Entry
        role="Bachelor of Science in Computer Science"
        org={profile.university}
        meta={`August 2024 – May 2028 (Expected) · ${profile.city}, ${profile.country}`}
      />

      <SectionTitle>Technical skills</SectionTitle>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-[14px] phone:grid-cols-1 phone:gap-0">
        {technicalSkills.map(([term, detail]) => (
          <div key={term} className="contents">
            <dt className="font-bold">{term}</dt>
            <dd className="phone:mb-1.5">{detail}</dd>
          </div>
        ))}
      </dl>
    </Window>
  );
}
