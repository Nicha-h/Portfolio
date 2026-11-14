import type { NewProject, Project } from "@/models/project";
import { request } from "./api";

export const projectController = {
  list: () => request<Project[]>("/projects"),
  get: (id: number) => request<Project>(`/projects/${id}`),
  create: (data: NewProject) =>
    request<Project>("/projects", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<NewProject>) =>
    request<Project>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/projects/${id}`, { method: "DELETE" }),
};
