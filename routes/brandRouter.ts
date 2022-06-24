import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { Brand } from "../db/models/Brand";
import { imgFileHandler } from "../middleware/imgFileHandler";

const brandController = new SelectorController(Brand);

const router = Router();

router.post("/", checkRole("ADMIN"), imgFileHandler, brandController.create);

router.put("/", checkRole("ADMIN"), imgFileHandler, brandController.update);

router.get("/", brandController.getAll);

export default router;
