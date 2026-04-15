import { Router } from "express";
import { storyController } from "../controllers/story.controller";

const router = Router();

router.post("/add", (req, res) => storyController.addRecord(req, res));

router.get("/all", (req, res) => storyController.getAllStories(req, res));

router.get("/all/:PompId", (req, res) => storyController.getAllStoryByUserId(req, res));

export default router;