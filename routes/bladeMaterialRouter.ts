import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { BladeMaterial } from "../db/models/BladeMaterial";
import { imgFileHandler } from "../middleware/imgFileHandler";

const bladeMaterialController = new SelectorController(BladeMaterial);

const router = Router();

router.post(
  "/",
  checkRole("ADMIN"),
  imgFileHandler,
  bladeMaterialController.create
);

router.put(
  "/",
  checkRole("ADMIN"),
  imgFileHandler,
  bladeMaterialController.update
);

router.get("/", bladeMaterialController.getAll);

export default router;
