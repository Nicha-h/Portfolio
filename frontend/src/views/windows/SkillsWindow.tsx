import { skillGroups, type Skill, type SkillTone } from "@/models/skills";
import Window from "../components/Window";
import { Chips } from "../components/ui";

const toneClass: Record<SkillTone, string> = {
  dark: "bg-ink",
  sky: "bg-sky",
  mint: "bg-leaf",
  pink: "bg-blush",
  lilac: "bg-lilac",
};

const segButton =
  "font-pixel text-[12px] px-2.5 py-[3px] bg-white text-ink cursor-pointer not-first:border-l-2 border-edge aria-pressed:bg-lilac coarse:px-3.5 coarse:py-[7px] coarse:text-[13px]";

const groupTitle = "font-pixel font-normal text-[12px] text-soft mb-[5px] whitespace-nowrap";
const groupsLayout = "flex flex-wrap gap-x-[14px] gap-y-[10px] mt-1.5 phone:gap-x-[18px] phone:gap-y-[14px]";

function SkillLogo({ skill }: { skill: Skill }) {
  return (
    <button
      type="button"
      aria-label={skill.name}
      data-tip={skill.name}
      className={`leading-[inherit] w-9 h-9 grid place-items-center border-2 border-edge rounded-[9px] shadow-2 cursor-pointer ${skill.tone ? toneClass[skill.tone] : "bg-white"} hover:shadow-4 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:shadow-4 focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 motion-safe:transition-[translate,box-shadow] motion-safe:duration-[120ms] motion-safe:ease-[ease] phone:w-[46px] phone:h-[46px] phone:rounded-[11px] phone:shadow-3 phone:hover:shadow-4 phone:focus-visible:shadow-4`}
    >
      {skill.icon ? (
        <svg viewBox="0 0 24 24" fill={skill.icon.fill} aria-hidden="true" focusable="false" className="w-5 h-5 phone:w-6 phone:h-6">
          <path d={skill.icon.path} />
        </svg>
      ) : (
        <b aria-hidden="true" className="font-pixel text-[12px] font-semibold text-ink phone:text-[14px]">
          {skill.text}
        </b>
      )}
    </button>
  );
}

export default function SkillsWindow() {
  return (
    <Window
      id="skills"
      taskTitle="skills"
      barLabel="skills/"
      closeLabel="close skills"
      theme="mint"
      paddingClassName="pt-3 px-3.5 pb-4"
    >
      <div className="view-toggle flex items-center gap-2.5 flex-wrap mb-1">
        <div role="group" aria-label="skills view" className="inline-flex border-2 border-edge rounded-[8px] overflow-hidden shadow-2">
          <button type="button" data-view="logos" aria-pressed="true" className={segButton}>
            logos
          </button>
          <button type="button" data-view="list" aria-pressed="false" className={segButton}>
            text
          </button>
        </div>
        <span id="skill-hint" className="text-soft text-[13px]">
          hover or tap a logo
        </span>
      </div>

      <div id="skill-logos" className={groupsLayout}>
        {skillGroups.map((group) => (
          <div key={group.title} className="flex-none max-w-full">
            <h3 className={groupTitle}>{group.title}</h3>
            <ul aria-label={group.title} className="flex flex-wrap gap-2 phone:gap-2.5">
              {group.items.map((skill) => (
                <li key={skill.name}>
                  <SkillLogo skill={skill} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Collapsed rather than display:none, so Chrome's find-in-page can still reach it (hidden="until-found") */}
      <div
        id="skill-list"
        data-collapsed=""
        className={`${groupsLayout} data-collapsed:h-0 data-collapsed:m-0 data-collapsed:overflow-hidden data-collapsed:[content-visibility:hidden] [&[hidden]]:h-0 [&[hidden]]:m-0 [&[hidden]]:overflow-hidden [&[hidden]]:[content-visibility:hidden]`}
      >
        {skillGroups.map((group) => (
          <div key={group.title} className="flex-none max-w-full">
            <h3 className={groupTitle}>{group.title}</h3>
            <Chips items={group.items.map((s) => s.name)} className="m-0 [&>li]:text-[12.5px]" />
          </div>
        ))}
      </div>
    </Window>
  );
}
