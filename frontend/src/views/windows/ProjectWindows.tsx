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

function ProjectWindow({ project }: { project: PortfolioProject }) {
  const { badge } = project;
  return (
    <Window
      id={project.id}
      taskTitle={project.taskTitle}
      barLabel={project.barLabel}
      closeLabel={project.closeLabel}
      theme={project.theme}
      backToProjects
    >
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
  return projects.map((project) => <ProjectWindow key={project.id} project={project} />);
}
