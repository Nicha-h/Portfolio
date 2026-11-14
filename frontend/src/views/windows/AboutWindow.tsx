import { profile } from "@/models/profile";
import Window from "../components/Window";
import PixelIcon from "../components/PixelIcon";
import { Badge, WindowHeading } from "../components/ui";

export default function AboutWindow() {
  return (
    <Window id="about" taskTitle="about.txt" barLabel="about.txt" closeLabel="close about">
      <WindowHeading className="text-[30px] leading-[1.05] mb-1">
        hi, i&apos;m {profile.shortName} <PixelIcon name="smile" size={32} className="align-[-5px]" />
      </WindowHeading>
      <p className="font-bold text-[14px] text-soft mb-[10px]">
        {profile.name} · CS student · backend &amp; full-stack
      </p>
      <p>
        Computer Science student at <b>{profile.universityShort}</b> (graduating May 2028), building web features end to
        end — from Prisma &amp; PostgreSQL schemas to REST APIs and responsive React interfaces.
      </p>
      <p>I deploy with Docker and Git, test APIs with Postman and run CI on GitHub Actions.</p>
      <Badge icon="star">looking for a backend / full-stack internship</Badge>
      <button
        type="button"
        data-open="resume"
        className="inline-block mt-0.5 mb-1.5 ml-2 font-pixel text-[13px] text-ink bg-white border-2 border-edge rounded-[6px] px-2.5 py-0.5 cursor-pointer shadow-2 hover:bg-cream"
      >
        <PixelIcon name="document" className="mr-1 align-[-3px]" />open my full resume
      </button>
      <p>
        <b>Now:</b> Programming Mentor for Java at {profile.universityShort} (Aug 2026 –), teaching first-years OOP and
        UML and writing practice quizzes before exams.
      </p>
      <p className="text-soft text-[13px]">
        B.Sc. Computer Science · {profile.university} · {profile.city}
      </p>
    </Window>
  );
}
