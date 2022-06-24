import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { HandguardMaterial } from "../db/models/HandguardMaterial";

const handguardMaterialController = new SelectorController(HandguardMaterial);

const router = Router();

router.post("/", checkRole("ADMIN"), handguardMaterialController.create);

router.put("/", checkRole("ADMIN"), handguardMaterialController.update);

router.get("/", handguardMaterialController.getAll);

export default router;
