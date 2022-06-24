import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { HandleMaterial } from "../db/models/HandleMaterial";

const handleMaterialController = new SelectorController(HandleMaterial);

const router = Router();

router.post("/", checkRole("ADMIN"), handleMaterialController.create);

router.put("/", checkRole("ADMIN"), handleMaterialController.update);

router.get("/", handleMaterialController.getAll);

export default router;
