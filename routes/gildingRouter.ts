import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { Gilding } from "../db/models/Gilding";

const gildingController = new SelectorController(Gilding);

const router = Router();

router.post("/", checkRole("ADMIN"), gildingController.create);

router.put("/", checkRole("ADMIN"), gildingController.update);

router.get("/", gildingController.getAll);

export default router;
