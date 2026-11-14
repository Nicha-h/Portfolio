import { Router } from "express";
import projectRoutes from "./project.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
router.use("/projects", projectRoutes);

export default router;
