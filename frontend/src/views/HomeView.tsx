import ProjectList from "./components/ProjectList";

export default function HomeView() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Portfolio</h1>
      <ProjectList />
    </main>
  );
}
