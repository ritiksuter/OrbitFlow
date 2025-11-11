import { Router } from "express";
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import taskRoutes from './task.routes.js';
import userRoutes from './user.routes.js';
import workspaceRoutes from './workspace.routes.js';
import chatRoutes from './chat.routes.js';

const router = Router();

// Domain -> /api-v1

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/chat", chatRoutes);

export default router;