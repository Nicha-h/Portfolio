import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { projects } from "../models/index.js";

export async function listProjects(_req: Request, res: Response) {
  const rows = await getDb().select().from(projects).orderBy(projects.createdAt);
  res.json(rows);
}

export async function getProject(req: Request<{ id: string }>, res: Response) {
  const [row] = await getDb()
    .select()
    .from(projects)
    .where(eq(projects.id, Number(req.params.id)));
  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(row);
}

export async function createProject(req: Request, res: Response) {
  const { title, description, url } = req.body ?? {};
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const [row] = await getDb().insert(projects).values({ title, description, url }).returning();
  res.status(201).json(row);
}

export async function updateProject(req: Request<{ id: string }>, res: Response) {
  const { title, description, url } = req.body ?? {};
  const [row] = await getDb()
    .update(projects)
    .set({ title, description, url })
    .where(eq(projects.id, Number(req.params.id)))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(row);
}

export async function deleteProject(req: Request<{ id: string }>, res: Response) {
  const [row] = await getDb()
    .delete(projects)
    .where(eq(projects.id, Number(req.params.id)))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.status(204).end();
}
