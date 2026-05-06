import { Router } from "express";
import { storyController } from "../controllers/story.controller";

const router = Router();

// Убедитесь что все методы существуют
router.get("/all", (req, res) => storyController.getAllStories(req, res));
router.get("/all/:PompId", (req, res) => storyController.getAllStoryByPompId(req, res));
router.post("/add", (req, res) => storyController.addRecord(req, res));

export default router;