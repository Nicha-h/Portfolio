export interface Project {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  createdAt: string;
}

export type NewProject = Pick<Project, "title"> & Partial<Pick<Project, "description" | "url">>;
