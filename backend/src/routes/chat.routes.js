import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat.controller.js";

const chatRoutes = Router();

chatRoutes.post("/new", authMiddleware, generateChatCompletion);
chatRoutes.get("/all-chats", authMiddleware, sendChatsToUser);
chatRoutes.delete("/delete", authMiddleware, deleteChats);


export default chatRoutes;