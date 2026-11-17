import Image from "next/image";
import { Fragment } from "react";
import { projects, type PortfolioProject } from "@/models/portfolio";
import PixelIcon from "../components/PixelIcon";
import Window from "../components/Window";
import { Badge, Bullets, Chips, WindowHeading } from "../components/ui";

export function ProjectsFolderWindow() {
  return (
    <Window id="projects" taskTitle="projects" barLabel="projects/" closeLabel="close projects" theme="alt">
      <p className="text-soft text-[13px] mb-[10px]">{projects.length} items · open one for details</p>
      <div className="grid grid-cols-2 gap-2.5 phone:grid-cols-1">
        {projects.map((project) => (
          <button
            key={project.id}
            data-open={project.id}
            className="text-left border-2 border-edge rounded-[10px] bg-white p-3 cursor-pointer font-sans text-ink shadow-3 hover:bg-haze motion-safe:transition-transform motion-safe:duration-100 motion-safe:ease-[ease] motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px phone:p-3.5"
          >
            <b className="block font-pixel text-[16px] font-semibold">
              <PixelIcon name="folder" className="mr-1 align-[-3px]" />
              {project.folder.name}
            </b>
            {project.folder.lines.map((line) => (
              <small key={line} className="block text-soft text-[12.5px]">
                {line}
              </small>
            ))}
          </button>
        ))}
      </div>
    </Window>
  );
}

/** Window id for a project's enlarged snapshot; not "p-" so it isn't placed beside the projects folder */
const shotId = (project: PortfolioProject) => `shot-${project.id.replace(/^p-/, "")}`;

/** The project's snapshot at a large size, in its own desktop window */
function ScreenshotWindow({ project }: { project: PortfolioProject }) {
  const { screenshot } = project;
  if (!screenshot) return null;
  return (
    <Window
      id={shotId(project)}
      taskTitle={`${project.taskTitle} snapshot`}
      barLabel={`${project.taskTitle}-snapshot.jpg`}
      closeLabel={`close ${project.taskTitle} snapshot`}
      theme={project.theme}
      widthClassName="w-[900px]"
      paddingClassName="p-3"
      // on phones the whole shot fits the sheet, centred; it's biggest with the phone turned sideways
      contentClassName="phone:flex phone:flex-col phone:items-center phone:justify-center phone:gap-3"
    >
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        unoptimized
        className="w-full h-auto border-2 border-edge rounded-[8px] bg-white phone:w-auto phone:max-w-full phone:max-h-full phone:min-h-0"
      />
      <p className="hidden phone:portrait:block font-pixel text-[13px] text-soft text-center">
        turn your phone sideways or pinch to zoom
      </p>
    </Window>
  );
}

function ProjectWindow({ project }: { project: PortfolioProject }) {
  const { badge, screenshot } = project;
  return (
    <Window
      id={project.id}
      taskTitle={project.taskTitle}
      barLabel={project.barLabel}
      closeLabel={project.closeLabel}
      theme={project.theme}
      backToProjects
      widthClassName={screenshot ? "w-[500px]" : undefined}
    >
      {screenshot && (
        <button
          type="button"
          data-open={shotId(project)}
          aria-label={`enlarge snapshot of ${project.heading}`}
          className="block w-full mb-3 cursor-zoom-in"
        >
          {/* unoptimized: the Cloudflare deploy has no image-resizing binding; the file is already small */}
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            unoptimized
            className="w-full h-auto border-2 border-edge rounded-[8px] shadow-3 bg-white"
          />
        </button>
      )}
      <WindowHeading>{project.heading}</WindowHeading>
      <div className="text-soft text-[13px]">{project.meta}</div>
      <Badge icon={badge.icon}>
        {badge.text}
        {badge.link && (
          <a href={badge.link.href} target="_blank" rel="noopener">
            {badge.link.label}
          </a>
        )}
      </Badge>
      <Bullets items={project.bullets} />
      <Chips items={project.chips} label="tech used" />
    </Window>
  );
}

export function ProjectWindows() {
  return projects.map((project) => (
    <Fragment key={project.id}>
      <ProjectWindow project={project} />
      <ScreenshotWindow project={project} />
    </Fragment>
  ));
}
