import { profile } from "@/models/profile";
import Desktop from "./Desktop";
import { AppIcons, RecentProjectsWidget, WelcomeWidgets } from "./components/HomeScreen";
import AboutWindow from "./windows/AboutWindow";
import ContactWindow from "./windows/ContactWindow";
import { ProjectsFolderWindow, ProjectWindows } from "./windows/ProjectWindows";
import ResumeWindow from "./windows/ResumeWindow";
import SkillsWindow from "./windows/SkillsWindow";

export default function HomeView() {
  return (
    <Desktop>
      <h1 className="sr-only">{profile.name} — backend and full-stack developer portfolio</h1>
      <WelcomeWidgets />
      <AppIcons />
      <RecentProjectsWidget />
      <AboutWindow />
      <ProjectsFolderWindow />
      <ProjectWindows />
      <SkillsWindow />
      <ResumeWindow />
      <ContactWindow />
    </Desktop>
  );
}
