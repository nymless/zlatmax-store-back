import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { Type } from "../db/models/Type";

const typeController = new SelectorController(Type);

const router = Router();

router.post("/", checkRole("ADMIN"), typeController.create);

router.put("/", checkRole("ADMIN"), typeController.update);

router.get("/", typeController.getAll);

export default router;
