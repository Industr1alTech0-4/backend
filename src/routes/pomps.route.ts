import { Router } from "express";
import { pompsController } from "../controllers/pomps.controller";

const router = Router();

router.post("/register", (req, res) => pompsController.createPomp(req, res));
router.post("/login", (req, res) => pompsController.loginPomp(req, res));

router.get("/all", (req, res) => pompsController.getAllPomps(req, res));
router.get("/:id", (req, res) => pompsController.getPompById(req, res));

export default router;