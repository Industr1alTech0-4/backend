import { Router }  from "express"; 
import { modController } from "../controllers/model.controller";

const router = Router(); 

router.post('/model', (req, res) => modController.modelFetch(req, res) )

export default router; 