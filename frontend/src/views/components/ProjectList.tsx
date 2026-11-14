"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/models/project";
import { projectController } from "@/controllers/project.controller";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectController
      .list()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-500">Loading projects…</p>;
  if (error) return <p className="text-red-600">Could not load projects: {error}</p>;
  if (projects.length === 0) return <p className="text-zinc-500">No projects yet.</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="font-semibold">{project.title}</h2>
          {project.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
          )}
          {project.url && (
            <a href={project.url} className="mt-2 inline-block text-sm text-blue-600 hover:underline">
              View project
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
