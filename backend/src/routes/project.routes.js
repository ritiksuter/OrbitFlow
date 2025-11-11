import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { projectSchema } from "../utils/validate-schema.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProject, getProjectDetails, getProjectTasks } from "../controllers/project.controller.js";



const router = Router();

router.post("/:workspaceId/create-project", authMiddleware, validateRequest({ params: z.object({ workspaceId: z.string() }), body: projectSchema }), createProject);
router.get("/:projectId", authMiddleware, validateRequest({ params: z.object({ projectId: z.string() })}), getProjectDetails);

router.get("/:projectId/tasks", authMiddleware, validateRequest({ params: z.object({ projectId: z.string() }) }), getProjectTasks);


export default router;